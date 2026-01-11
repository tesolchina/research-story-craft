import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Key, BookOpen, GraduationCap, Users, Mic, MessageSquare, Presentation, ChevronDown, MessageCircle, UserCheck, ClipboardList, ArrowLeft } from "lucide-react";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const weeklySchedule = [
  { 
    id: "week1", 
    label: "Week 1: Introduction", 
    shortLabel: "Week 1",
    path: "/mccp/week1", 
    icon: BookOpen,
    subItems: [
      { id: "week1-activity1", label: "Activity 1.1: Mapping Learning", shortLabel: "1.1 Mapping", path: "/mccp/week1/activity-1" },
      { id: "week1-activity2", label: "Activity 1.2: Macro Structure", shortLabel: "1.2 Macro", path: "/mccp/week1/activity-2" },
      { id: "week1-activity3", label: "Activity 1.3: Review AI Results", shortLabel: "1.3 AI Review", path: "/mccp/week1/activity-3" },
      { id: "week1-activity4", label: "Activity 1.4: More Activity Ideas", shortLabel: "1.4 More Ideas", path: "/mccp/week1/activity-4" },
      { id: "week1-ai", label: "AI Agent Setup", shortLabel: "AI Setup", path: "/mccp/week1/ai-agent" }
    ]
  },
  { 
    id: "weeks2-4", 
    label: "Weeks 2-4: Group Meetings", 
    shortLabel: "Weeks 2-4",
    path: "/mccp/weeks2-4", 
    icon: Users,
    subItems: [
      { id: "weeks2-4-writing", label: "Writing Materials", shortLabel: "Writing", path: "/mccp/weeks2-4/writing-materials" },
      { id: "weeks2-4-tasks", label: "Pre-Meeting Tasks", shortLabel: "Tasks", path: "/mccp/weeks2-4/tasks" }
    ]
  },
  { id: "weeks5-6", label: "Weeks 5-6: Research Paper Presentation", shortLabel: "Weeks 5-6", path: "/mccp/weeks5-6", icon: Mic },
  { id: "weeks7-9", label: "Weeks 7-9: Group Meetings", shortLabel: "Weeks 7-9", path: "/mccp/weeks7-9", icon: Users },
  { id: "week10", label: "Week 10: Poster Presentation", shortLabel: "Week 10", path: "/mccp/week10", icon: Presentation },
  { id: "weeks11-12", label: "Weeks 11-12: Consultations", shortLabel: "Weeks 11-12", path: "/mccp/weeks11-12", icon: MessageSquare },
  { id: "week13", label: "Week 13: 3MT Presentation", shortLabel: "Week 13", path: "/mccp/week13", icon: GraduationCap },
];

const MCCPLayout = () => {
  const [scheduleOpen, setScheduleOpen] = useState(true);
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r">
          <SidebarContent className={cn(isMobile && "py-2")}>
            <SidebarGroup>
              <SidebarGroupLabel className={cn(
                "flex items-center gap-2 px-4",
                isMobile ? "py-4" : "py-6"
              )}>
                <GraduationCap className={cn(isMobile ? "h-6 w-6" : "h-5 w-5")} />
                <div>
                  <div className={cn("font-bold", isMobile && "text-base")}>MCCP 6020</div>
                  <div className={cn(
                    "text-muted-foreground",
                    isMobile ? "text-sm" : "text-xs"
                  )}>Advanced EAP</div>
                </div>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {/* Back to UPP Home */}
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild size={isMobile ? "lg" : "default"}>
                      <Link to="/" className="text-muted-foreground hover:text-foreground">
                        <ArrowLeft className={cn(isMobile ? "h-5 w-5" : "h-4 w-4")} />
                        <span className={cn(isMobile && "text-base")}>Back to ERPP Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                
                <SidebarMenu>
                  <Collapsible open={scheduleOpen} onOpenChange={setScheduleOpen} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton isActive={location.pathname === "/mccp"} size={isMobile ? "lg" : "default"}>
                          <Home className={cn(isMobile ? "h-5 w-5" : "h-4 w-4")} />
                          <Link to="/mccp" className={cn("flex-1", isMobile && "text-base font-medium")}>Home</Link>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className={cn(isMobile && "py-1")}>
                          {weeklySchedule.map((week) => (
                            <div key={week.id}>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild isActive={location.pathname === week.path}>
                                  <Link 
                                    to={week.path} 
                                    className={cn(
                                      isMobile ? "text-sm py-2.5 font-medium" : "text-xs"
                                    )}
                                  >
                                    {isMobile ? week.shortLabel : week.label}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                              {week.subItems?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.id} className={cn(isMobile ? "ml-3" : "ml-4")}>
                                  <SidebarMenuSubButton asChild isActive={location.pathname === subItem.path}>
                                    <Link 
                                      to={subItem.path} 
                                      className={cn(
                                        "text-muted-foreground",
                                        isMobile ? "text-sm py-2" : "text-xs"
                                      )}
                                    >
                                      ↳ {isMobile ? subItem.shortLabel : subItem.label}
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
                    <SidebarMenuButton asChild isActive={location.pathname === "/mccp/api-key"} size={isMobile ? "lg" : "default"}>
                      <Link to="/mccp/api-key">
                        <Key className={cn(isMobile ? "h-5 w-5" : "h-4 w-4")} />
                        <span className={cn(isMobile && "text-base")}>API Key Setup</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === "/mccp/resources"} size={isMobile ? "lg" : "default"}>
                      <Link to="/mccp/resources">
                        <BookOpen className={cn(isMobile ? "h-5 w-5" : "h-4 w-4")} />
                        <span className={cn(isMobile && "text-base")}>Resources</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === "/mccp/participation"} size={isMobile ? "lg" : "default"}>
                      <Link to="/mccp/participation">
                        <UserCheck className={cn(isMobile ? "h-5 w-5" : "h-4 w-4")} />
                        <span className={cn(isMobile && "text-base")}>Participation</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === "/mccp/feedback"} size={isMobile ? "lg" : "default"}>
                      <Link to="/mccp/feedback">
                        <MessageCircle className={cn(isMobile ? "h-5 w-5" : "h-4 w-4")} />
                        <span className={cn(isMobile && "text-base")}>Feedback</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === "/mccp/assessment"} size={isMobile ? "lg" : "default"}>
                      <Link to="/mccp/assessment">
                        <ClipboardList className={cn(isMobile ? "h-5 w-5" : "h-4 w-4")} />
                        <span className={cn(isMobile && "text-base")}>Assessment</span>
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
