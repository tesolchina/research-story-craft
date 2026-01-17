import { GraduationCap, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RoleSelectionProps {
  onSelectRole: (role: 'teacher' | 'student') => void;
}

export function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Welcome to MCCP6020</h1>
        <p className="text-muted-foreground">Please select your role to continue</p>
      </div>

      <div className="grid gap-4">
        <Card 
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => onSelectRole('teacher')}
        >
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-3 rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Teacher / Staff</CardTitle>
              <CardDescription>
                Sign in with your email to access teaching tools
              </CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card 
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => onSelectRole('student')}
        >
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-3 rounded-full bg-secondary">
              <GraduationCap className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">Student</CardTitle>
              <CardDescription>
                Quick registration with your student ID. No email or password needed.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
