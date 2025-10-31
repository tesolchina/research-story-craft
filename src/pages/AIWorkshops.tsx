import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, FlaskConical, Library } from "lucide-react";
import Navigation from "@/components/Navigation";

const AIWorkshops = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              AI Workshops
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn to leverage AI technology for research excellence
            </p>
          </section>

          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="text-2xl">Workshop Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-foreground/90">
                Our AI workshops are designed to help research students harness the power of artificial 
                intelligence in their academic writing and research processes. We provide hands-on training 
                in the latest AI tools and techniques specifically tailored for academic research.
              </p>
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">What You'll Learn:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Effective prompting techniques</li>
                    <li>AI-assisted literature review</li>
                    <li>Research data analysis with AI</li>
                    <li>Automated citation management</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Workshop Features:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Hands-on practical sessions</li>
                    <li>Discipline-specific examples</li>
                    <li>AI agent technology training</li>
                    <li>Best practices and ethics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-foreground">Specialized Workshops</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <FlaskConical className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Biology Research Workshop</CardTitle>
                  <CardDescription>
                    Specialized AI tools for biological sciences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    A dedicated workshop focusing on AI applications in biological research, 
                    including data visualization, statistical analysis, and literature review.
                  </p>
                  <Link to="/ai-workshops/biology">
                    <Button className="w-full" variant="default">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all border-2 hover:border-accent/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-2">
                    <Library className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>AI Resources</CardTitle>
                  <CardDescription>
                    Curated tools and guides for research writing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Access our comprehensive collection of AI resources, tutorials, and best 
                    practices for using AI effectively in your research writing.
                  </p>
                  <Link to="/ai-workshops/resources">
                    <Button className="w-full" variant="default">
                      Explore Resources <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Brain className="mr-2 w-6 h-6" />
                AI Agent Technology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="opacity-90">
                Our workshops include cutting-edge training on AI agent technology, teaching you how 
                to create sophisticated AI workflows that can autonomously assist with complex research 
                tasks. Learn to design multi-step AI processes that enhance your research productivity.
              </p>
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

export default AIWorkshops;
