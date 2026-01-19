/**
 * MCQuestionsPhase.tsx
 * 
 * Standalone MC questions phase - completely separate from chat
 * This is THE ONLY place MC questions are administered
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  BookOpen, 
  Brain,
  Target,
  Sparkles 
} from "lucide-react";
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

  const handleRetake = () => {
    setResponses([]);
    setIsComplete(false);
  };

  // If already completed from previous session, show summary
  if (responses.length > 0 && !isComplete) {
    const correctCount = responses.filter(r => r.isCorrect).length;
    const accuracy = Math.round((correctCount / responses.length) * 100);

    return (
      <div className="space-y-6">
        {/* Phase Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl">Concept Check Complete!</h2>
              <p className="text-sm text-muted-foreground">You've already completed this quiz</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm px-3 py-1">Phase 2 of 6</Badge>
        </div>

        {/* Results Card */}
        <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-50/80 to-emerald-50/50 dark:from-green-950/30 dark:to-emerald-950/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-200/40 to-transparent rounded-bl-full" />
          
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Your Score
              </CardTitle>
              <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
            </div>
            <CardDescription>{correctCount} of {responses.length} questions correct</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Progress value={accuracy} className="h-3 bg-green-100 dark:bg-green-900" />
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                onClick={handleRetake} 
                variant="outline"
                className="gap-2 border-green-300 hover:bg-green-50"
              >
                <BookOpen className="w-4 h-4" />
                Retake Quiz
              </Button>
              <Button onClick={handleContinue} className="gap-2 bg-green-600 hover:bg-green-700">
                Continue to Examples
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Phase Header with Visual Appeal */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-6 border">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-2xl flex items-center gap-2">
                Concept Check
                <Sparkles className="w-5 h-5 text-amber-500" />
              </h2>
              <p className="text-muted-foreground">
                Test your understanding of the CARS model
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm px-4 py-2 font-medium">
            Phase 2 of 6
          </Badge>
        </div>

        {/* Info Pills */}
        <div className="relative flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-background/80">
            <HelpCircle className="w-3 h-3 mr-1" />
            5 Questions
          </Badge>
          <Badge variant="outline" className="bg-background/80">
            Mixed Difficulty
          </Badge>
          <Badge variant="outline" className="bg-background/80">
            Instant Feedback
          </Badge>
        </div>
      </div>

      {/* MC Question Card */}
      {isComplete ? (
        <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-50/80 to-background dark:from-green-950/20">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Great Job! 🎉</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You've completed the concept check. Now let's look at some real examples from your field to see the CARS model in action!
            </p>
            <Button onClick={handleContinue} size="lg" className="gap-2 px-8">
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
