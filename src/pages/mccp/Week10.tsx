import { Link } from "react-router-dom";
import { ArrowLeft, Presentation, Calendar, Target, Layout, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Week10 = () => {
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
            <p className="text-sm text-muted-foreground">Week 10</p>
            <h1 className="text-2xl font-bold">Oral Presentation Assessment 2 – Poster Presentation</h1>
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
              <div className="text-lg font-bold">Week 10</div>
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
              <p className="text-xs text-muted-foreground">(Lecturer: 10%; Peers: 10%)</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5 text-primary" />
              Overview & Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Design and present your own research poster. Practise communicating effectively to both specialist and non-specialist audiences.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold text-sm mb-2">Poster Design:</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-muted-foreground">
                  <li>Size: A1 or A3 (A4 is NOT acceptable)</li>
                  <li>Include: Objectives, Methods, Hypotheses, Findings</li>
                  <li>Visuals: Graphs, charts, images</li>
                  <li>Font: Appropriate & readable size</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold text-sm mb-2">Presentation:</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-muted-foreground">
                  <li>Duration: 2-3 minutes</li>
                  <li>Q&A session follow-up</li>
                  <li>Bring hard copy & upload soft copy</li>
                  <li>Upload 2 hours before the week</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Tips for Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Practise for smooth delivery and confidence</li>
              <li>Anticipate questions and prepare responses</li>
              <li>Maintain eye contact and use body language</li>
              <li>Effective use of visual aids</li>
            </ul>
          </CardContent>
        </Card>

        {/* Link to full assessment info */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Full Assessment Details & Rubric</h4>
                <p className="text-sm text-muted-foreground">View complete instructions, rundown, and grading criteria</p>
              </div>
              <Button asChild>
                <Link to="/mccp/assessment#oral2">
                  <Presentation className="mr-2 h-4 w-4" />
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

export default Week10;