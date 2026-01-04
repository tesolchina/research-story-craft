import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, GraduationCap, FileText, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import InstructorNotes from "@/components/mccp/InstructorNotes";
import DiscussionBoard from "@/components/mccp/DiscussionBoard";
import AIChatDialog from "@/components/mccp/AIChatDialog";

// Instructor notes for each section - editable via GitHub/IDE
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

// AI prompt suggestions for each section type
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

const Syllabus = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back navigation */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">MCCP 6020</p>
            <h1 className="text-2xl font-bold">Course Syllabus</h1>
          </div>
        </div>

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
              Through this course, students will develop competence in presenting their research ideas effectively in seminar/conference presentations and writing research article/thesis manuscripts for disciplinary journals and their research degrees. Students will study the language, features and format of the various stages for preparing conference presentations, publishing research articles and writing thesis and develop a scholarly voice of appropriate style and tone through critically analyzing and imitating sample research journal articles of their fields.
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
              <div>
                <h3 className="font-semibold mb-2">Topics</h3>
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
                      <li>Metadiscourse in academic writing, e.g. signposting, cohesive devices, hedging, and rhetorical functions</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Comparing the stylistic features of academic speech and writing</strong>
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-muted-foreground">
                      <li>Academic language for presentations</li>
                      <li>Adopting a formal style in writing</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Effective communication in both academic speech and writing</strong>
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-muted-foreground">
                      <li>Non-verbal linguistic skills for academic presentations, e.g. body language, eye contact, and facial expressions</li>
                      <li>Skills of handling questions during presentations</li>
                      <li>Writing acknowledgements for thesis and journal articles</li>
                    </ul>
                  </li>
                  <li><strong>Considering assessment criteria and proofreading the thesis</strong></li>
                </ol>
              </div>
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
                      context="CILO 1 focuses on understanding and applying the appropriate structure and format of academic presentations and critically evaluating presentations."
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
                  <span>Recognize the generic features of PhD thesis and research journal articles and apply the acquired structures or move development in their own writing.</span>
                </div>
                <div className="ml-16 space-y-2">
                  <InstructorNotes sectionId="cilo-2" notes={instructorNotes["cilo-2"]} />
                  <div className="flex gap-2 flex-wrap">
                    <AIChatDialog
                      sectionId="cilo-2"
                      sectionTitle="CILO 2 - Thesis & Article Structure"
                      context="CILO 2 focuses on recognizing the generic features of PhD thesis and research journal articles and applying acquired structures in their own writing."
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
                  <span>Identify and build a repertoire of linguistic features for both academic speech and writing, including signposts, cohesive devices, and grammatical patterns, etc. for both academic presentations and writing.</span>
                </div>
                <div className="ml-16 space-y-2">
                  <InstructorNotes sectionId="cilo-3" notes={instructorNotes["cilo-3"]} />
                  <div className="flex gap-2 flex-wrap">
                    <AIChatDialog
                      sectionId="cilo-3"
                      sectionTitle="CILO 3 - Linguistic Features"
                      context="CILO 3 focuses on identifying and building a repertoire of linguistic features for academic speech and writing, including signposts, cohesive devices, and grammatical patterns."
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
                  <span>Acknowledge and document a wide range of sources strategically and systematically in the form of in-text citations, footnotes, endnotes, bibliographies, and references.</span>
                </div>
                <div className="ml-16 space-y-2">
                  <InstructorNotes sectionId="cilo-4" notes={instructorNotes["cilo-4"]} />
                  <div className="flex gap-2 flex-wrap">
                    <AIChatDialog
                      sectionId="cilo-4"
                      sectionTitle="CILO 4 - Citations & References"
                      context="CILO 4 focuses on acknowledging and documenting sources strategically through in-text citations, footnotes, endnotes, bibliographies, and references."
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
                  <TableCell>Study and analyze authentic seminar presentations and identify and discuss formal and informal language and body language used in seminar presentations as well as the overall organization.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CILO 2 & 3</TableCell>
                  <TableCell>Analyze research articles to identify genre and linguistic features that can be re-used in one's own writing.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CILO 3</TableCell>
                  <TableCell>Evaluate the academic style and expression of the abstract, introduction, literature review, methodology, findings, discussion, and conclusion sections in selected academic articles, and identify and correct errors in the use of verb tenses, signposts, and connectors and discuss the findings in oral presentations.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CILO 4</TableCell>
                  <TableCell>Practice the strategic use of in-text citations and references/bibliography to follow the discourse conventions of specific disciplines.</TableCell>
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
                <h3 className="font-semibold">Oral Presentation 1: Presentation on a research article</h3>
                <div className="flex gap-2 text-sm">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">20%</span>
                  <span className="bg-muted px-2 py-1 rounded">CILOs 1 & 3</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Students will give an 8-minute presentation on a journal article in their field to a non-specialist audience and explain how the research is relevant to their own study. They should explain the (1) main research objectives, (2) key findings and the significance of the research, and (3) elucidate how the research presented in the journal article may impact their own research design.
              </p>
              <InstructorNotes sectionId="assessment-presentation1" notes={instructorNotes["assessment-presentation1"]} />
              <div className="flex gap-2 flex-wrap">
                <AIChatDialog
                  sectionId="assessment-presentation1"
                  sectionTitle="Oral Presentation 1"
                  context="This is an 8-minute presentation on a journal article worth 20% of the grade. Students present to a non-specialist audience and explain research relevance to their own study."
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
                This poster presentation assessment requires students to showcase their research focus, research design, and preliminary findings. Students will be assessed on their ability to design a poster showcasing their research, communicate research ideas effectively, engage with peers in thoughtful discussions, and respond to audience questions in a clear and structured manner.
              </p>
              <InstructorNotes sectionId="assessment-poster" notes={instructorNotes["assessment-poster"]} />
              <div className="flex gap-2 flex-wrap">
                <AIChatDialog
                  sectionId="assessment-poster"
                  sectionTitle="Poster Presentation"
                  context="This is a poster presentation worth 20% showcasing research focus, design, and preliminary findings. Students are assessed on poster design, communication, peer engagement, and Q&A skills."
                  suggestedPrompts={aiPrompts.assessment}
                />
                <DiscussionBoard sectionId="assessment-poster" sectionTitle="Poster Presentation" />
              </div>
            </div>

            {/* Writing Assignment */}
            <div className="space-y-3 p-4 border rounded-lg bg-primary/5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-semibold">Writing a research paper introduction and a literature review</h3>
                <div className="flex gap-2 text-sm">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded font-medium">40%</span>
                  <span className="bg-muted px-2 py-1 rounded">CILOs 2, 3 & 4</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Students will complete a take-home assignment that includes sufficient background information to provide context and significance for the research, a review of recent and relevant literature, proper acknowledgment of previous work on the topic, and an analysis or reference to the research gap that needs to be filled. Additionally, the assignment should feature a purpose statement highlighting the novelty and contributions of the research.
              </p>
              <InstructorNotes sectionId="assessment-writing" notes={instructorNotes["assessment-writing"]} />
              <div className="flex gap-2 flex-wrap">
                <AIChatDialog
                  sectionId="assessment-writing"
                  sectionTitle="Research Writing Assignment"
                  context="This is the main writing assignment worth 40%, requiring an introduction and literature review with background, literature synthesis, research gap analysis, and purpose statement."
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
                Students will give a 3-minute presentation on their own research. They need to explain the objectives, design and significance of their research concisely and powerfully to a non-specialist audience using a range of 3MT features.
              </p>
              <InstructorNotes sectionId="assessment-3mt" notes={instructorNotes["assessment-3mt"]} />
              <div className="flex gap-2 flex-wrap">
                <AIChatDialog
                  sectionId="assessment-3mt"
                  sectionTitle="3MT Presentation"
                  context="This is a 3-Minute Thesis style presentation worth 20% where students explain their own research concisely and powerfully to a non-specialist audience."
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
                Students must complete all course assessments, which in total have to reach at least the satisfactory level in order to pass the course. Please refer to the assessment rubrics for details of the assessment criteria and assessment standards.
              </p>
              <p>
                Late submissions of assignments will incur penalties – one percent of the final score for that assignment will be deducted for each day past the deadline (weekends and statutory holidays included). Assignments submitted more than 5 days after the deadline will receive a zero mark. If you have a valid reason for late submission, you should discuss it with your lecturer prior to the assignment due date.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">ii) Plagiarism policy</h3>
              <p>
                Plagiarism (i.e. copying from other sources without an acknowledgement or copying other students' work) is not tolerated at HKBU. Should a case of plagiarism be established, University regulations will be strictly applied, and these potentially include failing a course or being expelled from the University. Please read the University's guidelines for students on academic Integrity.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">iii) Use of AI tools in assessments</h3>
              <p className="mb-2">
                While the University encourages the ethical use of AI for learning (e.g. for brainstorming ideas, exploring information), submitting the output of generative AI tools, including translation tools, as your own work in any assignment is deemed a violation of the University's academic integrity guidelines. Therefore, if AI detection tools indicate that your assignment may consist of any AI-generated text, you will be asked to present a detailed record of your use of generative AI tools in the respective assessment for further investigation. Nonetheless, presenting a detailed record does not necessarily serve as irrefutable evidence that no violation has occurred. The Course Coordinator has the right to make the final decision on whether to apply a penalty and the extent of that penalty.
              </p>
              <p className="mb-2">
                Please note that any texts submitted to generative AI platforms may be added to the internal databases of such platforms for unknown purposes, potentially infringing on data privacy of the authors of the submitted texts.
              </p>
              <p>You may check whether your writing consists of AI-generated text through the following websites:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><a href="https://gptzero.me/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GPTZero</a></li>
                <li><a href="https://copyleaks.com/ai-content-detector" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Copyleaks</a></li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Textbooks / Recommended Readings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Textbooks / Recommended Readings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Recommended Textbook and Materials</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  <strong>Paltridge, B., & Starfield, S. (2020).</strong> Thesis and Dissertation Writing in a Second Language: A Handbook for Students and their Supervisors (2nd edition). Routledge. <a href="https://doi.org/10.4324/9781315170022" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://doi.org/10.4324/9781315170022</a>
                </li>
                <li>Course materials prepared by the lecturers</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Recommended Readings</h3>
              <ol start={3} className="list-decimal list-inside space-y-2">
                <li>
                  <strong>Heppner, P. P. and Heppner, M. J. (2004)</strong> Writing and Publishing your Thesis, Dissertation, and Research: A Guide for Students in the Helping Professions. Belmont: Thomson/Brooks/Cole.
                </li>
                <li>
                  <strong>Becker, L. (2014).</strong> Presenting Your Research: Conferences, Symposiums, Poster Presentations and Beyond (1st ed.). SAGE Publications, Limited. <a href="https://doi.org/10.4135/9781473919815" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://doi.org/10.4135/9781473919815</a>
                </li>
                <li>
                  <strong>Swales, J.M., & Feak, C.B. (2012).</strong> Academic Writing for Graduate Students: Essential tasks and skills (3rd ed.). Ann Arbor, MI: University of Michigan Press.
                </li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Websites</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">For Presentation Skills</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    <li><a href="http://www.lc.unsw.edu.au/onlib/tutsem.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Oral Presentations for Tutorials & Seminars (The Language Centre, UNSW)</a></li>
                    <li><a href="http://www.canberra.edu.au/studyskills/learning/oral" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Giving an Oral Presentation (University of Canberra)</a></li>
                    <li><a href="http://www.psych.utoronto.ca/users/reingold/courses/resources/presentskills.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Presentation Skills</a></li>
                    <li><a href="http://www.presentationmagazine.com/Essential_Presentation_skills.htm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Essential Presentation Skills</a></li>
                    <li><a href="http://www.openu.ac.il/english4u/presentation-skills.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Academic Presentation Skills (The Open University of Israel)</a></li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">For Thesis-Writing</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    <li><a href="http://www.phys.unsw.edu.au/~jw/thesis.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">How to Write a PhD Thesis (University of NSW)</a></li>
                    <li><a href="http://owl.english.purdue.edu/internet/resources/index.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Online Writing Lab (Purdue University)</a></li>
                    <li><a href="http://www.learnerassociates.net/dissthes/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Writing and Presenting Your Thesis or Dissertation</a></li>
                    <li><a href="http://lorien.ncl.ac.uk/ming/dept/Tips/writing/thesis/thesis-structure.htm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Writing Research Theses or Dissertations: Guidelines and Tips</a></li>
                    <li><a href="http://www.wisc.edu/writing/Handbook/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">The Writer's Handbook</a></li>
                    <li><a href="http://www.phrasebank.manchester.ac.uk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Academic Phrasebank</a></li>
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground space-y-2 pb-8">
          <p className="font-medium">Syllabus prepared by Dr. Ellie Law</p>
          <p>Acknowledgements: Special thanks to Dr. Meilin Chen, Dr. Cissy Li, Dr. Dan Lu, Dr. Simon Wang and Ms. Lara Mushkat for their invaluable contributions to every aspect of the course.</p>
        </div>

        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Copyright Notice and Privacy Disclaimer</h3>
            <div className="text-sm text-muted-foreground space-y-4">
              <p>
                All lectures and course materials of this course, including but not limited to PowerPoint presentations, materials, texts, images, diagrams, tables, drawings, notes, video and audio recordings, syllabi, and assignments ("Course Materials"), are protected under the Copyright Ordinance (Cap. 528) of the Hong Kong SAR and similar law in force from time to time throughout the world as well as by the policy of Hong Kong Baptist University ("HKBU"). The copyright of the Course Materials and any other materials that the individual course instructors create belong to the respective individual course instructors.
              </p>
              <p>
                The Course Materials may include video or audio recordings of the classes. Students who are enrolled in this course may be recorded during class. The recordings do not seek to collect students' personal data but to the extent that any personal data are obtained, they shall be used in accordance with the confirmation provided when students enrolled at HKBU, "for different academic and administrative purposes which are in relation to my study at the University." Such recordings are made for purposes of teaching and learning and may be made available to students and to staff members of HKBU strictly for such purposes.
              </p>
              <p>
                Students enrolled in this course may take notes and make copies of the Course Materials for their own learning purposes. No one may share, reproduce, distribute or display (whether by way of posting, file-sharing, uploading, downloading or otherwise) the Course Materials or any part thereof in any other way without the explicit written consent of the course instructor. No one also may allow others to do so. Any unauthorized use of the Course Materials may result in HKBU disciplinary actions as well as criminal and civil liabilities against the students and staff members concerned.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Syllabus;
