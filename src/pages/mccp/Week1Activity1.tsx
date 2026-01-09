import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowDown, ArrowRight, Target, User, Lightbulb, CheckCircle, FolderOpen, FileText, Bot, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Week1Activity1 = () => {
  const issuesToAddress = [
    "How do the course learning outcomes connect to each assessment component?",
    "What writing skills are emphasized across the assessments?",
    "Where are your current strengths as an academic writer?",
    "What areas need the most improvement for success in this course?",
    "How can AI tools support your specific learning needs?"
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Activity 1.1: Mapping Your Learning Journey</h1>
        <p className="text-muted-foreground">
          Explore connections between CILOs and assessment, focusing on writing components while considering your strengths and weaknesses.
        </p>
      </div>

      {/* Visual Workflow Diagram */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Activity Workflow
          </CardTitle>
          <CardDescription>Use an AI agent in your IDE to analyze and develop your action plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 py-6">
            {/* Input Section */}
            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-lg border-2 border-dashed border-primary/30 min-w-[200px]">
              <div className="text-sm font-semibold text-primary uppercase tracking-wide">Input</div>
              <div className="flex flex-col gap-2 text-center">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span>CILOs</span>
                </div>
                <ArrowDown className="h-4 w-4 mx-auto text-muted-foreground" />
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-green-500" />
                  <span>Assessment Info</span>
                </div>
                <ArrowDown className="h-4 w-4 mx-auto text-muted-foreground" />
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-orange-500" />
                  <span>Self-Assessment</span>
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
                <span>Action Plan</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues to Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Issues to Address
          </CardTitle>
          <CardDescription>Consider these questions as you complete the activity</CardDescription>
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
          <CardDescription>Complete this activity using an AI agent in your IDE (e.g., Cursor, Windsurf)</CardDescription>
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
{`activity-1.1/
├── input/
│   ├── cilos.md          # Copy from Week 1 page
│   ├── assessment.md     # Copy from Week 1 page
│   └── student-goals.md  # Your reflection/goals
├── instructions.md       # Activity instructions (see below)
└── output/               # To be generated by AI`}
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
              <div className="bg-background p-3 rounded border text-xs font-mono whitespace-pre-wrap">
{`Task: Analyze the CILOs, assessment brief, and my personal goals.
Process: Develop a plan to complete the writing assignment (up to 3 hours with AI) and a tutor collaboration plan.
Output: Create two files in the output/ folder:
- assignmentCompletionPlan.md: Detailed 3-hour plan with AI assistance
- tutorCollaborationPlan.md: Plan for working with Dr. Wang (include his focus on personalized learning and AI-human partnership)`}
              </div>
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
                <li>Reference the tutor info: <strong>Dr. Simon Wang</strong> (PhD in English, focused on AI-Human-Student partnership and personalized small group meetings).</li>
                <li>Point the agent to your instruction file.</li>
                <li>Let it analyze all input files and generate the plans.</li>
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

export default Week1Activity1;
