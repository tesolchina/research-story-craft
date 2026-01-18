import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CreateSessionDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateSession: (topic: string, agenda: string[]) => Promise<void>;
  isStudentLed?: boolean;
}

export function CreateSessionDialog({ 
  open, 
  onClose, 
  onCreateSession,
  isStudentLed = false
}: CreateSessionDialogProps) {
  const [topic, setTopic] = useState('');
  const [agendaInput, setAgendaInput] = useState('');
  const [agenda, setAgenda] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddAgendaItem = () => {
    if (agendaInput.trim() && agenda.length < 5) {
      setAgenda([...agenda, agendaInput.trim()]);
      setAgendaInput('');
    }
  };

  const handleRemoveAgendaItem = (index: number) => {
    setAgenda(agenda.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    try {
      await onCreateSession(topic.trim(), agenda);
      setTopic('');
      setAgenda([]);
      onClose();
    } catch (error) {
      console.error('Failed to create session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddAgendaItem();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isStudentLed ? 'Start Practice Session' : 'Create Discussion Session'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Discussion Topic *</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Corpus-based analysis methods"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agenda">Agenda Items (optional)</Label>
            <div className="flex gap-2">
              <Input
                id="agenda"
                value={agendaInput}
                onChange={(e) => setAgendaInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add an agenda item..."
                disabled={agenda.length >= 5}
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={handleAddAgendaItem}
                disabled={!agendaInput.trim() || agenda.length >= 5}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {agenda.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {agenda.map((item, i) => (
                  <Badge key={i} variant="secondary" className="gap-1 pr-1">
                    {i + 1}. {item}
                    <button 
                      onClick={() => handleRemoveAgendaItem(i)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              {5 - agenda.length} items remaining
            </p>
          </div>

          {isStudentLed && (
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
              <p className="text-sm text-blue-700">
                <strong>Practice Session:</strong> AI assistants will be available 
                to help guide your discussion. Dr. Cooper will be fully active, 
                while John and Karen will occasionally join in.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!topic.trim() || loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isStudentLed ? 'Start Practice' : 'Create Session'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
