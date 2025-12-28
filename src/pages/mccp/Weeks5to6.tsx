import { Link } from "react-router-dom";
import { ArrowLeft, Mic } from "lucide-react";
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
            <h1 className="text-2xl font-bold">Oral Presentation Assessment: Research Paper</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Assessment Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Present and discuss your research paper findings. This assessment evaluates:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Clarity and organization of presentation</li>
              <li>Understanding of research content</li>
              <li>Academic language use</li>
              <li>Response to audience questions</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Presentation Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-muted/50 rounded-lg border border-dashed text-center">
              <p className="text-muted-foreground italic">
                Detailed presentation guidelines and rubric will be available here.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule & Sign-up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-muted/50 rounded-lg border border-dashed text-center">
              <p className="text-muted-foreground italic">
                Presentation schedule and time slot sign-up will be available here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weeks5to6;
