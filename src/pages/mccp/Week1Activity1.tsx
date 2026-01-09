import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowDown, ArrowRight, Target, User, Lightbulb, CheckCircle, FolderOpen, FileText, Bot, Code, ExternalLink, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Week1Activity1 = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Activity 1.1: Mapping Your Learning Journey</h1>
        <p className="text-muted-foreground">
          Connect CILOs, assessment requirements, and personal reflection to develop a strategic plan for completing your writing assignment.
        </p>
        <div className="mt-3">
          <a 
            href="https://github.com/tesolchina/mccpSpring2026/tree/main/writing/activity%201.1%20mapping%20learning" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View source materials on GitHub <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Visual Workflow Diagram */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Activity Workflow
          </CardTitle>
          <CardDescription>Strategic planning with AI to connect learning outcomes and personal goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 py-6">
            {/* Input Section */}
            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-lg border-2 border-dashed border-primary/30 flex-1">
              <div className="text-sm font-semibold text-primary uppercase tracking-wide">Input</div>
              <div className="flex flex-col gap-2 text-center w-full">
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <Target className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="text-left">CILOs.md<br/><span className="text-xs text-muted-foreground">(Course learning outcomes)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <FileText className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-left">Writing_Assignment_Brief.md<br/><span className="text-xs text-muted-foreground">(Assessment requirements)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <User className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  <span className="text-left">studentReflection-sample1.md<br/><span className="text-xs text-muted-foreground">(Your self-assessment)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <Users className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">tutorInfo.md<br/><span className="text-xs text-muted-foreground">(Dr. Wang's approach)</span></span>
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
                  <span className="text-left">AI Agent Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-purple-500/10 rounded">
                  <Clock className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Develop 3-hour AI-assisted plan</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-purple-500/10 rounded">
                  <Users className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Create tutor collaboration plan</span>
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
                  <span className="text-left">assignmentCompletionPlan.md<br/><span className="text-xs text-muted-foreground">(3-hour AI-assisted plan)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-green-500/10 rounded">
                  <Users className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-left">tutorCollaborationPlan.md<br/><span className="text-xs text-muted-foreground">(Plan for working with tutor)</span></span>
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
│   ├── CILOs.md                      # Course learning outcomes
│   ├── Writing_Assignment_Brief.md   # Assessment requirements
│   ├── studentReflection-sample1.md  # Your self-assessment
│   └── tutorInfo.md                  # Tutor information
├── instructions.md                   # Activity instructions
└── output/
    ├── assignmentCompletionPlan.md   # 3-hour plan
    └── tutorCollaborationPlan.md     # Tutor collaboration plan`}
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
{`## Task: Strategic Learning Plan Development

### Input Files
- CILOs.md: Course intended learning outcomes
- Writing_Assignment_Brief.md: Assessment requirements and criteria
- studentReflection-sample1.md: Student's self-assessment and goals
- tutorInfo.md: Dr. Wang's teaching philosophy and approach

### Instructions
1. Analyze the connections between CILOs and assessment requirements
2. Consider the student's current strengths and areas for improvement
3. Develop a 3-hour AI-assisted plan for completing the writing assignment
4. Create a collaboration plan with the tutor based on their approach

### Output
1. assignmentCompletionPlan.md: Detailed 3-hour plan with AI assistance milestones
2. tutorCollaborationPlan.md: Plan for productive tutor collaboration
   - Include Dr. Wang's focus on personalized learning
   - Incorporate AI-human partnership philosophy`}
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
                <li>Let it analyze all input files holistically</li>
                <li>Review the generated plans and refine as needed</li>
                <li>Add your personal reflections and priorities</li>
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