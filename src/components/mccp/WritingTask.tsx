import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenLine, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface WritingTaskProps {
  title: string;
  description: string;
  prompt: string;
  taskId: string;
  taskType: "centrality_statement" | "paraphrase";
  studentId: string;
  context?: string;
  onComplete: () => void;
}

const WritingTask = ({
  title,
  description,
  prompt,
  taskId,
  taskType,
  studentId,
  context,
  onComplete,
}: WritingTaskProps) => {
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    loadProgress();
  }, [taskId, studentId]);

  const loadProgress = async () => {
    const { data } = await supabase
      .from("students_progress")
      .select("answer, ai_feedback")
      .eq("student_id", studentId)
      .eq("task_id", taskId)
      .maybeSingle();

    if (data) {
      const savedAnswer = data.answer as { text: string } | null;
      if (savedAnswer?.text) {
        setText(savedAnswer.text);
      }
      if (data.ai_feedback) {
        setFeedback(data.ai_feedback);
        setHasSubmitted(true);
      }
    }
    setIsLoadingProgress(false);
  };

  const handleGetFeedback = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setFeedback(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-writing-feedback", {
        body: {
          text: text.trim(),
          taskType,
          taskContext: context,
          studentId,
        },
      });

      if (error) throw error;

      const aiFeedback = data.feedback;
      setFeedback(aiFeedback);
      setHasSubmitted(true);

      setIsSaving(true);
      const { error: insertError } = await supabase.from("students_progress").insert({
        student_id: studentId,
        task_id: taskId,
        task_type: "writing",
        answer: { text: text.trim() },
        ai_feedback: aiFeedback,
      } as any);
      if (insertError?.code === "23505") {
        await supabase.from("students_progress")
          .update({ answer: { text: text.trim() } as any, ai_feedback: aiFeedback })
          .eq("student_id", studentId)
          .eq("task_id", taskId);
      }
      setIsSaving(false);
      onComplete();
    } catch (error) {
      console.error("Error getting feedback:", error);
      setFeedback("Sorry, there was an error generating feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!text.trim()) return;

    setIsSaving(true);
    const { error: insertError } = await supabase.from("students_progress").insert({
      student_id: studentId,
      task_id: taskId,
      task_type: "writing",
      answer: { text: text.trim() },
    } as any);
    if (insertError?.code === "23505") {
      await supabase.from("students_progress")
        .update({ answer: { text: text.trim() } as any })
        .eq("student_id", studentId)
        .eq("task_id", taskId);
    }
    setIsSaving(false);
  };

  if (isLoadingProgress) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Loading your work...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PenLine className="h-5 w-5" />
          {title}
          {hasSubmitted && <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto" />}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Task:</p>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{prompt}</p>
        </div>

        {context && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium mb-2 text-blue-800">Reference Material:</p>
            <p className="text-sm text-blue-700 whitespace-pre-wrap">{context}</p>
          </div>
        )}

        <Textarea
          placeholder="Write your response here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-40"
        />

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={!text.trim() || isSaving}
          >
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
          <Button
            onClick={handleGetFeedback}
            disabled={!text.trim() || isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Getting AI Feedback...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Get AI Feedback
              </>
            )}
          </Button>
        </div>

        {feedback && (
          <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
            <p className="text-sm font-medium mb-2 flex items-center gap-2 text-purple-800">
              <Sparkles className="h-4 w-4" />
              AI Feedback
            </p>
            <div className="text-sm text-foreground whitespace-pre-wrap">{feedback}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WritingTask;
