import { useChatSessions } from '@/hooks/useChatSession';
import { ChatSession } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  MessageCircle, 
  Users, 
  Calendar,
  Loader2,
  Sparkles,
  Archive,
  CheckCircle2
} from 'lucide-react';
import { format } from 'date-fns';

interface ChatSessionListProps {
  studentId: string;
  onSelectSession: (session: ChatSession) => void;
  onCreateSession: () => void;
  onCreatePracticeSession: () => void;
}

export function ChatSessionList({ 
  studentId, 
  onSelectSession, 
  onCreateSession,
  onCreatePracticeSession
}: ChatSessionListProps) {
  const { sessions, loading } = useChatSessions();
  const isTeacher = studentId === '1989';

  // Filter sessions by status
  const activeSessions = sessions.filter(s => s.status === 'active');
  const completedSessions = sessions.filter(s => s.status === 'ended');

  // Check if student can create practice session
  const canCreatePractice = !isTeacher;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const renderSessionList = (sessionList: ChatSession[], isCompleted = false) => {
    if (sessionList.length === 0) {
      return (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            {isCompleted ? (
              <>
                <Archive className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="font-medium mb-2">No Completed Discussions</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Completed discussion sessions will appear here.
                </p>
              </>
            ) : (
              <>
                <MessageCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="font-medium mb-2">No Active Discussions</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  {isTeacher 
                    ? 'Create a new discussion session to start a class conversation.'
                    : 'Wait for your instructor to start a discussion, or create a practice session to study with AI assistants.'}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid gap-3">
        {sessionList.map((session) => (
          <Card 
            key={session.id}
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => onSelectSession(session)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium truncate">{session.topic}</h3>
                    {session.is_student_led && (
                      <Badge variant="secondary" className="shrink-0">
                        Practice
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge variant="outline" className="shrink-0 text-green-600 border-green-300">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Ended
                      </Badge>
                    )}
                  </div>
                  
                  {session.agenda && session.agenda.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {session.agenda.slice(0, 3).map((item, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                      {session.agenda.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{session.agenda.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(session.created_at), 'MMM d, HH:mm')}
                    </span>
                    {session.ended_at && (
                      <span className="text-xs text-muted-foreground">
                        Ended: {format(new Date(session.ended_at), 'MMM d, HH:mm')}
                      </span>
                    )}
                  </div>
                </div>

                <Button size="sm" variant={isCompleted ? "outline" : "secondary"}>
                  {isCompleted ? "View" : "Join"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex gap-2 flex-wrap">
        {isTeacher && (
          <Button onClick={onCreateSession}>
            <Plus className="h-4 w-4 mr-2" />
            Create Discussion
          </Button>
        )}
        {canCreatePractice && (
          <Button variant="outline" onClick={onCreatePracticeSession}>
            <Sparkles className="h-4 w-4 mr-2" />
            Start Practice Session
          </Button>
        )}
      </div>

      {/* Tabs for Active vs Completed */}
      {/* Both teachers and students can see Active and Completed tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Active ({activeSessions.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            <Archive className="h-4 w-4" />
            Completed ({completedSessions.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          {renderSessionList(activeSessions)}
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          {renderSessionList(completedSessions, true)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
