import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  GraduationCap, 
  ClipboardList, 
  Target, 
  Bot,
  ChevronDown,
  MessageCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  QrCode,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Slide images
import slideErpp from "@/assets/opening-slide-0-erpp.png";
import slideSlm from "@/assets/opening-slide-1-slm.png";
import slideCollab from "@/assets/opening-slide-2-collab.png";
import slideLiterature from "@/assets/opening-slide-3-literature.png";
import slideFuture from "@/assets/opening-slide-4-future.png";

// Slide data for carousel
const openingSlides = [
  {
    image: slideErpp,
    title: "ERPP: Do You Still Need Me?",
    bullets: [
      "English for Research Publication Purposes",
      "Years of helping PhD students publish papers",
      "Editing, polishing, structuring manuscripts",
      "But now with AI... do you still need a human editor?"
    ],
    link: { label: "Read: Flowerdew & Wang (2016)", href: "https://www.sciencedirect.com/science/article/abs/pii/S1060374316300091" }
  },
  {
    image: slideSlm,
    title: 'Teacher as "Small LM"',
    bullets: [
      "Human teachers = small language models",
      "Built from decades of language exposure",
      "AI can now polish writing & analyze texts",
      "So what's the teacher's new role?"
    ]
  },
  {
    image: slideCollab,
    title: "Human + AI Partnership",
    bullets: [
      "Work together, not compete",
      "Learn AI techniques you don't know yet",
      "Small group meetings (1 hr each)",
      "Please show up — I want to know you!"
    ]
  },
  {
    image: slideLiterature,
    title: "Nature Career Column (2019) Revisited",
    bullets: [
      "Manage literature — Zotero, Mendeley",
      "Consult teachers → Train AI to teach",
      "Learn from texts — \"textual mentors\"",
      "Use API, not copy-paste to ChatGPT"
    ],
    link: { label: "Read the Nature Career Column", href: "https://www.nature.com/articles/d41586-019-00359-8" }
  },
  {
    image: slideFuture,
    title: "Looking Ahead",
    bullets: [
      "Am I losing my job? Probably not me...",
      "But some colleagues? Not so sure",
      "Focus: human + AI working together",
      "Make your academic journey effective"
    ]
  }
];

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQR, setShowQR] = useState(false);

  const pageUrl = "https://erpp.hkbu.me/mccp/week1";

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % openingSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + openingSlides.length) % openingSlides.length);
  };

  const currentSlideData = openingSlides[currentSlide];
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with QR Toggle */}
        <div className="flex items-center justify-end mb-6">
          {/* QR Code Toggle Button */}
          <div className="relative">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowQR(!showQR)}
              className="flex items-center gap-2"
            >
              {showQR ? <X className="h-4 w-4" /> : <QrCode className="h-4 w-4" />}
              <span className="hidden sm:inline">{showQR ? "Close" : "QR Code"}</span>
            </Button>
            
            {/* QR Code Popup */}
            {showQR && (
              <div className="absolute right-0 top-full mt-2 z-50 bg-white p-4 rounded-lg shadow-lg border min-w-[180px]">
                <div className="flex justify-center">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(pageUrl)}`}
                    alt="QR Code for this page"
                    width={150}
                    height={150}
                    style={{ width: 150, height: 150, minWidth: 150, minHeight: 150 }}
                  />
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2 break-all">
                  {pageUrl}
                </p>
              </div>
            )}
          </div>
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
          {/* Slide Carousel */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden border bg-card">
              <img 
                src={currentSlideData.image} 
                alt={currentSlideData.title} 
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="p-4 md:p-6">
                <h4 className="font-semibold text-lg mb-3">{currentSlideData.title}</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {currentSlideData.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                {currentSlideData.link && (
                  <a 
                    href={currentSlideData.link.href} 
                    className="inline-flex items-center gap-1 text-sm text-primary mt-4 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" /> {currentSlideData.link.label}
                  </a>
                )}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={prevSlide}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              
              {/* Slide Indicators */}
              <div className="flex items-center gap-2">
                {openingSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      idx === currentSlide ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={nextSlide}
                className="flex items-center gap-1"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Slide Counter */}
            <p className="text-center text-xs text-muted-foreground mt-2">
              Slide {currentSlide + 1} of {openingSlides.length}
            </p>
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
