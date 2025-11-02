import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Dna, User, ExternalLink, AlertCircle, Laptop, Github } from "lucide-react";
import Navigation from "@/components/Navigation";

const BiologyWorkshop = () => {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent('https://erpp.hkbu.me/ai-workshops/biology0711')}`;
  
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
                This workshop is by invitation only — open to research students and faculty members of the Department of Biology only.
              </p>
            </CardContent>
          </Card>

          <section className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Dna className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              AI Agents for Bioinformatics Research
            </h1>
            <p className="text-xl text-muted-foreground">
              Automating Literature Analysis and Computational Workflows
            </p>
          </section>

          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="text-2xl">Workshop Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                This workshop demonstrates how IDE-embedded AI agents can streamline bioinformatics research by integrating literature analysis with computational tasks. Recent research shows that AI agents have significant potential to transform scientific discovery by automating complex tasks, analyzing vast datasets, and even writing code (Gibney, 2025).
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Using Badia-i-Mompel et al. (2023) on gene regulatory networks as a case study, participants will learn to automate systematic literature reviews with <code className="bg-background/50 px-2 py-1 rounded">litstudy</code> and perform transcription factor binding analysis using <code className="bg-background/50 px-2 py-1 rounded">motifmatchr</code>. The session shows how AI agents can read scientific papers, extract computational methods, and generate executable code within a unified environment, eliminating context-switching such as copy-pasting between AI chatbots and word processors.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="text-2xl">References</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3 text-sm leading-relaxed">
                <p className="text-foreground/90">
                  <strong>1.</strong> Gibney, E. (2025). How AI agents will change research: a scientist's guide. <em>Nature</em>. News Explainer. 3 October 2025. Correction 7 October 2025. <a href="https://www.nature.com/articles/d41586-025-03246-7" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1"><ExternalLink className="w-3 h-3" />https://www.nature.com/articles/d41586-025-03246-7</a>
                </p>
                <p className="text-foreground/90">
                  <strong>2.</strong> Badia-i-Mompel, P., et al. (2023). Gene regulatory network inference in the era of single-cell multi-omics. <em>Nature Reviews Genetics</em>, 24(12), 739-754. <a href="https://doi.org/10.1038/s41576-023-00586-1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1"><ExternalLink className="w-3 h-3" />https://doi.org/10.1038/s41576-023-00586-1</a>
                </p>
                <p className="text-foreground/90">
                  <strong>3.</strong> Wang, S. (2025) Agent for Biology PhD students <a href="https://github.com/tesolchina/Agent4BioPhD.git" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1"><Github className="w-3 h-3" />https://github.com/tesolchina/Agent4BioPhD.git</a>
                </p>
                <p className="text-foreground/90">
                  <strong>4.</strong> S. Heldens, A. Sclocco, H. Dreuning, B. van Werkhoven, P. Hijma, J. Maassen & R.V. van Nieuwpoort (2022), "litstudy: A Python package for literature reviews", <em>SoftwareX</em> 20
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
                <div className="flex items-start gap-3">
                  <Github className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-foreground/90">
                      <strong>Workshop Repository:</strong> Participants will be asked to fork the workshop repository at the beginning of the session.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-500 rounded text-xs font-medium">
                          Work in Progress
                        </span>
                      </p>
                      <a 
                        href="https://github.com/tesolchina/Agent4BioPhD.git" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:underline inline-flex items-center gap-1 font-medium"
                      >
                        <Github className="w-4 h-4" />
                        https://github.com/tesolchina/Agent4BioPhD.git
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Share This Workshop</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <p className="text-foreground/90">
                    Scan the QR code to access this workshop page:
                  </p>
                  <p className="text-sm text-muted-foreground break-all">
                    <a href="https://erpp.hkbu.me/ai-workshops/biology0711" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                      https://erpp.hkbu.me/ai-workshops/biology0711
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

export default BiologyWorkshop;
