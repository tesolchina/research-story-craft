import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Lightbulb, Target, Layers } from "lucide-react";
import type { Phase, CarsCoachSession } from "./types";

interface IntroductionPhaseProps {
  session: Partial<CarsCoachSession>;
  onPhaseComplete: (current: Phase, next: Phase) => void;
}

export default function IntroductionPhase({ session, onPhaseComplete }: IntroductionPhaseProps) {
  const handleContinue = () => {
    onPhaseComplete("introduction", "mc_questions");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Introduction to the CARS Model
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Welcome */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-sm">
            Welcome! The <strong>CARS Model</strong> (Create A Research Space) is a framework 
            developed by John Swales to help researchers write effective introductions. 
            Understanding this model will transform how you open your research papers.
          </p>
        </div>

        {/* The Three Moves */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Layers className="h-5 w-5" />
            The Three Moves of CARS
          </h3>

          {/* Move 1 */}
          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-bold px-2 py-1 rounded">
                MOVE 1
              </span>
              <h4 className="font-medium">Establishing a Territory</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Show that your research area is important, central, interesting, or problematic. 
              Claim the significance of your field.
            </p>
            <div className="text-xs bg-muted/50 p-2 rounded italic">
              Example phrases: "Recent studies have shown...", "There has been growing interest in...", 
              "X is a key factor in..."
            </div>
          </div>

          {/* Move 2 */}
          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs font-bold px-2 py-1 rounded">
                MOVE 2
              </span>
              <h4 className="font-medium">Establishing a Niche</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Identify a gap, problem, or limitation in existing research that your study will address. 
              This creates space for your contribution.
            </p>
            <div className="text-xs bg-muted/50 p-2 rounded italic">
              Example phrases: "However, few studies have...", "What remains unclear is...", 
              "Previous research has overlooked..."
            </div>
          </div>

          {/* Move 3 */}
          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-1 rounded">
                MOVE 3
              </span>
              <h4 className="font-medium">Occupying the Niche</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Present your research as filling the gap. Outline your purposes, methods, 
              and/or principal findings.
            </p>
            <div className="text-xs bg-muted/50 p-2 rounded italic">
              Example phrases: "This study aims to...", "We propose...", 
              "The present paper investigates..."
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-1">Key Insight</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                The CARS model creates a "story" for your research: You show the field matters (Move 1), 
                reveal what's missing (Move 2), and explain how you'll fill that gap (Move 3). 
                This narrative structure helps readers understand why your research is needed.
              </p>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">What's Next</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Now that you understand the three moves, let's test your knowledge with some 
            quick concept-check questions. Don't worry—these are designed to reinforce 
            your learning, not to grade you!
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleContinue} className="w-full">
          Continue to Concept Check
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
