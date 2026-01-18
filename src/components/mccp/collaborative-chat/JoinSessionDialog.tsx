import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { ChatSession } from './types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface JoinSessionDialogProps {
  open: boolean;
  onClose: () => void;
  session: ChatSession | null;
  onJoin: (displayName: string) => Promise<void>;
  isTeacher: boolean;
}

export function JoinSessionDialog({ 
  open, 
  onClose, 
  session,
  onJoin,
  isTeacher
}: JoinSessionDialogProps) {
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!displayName.trim() && !isTeacher) return;
    
    setLoading(true);
    try {
      await onJoin(isTeacher ? 'Teacher' : displayName.trim());
      setDisplayName('');
      onClose();
    } catch (error) {
      console.error('Failed to join session:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join Discussion</DialogTitle>
          <DialogDescription>
            Enter your first name to join this discussion session.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Session info */}
          <div className="p-4 rounded-lg bg-muted/50 space-y-2">
            <h3 className="font-medium">{session.topic}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{format(new Date(session.created_at), 'MMM d, yyyy • HH:mm')}</span>
              {session.is_student_led && (
                <Badge variant="secondary">Practice</Badge>
              )}
            </div>
            {session.agenda && session.agenda.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {session.agenda.map((item, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Name input (not for teacher) */}
          {!isTeacher && (
            <div className="space-y-2">
              <Label htmlFor="displayName">Your First Name *</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g., Alex"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <p className="text-xs text-muted-foreground">
                This will be displayed to other participants
              </p>
            </div>
          )}

          {isTeacher && (
            <p className="text-sm text-muted-foreground">
              You will join as the instructor.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={(!displayName.trim() && !isTeacher) || loading}
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Join Discussion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
