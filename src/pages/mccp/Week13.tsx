import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, Calendar, Target, Zap, PlayCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Week13 = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Week 13</p>
            <h1 className="text-2xl font-bold">Oral Presentation Assessment 3 – Three-minute Thesis (3MT)</h1>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Week 13</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="h-4 w-4" />
                Weighting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">20%</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              The 3MT Challenge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Explain the aims, results, and significance of your research to a non-specialist audience in under 3 minutes.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold text-sm mb-2">Key Rules:</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-muted-foreground">
                  <li>Time Limit: 3 minutes maximum</li>
                  <li>Visual Aid: One static PowerPoint slide</li>
                  <li>Target: Non-specialist audience (laymen)</li>
                  <li>Avoid: Technical jargon</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold text-sm mb-2">Strategies:</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-muted-foreground">
                  <li>Simplify research effectively</li>
                  <li>Use metaphors and similes</li>
                  <li>Interactive: Hooks & attention-getters</li>
                  <li>Tell a compelling story</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-primary" />
              Preparation Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Watch award-winning examples from the University of Queensland:
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="https://threeminutethesis.uq.edu.au/watch-3mt" target="_blank" rel="noopener noreferrer">
                Watch 3MT Examples <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Link to full assessment info */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Full Assessment Details & Rubric</h4>
                <p className="text-sm text-muted-foreground">View complete instructions, requirements, and grading criteria</p>
              </div>
              <Button asChild>
                <Link to="/mccp/assessment#oral3">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Week13;