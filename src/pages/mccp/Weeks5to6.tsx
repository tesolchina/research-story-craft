import { Link } from "react-router-dom";
import { ArrowLeft, Mic, Calendar, Target, ListChecks, HelpCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Weeks5to6 = () => {
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
            <p className="text-sm text-muted-foreground">Weeks 5-6</p>
            <h1 className="text-2xl font-bold">Oral Presentation Assessment 1 – Research Story-telling</h1>
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
              <div className="text-lg font-bold">Weeks 5 & 6</div>
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
              <ListChecks className="h-5 w-5 text-primary" />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Give an <strong>8-minute presentation</strong> on an empirical journal article in your field to a non-specialist audience. Explain how experienced writers strategically tell their research stories.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold text-sm mb-2">Presentation Content:</h4>
                <ul className="list-decimal list-inside text-xs space-y-1 text-muted-foreground">
                  <li>Brief introduction to the article</li>
                  <li>Brief explanation of key findings</li>
                  <li>Highlight significance of the research</li>
                  <li>Reflection: Impact on your design & writing skills learned</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold text-sm mb-2">Key Requirements:</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-muted-foreground">
                  <li>Well-structured & intelligible to lay people</li>
                  <li>Avoid highly technical terms</li>
                  <li>Visual aids (PowerPoint) required</li>
                  <li>Upload slides 2 hours before assessment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Peer Review Role
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              You will evaluate 2-4 classmates using the peer evaluation form. Reviewers must:
            </p>
            <ul className="list-disc list-inside text-xs text-muted-foreground ml-2">
              <li>Raise questions during the Q&A session</li>
              <li>Complete the evaluation forms with justifications</li>
            </ul>
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
                <Link to="/mccp/assessment#oral1">
                  <Mic className="mr-2 h-4 w-4" />
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

export default Weeks5to6;