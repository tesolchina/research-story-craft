import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Key, BookOpen, GraduationCap, Users, Mic, MessageSquare, Presentation, ChevronRight, Eye, EyeOff, Loader2, Check } from "lucide-react";
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
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { toast } from "sonner";

const API_KEY_STORAGE_KEY = "hkbu-genai-api-key";

const weeklySchedule = [
  {
    id: "week1",
    weeks: "Week 1",
    title: "Introduction to the Course",
    icon: BookOpen,
    path: "/mccp/week1",
  },
  {
    id: "weeks2-4",
    weeks: "Weeks 2-4",
    title: "Small Group Meetings",
    icon: Users,
    path: "/mccp/weeks2-4",
  },
  {
    id: "weeks5-6",
    weeks: "Weeks 5-6",
    title: "Oral Presentation: Research Paper",
    icon: Mic,
    path: "/mccp/weeks5-6",
  },
  {
    id: "weeks7-9",
    weeks: "Weeks 7-9",
    title: "Small Group Meetings",
    icon: Users,
    path: "/mccp/weeks7-9",
  },
  {
    id: "week10",
    weeks: "Week 10",
    title: "Oral Presentation: Poster",
    icon: Presentation,
    path: "/mccp/week10",
  },
  {
    id: "weeks11-12",
    weeks: "Weeks 11-12",
    title: "Individual Consultations",
    icon: MessageSquare,
    path: "/mccp/weeks11-12",
  },
  {
    id: "week13",
    weeks: "Week 13",
    title: "Oral Presentation: 3MT",
    icon: GraduationCap,
    path: "/mccp/week13",
  },
];

const sidebarItems = [
  { id: "schedule", title: "Weekly Schedule", icon: Calendar },
  { id: "api-key", title: "API Key Setup", icon: Key },
  { id: "resources", title: "Resources", icon: BookOpen },
];

const MCCP6020 = () => {
  const [activeSection, setActiveSection] = useState("schedule");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState<boolean | null>(null);

  // Load API key from localStorage on mount
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
      case "schedule":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">13-Week Course Schedule</h2>
              <p className="text-muted-foreground">Spring 2026 • Advanced English for Academic Purposes</p>
            </div>

            <div className="space-y-3">
              {weeklySchedule.map((week) => (
                <Link key={week.id} to={week.path}>
                  <Card className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <week.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              {week.weeks}
                            </p>
                            <p className="font-medium">{week.title}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
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
                  <p>
                    <strong>How to get your API key:</strong>
                  </p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Visit the HKBU Gen AI Portal</li>
                    <li>Log in with your HKBU credentials</li>
                    <li>Navigate to API Keys section</li>
                    <li>Generate or copy your existing API key</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What is an API Key?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  An <strong>API key</strong> is like a personal password that identifies you when using AI services.
                  HKBU provides each student with a unique key to access the university's Gen AI platform.
                </p>
                <p>
                  <strong>Why do you need it?</strong> The API key allows you to use AI tools for language learning
                  while ensuring your usage is tracked under your student account's quota.
                </p>
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
                    <p className="text-sm text-muted-foreground">
                      Access AI-powered tools for essay revision and language learning
                    </p>
                  </a>
                  <a
                    href="/ai-workshops/resources"
                    className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="font-medium mb-1">AI Resources</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore additional AI tools and resources for academic writing
                    </p>
                  </a>
                  <a href="/search" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium mb-1">AI Search</h3>
                    <p className="text-sm text-muted-foreground">Search academic topics using AI-powered search</p>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About This Course</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  <strong>MCCP 6020: Advanced English for Academic Purposes</strong> is designed to help postgraduate
                  students develop the language skills needed for success in academic contexts.
                </p>
                <p>
                  This course integrates AI tools to enhance the learning experience while maintaining a focus on
                  developing authentic academic communication skills.
                </p>
                <p className="text-sm">
                  <strong>Instructor:</strong> Dr. Simon Wang
                  <br />
                  <strong>Term:</strong> Spring 2026
                </p>
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
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveSection(item.id)}
                        isActive={activeSection === item.id}
                        className="w-full"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
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
