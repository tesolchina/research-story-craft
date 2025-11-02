import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Book } from "lucide-react";
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

          {/* Placeholder Section 1 */}
          <Card className="border-2 border-accent/20">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="text-2xl">[Section Title Placeholder]</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-foreground/90">
                [Content placeholder - to be updated]
              </p>
            </CardContent>
          </Card>

          {/* Placeholder Section 2 */}
          <Card className="border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="text-2xl">[Section Title Placeholder]</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                [Content placeholder - to be updated]
              </p>
            </CardContent>
          </Card>

          {/* Placeholder Section 3 */}
          <Card className="border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="text-2xl">[Section Title Placeholder]</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                [Content placeholder - to be updated]
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

export default AIResources;
