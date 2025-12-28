import { useState } from "react";
import { Calendar, Key, FileText, BookOpen, GraduationCap, MessageSquare, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
import { useToast } from "@/hooks/use-toast";

const weeklySchedule = [
  { week: 1, topic: "Course Introduction & AI in Academic Writing", description: "Overview of course objectives, introduction to AI-assisted language learning, and setting up tools." },
  { week: 2, topic: "Academic Reading Strategies with AI", description: "Using AI to analyze complex academic texts, identifying main arguments, and summarizing research papers." },
  { week: 3, topic: "Critical Analysis & Source Evaluation", description: "Evaluating sources for credibility, using AI to cross-reference claims, and developing critical thinking skills." },
  { week: 4, topic: "Academic Vocabulary Development", description: "Building discipline-specific vocabulary, using AI for contextual word learning, and collocations." },
  { week: 5, topic: "Paragraph Structure & Cohesion", description: "Constructing coherent paragraphs, using transitions effectively, and AI-assisted revision." },
  { week: 6, topic: "Literature Review Writing", description: "Synthesizing sources, identifying research gaps, and structuring literature reviews with AI support." },
  { week: 7, topic: "Research Methodology Description", description: "Writing methodology sections, describing research processes, and using appropriate academic register." },
  { week: 8, topic: "Data Presentation & Analysis", description: "Describing results, using AI to interpret data visualizations, and academic hedging language." },
  { week: 9, topic: "Argumentation & Persuasion", description: "Building logical arguments, counter-arguments, and persuasive academic writing techniques." },
  { week: 10, topic: "Academic Presentation Skills", description: "Oral presentation techniques, using AI for speech preparation, and handling Q&A sessions." },
  { week: 11, topic: "Revision & Editing Strategies", description: "Self-editing techniques, peer review processes, and using AI for grammar and style improvement." },
  { week: 12, topic: "Citation & Academic Integrity", description: "Proper citation practices, avoiding plagiarism, and ethical use of AI in academic work." },
  { week: 13, topic: "Course Review & Portfolio Submission", description: "Final review, portfolio preparation, and reflection on learning journey." },
];

const sidebarItems = [
  { id: "schedule", title: "Weekly Schedule", icon: Calendar },
  { id: "api-key", title: "API Key Setup", icon: Key },
  { id: "export", title: "Export for Moodle", icon: FileText },
  { id: "resources", title: "Resources", icon: BookOpen },
];

const MCCP6020 = () => {
  const [activeSection, setActiveSection] = useState("schedule");
  const [apiKey, setApiKey] = useState("");
  const [chatHistory, setChatHistory] = useState("");
  const { toast } = useToast();

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("hkbu-genai-api-key", apiKey);
      toast({
        title: "API Key Saved",
        description: "Your API key has been saved locally in your browser.",
      });
    }
  };

  const generateMoodleHTML = () => {
    const simpleHTML = `<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
<h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">AI Chat Session Output</h2>
<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0;">
${chatHistory.split('\n').map(line => `<p style="margin: 8px 0; line-height: 1.6;">${line}</p>`).join('\n')}
</div>
<p style="color: #666; font-size: 12px; margin-top: 20px;">Generated from MCCP 6020 - Advanced EAP Course</p>
</div>`;
    
    navigator.clipboard.writeText(simpleHTML);
    toast({
      title: "HTML Copied!",
      description: "Simple HTML code copied to clipboard. Paste it into Moodle's HTML editor.",
    });
  };

  const downloadHTML = () => {
    const simpleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>AI Chat Output - MCCP 6020</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
<h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">AI Chat Session Output</h2>
<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0;">
${chatHistory.split('\n').map(line => `<p style="margin: 8px 0; line-height: 1.6;">${line}</p>`).join('\n')}
</div>
<p style="color: #666; font-size: 12px; margin-top: 20px;">Generated from MCCP 6020 - Advanced EAP Course</p>
</body>
</html>`;
    
    const blob = new Blob([simpleHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-output.html';
    a.click();
    URL.revokeObjectURL(url);
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
            
            <Accordion type="single" collapsible className="space-y-3">
              {weeklySchedule.map((week) => (
                <AccordionItem key={week.week} value={`week-${week.week}`} className="border rounded-lg px-4 bg-card">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {week.week}
                      </span>
                      <span className="font-medium">{week.topic}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-14 pb-4 text-muted-foreground">
                    {week.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
                  Enter your personal API key to access AI-powered learning tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Enter your HKBU Gen AI API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Your API key is stored locally in your browser and never sent to our servers.
                  </p>
                </div>
                <Button onClick={handleSaveApiKey}>Save API Key</Button>
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
                <p>
                  <strong>How to get your key:</strong> Log in to the HKBU Gen AI platform with your university 
                  credentials and navigate to your account settings to find or generate your API key.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case "export":
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Export Chat History for Moodle
                </CardTitle>
                <CardDescription>
                  Paste your AI chat conversation below to generate Moodle-compatible HTML
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your chat history here...&#10;&#10;Example:&#10;User: What is academic writing?&#10;AI: Academic writing is a formal style of writing..."
                  value={chatHistory}
                  onChange={(e) => setChatHistory(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
                <div className="flex gap-3">
                  <Button onClick={generateMoodleHTML} disabled={!chatHistory.trim()}>
                    <FileText className="h-4 w-4 mr-2" />
                    Copy HTML for Moodle
                  </Button>
                  <Button variant="outline" onClick={downloadHTML} disabled={!chatHistory.trim()}>
                    <Download className="h-4 w-4 mr-2" />
                    Download HTML File
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How to Use in Moodle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <ol className="list-decimal list-inside space-y-2">
                  <li>Paste your chat conversation in the text area above</li>
                  <li>Click "Copy HTML for Moodle" to copy the formatted code</li>
                  <li>In Moodle, open the assignment or forum post editor</li>
                  <li>Switch to HTML mode (usually a "&lt;/&gt;" button)</li>
                  <li>Paste the copied HTML code</li>
                  <li>Switch back to visual mode to see the formatted output</li>
                </ol>
                <p className="text-sm italic mt-4">
                  Note: The HTML uses simple inline styles to ensure compatibility with Moodle's restrictions.
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
                    <p className="text-sm text-muted-foreground">Access AI-powered tools for essay revision and language learning</p>
                  </a>
                  <a href="/ai-workshops/resources" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium mb-1">AI Resources</h3>
                    <p className="text-sm text-muted-foreground">Explore additional AI tools and resources for academic writing</p>
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
                  <strong>MCCP 6020: Advanced English for Academic Purposes</strong> is designed to help 
                  postgraduate students develop the language skills needed for success in academic contexts.
                </p>
                <p>
                  This course integrates AI tools to enhance the learning experience while maintaining 
                  a focus on developing authentic academic communication skills.
                </p>
                <p className="text-sm">
                  <strong>Instructor:</strong> Dr. Simon Wang<br />
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
          
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MCCP6020;
