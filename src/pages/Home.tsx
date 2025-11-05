import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquare, Sparkles, Users, Calendar, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              English for Research Publication Purposes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert support for research students at Hong Kong Baptist University
            </p>
            <Link to="/registration">
              <Button size="lg" className="text-lg px-8">
                Register Today
              </Button>
            </Link>
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

          {/* Team Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-foreground">Our Team</h2>
            
            {/* Coordinator */}
            <Card className="bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-2xl">Program Coordinator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <a 
                    href="https://lc.hkbu.edu.hk/main/simonwang/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xl font-semibold hover:underline inline-block"
                  >
                    Dr Simon Wang
                  </a>
                  <p className="opacity-90">
                    Lecturer in English and Innovation Officer at the Language Centre
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tutors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Tutors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <a 
                      href="https://lc.hkbu.edu.hk/main/staff-dr-emma-zhang/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline inline-block"
                    >
                      Dr Emma Zhang
                    </a>
                  </div>
                  <div className="space-y-1">
                    <a 
                      href="https://lc.hkbu.edu.hk/main/mablechan/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline inline-block"
                    >
                      Dr Mable Chan
                    </a>
                  </div>
                  <div className="space-y-1">
                    <a 
                      href="https://lc.hkbu.edu.hk/main/meilin22/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline inline-block"
                    >
                      Dr Meilin Chen
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teaching Assistant */}
            <Card className="bg-accent/10">
              <CardHeader>
                <CardTitle className="text-xl">Teaching Assistant & Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Ms Charlene Cheung</p>
                    <a 
                      href="mailto:chycharlene@hkbu.edu.hk"
                      className="text-primary hover:underline"
                    >
                      chycharlene@hkbu.edu.hk
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Send enquiries to Charlene</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Upcoming Workshops */}
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl">Upcoming Workshops & Events</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/5 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">AI Workshop for Biology Department</h3>
                    <p className="text-muted-foreground mt-2">
                      Specialized workshop on using AI tools for biological research writing
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-2xl font-bold text-primary">7 Nov 2025</p>
                    <Link to="/ai-workshops/biology0711">
                      <Button variant="outline" className="mt-2">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
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
