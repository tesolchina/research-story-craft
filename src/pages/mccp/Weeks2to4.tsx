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
                  <TableCell>3.1</TableCell>
                  <TableCell>3.2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Week 4</TableCell>
                  <TableCell>2 Feb</TableCell>
                  <TableCell>4.1</TableCell>
                  <TableCell>4.2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
