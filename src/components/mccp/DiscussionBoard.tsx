import { useState, useEffect } from "react";
import { MessageSquare, Send, Trash2, ChevronDown, ChevronRight, User, GraduationCap as Teacher, HelpCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface Discussion {
  id: string;
  section_id: string;
  student_id: string;
  message: string;
  is_teacher: boolean;
  parent_id: string | null;
  created_at: string;
}

interface Student {
  student_code: string;
  name: string;
}

interface DiscussionBoardProps {
  sectionId: string;
  sectionTitle: string;
  className?: string;
}

const TEACHER_CODE = "1989"; // Special code for teacher posts (Simon)
const HELP_LINK = "https://buelearning.hkbu.edu.hk/mod/forum/discuss.php?d=345203#p542207";

const DiscussionBoard = ({ sectionId, sectionTitle, className = "" }: DiscussionBoardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [students, setStudents] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Load discussions and student names when opened
  useEffect(() => {
    if (isOpen) {
      loadDiscussions();
      loadStudents();
    }
  }, [isOpen, sectionId]);

  const loadStudents = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("student_code, name");

      if (error) throw error;
      
      const studentMap: Record<string, string> = {};
      data?.forEach((s: Student) => {
        studentMap[s.student_code] = s.name;
      });
      setStudents(studentMap);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  const loadDiscussions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("discussions")
        .select("*")
        .eq("section_id", sectionId)
        .is("parent_id", null)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setDiscussions(data || []);
    } catch (error) {
      console.error("Error loading discussions:", error);
      toast({
        title: "Error",
        description: "Failed to load discussions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDisplayName = (code: string) => {
    return students[code] || `Student ***${code}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate student ID (exactly 4 digits)
    if (!/^\d{4}$/.test(studentId)) {
      toast({
        title: "Invalid ID",
        description: "Please enter exactly 4 digits of your student ID",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Empty message",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    if (message.length > 1000) {
      toast({
        title: "Message too long",
        description: "Message must be under 1000 characters",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("discussions").insert({
        section_id: sectionId,
        student_id: studentId,
        message: message.trim(),
        is_teacher: studentId === TEACHER_CODE,
      });

      if (error) throw error;

      toast({
        title: "Posted!",
        description: "Your message has been added to the discussion",
      });

      setMessage("");
      loadDiscussions();
    } catch (error) {
      console.error("Error posting discussion:", error);
      toast({
        title: "Error",
        description: "Failed to post message",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (discussionId: string, posterStudentId: string) => {
    // Only allow deletion if the current studentId matches
    if (studentId !== posterStudentId && studentId !== TEACHER_CODE) {
      toast({
        title: "Cannot delete",
        description: "You can only delete your own messages",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("discussions")
        .delete()
        .eq("id", discussionId);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Message has been removed",
      });

      loadDiscussions();
    } catch (error) {
      console.error("Error deleting discussion:", error);
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <MessageSquare className="h-4 w-4" />
          <span>Class Discussion</span>
          {discussions.length > 0 && (
            <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
              {discussions.length}
            </span>
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <div className="border rounded-lg p-4 space-y-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Discussion for: <span className="font-medium text-foreground">{sectionTitle}</span>
            </div>
            <a
              href={HELP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <HelpCircle className="h-3 w-3" />
              Need help?
            </a>
          </div>

          {/* Discussion messages */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {loading ? (
              <p className="text-sm text-muted-foreground text-center py-4">Loading discussions...</p>
            ) : discussions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No discussions yet. Be the first to start one!
              </p>
            ) : (
              discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className={`p-3 rounded-md ${
                    discussion.is_teacher
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {discussion.is_teacher ? (
                        <>
                          <Teacher className="h-3 w-3 text-primary" />
                          <span className="font-medium text-primary">Instructor</span>
                        </>
                      ) : (
                        <>
                          <User className="h-3 w-3" />
                          <span>{getDisplayName(discussion.student_id)}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>
                        {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    {(studentId === discussion.student_id || studentId === TEACHER_CODE) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(discussion.id, discussion.student_id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <p className="mt-2 text-sm whitespace-pre-wrap">{discussion.message}</p>
                </div>
              ))
            )}
          </div>

          {/* Post form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-3 border-t">
            <div className="flex gap-2">
              <div className="w-28">
                <Input
                  placeholder="Last 4 digits"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  maxLength={4}
                  className="text-center"
                />
                <p className="text-[10px] text-muted-foreground mt-1 text-center">Student ID</p>
              </div>
              <div className="flex-1">
                <Textarea
                  placeholder="Share your thoughts, questions, or insights..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  className="resize-none"
                  maxLength={1000}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {message.length}/1000 characters
              </span>
              <Button type="submit" size="sm" disabled={submitting}>
                <Send className="h-4 w-4 mr-2" />
                {submitting ? "Posting..." : "Post"}
              </Button>
            </div>
          </form>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DiscussionBoard;
