import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Key, BookOpen, GraduationCap, Users, Mic, MessageSquare, Presentation, Eye, EyeOff, Loader2, Check, Calendar, User, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

const API_KEY_STORAGE_KEY = "hkbu-genai-api-key";

const weeklySchedule = [
  { id: "week1", label: "Week 1: Introduction", path: "/mccp/week1", icon: BookOpen },
  { id: "weeks2-4", label: "Weeks 2-4: Group Meetings", path: "/mccp/weeks2-4", icon: Users },
  { id: "weeks5-6", label: "Weeks 5-6: Research Paper", path: "/mccp/weeks5-6", icon: Mic },
  { id: "weeks7-9", label: "Weeks 7-9: Group Meetings", path: "/mccp/weeks7-9", icon: Users },
  { id: "week10", label: "Week 10: Poster", path: "/mccp/week10", icon: Presentation },
  { id: "weeks11-12", label: "Weeks 11-12: Consultations", path: "/mccp/weeks11-12", icon: MessageSquare },
  { id: "week13", label: "Week 13: 3MT", path: "/mccp/week13", icon: GraduationCap },
];

const MCCP6020 = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState<boolean | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(true);

  useEffect(() => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
      setIsKeyValid(true);
    }
  }, []);

  const validateApiKey = async (key: string) => {
    if (!key.trim()) {
      toast.error("Please enter an API key");
      return;
    }

    setIsValidating(true);

    try {
      const response = await fetch(
        "https://genai.hkbu.edu.hk/general/rest/deployments/gpt-4o-mini/chat/completions?api-version=2024-02-15-preview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": key,
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: "Hi" }],
            max_tokens: 5,
          }),
        }
      );

      if (response.ok) {
        localStorage.setItem(API_KEY_STORAGE_KEY, key);
        setIsKeyValid(true);
        toast.success("API key validated and saved!");
      } else {
        setIsKeyValid(false);
        toast.error("Invalid API key. Please check and try again.");
      }
    } catch (error) {
      setIsKeyValid(false);
      toast.error("Failed to validate API key. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    setApiKey("");
    setIsKeyValid(null);
    toast.success("API key cleared");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "home":
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
                  <Clock className="h-5 w-5 text-primary" />
                  Key Tasks & Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Mic className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Research Paper Presentation</p>
                      <p className="text-sm text-muted-foreground">Weeks 5-6</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Presentation className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Poster Presentation</p>
                      <p className="text-sm text-muted-foreground">Week 10</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">3MT Presentation</p>
                      <p className="text-sm text-muted-foreground">Week 13</p>
                    </div>
                  </div>
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

      case "api-key":
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  HKBU Gen AI API Key
                </CardTitle>
                <CardDescription>
                  Enter your API key to enable AI-powered learning features. Your key is stored locally in your browser.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      placeholder="Enter your HKBU Gen AI API key"
                      value={apiKey}
                      onChange={(e) => {
                        setApiKey(e.target.value);
                        setIsKeyValid(null);
                      }}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button onClick={() => validateApiKey(apiKey)} disabled={isValidating || !apiKey.trim()}>
                    {isValidating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isKeyValid ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      "Validate"
                    )}
                  </Button>
                </div>

                {isKeyValid && (
                  <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="h-4 w-4" />
                      <span className="text-sm font-medium">API key validated and saved</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={clearApiKey}>
                      Clear
                    </Button>
                  </div>
                )}

                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>How to get your API key:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Visit the HKBU Gen AI Portal</li>
                    <li>Log in with your HKBU credentials</li>
                    <li>Navigate to API Keys section</li>
                    <li>Generate or copy your existing API key</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "resources":
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <a href="/learning-apps" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium mb-1">Learning Apps</h3>
                    <p className="text-sm text-muted-foreground">AI-powered tools for essay revision</p>
                  </a>
                  <a href="/ai-workshops/resources" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium mb-1">AI Resources</h3>
                    <p className="text-sm text-muted-foreground">Additional AI tools for academic writing</p>
                  </a>
                  <a href="/search" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium mb-1">AI Search</h3>
                    <p className="text-sm text-muted-foreground">AI-powered academic search</p>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2 px-4 py-6">
                <GraduationCap className="h-5 w-5" />
                <div>
                  <div className="font-bold">MCCP 6020</div>
                  <div className="text-xs text-muted-foreground">Advanced EAP</div>
                </div>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Collapsible open={scheduleOpen} onOpenChange={setScheduleOpen} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton onClick={() => setActiveSection("home")} isActive={activeSection === "home"}>
                          <Home className="h-4 w-4" />
                          <span>Home</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {weeklySchedule.map((week) => (
                            <SidebarMenuSubItem key={week.id}>
                              <SidebarMenuSubButton asChild>
                                <Link to={week.path} className="text-xs">
                                  {week.label}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection("api-key")} isActive={activeSection === "api-key"}>
                      <Key className="h-4 w-4" />
                      <span>API Key Setup</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection("resources")} isActive={activeSection === "resources"}>
                      <BookOpen className="h-4 w-4" />
                      <span>Resources</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <header className="border-b bg-card px-6 py-4 flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-bold text-primary">MCCP 6020: Advanced EAP</h1>
              <p className="text-sm text-muted-foreground">Dr. Simon Wang • Spring 2026</p>
            </div>
          </header>

          <div className="p-6">{renderContent()}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MCCP6020;
