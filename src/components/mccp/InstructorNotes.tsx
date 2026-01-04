import { useState } from "react";
import { ChevronDown, ChevronRight, GraduationCap } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface InstructorNotesProps {
  sectionId: string;
  notes: string;
  className?: string;
}

const InstructorNotes = ({ sectionId, notes, className = "" }: InstructorNotesProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!notes) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground w-full justify-start px-0"
        >
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <GraduationCap className="h-4 w-4" />
          <span className="text-sm font-medium">Instructor Notes</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="bg-muted/30 border-l-4 border-primary/50 pl-4 py-3 pr-3 rounded-r-md">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{notes}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default InstructorNotes;
