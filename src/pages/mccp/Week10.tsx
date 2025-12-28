import { Link } from "react-router-dom";
import { ArrowLeft, Presentation } from "lucide-react";
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
            <h1 className="text-2xl font-bold">Oral Presentation Assessment: Poster</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Presentation className="h-5 w-5" />
              Assessment Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Present your research poster and engage with audience questions. This assessment evaluates:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Visual design and clarity of poster</li>
              <li>Ability to explain research concisely</li>
              <li>Engagement with audience</li>
              <li>Response to questions and feedback</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Poster Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-muted/50 rounded-lg border border-dashed text-center">
              <p className="text-muted-foreground italic">
                Poster design guidelines, templates, and rubric will be available here.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-muted/50 rounded-lg border border-dashed text-center">
              <p className="text-muted-foreground italic">
                Poster session schedule and location details will be available here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Week10;
