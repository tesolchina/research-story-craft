import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowDown, ArrowRight, FileText, Bot, Code, FolderOpen, Layers, CheckCircle, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Week1Activity2 = () => {
  const macroElements = [
    { element: "Title & Abstract", focus: "How does the title frame the study? What key information is in the abstract?" },
    { element: "Introduction", focus: "How is the research gap established? How are objectives stated?" },
    { element: "Literature Review", focus: "How are sources organized? What themes or frameworks are used?" },
    { element: "Methodology", focus: "How is the approach justified and structured?" },
    { element: "Results/Findings", focus: "How are findings presented and organized?" },
    { element: "Discussion", focus: "How are findings interpreted and connected to literature?" },
    { element: "Conclusion", focus: "How are contributions summarized? What limitations and future directions are noted?" }
  ];

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
          Examine the overall organization and structure of a published research paper in your field.
        </p>
      </div>

      {/* Visual Workflow Diagram */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Activity Workflow
          </CardTitle>
          <CardDescription>Use an AI agent to analyze the structural elements of a research paper</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 py-6">
            {/* Input Section */}
            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-lg border-2 border-dashed border-primary/30 min-w-[200px]">
              <div className="text-sm font-semibold text-primary uppercase tracking-wide">Input</div>
              <div className="flex flex-col gap-2 text-center">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span>Published Paper (PDF)</span>
                </div>
                <ArrowDown className="h-4 w-4 mx-auto text-muted-foreground" />
                <div className="flex items-center gap-2 text-sm">
                  <Layers className="h-4 w-4 text-green-500" />
                  <span>Macro Elements List</span>
                </div>
              </div>
            </div>

            <ArrowRight className="h-8 w-8 text-primary hidden lg:block" />
            <ArrowDown className="h-8 w-8 text-primary lg:hidden" />

            {/* Process Section */}
            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-lg border-2 border-dashed border-secondary/30 min-w-[200px]">
              <div className="text-sm font-semibold text-secondary uppercase tracking-wide">Process</div>
              <div className="flex items-center gap-2 text-sm">
                <Bot className="h-4 w-4 text-purple-500" />
                <span>AI Agent Analysis</span>
              </div>
            </div>

            <ArrowRight className="h-8 w-8 text-primary hidden lg:block" />
            <ArrowDown className="h-8 w-8 text-primary lg:hidden" />

            {/* Output Section */}
            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-lg border-2 border-dashed border-green-500/30 min-w-[200px]">
              <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">Output</div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Structure Analysis Report</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macro Elements to Analyze */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-green-500" />
            Macro-Level Elements
          </CardTitle>
          <CardDescription>Key structural components to examine in your analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {macroElements.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <div>
                  <div className="font-medium text-sm">{item.element}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.focus}</div>
                </div>
              </div>
            ))}
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
│   ├── paper.pdf         # Your selected research paper
│   └── macro-elements.md # List of elements to analyze
├── instructions.md       # Analysis instructions
└── output/
    └── structure-analysis.md  # Generated by AI`}
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
                <li>Task: Analyze the macro-level structure of the paper</li>
                <li>For each section, identify purpose, moves, and connections</li>
                <li>Note structural patterns and techniques used</li>
                <li>Provide recommendations for your own writing</li>
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
                <li>Let it analyze the paper structure</li>
                <li>Review the generated analysis report</li>
                <li>Add your own observations and reflections</li>
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
