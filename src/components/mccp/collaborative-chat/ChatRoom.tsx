import { useState, useRef, useEffect } from 'react';
import { useChatSession } from '@/hooks/useChatSession';
import { MessageBubble } from './MessageBubble';
import { ParticipantsList } from './ParticipantsList';
import { AIPersonaPanel } from './AIPersonaPanel';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  ArrowLeft, 
  Users, 
  Loader2,
  Calendar,
  XCircle,
  PanelRightClose,
  PanelRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ChatRoomProps {
  sessionId: string;
  studentId: string;
  displayName: string;
  onLeave: () => void;
  onEndSession?: () => void;
}

export function ChatRoom({ 
  sessionId, 
  studentId, 
  displayName, 
  onLeave,
  onEndSession 
}: ChatRoomProps) {
  const [message, setMessage] = useState('');
  const [showParticipants, setShowParticipants] = useState(false); // Default collapsed
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    session,
    messages,
    participants,
    loading,
    isTeacher,
    canAccessAI,
    sendMessage,
    joinSession
  } = useChatSession(sessionId, studentId);

  // Join session on mount
  useEffect(() => {
    joinSession(displayName);
  }, [joinSession, displayName]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || sending) return;
    
    setSending(true);
    await sendMessage(message, displayName);
    setMessage('');
    setSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <XCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="font-medium mb-2">Session not found</h3>
        <Button variant="outline" onClick={onLeave}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-280px)] min-h-[500px] max-h-[800px] border rounded-xl overflow-hidden bg-card">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b bg-muted/30">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={onLeave}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold truncate">{session.topic}</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {format(new Date(session.created_at), 'MMM d, HH:mm')}
              {session.is_student_led && (
                <Badge variant="secondary" className="text-xs py-0">
                  Practice
                </Badge>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className={cn('h-8 gap-2', showParticipants && 'bg-muted')}
            onClick={() => setShowParticipants(!showParticipants)}
          >
            {showParticipants ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRight className="h-4 w-4" />
            )}
            <span className="hidden sm:inline text-xs">
              {participants.length} online
            </span>
          </Button>

          {isTeacher && onEndSession && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onEndSession}
            >
              End Session
            </Button>
          )}
        </div>

        {/* Agenda bar */}
        {session.agenda && session.agenda.length > 0 && (
          <div className="px-4 py-2 border-b bg-blue-50/50">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium text-blue-700">Agenda:</span>
              <div className="flex gap-2 overflow-x-auto">
                {session.agenda.map((item, i) => (
                  <Badge key={i} variant="outline" className="bg-white whitespace-nowrap">
                    {i + 1}. {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <p className="text-sm">No messages yet</p>
              <p className="text-xs mt-1">Be the first to start the discussion!</p>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isOwnMessage={msg.sender_id === studentId}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </ScrollArea>

        {/* AI Panel (for teacher or eligible student sessions) */}
        {canAccessAI && (
          <AIPersonaPanel
            sessionId={sessionId}
            topic={session.topic}
            agenda={session.agenda}
            messages={messages}
            disabled={session.status !== 'active'}
          />
        )}

        {/* Message input */}
        <div className="p-3 border-t bg-muted/20">
          <div className="flex gap-2 items-end">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
              disabled={session.status !== 'active'}
              className="flex-1 min-h-[44px] max-h-[120px] resize-none"
              rows={1}
            />
            <Button 
              onClick={handleSend}
              disabled={!message.trim() || sending || session.status !== 'active'}
              size="icon"
              className="h-11 w-11 shrink-0"
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
            Press <kbd className="px-1 py-0.5 bg-muted rounded text-[9px]">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-muted rounded text-[9px]">Shift+Enter</kbd> for new line
          </p>
        </div>
      </div>

      {/* Participants sidebar */}
      {showParticipants && (
        <div className="w-64 border-l bg-muted/10">
          <ParticipantsList 
            participants={participants}
            isStudentLed={session.is_student_led}
          />
        </div>
      )}
    </div>
  );
}
