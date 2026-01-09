import { Link } from "react-router-dom";
import { ArrowLeft, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
              During these three weeks, you will participate in small group meetings focused on developing your <strong>writing skills</strong> and <strong>AI skills</strong> to assist academic writing.
            </p>
            
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-primary">Main Task</h4>
              <p className="text-muted-foreground">
                Choose <strong>1 activity idea from Activity 1.4</strong> and pursue this idea using your AI agent. Document your process, findings, and reflections.
              </p>
              <Button variant="outline" size="sm" asChild className="mt-2">
                <Link to="/mccp/week1/activity-4">View Activity 1.4 →</Link>
              </Button>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">Writing Materials Reference</h4>
              <p className="text-sm text-muted-foreground">
                Access all writing-related course materials organized by topic for flexible use during meetings.
              </p>
              <Button variant="outline" size="sm" asChild className="mt-2">
                <Link to="/mccp/weeks2-4/writing-materials">View Writing Materials →</Link>
              </Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground italic">
                📌 Additional tasks will be assigned in due course during the group meetings.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Group Meeting Schedule</span>
              <a 
                href="https://buelearning.hkbu.edu.hk/mod/forum/discuss.php?d=345213" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-normal text-primary hover:underline inline-flex items-center gap-1"
              >
                View on Moodle <ExternalLink className="h-3 w-3" />
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Week</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Session 1</TableHead>
                  <TableHead>Session 2</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Week 2</TableCell>
                  <TableCell>19 Jan</TableCell>
                  <TableCell>2.1: 10:30 - 11:20</TableCell>
                  <TableCell>2.2: 11:30 - 12:20</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Week 3</TableCell>
                  <TableCell>26 Jan</TableCell>
                  <TableCell>3.1: 10:30 - 11:20</TableCell>
                  <TableCell>3.2: 11:30 - 12:20</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Week 4</TableCell>
                  <TableCell>2 Feb</TableCell>
                  <TableCell>4.1: 10:30 - 11:20</TableCell>
                  <TableCell>4.2: 11:30 - 12:20</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pre-Meeting Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Complete the MC quizzes and writing tasks before your small group meeting.
            </p>
            <Button asChild>
              <Link to="/mccp/weeks2-4/tasks">Start Tasks</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weeks2to4;
