import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, FileText, Lightbulb, MessageSquare, PenTool, Bot, ExternalLink, CheckCircle, HelpCircle, ClipboardList, GraduationCap, Sparkles, Target, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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
              This comprehensive hub consolidates all writing-related course materials including theory, tasks, activities, and sample readings. 
              Content is organized by topic for flexible use during small group meetings and independent study.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline">Connected to: Writing Assignment (40%)</Badge>
              <Badge variant="secondary">Sessions 1, 2, 3 & 8</Badge>
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
                  <p className="text-sm text-muted-foreground">CARS Model, Centrality Statements, Tasks & Sample Readings</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              
              <Tabs defaultValue="theory" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="theory">Theory</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="samples">Samples</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="theory" className="space-y-6 mt-4">
                  {/* Learning Outcomes */}
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Learning Outcomes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Identify various thesis and journal article structures</li>
                        <li>Identify functions, rhetorical moves, and linguistic features of effective introductions</li>
                        <li>Write centrality statements to highlight research significance</li>
                        <li>Deploy appropriate linguistic features and rhetorical moves</li>
                      </ul>
                    </CardContent>
                  </Card>

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
                          <CardTitle className="text-base">Move 1: Establishing Territory [The Situation]</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-1">
                          <p>1. Describe the research problem and provide evidence to support why the topic is important</p>
                          <p>2. Explain the current state of knowledge, consensus, practice or description of phenomena</p>
                          <p>3. Synthesize key prior research that supports the need to study the research problem</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Move 2: Establishing a Niche [The Problem]</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-1">
                          <p>1. Introduce an opposing viewpoint/perspective to current knowledge; OR</p>
                          <p>2. Develop the research around a gap/understudied area; OR</p>
                          <p>3. Present key questions about consequences of gaps; OR</p>
                          <p>4. Extend prior research to expand/clarify a problem</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Move 3: Occupying the Niche [The Solution]</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-1">
                          <p>1. Explain clearly the objectives of your study</p>
                          <p>2. Present a brief summary of the key findings</p>
                          <p>3. Indicate how the remainder is organized</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Centrality Statements */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Claiming Centrality of Your Research Topic</h4>
                    <p className="text-sm text-muted-foreground">
                      Centrality statements help 'establish the general territory' [Move 1 in CARS]. They make a general claim that your research topic is of central interest or importance. Key features:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 text-sm">
                          <p className="font-medium mb-2">1. Evaluative Adjectives</p>
                          <p className="text-muted-foreground italic">valuable, central, major, important, significant</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 text-sm">
                          <p className="font-medium mb-2">2. Impact/Growing Awareness</p>
                          <p className="text-muted-foreground italic">increasingly, growing, a classic problem</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 text-sm">
                          <p className="font-medium mb-2">3. Currency of Topic</p>
                          <p className="text-muted-foreground italic">current, recent, recently</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 text-sm">
                          <p className="font-medium mb-2">4. Inversion Patterns</p>
                          <p className="text-muted-foreground italic">"Particularly noteworthy is that...", "Of great concern is..."</p>
                        </CardContent>
                      </Card>
                    </div>
                    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <CardContent className="pt-4">
                        <p className="text-sm font-medium mb-2">Example Centrality Statements:</p>
                        <ul className="text-sm space-y-1 italic text-muted-foreground">
                          <li>"Recently, there has been a wide interest in..."</li>
                          <li>"The study of X has become an important aspect of..."</li>
                          <li>"The relationship between X and Y has been studied by many researchers."</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Language Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Language Features in Introductions</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li><strong>Present tense and present perfect tense</strong> predominate</li>
                      <li><strong>Active voice</strong> is usually used to present information directly</li>
                      <li><strong>Technical terms and keywords</strong> are common (expert readers expected)</li>
                      <li>State centrality claims in <strong>present/present perfect tense</strong></li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="tasks" className="space-y-6 mt-4">
                  {/* Task 1: Thesis Structure */}
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Task 1: Thesis/Journal Article Structure
                      </CardTitle>
                      <CardDescription>Group discussion activity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Work with a classmate (preferably from your discipline) and complete the following:
                      </p>
                      <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                        <li>List the key sections of a typical journal article and key chapters of a thesis in your discipline</li>
                        <li>Discuss: Do you think the structure is the same for all disciplines? What might be the variations? Why?</li>
                      </ol>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Other Possible Structures:</p>
                        <div className="grid gap-2">
                          <div className="text-sm p-3 bg-muted/50 rounded">
                            <p className="font-medium">A series of empirical studies</p>
                            <p className="text-muted-foreground">When research involves more than one empirical study. Common in science-related disciplines.</p>
                          </div>
                          <div className="text-sm p-3 bg-muted/50 rounded">
                            <p className="font-medium">Theme/topic-based theses</p>
                            <p className="text-muted-foreground">Common in humanities (literary studies, law, history). Results presented according to themes.</p>
                          </div>
                          <div className="text-sm p-3 bg-muted/50 rounded">
                            <p className="font-medium">Research article-based theses</p>
                            <p className="text-muted-foreground">Each chapter has its own IMRD structure. Increasingly common.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Task 2: Introduction Functions */}
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Task 2: Functions of an Introduction
                      </CardTitle>
                      <CardDescription>Partner discussion activity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Discuss with a partner the <em>functions</em>, <em>key components</em>, <em>structure</em>, and <em>language features</em> of introductions in your discipline.
                      </p>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Aspect</TableHead>
                            <TableHead>Expected Content</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Functions</TableCell>
                            <TableCell className="text-sm">Draw readers in, provide background, convince readers your work is worth reading, give direction to the remainder</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Key Components</TableCell>
                            <TableCell className="text-sm">Identify research area, review current knowledge, point out gap, explain how you'll fill the gap</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Language Features</TableCell>
                            <TableCell className="text-sm">Present/present perfect tense, active voice, technical terms and keywords</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Task 3: Centrality Statements */}
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Task 3: Analyze Centrality Statements
                      </CardTitle>
                      <CardDescription>Reading and writing activity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                        <li>Read the sample excerpts in the "Samples" tab and identify the centrality statements</li>
                        <li>Discuss: How did the authors establish the general territory of the research topic?</li>
                        <li><strong>Write your own:</strong> Come up with 1-2 centrality statements for your thesis topic using the{" "}
                          <a href="http://www.phrasebank.manchester.ac.uk/introducing-work/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Academic Phrasebank
                          </a>
                        </li>
                        <li>Share your centrality statements with a partner and get feedback</li>
                        <li>Ask ChatGPT to evaluate your centrality statements</li>
                      </ol>
                    </CardContent>
                  </Card>

                  {/* AI Activity */}
                  <Card className="border-l-4 border-l-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Bot className="h-4 w-4" />
                        AI-Assisted Task: Analyze CARS Moves
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Use AI to analyze the introduction of a journal article in your field:
                      </p>
                      <div className="bg-muted p-3 rounded text-sm">
                        <p className="font-medium mb-2">Sample Prompt:</p>
                        <p className="italic text-muted-foreground">
                          "Analyze the following introduction using Swales' CARS model. Identify Move 1 (Establishing Territory), Move 2 (Establishing a Niche), and Move 3 (Occupying the Niche). Also identify the centrality statements and language features used."
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="samples" className="space-y-6 mt-4">
                  {/* Sample Reading 1 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Sample 1: Chemistry (Organic Electronics)
                      </CardTitle>
                      <CardDescription>Excerpt from Journal Article Introduction</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg text-sm leading-relaxed">
                        <p className="mb-3">
                          <span className="bg-yellow-200 dark:bg-yellow-800 px-1">Organic electronics have drawn enormous attention in the past few decades owing to the ease of processing, ultralow-cost substrates, lightweight properties, thin film flexibility and tunable functionality.</span> Integration of photochromic properties with organic electronics has been a tempting approach to accomplish photo-responsive multifunctional optoelectronics. Several pioneering projects that focused on the development of organic electronics embedded with photochromic layers have brought photochromic materials much closer to having real electronic applications in the foreseeable future.
                        </p>
                        <p>
                          In fact, thermal irreversibility and fatigue resistance are especially desirable prerequisites regarding the long-term stability and photo-switching cyclability of photochromic materials for optoelectronic applications. <span className="bg-orange-200 dark:bg-orange-800 px-1">In contrast to crystalline photochromism, which has been well-studied for potential applications in light-driven molecular machines, thin film photochromism adopted in photo-modulated organic electronics has not been comprehensively investigated for its photochromic properties.</span>
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Source: Wu, N.M.W., Wong, H.L., & Yam, V.W.W. (2017). Photochromic benzo[b]phosphole oxide with excellent thermal irreversibility and fatigue resistance in the thin film solid state. <em>Chemical Science, 8</em>, 1309-1315.</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                          <p className="font-medium">🟡 Centrality Statement</p>
                          <p className="text-muted-foreground text-xs">Establishes importance of the topic</p>
                        </div>
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded">
                          <p className="font-medium">🟠 Research Gap</p>
                          <p className="text-muted-foreground text-xs">Identifies what hasn't been studied</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sample Reading 2 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Sample 2: Social Sciences (Retirement & Well-being)
                      </CardTitle>
                      <CardDescription>Excerpt from Journal Article Introduction</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg text-sm leading-relaxed">
                        <p className="mb-3">
                          <span className="bg-yellow-200 dark:bg-yellow-800 px-1">A considerable amount of literature has analysed how the transition to retirement affects subjective well-being (SWB).</span> Older research has reported contradictory results, with no clear findings as to whether retirement had a positive, negative or no general effect on SWB (e.g., Gall et al., 1997; Isaksson & Johansson, 2000).
                        </p>
                        <p className="mb-3">
                          Evidence from more recent studies has highlighted that trajectories of SWB in the post-retirement phase of life show no single universal pattern. Instead, SWB post-retirement depends on a number of protective- and risk-factors that vary across social groups and individuals.
                        </p>
                        <p>
                          <span className="bg-orange-200 dark:bg-orange-800 px-1">Specifically, influencing factors such as economic, social and personal resources as well as the situational context in which retirement takes place can enhance or hamper SWB in the post-work phase of life.</span>
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Source: Schmälzle, M., Wetzel, M., & Huxhold, O. (2019). Pathways to retirement: Are they related to patterns of short- and long-term subjective well-being? <em>Social Science Research, 77</em>, 214-229.</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Discussion Questions */}
                  <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <HelpCircle className="h-4 w-4" />
                        Discussion Questions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                        <li>How did the authors in each sample establish the general territory of their research topic?</li>
                        <li>What language features signal centrality (evaluative adjectives, present tense, etc.)?</li>
                        <li>How does each author transition from Move 1 to Move 2 (establishing the gap)?</li>
                        <li>What are the disciplinary differences between the Chemistry and Social Sciences samples?</li>
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resources" className="space-y-4 mt-4">
                  <div className="grid gap-3">
                    <a href="http://www.phrasebank.manchester.ac.uk/introducing-work/" target="_blank" rel="noopener noreferrer" className="block">
                      <Card className="hover:bg-muted/50 transition-colors">
                        <CardContent className="pt-4 flex items-center gap-3">
                          <ExternalLink className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">Academic Phrasebank - Introducing Work</p>
                            <p className="text-sm text-muted-foreground">University of Manchester</p>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                    <a href="https://scholars.hkbu.edu.hk/en/studentTheses/" target="_blank" rel="noopener noreferrer" className="block">
                      <Card className="hover:bg-muted/50 transition-colors">
                        <CardContent className="pt-4 flex items-center gap-3">
                          <ExternalLink className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">HKBU Student Theses Repository</p>
                            <p className="text-sm text-muted-foreground">Browse MPhil and PhD theses in your discipline</p>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                    <Card className="bg-muted/30">
                      <CardContent className="pt-4">
                        <p className="font-medium mb-2">📚 Further Reading</p>
                        <p className="text-sm text-muted-foreground">
                          Swales, J.M. (1990). <em>Genre analysis: English in academic and research settings</em>. New York: Cambridge University Press.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
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
                  <p className="text-sm text-muted-foreground">Review Structure, Reporting Verbs, Critical Evaluation, Tasks & Samples</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              
              <Tabs defaultValue="theory" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="theory">Theory</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="samples">Samples</TabsTrigger>
                  <TabsTrigger value="language">Language</TabsTrigger>
                </TabsList>

                <TabsContent value="theory" className="space-y-6 mt-4">
                  {/* Learning Outcomes */}
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Learning Outcomes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Organize, summarize and critique the literature</li>
                        <li>Cite, reference, synthesize and paraphrase ideas</li>
                        <li>Use appropriate rhetorical devices and linguistic features to express stance</li>
                        <li>Explain key concepts and research findings</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* What is a Good LR */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">What is a Good Literature Review?</h4>
                    <div className="space-y-3">
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 text-sm">
                          <p className="italic">"...an <strong>interpretation</strong> of a selection of published documents on a specific topic that optimally involves <strong>summarization</strong>, <strong>analysis</strong>, <strong>evaluation</strong>, and <strong>synthesis</strong>."</p>
                          <p className="text-xs text-muted-foreground mt-2">— Onwuegbuzie et al., 2012</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 text-sm">
                          <p className="italic">"...a written document that presents <strong>a logically argued case</strong> founded on <strong>a comprehensive understanding</strong> of the <strong>current state of knowledge</strong> about a topic."</p>
                          <p className="text-xs text-muted-foreground mt-2">— Machi & McEvoy, 2010</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 text-sm">
                          <p className="italic">"More than a summary. It includes <strong>a critique</strong> that <strong>assesses or weighs up</strong> the value of theories, ideas, claims, research designs, methods or conclusions."</p>
                          <p className="text-xs text-muted-foreground mt-2">— Bitchener, 2010</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Purposes */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">General Purposes of Reviewing the Literature</h4>
                    <p className="text-sm text-muted-foreground">
                      Demonstrate that your research is <strong>original</strong> and <strong>worthwhile</strong>, 
                      and show you are knowledgeable about theories and recent developments.
                    </p>
                    <Card className="bg-muted/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">What does "Originality" mean?</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <ul className="list-disc list-inside space-y-1">
                          <li>Addressing questions not asked before</li>
                          <li>Addressing questions not adequately answered</li>
                          <li>Addressing old questions from new perspectives, methods, or new information</li>
                          <li>Addressing old questions in a new context</li>
                          <li>Applying earlier findings in new ways</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Literature Review Moves */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Common Literature Review Moves</h4>
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

                  {/* Critical Evaluation */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Critical Evaluation Criteria</h4>
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
                </TabsContent>

                <TabsContent value="tasks" className="space-y-6 mt-4">
                  {/* Warm-up Task */}
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Warm-up: Finding & Reading Literature
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                        <li>How do you usually find suitable and relevant research articles?</li>
                        <li>In your field, when do you need to review previous research? In which types of writing?</li>
                        <li>Why do researchers need to review previous research?</li>
                      </ol>
                    </CardContent>
                  </Card>

                  {/* Task 1 */}
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Task 1: Understanding Originality
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">Discuss in small groups:</p>
                      <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                        <li>What is the meaning of "originality" of research?</li>
                        <li>How can you show that your research is worthwhile in your thesis/journal article?</li>
                        <li>How can you demonstrate that you are knowledgeable about the theories and recent developments in the field?</li>
                      </ol>
                    </CardContent>
                  </Card>

                  {/* Task 2 */}
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Task 2: Analyze Literature Review Moves
                      </CardTitle>
                      <CardDescription>Compare two discipline examples</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Read the sample literature reviews in the "Samples" tab (Traditional Chinese Medicine vs. Marketing). Discuss:
                      </p>
                      <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                        <li>Can you identify the moves in each literature review? Are they similar or different?</li>
                        <li>Compare the language use and citation style in the two examples</li>
                        <li>What are the disciplinary variations?</li>
                      </ol>
                    </CardContent>
                  </Card>

                  {/* AI Task */}
                  <Card className="border-l-4 border-l-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Bot className="h-4 w-4" />
                        AI-Assisted Task: Paraphrasing Practice
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Practice paraphrasing with AI feedback:
                      </p>
                      <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                        <li>Select a passage from a journal article in your field</li>
                        <li>Write your own paraphrase without looking at the original</li>
                        <li>Ask AI to compare your paraphrase with the original and provide feedback</li>
                      </ol>
                      <div className="bg-muted p-3 rounded text-sm">
                        <p className="font-medium mb-2">Sample Prompt:</p>
                        <p className="italic text-muted-foreground">
                          "Compare my paraphrase with the original text. Check if I have: (1) changed the structure, (2) used different vocabulary, (3) maintained the original meaning, (4) properly attributed the source."
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="samples" className="space-y-6 mt-4">
                  {/* Sample 1: TCM */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Sample 1: Traditional Chinese Medicine
                      </CardTitle>
                      <CardDescription>Journal of Traditional Chinese Medicine</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg text-sm leading-relaxed max-h-64 overflow-y-auto">
                        <p className="mb-3">
                          <strong>[Move 1: Background]</strong> Alzheimer's disease (AD), the most prevalent cause of dementia, is characterized as a chronic, progressive neurodegenerative, severe and incurable disorder. AD is associated with memory loss and cognition impairment accompanied by abnormal behavior and changed personality...
                        </p>
                        <p className="mb-3">
                          <strong>[Move 2: Research focus]</strong> Acupuncture, which is an important therapy method in Chinese medicine, has attracted growing attention for its complementary and alternative role in alleviating symptoms of some diseases safely and effectively...
                        </p>
                        <p className="mb-3">
                          <strong>[Move 3: Gap]</strong> The acupoints selection and combination play a critical role in impacting the therapeutic effects of acupuncture. However, determining the most effective acupoints selection and combination for AD still remains to be elucidated.
                        </p>
                        <p>
                          <strong>[Move 5: Objectives]</strong> In this data mining analysis, we aimed to discover acupoint combinations that were used to treat AD.
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Source: Yu et al. (2018). Acupoint combinations used for treatment of Alzheimer's disease. <em>Journal of Traditional Chinese Medicine, 38</em>(6), 943-952.</p>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
                        <p className="font-medium">Key Features:</p>
                        <ul className="text-muted-foreground list-disc list-inside mt-1">
                          <li>Numbered citation system</li>
                          <li>Technical terms (neurofibrillary tangles, tau protein)</li>
                          <li>Present/present perfect tense</li>
                          <li>No reporting verbs in citations</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sample 2: Marketing */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Sample 2: Marketing
                      </CardTitle>
                      <CardDescription>Journal of Marketing</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg text-sm leading-relaxed max-h-64 overflow-y-auto">
                        <p className="mb-3">
                          <strong>[Theme 1: Impression Formation]</strong> Faces are known to bias decisions (Wheeler and Petty 2001). We form first impressions of others and make judgments about their social traits almost instantaneously on the basis of face perceptions (Todorov et al. 2005)...
                        </p>
                        <p className="mb-3">
                          <strong>[Theme 2: Beauty Premium]</strong> Studies in many fields have concluded that beauty has a premium and ugliness is penalized (Langlois et al. 2000). According to evolutionary psychology, an attractive face indicates good health and prospect for survival...
                        </p>
                        <p>
                          <strong>[Gap]</strong> Studies of the attractiveness effect have mostly used a small number of pictures in experimental settings rather than assessing real-world situations, leaving the robustness and generalizability of their findings open to question.
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Source: Journal of Marketing (2020). Profile pictures and C2C e-commerce.</p>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
                        <p className="font-medium">Key Features:</p>
                        <ul className="text-muted-foreground list-disc list-inside mt-1">
                          <li>Author-date citation system</li>
                          <li>Reporting verbs in citations</li>
                          <li>Limited technical jargon</li>
                          <li>Information-prominent approach</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="language" className="space-y-6 mt-4">
                  {/* Reporting Verbs */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Reporting Verbs</h4>
                    <p className="text-sm text-muted-foreground">
                      The choice of verbs reflects your stance on the source. Avoid repeatedly using "states", "points out", or "reports".
                    </p>
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
                    <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                      <CardContent className="pt-4">
                        <p className="text-sm font-medium mb-2">💡 Tip: Adding adverbs reveals stance more clearly</p>
                        <p className="text-sm text-muted-foreground italic">
                          "The authors <strong>incorrectly</strong> assume that patients will always take the medicine prescribed."
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Evaluative Language */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Evaluative Language & Hedging</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-green-600">Positive Evaluation</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          significant, insightful, comprehensive, rigorous, innovative, pioneering
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-red-600">Negative Evaluation</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          limited, flawed, inconclusive, overlooked, problematic, outdated
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-blue-600">Hedging Devices</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          may, might, could, possibly, appears to, seems to, tends to, it is likely that
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-purple-600">Boosting Devices</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          clearly, certainly, definitely, undoubtedly, it is evident that
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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
                  <p className="text-sm text-muted-foreground">DRaC Model, Language Features, Tasks & Sample Methods Section</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              
              <Tabs defaultValue="theory" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="theory">Theory</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="samples">Samples</TabsTrigger>
                  <TabsTrigger value="language">Language</TabsTrigger>
                </TabsList>

                <TabsContent value="theory" className="space-y-6 mt-4">
                  {/* Learning Outcomes */}
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Learning Outcomes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Identify key components of Methods sections</li>
                        <li>Deploy appropriate linguistic strategies to describe research methodology</li>
                        <li>Present and discuss results in an organized manner</li>
                        <li>Make reasonable claims in the Discussion section</li>
                      </ul>
                    </CardContent>
                  </Card>

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
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Move</TableHead>
                          <TableHead>Writing Actions</TableHead>
                          <TableHead className="w-24">Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Move 1</TableCell>
                          <TableCell className="text-sm">Research aims / questions / hypotheses</TableCell>
                          <TableCell><Badge variant="outline">Optional</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Move 2</TableCell>
                          <TableCell className="text-sm">Describing research design</TableCell>
                          <TableCell><Badge variant="outline">Optional</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Move 3</TableCell>
                          <TableCell className="text-sm">Describing data collection / experimental procedures, sample, instruments</TableCell>
                          <TableCell><Badge variant="default">Obligatory</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Move 4</TableCell>
                          <TableCell className="text-sm">Describing data analysis procedures</TableCell>
                          <TableCell><Badge variant="secondary">Conventional</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Move 5</TableCell>
                          <TableCell className="text-sm">Describing limitations</TableCell>
                          <TableCell><Badge variant="outline">Optional</Badge></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* General Rules */}
                  <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        General Rules for Methods Section
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Organize text in a highly logical manner</li>
                        <li>Provide enough detail for others to repeat the research</li>
                        <li>Include appropriate amount of details</li>
                        <li>Give clear justifications for choices of methods</li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tasks" className="space-y-6 mt-4">
                  {/* Warm-up */}
                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Warm-up: Components of Methodology
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                        <li>What are the main components of the 'Methodology' section in your discipline?</li>
                        <li>True or False: The aim is to document every single step the researchers took?</li>
                        <li>True or False: Other researchers should be able to replicate the research based on your Methods section?</li>
                      </ol>
                      <div className="p-3 bg-muted rounded text-sm">
                        <p className="font-medium">Common components:</p>
                        <ul className="text-muted-foreground list-disc list-inside mt-1">
                          <li>Overview of the research/experiment</li>
                          <li>Research strategy (why this approach)</li>
                          <li>Data collection (sample, procedures, materials)</li>
                          <li>Framework for data analysis</li>
                          <li>Limitations and potential problems</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Task 1 */}
                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Task 1: Analyze a Methods Section
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                        <li>Find a journal article in your discipline you've recently read</li>
                        <li>Identify the key components and moves in the Methods section</li>
                        <li>Share findings with a partner</li>
                        <li>Discuss why there might be differences across research types</li>
                      </ol>
                    </CardContent>
                  </Card>

                  {/* Task 2 */}
                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Task 2: Language Features Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Read the sample Methods section in the "Samples" tab. Analyze:
                      </p>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Tense usage (past vs. present)</li>
                        <li>Voice (active vs. passive)</li>
                        <li>Sequencers (First, Then, After...)</li>
                        <li>Purpose expressions (To assess..., In order to...)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Task 3: Fill in blanks */}
                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Task 3: Tense & Voice Practice
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Complete with correct tenses and voices:
                      </p>
                      <div className="bg-muted p-4 rounded text-sm space-y-2">
                        <p>We _____ (make) an initial panel of 113 items, based on literature of social work practice.</p>
                        <p>A two-step process revision _____ (carry out).</p>
                        <p>The first stage _____ (complete) by two social workers with 15 years' experience.</p>
                      </div>
                      <details className="text-sm">
                        <summary className="cursor-pointer text-primary font-medium">Show Answers</summary>
                        <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                          <p>made, was carried out, was completed</p>
                        </div>
                      </details>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="samples" className="space-y-6 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Sample: Methods Section (Neurochemistry)
                      </CardTitle>
                      <CardDescription>Journal of Neurochemistry</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg text-sm leading-relaxed max-h-80 overflow-y-auto">
                        <p className="font-semibold mb-2">Primary cultures</p>
                        <p className="mb-3">
                          <span className="bg-blue-200 dark:bg-blue-800 px-1">The research team prepared</span> the mixed cultures of cortical neurons as described previously (Suwanjang et al. 2013) with modifications. Experimental procedures <span className="bg-green-200 dark:bg-green-800 px-1">were performed</span> in full compliance with the United Kingdom Animal (Scientific Procedures) Act of 1986.
                        </p>
                        <p className="mb-3">
                          <span className="bg-yellow-200 dark:bg-yellow-800 px-1">First</span>, rat brains <span className="bg-green-200 dark:bg-green-800 px-1">were quickly removed</span> and macerated in chilled HBSS. <span className="bg-yellow-200 dark:bg-yellow-800 px-1">Then</span>, the tissue <span className="bg-green-200 dark:bg-green-800 px-1">was minced</span> and trypsinized (0.1% for 15 min at 37°C), triturated and plated on poly-d-lysine-coated coverslips...
                        </p>
                        <p className="mb-3 font-semibold">Imaging of superoxide generation</p>
                        <p className="mb-3">
                          <span className="bg-blue-200 dark:bg-blue-800 px-1">We measured</span> superoxide generation with Dihydroethidium (HEt; 2 μM). <span className="bg-orange-200 dark:bg-orange-800 px-1">To avoid accumulation of oxidized products</span>, HEt was not preloaded to the cells...
                        </p>
                        <p className="font-semibold mb-2">Statistical analysis</p>
                        <p>
                          Statistical analysis <span className="bg-green-200 dark:bg-green-800 px-1">was performed</span> using Origin 9 software. Results <span className="bg-purple-200 dark:bg-purple-800 px-1">are expressed</span> as means ± SEM.
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                          <p className="font-medium">🔵 Active Voice</p>
                        </div>
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
                          <p className="font-medium">🟢 Passive Voice (Past)</p>
                        </div>
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                          <p className="font-medium">🟡 Sequencers</p>
                        </div>
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded">
                          <p className="font-medium">🟠 Purpose Expression</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="language" className="space-y-6 mt-4">
                  {/* Tense Usage */}
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Feature 1: Tense Usage</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Past tense:</strong> Describe what you did in your study</p>
                      <p><strong>Present tense:</strong> Facts, references to figures/diagrams, standard procedures</p>
                      <p className="italic">"Figure 1 shows..." / "Addition of a bright field image allows..."</p>
                    </CardContent>
                  </Card>

                  {/* Voice Usage */}
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Feature 2: Voice Usage</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Passive voice:</strong> When emphasizing what was done</p>
                      <p><strong>Active voice:</strong> When emphasizing who did it (preferred by Nature, Science, BMJ)</p>
                      <p className="italic text-primary">Check your target journal's Instructions to Authors!</p>
                    </CardContent>
                  </Card>

                  {/* Sequencers */}
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Feature 3: Sequencers</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      First, Then, After, Subsequently, Finally, Prior to, During, Following
                    </CardContent>
                  </Card>

                  {/* Purpose Expressions */}
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Feature 4: Purpose Expressions</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <ul className="list-disc list-inside space-y-1">
                        <li>"To avoid...", "In order to...", "To assess..."</li>
                        <li>"In an effort to evaluate...", "For the purpose of..."</li>
                        <li>"In the interest of obtaining useful data..."</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
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
                </TabsContent>
              </Tabs>
            </AccordionContent>
          </AccordionItem>

          {/* Section D: Cohesion, Coherence & Abstracts */}
          <AccordionItem value="cohesion" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-orange-600 dark:text-orange-300" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Cohesion, Coherence & Abstracts</h3>
                  <p className="text-sm text-muted-foreground">Signposting, Abstract Structure, Tasks & Samples</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              
              <Tabs defaultValue="theory" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="theory">Theory</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="abstracts">Abstracts</TabsTrigger>
                  <TabsTrigger value="samples">Samples</TabsTrigger>
                </TabsList>

                <TabsContent value="theory" className="space-y-6 mt-4">
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
                    <Card className="bg-muted/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Title Writing Tips</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <ul className="list-disc list-inside space-y-1">
                          <li>Include all necessary keywords to convey content</li>
                          <li>Delete redundant words</li>
                          <li>Order words to accurately reflect intended meaning</li>
                          <li>Put key terms at beginning and end</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="tasks" className="space-y-6 mt-4">
                  {/* Warm-up */}
                  <Card className="border-l-4 border-l-orange-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Warm-up: Abstract Basics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                        <li>Why is the abstract necessary for academic research articles?</li>
                        <li>What kind of information should be included in an abstract?</li>
                        <li>Is there a standard structure for research article abstracts?</li>
                        <li>When is an abstract usually written – at the beginning or near the end?</li>
                      </ol>
                    </CardContent>
                  </Card>

                  {/* Task 1: Analyze Abstracts */}
                  <Card className="border-l-4 border-l-orange-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Task 1: Analyze Abstract Moves
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Look at the sample abstracts in the "Samples" tab. Analyze the move structure and linguistic features.
                      </p>
                      <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                        <li>Identify: I (Introduction), P (Purpose), M (Method), Pr (Product/Results), C (Conclusion)</li>
                        <li>Note the tense usage for each move</li>
                        <li>Identify hedging devices</li>
                      </ol>
                    </CardContent>
                  </Card>

                  {/* Task 2: Evaluate Abstracts */}
                  <Card className="border-l-4 border-l-orange-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Task 2: Evaluate Abstract Quality
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Read the following abstract. Is it well-written? What's missing?
                      </p>
                      <div className="bg-muted p-4 rounded text-sm italic">
                        "In this article, research as 'mass media' is appraised. 'Videocy' or videoed research results are examined. A form of video research with its roots in action research is reported on. But is it a 'responsible' form of practice?"
                      </div>
                      <details className="text-sm">
                        <summary className="cursor-pointer text-primary font-medium">Show Analysis</summary>
                        <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 rounded">
                          <ul className="list-disc list-inside text-muted-foreground">
                            <li>Purpose is given but nothing about methodology</li>
                            <li>Too short, leaves readers with questions</li>
                            <li>No results or conclusions given</li>
                            <li>Language is abstruse</li>
                          </ul>
                        </div>
                      </details>
                    </CardContent>
                  </Card>

                  {/* Task 3: Analyze Your Field */}
                  <Card className="border-l-4 border-l-orange-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ClipboardList className="h-4 w-4" />
                        Task 3: Analyze Abstracts in Your Field
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                        <li>Download 1-2 well-written research articles in your field</li>
                        <li>Highlight and identify the moves in each abstract</li>
                        <li>Identify typical words/phrases and grammatical patterns</li>
                        <li>Ask ChatGPT to help analyze the moves and language features</li>
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="abstracts" className="space-y-6 mt-4">
                  {/* Abstract Structure */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Abstract Structure (Hyland, 2000)</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Move</TableHead>
                          <TableHead>Content</TableHead>
                          <TableHead>Typical Tense</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">I - Introduction</TableCell>
                          <TableCell className="text-sm">Background context</TableCell>
                          <TableCell className="text-sm">Present/Present Perfect</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">P - Purpose</TableCell>
                          <TableCell className="text-sm">Research objectives</TableCell>
                          <TableCell className="text-sm">Present</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">M - Method</TableCell>
                          <TableCell className="text-sm">Research approach</TableCell>
                          <TableCell className="text-sm">Past</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Pr - Product</TableCell>
                          <TableCell className="text-sm">Key findings</TableCell>
                          <TableCell className="text-sm">Past</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">C - Conclusion</TableCell>
                          <TableCell className="text-sm">Implications (optional)</TableCell>
                          <TableCell className="text-sm">Present/Modal</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Disciplinary Variations */}
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Common Move Structures by Discipline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Discipline</TableHead>
                            <TableHead>Common Structures</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Philosophy</TableCell>
                            <TableCell className="text-sm">I-P-Pr, P-Pr</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Sociology</TableCell>
                            <TableCell className="text-sm">P-M-Pr, I-P-Pr, I-P-M-Pr</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Applied Linguistics</TableCell>
                            <TableCell className="text-sm">I-P-Pr, P-M-Pr, P-Pr</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Biology / Engineering</TableCell>
                            <TableCell className="text-sm">P-M-Pr, I-P-M-Pr</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Physics</TableCell>
                            <TableCell className="text-sm">P-M-Pr, P-Pr</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="samples" className="space-y-6 mt-4">
                  {/* Sample 1: Sociology */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Sample 1: Sociology
                      </CardTitle>
                      <CardDescription>Sociology Journal</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg text-sm leading-relaxed">
                        <p className="mb-2">
                          <span className="bg-blue-200 dark:bg-blue-800 px-1">[I]</span> Low-income parents have long been demonised in both political discourses and mainstream media, portrayed as lacking in parenting skills not just financial resources.
                        </p>
                        <p className="mb-2">
                          <span className="bg-green-200 dark:bg-green-800 px-1">[P+M]</span> Using the Millennium Cohort Study (MCS) this article examines to what extent there are differences in the parenting of low-income mothers by examining parenting behaviours of low-, middle- and high-income mothers.
                        </p>
                        <p className="mb-2">
                          <span className="bg-yellow-200 dark:bg-yellow-800 px-1">[Pr]</span> The findings show that where there are negative differences in the parenting of low-income mothers these are often part of a broader income gradient... Furthermore, there are some positive differences in parenting among low-income mothers.
                        </p>
                        <p>
                          <span className="bg-orange-200 dark:bg-orange-800 px-1">[C]</span> These findings have important implications: low-income parents are not an unusual or deviant group... The findings <em>suggest</em> more attention ought to be given to parenting differences higher up the income distribution.
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Source: Cooper, K. (2020). Are poor parents poor parents? <em>Sociology</em>.
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sample 2: Biology */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Sample 2: Biology (Structured Abstract)
                      </CardTitle>
                      <CardDescription>BMC Biology</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg text-sm leading-relaxed">
                        <p className="font-semibold">Background</p>
                        <p className="mb-3 text-muted-foreground">
                          Patients with pelvic malignancies often receive radiosensitising chemotherapy... We hypothesised that mice fed a high-fibre diet would have improved tumour control following ionising radiation.
                        </p>
                        <p className="font-semibold">Results</p>
                        <p className="mb-3 text-muted-foreground">
                          We investigated the effects of four different diets on tumour growth... A significantly higher relative abundance of <em>B. acidifaciens</em> was seen in the gut microbiome of the soluble high-fibre group...
                        </p>
                        <p className="font-semibold">Conclusions</p>
                        <p className="text-muted-foreground">
                          Soluble high-fibre diets sensitised tumour xenografts to irradiation. Our findings <em>might</em> be exploitable for improving radiotherapy response in human patients.
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Source: Then et al. (2020). <em>BMC Biology, 18</em>, 102.
                      </div>
                      <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                        <CardContent className="pt-4 text-sm">
                          <p className="font-medium">Note: Structured abstracts with sub-headings are common in science/medical disciplines.</p>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
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
                  <p className="text-sm text-muted-foreground">Using AI Effectively, Activities, Tips & Pitfalls</p>
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

              {/* Key Objective */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Key Objective</h4>
                      <p className="text-sm text-muted-foreground">
                        Use AI as a <strong>"style consultant"</strong> rather than a ghostwriter. 
                        Focus on learning from AI-generated insights to improve your own writing skills.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <div className="space-y-3">
                <h4 className="font-semibold">Tips for Using AI in Academic Writing</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardContent className="pt-4">
                      <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Effective Uses
                      </p>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Brainstorming and exploring ideas</li>
                        <li>Understanding complex concepts</li>
                        <li>Getting feedback on structure and argumentation</li>
                        <li>Checking grammar and style</li>
                        <li>Learning discipline-specific language patterns</li>
                        <li>Analyzing moves in sample texts</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                    <CardContent className="pt-4">
                      <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Common Pitfalls
                      </p>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Submitting AI-generated text as your own work</li>
                        <li>Not verifying AI-provided citations (they may be fabricated)</li>
                        <li>Over-relying on AI for critical thinking</li>
                        <li>Ignoring data privacy when submitting texts</li>
                        <li>Using AI without understanding the output</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sample AI Prompts */}
              <div className="space-y-3">
                <h4 className="font-semibold">Useful AI Prompts for Academic Writing</h4>
                <div className="space-y-3">
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4 text-sm">
                      <p className="font-medium mb-2">Analyze CARS Moves:</p>
                      <p className="italic text-muted-foreground">
                        "Analyze the following introduction using Swales' CARS model. Identify Move 1, 2, and 3, and highlight the centrality statements."
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4 text-sm">
                      <p className="font-medium mb-2">Evaluate Centrality Statement:</p>
                      <p className="italic text-muted-foreground">
                        "Comment on the following centrality statement for my thesis. Does it effectively establish the importance of my topic? What can be improved?"
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4 text-sm">
                      <p className="font-medium mb-2">Check Paraphrase Quality:</p>
                      <p className="italic text-muted-foreground">
                        "Compare my paraphrase with the original. Have I changed the structure, used different vocabulary, and maintained the meaning?"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* AI Detection */}
              <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                <CardContent className="pt-4">
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    AI Detection Tools
                  </p>
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
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Instructor Notes */}
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="h-5 w-5 text-amber-600" />
              Instructor Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This hub provides comprehensive materials for small group meetings. Students can work through tasks independently 
              or in groups. Encourage students to analyze texts from their own disciplines and share findings. 
              The AI-assisted tasks can be done individually or collaboratively.
            </p>
          </CardContent>
        </Card>

        {/* Link to Writing Assignment */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Ready to apply these concepts?</p>
              <p className="text-sm text-muted-foreground">
                View the detailed Writing Assignment requirements and rubric.
              </p>
            </div>
            <Button asChild>
              <Link to="/mccp/week1/writing-assignment">
                View Writing Assignment
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WritingMaterialsPage;
