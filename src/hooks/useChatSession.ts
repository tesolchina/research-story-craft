import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ChatSession, ChatMessage, ChatParticipant } from '@/components/mccp/collaborative-chat/types';
import { useToast } from '@/hooks/use-toast';

export function useChatSession(sessionId: string | null, studentId: string) {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [participants, setParticipants] = useState<ChatParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // Fetch session data
  const fetchSession = useCallback(async () => {
    if (!sessionId) return;
    
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (error) {
      console.error('Error fetching session:', error);
      return;
    }

    setSession({
      ...data,
      agenda: Array.isArray(data.agenda) ? data.agenda : [],
      context_prompt: data.context_prompt || null
    } as ChatSession);
  }, [sessionId]);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!sessionId) return;

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }

    setMessages(data as ChatMessage[]);
  }, [sessionId]);

  // Fetch participants
  const fetchParticipants = useCallback(async () => {
    if (!sessionId) return;

    const { data, error } = await supabase
      .from('chat_participants')
      .select('*')
      .eq('session_id', sessionId)
      .is('left_at', null);

    if (error) {
      console.error('Error fetching participants:', error);
      return;
    }

    setParticipants(data as ChatParticipant[]);
  }, [sessionId]);

  // Send message
  const sendMessage = useCallback(async (content: string, displayName: string) => {
    if (!sessionId || !content.trim()) return;

    const isTeacher = studentId === '1989';
    // Use actual display name for teacher (Simon)
    const senderName = isTeacher ? 'Simon' : displayName;
    
    const { error } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        sender_type: isTeacher ? 'teacher' : 'student',
        sender_id: studentId,
        sender_name: senderName,
        content: content.trim()
      });

    if (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    }
  }, [sessionId, studentId, toast]);

  // Join session
  const joinSession = useCallback(async (displayName: string) => {
    if (!sessionId) return false;

    const isTeacher = studentId === '1989';
    // Use actual display name for teacher (Simon)
    const participantName = isTeacher ? 'Simon' : displayName;

    const { error } = await supabase
      .from('chat_participants')
      .upsert({
        session_id: sessionId,
        student_id: studentId,
        display_name: participantName,
        is_teacher: isTeacher,
        left_at: null
      }, {
        onConflict: 'session_id,student_id'
      });

    if (error) {
      console.error('Error joining session:', error);
      toast({
        title: 'Error',
        description: 'Failed to join session.',
        variant: 'destructive'
      });
      return false;
    }

    return true;
  }, [sessionId, studentId, toast]);

  // Leave session
  const leaveSession = useCallback(async () => {
    if (!sessionId) return;

    await supabase
      .from('chat_participants')
      .update({ left_at: new Date().toISOString() })
      .eq('session_id', sessionId)
      .eq('student_id', studentId);
  }, [sessionId, studentId]);

  // Update context prompt (teacher only)
  const updateContextPrompt = useCallback(async (contextPrompt: string) => {
    if (!sessionId) return;

    const { error } = await supabase
      .from('chat_sessions')
      .update({ context_prompt: contextPrompt || null })
      .eq('id', sessionId);

    if (error) {
      console.error('Error updating context prompt:', error);
      toast({
        title: 'Error',
        description: 'Failed to update context. Please try again.',
        variant: 'destructive'
      });
      throw error;
    }

    toast({
      title: 'Context updated',
      description: 'AI personas will now use the new context.',
    });
  }, [sessionId, toast]);

  // Setup realtime subscription
  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // Initial fetch
    Promise.all([fetchSession(), fetchMessages(), fetchParticipants()])
      .finally(() => setLoading(false));

    // Setup realtime channel
    const channel = supabase
      .channel(`chat:${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_participants',
          filter: `session_id=eq.${sessionId}`
        },
        () => {
          fetchParticipants();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_sessions',
          filter: `id=eq.${sessionId}`
        },
        (payload) => {
          const updated = payload.new;
          setSession({
            ...updated,
            agenda: Array.isArray(updated.agenda) ? updated.agenda : [],
            context_prompt: updated.context_prompt || null
          } as ChatSession);
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [sessionId, fetchSession, fetchMessages, fetchParticipants]);

  // Check if current user is teacher
  const isTeacher = studentId === '1989';

  // Allow AI access for:
  // - Teachers always
  // - Student-led sessions (practice) with less than 5 students
  // - All users in teacher-led sessions (to allow @mention)
  const canAccessAI = isTeacher || 
    (session?.is_student_led && participants.filter(p => !p.is_teacher).length < 5) ||
    (!session?.is_student_led && session?.status === 'active');

  // Get active (non-teacher) participant count
  const studentCount = participants.filter(p => !p.is_teacher).length;

  return {
    session,
    messages,
    participants,
    loading,
    isTeacher,
    canAccessAI,
    studentCount,
    sendMessage,
    joinSession,
    leaveSession,
    updateContextPrompt,
    refetch: () => {
      fetchSession();
      fetchMessages();
      fetchParticipants();
    }
  };
}

export function useChatSessions() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sessions:', error);
      return;
    }

    setSessions(data.map(s => ({
      ...s,
      agenda: Array.isArray(s.agenda) ? s.agenda : []
    })) as ChatSession[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSessions();

    const channel = supabase
      .channel('chat_sessions_list')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_sessions'
        },
        () => {
          fetchSessions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSessions]);

  const createSession = async (topic: string, agenda: string[], isStudentLed = false, createdBy: string) => {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        topic,
        agenda,
        is_student_led: isStudentLed,
        created_by: createdBy,
        status: 'active'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating session:', error);
      throw error;
    }

    return data;
  };

  const endSession = async (sessionId: string) => {
    const { error } = await supabase
      .from('chat_sessions')
      .update({ 
        status: 'ended',
        ended_at: new Date().toISOString()
      })
      .eq('id', sessionId);

    if (error) {
      console.error('Error ending session:', error);
      throw error;
    }
  };

  return {
    sessions,
    loading,
    createSession,
    endSession,
    refetch: fetchSessions
  };
}
