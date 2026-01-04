import { Link } from "react-router-dom";
import { ArrowLeft, Bot, Code, Lightbulb, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InstructorNotes from "@/components/mccp/InstructorNotes";
import DiscussionBoard from "@/components/mccp/DiscussionBoard";

const Week1AIAgentIDE = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp/week1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Week 1</p>
            <h1 className="text-2xl font-bold">Introduction to AI Agent in IDE</h1>
          </div>
        </div>

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              What is an AI Agent in IDE?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              An AI Agent in an Integrated Development Environment (IDE) is an intelligent assistant that helps you 
              write, edit, and improve your academic documents directly within your coding or writing environment. 
              These tools leverage large language models to provide real-time suggestions, corrections, and enhancements.
            </p>
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <h4 className="font-medium mb-2">Key Benefits for Academic Writing</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Real-time grammar and style suggestions</li>
                <li>Help with academic phrasing and vocabulary</li>
                <li>Assistance with citation formatting</li>
                <li>Brainstorming and outlining support</li>
                <li>Translation and paraphrasing assistance</li>
              </ul>
            </div>
            <InstructorNotes
              sectionId="week1-ai-agent-overview"
              notes="This session introduces students to AI-powered writing tools. Emphasize that these tools are assistants, not replacements for critical thinking. Demonstrate live examples using Cursor or similar tools."
            />
            <DiscussionBoard sectionId="week1-ai-agent-overview" sectionTitle="AI Agent Overview" />
          </CardContent>
        </Card>

        {/* Popular AI IDEs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Popular AI-Powered IDEs & Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Cursor</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  An AI-first code editor built on VS Code with powerful AI capabilities for writing and editing.
                </p>
                <a 
                  href="https://cursor.sh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline inline-flex items-center gap-1"
                >
                  Visit Cursor <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-medium mb-2">GitHub Copilot</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  AI pair programmer that helps you write code and documents faster with suggestions.
                </p>
                <a 
                  href="https://github.com/features/copilot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline inline-flex items-center gap-1"
                >
                  Learn more <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Windsurf</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  AI-powered IDE with advanced code generation and document editing capabilities.
                </p>
                <a 
                  href="https://codeium.com/windsurf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline inline-flex items-center gap-1"
                >
                  Try Windsurf <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-medium mb-2">VS Code + AI Extensions</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Traditional VS Code enhanced with AI extensions like Continue, Cody, or TabNine.
                </p>
                <a 
                  href="https://code.visualstudio.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline inline-flex items-center gap-1"
                >
                  Get VS Code <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <DiscussionBoard sectionId="week1-ai-tools" sectionTitle="AI-Powered IDEs & Tools" />
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Best Practices for Using AI in Academic Writing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Use AI for Brainstorming</h4>
                  <p className="text-sm text-muted-foreground">Generate ideas, explore different angles, and create outlines</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Verify AI Suggestions</h4>
                  <p className="text-sm text-muted-foreground">Always fact-check and verify any information AI provides</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Maintain Your Voice</h4>
                  <p className="text-sm text-muted-foreground">Use AI to enhance, not replace, your unique academic voice</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Document Your Process</h4>
                  <p className="text-sm text-muted-foreground">Keep records of how you used AI tools in your workflow</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Understand Limitations</h4>
                  <p className="text-sm text-muted-foreground">AI can hallucinate facts and may produce biased or outdated information</p>
                </div>
              </div>
            </div>
            <InstructorNotes
              sectionId="week1-ai-best-practices"
              notes="Discuss real examples of both good and poor AI usage in academic contexts. Have students share their experiences with AI tools. Address concerns about academic integrity upfront."
            />
            <DiscussionBoard sectionId="week1-ai-best-practices" sectionTitle="Best Practices for AI Usage" />
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Follow these steps to set up your AI-powered writing environment:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">Download an AI-powered IDE</strong> - We recommend starting with Cursor as it's user-friendly for beginners
              </li>
              <li>
                <strong className="text-foreground">Set up your HKBU Gen AI API key</strong> - Visit the <Link to="/mccp/api-key" className="text-primary hover:underline">API Key Setup</Link> page for instructions
              </li>
              <li>
                <strong className="text-foreground">Explore the interface</strong> - Familiarize yourself with the chat panel and inline suggestions
              </li>
              <li>
                <strong className="text-foreground">Start with simple tasks</strong> - Try asking the AI to help with grammar checking or rephrasing sentences
              </li>
              <li>
                <strong className="text-foreground">Practice regularly</strong> - The more you use these tools, the more effective you'll become
              </li>
            </ol>
            <DiscussionBoard sectionId="week1-ai-getting-started" sectionTitle="Getting Started with AI IDEs" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Week1AIAgentIDE;
