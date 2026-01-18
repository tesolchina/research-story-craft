import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2, Clock, Eye, GraduationCap, ClipboardList, BookOpen, PenTool, RefreshCw, ExternalLink, ChevronDown, ChevronUp, Download, Bot, LogOut, Users, BarChart3, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { exportSurveyResponsesAsCSV } from "@/utils/exportSurveyData";
import { toast } from "sonner";
import { SurveyDashboard } from "@/components/mccp/surveys/SurveyDashboard";

interface StudentInfo {
  uniqueId: string;
  displayName: string;
  last4Digits: string;
}

interface TaskProgress {
  taskId: string;
  taskType: string;
  completed: boolean;
  score: number | null;
  aiFeedback: string | null;
  answer: unknown;
  updatedAt: string | null;
}

interface ProgressData {
  student_id: string;
  task_id: string;
  task_type: string;
  answer: unknown;
  ai_feedback: string | null;
  is_correct: boolean | null;
  score: number | null;
  updated_at: string;
}

interface CarsCoachSessionData {
  id: string;
  discipline: string;
  chatHistory: { role: string; content: string }[];
  completedAt: string;
  currentPhase: string;
  learningReport?: any;
}

interface SurveyData {
  field_of_study: string;
  ai_frequency: number;
  ai_tools_used: string;
  helpful_stages: string[];
  workflow_description: string;
  ai_wishlist: string;
  created_at: string;
}

interface ChatSessionData {
  sessionId: string;
  topic: string;
  status: string;
  isStudentLed: boolean;
  messageCount: number;
  joinedAt: string;
}

interface StudentSummary {
  pseudonym: string;
  studentId: string;
  uniqueId: string;
  registeredAt: string;
  lastActive: string | null;
  surveyCompleted: boolean;
  surveyData: SurveyData | null;
  carsCoachDone: boolean;
  carsCoachSessions: number;
  carsCoachData: CarsCoachSessionData[];
  chatSessions: ChatSessionData[];
  chatMessageCount: number;
  progress: ProgressData[];
}

// Define all required tasks students need to complete
const ALL_TASKS: { id: string; type: string; label: string; week: string; description: string; link?: string }[] = [
  { 
    id: "needs_analysis_survey", 
    type: "survey", 
    label: "Learning Labs Survey", 
    week: "Pre-course",
    description: "Survey on AI-collaborative academic writing practices and preferences",
    link: "/mccp/learning-labs#questionnaire"
  },
  { 
    id: "cars_coach", 
    type: "coach", 
    label: "CARS Coach Session", 
    week: "Week 1",
    description: "AI-guided learning about the CARS model for research introductions",
    link: "/mccp/learning-labs"
  },
  { 
    id: "collaborative_chat", 
    type: "chat", 
    label: "Collaborative Discussions", 
    week: "Ongoing",
    description: "Participate in AI-assisted group discussions with peers and instructor",
    link: "/mccp/learning-labs#collaborative-chat"
  },
];

type CarsCoachChatMsg = { role?: string; content?: string };

const calculateCarsCoachAccuracyFromChat = (chatHistory: CarsCoachChatMsg[]) => {
  let correctCount = 0;
  let totalQuestions = 0;

  for (let i = 0; i < chatHistory.length; i++) {
    const msg = chatHistory[i];
    if ((msg.role || "") === "assistant" && msg.content) {
      const content = msg.content.toLowerCase();
      const prevWasUser = i > 0 && (chatHistory[i - 1]?.role || "") === "user";
      if (!prevWasUser) continue;

      // Check for correct answer indicators
      const isCorrect = 
        content.includes("correct!") ||
        content.includes("that's correct") ||
        content.includes("you're right") ||
        content.includes("well done") ||
        content.includes("that's right") ||
        content.includes("exactly!") ||
        content.includes("great job") ||
        content.includes("excellent!") ||
        content.includes("perfectly identified") ||
        content.includes("you got it") ||
        content.includes("nice work") ||
        (content.includes("correct") && content.includes("answer"));

      // Check for incorrect answer indicators  
      const isIncorrect =
        content.includes("incorrect") ||
        content.includes("not quite") ||
        content.includes("the correct answer is") ||
        content.includes("the correct answer was") ||
        content.includes("actually, the answer") ||
        content.includes("let me explain") ||
        content.includes("that's not") ||
        content.includes("isn't quite right") ||
        content.includes("wrong");

      if (isCorrect && !isIncorrect) {
        correctCount++;
        totalQuestions++;
      } else if (isIncorrect) {
        totalQuestions++;
      }
    }
  }

  return totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : null;
};

const buildCarsCoachTranscriptText = (chatHistory: CarsCoachChatMsg[]) => {
  const divider = "=".repeat(60);
  const lines: string[] = [divider, "CARS COACH SESSION TRANSCRIPT", divider, ""];
  for (const msg of chatHistory) {
    const role = msg.role === "assistant" ? "CARS Coach" : "Student";
    lines.push(`[${role}]`);
    lines.push(msg.content || "");
    lines.push("");
  }
  lines.push(divider);
  return lines.join("\n");
};

const downloadTextFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  };

  const renderCarsCoachReport = (answer: unknown) => {
    if (!answer || typeof answer !== "object") return null;
    const data = answer as Record<string, any>;

    // Handle multiple sessions if available
    const sessions = data.sessions as any[] | undefined;
    
    if (sessions && sessions.length > 0) {
      return (
        <div className="mt-3 space-y-4">
          <p className="text-sm font-medium text-muted-foreground">
            {sessions.length} CARS Coach Session{sessions.length > 1 ? 's' : ''}
          </p>
          {sessions.map((session, idx) => (
            <div key={session.sessionId || idx} className="p-4 bg-muted/30 rounded-lg text-sm space-y-3 border">
              <div className="flex items-center justify-between">
                <Badge variant={session.completedAt ? "default" : "secondary"}>
                  Session {idx + 1}: {session.discipline}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {session.completedAt 
                    ? new Date(session.completedAt).toLocaleDateString("en-HK")
                    : "In Progress"
                  }
                </span>
              </div>
              
              {renderSingleSession(session)}
            </div>
          ))}
        </div>
      );
    }

    // Fallback for single session (backward compatibility)
    return (
      <div className="mt-3 p-4 bg-muted/30 rounded-lg text-sm space-y-3">
        {renderSingleSession(data)}
      </div>
    );
  };

  const renderSingleSession = (data: Record<string, any>) => {
    const chatHistory = (data.chatHistory as CarsCoachChatMsg[]) || [];
    const accuracy = calculateCarsCoachAccuracyFromChat(chatHistory);
    const lr = data.learningReport as any;

    return (
      <>
        <div>
          <span className="font-medium text-muted-foreground">Discipline:</span>{" "}
          <span>{String(data.discipline || "-")}</span>
        </div>
        {data.completedAt && (
          <div>
            <span className="font-medium text-muted-foreground">Completed:</span>{" "}
            <span>{new Date(String(data.completedAt)).toLocaleString("en-HK")}</span>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Quiz accuracy</p>
            <p className="font-medium">{accuracy !== null ? `${accuracy}%` : "N/A"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Messages</p>
            <p className="font-medium">{chatHistory.length}</p>
          </div>
        </div>

        {lr && (
          <div className="pt-2 border-t space-y-2">
            <p className="font-medium">Learning report</p>
            {Array.isArray(lr.keyTakeaways) && lr.keyTakeaways.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Key takeaways</p>
                <ul className="list-disc pl-5 space-y-1">
                  {lr.keyTakeaways.map((t: string, i: number) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
            {Array.isArray(lr.actionableInsights) && lr.actionableInsights.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Actionable insights</p>
                <ul className="list-disc pl-5 space-y-1">
                  {lr.actionableInsights.map((ins: any, i: number) => (
                    <li key={i}>
                      {String(ins.text || ins.insightText || "")}
                      {ins.category ? (
                        <span className="text-xs text-muted-foreground"> ({String(ins.category)})</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {lr.finalReflection && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Student reflection</p>
                <p className="whitespace-pre-wrap">{String(lr.finalReflection)}</p>
              </div>
            )}
          </div>
        )}

        {/* Download button */}
        <div className="flex gap-2 flex-wrap">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              downloadTextFile(
                buildCarsCoachTranscriptText(chatHistory),
                `CARS_Coach_Transcript_${data.discipline || 'Session'}_${new Date().toISOString().split("T")[0]}.txt`
              )
            }
          >
            <Download className="h-4 w-4 mr-2" /> Download transcript
          </Button>
        </div>

        {/* Chat History Display - Full and Comprehensive */}
        {chatHistory.length > 0 && (
          <div className="border rounded-lg mt-3">
            <div className="p-3 border-b bg-muted/30">
              <span className="font-medium text-sm">Full Chat History ({chatHistory.length} messages)</span>
            </div>
            <div className="p-3 space-y-3 max-h-[500px] overflow-y-auto">
              {chatHistory.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-lg text-sm ${
                    msg.role === 'assistant' 
                      ? 'bg-primary/10 border-l-3 border-primary' 
                      : 'bg-muted ml-6'
                  }`}
                >
                  <p className="font-semibold mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                    {msg.role === 'assistant' ? '🤖 CARS Coach' : '👤 Student Response'}
                  </p>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!lr && chatHistory.length === 0 && (
          <p className="text-xs text-muted-foreground">
            No chat history or learning report available yet.
          </p>
        )}
      </>
    );
  };


// ===== STUDENT DASHBOARD =====
const StudentDashboard = ({ studentInfo, onLogout }: { studentInfo: StudentInfo; onLogout: () => void }) => {
  const [tasks, setTasks] = useState<TaskProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadProgress();
  }, [studentInfo.last4Digits]);

  const loadProgress = async () => {
    setIsLoading(true);
    
    // Query students_progress using last_4_digits
    const { data, error } = await supabase
      .from("students_progress")
      .select("task_id, task_type, score, ai_feedback, answer, updated_at, is_correct")
      .eq("student_id", studentInfo.last4Digits);

    if (error) {
      console.error("Error loading progress:", error);
    }

    // Also check survey_responses table (uses unique_id format like "1989-SW-9Q")
    const uniqueId = localStorage.getItem('mccp_student_id');
    const { data: surveyData } = await supabase
      .from("survey_responses")
      .select("student_id, field_of_study, ai_frequency, ai_tools_used, helpful_stages, workflow_description, ai_wishlist, created_at")
      .eq("student_id", uniqueId || '')
      .maybeSingle();

    // Check CARS Coach sessions - get ALL sessions, not just completed ones
    const { data: carsCoachData } = await supabase
      .from("cars_coach_sessions")
      .select("id, completed_at, discipline, current_phase, chat_history, learning_report, created_at")
      .eq("student_id", uniqueId || '')
      .order("created_at", { ascending: false });

    // Check Collaborative Chat participation
    const { data: chatParticipations } = await supabase
      .from("chat_participants")
      .select(`
        session_id,
        joined_at,
        left_at,
        is_teacher,
        display_name,
        chat_sessions (
          id,
          topic,
          status,
          is_student_led,
          created_at,
          ended_at
        )
      `)
      .eq("student_id", uniqueId || '')
      .order("joined_at", { ascending: false });

    // Get message counts for each chat session
    const chatSessionsWithCounts = await Promise.all(
      (chatParticipations || []).map(async (part: any) => {
        const session = part.chat_sessions;
        if (!session) return null;
        
        const { count } = await supabase
          .from("chat_messages")
          .select("*", { count: "exact", head: true })
          .eq("session_id", session.id)
          .eq("sender_id", uniqueId || '');

        return {
          sessionId: session.id,
          topic: session.topic,
          status: session.status,
          isStudentLed: session.is_student_led,
          createdAt: session.created_at,
          endedAt: session.ended_at,
          joinedAt: part.joined_at,
          messageCount: count || 0
        };
      })
    );
    const validChatSessions = chatSessionsWithCounts.filter(Boolean);

    // Map all tasks with their completion status
    const taskProgress: TaskProgress[] = ALL_TASKS.map((task) => {
      const progress = data?.find((p) => p.task_id === task.id);
      
      // Special handling for survey task - check survey_responses table
      if (task.id === "needs_analysis_survey" && surveyData) {
        return {
          taskId: task.id,
          taskType: task.type,
          completed: true,
          score: null,
          aiFeedback: "Survey completed",
          answer: surveyData as unknown,
          updatedAt: surveyData.created_at,
        };
      }

      // Special handling for CARS Coach - check cars_coach_sessions table
      // Include ALL sessions (completed and in-progress) for comprehensive history
      if (task.id === "cars_coach" && carsCoachData && carsCoachData.length > 0) {
        const completedSessions = carsCoachData.filter((s: any) => s.completed_at);
        const latestSession = carsCoachData[0] as any;
        const isCompleted = completedSessions.length > 0;
        
        return {
          taskId: task.id,
          taskType: task.type,
          completed: isCompleted,
          score: null,
          aiFeedback: isCompleted 
            ? `Completed ${completedSessions.length} session(s)` 
            : `In progress: ${latestSession.discipline}`,
          answer: {
            sessions: carsCoachData.map((session: any) => ({
              sessionId: session.id,
              discipline: session.discipline,
              completedAt: session.completed_at,
              createdAt: session.created_at,
              currentPhase: session.current_phase,
              chatHistory: (session.chat_history as any[]) || [],
              learningReport: session.learning_report ?? null,
            })),
            // Keep backward compatibility
            sessionId: latestSession.id,
            discipline: latestSession.discipline,
            completedAt: latestSession.completed_at,
            currentPhase: latestSession.current_phase,
            chatHistory: (latestSession.chat_history as any[]) || [],
            learningReport: latestSession.learning_report ?? null,
          },
          updatedAt: latestSession.completed_at || latestSession.created_at,
        };
      }

      // Special handling for Collaborative Chat
      if (task.id === "collaborative_chat" && validChatSessions.length > 0) {
        const totalMessages = validChatSessions.reduce((sum: number, s: any) => sum + s.messageCount, 0);
        const activeSessions = validChatSessions.filter((s: any) => s.status === 'active').length;
        const completedSessions = validChatSessions.filter((s: any) => s.status === 'ended').length;
        
        return {
          taskId: task.id,
          taskType: task.type,
          completed: validChatSessions.length > 0,
          score: null,
          aiFeedback: `${validChatSessions.length} session(s), ${totalMessages} messages`,
          answer: {
            sessions: validChatSessions,
            totalSessions: validChatSessions.length,
            activeSessions,
            completedSessions,
            totalMessages
          },
          updatedAt: validChatSessions[0]?.joinedAt || null,
        };
      }
      
      return {
        taskId: task.id,
        taskType: task.type,
        completed: progress ? (task.type === "mc" ? progress.score !== null : !!progress.answer || !!progress.ai_feedback) : false,
        score: progress?.score ?? null,
        aiFeedback: progress?.ai_feedback ?? null,
        answer: progress?.answer ?? null,
        updatedAt: progress?.updated_at ?? null,
      };
    });

    setTasks(taskProgress);
    setIsLoading(false);
  };

  const toggleExpanded = (taskId: string) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const renderSurveyAnswer = (answer: unknown) => {
    if (!answer || typeof answer !== 'object') return null;
    const data = answer as Record<string, unknown>;
    
    return (
      <div className="mt-3 p-4 bg-muted/30 rounded-lg text-sm space-y-3">
        {data.field_of_study && (
          <div>
            <span className="font-medium text-muted-foreground">Discipline:</span>{' '}
            <span>{String(data.field_of_study)}</span>
          </div>
        )}
        {data.ai_frequency !== undefined && data.ai_frequency !== null && (
          <div>
            <span className="font-medium text-muted-foreground">AI Usage Frequency:</span>{' '}
            <span>{String(data.ai_frequency)}/5</span>
          </div>
        )}
        {data.ai_tools_used && (
          <div>
            <span className="font-medium text-muted-foreground">AI Tools Used:</span>
            <pre className="mt-1 text-xs whitespace-pre-wrap bg-background p-2 rounded border">
              {String(data.ai_tools_used)}
            </pre>
          </div>
        )}
        {Array.isArray(data.helpful_stages) && data.helpful_stages.length > 0 && (
          <div>
            <span className="font-medium text-muted-foreground">Helpful Stages:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.helpful_stages.map((stage: string) => (
                <Badge key={stage} variant="secondary" className="text-xs">{stage}</Badge>
              ))}
            </div>
          </div>
        )}
        {data.workflow_description && (
          <div>
            <span className="font-medium text-muted-foreground">Workflow Description:</span>
            <pre className="mt-1 text-xs whitespace-pre-wrap bg-background p-2 rounded border max-h-40 overflow-y-auto">
              {String(data.workflow_description)}
            </pre>
          </div>
        )}
        {data.ai_wishlist && (
          <div>
            <span className="font-medium text-muted-foreground">AI Wishlist:</span>
            <p className="mt-1 text-muted-foreground">{String(data.ai_wishlist)}</p>
          </div>
        )}
      </div>
    );
  };

  const renderChatSessions = (answer: unknown) => {
    if (!answer || typeof answer !== 'object') return null;
    const data = answer as { sessions?: any[]; totalSessions?: number; totalMessages?: number; activeSessions?: number; completedSessions?: number };
    
    if (!data.sessions || data.sessions.length === 0) {
      return (
        <div className="mt-3 p-4 bg-muted/30 rounded-lg text-sm">
          <p className="text-muted-foreground">No chat sessions yet.</p>
        </div>
      );
    }
    
    return (
      <div className="mt-3 p-4 bg-muted/30 rounded-lg text-sm space-y-3">
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            <span className="font-medium">{data.totalSessions}</span> sessions
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{data.totalMessages}</span> messages sent
          </div>
          {data.activeSessions !== undefined && data.activeSessions > 0 && (
            <Badge variant="default" className="text-xs">
              {data.activeSessions} active
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {data.sessions.map((session: any, idx: number) => (
            <div 
              key={session.sessionId || idx}
              className="p-3 bg-background rounded border flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{session.topic}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>{new Date(session.createdAt).toLocaleDateString("en-HK", { month: "short", day: "numeric" })}</span>
                  <span>•</span>
                  <span>{session.messageCount} messages</span>
                  {session.isStudentLed && (
                    <>
                      <span>•</span>
                      <span className="text-blue-600">Practice</span>
                    </>
                  )}
                </div>
              </div>
              <Badge variant={session.status === 'active' ? 'default' : 'secondary'}>
                {session.status === 'active' ? 'Active' : 'Ended'}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  const getTaskInfo = (taskId: string) => ALL_TASKS.find((t) => t.id === taskId);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{studentInfo.displayName}</h1>
            <p className="text-sm text-muted-foreground">ID: {studentInfo.uniqueId}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Progress Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Your Progress
          </CardTitle>
          <CardDescription>
            {completedCount} of {totalCount} tasks completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted rounded-full h-3 mb-4">
            <div 
              className="bg-primary h-3 rounded-full transition-all" 
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
          
          {isLoading ? (
            <p className="text-center text-muted-foreground py-4">Loading tasks...</p>
          ) : (
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No tasks assigned yet.</p>
              ) : (
                tasks.map((task) => {
                  const taskInfo = getTaskInfo(task.taskId);
                  const isExpanded = expandedTasks.has(task.taskId);
                  
                  const taskContent = (
                    <div 
                      className={`p-4 rounded-lg border transition-colors ${
                        task.completed 
                          ? "bg-green-50 border-green-200" 
                          : taskInfo?.link 
                            ? "bg-muted/50 hover:bg-muted cursor-pointer" 
                            : "bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {task.taskType === "mc" ? (
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                          ) : task.taskType === "survey" ? (
                            <ClipboardList className="h-5 w-5 text-muted-foreground" />
                          ) : task.taskType === "coach" ? (
                            <Bot className="h-5 w-5 text-muted-foreground" />
                          ) : task.taskType === "chat" ? (
                            <MessageSquare className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <PenTool className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium flex items-center gap-2">
                              {taskInfo?.label}
                              {taskInfo?.link && !task.completed && (
                                <ExternalLink className="h-3 w-3 text-primary" />
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">{taskInfo?.week}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {task.completed ? (
                            <>
                              <Badge variant="default" className="bg-green-600">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                {task.taskType === "mc" ? `Score: ${task.score}/5` : "Completed"}
                              </Badge>
                              {task.answer && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleExpanded(task.taskId)}
                                  className="h-8 px-2"
                                >
                                  {isExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                  <span className="ml-1 text-xs">View</span>
                                </Button>
                              )}
                            </>
                          ) : (
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                      {task.completed && task.updatedAt && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Completed: {new Date(task.updatedAt).toLocaleDateString("en-HK", {
                            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                          })}
                        </p>
                      )}
                      {isExpanded && task.answer && task.taskType === "survey" && renderSurveyAnswer(task.answer)}
                      {isExpanded && task.answer && task.taskType === "coach" && renderCarsCoachReport(task.answer)}
                      {isExpanded && task.answer && task.taskType === "chat" && renderChatSessions(task.answer)}
                    </div>
                  );

                  return taskInfo?.link && !task.completed ? (
                    <Link key={task.taskId} to={taskInfo.link}>
                      {taskContent}
                    </Link>
                  ) : (
                    <div key={task.taskId}>{taskContent}</div>
                  );
                })
              )}
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

// ===== TEACHER DASHBOARD =====
const TeacherDashboardView = ({
  onLogout,
  teacherEmail,
}: {
  onLogout: () => void;
  teacherEmail: string | null;
}) => {
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentSummary | null>(null);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  const toggleTaskExpanded = (taskId: string) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) newSet.delete(taskId);
      else newSet.add(taskId);
      return newSet;
    });
  };

  const loadDashboardData = async (teacherEmail: string, teacherPassword: string) => {
    setIsLoading(true);
    setCredentials({ email: teacherEmail, password: teacherPassword });

    try {
      // Fetch all registered students from mccp_students
      const { data: studentsData, error: studentsError } = await supabase
        .from("mccp_students")
        .select("unique_id, display_name, last_4_digits, created_at, updated_at")
        .order("created_at", { ascending: false });

      if (studentsError) {
        console.error("Failed to load students:", studentsError);
        setIsLoading(false);
        return;
      }

      // Fetch all survey responses
      const { data: surveyData } = await supabase
        .from("survey_responses")
        .select("*");

      // Fetch all CARS Coach sessions
      const { data: carsData } = await supabase
        .from("cars_coach_sessions")
        .select("id, student_id, completed_at, discipline, chat_history, current_phase, learning_report");

      // Fetch all chat participations with session info
      const { data: chatParticipationsData } = await supabase
        .from("chat_participants")
        .select(`
          student_id,
          session_id,
          joined_at,
          is_teacher,
          chat_sessions (
            id,
            topic,
            status,
            is_student_led,
            created_at
          )
        `)
        .eq("is_teacher", false);

      // Fetch message counts per student per session
      const { data: messageCountsData } = await supabase
        .from("chat_messages")
        .select("sender_id, session_id");

      // Build student map
      const studentMap = new Map<string, StudentSummary>();

      (studentsData || []).forEach((row) => {
        const studentCode = row.last_4_digits;
        
        if (!studentMap.has(studentCode)) {
          studentMap.set(studentCode, {
            pseudonym: row.display_name || row.unique_id,
            studentId: studentCode,
            uniqueId: row.unique_id,
            registeredAt: row.created_at,
            lastActive: row.updated_at,
            surveyCompleted: false,
            surveyData: null,
            carsCoachDone: false,
            carsCoachSessions: 0,
            carsCoachData: [],
            chatSessions: [],
            chatMessageCount: 0,
            progress: [],
          });
        }
      });

      // Add survey data
      (surveyData || []).forEach((survey) => {
        const parts = survey.student_id.split('-');
        const last4 = parts[0];
        const student = studentMap.get(last4);
        if (student) {
          student.surveyCompleted = true;
          student.surveyData = {
            field_of_study: survey.field_of_study,
            ai_frequency: survey.ai_frequency,
            ai_tools_used: survey.ai_tools_used,
            helpful_stages: survey.helpful_stages,
            workflow_description: survey.workflow_description,
            ai_wishlist: survey.ai_wishlist,
            created_at: survey.created_at,
          };
          if (!student.lastActive || new Date(survey.created_at) > new Date(student.lastActive)) {
            student.lastActive = survey.created_at;
          }
        }
      });

      // Add CARS Coach data
      (carsData || []).forEach((session) => {
        const parts = session.student_id.split('-');
        const last4 = parts[0];
        const student = studentMap.get(last4);
        if (student) {
          if (session.completed_at) {
            student.carsCoachDone = true;
            student.carsCoachSessions += 1;
          }
          student.carsCoachData.push({
            id: session.id,
            discipline: session.discipline,
            chatHistory: (session.chat_history as any[]) || [],
            completedAt: session.completed_at || '',
            currentPhase: session.current_phase,
            learningReport: (session as any).learning_report ?? null,
          });
          if (session.completed_at && (!student.lastActive || new Date(session.completed_at) > new Date(student.lastActive))) {
            student.lastActive = session.completed_at;
          }
        }
      });

      // Add Chat session data
      const messageCountMap = new Map<string, Map<string, number>>();
      (messageCountsData || []).forEach((msg: any) => {
        if (!msg.sender_id) return;
        if (!messageCountMap.has(msg.sender_id)) {
          messageCountMap.set(msg.sender_id, new Map());
        }
        const sessionCounts = messageCountMap.get(msg.sender_id)!;
        sessionCounts.set(msg.session_id, (sessionCounts.get(msg.session_id) || 0) + 1);
      });

      (chatParticipationsData || []).forEach((part: any) => {
        const session = part.chat_sessions;
        if (!session) return;
        
        // Match student by unique_id format
        const studentId = part.student_id;
        const parts = studentId.split('-');
        const last4 = parts[0];
        const student = studentMap.get(last4);
        
        if (student) {
          const msgCount = messageCountMap.get(studentId)?.get(session.id) || 0;
          student.chatSessions.push({
            sessionId: session.id,
            topic: session.topic,
            status: session.status,
            isStudentLed: session.is_student_led,
            messageCount: msgCount,
            joinedAt: part.joined_at
          });
          student.chatMessageCount += msgCount;
          
          if (!student.lastActive || new Date(part.joined_at) > new Date(student.lastActive)) {
            student.lastActive = part.joined_at;
          }
        }
      });

      setStudents(Array.from(studentMap.values()));
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Legacy: some older teacher flows store full creds in sessionStorage.
    const storedCreds = sessionStorage.getItem("teacher_creds");
    if (storedCreds) {
      const { email, password } = JSON.parse(storedCreds);
      loadDashboardData(email, password);
      return;
    }

    // Current auth flow stores teacher identity in localStorage via AuthContext.
    if (teacherEmail) {
      loadDashboardData(teacherEmail, "");
    }
  }, [teacherEmail]);

  const handleRefresh = () => {
    if (credentials) {
      loadDashboardData(credentials.email, credentials.password);
      return;
    }

    const storedCreds = sessionStorage.getItem("teacher_creds");
    if (storedCreds) {
      const { email, password } = JSON.parse(storedCreds);
      loadDashboardData(email, password);
      return;
    }

    if (teacherEmail) {
      loadDashboardData(teacherEmail, "");
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Never";
    return new Date(dateStr).toLocaleString("en-HK", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [isExporting, setIsExporting] = useState(false);

  const handleExportSurveys = async () => {
    setIsExporting(true);
    try {
      await exportSurveyResponsesAsCSV();
      toast.success('Survey responses exported successfully!');
    } catch (error: any) {
      console.error('Export error:', error);
      toast.error(error.message || 'Failed to export survey responses');
    } finally {
      setIsExporting(false);
    }
  };

  const getTaskStatus = (student: StudentSummary, taskId: string) => {
    if (taskId === 'needs_analysis_survey') {
      return student.surveyCompleted;
    }
    if (taskId === 'cars_coach') {
      return student.carsCoachDone;
    }
    return false;
  };

  const getCompletedTasksCount = (student: StudentSummary) => {
    let count = 0;
    if (student.surveyCompleted) count++;
    if (student.carsCoachDone) count++;
    return count;
  };

  // Render student detail view
  if (selectedStudent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedStudent(null)}>
              ← Back to Overview
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{selectedStudent.pseudonym}</h1>
              <p className="text-muted-foreground">Student ID: {selectedStudent.uniqueId}</p>
            </div>
          </div>
        </div>

        {/* Student Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Registered</p>
                <p className="font-medium">{formatDate(selectedStudent.registeredAt)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Active</p>
                <p className="font-medium">{formatDate(selectedStudent.lastActive)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
                <p className="font-medium">{getCompletedTasksCount(selectedStudent)} / {ALL_TASKS.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all" 
                      style={{ width: `${(getCompletedTasksCount(selectedStudent) / ALL_TASKS.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {Math.round((getCompletedTasksCount(selectedStudent) / ALL_TASKS.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Detail */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Task Progress</CardTitle>
            <CardDescription>Click on any completed task to view detailed report</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ALL_TASKS.map((task) => {
              const isCompleted = getTaskStatus(selectedStudent, task.id);
              const isExpanded = expandedTasks.has(task.id);
              
              return (
                <div 
                  key={task.id}
                  className={`p-4 rounded-lg border transition-all ${
                    isCompleted 
                      ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800" 
                      : "bg-muted/30 border-muted"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {task.type === "survey" ? (
                        <ClipboardList className={`h-5 w-5 ${isCompleted ? 'text-green-600' : 'text-muted-foreground'}`} />
                      ) : (
                        <Bot className={`h-5 w-5 ${isCompleted ? 'text-green-600' : 'text-muted-foreground'}`} />
                      )}
                      <div>
                        <p className="font-medium">{task.label}</p>
                        <p className="text-sm text-muted-foreground">{task.week} • {task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <>
                          <Badge variant="default" className="bg-green-600">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleTaskExpanded(task.id)}
                          >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            <span className="ml-1">View Report</span>
                          </Button>
                        </>
                      ) : (
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Expanded Task Details */}
                  {isExpanded && isCompleted && (
                    <div className="mt-4 pt-4 border-t">
                      {task.id === 'needs_analysis_survey' && selectedStudent.surveyData && (
                        <div className="space-y-4">
                          <div className="text-xs text-muted-foreground">
                            Completed: {formatDate(selectedStudent.surveyData.created_at)}
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Field of Study</p>
                              <p>{selectedStudent.surveyData.field_of_study}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">AI Usage Frequency</p>
                              <p>{selectedStudent.surveyData.ai_frequency}/5</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">AI Tools Used</p>
                            <pre className="text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-lg">
                              {selectedStudent.surveyData.ai_tools_used}
                            </pre>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Helpful Stages</p>
                            <div className="flex flex-wrap gap-1">
                              {selectedStudent.surveyData.helpful_stages.map((stage, i) => (
                                <Badge key={i} variant="secondary">{stage}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Workflow Description</p>
                            <pre className="text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-lg max-h-48 overflow-y-auto">
                              {selectedStudent.surveyData.workflow_description}
                            </pre>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">AI Wishlist</p>
                            <p className="text-sm">{selectedStudent.surveyData.ai_wishlist}</p>
                          </div>
                        </div>
                      )}

                      {task.id === 'cars_coach' && selectedStudent.carsCoachData.length > 0 && (
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            {selectedStudent.carsCoachSessions} session{selectedStudent.carsCoachSessions !== 1 ? 's' : ''} completed
                          </p>
                          {selectedStudent.carsCoachData.filter(s => s.completedAt).map((session, idx) => (
                            <Collapsible key={session.id} className="border rounded-lg">
                              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50">
                                <div className="flex items-center gap-3">
                                  <Badge variant="default">Session {idx + 1}</Badge>
                                  <span className="text-sm">{session.discipline}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{new Date(session.completedAt).toLocaleDateString()}</span>
                                  <ChevronDown className="h-4 w-4" />
                                </div>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="px-4 pb-4">
                                <div className="space-y-3">
                                  <div className="grid grid-cols-2 gap-3 p-3 bg-muted/30 rounded-lg">
                                    <div>
                                      <p className="text-xs text-muted-foreground">Discipline</p>
                                      <p className="font-medium">{session.discipline}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground">Quiz Accuracy</p>
                                      <p className="font-medium">{calculateCarsCoachAccuracyFromChat(session.chatHistory)}%</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground">Messages</p>
                                      <p className="font-medium">{session.chatHistory.length}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground">Completed</p>
                                      <p className="font-medium">{formatDate(session.completedAt)}</p>
                                    </div>
                                  </div>

                                  {session.learningReport && (
                                    <div className="p-3 bg-muted/30 rounded-lg">
                                      <p className="text-sm font-medium mb-2">Learning Report</p>
                                      {Array.isArray(session.learningReport.keyTakeaways) && (
                                        <div className="mb-2">
                                          <p className="text-xs text-muted-foreground">Key Takeaways</p>
                                          <ul className="list-disc pl-5 text-sm">
                                            {session.learningReport.keyTakeaways.map((t: string, i: number) => (
                                              <li key={i}>{t}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      downloadTextFile(
                                        buildCarsCoachTranscriptText(session.chatHistory),
                                        `${selectedStudent.pseudonym}_CARS_Coach_Session_${idx + 1}.txt`
                                      )
                                    }
                                  >
                                    <Download className="h-4 w-4 mr-2" /> Download Full Transcript
                                  </Button>

                                  {/* Chat History */}
                                  <div className="border rounded-lg mt-3">
                                    <div className="p-3 border-b bg-muted/30">
                                      <span className="font-medium text-sm">Chat History ({session.chatHistory.length} messages)</span>
                                    </div>
                                    <div className="p-3 space-y-3 max-h-96 overflow-y-auto">
                                      {session.chatHistory.map((msg, msgIdx) => (
                                        <div 
                                          key={msgIdx} 
                                          className={`p-3 rounded-lg text-sm ${
                                            msg.role === 'assistant' 
                                              ? 'bg-primary/10 border-l-2 border-primary' 
                                              : 'bg-muted ml-6'
                                          }`}
                                        >
                                          <p className="font-semibold mb-1 text-xs uppercase text-muted-foreground">
                                            {msg.role === 'assistant' ? '🤖 CARS Coach' : '👤 Student'}
                                          </p>
                                          <p className="whitespace-pre-wrap">{msg.content}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main overview
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">View all student progress and survey responses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="progress" className="gap-2">
            <Users className="h-4 w-4" />
            Student Progress
          </TabsTrigger>
          <TabsTrigger value="surveys" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Survey Responses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="mt-6">
          {/* Task Overview Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {ALL_TASKS.map((task) => {
              const completedCount = students.filter(s => getTaskStatus(s, task.id)).length;
              return (
                <Card key={task.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      {task.type === "survey" ? (
                        <ClipboardList className="h-5 w-5 text-primary" />
                      ) : (
                        <Bot className="h-5 w-5 text-primary" />
                      )}
                      <CardTitle className="text-base">{task.label}</CardTitle>
                    </div>
                    <CardDescription>{task.week}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">{completedCount}</p>
                        <p className="text-sm text-muted-foreground">of {students.length} completed</p>
                      </div>
                      <div className="w-16 h-16">
                        <div className="relative w-full h-full">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="32" cy="32" r="28"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                              className="text-muted"
                            />
                            <circle
                              cx="32" cy="32" r="28"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                              strokeDasharray={`${(completedCount / Math.max(students.length, 1)) * 176} 176`}
                              className="text-primary"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                            {students.length > 0 ? Math.round((completedCount / students.length) * 100) : 0}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={handleExportSurveys} disabled={isExporting}>
              <Download className={`h-4 w-4 mr-2 ${isExporting ? "animate-pulse" : ""}`} />
              {isExporting ? 'Exporting...' : 'Export All Data'}
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Registered Students</CardTitle>
              <CardDescription>
                {students.length} students registered • Click on a student to view detailed progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center py-8 text-muted-foreground">Loading student data...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Survey</TableHead>
                      <TableHead>CARS Coach</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.studentId} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedStudent(student)}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{student.pseudonym}</p>
                            <p className="text-xs text-muted-foreground">{student.uniqueId}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(student.registeredAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {student.surveyCompleted ? (
                            <Badge variant="default" className="bg-green-600">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Done
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {student.carsCoachDone ? (
                            <Badge variant="default" className="bg-green-600">
                              <Bot className="h-3 w-3 mr-1" />
                              {student.carsCoachSessions} session{student.carsCoachSessions !== 1 ? 's' : ''}
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${(getCompletedTasksCount(student) / ALL_TASKS.length) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {getCompletedTasksCount(student)}/{ALL_TASKS.length}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(student.lastActive)}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="surveys" className="mt-6">
          <SurveyDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// ===== MAIN DASHBOARD PAGE =====
const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType, studentId, teacherEmail, studentData, signOut, isLoading } = useAuth();
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [loadingStudent, setLoadingStudent] = useState(false);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/mccp/auth');
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Fetch student info when studentId is available
  useEffect(() => {
    if (userType === 'student' && studentId && !studentInfo) {
      fetchStudentInfo(studentId);
    }
  }, [userType, studentId, studentInfo]);

  const fetchStudentInfo = async (uniqueId: string) => {
    setLoadingStudent(true);
    try {
      const { data, error } = await supabase
        .from("mccp_students")
        .select("unique_id, display_name, last_4_digits")
        .eq("unique_id", uniqueId.toUpperCase().trim())
        .maybeSingle();

      if (!error && data) {
        setStudentInfo({
          uniqueId: data.unique_id,
          displayName: data.display_name || data.unique_id,
          last4Digits: data.last_4_digits
        });
      }
    } catch (err) {
      console.error("Error fetching student info:", err);
    } finally {
      setLoadingStudent(false);
    }
  };

  const handleLogout = () => {
    signOut();
    navigate('/mccp/auth');
  };

  // Show loading state
  if (isLoading || loadingStudent) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 mx-auto text-primary mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show student dashboard
  if (userType === "student" && studentInfo) {
    return <StudentDashboard studentInfo={studentInfo} onLogout={handleLogout} />;
  }

  // Show teacher dashboard
  if (userType === "teacher") {
    return <TeacherDashboardView onLogout={handleLogout} teacherEmail={teacherEmail} />;
  }

  // Fallback - redirect to auth
  return null;
};

export default Dashboard;
