import { ChatMessage, AI_PERSONA_INFO, AIPersona } from './types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: ChatMessage;
  isOwnMessage: boolean;
}

export function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
  const isAI = message.sender_type.startsWith('ai_');
  const isTeacher = message.sender_type === 'teacher';
  
  const aiInfo = isAI ? AI_PERSONA_INFO[message.sender_type as AIPersona] : null;

  return (
    <div className={cn(
      'flex gap-3 mb-4',
      isOwnMessage ? 'flex-row-reverse' : 'flex-row'
    )}>
      {/* Avatar */}
      <div className={cn(
        'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg',
        isAI ? 'bg-gradient-to-br from-purple-100 to-blue-100' :
        isTeacher ? 'bg-amber-100' :
        isOwnMessage ? 'bg-primary/10' : 'bg-muted'
      )}>
        {isAI ? aiInfo?.avatar : 
         isTeacher ? '👨‍🏫' : 
         message.sender_name.charAt(0).toUpperCase()}
      </div>

      {/* Message content */}
      <div className={cn(
        'flex flex-col max-w-[70%]',
        isOwnMessage ? 'items-end' : 'items-start'
      )}>
        {/* Sender name */}
        <div className={cn(
          'flex items-center gap-2 mb-1 text-sm',
          aiInfo?.color || (isTeacher ? 'text-amber-600' : 'text-muted-foreground')
        )}>
          <span className="font-medium">
            {isAI ? aiInfo?.name : message.sender_name}
          </span>
          {isAI && (
            <span className="text-xs text-muted-foreground">
              ({aiInfo?.title})
            </span>
          )}
          {isTeacher && (
            <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
              Instructor
            </span>
          )}
        </div>

        {/* Message bubble */}
        <div className={cn(
          'rounded-2xl px-4 py-2.5 shadow-sm',
          isAI ? 'bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100' :
          isTeacher ? 'bg-amber-50 border border-amber-100' :
          isOwnMessage ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
        </div>

        {/* Timestamp */}
        <span className="text-xs text-muted-foreground mt-1">
          {format(new Date(message.created_at), 'HH:mm')}
        </span>
      </div>
    </div>
  );
}
