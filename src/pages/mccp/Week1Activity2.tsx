import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowDown, ArrowRight, FileText, Bot, Code, FolderOpen, Layers, CheckCircle, Lightbulb, Eye, BarChart3, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Week1Activity2 = () => {
  const carsModel = [
    { move: "Move 1", title: "Establishing Territory", description: "Claiming importance and reviewing prior work" },
    { move: "Move 2", title: "Establishing Niche", description: "Indicating gaps, raising questions, or extending previous work" },
    { move: "Move 3", title: "Occupying Niche", description: "Outlining purpose, announcing research, and previewing structure" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Activity 1.2: Analyzing Macro-Level Structure</h1>
        <p className="text-muted-foreground">
          Use the CARS model (Swales) to analyze the macro-level structure of published research articles for imitation learning.
        </p>
        <div className="mt-3">
          <a 
            href="https://github.com/tesolchina/mccpSpring2026/tree/main/writing/activity%201.2%20analyze%20macro-level%20structure" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View source materials on GitHub <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* CARS Model Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            CARS Model Framework (Swales)
          </CardTitle>
          <CardDescription>Create A Research Space - Framework for analyzing introductions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {carsModel.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2 bg-muted/30">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded">{item.move}</span>
                </div>
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visual Workflow Diagram */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Activity Workflow
          </CardTitle>
          <CardDescription>Annotate and analyze research papers using AI for imitation learning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 py-6">
            {/* Input Section */}
            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-lg border-2 border-dashed border-primary/30 flex-1">
              <div className="text-sm font-semibold text-primary uppercase tracking-wide">Input</div>
              <div className="flex flex-col gap-2 text-center w-full">
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="text-left">Keller.md<br/><span className="text-xs text-muted-foreground">(Research paper - machine readable)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <Eye className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span className="text-left">sampleNotes.md<br/><span className="text-xs text-muted-foreground">(Annotation framework & guidance)</span></span>
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
                  <span className="text-left">Annotate using CARS model</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-purple-500/10 rounded">
                  <Layers className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Identify Moves 1-3 features</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-purple-500/10 rounded">
                  <Eye className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Find discipline-specific patterns</span>
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
                  <span className="text-left">KellerInsights.md<br/><span className="text-xs text-muted-foreground">(Detailed analysis with excerpts)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-green-500/10 rounded">
                  <BarChart3 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-left">visualSample.html<br/><span className="text-xs text-muted-foreground">(Structure visualization)</span></span>
                </div>
              </div>
            </div>
          </div>
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
              <pre className="bg-background p-3 rounded border text-xs overflow-x-auto">
{`activity-1.2/
├── input/
│   ├── Keller.md           # Research paper (e.g., Keller CVPR 2024)
│   └── sampleNotes.md      # Annotation framework with CARS model
├── instructions.md         # Analysis instructions
└── output/
    ├── KellerInsights.md   # Detailed analysis with section references
    └── visualSample.html   # Interactive structure visualization`}
              </pre>
            </div>
          </div>

          {/* Step 2: Prepare Instruction File */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              2. Create instructions.md
            </h4>
            <div className="ml-6 p-4 bg-muted/50 rounded-lg text-sm space-y-2">
              <pre className="bg-background p-3 rounded border text-xs overflow-x-auto whitespace-pre-wrap">
{`## Task: Analyze Macro-Level Structure for Imitation Learning

### Input Files
- Keller.md: The research paper to analyze
- sampleNotes.md: Annotation framework with CARS model guidance

### Goal
Learn from the paper's structure to inform future writing through imitation.

### Instructions
1. Annotate the paper using the CARS model framework
2. Identify specific features for each Move (1, 2, 3)
3. Note section/subsection references with relevant excerpts
4. Find discipline-specific patterns that can be adopted

### Output
1. KellerInsights.md: Detailed notes on specific features
   - Include section references and direct excerpts
   - Highlight patterns for imitation
2. visualSample.html: Visualization of the macro-level structure
   - Show hierarchical organization
   - Map rhetorical moves to sections`}
              </pre>
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
                <li>Let it analyze the paper using the CARS framework</li>
                <li>Review the generated insights and visualization</li>
                <li>Add your own observations and writing notes</li>
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