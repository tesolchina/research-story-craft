import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import StudentEntry from "@/components/mccp/StudentEntry";
import MCQuiz from "@/components/mccp/MCQuiz";
import WritingTask from "@/components/mccp/WritingTask";

// Session 1 MC Questions - CARS Model & Introduction Writing
const session1Questions = [
  {
    id: "s1q1",
    question: "Which of the following best describes Move 1 in the CARS model?",
    options: [
      "Identifying research gaps",
      "Establishing the research territory",
      "Stating research objectives",
      "Presenting findings",
    ],
    correctIndex: 1,
    explanation: "Move 1 focuses on establishing the importance and relevance of the research field.",
  },
  {
    id: "s1q2",
    question: "Centrality statements typically use which tense?",
    options: ["Past simple", "Present simple", "Future tense", "Past perfect"],
    correctIndex: 1,
    explanation: "Present simple is used because centrality claims describe ongoing truths about the field.",
  },
  {
    id: "s1q3",
    question: "Which word is an example of an evaluative adjective commonly used in centrality statements?",
    options: ["New", "Crucial", "Recent", "First"],
    correctIndex: 1,
    explanation: "Evaluative adjectives like 'crucial', 'important', 'significant' establish the value of the research.",
  },
  {
    id: "s1q4",
    question: "What is the main purpose of Move 2 in the CARS model?",
    options: [
      "To review all existing literature",
      "To establish a niche by identifying gaps",
      "To present research methodology",
      "To summarize findings",
    ],
    correctIndex: 1,
    explanation: "Move 2 creates space for the research by showing what's missing or problematic in existing work.",
  },
  {
    id: "s1q5",
    question: "In the IMRD structure, what does 'M' stand for?",
    options: ["Methods", "Materials", "Methodology", "Measures"],
    correctIndex: 0,
    explanation: "IMRD stands for Introduction, Methods, Results, and Discussion.",
  },
];

// Session 2 MC Questions - Literature Review
const session2Questions = [
  {
    id: "s2q1",
    question: "What is the primary difference between summarizing and synthesizing literature?",
    options: [
      "Summarizing combines multiple sources while synthesis condenses one",
      "Synthesis combines ideas from multiple sources to create new meaning",
      "They are essentially the same technique",
      "Summarizing is more analytical than synthesis",
    ],
    correctIndex: 1,
    explanation: "Synthesis integrates multiple sources to identify patterns, themes, or new insights.",
  },
  {
    id: "s2q2",
    question: "Which citation style uses (Author, Year) format?",
    options: ["MLA", "APA", "Chicago footnotes", "Harvard"],
    correctIndex: 1,
    explanation: "APA style uses parenthetical citations with author and year.",
  },
  {
    id: "s2q3",
    question: "What is 'patchwriting'?",
    options: [
      "Excellent paraphrasing technique",
      "Copying with minor word substitutions (problematic)",
      "Writing introductions",
      "Combining multiple quotes",
    ],
    correctIndex: 1,
    explanation: "Patchwriting is considered a form of plagiarism where the original is only superficially changed.",
  },
  {
    id: "s2q4",
    question: "A good literature review should primarily:",
    options: [
      "List all sources you read",
      "Critically evaluate and synthesize relevant sources",
      "Quote as many sources as possible",
      "Focus only on sources that support your view",
    ],
    correctIndex: 1,
    explanation: "Literature reviews should analyze, compare, and synthesize sources critically.",
  },
  {
    id: "s2q5",
    question: "When paraphrasing, you should:",
    options: [
      "Keep the same sentence structure but change words",
      "Change both the words AND the sentence structure",
      "Only change technical terms",
      "Keep key phrases in quotation marks",
    ],
    correctIndex: 1,
    explanation: "Effective paraphrasing requires restating ideas in your own words AND structure.",
  },
];

const Weeks2to4Tasks = () => {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [pseudonym, setPseudonym] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const handleStudentVerified = (id: string, name: string) => {
    setStudentId(id);
    setPseudonym(name);
  };

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks((prev) => new Set([...prev, taskId]));
  };

  const totalTasks = 4;
  const completedCount = completedTasks.size;
  const progressPercent = (completedCount / totalTasks) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp/weeks2-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Weeks 2-4</p>
            <h1 className="text-2xl font-bold">Pre-Meeting Tasks</h1>
          </div>
        </div>

        <StudentEntry onStudentVerified={handleStudentVerified} />

        {studentId && pseudonym && (
          <>
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Progress</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {completedCount}/{totalTasks} tasks completed
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercent} className="h-3" />
              </CardContent>
            </Card>

            {/* Session 1 */}
            <Accordion type="single" collapsible defaultValue="session1" className="space-y-4">
              <AccordionItem value="session1" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold">Session 1: Introduction Writing</p>
                      <p className="text-sm text-muted-foreground">
                        CARS Model & Thesis Structure
                      </p>
                    </div>
                    {completedTasks.has("session1_mc") && completedTasks.has("session1_writing") && (
                      <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto mr-4" />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <MCQuiz
                    title="Quiz: CARS Model Understanding"
                    description="Test your knowledge of the CARS model and introduction writing"
                    questions={session1Questions}
                    taskId="session1_mc"
                    studentId={studentId}
                    onComplete={(score, total) => {
                      handleTaskComplete("session1_mc");
                    }}
                  />

                  <WritingTask
                    title="Writing: Centrality Statement"
                    description="Practice writing a centrality statement for your research"
                    prompt={`Write a centrality statement (2-3 sentences) that establishes the importance of your research topic.

Your statement should:
• Use present tense
• Include evaluative adjectives (e.g., important, crucial, significant)
• Establish why this topic matters to the field

Example structure: "[Topic] has become increasingly important in [field] because [reason]. Research in this area is crucial for [impact/benefit]."

If you don't have a research topic yet, you can practice with: "The impact of AI on academic writing"`}
                    taskId="session1_writing"
                    taskType="centrality_statement"
                    studentId={studentId}
                    onComplete={() => handleTaskComplete("session1_writing")}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="session2" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold">Session 2: Literature Review</p>
                      <p className="text-sm text-muted-foreground">
                        Reviewing & Critically Evaluating Literature
                      </p>
                    </div>
                    {completedTasks.has("session2_mc") && completedTasks.has("session2_writing") && (
                      <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto mr-4" />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <MCQuiz
                    title="Quiz: Literature Review Concepts"
                    description="Test your understanding of literature review techniques"
                    questions={session2Questions}
                    taskId="session2_mc"
                    studentId={studentId}
                    onComplete={(score, total) => {
                      handleTaskComplete("session2_mc");
                    }}
                  />

                  <WritingTask
                    title="Writing: Paraphrase Practice"
                    description="Practice paraphrasing an academic passage"
                    prompt="Paraphrase the following passage in your own words. Remember to change both vocabulary AND sentence structure while maintaining the original meaning."
                    context={`Original passage:

"The integration of artificial intelligence in educational settings has fundamentally transformed how students engage with learning materials. Traditional classroom approaches are being supplemented, and in some cases replaced, by adaptive learning systems that can personalize content delivery based on individual student performance and preferences."`}
                    taskId="session2_writing"
                    taskType="paraphrase"
                    studentId={studentId}
                    onComplete={() => handleTaskComplete("session2_writing")}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </div>
    </div>
  );
};

export default Weeks2to4Tasks;
