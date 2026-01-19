/**
 * MCQuestionCard.tsx
 * 
 * Visual multiple-choice question component with clickable options
 * Separate from chat interface for better UX
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw,
  Lightbulb,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MC_QUESTION_BANK, type MCQuestion } from "@/config/mccp/cars-coach-prompts/mc-questions";

interface MCQuestionCardProps {
  onComplete: (responses: MCQuestionResponse[]) => void;
  existingResponses?: MCQuestionResponse[];
}

export interface MCQuestionResponse {
  questionId: string;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

// Shuffle array helper
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MCQuestionCard({ onComplete, existingResponses }: MCQuestionCardProps) {
  // Select 5 questions: 2 easy, 2 medium, 1 hard
  const [questions, setQuestions] = useState<MCQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [responses, setResponses] = useState<MCQuestionResponse[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // If we have existing responses, show results mode
    if (existingResponses && existingResponses.length > 0) {
      setResponses(existingResponses);
      setCurrentIndex(existingResponses.length);
      return;
    }

    // Select questions by difficulty
    const easyQs = shuffleArray(MC_QUESTION_BANK.filter(q => q.difficulty === "easy")).slice(0, 2);
    const mediumQs = shuffleArray(MC_QUESTION_BANK.filter(q => q.difficulty === "medium")).slice(0, 2);
    const hardQs = shuffleArray(MC_QUESTION_BANK.filter(q => q.difficulty === "hard")).slice(0, 1);
    
    setQuestions(shuffleArray([...easyQs, ...mediumQs, ...hardQs]));
  }, [existingResponses]);

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;
  const isComplete = currentIndex >= questions.length;

  const handleSelect = (label: string) => {
    if (hasSubmitted) return;
    setSelectedAnswer(label);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !currentQuestion) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const response: MCQuestionResponse = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
    };
    
    setResponses(prev => [...prev, response]);
    setHasSubmitted(true);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setShowExplanation(false);
    
    if (currentIndex + 1 >= questions.length) {
      // Complete - pass all responses back
      onComplete([...responses]);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRetry = () => {
    setResponses([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setShowExplanation(false);
    
    // Reshuffle questions
    const easyQs = shuffleArray(MC_QUESTION_BANK.filter(q => q.difficulty === "easy")).slice(0, 2);
    const mediumQs = shuffleArray(MC_QUESTION_BANK.filter(q => q.difficulty === "medium")).slice(0, 2);
    const hardQs = shuffleArray(MC_QUESTION_BANK.filter(q => q.difficulty === "hard")).slice(0, 1);
    setQuestions(shuffleArray([...easyQs, ...mediumQs, ...hardQs]));
  };

  // Results summary view
  if (isComplete) {
    const correctCount = responses.filter(r => r.isCorrect).length;
    const accuracy = Math.round((correctCount / responses.length) * 100);
    
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            {accuracy >= 80 ? (
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            ) : accuracy >= 60 ? (
              <Lightbulb className="w-10 h-10 text-amber-500" />
            ) : (
              <BookOpen className="w-10 h-10 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {accuracy >= 80 ? "Excellent Work! 🎉" : accuracy >= 60 ? "Good Progress! 💪" : "Keep Learning! 📚"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score display */}
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">{accuracy}%</div>
            <p className="text-muted-foreground">
              {correctCount} of {responses.length} correct
            </p>
          </div>

          {/* Progress bar */}
          <Progress value={accuracy} className="h-3" />

          {/* Question results */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Your Answers:</h4>
            <div className="grid gap-2">
              {responses.map((r, i) => (
                <div 
                  key={i}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border",
                    r.isCorrect 
                      ? "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800" 
                      : "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800"
                  )}
                >
                  {r.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  )}
                  <span className="text-sm flex-1 line-clamp-1">{r.question}</span>
                  <Badge variant={r.isCorrect ? "secondary" : "destructive"} className="shrink-0">
                    {r.selectedAnswer}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleRetry} variant="outline" className="flex-1 gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
            <Button onClick={() => onComplete(responses)} className="flex-1 gap-2">
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentQuestion) {
    return (
      <Card className="p-8 text-center">
        <div className="animate-pulse text-muted-foreground">Loading questions...</div>
      </Card>
    );
  }

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy": return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "medium": return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300";
      case "hard": return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      default: return "";
    }
  };

  return (
    <Card className="border-2 border-primary/20">
      {/* Header with progress */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline">Question {currentIndex + 1} of {questions.length}</Badge>
            <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
              {currentQuestion.difficulty}
            </Badge>
          </div>
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question */}
        <div className="p-4 rounded-lg bg-muted/50 border">
          <h3 className="text-lg font-medium leading-relaxed">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Options */}
        <div className="grid gap-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.label;
            const isCorrect = option.label === currentQuestion.correctAnswer;
            const showResult = hasSubmitted;
            
            let optionClass = "border-2 transition-all cursor-pointer hover:border-primary/50";
            
            if (showResult) {
              if (isCorrect) {
                optionClass = "border-2 border-green-500 bg-green-50 dark:bg-green-950/30";
              } else if (isSelected && !isCorrect) {
                optionClass = "border-2 border-red-500 bg-red-50 dark:bg-red-950/30";
              } else {
                optionClass = "border-2 border-muted opacity-50";
              }
            } else if (isSelected) {
              optionClass = "border-2 border-primary bg-primary/5";
            }

            return (
              <button
                key={option.label}
                onClick={() => handleSelect(option.label)}
                disabled={hasSubmitted}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl text-left w-full",
                  optionClass
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg shrink-0",
                  showResult && isCorrect 
                    ? "bg-green-500 text-white"
                    : showResult && isSelected && !isCorrect
                    ? "bg-red-500 text-white"
                    : isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}>
                  {showResult && isCorrect ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : showResult && isSelected && !isCorrect ? (
                    <XCircle className="w-5 h-5" />
                  ) : (
                    option.label
                  )}
                </div>
                <span className="flex-1 text-base">{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation (shown after submit) */}
        {showExplanation && (
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Explanation</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          {!hasSubmitted ? (
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedAnswer}
              className="px-6"
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="px-6 gap-2">
              {currentIndex + 1 >= questions.length ? "See Results" : "Next Question"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
