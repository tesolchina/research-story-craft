import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Key, BookOpen, GraduationCap, Users, Mic, MessageSquare, Presentation, ChevronDown, MessageCircle } from "lucide-react";
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

const weeklySchedule = [
  { 
    id: "week1", 
    label: "Week 1: Introduction", 
    path: "/mccp/week1", 
    icon: BookOpen,
    items: [
      { id: "week1-intro", label: "Introduction to the Course", path: "/mccp/week1/introduction" },
      { id: "week1-ai-ide", label: "AI Agent in IDE", path: "/mccp/week1/ai-agent-ide" }
    ]
  },
  { 
    id: "weeks2-4", 
    label: "Weeks 2-4: Group Meetings", 
    path: "/mccp/weeks2-4", 
    icon: Users,
    items: [
      { id: "weeks2-4-writing", label: "Writing Component (Take-home)", path: "/mccp/weeks2-4/writing" }
    ]
  },
  { id: "weeks5-6", label: "Weeks 5-6: Research Paper Presentation", path: "/mccp/weeks5-6", icon: Mic },
  { id: "weeks7-9", label: "Weeks 7-9: Group Meetings", path: "/mccp/weeks7-9", icon: Users },
  { id: "week10", label: "Week 10: Poster Presentation", path: "/mccp/week10", icon: Presentation },
  { id: "weeks11-12", label: "Weeks 11-12: Consultations", path: "/mccp/weeks11-12", icon: MessageSquare },
  { id: "week13", label: "Week 13: 3MT Presentation", path: "/mccp/week13", icon: GraduationCap },
];

const MCCPLayout = () => {
  const [scheduleOpen, setScheduleOpen] = useState(true);
  const location = useLocation();

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
                        <SidebarMenuButton isActive={location.pathname === "/mccp"}>
                          <Home className="h-4 w-4" />
                          <Link to="/mccp" className="flex-1">Home</Link>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {weeklySchedule.map((week) => (
                            <div key={week.id}>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild isActive={location.pathname === week.path}>
                                  <Link to={week.path} className="text-xs">
                                    {week.label}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                              {/* @ts-ignore */}
                              {week.items?.map((item: any) => (
                                <SidebarMenuSubItem key={item.id}>
                                  <SidebarMenuSubButton asChild className="pl-6 h-8" isActive={location.pathname === item.path}>
                                    <Link to={item.path} className="text-xs text-muted-foreground">
                                      {item.label}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </div>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === "/mccp/api-key"}>
                      <Link to="/mccp/api-key">
                        <Key className="h-4 w-4" />
                        <span>API Key Setup</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === "/mccp/resources"}>
                      <Link to="/mccp/resources">
                        <BookOpen className="h-4 w-4" />
                        <span>Resources</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === "/mccp/feedback"}>
                      <Link to="/mccp/feedback">
                        <MessageCircle className="h-4 w-4" />
                        <span>Course Feedback</span>
                      </Link>
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

          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MCCPLayout;
