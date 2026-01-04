import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, Calendar, Target, Zap, PlayCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
            <h1 className="text-2xl font-bold">Oral Presentation Assessment 3 – Three-minute Thesis (3MT)</h1>
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
              <div className="text-lg font-bold">Session 13</div>
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
              <Zap className="h-5 w-5 text-primary" />
              The 3MT Challenge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Explain the aims, results, and significance of your research to a non-specialist audience in under 3 minutes.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold text-sm mb-2">Key Rules:</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-muted-foreground">
                  <li>Time Limit: 3 minutes maximum</li>
                  <li>Visual Aid: One static PowerPoint slide</li>
                  <li>Target: Non-specialist audience (laymen)</li>
                  <li>Avoid: Technical jargon</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold text-sm mb-2">Strategies:</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-muted-foreground">
                  <li>Simplify research effectively</li>
                  <li>Use metaphors and similes</li>
                  <li>Interactive: Hooks & attention-getters</li>
                  <li>Tell a compelling story</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-primary" />
              Preparation Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Watch award-winning examples from the University of Queensland:
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="https://threeminutethesis.uq.edu.au/watch-3mt" target="_blank" rel="noopener noreferrer">
                Watch 3MT Examples <Zap className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3 mt-4">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="text-xs text-blue-700">
                <strong>Submission:</strong> Upload your static slide at least 2 hours before the assessment.
              </div>
            </div>
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
                    <TableCell className="font-medium text-xs">Content</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Aims stated clearly. Key findings engagingly communicated without jargon. Effective simplification strategies.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Aims mostly clear. Findings explained with minimal jargon. Some simplification strategies.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Aims unclear/missing. Excessive jargon. Few simplification strategies.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs">Storytelling & Org</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Well-structured with compelling story. Engages audience throughout.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Generally logical flow. Effort to structure as a story.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Lacks logical flow. Ideas disjointed. No clear story.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs">Engagement</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Language tailored to lay audience. Strong enthusiasm and passion.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Language mostly appropriate. Some enthusiasm evident.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Language too technical. Monotone delivery. Little connection.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-xs">Delivery & Timing</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Clear pronunciation. Strictly within 3 mins. No reading from scripts. Appealing slide.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Generally clear. Within 3 mins. Few instances of reading from scripts.</TableCell>
                    <TableCell className="text-xs text-muted-foreground">Mispronunciations. Over/under time by 30s+. Always reading aloud.</TableCell>
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

export default Week13;
