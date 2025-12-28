import { Link } from "react-router-dom";
import { User, FileText, GraduationCap, Mic, Presentation, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MCCPHome = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">MCCP 6020</h2>
        <p className="text-xl text-muted-foreground">Advanced English for Academic Purposes</p>
        <p className="text-sm text-muted-foreground mt-2">Spring 2026</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-primary" />
              Instructor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Dr. Simon Wang</p>
            <p className="text-sm text-muted-foreground">Language Centre, HKBU</p>
            <a href="https://lc.hkbu.edu.hk/main/simonwang/" className="text-sm text-primary hover:underline mt-2 inline-block" target="_blank" rel="noopener noreferrer">
              View profile →
            </a>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-primary" />
              Syllabus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">Course objectives, materials, and policies</p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/mccp/syllabus">View Syllabus</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Assessment Components
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-primary" />
                <p className="font-medium">Research Paper Presentation</p>
              </div>
              <p className="text-sm text-muted-foreground pl-6">Weeks 5-6 • In-class • 20%</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/mccp/weeks5-6">View Details</Link>
            </Button>
          </div>

          <div className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Presentation className="h-4 w-4 text-primary" />
                <p className="font-medium">Poster Presentation</p>
              </div>
              <p className="text-sm text-muted-foreground pl-6">Week 10 • In-class • 20%</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/mccp/week10">View Details</Link>
            </Button>
          </div>

          <div className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                <p className="font-medium">3MT Presentation</p>
              </div>
              <p className="text-sm text-muted-foreground pl-6">Week 13 • In-class • 20%</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/mccp/week13">View Details</Link>
            </Button>
          </div>

          <div className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <p className="font-medium">Writing Component (Take-home)</p>
              </div>
              <p className="text-sm text-muted-foreground pl-6">Weeks 2-4 • Take-home • 40%</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/mccp/weeks2-4/writing">View Details</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Course Structure
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>This 13-week course combines:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Small group meetings for collaborative learning</li>
            <li>Three oral presentation assessments</li>
            <li>Individual consultations for personalized feedback</li>
            <li>AI-assisted language learning tools</li>
          </ul>
          <p className="mt-3">
            Navigate through the weekly schedule in the sidebar to access materials and activities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MCCPHome;
