/**
 * CarsCoachOverview.tsx
 * 
 * Visual overview and purpose explanation for CARS Coach
 * Shown before discipline selection
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Target, 
  BookOpen, 
  PenTool, 
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  MessageSquare,
  FileText,
  Sparkles
} from "lucide-react";

interface CarsCoachOverviewProps {
  onStart: () => void;
}

export default function CarsCoachOverview({ onStart }: CarsCoachOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left: Visual Illustration */}
            <div className="relative flex-shrink-0">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-16 h-16 text-primary" />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-primary/20" />
            </div>

            {/* Right: Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <Badge variant="secondary" className="mb-3">
                Interactive AI Learning Module
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                Welcome to CARS Coach
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Master the art of writing research introductions using the <strong>CARS Model</strong> — 
                a proven framework used by researchers worldwide.
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <Badge variant="outline" className="gap-1">
                  <MessageSquare className="w-3 h-3" /> AI-Guided
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Target className="w-3 h-3" /> Personalized
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <FileText className="w-3 h-3" /> Field-Specific
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What is CARS? */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="w-5 h-5 text-primary" />
            What is the CARS Model?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            <strong>CARS</strong> stands for <strong>Create A Research Space</strong> — a model developed by linguist 
            <strong> John Swales</strong> that describes how researchers establish the importance of their work 
            in introductions. It's the "GPS" for navigating academic writing.
          </p>
          
          {/* Three Moves Visual */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
              <div className="absolute -top-3 left-4">
                <Badge className="bg-blue-500 text-white">Move 1</Badge>
              </div>
              <h4 className="font-semibold mt-2 mb-2 text-blue-700 dark:text-blue-300">
                Establishing a Territory
              </h4>
              <p className="text-sm text-muted-foreground">
                Show why your topic matters. Claim its importance and review what's known.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                <Target className="w-4 h-4" />
                <span>Set the stage</span>
              </div>
            </div>

            <div className="relative p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
              <div className="absolute -top-3 left-4">
                <Badge className="bg-amber-500 text-white">Move 2</Badge>
              </div>
              <h4 className="font-semibold mt-2 mb-2 text-amber-700 dark:text-amber-300">
                Establishing a Niche
              </h4>
              <p className="text-sm text-muted-foreground">
                Identify the gap. Show what's missing or problematic in current knowledge.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                <Lightbulb className="w-4 h-4" />
                <span>Find the gap</span>
              </div>
            </div>

            <div className="relative p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
              <div className="absolute -top-3 left-4">
                <Badge className="bg-green-500 text-white">Move 3</Badge>
              </div>
              <h4 className="font-semibold mt-2 mb-2 text-green-700 dark:text-green-300">
                Occupying the Niche
              </h4>
              <p className="text-sm text-muted-foreground">
                Present your research. Explain how you'll fill the gap you identified.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                <PenTool className="w-4 h-4" />
                <span>Fill the space</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Journey */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="w-5 h-5 text-primary" />
            Your Learning Journey
          </CardTitle>
          <CardDescription>
            Complete these tasks to master the CARS model for your discipline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: BookOpen, title: "Learn the Theory", desc: "Interactive introduction to moves & steps" },
              { icon: CheckCircle2, title: "Check Understanding", desc: "Quiz yourself on key concepts" },
              { icon: FileText, title: "Analyze Examples", desc: "Study real research introductions" },
              { icon: PenTool, title: "Practice Writing", desc: "Apply CARS to your own work" },
            ].map((step, i) => (
              <div 
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <step.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Ready to Get Started?</h3>
              <p className="text-sm text-muted-foreground">
                First, tell us about your field so we can personalize examples for you.
              </p>
            </div>
            <Button onClick={onStart} size="lg" className="gap-2 px-6">
              Begin Learning
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
