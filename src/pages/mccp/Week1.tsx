import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  BookOpen, 
  GraduationCap, 
  ClipboardList, 
  Target, 
  Bot, 
  Monitor, 
  Github, 
  Code,
  ChevronDown,
  FileText,
  Scale,
  BookMarked,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import AIChatDialog from "@/components/mccp/AIChatDialog";

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
            <h1 className="text-2xl font-bold">Course Introduction & AI Setup</h1>
          </div>
        </div>

        {/* Module 1: Course Overview */}
        <CollapsibleModule 
          title="Course Overview" 
          emoji="📚"
          icon={<BookOpen className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
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
          </div>
        </CollapsibleModule>

        {/* Module 2: Course Information */}
        <CollapsibleModule 
          title="Course Information" 
          emoji="📋"
        >
          <div className="grid gap-6 md:grid-cols-2">
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
          </div>
        </CollapsibleModule>

        {/* Module 3: Aims & Objectives */}
        <CollapsibleModule 
          title="Aims & Objectives" 
          emoji="🎯"
          icon={<Target className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
            <p>
              The course aims to prepare students for active participation in their research communities by developing 
              their academic presentation and writing skills, particularly for PhD research.
            </p>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <h4 className="font-bold mb-2">Key Objectives:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                <li>Develop effective academic presentation techniques</li>
                <li>Master thesis and research article writing conventions</li>
                <li>Build academic vocabulary and linguistic repertoire</li>
                <li>Learn proper citation and documentation practices</li>
                <li>Integrate AI tools strategically in academic work</li>
              </ul>
            </div>
          </div>
        </CollapsibleModule>

        {/* Module 4: Learning Outcomes (CILOs) */}
        <CollapsibleModule 
          title="Course Intended Learning Outcomes (CILOs)" 
          emoji="🎓"
          icon={<GraduationCap className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
            {ciloData.map((cilo, index) => (
              <div key={cilo.id} className="p-4 border-l-4 border-l-primary bg-muted/30 rounded-r-lg">
                <h4 className="font-bold text-primary mb-2">{cilo.id}</h4>
                <p className="text-sm text-muted-foreground">{cilo.description}</p>
              </div>
            ))}
          </div>
        </CollapsibleModule>

        {/* Module 5: Assessment Structure */}
        <CollapsibleModule 
          title="Assessment Methods" 
          emoji="📊"
          icon={<ClipboardList className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
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
            <AIChatDialog
              sectionId="assessment"
              sectionTitle="Assessment Methods"
              context="Four assessments: Oral Presentation 1 (20%) - 8-minute article presentation; Oral Presentation 2 (20%) - Poster; Writing Assignment (40%) - Intro & Lit Review; Oral Presentation 3 (20%) - 3MT."
            />
          </div>
        </CollapsibleModule>

        {/* Module 6: Course Policies */}
        <CollapsibleModule 
          title="Course Policies" 
          emoji="⚖️"
          icon={<Scale className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <h4 className="font-bold text-destructive mb-2">Late Submission Policy</h4>
              <p className="text-sm text-muted-foreground">
                Assignments submitted late will incur a penalty of 10% per day. 
                Extensions must be requested before the deadline with valid documentation.
              </p>
            </div>
            <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
              <h4 className="font-bold mb-2">Academic Integrity</h4>
              <p className="text-sm text-muted-foreground">
                All work must be original. Plagiarism detection tools (including AI detection) will be used. 
                Proper citation is required for all sources, including AI-generated content.
              </p>
            </div>
          </div>
        </CollapsibleModule>

        {/* Module 7: Recommended Readings */}
        <CollapsibleModule 
          title="Textbooks & Recommended Readings" 
          emoji="📖"
          icon={<BookMarked className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-bold mb-2">Core Resources</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Swales, J. M., & Feak, C. B. (2012). <em>Academic Writing for Graduate Students</em></li>
                <li>• Academic Phrasebank (Manchester University)</li>
                <li>• Course materials provided on this platform</li>
              </ul>
            </div>
            <Button variant="outline" asChild className="w-full">
              <a href="https://www.phrasebank.manchester.ac.uk/" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Visit Academic Phrasebank
              </a>
            </Button>
          </div>
        </CollapsibleModule>

        {/* Module 8: AI Agent in IDE */}
        <CollapsibleModule 
          title="AI Agent in IDE" 
          emoji="🤖"
          icon={<Bot className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Using an AI Agent in an IDE is fundamentally different from a simple chat interface. 
              While a chat is a back-and-forth conversation, an <strong>Agent</strong> has direct access to your 
              <strong> files and folders</strong>.
            </p>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <h4 className="font-bold mb-2">Why this matters:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>The agent understands the context of your entire project.</li>
                <li>It can perform complex tasks across multiple files.</li>
                <li>It can automate repetitive structural changes in your documents.</li>
              </ul>
            </div>
          </div>
        </CollapsibleModule>

        {/* Module 9: Recommended IDEs */}
        <CollapsibleModule 
          title="Recommended AI IDEs" 
          emoji="💻"
          icon={<Monitor className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              For this course, we recommend using an IDE designed for AI-first development:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-1">Cursor</h4>
                <p className="text-xs text-muted-foreground mb-3">Built on VS Code, optimized for Agentic workflows.</p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer">Download Cursor</a>
                </Button>
              </div>
              <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-1">Windsurf</h4>
                <p className="text-xs text-muted-foreground mb-3">Next-gen AI IDE by Codeium.</p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href="https://codeium.com/windsurf" target="_blank" rel="noopener noreferrer">Try Windsurf</a>
                </Button>
              </div>
            </div>
          </div>
        </CollapsibleModule>

        {/* Module 10: Lab 0 - Get Materials */}
        <CollapsibleModule 
          title="Lab 0: Get the Materials" 
          emoji="🔧"
          icon={<Github className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <h4 className="font-bold mb-2">Workflow for Students:</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                <li><strong>Fork</strong> the repository on GitHub.</li>
                <li><strong>Clone</strong> your forked version to your local machine.</li>
                <li><strong>Contribute:</strong> Later, you can sync with the upstream repo or issue Pull Requests to contribute your improvements.</li>
              </ol>
            </div>
            
            <p className="text-muted-foreground">
              Clone the course repository (or your fork) to get started:
            </p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm relative group">
              <code className="block">git clone https://github.com/tesolchina/mccpSpring2026.git</code>
            </div>
            <div className="p-4 border-l-4 border-primary bg-muted/30">
              <h4 className="font-bold mb-1">Next Step:</h4>
              <p className="text-sm text-muted-foreground">
                Open the folder in your AI IDE and navigate to <code>AgentLabs/Lab0</code>.
              </p>
            </div>
            <Button asChild className="w-full">
              <a href="https://github.com/tesolchina/mccpSpring2026" target="_blank" rel="noopener noreferrer">
                View Repository on GitHub <Code className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CollapsibleModule>

        {/* Module 11: AI-Assisted Learning Setup */}
        <CollapsibleModule 
          title="AI-Assisted Learning Setup" 
          emoji="✨"
          icon={<Sparkles className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This course integrates AI tools to enhance your learning experience. 
              You'll need to set up access to AI services for various activities.
            </p>
            <div className="p-4 border rounded-lg">
              <h4 className="font-bold mb-2">Setup Steps:</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                <li>Obtain your HKBU Gen AI API key from the university portal</li>
                <li>Configure your API key in the course platform</li>
                <li>Install recommended AI IDE (Cursor or Windsurf)</li>
                <li>Complete Lab 0 to verify your setup</li>
              </ol>
            </div>
            <Button asChild className="w-full">
              <Link to="/mccp/api-key">
                Configure API Key <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CollapsibleModule>
      </div>
    </div>
  );
};

export default Week1;
