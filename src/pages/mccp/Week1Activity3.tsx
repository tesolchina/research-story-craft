import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowDown, ArrowRight, CheckCircle, Bot, Code, FolderOpen, FileText, Lightbulb, ShieldCheck, Target, Search, ExternalLink, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Week1Activity3 = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Activity 1.3: Review AI Results using AI</h1>
        <p className="text-muted-foreground">
          Critically evaluate AI-generated analysis from Activity 1.2 using another AI to identify strengths, weaknesses, and alignment with learning outcomes.
        </p>
        <div className="mt-3">
          <a 
            href="https://github.com/tesolchina/mccpSpring2026/tree/main/writing/activity%201.3%20review%20AI%20results%20using%20AI" 
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
            Activity Workflow: Human → AI → AI Loop
          </CardTitle>
          <CardDescription>Using a second AI layer to validate and enhance the work from Activity 1.2</CardDescription>
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
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <ClipboardList className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Writing_Assignment_Brief.md<br/><span className="text-xs text-muted-foreground">(Institutional document)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <Target className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-left">CILOs.md<br/><span className="text-xs text-muted-foreground">(Course learning outcomes)</span></span>
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
                  <span className="text-left">AI Agent via HKBU GenAI API</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-purple-500/10 rounded">
                  <ShieldCheck className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Compare AI work against human notes</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-purple-500/10 rounded">
                  <Target className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Assess alignment with CILOs</span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-purple-500/10 rounded">
                  <Search className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-left">Identify gaps & recommendations</span>
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
                  <span className="text-left">AIassessAI.md<br/><span className="text-xs text-muted-foreground">(Critical assessment report)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-green-500/10 rounded">
                  <FileText className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-left">process.log<br/><span className="text-xs text-muted-foreground">(Real-time API call log)</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-green-500/10 rounded">
                  <Lightbulb className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-left">Actionable advice<br/><span className="text-xs text-muted-foreground">(For improving your writing)</span></span>
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
          <CardDescription>Set up your AI agent to critically assess the analysis from Activity 1.2</CardDescription>
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
│   ├── KellerInsights.md         # From Activity 1.2
│   ├── visualSample.html         # From Activity 1.2
│   ├── Writing_Assignment_Brief.md
│   └── CILOs.md
├── instructions.md               # Review instructions
└── output/
    ├── AIassessAI.md             # Assessment report
    └── process.log               # API call log`}
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              2. Create instructions.md
            </h4>
            <div className="ml-6 p-4 bg-muted/50 rounded-lg text-sm space-y-2">
              <pre className="bg-background p-3 rounded border text-xs overflow-x-auto whitespace-pre-wrap">
{`## Task: Critically Assess AI-Generated Analysis

### Input Files
- KellerInsights.md (AI output from Activity 1.2)
- visualSample.html (Visual output from Activity 1.2)

### API Configuration
API key: [Add your API key from https://genai.hkbu.edu.hk/settings/api-docs]
API docs: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/reference

### Instructions
1. Send the input files to the LLM using the API key above
2. Generate an assessment report (AIassessAI.md) that critically assesses the AI's work
3. Compare against human notes and reference files
4. Offer advice on improving the analysis so students can:
   - Complete the Writing_Assignment_Brief.md requirements
   - Achieve the learning outcomes in CILOs.md
5. Create a process.log to report API calls in real time`}
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-green-500" />
              3. Key Assessment Focus Areas
            </h4>
            <div className="ml-6 p-4 bg-muted/50 rounded-lg text-sm space-y-2 text-muted-foreground">
              <ul className="list-disc list-inside space-y-1">
                <li>Identify <strong>strengths</strong> and <strong>weaknesses</strong> of the Activity 1.2 analysis</li>
                <li>Assess alignment with <strong>CILOs 2, 3, and 4</strong></li>
                <li>Find gaps in assignment-specific relevance (e.g., word count, structure requirements)</li>
                <li>Provide <strong>actionable recommendations</strong> for enhancement</li>
                <li>Suggest practical application guides for students</li>
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
