import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lightbulb, Trophy, Download, FileText } from "lucide-react";
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
      const completedAtIso = new Date().toISOString();

      // Persist completion + a compact learning_report so it can be shown on dashboards
      const chatHistoryJson = (session.chatHistory || []).map((m: any) => ({
        id: m.id || crypto.randomUUID(),
        role: m.role,
        content: m.content,
        timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : String(m.timestamp),
      }));

      const computedAccuracy = calculateAccuracy();
      const finalReflection = [...(session.chatHistory || [])]
        .reverse()
        .find((m: any) => m.role === "user")?.content;

      const learningReport = {
        discipline: session.discipline || "",
        mcAccuracy: computedAccuracy,
        mcTotal: session.mcResponses?.length || 0,
        mcCorrect: session.mcResponses?.filter((r: any) => r.isCorrect).length || 0,
        shortAnswerCount: session.shortAnswers?.length || 0,
        keyTakeaways: [
          "Move 1 establishes importance and territory (centrality + background)",
          "Move 2 creates a niche using gap/contrast language (e.g., however, yet)",
          "Move 3 occupies the niche by stating aims, questions, or approach",
        ],
        actionableInsights: sampleInsights,
        finalReflection: finalReflection || null,
        completedAt: completedAtIso,
      };

      // Save completion + report to session
      await supabase
        .from("cars_coach_sessions")
        .update({
          completed_at: completedAtIso,
          learning_report: learningReport as any,
          chat_history: chatHistoryJson as any,
        })
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
        score: calculateAccuracy(),
        is_correct: true,
      }, { onConflict: "student_id,task_id" });

      toast({ title: "🎉 Congratulations!", description: "You've completed CARS Coach!" });
    } catch (error) {
      console.error("Error saving report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate accuracy from chat history by analyzing MC question patterns
  const calculateAccuracy = () => {
    const chatHistory = session.chatHistory || [];
    let correctCount = 0;
    let totalQuestions = 0;

    // Look through messages for MC patterns and answers
    for (let i = 0; i < chatHistory.length; i++) {
      const msg = chatHistory[i];
      if (msg.role === "assistant" && msg.content) {
        // Check if this message contains feedback for a correct answer
        const content = msg.content.toLowerCase();
        if (content.includes("correct") || content.includes("well done") || content.includes("that's right") || content.includes("exactly")) {
          // Check if previous message was from user (their answer)
          if (i > 0 && chatHistory[i - 1]?.role === "user") {
            correctCount++;
            totalQuestions++;
          }
        } else if (content.includes("incorrect") || content.includes("not quite") || content.includes("actually") || content.includes("the correct answer")) {
          if (i > 0 && chatHistory[i - 1]?.role === "user") {
            totalQuestions++;
          }
        }
      }
    }

    // Also check mcResponses if available
    if (session.mcResponses && session.mcResponses.length > 0) {
      const mcCorrect = session.mcResponses.filter((r: any) => r.isCorrect).length;
      const mcTotal = session.mcResponses.length;
      return mcTotal > 0 ? Math.round((mcCorrect / mcTotal) * 100) : 0;
    }

    return totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  };

  const accuracy = calculateAccuracy();
  const questionsAnswered = session.chatHistory?.filter(m => m.role === "user").length || 0;
  const reflections = session.shortAnswers?.length || 0;

  const handleExportReport = () => {
    const reportContent = generateReportContent();
    const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CARS_Coach_Report_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Report Downloaded!", description: "Your learning report has been saved." });
  };

  const generateReportContent = () => {
    const divider = "=".repeat(60);
    const lines = [
      divider,
      "CARS COACH LEARNING REPORT",
      divider,
      "",
      `Date: ${new Date().toLocaleDateString()}`,
      `Student ID: ${studentId}`,
      `Discipline: ${session.discipline || "Not specified"}`,
      "",
      divider,
      "PERFORMANCE SUMMARY",
      divider,
      "",
      `Quiz Accuracy: ${accuracy}%`,
      `Questions Answered: ${questionsAnswered}`,
      `Writing Reflections: ${reflections}`,
      `Insights Generated: ${insights.length}`,
      "",
      divider,
      "ACTIONABLE INSIGHTS",
      divider,
      "",
    ];

    insights.forEach((insight, index) => {
      lines.push(`${index + 1}. [${insight.category.toUpperCase()}]`);
      lines.push(`   ${insight.insightText}`);
      lines.push("");
    });

    lines.push(divider);
    lines.push("CONVERSATION HISTORY");
    lines.push(divider);
    lines.push("");

    session.chatHistory?.forEach((msg) => {
      const role = msg.role === "assistant" ? "CARS Coach" : "You";
      lines.push(`[${role}]:`);
      lines.push(msg.content);
      lines.push("");
    });

    lines.push(divider);
    lines.push("END OF REPORT");
    lines.push(divider);

    return lines.join("\n");
  };

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
            <p className="text-2xl font-bold text-primary">{questionsAnswered}</p>
            <p className="text-sm text-muted-foreground">Questions Answered</p>
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

      <div className="flex justify-center gap-3">
        <Button onClick={handleExportReport} variant="outline">
          <Download className="h-4 w-4 mr-2" /> Download Report
        </Button>
        <Button onClick={() => window.print()} variant="ghost">
          <FileText className="h-4 w-4 mr-2" /> Print Report
        </Button>
      </div>
    </div>
  );
}
