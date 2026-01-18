import { useState, useEffect } from 'react';
import { ChatSessionList } from './ChatSessionList';
import { ChatRoom } from './ChatRoom';
import { CreateSessionDialog } from './CreateSessionDialog';
import { JoinSessionDialog } from './JoinSessionDialog';
import { ChatSession } from './types';
import { useChatSessions } from '@/hooks/useChatSession';
import { useToast } from '@/hooks/use-toast';

interface CollaborativeChatProps {
  studentId: string;
}

export function CollaborativeChat({ studentId }: CollaborativeChatProps) {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showCreatePracticeDialog, setShowCreatePracticeDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  
  const { createSession, endSession } = useChatSessions();
  const { toast } = useToast();
  
  const isTeacher = studentId === '1989';

  // Load saved display name
  useEffect(() => {
    const saved = localStorage.getItem('chat_display_name');
    if (saved) setDisplayName(saved);
  }, []);

  const handleSelectSession = (session: ChatSession) => {
    setSelectedSession(session);
    
    // If teacher or has saved name, join directly
    if (isTeacher || displayName) {
      setActiveSession(session.id);
    } else {
      setShowJoinDialog(true);
    }
  };

  const handleJoin = async (name: string) => {
    if (!isTeacher) {
      setDisplayName(name);
      localStorage.setItem('chat_display_name', name);
    }
    if (selectedSession) {
      setActiveSession(selectedSession.id);
    }
  };

  const handleCreateSession = async (topic: string, agenda: string[]) => {
    try {
      const session = await createSession(topic, agenda, false, studentId);
      toast({
        title: 'Session created',
        description: 'Your discussion session is now active.',
      });
      setActiveSession(session.id);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create session.',
        variant: 'destructive'
      });
    }
  };

  const handleCreatePracticeSession = async (topic: string, agenda: string[]) => {
    try {
      const session = await createSession(topic, agenda, true, studentId);
      toast({
        title: 'Practice session started',
        description: 'AI assistants are ready to help!',
      });
      setActiveSession(session.id);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create practice session.',
        variant: 'destructive'
      });
    }
  };

  const handleEndSession = async () => {
    if (!activeSession) return;
    
    try {
      await endSession(activeSession);
      toast({
        title: 'Session ended',
        description: 'The discussion session has been archived.',
      });
      setActiveSession(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to end session.',
        variant: 'destructive'
      });
    }
  };

  const handleLeaveRoom = () => {
    setActiveSession(null);
    setSelectedSession(null);
  };

  // Show chat room if in active session
  if (activeSession) {
    return (
      <ChatRoom
        sessionId={activeSession}
        studentId={studentId}
        displayName={isTeacher ? 'Teacher' : displayName}
        onLeave={handleLeaveRoom}
        onEndSession={isTeacher ? handleEndSession : undefined}
      />
    );
  }

  return (
    <>
      <ChatSessionList
        studentId={studentId}
        onSelectSession={handleSelectSession}
        onCreateSession={() => setShowCreateDialog(true)}
        onCreatePracticeSession={() => setShowCreatePracticeDialog(true)}
      />

      <CreateSessionDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onCreateSession={handleCreateSession}
      />

      <CreateSessionDialog
        open={showCreatePracticeDialog}
        onClose={() => setShowCreatePracticeDialog(false)}
        onCreateSession={handleCreatePracticeSession}
        isStudentLed
      />

      <JoinSessionDialog
        open={showJoinDialog}
        onClose={() => {
          setShowJoinDialog(false);
          setSelectedSession(null);
        }}
        session={selectedSession}
        onJoin={handleJoin}
        isTeacher={isTeacher}
      />
    </>
  );
}
