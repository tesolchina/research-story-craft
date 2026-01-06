import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hash, User, AlertCircle, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface StudentEntryProps {
  onStudentVerified: (studentId: string, pseudonym: string) => void;
}

const StudentEntry = ({ onStudentVerified }: StudentEntryProps) => {
  const [last4Digits, setLast4Digits] = useState("");
  const [pseudonym, setPseudonym] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mccp_student_id");
    if (stored && stored.length === 4) {
      setLast4Digits(stored);
      verifyStudent(stored);
    }
  }, []);

  const verifyStudent = async (digits: string) => {
    setIsLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("student_pseudonyms")
      .select("pseudonym")
      .eq("last_4_digits", digits)
      .maybeSingle();

    setIsLoading(false);

    if (fetchError) {
      setError("Error verifying your ID. Please try again.");
      return;
    }

    if (data) {
      setPseudonym(data.pseudonym);
      setIsVerified(true);
      localStorage.setItem("mccp_student_id", digits);
      onStudentVerified(digits, data.pseudonym);
    } else {
      setError("Student ID not found. Please check your last 4 digits.");
    }
  };

  const handleSubmit = () => {
    if (last4Digits.length === 4 && /^\d{4}$/.test(last4Digits)) {
      verifyStudent(last4Digits);
    }
  };

  const handleReset = () => {
    setIsVerified(false);
    setPseudonym(null);
    setLast4Digits("");
    localStorage.removeItem("mccp_student_id");
  };

  if (isVerified && pseudonym) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <User className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Logged in as</p>
                <p className="text-xl font-bold text-primary">{pseudonym}</p>
                <Badge variant="outline" className="mt-1">ID: ****{last4Digits}</Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Change
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-5 w-5" />
          Enter Your Student ID
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-600" />
          Your privacy is protected - only the last 4 digits are used
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 items-center">
          <Input
            type="text"
            placeholder="Last 4 digits"
            maxLength={4}
            value={last4Digits}
            onChange={(e) => {
              setLast4Digits(e.target.value.replace(/\D/g, ""));
              setError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && last4Digits.length === 4) {
                handleSubmit();
              }
            }}
            className="max-w-32 text-center text-lg font-mono"
          />
          <Button onClick={handleSubmit} disabled={last4Digits.length !== 4 || isLoading}>
            {isLoading ? "Verifying..." : "Continue"}
          </Button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentEntry;
