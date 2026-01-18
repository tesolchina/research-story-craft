import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ChatSessionParticipation {
  sessionId: string;
  topic: string;
  status: string;
  isStudentLed: boolean;
  createdAt: string;
  endedAt: string | null;
  joinedAt: string;
  leftAt: string | null;
  messageCount: number;
  isTeacher: boolean;
}

export function useChatSessionHistory(studentId: string) {
  const [sessions, setSessions] = useState<ChatSessionParticipation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    if (!studentId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // Get all sessions the user participated in
      const { data: participations, error: partError } = await supabase
        .from('chat_participants')
        .select(`
          session_id,
          joined_at,
          left_at,
          is_teacher,
          display_name,
          chat_sessions (
            id,
            topic,
            status,
            is_student_led,
            created_at,
            ended_at
          )
        `)
        .eq('student_id', studentId)
        .order('joined_at', { ascending: false });

      if (partError) {
        console.error('Error fetching chat history:', partError);
        setLoading(false);
        return;
      }

      // For each session, get message count for this user
      const sessionsWithCounts: ChatSessionParticipation[] = [];

      for (const part of participations || []) {
        const session = part.chat_sessions as any;
        if (!session) continue;

        // Count messages by this user in this session
        const { count } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true })
          .eq('session_id', session.id)
          .eq('sender_id', studentId);

        sessionsWithCounts.push({
          sessionId: session.id,
          topic: session.topic,
          status: session.status,
          isStudentLed: session.is_student_led,
          createdAt: session.created_at,
          endedAt: session.ended_at,
          joinedAt: part.joined_at,
          leftAt: part.left_at,
          messageCount: count || 0,
          isTeacher: part.is_teacher
        });
      }

      setSessions(sessionsWithCounts);
    } catch (err) {
      console.error('Error fetching chat session history:', err);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    sessions,
    loading,
    refetch: fetchHistory,
    totalSessions: sessions.length,
    activeSessions: sessions.filter(s => s.status === 'active').length,
    completedSessions: sessions.filter(s => s.status === 'ended').length,
    totalMessages: sessions.reduce((sum, s) => sum + s.messageCount, 0)
  };
}

// For teacher dashboard - get all sessions with participant counts
export function useAllChatSessions() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    setLoading(true);

    try {
      // Get all chat sessions
      const { data: sessionsData, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all sessions:', error);
        setLoading(false);
        return;
      }

      // Get participant counts for each session
      const sessionsWithCounts = await Promise.all(
        (sessionsData || []).map(async (session) => {
          const { count: participantCount } = await supabase
            .from('chat_participants')
            .select('*', { count: 'exact', head: true })
            .eq('session_id', session.id);

          const { count: messageCount } = await supabase
            .from('chat_messages')
            .select('*', { count: 'exact', head: true })
            .eq('session_id', session.id);

          return {
            ...session,
            participantCount: participantCount || 0,
            messageCount: messageCount || 0
          };
        })
      );

      setSessions(sessionsWithCounts);
    } catch (err) {
      console.error('Error fetching all chat sessions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return {
    sessions,
    loading,
    refetch: fetchSessions
  };
}
