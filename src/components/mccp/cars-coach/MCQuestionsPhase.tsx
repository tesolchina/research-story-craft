/**
 * MCQuestionsPhase.tsx
 * 
 * Wrapper component for the MC questions phase
 * Handles saving responses and phase completion
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, HelpCircle, ArrowRight, BookOpen } from "lucide-react";
import MCQuestionCard, { type MCQuestionResponse } from "./MCQuestionCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Phase, CarsCoachSession } from "./types";

interface MCQuestionsPhaseProps {
  session: Partial<CarsCoachSession>;
  onPhaseComplete: (current: Phase, next: Phase) => void;
}

export default function MCQuestionsPhase({ session, onPhaseComplete }: MCQuestionsPhaseProps) {
  const { toast } = useToast();
  const [isComplete, setIsComplete] = useState(false);
  const [responses, setResponses] = useState<MCQuestionResponse[]>(
    (session.mcResponses as MCQuestionResponse[]) || []
  );

  const handleComplete = async (mcResponses: MCQuestionResponse[]) => {
    setResponses(mcResponses);
    setIsComplete(true);

    // Save responses to database
    if (session.id) {
      try {
        await supabase
          .from("cars_coach_sessions")
          .update({ mc_responses: mcResponses as any })
          .eq("id", session.id);
        
        toast({
          title: "Quiz Completed! ✓",
          description: "Your responses have been saved.",
        });
      } catch (error) {
        console.error("Error saving MC responses:", error);
      }
    }
  };

  const handleContinue = () => {
    onPhaseComplete("mc_questions", "examples");
  };

  // If already completed, show summary
  if (responses.length > 0 && !isComplete) {
    const correctCount = responses.filter(r => r.isCorrect).length;
    const accuracy = Math.round((correctCount / responses.length) * 100);

    return (
      <Card className="border-2 border-green-500/20 bg-gradient-to-br from-green-50/50 to-background dark:from-green-950/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Concept Check Complete!</CardTitle>
              <CardDescription>You scored {accuracy}% ({correctCount}/{responses.length})</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => { setResponses([]); setIsComplete(false); }} 
              variant="outline"
              className="gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Retake Quiz
            </Button>
            <Button onClick={handleContinue} className="gap-2">
              Continue to Examples
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Phase Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Concept Check Questions</h2>
            <p className="text-sm text-muted-foreground">Test your understanding of the CARS model</p>
          </div>
        </div>
        <Badge variant="secondary">Phase 2 of 6</Badge>
      </div>

      {/* MC Question Card */}
      {isComplete ? (
        <Card className="border-2 border-green-500/20">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Great Job!</h3>
            <p className="text-muted-foreground mb-6">
              You've completed the concept check. Ready to see some real examples?
            </p>
            <Button onClick={handleContinue} size="lg" className="gap-2">
              Continue to Examples
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <MCQuestionCard 
          onComplete={handleComplete}
          existingResponses={responses.length > 0 ? responses : undefined}
        />
      )}
    </div>
  );
}
