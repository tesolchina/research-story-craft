import { useState, useRef } from 'react';
import { AI_PERSONA_INFO, AIPersona, ChatParticipant } from './types';
import { cn } from '@/lib/utils';
import { User, Bot, Users } from 'lucide-react';

interface MentionOption {
  type: 'ai' | 'human' | 'all';
  id: string;
  name: string;
  mention: string;
  subtitle?: string;
  avatar?: string;
  color?: string;
}

interface MentionAutocompleteProps {
  inputValue: string;
  cursorPosition: number;
  participants: ChatParticipant[];
  currentUserId: string;
  onSelectAI: (mention: string, persona: AIPersona) => void;
  onSelectHuman: (mention: string, participantName: string) => void;
  onSelectAll: (mention: string) => void;
  onClose: () => void;
  showAI?: boolean;
}

const aiPersonas: AIPersona[] = ['ai_expert', 'ai_peer_john', 'ai_peer_karen'];

export function MentionAutocomplete({ 
  inputValue, 
  cursorPosition, 
  participants,
  currentUserId,
  onSelectAI,
  onSelectHuman,
  onSelectAll,
  onClose,
  showAI = true
}: MentionAutocompleteProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if we're in a mention context (typing after @)
  const textBeforeCursor = inputValue.slice(0, cursorPosition);
  const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
  
  if (!mentionMatch) {
    return null;
  }

  const searchTerm = mentionMatch[1].toLowerCase();
  
  // Build mention options list
  const options: MentionOption[] = [];

  // Add "Mention All" option
  if ('all'.includes(searchTerm) || 'everyone'.includes(searchTerm)) {
    options.push({
      type: 'all',
      id: 'all',
      name: 'Everyone',
      mention: '@everyone',
      subtitle: 'Notify all participants',
      color: 'text-orange-600'
    });
  }

  // Add AI personas (if enabled)
  if (showAI) {
    aiPersonas.forEach(persona => {
      const info = AI_PERSONA_INFO[persona];
      const mentionName = info.mention.slice(1).toLowerCase();
      if (mentionName.includes(searchTerm) || info.name.toLowerCase().includes(searchTerm)) {
        options.push({
          type: 'ai',
          id: persona,
          name: info.name,
          mention: info.mention,
          subtitle: info.title,
          avatar: info.avatar,
          color: info.color
        });
      }
    });
  }

  // Add human participants (exclude current user)
  participants
    .filter(p => p.student_id !== currentUserId)
    .forEach(participant => {
      const name = participant.display_name;
      const mention = `@${name.replace(/\s+/g, '')}`;
      if (name.toLowerCase().includes(searchTerm) || mention.toLowerCase().includes(`@${searchTerm}`)) {
        options.push({
          type: 'human',
          id: participant.id,
          name: name,
          mention: mention,
          subtitle: participant.is_teacher ? 'Teacher' : 'Student',
          color: participant.is_teacher ? 'text-blue-600' : 'text-green-600'
        });
      }
    });

  if (options.length === 0) {
    return null;
  }

  const handleSelect = (option: MentionOption) => {
    if (option.type === 'ai') {
      onSelectAI(option.mention, option.id as AIPersona);
    } else if (option.type === 'all') {
      onSelectAll(option.mention);
    } else {
      onSelectHuman(option.mention, option.name);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="absolute bottom-full left-0 mb-1 w-72 bg-popover border rounded-lg shadow-lg overflow-hidden z-50"
    >
      {/* Mention All option */}
      {options.some(o => o.type === 'all') && (
        <>
          <div className="p-1.5 border-b bg-muted/50">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              Group
            </p>
          </div>
          <div className="p-1">
            {options.filter(o => o.type === 'all').map((option, index) => (
              <button
                key={option.id}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                  index === selectedIndex 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-muted"
                )}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{option.name}</span>
                    <span className={cn("text-xs", option.color)}>{option.mention}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{option.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* AI Personas section */}
      {options.some(o => o.type === 'ai') && (
        <>
          <div className="p-1.5 border-b bg-muted/50">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Bot className="h-3 w-3" />
              AI Personas
            </p>
          </div>
          <div className="p-1">
            {options.filter(o => o.type === 'ai').map((option, idx) => {
              const allOffset = options.filter(o => o.type === 'all').length;
              const globalIndex = allOffset + idx;
              return (
                <button
                  key={option.id}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                    globalIndex === selectedIndex 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-muted"
                  )}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setSelectedIndex(globalIndex)}
                >
                  <span className="text-xl">{option.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{option.name}</span>
                      <span className={cn("text-xs", option.color)}>{option.mention}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{option.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Human participants section */}
      {options.some(o => o.type === 'human') && (
        <>
          <div className="p-1.5 border-b bg-muted/50">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <User className="h-3 w-3" />
              Participants
            </p>
          </div>
          <div className="p-1 max-h-40 overflow-y-auto">
            {options.filter(o => o.type === 'human').map((option, idx) => {
              const allOffset = options.filter(o => o.type === 'all').length;
              const aiOffset = options.filter(o => o.type === 'ai').length;
              const globalIndex = allOffset + aiOffset + idx;
              return (
                <button
                  key={option.id}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                    globalIndex === selectedIndex 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-muted"
                  )}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setSelectedIndex(globalIndex)}
                >
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{option.name}</span>
                      <span className={cn("text-xs", option.color)}>{option.mention}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{option.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}