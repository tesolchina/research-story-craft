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
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Slide images
import slideSlm from "@/assets/opening-slide-1-slm.png";
import slideCollab from "@/assets/opening-slide-2-collab.png";
import slideLiterature from "@/assets/opening-slide-3-literature.png";
import slideFuture from "@/assets/opening-slide-4-future.png";

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
          <Button variant="ghost" size="sm" asChild>
            <Link to="/mccp" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>ERPP Home</span>
            </Link>
          </Button>
        </div>
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Week 1</p>
          <h1 className="text-2xl font-bold">Course Introduction</h1>
        </div>

        {/* Opening Remarks Module */}
        <CollapsibleModule 
          title="Opening Remarks" 
          emoji="💬"
          icon={<MessageCircle className="h-5 w-5 text-primary" />}
          defaultOpen={false}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {/* Slide 1: Small vs Large LM */}
            <div className="rounded-lg overflow-hidden border bg-card">
              <img src={slideSlm} alt="Teacher as Small Language Model" className="w-full h-32 object-cover" />
              <div className="p-3">
                <h4 className="font-semibold text-sm mb-2">Teacher as "Small LM"</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Human teachers = small language models</li>
                  <li>• Built from decades of language exposure</li>
                  <li>• AI can now polish writing & analyze texts</li>
                  <li>• So what's the teacher's new role?</li>
                </ul>
              </div>
            </div>

            {/* Slide 2: Human + AI Collaboration */}
            <div className="rounded-lg overflow-hidden border bg-card">
              <img src={slideCollab} alt="Human AI Collaboration" className="w-full h-32 object-cover" />
              <div className="p-3">
                <h4 className="font-semibold text-sm mb-2">Human + AI Partnership</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Work together, not compete</li>
                  <li>• Learn AI techniques you don't know yet</li>
                  <li>• Small group meetings (1 hr each)</li>
                  <li>• Please show up — I want to know you!</li>
                </ul>
              </div>
            </div>

            {/* Slide 3: Nature Career Article */}
            <div className="rounded-lg overflow-hidden border bg-card">
              <img src={slideLiterature} alt="Literature Management" className="w-full h-32 object-cover" />
              <div className="p-3">
                <h4 className="font-semibold text-sm mb-2">Nature Column (2019) Revisited</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• <strong>Manage literature</strong> — Zotero, Mendeley</li>
                  <li>• <strong>Consult teachers</strong> → Train AI to teach</li>
                  <li>• <strong>Learn from texts</strong> — "textual mentors"</li>
                  <li>• Use API, not copy-paste to ChatGPT</li>
                </ul>
                <a href="#" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline">
                  <ExternalLink className="h-3 w-3" /> Read the article
                </a>
              </div>
            </div>

            {/* Slide 4: Looking Ahead */}
            <div className="rounded-lg overflow-hidden border bg-card">
              <img src={slideFuture} alt="Future of Teaching" className="w-full h-32 object-cover" />
              <div className="p-3">
                <h4 className="font-semibold text-sm mb-2">Looking Ahead</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Am I losing my job? Probably not me...</li>
                  <li>• But some colleagues? Not so sure</li>
                  <li>• Focus: human + AI working together</li>
                  <li>• Make your academic journey effective</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Discussion Prompt */}
          <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-l-primary mt-4">
            <h4 className="font-semibold text-sm mb-1">💭 Quick Reflection</h4>
            <p className="text-xs text-muted-foreground">
              How do you manage your literature? Zotero, Mendeley, or just folders? Let's discuss how AI might change your workflow.
            </p>
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
