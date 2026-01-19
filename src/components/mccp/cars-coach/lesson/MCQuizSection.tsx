/**
 * MCQuizSection.tsx
 * 
 * Standalone multiple-choice quiz section for lesson modules.
 * Shows questions one at a time with immediate feedback.
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Brain,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MCQuestionItem } from "./types";

interface MCQuizSectionProps {
  questions: MCQuestionItem[];
  sectionTitle: string;
  sectionNumber: number;
  totalSections: number;
  onComplete: (responses: { questionId: string; selectedAnswer: string; isCorrect: boolean }[]) => void;
  existingResponses?: { questionId: string; selectedAnswer: string; isCorrect: boolean }[];
}

export default function MCQuizSection({
  questions,
  sectionTitle,
  sectionNumber,
  totalSections,
  onComplete,
  existingResponses,
}: MCQuizSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responses, setResponses] = useState<{ questionId: string; selectedAnswer: string; isCorrect: boolean }[]>(
    existingResponses || []
  );
  const [showResults, setShowResults] = useState(existingResponses && existingResponses.length === questions.length);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + (isSubmitted ? 1 : 0)) / questions.length) * 100;

  const handleSubmit = () => {
    if (!selectedAnswer || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newResponse = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
    };

    setResponses([...responses, newResponse]);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setResponses([]);
    setShowResults(false);
  };

  const handleContinue = () => {
    onComplete(responses);
  };

  // Show results summary
  if (showResults) {
    const correctCount = responses.filter((r) => r.isCorrect).length;
    const accuracy = Math.round((correctCount / questions.length) * 100);
    const passed = accuracy >= 60;

    return (
      <Card className={cn(
        "border-2",
        passed ? "border-green-500/30 bg-gradient-to-br from-green-50/80 to-background dark:from-green-950/20" :
                 "border-amber-500/30 bg-gradient-to-br from-amber-50/80 to-background dark:from-amber-950/20"
      )}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                passed ? "bg-green-100 dark:bg-green-900" : "bg-amber-100 dark:bg-amber-900"
              )}>
                {passed ? (
                  <Sparkles className="w-6 h-6 text-green-600" />
                ) : (
                  <Brain className="w-6 h-6 text-amber-600" />
                )}
              </div>
              <div>
                <CardTitle>{passed ? "Great Job!" : "Keep Practicing!"}</CardTitle>
                <CardDescription>
                  You got {correctCount} of {questions.length} correct ({accuracy}%)
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={accuracy} className={cn("h-3", passed ? "bg-green-100" : "bg-amber-100")} />

          {/* Individual question results */}
          <div className="space-y-2">
            {questions.map((q, i) => {
              const response = responses.find((r) => r.questionId === q.id);
              return (
                <div
                  key={q.id}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-lg text-sm",
                    response?.isCorrect
                      ? "bg-green-50 dark:bg-green-950/30"
                      : "bg-red-50 dark:bg-red-950/30"
                  )}
                >
                  {response?.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                  <span className="flex-1 truncate">Q{i + 1}: {q.question}</span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={handleRetry} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Retry Quiz
            </Button>
            <Button onClick={handleContinue} className="gap-2 flex-1">
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentQuestion) return null;

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{sectionTitle}</CardTitle>
              <CardDescription>
                Question {currentIndex + 1} of {questions.length}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary">
            Section {sectionNumber} of {totalSections}
          </Badge>
        </div>
        <Progress value={progress} className="h-2 mt-4" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question */}
        <div className="p-4 rounded-lg bg-muted/50">
          <p className="font-medium text-lg">{currentQuestion.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.label;
            const isCorrectAnswer = option.label === currentQuestion.correctAnswer;
            const showCorrect = isSubmitted && isCorrectAnswer;
            const showIncorrect = isSubmitted && isSelected && !isCorrectAnswer;

            return (
              <button
                key={option.label}
                onClick={() => !isSubmitted && setSelectedAnswer(option.label)}
                disabled={isSubmitted}
                className={cn(
                  "w-full p-4 rounded-lg border-2 text-left transition-all",
                  "hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
                  isSelected && !isSubmitted && "border-primary bg-primary/5",
                  showCorrect && "border-green-500 bg-green-50 dark:bg-green-950/30",
                  showIncorrect && "border-red-500 bg-red-50 dark:bg-red-950/30",
                  !isSelected && !showCorrect && !showIncorrect && "border-muted-foreground/20"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                      isSelected && !isSubmitted && "bg-primary text-primary-foreground",
                      showCorrect && "bg-green-500 text-white",
                      showIncorrect && "bg-red-500 text-white",
                      !isSelected && !showCorrect && !showIncorrect && "bg-muted"
                    )}
                  >
                    {option.label}
                  </span>
                  <span className="flex-1">{option.text}</span>
                  {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation (shown after submit) */}
        {isSubmitted && (
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Explanation:</strong> {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {!isSubmitted ? (
            <Button onClick={handleSubmit} disabled={!selectedAnswer} className="gap-2">
              Check Answer
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleNext} className="gap-2">
              {currentIndex < questions.length - 1 ? "Next Question" : "View Results"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
