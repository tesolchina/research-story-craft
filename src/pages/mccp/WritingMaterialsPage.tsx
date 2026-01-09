import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, FileText, Lightbulb, MessageSquare, PenTool, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const WritingMaterialsPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp/weeks2-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Writing Reference Materials</p>
            <h1 className="text-2xl font-bold">Academic Writing Hub</h1>
          </div>
        </div>

        {/* Overview Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              This page consolidates all writing-related course materials for flexible use during small group meetings. 
              Content is organized by topic rather than session, allowing you to focus on areas most relevant to your needs.
            </p>
            <div className="flex gap-2 mt-4">
              <Badge variant="outline">Connected to: Writing Assignment (40%)</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Accordion */}
        <Accordion type="multiple" className="space-y-4" defaultValue={["introduction"]}>
          
          {/* Section A: Introduction Writing */}
          <AccordionItem value="introduction" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Introduction Writing</h3>
                  <p className="text-sm text-muted-foreground">CARS Model, Centrality Statements, Thesis Structure</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              {/* CARS Model */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  CARS Model (Swales, 1990)
                </h4>
                <p className="text-sm text-muted-foreground">
                  The Creating a Research Space model highlights key rhetorical moves in research introductions:
                </p>
                <div className="grid gap-3">
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Move 1: Establishing Territory</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <p>• Describe the research problem and provide evidence of importance</p>
                      <p>• Explain current state of knowledge, consensus, or practice</p>
                      <p>• Synthesize key prior research supporting the need to study the problem</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Move 2: Establishing a Niche</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <p>• Introduce opposing viewpoint to current knowledge; OR</p>
                      <p>• Develop research around a gap/understudied area; OR</p>
                      <p>• Present key questions about consequences of gaps; OR</p>
                      <p>• Extend prior research to expand/clarify a problem</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Move 3: Occupying the Niche</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <p>• Explain clearly the objectives of your study</p>
                      <p>• Present a brief summary of key findings</p>
                      <p>• Indicate how the remainder is organized</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Centrality Statements */}
              <div className="space-y-3">
                <h4 className="font-semibold">Centrality Statements</h4>
                <p className="text-sm text-muted-foreground">
                  Make a general claim that your research topic is of central interest or importance. Key features:
                </p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Use evaluative adjectives: <em>valuable, central, major, important</em></li>
                  <li>Refer to impacts/growing awareness: <em>increasingly, growing, a classic problem</em></li>
                  <li>Show currency: <em>current, recent, recently</em></li>
                  <li>Use inversion patterns: <em>"Particularly noteworthy is that..."</em></li>
                  <li>State in present/present perfect tense</li>
                </ul>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Example Centrality Statements:</p>
                  <ul className="text-sm space-y-1 italic text-muted-foreground">
                    <li>"Recently, there has been a wide interest in..."</li>
                    <li>"The study of X has become an important aspect of..."</li>
                    <li>"The relationship between X and Y has been studied by many researchers."</li>
                  </ul>
                </div>
              </div>

              {/* Language Features */}
              <div className="space-y-3">
                <h4 className="font-semibold">Language Features in Introductions</h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Present tense and present perfect tense predominate</li>
                  <li>Active voice is usually used to present information directly</li>
                  <li>Technical terms and keywords are common (expert readers expected)</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Section B: Literature Review */}
          <AccordionItem value="literature-review" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <BookOpen className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Literature Review</h3>
                  <p className="text-sm text-muted-foreground">Review Structure, Reporting Verbs, Critical Evaluation</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              {/* Purposes */}
              <div className="space-y-3">
                <h4 className="font-semibold">General Purposes of Reviewing Literature</h4>
                <p className="text-sm text-muted-foreground">
                  Demonstrate that your research is <strong>original</strong> and <strong>worthwhile</strong>, 
                  and show you are knowledgeable about theories and recent developments.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Originality means:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Addressing questions not asked before</li>
                    <li>Addressing questions not adequately answered</li>
                    <li>Addressing old questions from new perspectives, methods, or new information</li>
                    <li>Addressing old questions in a new context</li>
                    <li>Applying earlier findings in new ways</li>
                  </ul>
                </div>
              </div>

              {/* Literature Review Moves */}
              <div className="space-y-3">
                <h4 className="font-semibold">Common Literature Review Moves</h4>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Move</TableHead>
                        <TableHead>Function</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Move 1</TableCell>
                        <TableCell>Background information / Main theme introduction</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Move 2</TableCell>
                        <TableCell>Research focus with summaries/syntheses of previous studies</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Move 3</TableCell>
                        <TableCell>Research gap identification</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Move 4</TableCell>
                        <TableCell>Justification of methodology / Importance of current study</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Move 5</TableCell>
                        <TableCell>Objectives of current study</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Reporting Verbs */}
              <div className="space-y-3">
                <h4 className="font-semibold">Reporting Verbs</h4>
                <p className="text-sm text-muted-foreground">
                  The choice of verbs reflects your stance on the source. Avoid repeatedly using "states", "points out", or "reports".
                </p>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-orange-600">Tentative</TableHead>
                        <TableHead className="text-blue-600">Neutral</TableHead>
                        <TableHead className="text-purple-600">Strong</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-sm">suggest, hypothesize, imply, postulate, propose, question, speculate</TableCell>
                        <TableCell className="text-sm">describe, discuss, examine, explain, identify, indicate, note, observe, report, show, state</TableCell>
                        <TableCell className="text-sm">argue, assert, claim, conclude, confirm, contend, emphasize, establish, maintain, stress</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-medium mb-2">💡 Tip: Adding adverbs reveals stance more clearly</p>
                  <p className="text-sm text-muted-foreground italic">
                    "The authors <strong>incorrectly</strong> assume that patients will always take the medicine prescribed."
                  </p>
                </div>
              </div>

              {/* Evaluative Language */}
              <div className="space-y-3">
                <h4 className="font-semibold">Evaluative Language & Hedging</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Positive Evaluation</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      significant, insightful, comprehensive, rigorous, innovative, pioneering
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Negative Evaluation</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      limited, flawed, inconclusive, overlooked, problematic, outdated
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Hedging Devices</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      may, might, could, possibly, appears to, seems to, tends to, it is likely that
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Boosting Devices</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      clearly, certainly, definitely, undoubtedly, it is evident that
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Critical Evaluation Criteria */}
              <div className="space-y-3">
                <h4 className="font-semibold">Critical Evaluation Criteria</h4>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Criteria</TableHead>
                        <TableHead>Questions to Ask</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Purpose</TableCell>
                        <TableCell className="text-sm">What is the purpose of the article?</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Arguments</TableCell>
                        <TableCell className="text-sm">Are arguments clear? Any bias or overgeneralizations?</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Evidence</TableCell>
                        <TableCell className="text-sm">What evidence is provided? How well does it support arguments?</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Methodology</TableCell>
                        <TableCell className="text-sm">What approach was used? Cross-sectional or longitudinal?</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Sample</TableCell>
                        <TableCell className="text-sm">Is sample size large enough? Is it representative?</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Results</TableCell>
                        <TableCell className="text-sm">Are results reliable? Can they be generalized?</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Conclusions</TableCell>
                        <TableCell className="text-sm">Are conclusions justified? Does research make an original contribution?</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Section C: Methodology & Results */}
          <AccordionItem value="methodology" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <PenTool className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Methodology & Results</h3>
                  <p className="text-sm text-muted-foreground">DRaC Model, Tense/Voice Usage, Results Presentation</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              {/* Methodology vs Methods */}
              <div className="space-y-3">
                <h4 className="font-semibold">Methodology vs. Methods</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Methodology</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      The theoretical framework (quantitative/qualitative) and justification for choices made. 
                      Requires clear explanation and rationale with references to literature.
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Methods</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Actual research instruments and participants/materials used (interviews, lab equipment, statistics). 
                      Justify why each method was chosen.
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* DRaC Model */}
              <div className="space-y-3">
                <h4 className="font-semibold">DRaC Move Model for Methods</h4>
                <p className="text-sm text-muted-foreground">
                  Demonstrating Rigour and Credibility model for Methods sections:
                </p>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Move</TableHead>
                        <TableHead>Writing Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Move 1 (Optional)</TableCell>
                        <TableCell className="text-sm">Research aims / questions / hypotheses</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Move 2 (Optional)</TableCell>
                        <TableCell className="text-sm">Describing research design</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Move 3 (Obligatory)</TableCell>
                        <TableCell className="text-sm">Describing data collection / experimental procedures, sample, instruments</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Move 4 (Conventional)</TableCell>
                        <TableCell className="text-sm">Describing data analysis procedures</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Move 5 (Optional)</TableCell>
                        <TableCell className="text-sm">Describing limitations</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Language Features */}
              <div className="space-y-3">
                <h4 className="font-semibold">Language Features in Methods</h4>
                <div className="space-y-4">
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Tense Usage</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Past tense:</strong> Describe what you did in your study</p>
                      <p><strong>Present tense:</strong> Facts, references to figures/diagrams, standard procedures</p>
                      <p className="italic">"Figure 1 shows..." / "Addition of a bright field image allows..."</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Voice Usage</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Passive voice:</strong> When emphasizing what was done</p>
                      <p><strong>Active voice:</strong> When emphasizing who did it (preferred by Nature, Science, BMJ)</p>
                      <p className="italic">Check your target journal's Instructions to Authors!</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Sequencers</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      First, Then, After, Subsequently, Finally, Prior to, During, Following
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Purpose Expressions</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      "To avoid...", "In order to...", "To assess...", "In an effort to evaluate...", "For the purpose of..."
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  📚 <strong>Resource:</strong>{" "}
                  <a 
                    href="http://www.phrasebank.manchester.ac.uk/describing-methods/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Academic Phrasebank - Describing Methods
                  </a>
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Section D: Cohesion & Coherence */}
          <AccordionItem value="cohesion" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-orange-600 dark:text-orange-300" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Cohesion & Coherence</h3>
                  <p className="text-sm text-muted-foreground">Signposting, Cohesive Devices, Abstract Writing</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              {/* Definitions */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Coherence (Macro-level)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Connection and logical flow of ideas in a text to create unity. 
                    Does the text have a clear macrostructure that suits its communicative intent?
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Cohesion (Micro-level)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Links between words and sentences. 
                    Are ideas properly linked to enable internal unity?
                  </CardContent>
                </Card>
              </div>

              {/* Techniques */}
              <div className="space-y-3">
                <h4 className="font-semibold">Techniques for Enhancing Coherence</h4>
                <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Macrostructure appropriate to communicative purpose</li>
                  <li>Information structure: old information before new information</li>
                  <li>Connectivity with supporting evidence and examples</li>
                  <li>Cohesive devices: pronouns (he, she, it, this), conjunctions (but, also, therefore)</li>
                  <li>Lexical ties: repetition, synonyms/antonyms, superordinate terms</li>
                  <li>Metadiscourse: logical connectives, sequencers, certainty markers, hedges</li>
                </ul>
              </div>

              {/* Signposting */}
              <div className="space-y-3">
                <h4 className="font-semibold">Signposting</h4>
                <p className="text-sm text-muted-foreground">
                  Signposts signal key aspects: purpose, structure, author's stance, main points, direction of argument, conclusions.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Title Writing Tips:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Include all necessary keywords to convey content</li>
                    <li>Delete redundant words</li>
                    <li>Order words to accurately reflect intended meaning</li>
                    <li>Put key terms at beginning and end</li>
                  </ul>
                </div>
              </div>

              {/* Abstract Structure */}
              <div className="space-y-3">
                <h4 className="font-semibold">Abstract Structure (Hyland, 2000)</h4>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Move</TableHead>
                        <TableHead>Content</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">I - Introduction</TableCell>
                        <TableCell className="text-sm">Background context</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">P - Purpose</TableCell>
                        <TableCell className="text-sm">Research objectives</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">M - Method</TableCell>
                        <TableCell className="text-sm">Research approach</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Pr - Product</TableCell>
                        <TableCell className="text-sm">Key findings</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">C - Conclusion</TableCell>
                        <TableCell className="text-sm">Implications (optional)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Section E: AI-Assisted Writing */}
          <AccordionItem value="ai-writing" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                  <Bot className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">AI-Assisted Writing</h3>
                  <p className="text-sm text-muted-foreground">Using AI Agents Effectively, Tips & Pitfalls</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              {/* Links to Activities */}
              <div className="space-y-3">
                <h4 className="font-semibold">Week 1 AI Activities</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <Button variant="outline" asChild className="justify-start h-auto py-3">
                    <Link to="/mccp/week1/activity-1">
                      <div className="text-left">
                        <p className="font-medium">Activity 1.1</p>
                        <p className="text-xs text-muted-foreground">Mapping Learning with AI</p>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start h-auto py-3">
                    <Link to="/mccp/week1/activity-2">
                      <div className="text-left">
                        <p className="font-medium">Activity 1.2</p>
                        <p className="text-xs text-muted-foreground">Macro Structure Analysis</p>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start h-auto py-3">
                    <Link to="/mccp/week1/activity-3">
                      <div className="text-left">
                        <p className="font-medium">Activity 1.3</p>
                        <p className="text-xs text-muted-foreground">Review AI Results</p>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start h-auto py-3">
                    <Link to="/mccp/week1/activity-4">
                      <div className="text-left">
                        <p className="font-medium">Activity 1.4</p>
                        <p className="text-xs text-muted-foreground">More Activity Ideas</p>
                      </div>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Tips */}
              <div className="space-y-3">
                <h4 className="font-semibold">Tips for Using AI in Academic Writing</h4>
                <div className="space-y-3">
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardContent className="pt-4">
                      <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">✓ Effective Uses</p>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Brainstorming and exploring ideas</li>
                        <li>Understanding complex concepts</li>
                        <li>Getting feedback on structure and argumentation</li>
                        <li>Checking grammar and style</li>
                        <li>Learning discipline-specific language patterns</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                    <CardContent className="pt-4">
                      <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-2">✗ Common Pitfalls</p>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Submitting AI-generated text as your own work</li>
                        <li>Not verifying AI-provided citations (they may be fabricated)</li>
                        <li>Over-relying on AI for critical thinking</li>
                        <li>Ignoring data privacy when submitting texts to AI platforms</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* AI Detection */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm font-medium mb-2">⚠️ AI Detection Tools</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Check if your writing contains AI-generated text:
                </p>
                <ul className="text-sm space-y-1">
                  <li>
                    <a href="https://gptzero.me/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      GPTZero
                    </a>
                  </li>
                  <li>
                    <a href="https://copyleaks.com/ai-content-detector" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Copyleaks AI Content Detector
                    </a>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Instructor Notes Section */}
        <Card className="border-dashed border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Instructor Notes
            </CardTitle>
            <CardDescription>
              Additional guidance and emphasis points for small group meetings
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p className="italic">
              Notes will be added here based on student needs identified during group meetings. 
              The content above serves as a reference - we will focus on areas most relevant to your research projects.
            </p>
          </CardContent>
        </Card>

        {/* Link to Assessment */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Writing Assignment (40%)</h4>
                <p className="text-sm text-muted-foreground">
                  Introduction and Literature Review
                </p>
              </div>
              <Button asChild>
                <Link to="/mccp/assessment">View Assessment Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WritingMaterialsPage;
