import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Book, ExternalLink, Lightbulb, VideoIcon, FileCheck } from "lucide-react";
import Navigation from "@/components/Navigation";

const AIResources = () => {
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

          <section className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
                <Book className="w-10 h-10 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              AI Resources for Research Writing
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive guides and tools to enhance your research with AI
            </p>
          </section>

          <Card className="border-2 border-accent/20">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="text-2xl">Resource Library Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-foreground/90">
                Our curated collection of AI resources provides you with everything you need to integrate 
                artificial intelligence effectively into your research writing process. From beginner guides 
                to advanced techniques, explore tools and tutorials designed specifically for academic researchers.
              </p>
            </CardContent>
          </Card>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-foreground">Resource Categories</h2>
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Getting Started with AI</CardTitle>
                        <CardDescription>Essential guides for beginners</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    Introduction to AI tools, basic prompting techniques, and ethical considerations 
                    for using AI in academic research.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li>Introduction to ChatGPT and Claude for research</li>
                    <li>Effective prompt engineering basics</li>
                    <li>Academic integrity and AI usage guidelines</li>
                    <li>Choosing the right AI tool for your task</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <VideoIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Video Tutorials</CardTitle>
                        <CardDescription>Step-by-step visual guides</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    Watch our comprehensive video series covering various aspects of AI-assisted research writing.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li>Literature review with AI assistants</li>
                    <li>Data analysis and visualization techniques</li>
                    <li>Manuscript drafting workflows</li>
                    <li>Citation management automation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileCheck className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Best Practices & Templates</CardTitle>
                        <CardDescription>Proven strategies and frameworks</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    Download templates and checklists to streamline your AI-assisted research workflow.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li>Research writing prompt templates</li>
                    <li>AI usage documentation forms</li>
                    <li>Quality control checklists</li>
                    <li>Peer review preparation guides</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <Card className="bg-accent/5 border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <ExternalLink className="mr-2 w-6 h-6" />
                Recommended AI Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 p-4 bg-background rounded-lg border">
                    <h3 className="font-semibold">Writing & Editing</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• ChatGPT / Claude</li>
                      <li>• Grammarly AI</li>
                      <li>• QuillBot</li>
                      <li>• Wordtune</li>
                    </ul>
                  </div>
                  <div className="space-y-2 p-4 bg-background rounded-lg border">
                    <h3 className="font-semibold">Research & Analysis</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Consensus</li>
                      <li>• Elicit</li>
                      <li>• Scite.ai</li>
                      <li>• ResearchRabbit</li>
                    </ul>
                  </div>
                  <div className="space-y-2 p-4 bg-background rounded-lg border">
                    <h3 className="font-semibold">Citation Management</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Zotero with AI plugins</li>
                      <li>• Mendeley</li>
                      <li>• Paperpile</li>
                      <li>• EndNote with AI features</li>
                    </ul>
                  </div>
                  <div className="space-y-2 p-4 bg-background rounded-lg border">
                    <h3 className="font-semibold">Data Visualization</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• ChatGPT Code Interpreter</li>
                      <li>• DataWrapper</li>
                      <li>• Tableau with AI</li>
                      <li>• Julius AI</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Stay Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="opacity-90 mb-4">
                The field of AI is rapidly evolving. We regularly update our resources to include the 
                latest tools and techniques. Check back frequently or contact us for personalized guidance.
              </p>
              <Link to="/registration">
                <Button variant="secondary" size="lg" className="w-full md:w-auto">
                  Get Personalized Support
                </Button>
              </Link>
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

export default AIResources;
