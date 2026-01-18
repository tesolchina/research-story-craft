import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AI_PERSONA_INFO, AIPersona, ChatMessage } from './types';
import { Loader2, MessageSquare, ListChecks, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AIPersonaPanelProps {
  sessionId: string;
  topic: string;
  agenda: string[];
  messages: ChatMessage[];
  disabled?: boolean;
}

export function AIPersonaPanel({ 
  sessionId, 
  topic, 
  agenda, 
  messages,
  disabled 
}: AIPersonaPanelProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const invokeAI = async (persona: AIPersona, action: 'respond' | 'summarize' | 'task' = 'respond', task?: string) => {
    if (loading) return;

    setLoading(`${persona}-${action}`);

    try {
      const { data, error } = await supabase.functions.invoke('collaborative-chat-ai', {
        body: {
          action,
          persona,
          topic,
          agenda,
          messages: messages.slice(-20), // Send last 20 messages for context
          task
        }
      });

      if (error) throw error;

      if (data.skipped) {
        toast({
          title: 'AI chose not to respond',
          description: 'The AI felt the conversation was flowing well without input.',
        });
        return;
      }

      // Post the AI response as a message
      const aiInfo = AI_PERSONA_INFO[persona];
      
      const { error: insertError } = await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          sender_type: persona,
          sender_id: null,
          sender_name: aiInfo.name,
          content: data.content
        });

      if (insertError) throw insertError;

    } catch (error) {
      console.error('AI invocation error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get AI response. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(null);
    }
  };

  const isLoading = (persona: AIPersona, action: string) => 
    loading === `${persona}-${action}`;

  return (
    <div className="p-4 border-t bg-muted/30">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-purple-500" />
        <h4 className="text-sm font-medium">AI Assistants</h4>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        {(Object.entries(AI_PERSONA_INFO) as [AIPersona, typeof AI_PERSONA_INFO[AIPersona]][]).map(([key, info]) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            className="flex-col h-auto py-2 gap-1 hover:bg-purple-50 hover:border-purple-200"
            onClick={() => invokeAI(key)}
            disabled={disabled || loading !== null}
          >
            {isLoading(key, 'respond') ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <span className="text-lg">{info.avatar}</span>
            )}
            <span className="text-xs truncate w-full">{info.name.split(' ')[0]}</span>
          </Button>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1 text-xs"
          onClick={() => invokeAI('ai_expert', 'summarize')}
          disabled={disabled || loading !== null}
        >
          {isLoading('ai_expert', 'summarize') ? (
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
          ) : (
            <ListChecks className="h-3 w-3 mr-1" />
          )}
          Summarize
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1 text-xs"
          onClick={() => invokeAI('ai_peer_john', 'task', 'encourage')}
          disabled={disabled || loading !== null}
        >
          {isLoading('ai_peer_john', 'task') ? (
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
          ) : (
            <MessageSquare className="h-3 w-3 mr-1" />
          )}
          Encourage
        </Button>
      </div>
    </div>
  );
}
