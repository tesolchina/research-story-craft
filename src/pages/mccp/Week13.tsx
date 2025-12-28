import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";
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
            <h1 className="text-2xl font-bold">Oral Presentation Assessment: 3MT</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Three Minute Thesis (3MT)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Present your research in just three minutes to a general audience. This assessment evaluates:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Ability to communicate complex research simply</li>
              <li>Engagement and presentation skills</li>
              <li>Time management</li>
              <li>Use of single static slide</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3MT Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-muted/50 rounded-lg border border-dashed text-center">
              <p className="text-muted-foreground italic">
                3MT rules, tips, and rubric will be available here.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Presentation Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-muted/50 rounded-lg border border-dashed text-center">
              <p className="text-muted-foreground italic">
                3MT presentation schedule and order will be available here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Week13;
