/**
 * LearningLabs.tsx
 * 
 * Index page for Learning Labs - interactive learning modules
 */

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, MessageSquare, Users, ChevronDown, GraduationCap, CheckCircle2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIWritingSurvey } from "@/components/mccp/surveys/AIWritingSurvey";
import QuestionnaireTeacherPreview from "@/components/mccp/surveys/QuestionnaireTeacherPreview";
import CarsCoachApp from "@/components/mccp/cars-coach/CarsCoachApp";
import CarsCoachTeacherPreview from "@/components/mccp/cars-coach/CarsCoachTeacherPreview";
import { CollaborativeChat } from "@/components/mccp/collaborative-chat/CollaborativeChat";
import { useSidebar } from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";

// Module type for type safety
type ModuleId = "questionnaire" | "cars-coach" | "chat" | null;

const LearningLabs = () => {
  const location = useLocation();
  const { setOpen } = useSidebar();
  
  // Track which module is currently expanded (null = none)
  const [activeModule, setActiveModule] = useState<ModuleId>(null);
  const [carsCoachCompleted, setCarsCoachCompleted] = useState(false);

  // Handle hash-based navigation
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'questionnaire') {
      setActiveModule('questionnaire');
    }
  }, [location.hash]);

  // Auto-collapse sidebar when a module becomes active (only on initial expand)
  const [lastModule, setLastModule] = useState<ModuleId>(null);
  useEffect(() => {
    if (activeModule && activeModule !== lastModule) {
      setOpen(false);
      setLastModule(activeModule);
    } else if (!activeModule) {
      setLastModule(null);
    }
  }, [activeModule, lastModule, setOpen]);
  
  const userType = localStorage.getItem('mccp_user_type');
  const isTeacher = userType === 'teacher';
  const studentId = localStorage.getItem('mccp_student_id');

  // Check if CARS Coach is completed (only for students)
  useEffect(() => {
    const checkCarsCoachStatus = async () => {
      if (!studentId || isTeacher) return;
      
      const { data } = await supabase
        .from("cars_coach_sessions")
        .select("completed_at")
        .eq("student_id", studentId)
        .not("completed_at", "is", null)
        .limit(1);
      
      setCarsCoachCompleted(data && data.length > 0);
    };
    
    checkCarsCoachStatus();
  }, [studentId, isTeacher]);

  // Toggle handler - closes if same module clicked, opens new one otherwise
  const handleToggle = (moduleId: ModuleId) => {
    setActiveModule(prev => prev === moduleId ? null : moduleId);
  };

  const handleStartOverCarsCoach = () => {
    setCarsCoachCompleted(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Learning Labs
        </h1>
        <p className="text-muted-foreground text-lg">
          Interactive modules to enhance your academic writing skills
        </p>
        {isTeacher && (
          <Badge variant="secondary" className="mt-2">
            Teacher View - Preview student modules
          </Badge>
        )}
      </div>

      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        
        {/* Card 1: General Questionnaire */}
        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg border-2",
            activeModule === "questionnaire" 
              ? "border-primary bg-primary/5 shadow-lg" 
              : "hover:border-primary/50"
          )}
          onClick={() => handleToggle("questionnaire")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <ChevronDown className={cn(
                "w-5 h-5 text-muted-foreground transition-transform",
                activeModule === "questionnaire" && "rotate-180"
              )} />
            </div>
            <CardTitle className="text-lg mt-3">General Questionnaire</CardTitle>
            <CardDescription className="text-sm">
              {isTeacher 
                ? "Preview survey questions (view responses in Dashboard)" 
                : "Identify your research needs and learning preferences"}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Card 2: CARS Coach - AI Tutor */}
        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg border-2",
            activeModule === "cars-coach" 
              ? "border-primary bg-primary/5 shadow-lg" 
              : "hover:border-primary/50"
          )}
          onClick={() => handleToggle("cars-coach")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-center gap-2">
                {!isTeacher && carsCoachCompleted && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
                <ChevronDown className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform",
                  activeModule === "cars-coach" && "rotate-180"
                )} />
              </div>
            </div>
            <CardTitle className="text-lg mt-3">🎓 CARS Coach</CardTitle>
            <CardDescription className="text-sm">
              {isTeacher 
                ? "Preview task flow (view student progress in Dashboard)" 
                : "Learn genre analysis with an AI tutor using the CARS model"}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Card 3: Collaborative Chat */}
        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg border-2",
            activeModule === "chat" 
              ? "border-primary bg-primary/5 shadow-lg" 
              : "hover:border-primary/50"
          )}
          onClick={() => handleToggle("chat")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-accent-foreground" />
              </div>
              <ChevronDown className={cn(
                "w-5 h-5 text-muted-foreground transition-transform",
                activeModule === "chat" && "rotate-180"
              )} />
            </div>
            <CardTitle className="text-lg mt-3">Collaborative Chat</CardTitle>
            <CardDescription className="text-sm">
              {isTeacher 
                ? "Create and manage discussion sessions" 
                : "Start or join discussions with fellow students"}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Expanded Content Area */}
      <div className={cn(
        "transition-all duration-300 overflow-hidden",
        activeModule ? "opacity-100" : "opacity-0 h-0"
      )}>
        {/* Questionnaire Module */}
        {activeModule === "questionnaire" && (
          isTeacher ? <QuestionnaireTeacherPreview /> : <AIWritingSurvey />
        )}

        {/* CARS Coach Module */}
        {activeModule === "cars-coach" && (
          isTeacher ? (
            <CarsCoachTeacherPreview />
          ) : studentId ? (
            carsCoachCompleted ? (
              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="w-5 h-5" />
                    CARS Coach Completed!
                  </CardTitle>
                  <CardDescription>
                    You've successfully completed the CARS Coach learning module.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border border-green-200 rounded-lg p-6 text-center">
                    <GraduationCap className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">
                      Great work! You can review your learning or start a new session.
                    </p>
                    <Button 
                      onClick={handleStartOverCarsCoach}
                      variant="outline"
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Start New Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <CarsCoachApp 
                studentId={studentId} 
                onBack={() => setActiveModule(null)} 
              />
            )
          ) : (
            <Card className="border-2 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  CARS Coach
                </CardTitle>
                <CardDescription>
                  Please log in to access the CARS Coach AI tutor.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 border rounded-lg p-6 text-center">
                  <GraduationCap className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Login with your student ID to start learning about the CARS model.
                  </p>
                  <a 
                    href="/mccp/auth" 
                    className="inline-block mt-4 text-primary hover:underline"
                  >
                    Go to Login →
                  </a>
                </div>
              </CardContent>
            </Card>
          )
        )}

        {/* Collaborative Chat Module */}
        {activeModule === "chat" && (
          (studentId || isTeacher) ? (
            <CollaborativeChat studentId={isTeacher ? '1989' : studentId!} />
          ) : (
            <Card className="border-2 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Collaborative Chat
                </CardTitle>
                <CardDescription>
                  Create a new chat room or join an existing discussion with classmates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    <Users className="w-4 h-4" />
                    <span>Sign in required to participate in collaborative chats</span>
                  </div>
                  <div className="bg-muted/30 border rounded-lg p-6 text-center min-h-[200px] flex flex-col items-center justify-center">
                    <MessageSquare className="w-12 h-12 text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">
                      Login with your student ID to join discussions.
                    </p>
                    <a 
                      href="/mccp/auth" 
                      className="inline-block mt-4 text-primary hover:underline"
                    >
                      Go to Login →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default LearningLabs;
