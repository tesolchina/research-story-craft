import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowDown, ArrowRight, FileText, Bot, Code, FolderOpen, Layers, CheckCircle, Lightbulb, Eye, Edit, FileStack, BarChart3, StickyNote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Week1Activity2 = () => {
  const issuesToAddress = [
    "What is the overall organizational pattern of the paper?",
    "How do sections connect and flow into each other?",
    "What moves does the author make in each major section?",
    "How does the macro structure serve the paper's argument?",
    "What structural patterns can you adopt for your own writing?"
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Activity 1.2: Analyzing Macro-Level Structure</h1>
        <p className="text-muted-foreground">
          Examine the overall organization and structure of published research papers using AI-assisted analysis.
        </p>
      </div>

      {/* Visual Workflow Diagram */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Activity Workflow
          </CardTitle>
          <CardDescription>Use an AI agent to analyze and annotate research paper structures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 py-6">
            {/* Input Section */}
            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-lg border-2 border-dashed border-primary/30 flex-1">
              <div className="text-sm font-semibold text-primary uppercase tracking-wide">Input</div>
              <div className="flex flex-col gap-2 text-center w-full">
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="text-left">One Published Paper<br/><span className="text-xs text-muted-foreground">(md/html/latex - machine readable)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <Edit className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span className="text-left">Human Reader Notes<br/><span className="text-xs text-muted-foreground">(macro structure observations & questions)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <FileStack className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-left">Additional Papers<br/><span className="text-xs text-muted-foreground">(machine readable for AI analysis)</span></span>
                </div>
              </div>
            </div>

            <ArrowRight className="h-8 w-8 text-primary hidden lg:block self-center" />
            <ArrowDown className="h-8 w-8 text-primary lg:hidden self-center" />

            {/* Process Section */}
            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-lg border-2 border-dashed border-secondary/30 flex-1">
              <div className="text-sm font-semibold text-secondary uppercase tracking-wide">Process</div>
              <div className="flex flex-col gap-2 text-center w-full">
                <div className="flex items-center gap-2 text-sm p-2 bg-purple-500/10 rounded">
                  <Bot className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Process Instructions</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-purple-500/10 rounded">
                  <Eye className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Critically Review & Enhance Human Notes</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-purple-500/10 rounded">
                  <Layers className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Apply Annotation Strategies to More Papers</span>
                </div>
              </div>
            </div>

            <ArrowRight className="h-8 w-8 text-primary hidden lg:block self-center" />
            <ArrowDown className="h-8 w-8 text-primary lg:hidden self-center" />

            {/* Output Section */}
            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-lg border-2 border-dashed border-green-500/30 flex-1">
              <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">Output</div>
              <div className="flex flex-col gap-2 text-center w-full">
                <div className="flex items-center gap-2 text-sm p-2 bg-green-500/10 rounded">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-left">Annotated Papers<br/><span className="text-xs text-muted-foreground">(actionable insights on macro structure)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-green-500/10 rounded">
                  <BarChart3 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-left">Structure Visualization<br/><span className="text-xs text-muted-foreground">(visual maps of paper organization)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-green-500/10 rounded">
                  <StickyNote className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-left">Writing Notes<br/><span className="text-xs text-muted-foreground">(insights for future writing)</span></span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues to Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Issues to Address
          </CardTitle>
          <CardDescription>Consider these questions in your analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {issuesToAddress.map((issue, index) => (
              <li key={index} className="flex items-start gap-3 p-2 text-sm">
                <span className="flex-shrink-0 w-5 h-5 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs">
                  {index + 1}
                </span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* AI Agent Instructions */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-500" />
            Using AI Agent for This Activity
          </CardTitle>
          <CardDescription>Complete this activity using an AI agent in your IDE</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Prepare Folder */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-amber-500" />
              1. Prepare Your Activity Folder
            </h4>
            <div className="ml-6 p-4 bg-muted/50 rounded-lg text-sm space-y-2">
              <p>Create a folder structure:</p>
              <pre className="bg-background p-3 rounded border text-xs overflow-x-auto">
{`activity-1.2/
├── input/
│   ├── sample-paper.md       # One published paper (machine readable)
│   ├── human-notes.md        # Your notes on macro structure & questions
│   └── papers/               # Additional papers for AI analysis
│       ├── paper-1.md
│       ├── paper-2.html
│       └── paper-3.tex
├── instructions.md           # Analysis instructions for AI
└── output/
    ├── annotated-papers/     # AI-annotated papers
    ├── visualizations/       # Structure diagrams
    └── writing-notes.md      # Insights for future writing`}
              </pre>
            </div>
          </div>

          {/* Step 2: Prepare Instruction File */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              2. Prepare the Instruction File
            </h4>
            <div className="ml-6 p-4 bg-muted/50 rounded-lg text-sm space-y-2">
              <p>Your <code className="bg-background px-1 rounded">instructions.md</code> should include:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Review and critically enhance the human-written notes</li>
                <li>Identify gaps or additional insights in the human analysis</li>
                <li>Apply the same annotation strategy to additional papers</li>
                <li>Generate structure visualizations (e.g., Mermaid diagrams)</li>
                <li>Compile actionable writing notes for future reference</li>
              </ul>
            </div>
          </div>

          {/* Step 3: Run AI Agent */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Code className="h-4 w-4 text-green-500" />
              3. Run AI Agent in Your IDE
            </h4>
            <div className="ml-6 p-4 bg-muted/50 rounded-lg text-sm space-y-2">
              <p>Open the folder in your IDE with AI agent and:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Point the agent to your instruction file</li>
                <li>Let it analyze the sample paper and enhance your notes</li>
                <li>Have it apply the same analysis to additional papers</li>
                <li>Review the annotated outputs and structure visualizations</li>
                <li>Add your own reflections to the writing notes</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button asChild variant="outline">
              <Link to="/mccp/week1/ai-agent">
                <Bot className="h-4 w-4 mr-2" />
                Set Up Your AI Agent
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Week1Activity2;
