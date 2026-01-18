import { ChatMessage, AI_PERSONA_INFO, AIPersona } from './types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

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
        'flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base',
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
        'flex flex-col max-w-[80%]',
        isOwnMessage ? 'items-end' : 'items-start'
      )}>
        {/* Sender name */}
        <div className={cn(
          'flex items-center gap-2 mb-1 text-xs',
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
            <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
              Instructor
            </span>
          )}
        </div>

        {/* Message bubble with markdown */}
        <div className={cn(
          'rounded-2xl px-4 py-2.5 shadow-sm',
          isAI ? 'bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100' :
          isTeacher ? 'bg-amber-50 border border-amber-100' :
          isOwnMessage ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}>
          <div className={cn(
            'text-sm leading-relaxed prose prose-sm max-w-none',
            isOwnMessage && !isAI && !isTeacher && 'prose-invert',
            // Override prose styles for chat
            '[&>p]:m-0 [&>p:not(:last-child)]:mb-2',
            '[&>ul]:my-1 [&>ol]:my-1',
            '[&>ul]:pl-4 [&>ol]:pl-4',
            '[&>pre]:my-2 [&>pre]:p-2 [&>pre]:rounded [&>pre]:bg-black/10',
            '[&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:bg-black/10 [&>code]:text-xs',
            '[&>blockquote]:border-l-2 [&>blockquote]:pl-3 [&>blockquote]:my-2 [&>blockquote]:italic'
          )}>
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Timestamp */}
        <span className="text-[10px] text-muted-foreground mt-1">
          {format(new Date(message.created_at), 'HH:mm')}
        </span>
      </div>
    </div>
  );
}