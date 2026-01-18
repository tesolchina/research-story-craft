import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lightbulb, Trophy, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { CarsCoachSession, Insight } from "./types";

interface LearningReportProps {
  session: Partial<CarsCoachSession>;
  studentId: string;
}

export default function LearningReport({ session, studentId }: LearningReportProps) {
  const { toast } = useToast();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateAndSaveInsights();
  }, []);

  const generateAndSaveInsights = async () => {
    try {
      // Save completion to session
      await supabase
        .from("cars_coach_sessions")
        .update({ completed_at: new Date().toISOString() })
        .eq("id", session.id);

      // Generate sample insights based on session
      const sampleInsights = [
        { text: "Start your introduction with a strong centrality claim connecting your topic to broader issues.", category: "move_1" },
        { text: "Use gap-indicating language like 'however' or 'yet' to clearly signal Move 2.", category: "move_2" },
        { text: "Ensure your research announcement directly addresses the gap you identified.", category: "move_3" },
      ];

      // Save insights to database
      for (const insight of sampleInsights) {
        await supabase.from("student_insights").insert({
          student_id: studentId,
          source_task: "cars_coach",
          source_session_id: session.id,
          insight_text: insight.text,
          category: insight.category,
        });
      }

      // Load saved insights
      const { data } = await supabase
        .from("student_insights")
        .select("*")
        .eq("student_id", studentId)
        .eq("source_session_id", session.id);

      if (data) {
        setInsights(data.map(i => ({
          id: i.id,
          studentId: i.student_id,
          sourceTask: i.source_task,
          sourceSessionId: i.source_session_id,
          insightText: i.insight_text,
          category: i.category,
          isApplied: i.is_applied,
          studentNotes: i.student_notes,
          createdAt: new Date(i.created_at),
          updatedAt: new Date(i.updated_at),
        })));
      }

      // Save to students_progress
      await supabase.from("students_progress").upsert({
        student_id: studentId,
        task_id: "cars_coach_learning",
        task_type: "ai_tutor",
        answer: { sessionId: session.id, discipline: session.discipline },
        score: Math.round(((session.mcResponses?.filter((r: any) => r.isCorrect).length || 0) / Math.max(session.mcResponses?.length || 1, 1)) * 100),
        is_correct: true,
      }, { onConflict: "student_id,task_id" });

      toast({ title: "🎉 Congratulations!", description: "You've completed CARS Coach!" });
    } catch (error) {
      console.error("Error saving report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const mcCorrect = session.mcResponses?.filter((r: any) => r.isCorrect).length || 0;
  const mcTotal = session.mcResponses?.length || 0;
  const accuracy = mcTotal > 0 ? Math.round((mcCorrect / mcTotal) * 100) : 0;

  if (isLoading) {
    return <Card className="p-8 text-center text-muted-foreground">Generating your learning report...</Card>;
  }

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div>
              <CardTitle>Congratulations! 🎉</CardTitle>
              <CardDescription>You've completed CARS Coach</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">{accuracy}%</p>
            <p className="text-sm text-muted-foreground">Quiz Accuracy</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{session.shortAnswers?.length || 0}</p>
            <p className="text-sm text-muted-foreground">Reflections</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{insights.length}</p>
            <p className="text-sm text-muted-foreground">Insights Generated</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Your Actionable Insights
          </CardTitle>
          <CardDescription>Apply these to your academic writing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.map((insight) => (
            <div key={insight.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm">{insight.insightText}</p>
                <Badge variant="outline" className="mt-2 text-xs">{insight.category}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" /> Export Report
        </Button>
      </div>
    </div>
  );
}
