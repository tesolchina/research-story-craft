import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, GraduationCap, Target, ClipboardList, Bot, FileText, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import InstructorNotes from "@/components/mccp/InstructorNotes";
import DiscussionBoard from "@/components/mccp/DiscussionBoard";
import AIChatDialog from "@/components/mccp/AIChatDialog";

// Instructor notes for each section
const instructorNotes = {
  "cilo-1": "Focus on structure first, content second. Students often rush to fill slides with text - encourage visual communication and clear organization.",
  "cilo-2": "Draw connections to students' own research fields. Ask them to identify 3 articles in their discipline that follow the patterns we discuss.",
  "cilo-3": "The linguistic features list can feel overwhelming. Prioritize signposts and hedging first - these have the biggest impact on academic writing quality.",
  "cilo-4": "Many students underestimate citation complexity. Emphasize that citation is not just about avoiding plagiarism - it's about joining the scholarly conversation.",
  "assessment-presentation1": "Encourage students to practice with peers before the assessment. The 8-minute limit is strict - practice timing!",
  "assessment-poster": "Poster design matters! Refer students to academic poster design resources. Content should be readable from 1 meter away.",
  "assessment-writing": "This is the most heavily weighted assessment. Encourage students to start early and use the writing center resources.",
  "assessment-3mt": "Three Minute Thesis format is challenging. Watch examples from 3MT competitions together. Focus on storytelling and significance.",
};

// AI prompt suggestions
const aiPrompts = {
  cilo: [
    "What does this mean for my research?",
    "How can I practice this skill?",
    "What resources can help me?",
  ],
  assessment: [
    "What are the key criteria?",
    "How should I prepare?",
    "What common mistakes should I avoid?",
  ],
};

