import { Link } from "react-router-dom";
import { ArrowLeft, Bot, Monitor, Github, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Week1AIAgent = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp/week1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Week 1</p>
            <h1 className="text-2xl font-bold">AI Agent Setup & Tools</h1>
          </div>
        </div>

        {/* AI Agent in IDE */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <Bot className="h-5 w-5 text-primary" />
              AI Agent in IDE
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Using an AI Agent in an IDE is fundamentally different from a simple chat interface. 
              While a chat is a back-and-forth conversation, an <strong>Agent</strong> has direct access to your 
              <strong> files and folders</strong>.
            </p>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <h4 className="font-bold mb-2">Why this matters:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>The agent understands the context of your entire project.</li>
                <li>It can perform complex tasks across multiple files.</li>
                <li>It can automate repetitive structural changes in your documents.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Recommended IDEs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">💻</span>
              <Monitor className="h-5 w-5 text-primary" />
              Recommended AI IDEs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              For this course, we recommend using an IDE designed for AI-first development:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-1">Cursor</h4>
                <p className="text-xs text-muted-foreground mb-3">Built on VS Code, optimized for Agentic workflows.</p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer">Download Cursor</a>
                </Button>
              </div>
              <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-1">Windsurf</h4>
                <p className="text-xs text-muted-foreground mb-3">Next-gen AI IDE by Codeium.</p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href="https://codeium.com/windsurf" target="_blank" rel="noopener noreferrer">Try Windsurf</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lab 0 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">🔧</span>
              <Github className="h-5 w-5 text-primary" />
              Lab 0: Get the Materials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <h4 className="font-bold mb-2">Workflow for Students:</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                <li><strong>Fork</strong> the repository on GitHub.</li>
                <li><strong>Clone</strong> your forked version to your local machine.</li>
                <li><strong>Contribute:</strong> Later, you can sync with the upstream repo or issue Pull Requests to contribute your improvements.</li>
              </ol>
            </div>
            
            <p className="text-muted-foreground">
              Clone the course repository (or your fork) to get started:
            </p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <code className="block">git clone https://github.com/tesolchina/mccpSpring2026.git</code>
            </div>
            <div className="p-4 border-l-4 border-primary bg-muted/30">
              <h4 className="font-bold mb-1">Next Step:</h4>
              <p className="text-sm text-muted-foreground">
                Open the folder in your AI IDE and navigate to <code>AgentLabs/Lab0</code>.
              </p>
            </div>
            <Button asChild className="w-full">
              <a href="https://github.com/tesolchina/mccpSpring2026" target="_blank" rel="noopener noreferrer">
                View Repository on GitHub <Code className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* AI-Assisted Learning Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <Sparkles className="h-5 w-5 text-primary" />
              AI-Assisted Learning Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This course integrates AI tools to enhance your learning experience. 
              You'll need to set up access to AI services for various activities.
            </p>
            <div className="p-4 border rounded-lg">
              <h4 className="font-bold mb-2">Setup Steps:</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                <li>Obtain your HKBU Gen AI API key from the university portal</li>
                <li>Configure your API key in the course platform</li>
                <li>Install recommended AI IDE (Cursor or Windsurf)</li>
                <li>Complete Lab 0 to verify your setup</li>
              </ol>
            </div>
            <Button asChild className="w-full">
              <Link to="/mccp/api-key">
                Configure API Key <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Week1AIAgent;
