import { Link } from "react-router-dom";
import { ArrowLeft, Users, LogIn, ClipboardList, Gamepad2, MessageSquare, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const agendaItems = [
  {
    number: 1,
    title: "Login with Your Unique ID",
    description: "Use the unique ID provided by your teacher to access the course platform and track your progress.",
    icon: LogIn,
    link: "/mccp/auth",
    linkText: "Go to Login",
    status: "required",
  },
  {
    number: 2,
    title: "Complete the Needs Analysis Questionnaire",
    description: "Share your experience with AI tools and academic writing to help us tailor the course to your needs.",
    icon: ClipboardList,
    link: "/mccp/needs-analysis#questionnaire",
    linkText: "Start Questionnaire",
    status: "required",
  },
  {
    number: 3,
    title: "Test a Learning App",
    description: "Explore an interactive learning application designed to enhance your understanding of academic writing concepts.",
    icon: Gamepad2,
    link: null, // Link to be provided
    linkText: "Coming Soon",
    status: "upcoming",
  },
  {
    number: 4,
    title: "Join the Collaborative Chat",
    description: "Participate in a real-time discussion with your peers and instructor to share ideas and get feedback.",
    icon: MessageSquare,
    link: null, // Link to be provided
    linkText: "Coming Soon",
    status: "upcoming",
  },
];

const Weeks2to4 = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Weeks 2-4</p>
            <h1 className="text-2xl font-bold">Small Group Meetings</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Session Agenda
            </CardTitle>
            <CardDescription>
              Complete the following activities during your group meeting session.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {agendaItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.number}
                  className={`p-4 rounded-lg border transition-colors ${
                    item.status === "upcoming"
                      ? "bg-muted/30 border-dashed"
                      : "bg-card hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          item.status === "upcoming"
                            ? "bg-muted text-muted-foreground"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <span className="font-bold">{item.number}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-semibold">{item.title}</h3>
                        {item.status === "required" && (
                          <Badge variant="secondary" className="text-xs">
                            Required
                          </Badge>
                        )}
                        {item.status === "upcoming" && (
                          <Badge variant="outline" className="text-xs">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      {item.link ? (
                        <Button size="sm" asChild>
                          <Link to={item.link}>
                            {item.linkText}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          {item.linkText}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Quick Links
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3 flex-wrap">
            <Button variant="outline" asChild>
              <Link to="/mccp/dashboard">View Your Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/mccp/weeks2-4/writing-materials">Writing Materials</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weeks2to4;