const Week1Introduction = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp/week1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Week 1</p>
            <h1 className="text-2xl font-bold">Introduction to the Course</h1>
          </div>
        </div>

        {/* Course Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Welcome to MCCP 6020: Advanced English for Academic Purposes. This course is designed to 
              help you develop essential academic communication skills for your research journey.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Course Focus</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Academic writing and presentations</li>
                  <li>Research communication skills</li>
                  <li>Critical thinking and analysis</li>
                  <li>Professional academic discourse</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Learning Approach</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Interactive group meetings</li>
                  <li>Peer feedback and collaboration</li>
                  <li>AI-assisted learning tools</li>
                  <li>Individual consultations</li>
                </ul>
              </div>
            </div>
            <InstructorNotes
              sectionId="week1-welcome"
              notes="Welcome to the course! I'm excited to work with you this semester. Our first session will be an orientation where we'll get to know each other and discuss your research interests. Please come prepared to introduce yourself and your research area briefly (1-2 minutes)."
            />
            <DiscussionBoard sectionId="week1-overview" sectionTitle="Course Overview" />
          </CardContent>
        </Card>

        {/* Basic Course Info */}
        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-primary">Course Title</h3>
              <p>Advanced English for Academic Purposes</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary">Course Code</h3>
              <p>MCCP 6020</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary">Units / Contact Hours</h3>
              <p>2 units / 42 hours</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary">Offering Department</h3>
              <p>Language Centre</p>
            </div>
          </CardContent>
        </Card>

        {/* Aims & Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Aims & Objectives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Offered as a compulsory course to all research postgraduate students at HKBU, Advanced English for Academic Purposes aims to socialize the students into the research community where knowledge is constructed and contested through conference presentations, research article publications and thesis writing for research degrees.
            </p>
            <p>
              Through this course, students will develop competence in presenting their research ideas effectively in seminar/conference presentations and writing research article/thesis manuscripts for disciplinary journals and their research degrees.
            </p>
            <p>
              Strategies for utilizing AI and technology, along with data-driven learning techniques, will be taught to enhance accuracy in academic writing and to prevent plagiarism.
            </p>
          </CardContent>
        </Card>

        {/* Course Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Course Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The course focuses on academic presentations and research writing, with the two components integrated organically and taught holistically throughout the semester.
            </p>
            <div className="space-y-4">
              <h3 className="font-semibold">Topics</h3>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li><strong>Citing sources accurately and compiling the bibliography or references</strong></li>
                <li><strong>Analyzing the format and structure of academic presentations</strong></li>
                <li><strong>Planning and organizing a short academic presentation</strong></li>
                <li>
                  <strong>Analyzing the frameworks for thesis writing and research articles</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-muted-foreground">
                    <li>Drafting a well-structured abstract and an effective introduction</li>
                    <li>Reviewing and critically evaluating the literature</li>
                    <li>Describing the research methodology</li>
                    <li>Presenting and discussing findings</li>
                    <li>Drawing conclusions</li>
                  </ul>
                </li>
                <li>
                  <strong>Analyzing and comparing linguistic features of academic speech and writing</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-muted-foreground">
                    <li>Signposting and transition statements for academic presentations</li>
                    <li>Skills of using stress, pause and intonation</li>
                    <li>Metadiscourse in academic writing</li>
                  </ul>
                </li>
                <li><strong>Comparing the stylistic features of academic speech and writing</strong></li>
                <li><strong>Effective communication in both academic speech and writing</strong></li>
                <li><strong>Considering assessment criteria and proofreading the thesis</strong></li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* CILOs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Course Intended Learning Outcomes (CILOs)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">By the end of the course, students should be able to:</p>
            <div className="space-y-6">
              {/* CILO 1 */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="font-bold min-w-[4rem]">CILO 1:</span>
                  <span>Understand and apply the appropriate structure and format of academic presentations and critically evaluate their own and their peers' presentations.</span>
                </div>
                <div className="ml-16 space-y-2">
                  <InstructorNotes sectionId="cilo-1" notes={instructorNotes["cilo-1"]} />
                  <div className="flex gap-2 flex-wrap">
                    <AIChatDialog
                      sectionId="cilo-1"
                      sectionTitle="CILO 1 - Academic Presentations"
                      context="CILO 1 focuses on understanding and applying the appropriate structure and format of academic presentations."
                      suggestedPrompts={aiPrompts.cilo}
                    />
                    <DiscussionBoard sectionId="cilo-1" sectionTitle="CILO 1 - Academic Presentations" />
                  </div>
                </div>
              </div>

              {/* CILO 2 */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="font-bold min-w-[4rem]">CILO 2:</span>
                  <span>Recognize the generic features of PhD thesis and research journal articles and apply the acquired structures in their own writing.</span>
                </div>
                <div className="ml-16 space-y-2">
                  <InstructorNotes sectionId="cilo-2" notes={instructorNotes["cilo-2"]} />
                  <div className="flex gap-2 flex-wrap">
                    <AIChatDialog
                      sectionId="cilo-2"
                      sectionTitle="CILO 2 - Thesis & Article Structure"
                      context="CILO 2 focuses on recognizing the generic features of PhD thesis and research journal articles."
                      suggestedPrompts={aiPrompts.cilo}
                    />
                    <DiscussionBoard sectionId="cilo-2" sectionTitle="CILO 2 - Thesis & Article Structure" />
                  </div>
                </div>
              </div>

              {/* CILO 3 */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="font-bold min-w-[4rem]">CILO 3:</span>
                  <span>Identify and build a repertoire of linguistic features for both academic speech and writing.</span>
                </div>
                <div className="ml-16 space-y-2">
                  <InstructorNotes sectionId="cilo-3" notes={instructorNotes["cilo-3"]} />
                  <div className="flex gap-2 flex-wrap">
                    <AIChatDialog
                      sectionId="cilo-3"
                      sectionTitle="CILO 3 - Linguistic Features"
                      context="CILO 3 focuses on identifying and building a repertoire of linguistic features."
                      suggestedPrompts={aiPrompts.cilo}
                    />
                    <DiscussionBoard sectionId="cilo-3" sectionTitle="CILO 3 - Linguistic Features" />
                  </div>
                </div>
              </div>

              {/* CILO 4 */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="font-bold min-w-[4rem]">CILO 4:</span>
                  <span>Acknowledge and document sources strategically through in-text citations, footnotes, endnotes, bibliographies, and references.</span>
                </div>
                <div className="ml-16 space-y-2">
                  <InstructorNotes sectionId="cilo-4" notes={instructorNotes["cilo-4"]} />
                  <div className="flex gap-2 flex-wrap">
                    <AIChatDialog
                      sectionId="cilo-4"
                      sectionTitle="CILO 4 - Citations & References"
                      context="CILO 4 focuses on acknowledging and documenting sources strategically."
                      suggestedPrompts={aiPrompts.cilo}
                    />
                    <DiscussionBoard sectionId="cilo-4" sectionTitle="CILO 4 - Citations & References" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* TLAs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Teaching & Learning Activities (TLAs)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">CILO No.</TableHead>
                  <TableHead>TLAs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">CILO 1 & 3</TableCell>
                  <TableCell>Deliver presentations and share research ideas.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CILO 1 & 3</TableCell>
                  <TableCell>Study and analyze authentic seminar presentations.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CILO 2 & 3</TableCell>
                  <TableCell>Analyze research articles to identify genre and linguistic features.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CILO 3</TableCell>
                  <TableCell>Evaluate academic style and expression in various sections of academic articles.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CILO 4</TableCell>
                  <TableCell>Practice the strategic use of in-text citations and references.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Assessment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Assessment Methods (AMs)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Presentation 1 */}
            <div className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-semibold">Oral Presentation 1: Research Article Presentation</h3>
                <div className="flex gap-2 text-sm">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">20%</span>
                  <span className="bg-muted px-2 py-1 rounded">CILOs 1 & 3</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                8-minute presentation on a journal article explaining research objectives, key findings, and relevance to your own study.
              </p>
              <InstructorNotes sectionId="assessment-presentation1" notes={instructorNotes["assessment-presentation1"]} />
              <div className="flex gap-2 flex-wrap">
                <AIChatDialog
                  sectionId="assessment-presentation1"
                  sectionTitle="Oral Presentation 1"
                  context="This is an 8-minute presentation on a journal article worth 20% of the grade."
                  suggestedPrompts={aiPrompts.assessment}
                />
                <DiscussionBoard sectionId="assessment-presentation1" sectionTitle="Oral Presentation 1" />
              </div>
            </div>

            {/* Poster Presentation */}
            <div className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-semibold">Oral Presentation 2: Poster Presentation</h3>
                <div className="flex gap-2 text-sm">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">20%</span>
                  <span className="bg-muted px-2 py-1 rounded">CILOs 1 & 3</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Poster presentation showcasing research focus, design, and preliminary findings.
              </p>
              <InstructorNotes sectionId="assessment-poster" notes={instructorNotes["assessment-poster"]} />
              <div className="flex gap-2 flex-wrap">
                <AIChatDialog
                  sectionId="assessment-poster"
                  sectionTitle="Poster Presentation"
                  context="This is a poster presentation worth 20%."
                  suggestedPrompts={aiPrompts.assessment}
                />
                <DiscussionBoard sectionId="assessment-poster" sectionTitle="Poster Presentation" />
              </div>
            </div>

            {/* Writing Assignment */}
            <div className="space-y-3 p-4 border rounded-lg bg-primary/5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-semibold">Writing Component: Introduction & Literature Review</h3>
                <div className="flex gap-2 text-sm">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded font-medium">40%</span>
                  <span className="bg-muted px-2 py-1 rounded">CILOs 2, 3 & 4</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Take-home assignment including background information, literature review, research gap analysis, and purpose statement.
              </p>
              <InstructorNotes sectionId="assessment-writing" notes={instructorNotes["assessment-writing"]} />
              <div className="flex gap-2 flex-wrap">
                <AIChatDialog
                  sectionId="assessment-writing"
                  sectionTitle="Research Writing Assignment"
                  context="This is the main writing assignment worth 40%."
                  suggestedPrompts={aiPrompts.assessment}
                />
                <DiscussionBoard sectionId="assessment-writing" sectionTitle="Research Writing Assignment" />
              </div>
            </div>

            {/* 3MT */}
            <div className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-semibold">Oral Presentation 3: 3MT Presentation</h3>
                <div className="flex gap-2 text-sm">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">20%</span>
                  <span className="bg-muted px-2 py-1 rounded">CILOs 1 & 3</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                3-minute presentation on your own research, explaining objectives, design, and significance to a non-specialist audience.
              </p>
              <InstructorNotes sectionId="assessment-3mt" notes={instructorNotes["assessment-3mt"]} />
              <div className="flex gap-2 flex-wrap">
                <AIChatDialog
                  sectionId="assessment-3mt"
                  sectionTitle="3MT Presentation"
                  context="This is a 3-Minute Thesis style presentation worth 20%."
                  suggestedPrompts={aiPrompts.assessment}
                />
                <DiscussionBoard sectionId="assessment-3mt" sectionTitle="3MT Presentation" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Policies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Course Policies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">i) Late submissions of assignments</h3>
              <p className="mb-2">
                Students must complete all course assessments. Late submissions will incur penalties – one percent of the final score for that assignment will be deducted for each day past the deadline. Assignments submitted more than 5 days after the deadline will receive a zero mark.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">ii) Plagiarism policy</h3>
              <p>
                Plagiarism is not tolerated at HKBU. Should a case of plagiarism be established, University regulations will be strictly applied, including failing the course or expulsion.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">iii) Use of AI tools in assessments</h3>
              <p className="mb-2">
                While the University encourages the ethical use of AI for learning, submitting AI-generated output as your own work violates academic integrity guidelines. You may check your writing through:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li><a href="https://gptzero.me/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GPTZero</a></li>
                <li><a href="https://copyleaks.com/ai-content-detector" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Copyleaks</a></li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Readings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Textbooks / Recommended Readings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Recommended Textbook</h3>
              <p>
                <strong>Paltridge, B., & Starfield, S. (2020).</strong> Thesis and Dissertation Writing in a Second Language (2nd edition). Routledge. <a href="https://doi.org/10.4324/9781315170022" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://doi.org/10.4324/9781315170022</a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Useful Websites</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><a href="http://www.phrasebank.manchester.ac.uk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Academic Phrasebank</a></li>
                <li><a href="http://owl.english.purdue.edu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Purdue Online Writing Lab</a></li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* AI Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI-Assisted Learning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This course incorporates AI tools to enhance your learning experience.
            </p>
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-medium mb-2">Getting Started with AI Tools</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                <li>Set up your HKBU Gen AI API key in the <Link to="/mccp/api-key" className="text-primary hover:underline">API Key Setup</Link> page</li>
                <li>Use the "Ask AI" buttons throughout the course materials</li>
                <li>Get instant feedback on your writing and presentations</li>
              </ol>
            </div>
            <InstructorNotes
              sectionId="week1-ai-ethics"
              notes="While AI tools are encouraged for learning and revision, all submitted work must be your own. AI can help you brainstorm, check grammar, and understand concepts, but the ideas and writing should reflect your authentic voice."
            />
            <DiscussionBoard sectionId="week1-ai" sectionTitle="AI-Assisted Learning" />
          </CardContent>
        </Card>

        {/* Copyright Notice */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Copyright Notice and Privacy Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              All course materials are protected under the Copyright Ordinance (Cap. 528) of Hong Kong SAR. Students may take notes and make copies for their own learning purposes. No unauthorized sharing, reproduction, or distribution of course materials is permitted.
            </p>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground space-y-2 pb-8">
          <p className="font-medium">Syllabus prepared by Dr. Ellie Law</p>
          <p>Acknowledgements: Special thanks to Dr. Meilin Chen, Dr. Cissy Li, Dr. Dan Lu, Dr. Simon Wang and Ms. Lara Mushkat.</p>
        </div>
      </div>
    </div>
  );
};

export default Week1Introduction;
