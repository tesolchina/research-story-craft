import { ChatParticipant, AI_PERSONA_INFO } from './types';
import { Users, Crown, Bot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface ParticipantsListProps {
  participants: ChatParticipant[];
  isStudentLed: boolean;
}

export function ParticipantsList({ participants, isStudentLed }: ParticipantsListProps) {
  const teacher = participants.find(p => p.is_teacher);
  const students = participants.filter(p => !p.is_teacher);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
        <Users className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-medium text-sm">Participants</h3>
        <Badge variant="secondary" className="ml-auto text-xs">
          {participants.length}
        </Badge>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {/* AI Personas section */}
          <div>
            <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground font-medium uppercase tracking-wide">
              <Bot className="h-3 w-3" />
              AI Assistants
            </div>
            <div className="space-y-2">
              {Object.entries(AI_PERSONA_INFO).map(([key, info]) => (
                <div key={key} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gradient-to-r from-purple-50/50 to-blue-50/50">
                  <span className="text-lg">{info.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${info.color}`}>
                      {info.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {info.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher */}
          {teacher && (
            <div>
              <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground font-medium uppercase tracking-wide">
                <Crown className="h-3 w-3" />
                Instructor
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-amber-50">
                <span className="text-lg">👨‍🏫</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-amber-700 truncate">
                    {teacher.display_name}
                  </p>
                </div>
                <span className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            </div>
          )}

          {/* Students */}
          <div>
            <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground font-medium uppercase tracking-wide">
              <Users className="h-3 w-3" />
              Students ({students.length})
            </div>
            <div className="space-y-1">
              {students.map((participant) => (
                <div 
                  key={participant.id} 
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                    {participant.display_name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm truncate flex-1">
                    {participant.display_name}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              ))}
              {students.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-2">
                  No students yet
                </p>
              )}
            </div>
          </div>

          {/* Student-led session notice */}
          {isStudentLed && (
            <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <p className="text-xs text-blue-700">
                <span className="font-medium">Practice Session</span>
                <br />
                AI assistants are available when there are fewer than 5 students.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
