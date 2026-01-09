import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowDown, ArrowRight, CheckCircle, Bot, Code, FolderOpen, FileText, Lightbulb, ShieldCheck, AlertTriangle, Target, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Week1Activity3 = () => {
  const assessmentCriteria = [
    { label: "Content Analysis", status: "Strong", detail: "Comprehensive coverage of IMRaD/CARS moves" },
    { label: "Critical Depth", status: "Needs Improvement", detail: "Move from description to deep theoretical analysis" },
    { label: "CILO Alignment", status: "Excellent", detail: "Strong on generic features (CILO 2), moderate on linguistic (CILO 3)" },
    { label: "Practical Guidance", status: "Needs Improvement", detail: "Add more 'how-to-apply' sections for students" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Activity 1.3: Review AI Results using AI</h1>
        <p className="text-muted-foreground">
          Critically evaluate AI-generated analysis to identify strengths, weaknesses, and alignment with learning outcomes.
        </p>
      </div>

      {/* Visual Workflow Diagram */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Activity Workflow
          </CardTitle>
          <CardDescription>Perform a meta-analysis: Using AI to assess the quality of AI-generated work</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 py-6">
            {/* Input Section */}
            <div className="flex flex-col items-center gap-3 p-4 bg-background rounded-lg border-2 border-dashed border-primary/30 flex-1">
              <div className="text-sm font-semibold text-primary uppercase tracking-wide">Input</div>
              <div className="flex flex-col gap-2 text-center w-full">
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="text-left">KellerInsights.md<br/><span className="text-xs text-muted-foreground">(Output from Activity 1.2)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <Code className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span className="text-left">visualSample.html<br/><span className="text-xs text-muted-foreground">(Visual output from Activity 1.2)</span></span>
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
                  <span className="text-left">Critical Review Instruction</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-purple-500/10 rounded">
                  <ShieldCheck className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Assess Alignment with CILOs</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-purple-500/10 rounded">
                  <Search className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Identify Gaps & Recommendations</span>
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
                  <span className="text-left">AI Assessment Report<br/><span className="text-xs text-muted-foreground">(Detailed critique & rating)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-green-500/10 rounded">
                  <AlertTriangle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-left">Improvement Roadmap<br/><span className="text-xs text-muted-foreground">(Actionable enhancements)</span></span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Example Assessment Criteria
          </CardTitle>
          <CardDescription>What to look for in the AI-generated report</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessmentCriteria.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">{item.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    item.status === 'Excellent' || item.status === 'Strong' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
            ))}
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
          <CardDescription>Critically assess the AI's own analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-amber-500" />
              1. Prepare Your Activity Folder
            </h4>
            <div className="ml-6 p-4 bg-muted/50 rounded-lg text-sm space-y-2">
              <pre className="bg-background p-3 rounded border text-xs overflow-x-auto">
{`activity-1.3/
├── input/
│   ├── KellerInsights.md    # From Activity 1.2
│   └── visualSample.html    # From Activity 1.2
├── instructions.md          # Meta-analysis instructions
└── output/
    └── AIassessAI.md        # AI Assessment Report`}
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
                <li>Identify <strong>strengths</strong> and <strong>weaknesses</strong> of the analysis.</li>
                <li>Assess alignment with <strong>CILOs 2, 3, and 4</strong>.</li>
                <li>Find gaps in assignment-specific relevance (e.g., word count guidance).</li>
                <li>Provide <strong>recommendations for enhancement</strong> (e.g., adding practical application guides).</li>
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

export default Week1Activity3;
