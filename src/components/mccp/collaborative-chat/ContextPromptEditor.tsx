import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Settings2, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContextPromptEditorProps {
  contextPrompt: string | null;
  onSave: (prompt: string) => Promise<void>;
  disabled?: boolean;
}

export function ContextPromptEditor({ contextPrompt, onSave, disabled }: ContextPromptEditorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(contextPrompt || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(value);
      setOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setValue(contextPrompt || '');
    }
  };

  const hasContext = !!contextPrompt?.trim();

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-7 gap-1 text-xs",
            hasContext && "text-purple-600"
          )}
          disabled={disabled}
        >
          <Settings2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Context</span>
          {hasContext && <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm">AI Context Instructions</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Provide context or instructions for AI personas. They will use this to inform their responses.
            </p>
          </div>
          
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="E.g., 'Focus on corpus linguistics methodology. Students are working on their first research project.'"
            className="min-h-[100px] text-sm"
          />
          
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="h-3.5 w-3.5 mr-1" />
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
