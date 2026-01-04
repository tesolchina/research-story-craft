import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, GraduationCap, Target, ClipboardList, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InstructorNotes from "@/components/mccp/InstructorNotes";
import DiscussionBoard from "@/components/mccp/DiscussionBoard";

const Week1Introduction = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp/week1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Week 1</p>
            <h1 className="text-2xl font-bold">Introduction to the Course</h1>
          </div>
        </div>

        {/* Course Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Welcome to MCCP 6020: Advanced English for Academic Purposes. This course is designed to 
              help you develop essential academic communication skills for your research journey.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Course Focus</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Academic writing and presentations</li>
                  <li>Research communication skills</li>
                  <li>Critical thinking and analysis</li>
                  <li>Professional academic discourse</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Learning Approach</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Interactive group meetings</li>
                  <li>Peer feedback and collaboration</li>
                  <li>AI-assisted learning tools</li>
                  <li>Individual consultations</li>
                </ul>
              </div>
            </div>
            <InstructorNotes
              sectionId="week1-welcome"
              notes="Welcome to the course! I'm excited to work with you this semester. Our first session will be an orientation where we'll get to know each other and discuss your research interests. Please come prepared to introduce yourself and your research area briefly (1-2 minutes)."
            />
            <DiscussionBoard sectionId="week1-overview" sectionTitle="Course Overview" />
          </CardContent>
        </Card>

        {/* Syllabus Link */}
        <Link to="/mccp/syllabus">
          <Card className="hover:border-primary transition-colors cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                <GraduationCap className="h-5 w-5" />
                View Full Syllabus & Assessment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Course objectives, CILOs, assessment breakdown, and grading criteria.
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Course Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              What You'll Achieve
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">1</span>
                <div>
                  <h4 className="font-medium">Present Research Effectively</h4>
                  <p className="text-sm text-muted-foreground">Master academic presentations including poster and 3MT formats</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">2</span>
                <div>
                  <h4 className="font-medium">Write with Academic Rigor</h4>
                  <p className="text-sm text-muted-foreground">Develop clear, precise academic writing with proper source integration</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">3</span>
                <div>
                  <h4 className="font-medium">Engage Critically</h4>
                  <p className="text-sm text-muted-foreground">Analyze research papers and provide constructive peer feedback</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">4</span>
                <div>
                  <h4 className="font-medium">Leverage AI Tools</h4>
                  <p className="text-sm text-muted-foreground">Use AI assistants ethically to enhance your academic work</p>
                </div>
              </div>
            </div>
            <DiscussionBoard sectionId="week1-objectives" sectionTitle="Course Objectives" />
          </CardContent>
        </Card>

        {/* Assessment Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Assessment Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="font-medium">Research Paper Presentation</span>
                <span className="text-primary font-semibold">20%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="font-medium">Poster Presentation</span>
                <span className="text-primary font-semibold">20%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="font-medium">Writing Component (Take-home)</span>
                <span className="text-primary font-semibold">30%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="font-medium">3MT Presentation</span>
                <span className="text-primary font-semibold">20%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="font-medium">Course Participation</span>
                <span className="text-primary font-semibold">10%</span>
              </div>
            </div>
            <InstructorNotes
              sectionId="week1-assessment-tips"
              notes="Start thinking about your research topic early! All assessments in this course are connected to your own research, so the more prepared you are with your topic, the more you'll benefit from each activity."
            />
            <DiscussionBoard sectionId="week1-assessment" sectionTitle="Assessment Overview" />
          </CardContent>
        </Card>

        {/* AI Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI-Assisted Learning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This course incorporates AI tools to enhance your learning experience. You'll use the HKBU Gen AI API 
              to get personalized feedback and assistance with your academic work.
            </p>
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-medium mb-2">Getting Started with AI Tools</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                <li>Set up your HKBU Gen AI API key in the <Link to="/mccp/api-key" className="text-primary hover:underline">API Key Setup</Link> page</li>
                <li>Use the "Ask AI" buttons throughout the course materials</li>
                <li>Get instant feedback on your writing and presentations</li>
                <li>Ask questions about course content anytime</li>
              </ol>
            </div>
            <InstructorNotes
              sectionId="week1-ai-ethics"
              notes="While AI tools are encouraged for learning and revision, all submitted work must be your own. AI can help you brainstorm, check grammar, and understand concepts, but the ideas and writing should reflect your authentic voice."
            />
            <DiscussionBoard sectionId="week1-ai" sectionTitle="AI-Assisted Learning" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Week1Introduction;
