import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Hash, AlertCircle, CheckCircle2, Clock, Eye, Lock, 
  GraduationCap, ClipboardList, BookOpen, PenTool, Mail, RefreshCw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

interface StudentInfo {
  pseudonym: string;
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

interface StudentSummary {
  pseudonym: string;
  studentId: string;
  session1McScore: number | null;
  session1McTotal: number;
  session1WritingDone: boolean;
  session2McScore: number | null;
  session2McTotal: number;
  session2WritingDone: boolean;
  lastActive: string | null;
  progress: ProgressData[];
}

// Define all tasks students need to complete
const ALL_TASKS = [
  { id: "session1_mc", type: "mc", label: "Session 1: Multiple Choice Quiz", week: "Weeks 2-4" },
  { id: "session1_writing", type: "writing", label: "Session 1: Writing Task", week: "Weeks 2-4" },
  { id: "session2_mc", type: "mc", label: "Session 2: Multiple Choice Quiz", week: "Weeks 2-4" },
  { id: "session2_writing", type: "writing", label: "Session 2: Writing Task", week: "Weeks 2-4" },
];

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ===== STUDENT DASHBOARD =====
const StudentDashboard = ({ studentInfo, onLogout }: { studentInfo: StudentInfo; onLogout: () => void }) => {
  const [tasks, setTasks] = useState<TaskProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [studentInfo.last4Digits]);

