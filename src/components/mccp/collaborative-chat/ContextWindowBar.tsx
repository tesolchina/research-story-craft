import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Brain, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CONTEXT_WINDOW_MAX, CONTEXT_WARNING_THRESHOLD } from './types';

interface ContextWindowBarProps {
  messages: { content: string }[];
  contextPrompt?: string | null;
}

export function ContextWindowBar({ messages, contextPrompt }: ContextWindowBarProps) {
  // Calculate approximate context usage
  const messagesText = messages.slice(-15).map(m => m.content).join(' ');
  const contextText = contextPrompt || '';
  const totalChars = messagesText.length + contextText.length;
  
  const usagePercent = Math.min((totalChars / CONTEXT_WINDOW_MAX) * 100, 100);
  const isWarning = usagePercent >= CONTEXT_WARNING_THRESHOLD * 100;
  const isCritical = usagePercent >= 90;
  
  // Messages in context (last 15 are used)
  const messagesInContext = Math.min(messages.length, 15);
  const totalMessages = messages.length;
  const messagesOutOfContext = totalMessages - messagesInContext;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 px-2 py-1 bg-muted/30 rounded text-[10px]">
            <Brain className={cn(
              "h-3 w-3",
              isCritical ? "text-destructive" : isWarning ? "text-orange-500" : "text-muted-foreground"
            )} />
            <div className="flex-1 min-w-[60px] max-w-[80px]">
              <Progress 
                value={usagePercent} 
                className={cn(
                  "h-1.5",
                  isCritical ? "[&>div]:bg-destructive" : isWarning ? "[&>div]:bg-orange-500" : ""
                )}
              />
            </div>
            <span className={cn(
              "tabular-nums",
              isCritical ? "text-destructive" : isWarning ? "text-orange-500" : "text-muted-foreground"
            )}>
              {Math.round(usagePercent)}%
            </span>
            {isWarning && <AlertTriangle className="h-3 w-3 text-orange-500" />}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[200px]">
          <div className="space-y-1 text-xs">
            <p className="font-medium">AI Context Window</p>
            <p className="text-muted-foreground">
              AI sees last {messagesInContext} messages
              {messagesOutOfContext > 0 && ` (${messagesOutOfContext} older messages forgotten)`}
            </p>
            {isCritical && (
              <p className="text-destructive">⚠️ Context nearly full - AI may miss earlier details</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
