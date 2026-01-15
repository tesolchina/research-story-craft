/**
 * Introduction Section Component
 * 
 * Covers the CARS Model, Centrality Statements, and Introduction Writing tasks.
 * Part of the Writing Materials Hub refactoring.
 * 
 * Dependencies:
 * - WritingConstants.ts for shared data
 * - shadcn/ui components for UI elements
 * 
 * Content includes:
 * - CARS Model theory (Swales, 1990)
 * - Centrality statement features and examples
 * - Tasks for analyzing and writing introductions
 * - Sample readings from Chemistry and Social Sciences
 */

import { BookOpen, FileText, Lightbulb, Target, ClipboardList, Bot, HelpCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { CARS_MODEL, CENTRALITY_FEATURES, CENTRALITY_EXAMPLES } from "./WritingConstants";

/**
 * IntroductionSection - CARS Model and Introduction Writing
 * 
 * This accordion section contains comprehensive materials for teaching
 * and learning research introduction writing using Swales' CARS model.
 */
export const IntroductionSection = () => {
  return (
    <AccordionItem value="introduction" className="border rounded-lg px-4">
      {/* Section Header */}
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

          {/* Theory Tab - CARS Model and Centrality Statements */}
          <TabsContent value="theory" className="space-y-6 mt-4">
            {/* Learning Outcomes Card */}
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

            {/* CARS Model Section */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                CARS Model (Swales, 1990)
              </h4>
              <p className="text-sm text-muted-foreground">
                The Creating a Research Space model highlights key rhetorical moves in research introductions:
              </p>
              <div className="grid gap-3">
                {CARS_MODEL.map((move, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{move.title} [{move.subtitle}]</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      {move.steps.map((step, stepIndex) => (
                        <p key={stepIndex}>{stepIndex + 1}. {step}</p>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Centrality Statements Section */}
            <div className="space-y-3">
              <h4 className="font-semibold">Claiming Centrality of Your Research Topic</h4>
              <p className="text-sm text-muted-foreground">
                Centrality statements help 'establish the general territory' [Move 1 in CARS]. 
                They make a general claim that your research topic is of central interest or importance. Key features:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {CENTRALITY_FEATURES.map((feature, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="pt-4 text-sm">
                      <p className="font-medium mb-2">{index + 1}. {feature.title}</p>
                      <p className="text-muted-foreground italic">{feature.examples}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Examples Card */}
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-4">
                  <p className="text-sm font-medium mb-2">Example Centrality Statements:</p>
                  <ul className="text-sm space-y-1 italic text-muted-foreground">
                    {CENTRALITY_EXAMPLES.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
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

          {/* Tasks Tab */}
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

          {/* Samples Tab */}
          <TabsContent value="samples" className="space-y-6 mt-4">
            {/* Sample 1: Chemistry */}
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
                    <span className="bg-yellow-200 dark:bg-yellow-800 px-1">Organic electronics have drawn enormous attention in the past few decades owing to the ease of processing, ultralow-cost substrates, lightweight properties, thin film flexibility and tunable functionality.</span> Integration of photochromic properties with organic electronics has been a tempting approach to accomplish photo-responsive multifunctional optoelectronics.
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

            {/* Sample 2: Social Sciences */}
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
                    <span className="bg-yellow-200 dark:bg-yellow-800 px-1">A considerable amount of literature has analysed how the transition to retirement affects subjective well-being (SWB).</span> Older research has reported contradictory results, with no clear findings as to whether retirement had a positive, negative or no general effect on SWB.
                  </p>
                  <p className="mb-3">
                    Evidence from more recent studies has highlighted that trajectories of SWB in the post-retirement phase of life show no single universal pattern.
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

          {/* Resources Tab */}
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
  );
};

export default IntroductionSection;
