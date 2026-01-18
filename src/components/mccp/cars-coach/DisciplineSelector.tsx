import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DISCIPLINES } from "./types";

interface DisciplineSelectorProps {
  onSelect: (discipline: string) => void;
}

export default function DisciplineSelector({ onSelect }: DisciplineSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to CARS Coach! 🎓</CardTitle>
        <CardDescription>
          Let's start by selecting your academic discipline. This helps me provide examples
          and insights that are relevant to your field.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DISCIPLINES.map((discipline) => (
            <Button
              key={discipline.value}
              variant="outline"
              className="h-auto py-4 justify-start text-left"
              onClick={() => onSelect(discipline.value)}
            >
              {discipline.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
