import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Lock, Eye, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

const TEACHER_CODE = "1989";

const TeacherDashboard = () => {
  const [code, setCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentSummary | null>(null);

  const handleLogin = () => {
    if (code === TEACHER_CODE) {
      setIsAuthenticated(true);
      setError(null);
      loadDashboardData();
    } else {
      setError("Incorrect code. Please try again.");
    }
  };

  const loadDashboardData = async () => {
    setIsLoading(true);

    // Get all pseudonyms
    const { data: pseudonyms } = await supabase
      .from("student_pseudonyms")
      .select("pseudonym, last_4_digits");

    // Get all progress data
    const { data: progress } = await supabase
      .from("students_progress")
      .select("*")
      .order("updated_at", { ascending: false });

    if (pseudonyms && progress) {
      const studentMap = new Map<string, StudentSummary>();

      // Initialize with all students from pseudonyms
      pseudonyms.forEach((p) => {
        studentMap.set(p.last_4_digits, {
          pseudonym: p.pseudonym,
          studentId: p.last_4_digits,
          session1McScore: null,
          session1McTotal: 5,
          session1WritingDone: false,
          session2McScore: null,
          session2McTotal: 5,
          session2WritingDone: false,
          lastActive: null,
          progress: [],
        });
      });

      // Process progress data
      progress.forEach((p) => {
        const student = studentMap.get(p.student_id);
        if (student) {
          student.progress.push(p);

          if (!student.lastActive || new Date(p.updated_at) > new Date(student.lastActive)) {
            student.lastActive = p.updated_at;
          }

          if (p.task_id === "session1_mc" && p.score !== null) {
            student.session1McScore = p.score;
          } else if (p.task_id === "session1_writing" && p.ai_feedback) {
            student.session1WritingDone = true;
          } else if (p.task_id === "session2_mc" && p.score !== null) {
            student.session2McScore = p.score;
          } else if (p.task_id === "session2_writing" && p.ai_feedback) {
            student.session2WritingDone = true;
          }
        }
      });

      setStudents(Array.from(studentMap.values()));
    }

    setIsLoading(false);
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
          <CardDescription>Enter the access code to view student progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              type="password"
              placeholder="Enter code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
              className="max-w-40"
            />
            <Button onClick={handleLogin}>Access</Button>
          </div>
          {error && (
            <p className="text-sm text-destructive mt-2 flex items-center gap-1">
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
        <Button variant="outline" onClick={loadDashboardData} disabled={isLoading}>
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
