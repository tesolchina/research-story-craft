import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, GraduationCap, ArrowLeft, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TASKS, DISCIPLINES, type Phase, type Message, type CarsCoachSession } from "./types";
import CarsCoachOverview from "./CarsCoachOverview";
import DisciplineSelector from "./DisciplineSelector";
import MCQuestionsPhase from "./MCQuestionsPhase";
import ChatInterface from "./ChatInterface";
import LearningReport from "./LearningReport";

interface CarsCoachAppProps {
  studentId: string;
  onBack: () => void;
}

export default function CarsCoachApp({ studentId, onBack }: CarsCoachAppProps) {
  const { toast } = useToast();
  const [session, setSession] = useState<Partial<CarsCoachSession> | null>(null);
  const [currentPhase, setCurrentPhase] = useState<Phase>("overview");
  const [tasksCompleted, setTasksCompleted] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrCreateSession();
  }, [studentId]);

  const loadOrCreateSession = async () => {
    try {
      const { data: existing } = await supabase
        .from("cars_coach_sessions")
        .select("*")
        .eq("student_id", studentId)
        .is("completed_at", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existing) {
        // Parse chat_history from JSON, converting timestamp strings to Date objects
        const rawHistory = Array.isArray(existing.chat_history) 
          ? (existing.chat_history as unknown as any[]) 
          : [];
        const chatHistory: Message[] = rawHistory.map(m => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        
        setSession({
          id: existing.id,
          studentId: existing.student_id,
          discipline: existing.discipline,
          currentPhase: existing.current_phase as Phase,
          tasksCompleted: (existing.tasks_completed as unknown as string[]) || [],
          chatHistory,
          mcResponses: (existing.mc_responses as unknown as any[]) || [],
          shortAnswers: (existing.short_answers as unknown as any[]) || [],
        });
        setCurrentPhase(existing.current_phase as Phase);
        setTasksCompleted((existing.tasks_completed as unknown as string[]) || []);
      } else {
        // No existing session - start fresh with overview
        setCurrentPhase("overview");
      }
    } catch (error) {
      console.error("Error loading session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = async () => {
    if (!session?.id) return;
    
    try {
      // Mark current session as completed (preserves chat history)
      await supabase
        .from("cars_coach_sessions")
        .update({ completed_at: new Date().toISOString() })
        .eq("id", session.id);

      // Reset local state to start fresh
      setSession(null);
      setCurrentPhase("overview");
      setTasksCompleted([]);
      
      toast({ title: "Starting fresh!", description: "Your previous session has been saved." });
    } catch (error) {
      console.error("Error starting over:", error);
      toast({ title: "Error", description: "Failed to start over", variant: "destructive" });
    }
  };

  const handleOverviewComplete = () => {
    setCurrentPhase("discipline_selection");
    setTasksCompleted(["overview"]);
  };

  const handleDisciplineSelect = async (discipline: string) => {
    try {
      const { data, error } = await supabase
        .from("cars_coach_sessions")
        .insert({
          student_id: studentId,
          discipline,
          current_phase: "introduction",
          tasks_completed: ["overview", "discipline"],
        })
        .select()
        .single();

      if (error) throw error;

      setSession({
        id: data.id,
        studentId: data.student_id,
        discipline: data.discipline,
        currentPhase: "introduction",
        tasksCompleted: ["overview", "discipline"],
        chatHistory: [],
        mcResponses: [],
        shortAnswers: [],
      });
      setCurrentPhase("introduction");
      setTasksCompleted(["overview", "discipline"]);
      
      toast({ title: "Discipline selected!", description: "Let's begin learning about the CARS model." });
    } catch (error) {
      console.error("Error creating session:", error);
      toast({ title: "Error", description: "Failed to start session", variant: "destructive" });
    }
  };

  const handlePhaseComplete = async (phase: Phase, nextPhase: Phase) => {
    const taskId = TASKS.find(t => t.phase === phase)?.id;
    const newTasksCompleted = taskId && !tasksCompleted.includes(taskId) 
      ? [...tasksCompleted, taskId] 
      : tasksCompleted;

    try {
      await supabase
        .from("cars_coach_sessions")
        .update({
          current_phase: nextPhase,
          tasks_completed: newTasksCompleted,
        })
        .eq("id", session?.id);

      setCurrentPhase(nextPhase);
      setTasksCompleted(newTasksCompleted);
    } catch (error) {
      console.error("Error updating phase:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading CARS Coach...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">CARS Coach</h2>
        </div>
        {session?.discipline && (
          <Badge variant="secondary">
            {DISCIPLINES.find(d => d.value === session.discipline)?.label}
          </Badge>
        )}
        {session && currentPhase !== "discipline_selection" && (
          <Button variant="outline" size="sm" onClick={handleStartOver} className="ml-auto">
            <RotateCcw className="h-4 w-4 mr-2" /> Start Over
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Task Checklist */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Learning Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {TASKS.map((task) => (
              <div key={task.id} className="flex items-center gap-2 text-sm">
                {tasksCompleted.includes(task.id) ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={tasksCompleted.includes(task.id) ? "text-muted-foreground line-through" : ""}>
                  {task.title}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {currentPhase === "overview" && (
            <CarsCoachOverview onStart={handleOverviewComplete} />
          )}

          {currentPhase === "discipline_selection" && (
            <DisciplineSelector onSelect={handleDisciplineSelect} />
          )}

          {currentPhase === "mc_questions" && session && (
            <MCQuestionsPhase
              session={session}
              onPhaseComplete={handlePhaseComplete}
            />
          )}
          
          {/* Chat-based phases: introduction, examples, short_answers, paragraph_analysis, final_reflection */}
          {["introduction", "examples", "short_answers", "paragraph_analysis", "final_reflection"].includes(currentPhase) && session && (
            <ChatInterface
              session={session}
              currentPhase={currentPhase}
              onPhaseComplete={handlePhaseComplete}
              studentId={studentId}
            />
          )}
          
          {currentPhase === "completion" && session && (
            <LearningReport session={session} studentId={studentId} />
          )}
        </div>
      </div>
    </div>
  );
}
