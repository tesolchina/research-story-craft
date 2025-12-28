import { Link } from "react-router-dom";
import { ArrowLeft, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WritingComponent = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/mccp">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">Weeks 2-4</p>
          <h1 className="text-2xl font-bold">Writing Component (Take-home)</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Assignment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Students will complete a take-home assignment that includes sufficient background information to provide context and significance for the research, a review of recent and relevant literature, proper acknowledgment of previous work on the topic, and an analysis or reference to the research gap that needs to be filled. Additionally, the assignment should feature a purpose statement highlighting the novelty and contributions of the research.
          </p>
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Weighting</h3>
              <p className="text-2xl font-bold text-primary">40%</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Deadline</h3>
              <p className="text-lg">TBA</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Introduction section with research context</li>
            <li>Literature review of relevant sources</li>
            <li>Identification of research gap</li>
            <li>Clear purpose statement</li>
            <li>Proper citation and referencing</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WritingComponent;
