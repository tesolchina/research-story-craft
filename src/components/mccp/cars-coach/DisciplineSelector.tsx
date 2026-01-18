import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DisciplineSelectorProps {
  onSelect: (discipline: string) => void;
}

export default function DisciplineSelector({ onSelect }: DisciplineSelectorProps) {
  const [discipline, setDiscipline] = useState("");
  const [subfield, setSubfield] = useState("");

  const handleSubmit = () => {
    if (!discipline.trim()) return;
    
    const fullDiscipline = subfield.trim() 
      ? `${discipline.trim()} (${subfield.trim()})`
      : discipline.trim();
    onSelect(fullDiscipline);
  };

  const isValid = discipline.trim().length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to CARS Coach! 🎓</CardTitle>
        <CardDescription>
          Tell me about your academic background so I can provide relevant examples and insights for your field.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="discipline">Your discipline / field of study *</Label>
          <Input
            id="discipline"
            placeholder="e.g., Computer Science, Nursing, Education, Psychology..."
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subfield">Specific subfield or research area (optional)</Label>
          <Input
            id="subfield"
            placeholder="e.g., Cybersecurity, Pediatric Care, TESOL, Cognitive Psychology..."
            value={subfield}
            onChange={(e) => setSubfield(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && isValid && handleSubmit()}
            maxLength={100}
          />
          <p className="text-xs text-muted-foreground">
            Being specific helps me tailor examples to your exact research context.
          </p>
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={!isValid}
          className="w-full"
        >
          Start Learning
        </Button>
      </CardContent>
    </Card>
  );
}
