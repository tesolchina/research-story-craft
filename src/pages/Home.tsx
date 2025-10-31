import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, Sparkles, Users } from "lucide-react";
import Navigation from "@/components/Navigation";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              English for Research Publication Purposes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert support for research students at Hong Kong Baptist University
            </p>
          </section>

          {/* About the Service */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">About Our Service</CardTitle>
              <CardDescription className="text-base">
                Dedicated support for research publication excellence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/90">
                The Language Centre at Hong Kong Baptist University offers comprehensive support 
                for research students preparing their work for publication. Our service goes beyond 
                simple manuscript revision to provide strategic guidance on effective research communication.
              </p>
            </CardContent>
          </Card>

          {/* Coordinator Info */}
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Program Coordinator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Dr Simon Wang</h3>
                <p className="opacity-90">
                  Lecturer in English and Innovation Officer at the Language Centre
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Services Grid */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-foreground">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Manuscript Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive revision and refinement of your research manuscripts for publication.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Strategic Storytelling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn how to craft compelling research narratives and organize your papers effectively.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>AI-Powered Writing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Training on effective use of Generative AI tools, including cutting-edge AI agent technology.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>One-on-One Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Up to 8 hours of personalized, individual support tailored to your specific needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Eligibility */}
          <Card className="border-2 border-accent/20 bg-accent/5">
            <CardHeader>
              <CardTitle className="text-2xl">Eligibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground/90">
                All research students at Hong Kong Baptist University are eligible for this service. 
                Each student can receive up to 8 hours of one-on-one consultation and support.
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

export default Home;
