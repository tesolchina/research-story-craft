import { Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Weeks2to4 = () => {
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
            <p className="text-sm text-muted-foreground">Weeks 2-4</p>
            <h1 className="text-2xl font-bold">Small Group Meetings</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              During these three weeks, you will participate in small group meetings focused on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Collaborative discussions on academic topics</li>
              <li>Peer learning and feedback sessions</li>
              <li>Developing oral communication skills</li>
              <li>Preparing for your research paper presentation</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Group Meeting Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-muted/50 rounded-lg border border-dashed text-center">
              <p className="text-muted-foreground italic">
                Group meeting schedules and room assignments will be posted here.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Discussion Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-muted/50 rounded-lg border border-dashed text-center">
              <p className="text-muted-foreground italic">
                Discussion topics and preparation materials will be available here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weeks2to4;
