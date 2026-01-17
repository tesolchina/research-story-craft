import { UserCheck, UserPlus, ArrowLeft } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StudentAccessProps {
  onSelectAccess: (access: 'returning' | 'new') => void;
  onBack: () => void;
}

export function StudentAccess({ onSelectAccess, onBack }: StudentAccessProps) {
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Student Access</h1>
        <p className="text-muted-foreground">How would you like to continue?</p>
      </div>

      <div className="grid gap-4">
        <Card 
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => onSelectAccess('returning')}
        >
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-3 rounded-full bg-primary/10">
              <UserCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Welcome back!</CardTitle>
              <CardDescription>
                I already have my unique ID
              </CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card 
          className="cursor-pointer hover:border-primary transition-colors"
          onClick={() => onSelectAccess('new')}
        >
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-3 rounded-full bg-secondary">
              <UserPlus className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">I'm new here</CardTitle>
              <CardDescription>
                Register with my student ID to get started
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
