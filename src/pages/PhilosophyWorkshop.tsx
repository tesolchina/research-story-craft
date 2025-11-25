import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, User, ExternalLink, AlertCircle, Laptop, Github, QrCode, Presentation, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PhilosophyWorkshop = () => {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent('https://erpp.hkbu.me/ai-workshops/philosophy')}`;
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <Link to="/ai-workshops">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to AI Workshops
            </Button>
          </Link>

          {/* QR Code Section - Collapsible */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="qr-code" className="border-2 border-primary/20 rounded-lg">
              <AccordionTrigger className="px-6 hover:no-underline">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-primary" />
                  <CardTitle className="text-xl">Share This Workshop</CardTitle>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="p-6 pt-0">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 space-y-4">
                      <p className="text-foreground/90">
                        Scan the QR code to access this workshop page:
                      </p>
                      <p className="text-sm text-muted-foreground break-all">
                        <a href="https://erpp.hkbu.me/ai-workshops/philosophy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                          https://erpp.hkbu.me/ai-workshops/philosophy
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <img 
                        src={qrCodeUrl}
                        alt="QR Code - Scan to access workshop page" 
                        className="w-64 h-64 rounded-lg border-2 border-primary/20 shadow-lg"
                      />
                      <p className="text-center text-sm text-muted-foreground mt-2">
                        Scan to access this page
                      </p>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Invitation Only Notice */}
          <Card className="border-2 border-primary/50 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl">Invitation Only</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 font-medium">
                This workshop is by invitation only — open to PhD students and faculty members of the Department of Religion and Philosophy only.
              </p>
            </CardContent>
          </Card>

          <section className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              AI Agents for Philosophy & Religious Studies Research
            </h1>
            <p className="text-xl text-muted-foreground">
              Enhancing Scholarly Analysis and Literature Review with AI
            </p>
          </section>

          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="text-2xl">Workshop Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                This workshop explores how AI agents can enhance research in Philosophy and Religious Studies by automating literature analysis, assisting with textual interpretation, and streamlining academic writing workflows. Recent developments show that AI agents have significant potential to transform humanities research by processing vast bodies of literature and generating structured insights (Gibney, 2025).
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Participants will learn to leverage IDE-embedded AI agents to conduct systematic literature reviews, analyze philosophical texts, compare religious traditions, and generate well-structured academic arguments. The session demonstrates how AI can serve as a research assistant that reads scholarly works, extracts key concepts, and helps synthesize complex ideas within a unified environment.
              </p>
            </CardContent>
          </Card>

          {/* Workshop Slides - Collapsible */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="slides" className="border-2 border-primary/20 rounded-lg">
              <AccordionTrigger className="px-6 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Presentation className="w-5 h-5 text-primary" />
                  <CardTitle className="text-xl">Workshop Slides</CardTitle>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="p-6 pt-0">
                  <div className="w-full overflow-hidden rounded-lg border-2 border-primary/20 bg-background">
                    <div className="relative w-full" style={{ paddingBottom: '59.27%', minHeight: '400px' }}>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-muted/20">
                        <p className="text-muted-foreground">Slides will be available soon</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Step-by-step Guidance - Collapsible */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="guidance" className="border-2 border-primary/20 rounded-lg">
              <AccordionTrigger className="px-6 hover:no-underline">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <CardTitle className="text-xl">Step-by-step Guidance</CardTitle>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="p-6 pt-0 space-y-4">
                  <div className="w-full overflow-hidden rounded-lg border-2 border-primary/20 bg-background">
                    <div className="relative w-full" style={{ minHeight: '300px' }}>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-muted/20">
                        <p className="text-muted-foreground">Guidance document will be available soon</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="text-2xl">References</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3 text-sm leading-relaxed">
                <p className="text-foreground/90">
                  <strong>1.</strong> Gibney, E. (2025). How AI agents will change research: a scientist's guide. <em>Nature</em>. News Explainer. 3 October 2025. <a href="https://www.nature.com/articles/d41586-025-03246-7" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1"><ExternalLink className="w-3 h-3" />https://www.nature.com/articles/d41586-025-03246-7</a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl">About the Speaker</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <p className="text-lg font-semibold text-foreground">Dr Simon Wang</p>
                <p className="text-foreground/90 leading-relaxed">
                  Dr Simon Wang is a lecturer in English and Innovation Officer at the Language Centre, HKBU. He coordinates the English for Research Publication Purposes programme, as part of the Research Student Development Framework of the HKBU Graduate School. He is committed to promoting and evolving the state-of-the-art AI technologies for empowering academic research and writing.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/5 border-2 border-accent/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Laptop className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl">Important Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Laptop className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-foreground/90">
                    <strong>Please bring your own notebook computer</strong> to participate in hands-on activities.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Github className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-foreground/90">
                      <strong>Sign up for a GitHub account</strong> using your HKBU email address before the workshop. This is essential for the IDE-embedded AI agent activities.
                    </p>
                    <p className="text-foreground/90">
                      <strong>Apply for GitHub Education benefits:</strong> As a student, you qualify for free access to professional developer tools through GitHub Education. We strongly encourage you to apply for these benefits before the workshop to maximize your learning experience. 
                      <a 
                        href="https://docs.github.com/en/education/about-github-education/github-education-for-students/apply-to-github-education-as-a-student" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:underline inline-flex items-center gap-1 ml-1"
                      >
                        Learn more and apply here
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>

      <footer className="bg-gradient-header text-primary-foreground py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="opacity-90">
            © {new Date().getFullYear()} Language Centre, Hong Kong Baptist University
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PhilosophyWorkshop;
