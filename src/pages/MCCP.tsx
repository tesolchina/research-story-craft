import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, Calendar, ArrowRight } from "lucide-react";

const MCCP = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">MCCP 6020</h1>
            <p className="text-xl text-muted-foreground">Advanced English for Academic Purposes</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                About the Course
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                MCCP 6020 is designed to help postgraduate students develop advanced English language skills 
                for academic and professional communication. The course focuses on research writing, 
                academic presentations, and effective use of AI tools in academic contexts.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">Target Audience</h3>
                    <p className="text-sm text-muted-foreground">Postgraduate research students</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">Duration</h3>
                    <p className="text-sm text-muted-foreground">13 weeks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Offering</CardTitle>
              <CardDescription>Spring 2026 Semester</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Access the full course materials, syllabus, and weekly content for the Spring 2026 semester.
              </p>
              <Button asChild>
                <Link to="/mccp" className="inline-flex items-center gap-2">
                  Go to Course Page <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MCCP;
