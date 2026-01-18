/**
 * NeedsAnalysis.tsx
 * 
 * Index page for Needs Analysis / Use Cases Exploration
 */

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Bot, MessageSquare, Users, ChevronDown, BarChart3, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIWritingSurvey } from "@/components/mccp/surveys/AIWritingSurvey";
import { SurveyDashboard } from "@/components/mccp/surveys/SurveyDashboard";
import CarsCoachApp from "@/components/mccp/cars-coach/CarsCoachApp";

// Module type for type safety
type ModuleId = "questionnaire" | "ai-template" | "cars-coach" | "chat" | "dashboard" | null;

const NeedsAnalysis = () => {
  const location = useLocation();
  
  // Track which module is currently expanded (null = none)
  const [activeModule, setActiveModule] = useState<ModuleId>(null);

  // Handle hash-based navigation
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'questionnaire') {
      setActiveModule('questionnaire');
    }
  }, [location.hash]);
  
  const userType = localStorage.getItem('mccp_user_type');
  const isTeacher = userType === 'teacher';
  const studentId = localStorage.getItem('mccp_student_id');

  // Toggle handler - closes if same module clicked, opens new one otherwise
  const handleToggle = (moduleId: ModuleId) => {
    setActiveModule(prev => prev === moduleId ? null : moduleId);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Needs Analysis & Use Cases Exploration
        </h1>
        <p className="text-muted-foreground text-lg">
          Click on a card to explore that module. Toggle between different pathways below.
        </p>
      </div>

      {/* Teacher Dashboard Card - only visible for teachers */}
      {isTeacher && (
        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg border-2 mb-6",
            activeModule === "dashboard" 
              ? "border-primary bg-primary/5 shadow-lg" 
              : "hover:border-primary/50"
          )}
          onClick={() => handleToggle("dashboard")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <ChevronDown className={cn(
                "w-5 h-5 text-muted-foreground transition-transform",
                activeModule === "dashboard" && "rotate-180"
              )} />
            </div>
            <CardTitle className="text-lg mt-3">📊 Survey Dashboard (Teacher Only)</CardTitle>
            <CardDescription className="text-sm">
              View and analyze all student survey responses
            </CardDescription>
          </CardHeader>
        </Card>
      )}

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
              Identify your research needs and learning preferences
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
              <ChevronDown className={cn(
                "w-5 h-5 text-muted-foreground transition-transform",
                activeModule === "cars-coach" && "rotate-180"
              )} />
            </div>
            <CardTitle className="text-lg mt-3">🎓 CARS Coach</CardTitle>
            <CardDescription className="text-sm">
              Learn genre analysis with an AI tutor using the CARS model
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
              Start or join discussions with fellow students
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Expanded Content Area */}
      <div className={cn(
        "transition-all duration-300 overflow-hidden",
        activeModule ? "opacity-100" : "opacity-0 h-0"
      )}>
        {/* Teacher Dashboard */}
        {activeModule === "dashboard" && isTeacher && (
          <SurveyDashboard />
        )}

        {/* Questionnaire Module */}
        {activeModule === "questionnaire" && (
          <AIWritingSurvey />
        )}

        {/* CARS Coach Module */}
        {activeModule === "cars-coach" && (
          studentId ? (
            <CarsCoachApp 
              studentId={studentId} 
              onBack={() => setActiveModule(null)} 
            />
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
                    Collaborative chat interface will appear here.
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Students can create rooms and invite others to join discussions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Info Section - only show when no module is active */}
      {!activeModule && (
        <div className="mt-8 p-6 bg-muted/50 rounded-lg border">
          <h2 className="text-lg font-semibold mb-2">How to Use This Section</h2>
          <p className="text-muted-foreground">
            Click on any card above to expand its content. This exploration hub helps you discover 
            how AI tools can support your research and academic writing. Start with the questionnaire 
            to identify your needs, explore the AI template for practical applications, or use the 
            collaborative chat to discuss ideas with peers.
          </p>
        </div>
      )}
    </div>
  );
};

export default NeedsAnalysis;
