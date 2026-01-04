import { Link } from "react-router-dom";
import { ArrowLeft, FileText, BookOpen, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const WritingComponent = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/mccp">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">Weeks 2-4</p>
          <h1 className="text-2xl font-bold">Writing Assignment – Introduction & Literature Review</h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Deadline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">15 March 2026 (SUN)</div>
            <div className="text-sm text-muted-foreground">11:59pm</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Weighting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">40%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Word Count
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1000-1500</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Write an introduction and a literature review of your research using the provided template. 
            Follow the rhetorical moves and incorporate linguistic features discussed in the course. 
            Indicate the moves using headings or the 'comment' function.
          </p>
          
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="text-lg font-semibold text-primary border-b pb-2 mb-3 text-center">INTRODUCTION</h3>
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-1">Move 1 - Establishing a Territory</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Present general topic area / research problem</li>
                    <li>Highlight research importance</li>
                    <li>Synthesise key prior research</li>
                  </ul>
                  <p className="text-xs italic mt-2">e.g. Research in [Topic] has gained significant attention due to [reasons].</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-1">Move 2 - Identifying a Niche</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Introduce opposing viewpoint/perspective</li>
                    <li>Identify gaps in existing literature</li>
                    <li>Explain why addressing these gaps is necessary</li>
                  </ul>
                  <p className="text-xs italic mt-2">e.g. Despite extensive studies on [topic], there remains a lack of understanding regarding [gap].</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-1">Move 3 - Occupying the Niche</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>State research purpose or question</li>
                    <li>Outline objectives and how it fills the gaps</li>
                  </ul>
                  <p className="text-xs italic mt-2">e.g. This study aims to investigate [question], focusing on [aspects].</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary border-b pb-2 mb-3 text-center">LITERATURE REVIEW</h3>
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-1">Move 1 - Thematic Overview</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Provide context (defining key terms/concepts)</li>
                    <li>Explain purpose and scope of the review</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-1">Move 2 - Critical Analysis</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Group literature by themes, theories, or methodologies</li>
                    <li>Summarize and synthesize connection/contrasts</li>
                    <li>Critique methodologies and findings</li>
                  </ul>
                  <p className="text-xs italic mt-2">e.g. While [Author] provides insights, their approach lacks [limitations].</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-1">Move 3 - Research Gaps</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Reiterate gaps identified in previous studies</li>
                    <li>Emphasize need for further investigation</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-1">Move 4 - Conclusion</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Summarize key insights and implications</li>
                    <li>Set stage for your research contribution</li>
                    <li>Emphasize significance in relation to research question</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Formatting & Submission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold">Requirements</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Font: Times New Roman, Size 12</li>
                <li>Spacing: 1.5 or Double</li>
                <li>Margin: 2.54cm (1 inch)</li>
                <li>Cite using discipline style</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold">Submission</h4>
              <p className="text-sm text-muted-foreground">
                Submit soft copy (MS Word) to Turnitin via Moodle by the deadline. 
                Late submissions incur 1% deduction per day.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assessment Rubric (40%)</CardTitle>
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
                  <TableCell className="font-medium text-xs">Task Achievement</TableCell>
                  <TableCell className="text-xs text-muted-foreground">Extremely clear explanation of background, focus and objectives. Skilfully paraphrase, synthesise and critically evaluate literature. Research gap clearly delineated.</TableCell>
                  <TableCell className="text-xs text-muted-foreground">Generally clear explanation. Appropriately paraphrase and synthesise literature. Research gap identified.</TableCell>
                  <TableCell className="text-xs text-muted-foreground">Insufficient explanation. Limited attempt to synthesise. Gap is vague. Ineffective use of sources.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs">Organisation</TableCell>
                  <TableCell className="text-xs text-muted-foreground">Very clear logical flow. Effective use of cohesive devices. Exceptional clarity in research story.</TableCell>
                  <TableCell className="text-xs text-muted-foreground">Generally clear flow. Cohesive devices used, though narrative could be more logical.</TableCell>
                  <TableCell className="text-xs text-muted-foreground">Flow not easy to follow. Lack of cohesive devices and logical flaws.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs">Language Range & Accuracy</TableCell>
                  <TableCell className="text-xs text-muted-foreground">Effective use of advanced structures and precise lexical resources.</TableCell>
                  <TableCell className="text-xs text-muted-foreground">Adequate and generally accurate use of complex structures with some errors.</TableCell>
                  <TableCell className="text-xs text-muted-foreground">Limited use of complex structures. Numerous errors causing difficulties.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WritingComponent;
