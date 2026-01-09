import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowDown, ArrowRight, Lightbulb, Bot, Code, FolderOpen, FileText, Sparkles, MessageSquare, ListTodo, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Week1Activity4 = () => {
  const activityIdeas = [
    { title: "Micro-Level Analysis", focus: "CILO 3: Nominalization & Hedging", icon: MessageSquare },
    { title: "Abstract Move Mapping", focus: "CILO 2: Background to Conclusion", icon: GraduationCap },
    { title: "Literature Synthesis Matrix", focus: "CILO 2 & 4: Thematic Integration", icon: ListTodo },
    { title: "Gap-Statement Bank", focus: "CILO 3: Linguistic Repertoire", icon: Sparkles }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Activity 1.4: Generate Ideas for More Activities</h1>
        <p className="text-muted-foreground">
          Brainstorm and develop additional AI-assisted learning activities to target specific CILOs and writing goals.
        </p>
      </div>

      {/* Visual Workflow Diagram */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Activity Workflow
          </CardTitle>
          <CardDescription>Collaborate with AI to expand the course learning experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 py-6">
            {/* Input Section */}
            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-lg border-2 border-dashed border-primary/30 flex-1">
              <div className="text-sm font-semibold text-primary uppercase tracking-wide">Input</div>
              <div className="flex flex-col gap-2 text-center w-full">
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="text-left">CILOs & Briefs<br/><span className="text-xs text-muted-foreground">(Course requirements)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <GraduationCap className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span className="text-left">Session Handouts<br/><span className="text-xs text-muted-foreground">(Learning materials)</span></span>
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
                  <span className="text-left">Instruction to Brainstorm</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-purple-500/10 rounded">
                  <Sparkles className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Map to CILOs & Tutor Info</span>
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
                  <Sparkles className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-left">10+ Activity Ideas<br/><span className="text-xs text-muted-foreground">(Objectives, Process, Tutor Role)</span></span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Idea Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activityIdeas.map((idea, index) => (
          <Card key={index} className="border-l-4 border-l-primary/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <idea.icon className="h-4 w-4 text-primary" />
                {idea.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{idea.focus}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Agent Instructions */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-500" />
            Using AI Agent for This Activity
          </CardTitle>
          <CardDescription>Develop new learning pathways with AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-amber-500" />
              1. Prepare Your Activity Folder
            </h4>
            <div className="ml-6 p-4 bg-muted/50 rounded-lg text-sm space-y-2">
              <pre className="bg-background p-3 rounded border text-xs overflow-x-auto">
{`activity-1.4/
├── input/
│   ├── cilos.md
│   ├── handouts/            # Relevant learning materials
│   └── tutorInfo.md         # From Activity 1.1
├── instructions.md          # Brainstorming instructions
└── output/
    └── moreActIdeas.md      # 10+ detailed activity ideas`}
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              2. Instruction Focus
            </h4>
            <div className="ml-6 p-4 bg-muted/50 rounded-lg text-sm space-y-2 text-muted-foreground">
              <p>Ask the AI agent to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Generate 10 additional activity ideas for academic writing and AI integration.</li>
                <li>Define <strong>Objectives</strong>, <strong>Input/Process/Output</strong>, <strong>Learning Insights</strong>, and <strong>Tutor Contribution</strong> for each.</li>
                <li>Ensure a focus on <strong>CILO 2, 3, or 4</strong> for each idea.</li>
                <li>Incorporate the <strong>tutor's philosophy</strong> on AI-human partnership.</li>
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

export default Week1Activity4;
