import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ExternalLink, User, Hash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Pseudonym list for students
const pseudonyms = [
  "Phoenix", "Dragon", "Griffin", "Unicorn", "Pegasus",
  "Sphinx", "Centaur", "Kraken", "Hydra", "Chimera",
  "Thunderbird", "Basilisk", "Cerberus", "Minotaur", "Leviathan",
  "Valkyrie", "Titan", "Atlas", "Aurora", "Orion",
  "Nova", "Stellar", "Cosmos", "Nebula", "Quantum",
  "Echo", "Cipher", "Vector", "Matrix", "Prism"
];

interface StudentInfo {
  pseudonym: string;
  last4Digits: string;
}

const StudentParticipation = () => {
  const [last4Digits, setLast4Digits] = useState("");
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [allStudents, setAllStudents] = useState<StudentInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate a consistent pseudonym based on the 4-digit code
  const generatePseudonym = (digits: string): string => {
    const hash = digits.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return pseudonyms[hash % pseudonyms.length];
  };

  const handleSubmit = () => {
    if (last4Digits.length === 4 && /^\d{4}$/.test(last4Digits)) {
      const pseudonym = generatePseudonym(last4Digits);
      const newStudent: StudentInfo = { pseudonym, last4Digits };
      setStudentInfo(newStudent);
      
      // Store in localStorage
      localStorage.setItem("mccp_student_id", last4Digits);
      
      // Add to displayed list if not already there
      if (!allStudents.find(s => s.last4Digits === last4Digits)) {
        setAllStudents(prev => [...prev, newStudent]);
      }
    }
  };

  // Load stored student ID on mount
  useEffect(() => {
    const stored = localStorage.getItem("mccp_student_id");
    if (stored && stored.length === 4) {
      setLast4Digits(stored);
      const pseudonym = generatePseudonym(stored);
      setStudentInfo({ pseudonym, last4Digits: stored });
    }
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Student Participation</h1>
        <p className="text-muted-foreground">Track your course participation with privacy protection</p>
      </div>

      {/* Privacy Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Shield className="h-5 w-5" />
            Privacy Protection
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-700 space-y-2">
          <p>
            We protect your personal data by using <strong>pseudonyms</strong> instead of real names.
          </p>
          <p>
            You only need to enter the <strong>last 4 digits of your student ID</strong> to identify yourself. 
            Your full student ID and name are never displayed publicly.
          </p>
        </CardContent>
      </Card>

      {/* Student ID Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Enter Your Student ID
          </CardTitle>
          <CardDescription>
            Enter the last 4 digits of your student ID to get your pseudonym
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 items-center">
            <Input
              type="text"
              placeholder="e.g., 1234"
              maxLength={4}
              value={last4Digits}
              onChange={(e) => setLast4Digits(e.target.value.replace(/\D/g, ""))}
              className="max-w-32 text-center text-lg font-mono"
            />
            <Button onClick={handleSubmit} disabled={last4Digits.length !== 4}>
              Get Pseudonym
            </Button>
          </div>

          {studentInfo && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center gap-4">
                <User className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Your Pseudonym</p>
                  <p className="text-2xl font-bold text-primary">{studentInfo.pseudonym}</p>
                  <Badge variant="outline" className="mt-1">ID: ****{studentInfo.last4Digits}</Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Discussion Forum Link */}
      <Card>
        <CardHeader>
          <CardTitle>Participation Forum</CardTitle>
          <CardDescription>
            Access the course discussion forum on BUe-Learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a
            href="https://buelearning.hkbu.edu.hk/mod/forum/discuss.php?d=345213"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Go to Discussion Forum
          </a>
          <p className="mt-3 text-sm text-muted-foreground">
            Use your pseudonym when participating in discussions to maintain privacy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentParticipation;
