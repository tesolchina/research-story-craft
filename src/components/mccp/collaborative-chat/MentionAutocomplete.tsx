import { useState, useEffect, useRef } from 'react';
import { AI_PERSONA_INFO, AIPersona } from './types';
import { cn } from '@/lib/utils';

interface MentionAutocompleteProps {
  inputValue: string;
  cursorPosition: number;
  onSelect: (mention: string, persona: AIPersona) => void;
  onClose: () => void;
}

const personas: AIPersona[] = ['ai_expert', 'ai_peer_john', 'ai_peer_karen'];

export function MentionAutocomplete({ 
  inputValue, 
  cursorPosition, 
  onSelect, 
  onClose 
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
  
  // Filter personas based on search term
  const filteredPersonas = personas.filter(persona => {
    const info = AI_PERSONA_INFO[persona];
    const mentionName = info.mention.slice(1).toLowerCase(); // Remove @
    return mentionName.includes(searchTerm) || info.name.toLowerCase().includes(searchTerm);
  });

  if (filteredPersonas.length === 0) {
    return null;
  }

  const handleSelect = (persona: AIPersona) => {
    const info = AI_PERSONA_INFO[persona];
    onSelect(info.mention, persona);
  };

  return (
    <div 
      ref={containerRef}
      className="absolute bottom-full left-0 mb-1 w-64 bg-popover border rounded-lg shadow-lg overflow-hidden z-50"
    >
      <div className="p-1.5 border-b bg-muted/50">
        <p className="text-xs text-muted-foreground">AI Personas</p>
      </div>
      <div className="p-1">
        {filteredPersonas.map((persona, index) => {
          const info = AI_PERSONA_INFO[persona];
          return (
            <button
              key={persona}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                index === selectedIndex 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-muted"
              )}
              onClick={() => handleSelect(persona)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <span className="text-xl">{info.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{info.name}</span>
                  <span className={cn("text-xs", info.color)}>{info.mention}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{info.title}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
