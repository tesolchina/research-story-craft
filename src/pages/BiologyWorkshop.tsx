import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Dna, FileText, BarChart3, Microscope } from "lucide-react";
import Navigation from "@/components/Navigation";

const BiologyWorkshop = () => {
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
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Dna className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              AI Workshop for Biology Research
            </h1>
            <p className="text-xl text-muted-foreground">
              Specialized training for biological sciences researchers
            </p>
          </section>

          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="text-2xl">Workshop Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-foreground/90">
                This specialized workshop is designed specifically for research students in biological 
                sciences. Learn how to leverage AI tools for data analysis, literature review, 
                experimental design, and manuscript preparation in your field.
              </p>
            </CardContent>
          </Card>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-foreground">Workshop Topics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Data Analysis & Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>AI-powered statistical analysis</li>
                    <li>Automated data visualization</li>
                    <li>Pattern recognition in biological data</li>
                    <li>Genomic data interpretation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Literature Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>AI-assisted paper discovery</li>
                    <li>Automatic summarization of research</li>
                    <li>Citation network analysis</li>
                    <li>Gap identification in literature</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <Microscope className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Experimental Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>AI-optimized experimental protocols</li>
                    <li>Sample size calculations</li>
                    <li>Control variable identification</li>
                    <li>Hypothesis generation support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Manuscript Preparation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>AI-enhanced writing support</li>
                    <li>Methods section generation</li>
                    <li>Results interpretation assistance</li>
                    <li>Journal selection guidance</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <Card className="bg-accent/5 border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="text-2xl">Workshop Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Format:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Interactive hands-on sessions</li>
                    <li>Real biological data examples</li>
                    <li>Small group discussions</li>
                    <li>Individual practice time</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Requirements:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Basic biology research background</li>
                    <li>Laptop with internet connection</li>
                    <li>Sample research data (optional)</li>
                    <li>No prior AI experience needed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Join?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="opacity-90 mb-4">
                Register for our Biology AI Workshop and discover how artificial intelligence can 
                accelerate your research and enhance your publications.
              </p>
              <Link to="/registration">
                <Button variant="secondary" size="lg" className="w-full md:w-auto">
                  Register Now
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

export default BiologyWorkshop;
