import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  FileText, 
  Mic, 
  Presentation,
  GraduationCap,
  ChevronDown,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CollapsibleSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  id?: string;
}

const CollapsibleSection = ({ 
  title, 
  icon, 
  children, 
  defaultOpen = false, 
  badge,
  badgeVariant = "default",
  id
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="mb-4" id={id}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg font-bold">
              <div className="flex items-center gap-3">
                {icon}
                <span>{title}</span>
                {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

const AssessmentPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp/week1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Assessment Information</h1>
            <p className="text-sm text-muted-foreground">MCCP 6020 Assessment Components & Rubrics</p>
          </div>
        </div>

        {/* Overview Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-2xl font-bold text-primary">40%</div>
                <div className="text-sm text-muted-foreground">Writing Assignment</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-2xl font-bold text-primary">20%</div>
                <div className="text-sm text-muted-foreground">Oral Presentation 1</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-2xl font-bold text-primary">20%</div>
                <div className="text-sm text-muted-foreground">Poster Presentation</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-2xl font-bold text-primary">20%</div>
                <div className="text-sm text-muted-foreground">3MT Presentation</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Writing Assignment */}
        <CollapsibleSection 
          title="Writing Assignment – Introduction & Literature Review" 
          icon={<FileText className="h-5 w-5 text-primary" />}
          badge="40%"
          defaultOpen={true}
          id="writing"
        >
          <div className="space-y-6">
            {/* Key Info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span><strong>Deadline:</strong> 15 March, 2026 (SUN), 11:59pm</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span><strong>Word Count:</strong> 1000-1500 words</span>
              </div>
            </div>

            <Separator />

            {/* Instructions */}
            <div>
              <h4 className="font-semibold mb-3">Instructions</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Write an introduction and a literature review of your research using the provided template below. 
                Follow the rhetorical moves and incorporate linguistic features discussed in the course. 
                Indicate the moves in your writing using headings or the 'comment' function in MS Word.
              </p>
              <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20 mb-4">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong className="text-destructive">Important:</strong> Submitting previously published work is considered 
                    self-plagiarism. If you intend to submit past coursework, a portion of your Master's thesis, 
                    or your PhD research proposal, it must be significantly revised and enhanced.
                  </div>
                </div>
              </div>
            </div>

            {/* Introduction Moves */}
            <div>
              <h4 className="font-semibold mb-3">📝 Introduction Structure</h4>
              <div className="space-y-3">
                <div className="p-4 border-l-4 border-l-primary bg-muted/30 rounded-r-lg">
                  <h5 className="font-bold text-primary">Move 1 - Establishing a Territory</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    <em>"Research in [Topic] has gained significant attention due to [reasons for importance]."</em>
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Present the general topic area/research problem</li>
                    <li>Highlight the importance of the research</li>
                    <li>Synthesise key prior research that supports the need for the current research</li>
                  </ul>
                </div>
                <div className="p-4 border-l-4 border-l-primary bg-muted/30 rounded-r-lg">
                  <h5 className="font-bold text-primary">Move 2 - Identifying a Niche</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    <em>"Despite extensive studies on [related topic], there remains a lack of understanding regarding [specific gap]."</em>
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Introduce an opposing viewpoint/perspective to the current state of knowledge</li>
                    <li>Identify gaps in the existing literature</li>
                    <li>Explain why addressing these gaps is necessary</li>
                  </ul>
                </div>
                <div className="p-4 border-l-4 border-l-primary bg-muted/30 rounded-r-lg">
                  <h5 className="font-bold text-primary">Move 3 - Occupying the Niche</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    <em>"This study aims to investigate [research question], focusing on [specific aspects]."</em>
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>State your research purpose or question</li>
                    <li>Outline the objectives of your research and how it will fill the gaps</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Literature Review Moves */}
            <div>
              <h4 className="font-semibold mb-3">📚 Literature Review Structure</h4>
              <div className="space-y-3">
                <div className="p-4 border-l-4 border-l-secondary bg-muted/30 rounded-r-lg">
                  <h5 className="font-bold text-secondary-foreground">Move 1 - Thematic Overview</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    <em>"Several studies have demonstrated that [summary of findings]."</em>
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Provide context (e.g. defining key terms/concepts/research teams)</li>
                    <li>Explain the purpose and scope of the review</li>
                  </ul>
                </div>
                <div className="p-4 border-l-4 border-l-secondary bg-muted/30 rounded-r-lg">
                  <h5 className="font-bold text-secondary-foreground">Move 2 - Critical Analysis</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    <em>"While [Author] (Year) provides valuable insights, their approach lacks [limitations]."</em>
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Group literature by themes, paradigms, theories, methodologies or chronological order</li>
                    <li>Summarize and synthesize the existing literature</li>
                    <li>Show connections, relationships or contrasts among studies</li>
                    <li>Critique methodologies and findings of previous research</li>
                  </ul>
                </div>
                <div className="p-4 border-l-4 border-l-secondary bg-muted/30 rounded-r-lg">
                  <h5 className="font-bold text-secondary-foreground">Move 3 - Research Gaps</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    <em>"There is a clear need for research that addresses [identified gaps]."</em>
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Reiterate the gaps identified in previous studies</li>
                    <li>Emphasize the need for further investigation</li>
                  </ul>
                </div>
                <div className="p-4 border-l-4 border-l-secondary bg-muted/30 rounded-r-lg">
                  <h5 className="font-bold text-secondary-foreground">Move 4 - Conclusion of the Literature Review</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    <em>"By addressing these gaps, this research will contribute to [expected contributions]."</em>
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Summarize key insights and their implications</li>
                    <li>Set the stage for your research contribution</li>
                    <li>Emphasize the significance of the literature in relation to your research question</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div>
              <h4 className="font-semibold mb-3">📌 Important Notes</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                <li>Write 1000-1500 words, excluding end-of-text citations and annotations</li>
                <li>Indicate the word count at the end of the writing</li>
                <li>Ensure each section flows logically and connects to your overall research aim</li>
                <li>Use appropriate academic language and adhere to the formatting guidelines</li>
                <li>Incorporate citations following the referencing style commonly used in your discipline</li>
              </ul>
            </div>

            {/* Late Submission Policy */}
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <h5 className="font-semibold text-destructive mb-2">Late Submission Policy</h5>
              <p className="text-sm text-muted-foreground">
                One percent of the final score will be deducted for each day past the deadline 
                (weekends and statutory holidays included). Assignments submitted more than 5 days after 
                the deadline will receive a zero mark.
              </p>
            </div>

            {/* Formatting Requirements */}
            <div>
              <h4 className="font-semibold mb-3">📐 Formatting Requirements</h4>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  <strong>Font:</strong> Times New Roman, 12pt
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  <strong>Line Spacing:</strong> 1.5 or double
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  <strong>Margin:</strong> 2.54cm or 1 inch
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  <strong>Format:</strong> MS Word
                </div>
              </div>
            </div>

            {/* Rubric */}
            <div>
              <h4 className="font-semibold mb-3">📊 Assessment Rubric</h4>
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
                      <TableCell className="font-medium">Task Achievement</TableCell>
                      <TableCell className="text-sm">Extremely clear explanation; skilfully paraphrase, synthesise and critically evaluate; adequate and effective use of sources</TableCell>
                      <TableCell className="text-sm">Generally clear explanation; appropriately paraphrase and synthesise; some critical evaluation evident</TableCell>
                      <TableCell className="text-sm">Insufficient explanation; limited synthesis and evaluation; ineffective use of sources</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Organisation</TableCell>
                      <TableCell className="text-sm">Very clear logical flow; effective cohesive devices; exceptional clarity in research story</TableCell>
                      <TableCell className="text-sm">Generally clear flow; effective cohesive devices; could be organized more logically</TableCell>
                      <TableCell className="text-sm">Ideas not easy to follow; lack of cohesive devices; not presented logically</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Language</TableCell>
                      <TableCell className="text-sm">Effective use of advanced grammatical structures and precise lexical resources</TableCell>
                      <TableCell className="text-sm">Adequate use of complex structures with some errors</TableCell>
                      <TableCell className="text-sm">Limited complex structures; numerous errors causing difficulties</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Total: _____ out of 30</p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Oral Presentation 1 */}
        <CollapsibleSection 
          title="Oral Presentation 1 – Research Story-telling" 
          icon={<Mic className="h-5 w-5 text-primary" />}
          badge="20%"
          id="oral1"
        >
          <div className="space-y-6">
            {/* Key Info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span><strong>Date:</strong> Weeks 5 & 6</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span><strong>Duration:</strong> 8 minutes</span>
              </div>
            </div>

            <Separator />

            {/* Instructions */}
            <div>
              <h4 className="font-semibold mb-3">Instructions</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Give an 8-minute presentation on an empirical journal article in your field to a non-specialist 
                audience and explain how experienced writers strategically tell their research stories in writing.
              </p>
              <div className="space-y-2">
                <h5 className="font-medium">You should:</h5>
                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                  <li>Give a brief introduction to the article</li>
                  <li>Briefly explain the key findings</li>
                  <li>Highlight the significance of the research</li>
                  <li>Elucidate how this article may impact your own research design and what good writing skills you have learned, with convincing evidence from the article</li>
                </ol>
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h5 className="font-medium mb-2">Presentation Requirements</h5>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Well-structured and intelligible to laypeople</li>
                  <li>Avoid highly technical terms</li>
                  <li>Visual aids (PowerPoint slides) are required</li>
                  <li>Upload slides at least two hours before the assessment</li>
                </ul>
              </div>
              <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
                  <p className="text-sm">
                    Note cards may be used; however, <strong>reading directly from a script is not permitted</strong> 
                    and will result in a failing grade.
                  </p>
                </div>
              </div>
            </div>

            {/* Peer Review */}
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2">📋 Peer Review Requirement</h5>
              <p className="text-sm text-muted-foreground">
                You will need to evaluate 2-4 classmates' presentations using the peer evaluation form:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                <li>Raise questions during the Q&A session</li>
                <li>Complete the evaluation forms</li>
              </ul>
            </div>

            {/* Rubric */}
            <div>
              <h4 className="font-semibold mb-3">📊 Assessment Rubric</h4>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">1. Content, Structure and Effective Interaction</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Content appropriateness to non-specialist audience</li>
                    <li>• Integration of critical reflection</li>
                    <li>• Logical flow and structure</li>
                    <li>• Quality of answers to questions</li>
                    <li>• Peer evaluation quality</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">2. Delivery, Body Language and Timing</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Clarity of speech</li>
                    <li>• Use of intonation, volume, stress and register</li>
                    <li>• Non-verbal skills (posture, facial expression, eye contact)</li>
                    <li>• Timing</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">3. Use of Visual Aids</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Design quality of PowerPoint</li>
                    <li>• Effectiveness in supplementing the presentation</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Total: _____ out of 40</p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Oral Presentation 2 - Poster */}
        <CollapsibleSection 
          title="Oral Presentation 2 – Poster Presentation" 
          icon={<Presentation className="h-5 w-5 text-primary" />}
          badge="20%"
          id="oral2"
        >
          <div className="space-y-6">
            {/* Key Info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span><strong>Date:</strong> Week 10</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span><strong>Duration:</strong> 2-3 minutes + Q&A</span>
              </div>
            </div>

            <Separator />

            {/* Overview */}
            <div>
              <h4 className="font-semibold mb-3">Overview</h4>
              <p className="text-sm text-muted-foreground">
                Design and present your own research poster, potentially to be used in a real conference. 
                This task provides you the opportunity to practise communicating your research effectively 
                to both specialist and non-specialist audiences.
              </p>
            </div>

            {/* Objectives */}
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h5 className="font-medium mb-2">🎯 Objectives</h5>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Develop your ability to present research clearly and concisely</li>
                <li>Engage in academic discourse by answering questions</li>
                <li>Enhance your visual communication skills through poster design</li>
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h4 className="font-semibold mb-3">Requirements</h4>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">1. Poster Design</h5>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Summarize: topic, objectives, methodologies, hypotheses, findings, conclusions</li>
                    <li><strong>Size: A1 or A3</strong> (A4 is not acceptable)</li>
                    <li>Use clear headings, bullet points, visuals (graphs, charts, images)</li>
                    <li>Ensure font size is appropriate and texts are readable</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">2. Presentation</h5>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Present your poster explaining your research and key findings</li>
                    <li>Duration: 2-3 minutes, followed by Q&A session</li>
                    <li>Prepare to answer questions from both specialist and non-specialist audiences</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">3. Submission</h5>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Posters must be printed and ready before the assessment</li>
                    <li>Bring both a hard copy and a soft copy</li>
                    <li>Upload the poster at least two hours before the assessment</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Evaluation */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h5 className="font-medium mb-2">📊 Evaluation Breakdown</h5>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="text-sm">
                  <strong>Class Lecturer's Evaluation:</strong> 10%
                </div>
                <div className="text-sm">
                  <strong>Peers' Evaluation:</strong> 10%
                </div>
              </div>
            </div>

            {/* Rundown */}
            <div>
              <h4 className="font-semibold mb-3">📅 Week Rundown</h4>
              <div className="overflow-x-auto">
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
                      <TableCell>Introduction & Getting Ready</TableCell>
                      <TableCell>10 minutes</TableCell>
                      <TableCell>Putting up posters</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Group A Presentations</TableCell>
                      <TableCell>30 minutes</TableCell>
                      <TableCell>2-3 minutes each</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Q&A for Group A</TableCell>
                      <TableCell>35-40 minutes</TableCell>
                      <TableCell>Group B asks questions</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Break</TableCell>
                      <TableCell>10 minutes</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Group B Presentations</TableCell>
                      <TableCell>30 minutes</TableCell>
                      <TableCell>2-3 minutes each</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Q&A for Group B</TableCell>
                      <TableCell>35-40 minutes</TableCell>
                      <TableCell>Group A asks questions</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h5 className="font-medium mb-2">💡 Tips for Success</h5>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Practise your presentation to ensure smooth delivery and confidence</li>
                <li>Anticipate possible questions and prepare your responses</li>
                <li>Engage with your audience, make eye contact and use visual aids effectively</li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        {/* Oral Presentation 3 - 3MT */}
        <CollapsibleSection 
          title="Oral Presentation 3 – Three-Minute Thesis (3MT)" 
          icon={<GraduationCap className="h-5 w-5 text-primary" />}
          badge="20%"
          id="oral3"
        >
          <div className="space-y-6">
            {/* Key Info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span><strong>Date:</strong> Week 13</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span><strong>Duration:</strong> 3 minutes maximum</span>
              </div>
            </div>

            <Separator />

            {/* Instructions */}
            <div>
              <h4 className="font-semibold mb-3">Instructions</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Within 3 minutes maximum, explain the aims, results, and/or significance of your research 
                to a non-specialist audience (e.g. prospective employers, grant review panels, the public community).
              </p>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Key Requirements</h5>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Use only <strong>one static PowerPoint slide</strong></li>
                    <li>Content must be intelligible to laymen with no/little knowledge of your field</li>
                    <li>Strictly avoid technical terms</li>
                    <li>Upload the slide at least two hours before the assessment</li>
                  </ul>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <h5 className="font-medium mb-2">🌟 Key 3MT Features</h5>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Simplify your research using metaphors, similes, and daily life examples</li>
                    <li>Engage the audience with hooks and attention-getters</li>
                    <li>Make the presentation interactive</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2">📺 Preparation Resources</h5>
              <p className="text-sm text-muted-foreground mb-3">
                Watch award-winning examples from the Three-Minute Thesis Competition:
              </p>
              <Button variant="outline" asChild>
                <a href="https://threeminutethesis.uq.edu.au/watch-3mt" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Watch 3MT Examples (UQ)
                </a>
              </Button>
            </div>

            {/* Warning */}
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
                <p className="text-sm">
                  Note cards may be used; however, <strong>reading directly from a script is not permitted</strong> 
                  and will result in a failing grade.
                </p>
              </div>
            </div>

            {/* Peer Review */}
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2">📋 Peer Review Requirement</h5>
              <p className="text-sm text-muted-foreground">
                You will need to evaluate 2-4 classmates' presentations using the peer evaluation form:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                <li>Raise questions during the Q&A session</li>
                <li>Complete the evaluation forms</li>
              </ul>
            </div>

            {/* Rubric */}
            <div>
              <h4 className="font-semibold mb-3">📊 Assessment Rubric</h4>
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
                      <TableCell className="font-medium">Content & Clarity</TableCell>
                      <TableCell className="text-sm">Clear, concise, well-organized; fully covers research elements; accessible to all audiences</TableCell>
                      <TableCell className="text-sm">Covers main elements with some clarity issues; mostly understandable</TableCell>
                      <TableCell className="text-sm">Incomplete, unclear, or inaccurate; difficult to follow</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Oral Delivery</TableCell>
                      <TableCell className="text-sm">Confident, fluent, well-paced; excellent use of slide; clear explanation</TableCell>
                      <TableCell className="text-sm">Understandable with some hesitations; sometimes ineffective use of slide</TableCell>
                      <TableCell className="text-sm">Unclear, rushed or too slow; minimal connection to slide</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Engagement</TableCell>
                      <TableCell className="text-sm">Strong enthusiasm; maintains audience interest; confident Q&A responses</TableCell>
                      <TableCell className="text-sm">Some enthusiasm; occasional connection with audience</TableCell>
                      <TableCell className="text-sm">Monotone delivery; little effort to connect with audience</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Visual Aid</TableCell>
                      <TableCell className="text-sm">Visually appealing, simple, clear; effectively supports comprehension</TableCell>
                      <TableCell className="text-sm">Somewhat clear with minor design issues</TableCell>
                      <TableCell className="text-sm">Cluttered, overly technical, or poorly designed</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Timing</TableCell>
                      <TableCell className="text-sm">Strictly adheres to 3 minutes; well-paced</TableCell>
                      <TableCell className="text-sm">Fits within 3 minutes with minor fluctuations</TableCell>
                      <TableCell className="text-sm">Exceeds or falls short by more than 30 seconds</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Total: _____ out of 50</p>
            </div>
          </div>
        </CollapsibleSection>

        {/* General Tips */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              General Tips for Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Start early and plan your time wisely</li>
              <li>Seek feedback from peers before submitting</li>
              <li>Attend all consultation sessions</li>
              <li>Practice oral presentations multiple times</li>
              <li>Use the course resources and Academic Phrasebank</li>
              <li>Follow all formatting guidelines carefully</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentPage;
