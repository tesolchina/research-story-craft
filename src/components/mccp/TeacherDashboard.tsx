import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Lock, Eye, CheckCircle2, Clock, AlertCircle, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

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

// Input validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const TeacherDashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentSummary | null>(null);
  const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);

  const handleLogin = async () => {
    // Validate input
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Verify credentials via secure RPC function
      const { data, error: rpcError } = await supabase.rpc("verify_teacher_login", {
        p_email: email,
        p_password: password,
      });

      if (rpcError) {
        setError("Authentication failed. Please try again.");
        setIsLoading(false);
        return;
      }

      if (data === true) {
        setIsAuthenticated(true);
        setCredentials({ email, password });
        await loadDashboardData(email, password);
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadDashboardData = async (teacherEmail: string, teacherPassword: string) => {
    setIsLoading(true);

    try {
      // Get dashboard data via secure RPC function
      const { data, error: rpcError } = await supabase.rpc("get_teacher_dashboard_data", {
        p_email: teacherEmail,
        p_password: teacherPassword,
      });

      if (rpcError) {
        setError("Failed to load data. Please refresh.");
        setIsLoading(false);
        return;
      }

      if (data) {
        const studentMap = new Map<string, StudentSummary>();

        // Process the joined data
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

          // Only process if there's actual progress data
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
      setError("Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  };

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

  if (!isAuthenticated) {
    return (
      <Card className="max-w-md mx-auto mt-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Teacher Dashboard
          </CardTitle>
          <CardDescription>Sign in with your teacher credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="teacher@mccp.edu.hk"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium flex items-center gap-1">
                <Lock className="h-4 w-4" />
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />
            </div>
            <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
          {error && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">View student progress for Weeks 2-4 tasks</p>
        </div>
        <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Progress Overview</CardTitle>
          <CardDescription>
            {students.length} students registered • {students.filter((s) => s.lastActive).length} have started tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                                  <p className="text-sm">
                                    <strong>Response:</strong>
                                  </p>
                                  <p className="text-sm bg-muted p-2 rounded whitespace-pre-wrap">
                                    {(p.answer as { text: string }).text}
                                  </p>
                                  {p.ai_feedback && (
                                    <>
                                      <p className="text-sm">
                                        <strong>AI Feedback:</strong>
                                      </p>
                                      <p className="text-sm bg-purple-50 p-2 rounded whitespace-pre-wrap">
                                        {p.ai_feedback}
                                      </p>
                                    </>
                                  )}
                                </div>
                              )}
                              {p.task_type === "mc" && (
                                <p className="text-sm">
                                  Score: {p.score}/{p.task_id.includes("session1") ? 5 : 5}
                                </p>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;