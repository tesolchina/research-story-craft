/**
 * LessonModule.tsx
 * 
 * Main orchestrator component for the interleaved lesson flow.
 * Handles: Teaching → MC Quiz → Teaching → MC Quiz → Open-ended Discussion
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  ArrowLeft,
  Clock,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import TeachingSection from "./TeachingSection";
import MCQuizSection from "./MCQuizSection";
import OpenEndedSection from "./OpenEndedSection";
import LessonNavigator from "./LessonNavigator";
import { CARS_LESSON_MODULE } from "./cars-lesson-content";
import type { LessonModule as LessonModuleType, LessonProgress } from "./types";

interface LessonModuleProps {
  studentId: string;
  discipline: string;
  onBack: () => void;
  onComplete: (progress: LessonProgress) => void;
}

export default function LessonModule({
  studentId,
  discipline,
  onBack,
  onComplete,
}: LessonModuleProps) {
  const { toast } = useToast();
  const lesson = CARS_LESSON_MODULE;
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [mcResponses, setMcResponses] = useState<LessonProgress["mcResponses"]>([]);
  const [openEndedResponses, setOpenEndedResponses] = useState<LessonProgress["openEndedResponses"]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const currentSection = lesson.sections[currentSectionIndex];
  const progress = (completedSections.length / lesson.sections.length) * 100;
  const isComplete = completedSections.length === lesson.sections.length;

  // Load or create session
  useEffect(() => {
    loadProgress();
  }, [studentId]);

  const loadProgress = async () => {
    try {
      // Check for existing session
      const { data: existing } = await supabase
        .from("cars_coach_sessions")
        .select("*")
        .eq("student_id", studentId)
        .is("completed_at", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existing) {
        setSessionId(existing.id);
        // Restore progress from session
        const savedProgress = existing.tasks_completed as unknown as string[] || [];
        setCompletedSections(savedProgress.filter((id: string) => id.startsWith("section_")));
        
        // Find the first incomplete section
        const firstIncomplete = lesson.sections.findIndex(
          (s) => !savedProgress.includes(s.id)
        );
        setCurrentSectionIndex(firstIncomplete >= 0 ? firstIncomplete : 0);

        // Restore MC responses
        const savedMc = existing.mc_responses as unknown as LessonProgress["mcResponses"] || [];
        setMcResponses(savedMc);
      } else {
        // Create new session
        const { data: newSession, error } = await supabase
          .from("cars_coach_sessions")
          .insert({
            student_id: studentId,
            discipline,
            current_phase: "lesson_module",
            tasks_completed: [],
          })
          .select()
          .single();

        if (error) throw error;
        setSessionId(newSession.id);
      }
    } catch (error) {
      console.error("Error loading progress:", error);
      toast({
        title: "Error",
        description: "Failed to load your progress",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async (newCompleted: string[], newMcResponses?: LessonProgress["mcResponses"]) => {
    if (!sessionId) return;

    try {
      await supabase
        .from("cars_coach_sessions")
        .update({
          tasks_completed: newCompleted,
          mc_responses: newMcResponses || mcResponses,
          current_phase: isComplete ? "completion" : "lesson_module",
          updated_at: new Date().toISOString(),
        })
        .eq("id", sessionId);
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const handleSectionComplete = (sectionId: string, data?: any) => {
    const newCompleted = [...completedSections, sectionId];
    setCompletedSections(newCompleted);

    // Handle section-specific data
    if (currentSection.type === "mc_quiz" && data) {
      const newMcResponses = [
        ...mcResponses,
        ...data.map((r: any) => ({ sectionId, ...r })),
      ];
      setMcResponses(newMcResponses);
      saveProgress(newCompleted, newMcResponses);
    } else if (currentSection.type === "open_ended" && data) {
      const newOpenEnded = [
        ...openEndedResponses,
        { sectionId, messages: data },
      ];
      setOpenEndedResponses(newOpenEnded);
      saveProgress(newCompleted);
    } else {
      saveProgress(newCompleted);
    }

    // Move to next section or complete
    if (currentSectionIndex < lesson.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      toast({
        title: "Section completed! ✓",
        description: `Moving to: ${lesson.sections[currentSectionIndex + 1].title}`,
      });
    } else {
      // All sections complete
      const finalProgress: LessonProgress = {
        moduleId: lesson.id,
        currentSectionIndex: lesson.sections.length - 1,
        completedSections: newCompleted,
        mcResponses,
        openEndedResponses,
      };
      onComplete(finalProgress);
      toast({
        title: "Lesson Complete! 🎉",
        description: "Great job finishing the CARS lesson!",
      });
    }
  };

  const handleStartOver = async () => {
    if (!sessionId) return;

    try {
      await supabase
        .from("cars_coach_sessions")
        .update({ completed_at: new Date().toISOString() })
        .eq("id", sessionId);

      setCurrentSectionIndex(0);
      setCompletedSections([]);
      setMcResponses([]);
      setOpenEndedResponses([]);
      setSessionId(null);

      await loadProgress();
      toast({ title: "Starting fresh!", description: "Your previous progress has been saved." });
    } catch (error) {
      console.error("Error starting over:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading lesson...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">{lesson.title}</h2>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Clock className="w-3 h-3" />
          ~{lesson.estimatedMinutes} min
        </Badge>
        {completedSections.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleStartOver} className="ml-auto">
            <RotateCcw className="h-4 w-4 mr-2" /> Start Over
          </Button>
        )}
      </div>

      {/* Progress bar */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Progress value={progress} className="flex-1 h-2" />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {completedSections.length} / {lesson.sections.length} sections
          </span>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar Navigator */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="p-4">
            <LessonNavigator
              sections={lesson.sections}
              currentIndex={currentSectionIndex}
              completedSections={completedSections}
            />
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {isComplete ? (
            <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-50/80 to-background dark:from-green-950/20">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Lesson Complete! 🎉</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  You've finished learning about the CARS model. You now understand how to write effective research introductions!
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={handleStartOver}>
                    <RotateCcw className="w-4 h-4 mr-2" /> Review Again
                  </Button>
                  <Button onClick={onBack}>
                    Back to Overview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : currentSection?.type === "teaching" && currentSection.teachingUnit ? (
            <TeachingSection
              unit={currentSection.teachingUnit}
              sectionNumber={currentSectionIndex + 1}
              totalSections={lesson.sections.length}
              onComplete={() => handleSectionComplete(currentSection.id)}
              isCompleted={completedSections.includes(currentSection.id)}
            />
          ) : currentSection?.type === "mc_quiz" && currentSection.questions ? (
            <MCQuizSection
              questions={currentSection.questions}
              sectionTitle={currentSection.title}
              sectionNumber={currentSectionIndex + 1}
              totalSections={lesson.sections.length}
              onComplete={(responses) => handleSectionComplete(currentSection.id, responses)}
              existingResponses={mcResponses.filter((r) => r.sectionId === currentSection.id)}
            />
          ) : currentSection?.type === "open_ended" && currentSection.openEndedPrompt ? (
            <OpenEndedSection
              prompt={currentSection.openEndedPrompt}
              sectionTitle={currentSection.title}
              sectionNumber={currentSectionIndex + 1}
              totalSections={lesson.sections.length}
              discipline={discipline}
              onComplete={(messages) => handleSectionComplete(currentSection.id, messages)}
              existingMessages={
                openEndedResponses.find((r) => r.sectionId === currentSection.id)?.messages
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