  const loadProgress = async () => {
    setIsLoading(true);
    
    const { data, error } = await supabase
      .from("students_progress")
      .select("task_id, task_type, score, ai_feedback, answer, updated_at, is_correct")
      .eq("student_id", studentInfo.last4Digits);

    if (error) {
      console.error("Error loading progress:", error);
      setIsLoading(false);
      return;
    }

    // Map all tasks with their completion status
    const taskProgress: TaskProgress[] = ALL_TASKS.map((task) => {
      const progress = data?.find((p) => p.task_id === task.id);
      return {
        taskId: task.id,
        taskType: task.type,
        completed: progress ? (task.type === "mc" ? progress.score !== null : !!progress.ai_feedback) : false,
        score: progress?.score ?? null,
        aiFeedback: progress?.ai_feedback ?? null,
        answer: progress?.answer ?? null,
        updatedAt: progress?.updated_at ?? null,
      };
    });

    setTasks(taskProgress);
    setIsLoading(false);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  const getTaskInfo = (taskId: string) => ALL_TASKS.find((t) => t.id === taskId);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{studentInfo.pseudonym}</h1>
            <p className="text-sm text-muted-foreground">Student ID: ****{studentInfo.last4Digits}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onLogout}>
          Switch User
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
              {tasks.map((task) => {
                const taskInfo = getTaskInfo(task.taskId);
                return (
                  <div 
                    key={task.taskId} 
                    className={`p-4 rounded-lg border ${task.completed ? "bg-green-50 border-green-200" : "bg-muted/50"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {task.taskType === "mc" ? (
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <PenTool className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">{taskInfo?.label}</p>
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
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 flex-wrap">
          <Button variant="outline" asChild>
            <a href="/mccp/weeks2-4/tasks">Go to Tasks</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/mccp/weeks2-4/writing-materials">Writing Materials</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// ===== TEACHER DASHBOARD =====
const TeacherDashboardView = ({ onLogout }: { onLogout: () => void }) => {
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentSummary | null>(null);

  const loadDashboardData = async (teacherEmail: string, teacherPassword: string) => {
    setIsLoading(true);
    setCredentials({ email: teacherEmail, password: teacherPassword });

    try {
      const { data, error: rpcError } = await supabase.rpc("get_teacher_dashboard_data", {
        p_email: teacherEmail,
        p_password: teacherPassword,
      });

      if (rpcError) {
        console.error("Failed to load data:", rpcError);
        setIsLoading(false);
        return;
      }

      if (data) {
        const studentMap = new Map<string, StudentSummary>();

        (data as any[]).forEach((row) => {
          const studentCode = row.last_4_digits;
          
          if (!studentMap.has(studentCode)) {
            studentMap.set(studentCode, {
              pseudonym: row.pseudonym,
              studentId: studentCode,
              session1McScore: null,
              session1McTotal: 5,
              session1WritingDone: false,
              session2McScore: null,
              session2McTotal: 5,
              session2WritingDone: false,
              lastActive: null,
              progress: [],
            });
          }

          const student = studentMap.get(studentCode)!;

          if (row.student_id) {
            const progressItem: ProgressData = {
              student_id: row.student_id,
              task_id: row.task_id,
              task_type: row.task_type,
              answer: row.answer,
              ai_feedback: row.ai_feedback,
              is_correct: row.is_correct,
              score: row.score,
              updated_at: row.updated_at,
            };

            student.progress.push(progressItem);

            if (!student.lastActive || new Date(row.updated_at) > new Date(student.lastActive)) {
              student.lastActive = row.updated_at;
            }

            if (row.task_id === "session1_mc" && row.score !== null) {
              student.session1McScore = row.score;
            } else if (row.task_id === "session1_writing" && row.ai_feedback) {
              student.session1WritingDone = true;
            } else if (row.task_id === "session2_mc" && row.score !== null) {
              student.session2McScore = row.score;
            } else if (row.task_id === "session2_writing" && row.ai_feedback) {
              student.session2WritingDone = true;
            }
          }
        });

        setStudents(Array.from(studentMap.values()));
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when component mounts (credentials are passed from parent)
  useEffect(() => {
    const storedCreds = sessionStorage.getItem("teacher_creds");
    if (storedCreds) {
      const { email, password } = JSON.parse(storedCreds);
      loadDashboardData(email, password);
    }
  }, []);

  const handleRefresh = () => {
    if (credentials) {
      loadDashboardData(credentials.email, credentials.password);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">View all student progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={onLogout}>
            Sign Out
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Progress Overview</CardTitle>
          <CardDescription>
            {students.length} students registered • {students.filter((s) => s.lastActive).length} have started tasks
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
                  <TableHead>Session 1 MC</TableHead>
                  <TableHead>Session 1 Writing</TableHead>
                  <TableHead>Session 2 MC</TableHead>
                  <TableHead>Session 2 Writing</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{student.pseudonym}</p>
                        <p className="text-xs text-muted-foreground">****{student.studentId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {student.session1McScore !== null ? (
                        <Badge variant={student.session1McScore >= 3 ? "default" : "secondary"}>
                          {student.session1McScore}/{student.session1McTotal}
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {student.session1WritingDone ? (
                        <Badge variant="default">
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
                      {student.session2McScore !== null ? (
                        <Badge variant={student.session2McScore >= 3 ? "default" : "secondary"}>
                          {student.session2McScore}/{student.session2McTotal}
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {student.session2WritingDone ? (
                        <Badge variant="default">
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
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(student.lastActive)}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedStudent(student)}
                            disabled={!student.lastActive}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{student.pseudonym}'s Responses</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            {student.progress.map((p, idx) => (
                              <div key={idx} className="p-4 border rounded-lg">
                                <p className="font-medium text-sm mb-2">
                                  {p.task_id.replace(/_/g, " ").toUpperCase()}
                                </p>
                                {p.task_type === "writing" && p.answer && (
                                  <div className="space-y-2">
                                    <p className="text-sm"><strong>Response:</strong></p>
                                    <p className="text-sm bg-muted p-2 rounded whitespace-pre-wrap">
                                      {(p.answer as { text: string }).text}
                                    </p>
                                    {p.ai_feedback && (
                                      <>
                                        <p className="text-sm"><strong>AI Feedback:</strong></p>
                                        <p className="text-sm bg-purple-50 p-2 rounded whitespace-pre-wrap">
                                          {p.ai_feedback}
                                        </p>
                                      </>
                                    )}
                                  </div>
                                )}
                                {p.task_type === "mc" && (
                                  <p className="text-sm">Score: {p.score}/5</p>
                                )}
                              </div>
                            ))}
                            {student.progress.length === 0 && (
                              <p className="text-muted-foreground text-center py-4">
                                No responses yet
                              </p>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// ===== MAIN DASHBOARD PAGE =====
const Dashboard = () => {
  const [userType, setUserType] = useState<"student" | "teacher" | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [last4Digits, setLast4Digits] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Teacher login state
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");

  // Check for stored session on mount
  useEffect(() => {
    const storedStudentId = localStorage.getItem("mccp_student_id");
    const storedTeacherCreds = sessionStorage.getItem("teacher_creds");
    
    if (storedStudentId) {
      // Auto-login student
      fetchStudentPseudonym(storedStudentId);
    } else if (storedTeacherCreds) {
      setUserType("teacher");
    }
  }, []);

  const fetchStudentPseudonym = async (digits: string) => {
    setIsLoading(true);
    const { data, error: fetchError } = await supabase
      .from("student_pseudonyms")
      .select("pseudonym, last_4_digits")
      .eq("last_4_digits", digits)
      .maybeSingle();
    
    setIsLoading(false);
    
    if (fetchError || !data) {
      setError("Student ID not found. Please check your last 4 digits.");
      return;
    }

    setStudentInfo({ pseudonym: data.pseudonym, last4Digits: data.last_4_digits });
    setUserType("student");
    localStorage.setItem("mccp_student_id", digits);
  };

  const handleStudentLogin = async () => {
    if (last4Digits.length === 4 && /^\d{4}$/.test(last4Digits)) {
      setError(null);
      await fetchStudentPseudonym(last4Digits);
    }
  };

  const handleTeacherLogin = async () => {
    const validation = loginSchema.safeParse({ email: teacherEmail, password: teacherPassword });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc("verify_teacher_login", {
        p_email: teacherEmail,
        p_password: teacherPassword,
      });

      if (rpcError || data !== true) {
        setError("Invalid email or password.");
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem("teacher_creds", JSON.stringify({ email: teacherEmail, password: teacherPassword }));
      setUserType("teacher");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mccp_student_id");
    sessionStorage.removeItem("teacher_creds");
    setUserType(null);
    setStudentInfo(null);
    setLast4Digits("");
    setTeacherEmail("");
    setTeacherPassword("");
    setError(null);
  };

  // Show appropriate dashboard based on user type
  if (userType === "student" && studentInfo) {
    return <StudentDashboard studentInfo={studentInfo} onLogout={handleLogout} />;
  }

  if (userType === "teacher") {
    return <TeacherDashboardView onLogout={handleLogout} />;
  }

  // Login selection screen
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <GraduationCap className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="text-3xl font-bold">MCCP Dashboard</h1>
        <p className="text-muted-foreground">View your tasks and progress</p>
      </div>

      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Student
          </TabsTrigger>
          <TabsTrigger value="teacher" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Teacher
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                Student Login
              </CardTitle>
              <CardDescription>
                Enter the last 4 digits of your student ID to view your tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 items-center">
                <Input
                  type="text"
                  placeholder="e.g., 1234"
                  maxLength={4}
                  value={last4Digits}
                  onChange={(e) => {
                    setLast4Digits(e.target.value.replace(/\D/g, ""));
                    setError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && last4Digits.length === 4) {
                      handleStudentLogin();
                    }
                  }}
                  className="max-w-32 text-center text-lg font-mono"
                />
                <Button onClick={handleStudentLogin} disabled={last4Digits.length !== 4 || isLoading}>
                  {isLoading ? "Loading..." : "View Dashboard"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teacher">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Teacher Login
              </CardTitle>
              <CardDescription>
                Sign in with your teacher credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="teacher@mccp.edu.hk"
                  value={teacherEmail}
                  onChange={(e) => { setTeacherEmail(e.target.value); setError(null); }}
                  onKeyDown={(e) => { if (e.key === "Enter") handleTeacherLogin(); }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <Lock className="h-4 w-4" />
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={teacherPassword}
                  onChange={(e) => { setTeacherPassword(e.target.value); setError(null); }}
                  onKeyDown={(e) => { if (e.key === "Enter") handleTeacherLogin(); }}
                />
              </div>
              <Button onClick={handleTeacherLogin} className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
