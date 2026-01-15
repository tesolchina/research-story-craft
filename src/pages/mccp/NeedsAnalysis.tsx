/**
 * NeedsAnalysis.tsx
 * 
 * Index page for Needs Analysis / Use Cases Exploration
 * Provides three main pathways:
 * 1. General Questionnaire - for gathering student needs
 * 2. AI Learning App Template - for testing use cases
 * 3. Collaborative Chat - for student discussions
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Bot, MessageSquare, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NeedsAnalysis = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Needs Analysis & Use Cases Exploration
        </h1>
        <p className="text-muted-foreground text-lg">
          Explore different pathways to understand your research needs and test AI-assisted learning tools.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: General Questionnaire */}
        <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <ClipboardList className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">General Questionnaire</CardTitle>
            <CardDescription>
              Answer questions to help identify your research needs and learning preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This questionnaire will help us understand your background, research interests, 
                and areas where AI tools could assist your academic journey.
              </p>
              <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                <span>📋</span>
                <span>Questions coming soon</span>
              </div>
              <Link to="/mccp/needs-analysis/questionnaire">
                <Button className="w-full" variant="outline" disabled>
                  Start Questionnaire
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: AI Learning App Template */}
        <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-secondary-foreground" />
            </div>
            <CardTitle className="text-xl">AI Learning App Template</CardTitle>
            <CardDescription>
              Test and explore AI-powered learning tools with our interactive template.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Experience a hands-on demo of how AI can enhance your research workflow. 
                Try different use cases and see AI assistance in action.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Literature review assistance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Writing feedback & suggestions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Research methodology guidance
                </li>
              </ul>
              <Link to="/mccp/needs-analysis/ai-template">
                <Button className="w-full">
                  Try AI Template
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Collaborative Chat */}
        <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-accent-foreground" />
            </div>
            <CardTitle className="text-xl">Collaborative Chat</CardTitle>
            <CardDescription>
              Start or join a discussion room with fellow students.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Create a new chat room for collaborative discussions. 
                Other signed-in students can join your room to share ideas and learn together.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-md">
                <Users className="w-4 h-4" />
                <span>Sign in required to participate</span>
              </div>
              <Link to="/mccp/needs-analysis/chat">
                <Button className="w-full" variant="secondary">
                  Start New Chat
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Info Section */}
      <div className="mt-12 p-6 bg-muted/50 rounded-lg border">
        <h2 className="text-lg font-semibold mb-2">How to Use This Section</h2>
        <p className="text-muted-foreground">
          This exploration hub is designed to help you discover how AI tools can support your 
          research and academic writing. Start with the questionnaire to identify your needs, 
          then explore the AI template to see practical applications. Use the collaborative 
          chat to discuss ideas with your peers.
        </p>
      </div>
    </div>
  );
};

export default NeedsAnalysis;
