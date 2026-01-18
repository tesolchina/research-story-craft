import { useState, useRef, useEffect, useCallback } from 'react';
import { useChatSession } from '@/hooks/useChatSession';
import { MessageBubble } from './MessageBubble';
import { ParticipantsList } from './ParticipantsList';
import { MentionAutocomplete } from './MentionAutocomplete';
import { ContextWindowBar } from './ContextWindowBar';
import { ContextPromptEditor } from './ContextPromptEditor';
import { AI_PERSONA_INFO, AIPersona } from './types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  ArrowLeft, 
  Loader2,
  Calendar,
  XCircle,
  PanelRightClose,
  PanelRight,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showMentions, setShowMentions] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [sending, setSending] = useState(false);
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const {
    session,
    messages,
    participants,
    loading,
    isTeacher,
    canAccessAI,
    sendMessage,
    joinSession,
    updateContextPrompt
  } = useChatSession(sessionId, studentId);

  // Join session on mount
  useEffect(() => {
    joinSession(displayName);
  }, [joinSession, displayName]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Invoke AI persona
  const invokeAI = useCallback(async (persona: AIPersona, userMessage: string, senderName: string) => {
    if (aiLoading || !session) return;

    setAiLoading(persona);

    try {
      const { data, error } = await supabase.functions.invoke('collaborative-chat-ai', {
        body: {
          action: 'respond',
          persona,
          topic: session.topic,
          agenda: session.agenda,
          messages: messages.slice(-20),
          userPrompt: userMessage,
          senderName: senderName,
          contextPrompt: session.context_prompt
        }
      });

      if (error) throw error;

      if (data.skipped) {
        toast({
          title: 'AI chose not to respond',
          description: 'The AI felt the conversation was flowing well.',
        });
        return;
      }

      const aiInfo = AI_PERSONA_INFO[persona];
      
      await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          sender_type: persona,
          sender_id: null,
          sender_name: aiInfo.name,
          content: data.content
        });

    } catch (error) {
      console.error('AI invocation error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get AI response. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setAiLoading(null);
    }
  }, [aiLoading, session, messages, sessionId, toast]);

  // Check for @mentions and handle sending
  const handleSend = async () => {
    if (!message.trim() || sending) return;
    
    const trimmedMessage = message.trim();
    
    // Check for @mentions
    const mentionPatterns: { pattern: RegExp; persona: AIPersona }[] = [
      { pattern: /@drcooper/i, persona: 'ai_expert' },
      { pattern: /@dr\s*cooper/i, persona: 'ai_expert' },
      { pattern: /@john/i, persona: 'ai_peer_john' },
      { pattern: /@karen/i, persona: 'ai_peer_karen' },
    ];

    let mentionedPersona: AIPersona | null = null;
    for (const { pattern, persona } of mentionPatterns) {
      if (pattern.test(trimmedMessage)) {
        mentionedPersona = persona;
        break;
      }
    }

    // Get actual sender name (for teacher it's Simon)
    const senderName = isTeacher ? 'Simon' : displayName;

    setSending(true);
    setShowMentions(false);
    await sendMessage(trimmedMessage, displayName);
    setMessage('');
    setSending(false);

    // If AI was mentioned and user can access AI, invoke it
    if (mentionedPersona && canAccessAI) {
      // Small delay to let the message appear first
      setTimeout(() => {
        invokeAI(mentionedPersona!, trimmedMessage, senderName);
      }, 500);
    }
  };

  // Handle AI mention autocomplete
  const handleAIMentionSelect = (mention: string, persona: AIPersona) => {
    insertMention(mention);
  };

  // Handle human mention autocomplete
  const handleHumanMentionSelect = (mention: string, participantName: string) => {
    insertMention(mention);
  };

  // Handle "mention all" autocomplete
  const handleAllMentionSelect = (mention: string) => {
    insertMention(mention);
  };

  // Helper to insert mention into message and position cursor after it
  const insertMention = (mention: string) => {
    const textBeforeCursor = message.slice(0, cursorPosition);
    const textAfterCursor = message.slice(cursorPosition);
    
    // Find and replace the @... pattern
    const newTextBefore = textBeforeCursor.replace(/@\w*$/, mention + ' ');
    const newMessage = newTextBefore + textAfterCursor;
    const newCursorPosition = newTextBefore.length;
    
    setMessage(newMessage);
    setCursorPosition(newCursorPosition);
    setShowMentions(false);
    
    // Focus back on textarea and set cursor position
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const position = e.target.selectionStart || 0;
    setMessage(value);
    setCursorPosition(position);
    
    // Check if we should show mention autocomplete
    // Show for AI personas (if can access AI) or for any participants
    const textBeforeCursor = value.slice(0, position);
    const hasAtSymbol = /@\w*$/.test(textBeforeCursor);
    const hasOtherParticipants = participants.filter(p => p.student_id !== studentId).length > 0;
    const shouldShowMentions = hasAtSymbol && (canAccessAI || hasOtherParticipants);
    setShowMentions(shouldShowMentions);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    // Close mentions on Escape
    if (e.key === 'Escape') {
      setShowMentions(false);
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
    <div className="flex h-[calc(100vh-200px)] min-h-[500px] max-h-[900px] border rounded-xl overflow-hidden bg-card">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header - Compact */}
        <div className="flex items-center gap-2 px-3 py-2 border-b bg-muted/30">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={onLeave}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sm truncate">{session.topic}</h2>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {format(new Date(session.created_at), 'MMM d, HH:mm')}
              {session.is_student_led && (
                <Badge variant="secondary" className="text-[10px] py-0 h-4">
                  Practice
                </Badge>
              )}
            </div>
          </div>

          {/* Context window indicator */}
          {canAccessAI && (
            <ContextWindowBar 
              messages={messages} 
              contextPrompt={session.context_prompt} 
            />
          )}

          {/* Teacher context editor */}
          {isTeacher && (
            <ContextPromptEditor
              contextPrompt={session.context_prompt}
              onSave={updateContextPrompt}
              disabled={session.status !== 'active'}
            />
          )}

          <Button
            variant="ghost"
            size="sm"
            className={cn('h-7 gap-1 text-xs', showParticipants && 'bg-muted')}
            onClick={() => setShowParticipants(!showParticipants)}
          >
            {showParticipants ? (
              <PanelRightClose className="h-3.5 w-3.5" />
            ) : (
              <PanelRight className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">{participants.length}</span>
          </Button>

          {isTeacher && onEndSession && (
            <Button
              variant="destructive"
              size="sm"
              className="h-7 text-xs"
              onClick={onEndSession}
            >
              End
            </Button>
          )}
        </div>

        {/* Agenda bar - More compact */}
        {session.agenda && session.agenda.length > 0 && (
          <div className="px-3 py-1.5 border-b bg-blue-50/50">
            <div className="flex items-center gap-2 text-[10px]">
              <span className="font-medium text-blue-700">Agenda:</span>
              <div className="flex gap-1.5 overflow-x-auto">
                {session.agenda.map((item, i) => (
                  <Badge key={i} variant="outline" className="bg-white whitespace-nowrap text-[10px] py-0">
                    {i + 1}. {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages - Takes most space now */}
        <ScrollArea className="flex-1 p-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <p className="text-sm">No messages yet</p>
              <p className="text-xs mt-1">Be the first to start the discussion!</p>
              {canAccessAI && (
                <p className="text-xs mt-3 text-purple-600">
                  <Sparkles className="h-3 w-3 inline mr-1" />
                  Mention @DrCooper, @John, or @Karen to get AI assistance
                </p>
              )}
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
              {aiLoading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>{AI_PERSONA_INFO[aiLoading as AIPersona]?.name} is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </ScrollArea>

        {/* Message input */}
        <div className="p-2 border-t bg-muted/20 relative">
          {/* Mention autocomplete */}
          {showMentions && (
            <MentionAutocomplete
              inputValue={message}
              cursorPosition={cursorPosition}
              participants={participants}
              currentUserId={studentId}
              onSelectAI={handleAIMentionSelect}
              onSelectHuman={handleHumanMentionSelect}
              onSelectAll={handleAllMentionSelect}
              onClose={() => setShowMentions(false)}
              showAI={canAccessAI}
            />
          )}
          
          <div className="flex gap-2 items-end">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Type @ to mention participants or AI..."
              disabled={session.status !== 'active' || sending}
              className="flex-1 min-h-[40px] max-h-[100px] resize-none text-sm"
              rows={1}
            />
            <Button 
              onClick={handleSend}
              disabled={!message.trim() || sending || session.status !== 'active'}
              size="icon"
              className="h-10 w-10 shrink-0"
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center justify-between mt-1 px-1">
            <p className="text-[9px] text-muted-foreground">
              <kbd className="px-1 py-0.5 bg-muted rounded">Enter</kbd> send · <kbd className="px-1 py-0.5 bg-muted rounded">Shift+Enter</kbd> new line
            </p>
            {canAccessAI && (
              <p className="text-[9px] text-purple-500">
                <Sparkles className="h-2.5 w-2.5 inline" /> AI available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Participants sidebar */}
      {showParticipants && (
        <div className="w-56 border-l bg-muted/10">
          <ParticipantsList 
            participants={participants}
            isStudentLed={session.is_student_led}
          />
        </div>
      )}
    </div>
  );
}