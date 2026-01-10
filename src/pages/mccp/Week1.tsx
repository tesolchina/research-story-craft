import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  BookOpen, 
  GraduationCap, 
  ClipboardList, 
  Target, 
  Bot,
  ChevronDown,
  MessageCircle,
  Brain,
  Users,
  Lightbulb,
  BookMarked,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CollapsibleModuleProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  emoji?: string;
}

const CollapsibleModule = ({ title, icon, children, defaultOpen = true, emoji }: CollapsibleModuleProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="mb-4">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg font-bold">
              <div className="flex items-center gap-2">
                {emoji && <span className="text-xl">{emoji}</span>}
                {icon}
                {title}
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

const ciloData = [
  { id: "CILO 1", description: "Understand and apply the appropriate structure and format of academic presentations and critically evaluate their own and their peers' presentations." },
  { id: "CILO 2", description: "Recognize the generic features of PhD thesis and research journal articles and apply the acquired structures or move development in their own writing." },
  { id: "CILO 3", description: "Identify and build a repertoire of linguistic features for both academic speech and writing, including signposts, cohesive devices, and grammatical patterns." },
  { id: "CILO 4", description: "Acknowledge and document a wide range of sources strategically and systematically in the form of in-text citations, bibliographies, and references." },
];

const Week1 = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Week 1</p>
            <h1 className="text-2xl font-bold">Course Introduction</h1>
          </div>
        </div>

        {/* Opening Remarks Module */}
        <CollapsibleModule 
          title="Opening Remarks" 
          emoji="💬"
          icon={<MessageCircle className="h-5 w-5 text-primary" />}
          defaultOpen={false}
        >
          <div className="space-y-6">
            {/* Point 1: Small vs Large Language Model */}
            <div className="p-4 rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">The Teacher as a "Small Language Model"</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Compared to Large Language Models, a language teacher is more like a <span className="font-medium text-foreground">small language model</span> — or even a tiny one. 
                    Through decades of education and exposure, we develop proficiency by building our own internal "corpus" of language patterns.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    But now that LLMs are available, do you still need a human teacher? If you want to polish writing or analyze article structure, 
                    AI can help. So what's the teacher's role?
                  </p>
                </div>
              </div>
            </div>

            {/* Point 2: Working Together with AI */}
            <div className="p-4 rounded-lg border bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                  <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Human + AI Collaboration</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    The answer is <span className="font-medium text-foreground">partnership</span>. I acknowledge the power of AI, but perhaps I can show you 
                    ways of using AI that you don't know yet, or help improve your workflow.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Honestly, I don't need 24 hours to lecture — which is why this course uses <span className="font-medium text-foreground">modules and small group meetings</span>. 
                    Starting next week, you'll meet in smaller groups (1 hour each) for a more personalized experience. 
                    <span className="font-medium text-primary"> Please show up — I really want to get to know you!</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Point 3: Revisiting the Nature Career Article */}
            <div className="p-4 rounded-lg border bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50">
                  <BookMarked className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Revisiting the 2019 Nature Career Column</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Seven years ago, I published a column in <span className="italic">Nature</span> about academic writing strategies. 
                    The points are still relevant — but now with AI, they take on new meaning:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">1.</span>
                      <span><span className="font-medium text-foreground">Manage your literature</span> — using Zotero, Mendeley, or other tools. With AI, this is even more important: to partner with AI, you need to give it your materials and database.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">2.</span>
                      <span><span className="font-medium text-foreground">Consult language teachers</span> — but now we can turn human teaching into AI teaching. If I identify something helpful, I can teach AI to teach you more efficiently.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">3.</span>
                      <span><span className="font-medium text-foreground">Learn from published articles</span> — treat texts as "textual mentors." Use AI to analyze structure, word choice, and patterns — but via API, not copy-paste to ChatGPT!</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 rounded bg-amber-100/50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                    <p className="text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
                      <ExternalLink className="h-3 w-3" />
                      <a href="#" className="underline hover:no-underline">Read the Nature Career Column (2019)</a>
                      <span className="text-amber-600">— Link placeholder</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Point 4: The Bigger Picture */}
            <div className="p-4 rounded-lg border bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50">
                  <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">A Note on the Future</h4>
                  <p className="text-sm text-muted-foreground">
                    Am I losing my job? Honestly, I don't think <span className="italic">I</span> will — but some of my colleagues? I'm not so sure. 
                    That's a discussion for another time. For now, let's focus on how we can work <span className="font-medium text-foreground">together</span> — 
                    human intelligence and artificial intelligence — to make your academic journey more effective.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Discussion Prompt */}
            <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-l-primary">
              <h4 className="font-semibold mb-2">💭 Quick Reflection</h4>
              <p className="text-sm text-muted-foreground">
                How do <span className="font-medium text-foreground">you</span> currently manage your literature? Do you use Zotero, Mendeley, or something else? 
                Or do you just save files in folders? Let's discuss how AI might change your workflow.
              </p>
            </div>
          </div>
        </CollapsibleModule>

        {/* Module 1: Course Overview (consolidated) */}
        <CollapsibleModule 
          title="Course Overview" 
          emoji="📚"
          icon={<BookOpen className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-6">
            {/* Course Info */}
            <div>
              <p className="text-muted-foreground mb-4">
                Welcome to MCCP 6020: Advanced English for Academic Purposes. This course is designed to 
                help you develop essential academic communication skills for your research journey.
              </p>
              <div className="grid gap-4 md:grid-cols-2 mb-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <span className="text-xs text-muted-foreground">Course Code</span>
                  <p className="font-medium">MCCP 6020</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <span className="text-xs text-muted-foreground">Units / Contact Hours</span>
                  <p className="font-medium">2 units / 42 hours</p>
                </div>
              </div>
            </div>

            {/* Aims & Objectives */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Aims & Objectives</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                The course aims to prepare students for active participation in their research communities by developing 
                their academic presentation and writing skills, particularly for PhD research.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Develop effective academic presentation techniques</li>
                <li>Master thesis and research article writing conventions</li>
                <li>Build academic vocabulary and linguistic repertoire</li>
                <li>Learn proper citation and documentation practices</li>
              </ul>
            </div>

            {/* CILOs */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Course Intended Learning Outcomes (CILOs)</h3>
              </div>
              <div className="space-y-3">
                {ciloData.map((cilo) => (
                  <div key={cilo.id} className="p-3 border-l-4 border-l-primary bg-muted/30 rounded-r-lg">
                    <span className="font-bold text-primary text-sm">{cilo.id}</span>
                    <p className="text-sm text-muted-foreground">{cilo.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleModule>

        {/* Module 2: Assessment Methods */}
        <CollapsibleModule 
          title="Assessment Methods" 
          emoji="📊"
          icon={<ClipboardList className="h-5 w-5 text-primary" />}
        >
          <div className="grid gap-4">
            <div className="flex justify-between items-start p-4 border rounded-lg">
              <div>
                <h4 className="font-bold">Oral Presentation 1</h4>
                <p className="text-sm text-muted-foreground">8-minute presentation on a journal article</p>
                <Link to="/mccp/assessment#oral1" className="text-xs text-primary hover:underline">View details →</Link>
              </div>
              <span className="font-bold text-primary text-lg">20%</span>
            </div>
            <div className="flex justify-between items-start p-4 border rounded-lg">
              <div>
                <h4 className="font-bold">Oral Presentation 2</h4>
                <p className="text-sm text-muted-foreground">Poster Presentation of research design</p>
                <Link to="/mccp/assessment#oral2" className="text-xs text-primary hover:underline">View details →</Link>
              </div>
              <span className="font-bold text-primary text-lg">20%</span>
            </div>
            <div className="flex justify-between items-start p-4 border rounded-lg">
              <div>
                <h4 className="font-bold">Writing Assignment</h4>
                <p className="text-sm text-muted-foreground">Introduction and Literature Review</p>
                <Link to="/mccp/assessment#writing" className="text-xs text-primary hover:underline">View details →</Link>
              </div>
              <span className="font-bold text-primary text-lg">40%</span>
            </div>
            <div className="flex justify-between items-start p-4 border rounded-lg">
              <div>
                <h4 className="font-bold">Oral Presentation 3</h4>
                <p className="text-sm text-muted-foreground">3-minute presentation (3MT style)</p>
                <Link to="/mccp/assessment#oral3" className="text-xs text-primary hover:underline">View details →</Link>
              </div>
              <span className="font-bold text-primary text-lg">20%</span>
            </div>
          </div>
        </CollapsibleModule>

        {/* AI Agent Sub-page Link */}
        <Card className="border-primary/20 bg-primary/5 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Bot className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">AI-Assisted Activities</h3>
                  <p className="text-sm text-muted-foreground">Complete these activities using your AI Agent in IDE</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/mccp/week1/activity-1">Activity 1.1</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/mccp/week1/activity-2">Activity 1.2</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/mccp/week1/activity-3">Activity 1.3</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/mccp/week1/activity-4">Activity 1.4</Link>
                  </Button>
                </div>
                <Button asChild className="w-full sm:w-auto flex-shrink-0">
                  <Link to="/mccp/week1/ai-agent">
                    Setup Guide →
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Week1;
