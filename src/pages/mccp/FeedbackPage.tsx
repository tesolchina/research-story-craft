import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, ClipboardList, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeedbackPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/mccp">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">Course Feedback</p>
          <h1 className="text-2xl font-bold">Your Voice Matters</h1>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Continuous Feedback
            </CardTitle>
            <CardDescription>
              Share your thoughts anytime during the semester. We want to ensure your learning experience is positive and effective.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Use this form to share any immediate concerns, suggestions, or questions you might have about the course content, pace, or assignments.
            </p>
            <Button asChild>
              <a href="mailto:simonwang@hkbu.edu.hk?subject=MCCP 6020 Continuous Feedback" target="_blank" rel="noopener noreferrer">
                Send Feedback
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="opacity-75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Academic Registry Questionnaire
            </CardTitle>
            <CardDescription>
              Official course feedback administered by the Academic Registry.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              This questionnaire will be available near the end of the semester.
            </p>
            <Button disabled variant="outline">
              Available Late Semester
            </Button>
          </CardContent>
        </Card>

        <Card className="opacity-75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Language Centre Feedback
            </CardTitle>
            <CardDescription>
              Departmental feedback form to help us improve our language courses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              This form will be available near the end of the semester.
            </p>
            <Button disabled variant="outline">
              Available Late Semester
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackPage;
