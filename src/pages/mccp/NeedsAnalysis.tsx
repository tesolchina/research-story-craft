/**
 * NeedsAnalysis.tsx
 * 
 * Index page for Needs Analysis / Use Cases Exploration
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Bot, MessageSquare, Users, ChevronDown, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIWritingSurvey } from "@/components/mccp/surveys/AIWritingSurvey";
import { SurveyDashboard } from "@/components/mccp/surveys/SurveyDashboard";

// Module type for type safety
type ModuleId = "questionnaire" | "ai-template" | "chat" | "dashboard" | null;

const NeedsAnalysis = () => {
  // Track which module is currently expanded (null = none)
  const [activeModule, setActiveModule] = useState<ModuleId>(null);
  
  const userType = localStorage.getItem('mccp_user_type');
  const isTeacher = userType === 'teacher';

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

        {/* Card 2: AI Learning App Template */}
        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-lg border-2",
            activeModule === "ai-template" 
              ? "border-primary bg-primary/5 shadow-lg" 
              : "hover:border-primary/50"
          )}
          onClick={() => handleToggle("ai-template")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center">
                <Bot className="w-5 h-5 text-secondary-foreground" />
              </div>
              <ChevronDown className={cn(
                "w-5 h-5 text-muted-foreground transition-transform",
                activeModule === "ai-template" && "rotate-180"
              )} />
            </div>
            <CardTitle className="text-lg mt-3">AI Learning App Template</CardTitle>
            <CardDescription className="text-sm">
              Test AI-powered tools with interactive demos
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

        {/* AI Template Module */}
        {activeModule === "ai-template" && (
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                AI Learning App Template
              </CardTitle>
              <CardDescription>
                Experience hands-on demos of how AI can enhance your research workflow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">📚 Literature Review</h4>
                    <p className="text-sm text-muted-foreground">
                      Get AI assistance in summarizing and analyzing research papers.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">✍️ Writing Feedback</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive suggestions to improve your academic writing.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">🔬 Methodology Guide</h4>
                    <p className="text-sm text-muted-foreground">
                      Explore research methodology guidance and best practices.
                    </p>
                  </div>
                </div>
                <div className="bg-muted/30 border rounded-lg p-6 text-center">
                  <p className="text-muted-foreground">
                    Interactive AI template interface will be available here.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
