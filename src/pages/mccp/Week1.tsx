import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  BookOpen, 
  GraduationCap, 
  ClipboardList, 
  Target, 
  Bot,
  ChevronDown
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
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-bold">AI Agent Setup & Tools</h3>
                  <p className="text-sm text-muted-foreground">Set up your AI IDE and get the course materials</p>
                </div>
              </div>
              <Button asChild>
                <Link to="/mccp/week1/ai-agent">
                  Get Started →
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Week1;
