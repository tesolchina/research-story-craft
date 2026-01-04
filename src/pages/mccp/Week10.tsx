import { Link } from "react-router-dom";
import { ArrowLeft, Presentation, Calendar, Target, Layout, MessageSquare, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
              <div className="text-lg font-bold">Session 10</div>
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
                  <li>Upload 2 hours before session</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Session Rundown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-xs">Setup</TableCell>
                  <TableCell className="text-xs">10 min</TableCell>
                  <TableCell className="text-xs">Putting up posters</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-xs">Group A Presentations</TableCell>
                  <TableCell className="text-xs">30 min</TableCell>
                  <TableCell className="text-xs">2-3 min each</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-xs">Q&A for Group A</TableCell>
                  <TableCell className="text-xs">35-40 min</TableCell>
                  <TableCell className="text-xs">Group B evaluates Group A</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-xs">Break</TableCell>
                  <TableCell className="text-xs">10 min</TableCell>
                  <TableCell className="text-xs"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-xs">Group B Presentations</TableCell>
                  <TableCell className="text-xs">30 min</TableCell>
                  <TableCell className="text-xs">2-3 min each</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-xs">Q&A for Group B</TableCell>
                  <TableCell className="text-xs">35-40 min</TableCell>
                  <TableCell className="text-xs">Group A evaluates Group B</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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

        <Card>
          <CardHeader>
            <CardTitle>Assessment Rubric (20%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Criteria</TableHead>
                    <TableHead>Excellent (9-10)</TableHead>
                    <TableHead>Satisfactory (6-8)</TableHead>
                    <TableHead>Unsatisfactory (1-5)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-xs">Content & Clarity</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Clear, concise, well-organized. Accessible to both specialist/non-specialist.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Main elements covered. Mostly understandable.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Incomplete or inaccurate. Difficult to follow.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs">Poster Design</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Visually appealing. Professional layout. Easy to understand.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Acceptable, but readability issues. Visuals somewhat helpful.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Poorly designed. Hard to read. Visuals missing/irrelevant.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs">Oral Delivery</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Confident, fluent. Excellent use of poster as aid.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Hesitations or pacing issues. Aid sometimes ineffective.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Unclear/rushed. Minimal connection to poster.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs">Interaction (Q&A)</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Active engagement. Confident answers to all audiences.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Some uncertainty. Explanations sometimes technical.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">No engagement. Responses unclear/hardly comprehensible.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Week10;
