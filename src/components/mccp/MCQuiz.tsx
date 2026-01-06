import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface MCQuizProps {
  title: string;
  description: string;
  questions: Question[];
  taskId: string;
  studentId: string;
  onComplete: (score: number, total: number) => void;
}

interface SavedAnswer {
  questionId: string;
  selectedIndex: number;
}

const MCQuiz = ({ title, description, questions, taskId, studentId, onComplete }: MCQuizProps) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [taskId, studentId]);

  const loadProgress = async () => {
    const { data } = await supabase
      .from("students_progress")
      .select("answer, is_correct, score")
      .eq("student_id", studentId)
      .eq("task_id", taskId)
      .maybeSingle();

    if (data?.answer && Array.isArray(data.answer)) {
      const savedAnswers = data.answer as unknown as SavedAnswer[];
      const answersMap: Record<string, number> = {};
      savedAnswers.forEach((a) => {
        answersMap[a.questionId] = a.selectedIndex;
      });
      setAnswers(answersMap);
      setSubmitted(true);
    }
    setIsLoading(false);
  };

  const handleAnswerChange = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const answerData: SavedAnswer[] = Object.entries(answers).map(([questionId, selectedIndex]) => ({
      questionId,
      selectedIndex,
    }));

    // Try insert first, then update if conflict
    const { error: insertError } = await supabase.from("students_progress").insert({
      student_id: studentId,
      task_id: taskId,
      task_type: "mc",
      answer: answerData,
      is_correct: score === questions.length,
      score: score,
    } as any);
    
    if (insertError?.code === "23505") {
      await supabase.from("students_progress")
        .update({ answer: answerData as any, is_correct: score === questions.length, score })
        .eq("student_id", studentId)
        .eq("task_id", taskId);
    }

    setSubmitted(true);
    onComplete(score, questions.length);
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const score = calculateScore();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Loading quiz...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={q.id} className="space-y-3 p-4 border rounded-lg">
            <p className="font-medium">
              {qIndex + 1}. {q.question}
            </p>
            <RadioGroup
              value={answers[q.id]?.toString()}
              onValueChange={(value) => handleAnswerChange(q.id, parseInt(value))}
              disabled={submitted}
            >
              {q.options.map((option, oIndex) => {
                const isSelected = answers[q.id] === oIndex;
                const isCorrect = oIndex === q.correctIndex;
                let bgClass = "";
                
                if (submitted) {
                  if (isCorrect) {
                    bgClass = "bg-green-50 border-green-200";
                  } else if (isSelected && !isCorrect) {
                    bgClass = "bg-red-50 border-red-200";
                  }
                }

                return (
                  <div
                    key={oIndex}
                    className={`flex items-center space-x-2 p-2 rounded border ${bgClass}`}
                  >
                    <RadioGroupItem value={oIndex.toString()} id={`${q.id}-${oIndex}`} />
                    <Label htmlFor={`${q.id}-${oIndex}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                    {submitted && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                    {submitted && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                );
              })}
            </RadioGroup>
            {submitted && q.explanation && (
              <p className="text-sm text-muted-foreground mt-2 p-2 bg-muted rounded">
                💡 {q.explanation}
              </p>
            )}
          </div>
        ))}

        {submitted ? (
          <div className="p-4 bg-primary/10 rounded-lg text-center">
            <p className="text-lg font-semibold">
              Your Score: {score} / {questions.length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {score === questions.length
                ? "🎉 Perfect score!"
                : score >= questions.length / 2
                ? "👍 Good job! Review the explanations above."
                : "📚 Review the material and try again."}
            </p>
          </div>
        ) : (
          <Button onClick={handleSubmit} disabled={!allAnswered} className="w-full">
            Submit Answers
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MCQuiz;
