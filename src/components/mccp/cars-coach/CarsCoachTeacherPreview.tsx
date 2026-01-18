/**
 * CarsCoachTeacherPreview.tsx
 * 
 * Read-only preview of the CARS Coach flow for teachers
 * Shows all tasks with descriptions and link to dashboard
 */

import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  CheckCircle2, 
  Circle, 
  ExternalLink,
  BookOpen,
  HelpCircle,
  FileText,
  MessageSquare,
  Target,
  Award
} from 'lucide-react';
import { TASKS } from './types';

const TASK_ICONS: Record<string, React.ElementType> = {
  discipline: Target,
  intro: BookOpen,
  mc: HelpCircle,
  examples: FileText,
  short_answers: MessageSquare,
  analysis: FileText,
  reflection: MessageSquare,
  summary: Award,
};

const TASK_DESCRIPTIONS: Record<string, string> = {
  discipline: 'Students select their academic discipline to receive field-specific examples and guidance throughout the CARS model learning journey.',
  intro: 'Introduction to the CARS (Create A Research Space) model by John Swales. Students learn about Move 1 (Establishing Territory), Move 2 (Establishing a Niche), and Move 3 (Occupying the Niche).',
  mc: 'Multiple-choice questions to check student understanding of the core CARS concepts, including identifying moves and their rhetorical purposes.',
  examples: 'Students study annotated examples of research article introductions, with highlighted moves and steps from their chosen discipline.',
  short_answers: 'Guided learning questions where students explain CARS concepts in their own words and receive AI feedback on their responses.',
  analysis: 'Students analyze a paragraph from their own research or a provided sample, identifying CARS moves and steps with AI guidance.',
  reflection: 'Final reflection where students share key takeaways and how they plan to apply CARS model insights to their own writing.',
  summary: 'Learning summary with personalized insights, accuracy scores, and actionable recommendations for improving research introductions.',
};

export default function CarsCoachTeacherPreview() {
  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                🎓 CARS Coach - Task Overview
                <Badge variant="secondary">Teacher View</Badge>
              </CardTitle>
              <CardDescription>
                Preview of the AI tutor learning flow for students
              </CardDescription>
            </div>
          </div>
          <Button asChild>
            <Link to="/mccp/dashboard">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Student Progress
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 border rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            <strong>About CARS Coach:</strong> An AI-powered tutor that guides students through 
            John Swales' CARS (Create A Research Space) model for writing research article introductions. 
            Students complete 8 tasks with personalized feedback based on their academic discipline.
          </p>
        </div>

        <div className="space-y-3">
          {TASKS.map((task, index) => {
            const Icon = TASK_ICONS[task.id] || Circle;
            return (
              <div 
                key={task.id} 
                className="flex gap-4 p-4 bg-background border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      Task {task.number}
                    </Badge>
                    <h4 className="font-medium">{task.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {TASK_DESCRIPTIONS[task.id]}
                  </p>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      Phase: {task.phase.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center pt-4">
          <Button asChild size="lg">
            <Link to="/mccp/dashboard">
              <ExternalLink className="h-4 w-4 mr-2" />
              Go to Dashboard to View Student Submissions
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
