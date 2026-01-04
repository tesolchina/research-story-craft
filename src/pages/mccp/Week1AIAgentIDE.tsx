import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bot, Code, Terminal, Github, ChevronDown, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CollapsibleModuleProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleModule = ({ title, icon, children, defaultOpen = true }: CollapsibleModuleProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="mb-4">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg font-bold">
              <div className="flex items-center gap-2">
                {icon}
                {title}
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

const Week1AIAgentIDE = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Week 1</p>
            <h1 className="text-2xl font-bold">AI Agent in IDE</h1>
          </div>
        </div>

        <CollapsibleModule 
          title="Agent vs. Chat" 
          icon={<Bot className="h-5 w-5 text-primary" />}
        >
          <p className="text-muted-foreground">
            Using an AI Agent in an IDE is fundamentally different from a simple chat interface. 
            While a chat is a back-and-forth conversation, an **Agent** has direct access to your 
            **files and folders**.
          </p>
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
            <h4 className="font-bold mb-2">Why this matters:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>The agent understands the context of your entire project.</li>
              <li>It can perform complex tasks across multiple files.</li>
              <li>It can automate repetitive structural changes in your documents.</li>
            </ul>
          </div>
        </CollapsibleModule>

        <CollapsibleModule 
          title="Recommended IDEs" 
          icon={<Monitor className="h-5 w-5 text-primary" />}
        >
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
        </CollapsibleModule>

        <CollapsibleModule 
          title="Lab 0: Get the Materials" 
          icon={<Github className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Clone the course repository to your local machine to get started with Lab 0.
            </p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm relative group">
              <code className="block">git clone https://github.com/tesolchina/mccpSpring2026.git</code>
            </div>
            <div className="p-4 border-l-4 border-primary bg-muted/30">
              <h4 className="font-bold mb-1">Next Step:</h4>
              <p className="text-sm text-muted-foreground">
                Open the cloned folder in your AI IDE and navigate to <code>AgentLabs/Lab0</code> to explore the initial setup tasks.
              </p>
            </div>
            <Button asChild className="w-full">
              <a href="https://github.com/tesolchina/mccpSpring2026" target="_blank" rel="noopener noreferrer">
                View Repository <Code className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CollapsibleModule>
      </div>
    </div>
  );
};

export default Week1AIAgentIDE;
