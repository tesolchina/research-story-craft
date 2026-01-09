import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowDown, ArrowRight, Lightbulb, Bot, FolderOpen, FileText, Sparkles, MessageSquare, ListTodo, GraduationCap, ExternalLink, Search, BookOpen, PenTool, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Week1Activity4 = () => {
  const activityIdeas = [
    { 
      id: "1.5", 
      title: "Micro-Level Linguistic Analysis", 
      focus: "CILO 3: Nominalization & Hedging", 
      icon: MessageSquare,
      description: "Analyze sentence-level features like nominalization patterns and hedging devices"
    },
    { 
      id: "1.6", 
      title: "Abstract Move Mapping", 
      focus: "CILO 2: Background to Conclusion", 
      icon: GraduationCap,
      description: "Map rhetorical moves across multiple abstracts in your field"
    },
    { 
      id: "1.7", 
      title: "Literature Synthesis Matrix", 
      focus: "CILO 2 & 4: Thematic Integration", 
      icon: ListTodo,
      description: "Build a thematic synthesis matrix from multiple sources"
    },
    { 
      id: "1.8", 
      title: "Move 2 Gap-Statement Bank", 
      focus: "CILO 3: Linguistic Repertoire", 
      icon: Search,
      description: "Collect and categorize gap-indicating statements from published papers"
    },
    { 
      id: "1.9", 
      title: "Methodology Section Analysis", 
      focus: "CILO 2: Generic Features", 
      icon: Layers,
      description: "Analyze how methodology sections are structured in your discipline"
    },
    { 
      id: "1.10", 
      title: "AI as Style Consultant", 
      focus: "CILO 3 & 4: Voice Development", 
      icon: PenTool,
      description: "Use AI to analyze and develop your academic writing voice"
    },
    { 
      id: "1.11", 
      title: "Citation Integration Patterns", 
      focus: "CILO 3: Reporting Verbs", 
      icon: BookOpen,
      description: "Study how citations are integrated linguistically in academic writing"
    },
    { 
      id: "1.12", 
      title: "Discussion Section Moves", 
      focus: "CILO 2: Argument Structure", 
      icon: MessageSquare,
      description: "Map the rhetorical moves in discussion sections"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Activity 1.4: More Activity Ideas</h1>
        <p className="text-muted-foreground">
          Choose from additional AI-integrated activities to develop your academic writing skills. Select one idea to pursue during Weeks 2-4.
        </p>
        <div className="mt-3">
          <a 
            href="https://github.com/tesolchina/mccpSpring2026/tree/main/writing/Activity%201.4%20Generate%20ideas%20for%20more%20activities" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View source materials on GitHub <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Key Objective */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-primary mb-1">Key Objective</h3>
              <p className="text-sm text-muted-foreground">
                Develop your ability to use AI as a <strong>"style consultant"</strong> rather than a ghostwriter. 
                Focus on learning from AI-generated insights to improve your own writing skills.
              </p>
            </div>
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
          <CardDescription>Select and pursue one activity idea during Weeks 2-4</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 py-6">
            {/* Input Section */}
            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-lg border-2 border-dashed border-primary/30 flex-1">
              <div className="text-sm font-semibold text-primary uppercase tracking-wide">Input</div>
              <div className="flex flex-col gap-2 text-center w-full">
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="text-left">CILOs & Assignment Brief<br/><span className="text-xs text-muted-foreground">(Course requirements)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <GraduationCap className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span className="text-left">Session Handouts<br/><span className="text-xs text-muted-foreground">(Learning materials)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <BookOpen className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-left">Published Papers<br/><span className="text-xs text-muted-foreground">(Your field samples)</span></span>
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
                  <Sparkles className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Target Specific CILOs</span>
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
                  <span className="text-left">Activity-specific outputs<br/><span className="text-xs text-muted-foreground">(Analysis, patterns, insights)</span></span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Ideas Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Choose Your Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activityIdeas.map((idea) => (
            <Card key={idea.id} className="border-l-4 border-l-primary/30 hover:border-l-primary transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <idea.icon className="h-4 w-4 text-primary" />
                    Activity {idea.id}
                  </CardTitle>
                  <span className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                    {idea.focus.split(":")[0]}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium text-sm mb-1">{idea.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{idea.description}</p>
                <p className="text-[10px] text-primary/70">{idea.focus}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Agent Instructions */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-500" />
            Using AI Agent for Your Chosen Activity
          </CardTitle>
          <CardDescription>Each activity follows a similar structure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-amber-500" />
              General Folder Structure
            </h4>
            <div className="ml-6 p-4 bg-muted/50 rounded-lg text-sm space-y-2">
              <pre className="bg-background p-3 rounded border text-xs overflow-x-auto">
{`activity-1.X/
├── input/
│   ├── CILOs.md              # Course learning outcomes
│   ├── papers/               # Relevant published papers
│   └── tutorInfo.md          # Tutor approach
├── instructions.md           # Activity-specific instructions
└── output/
    └── [activity outputs]    # Analysis, patterns, insights`}
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              Key Elements for Each Activity
            </h4>
            <div className="ml-6 p-4 bg-muted/50 rounded-lg text-sm space-y-2 text-muted-foreground">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Objectives</strong>: What skills/knowledge will you develop?</li>
                <li><strong>Input</strong>: What materials do you need?</li>
                <li><strong>Process</strong>: How will AI assist your analysis?</li>
                <li><strong>Output</strong>: What will you produce?</li>
                <li><strong>Learning Insights</strong>: How does this connect to CILOs?</li>
                <li><strong>Tutor Contribution</strong>: What feedback will you seek?</li>
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