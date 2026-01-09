import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Target, FileText, User, Lightbulb, CheckCircle } from "lucide-react";
import { useState } from "react";

const Week1Activity1 = () => {
  const [selfAssessment, setSelfAssessment] = useState({
    strengths: "",
    weaknesses: "",
    goals: ""
  });
  const [actionPlan, setActionPlan] = useState("");

  const cilos = [
    "Apply AI tools for idea generation and organization in academic writing",
    "Develop well-structured arguments with proper evidence integration",
    "Demonstrate critical thinking through analysis and synthesis",
    "Produce polished academic texts following disciplinary conventions"
  ];

  const assessments = [
    { name: "Annotated Bibliography", weight: "20%", focus: "Research & synthesis skills" },
    { name: "Literature Review Draft", weight: "30%", focus: "Argumentation & organization" },
    { name: "Final Literature Review", weight: "40%", focus: "Revision & polished writing" },
    { name: "Reflection Journal", weight: "10%", focus: "Self-awareness & growth" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Activity 1.1: Mapping Your Learning Journey</h1>
        <p className="text-muted-foreground">
          Explore the connections between course learning outcomes, assessments, and your personal development as an academic writer.
        </p>
      </div>

      {/* Visual Workflow Diagram */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Activity Workflow
          </CardTitle>
          <CardDescription>Follow this process to develop your personalized action plan</CardDescription>
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
                  <span>Assessments</span>
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
              <div className="text-sm text-center text-muted-foreground">
                Review & analyze all inputs to identify connections and gaps
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

      {/* Step 1: CILOs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Step 1: Course Intended Learning Outcomes (CILOs)
          </CardTitle>
          <CardDescription>Review what you're expected to achieve by the end of this course</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {cilos.map((cilo, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-sm">{cilo}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Step 2: Assessments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-500" />
            Step 2: Assessment Components
          </CardTitle>
          <CardDescription>Understand how your learning will be evaluated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {assessments.map((assessment, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{assessment.name}</h4>
                  <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded-full font-medium">
                    {assessment.weight}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{assessment.focus}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Self-Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-orange-500" />
            Step 3: Self-Assessment as an Academic Writer
          </CardTitle>
          <CardDescription>Reflect on your current abilities and learning goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">What are your strengths as an academic writer?</label>
            <Textarea
              placeholder="e.g., I'm good at finding sources, organizing ideas..."
              value={selfAssessment.strengths}
              onChange={(e) => setSelfAssessment({ ...selfAssessment, strengths: e.target.value })}
              className="min-h-[80px]"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">What areas do you want to improve?</label>
            <Textarea
              placeholder="e.g., I struggle with synthesizing multiple sources, developing arguments..."
              value={selfAssessment.weaknesses}
              onChange={(e) => setSelfAssessment({ ...selfAssessment, weaknesses: e.target.value })}
              className="min-h-[80px]"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">What are your specific learning goals for this course?</label>
            <Textarea
              placeholder="e.g., I want to learn how to use AI tools effectively, improve my citation skills..."
              value={selfAssessment.goals}
              onChange={(e) => setSelfAssessment({ ...selfAssessment, goals: e.target.value })}
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Step 4: Action Plan */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Step 4: Develop Your Action Plan
          </CardTitle>
          <CardDescription>
            Based on the CILOs, assessments, and your self-assessment, create a plan to succeed in this course
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Write your action plan here. Consider:
• Which CILOs align with your strengths? Which need more work?
• How will you approach each assessment component?
• What specific steps will you take to address your weaknesses?
• How will you leverage AI tools to support your learning?"
            value={actionPlan}
            onChange={(e) => setActionPlan(e.target.value)}
            className="min-h-[150px]"
          />
          <Button className="w-full sm:w-auto">
            Save Action Plan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Week1Activity1;
