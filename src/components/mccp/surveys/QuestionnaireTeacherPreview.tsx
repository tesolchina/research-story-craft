/**
 * QuestionnaireTeacherPreview.tsx
 * 
 * Read-only preview of the questionnaire for teachers
 * Shows all questions without ability to answer
 */

import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  ClipboardList, 
  ExternalLink,
  Lock
} from 'lucide-react';

const HELPFUL_STAGES = [
  { id: 'ideation', label: 'Idea Generation & Topic Selection' },
  { id: 'literature', label: 'Literature Search & Synthesis' },
  { id: 'outlining', label: 'Outlining & Structuring Content' },
  { id: 'drafting', label: 'Drafting & Content Generation' },
  { id: 'revision', label: 'Revision & Editing' },
  { id: 'proofreading', label: 'Proofreading (Grammar, Style, Mechanics)' },
  { id: 'translation', label: 'Translation (L1 → English)' },
  { id: 'data-analysis', label: 'Data Analysis & Coding' },
  { id: 'citation', label: 'Citation & Reference Management' },
];

export default function QuestionnaireTeacherPreview() {
  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                Survey on AI-Collaborative Academic Writing
                <Badge variant="secondary">Teacher View</Badge>
              </CardTitle>
              <CardDescription>
                Preview of the survey questions students will answer
              </CardDescription>
            </div>
          </div>
          <Button asChild>
            <Link to="/mccp/dashboard">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Student Responses
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-center gap-3">
          <Lock className="h-5 w-5 text-amber-600" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            <strong>Read-only Preview:</strong> This is how the survey appears to students. 
            View submitted responses in the Dashboard.
          </p>
        </div>

        {/* Question 1: Discipline */}
        <div className="space-y-4 opacity-75 pointer-events-none">
          <Label className="text-base font-medium">
            1. What is your academic discipline and area of specialization? <span className="text-destructive">*</span>
          </Label>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Primary Discipline</Label>
              <Input placeholder="e.g., Linguistics, Education, Computer Science" disabled />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Sub-field / Specialization</Label>
              <Input placeholder="e.g., Applied Linguistics, TESOL, NLP" disabled />
            </div>
          </div>
        </div>

        {/* Question 2: AI Frequency */}
        <div className="space-y-3 opacity-75 pointer-events-none">
          <Label className="text-base font-medium">
            2. How frequently do you use AI tools in your academic writing process? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup disabled>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Never</span>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center gap-1">
                    <RadioGroupItem value={value.toString()} id={`freq-${value}`} disabled />
                    <Label className="text-sm">{value}</Label>
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">For almost every task</span>
            </div>
          </RadioGroup>
        </div>

        {/* Question 3: AI Tools */}
        <div className="space-y-4 opacity-75 pointer-events-none">
          <Label className="text-base font-medium">
            3. Which AI tools or platforms do you actively use for writing or research? <span className="text-destructive">*</span>
          </Label>
          <p className="text-sm text-muted-foreground">
            Students list at least 3 tools and describe the primary purpose for each one.
          </p>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <Input placeholder="Tool / Platform" disabled />
                <Input placeholder="Primary Use Case" disabled />
              </div>
            ))}
          </div>
        </div>

        {/* Question 4: Helpful Stages */}
        <div className="space-y-3 opacity-75 pointer-events-none">
          <Label className="text-base font-medium">
            4. In which stages of the writing process do you find AI most helpful? <span className="text-destructive">*</span>
          </Label>
          <div className="space-y-2">
            {HELPFUL_STAGES.map((stage) => (
              <div key={stage.id} className="flex items-center space-x-2">
                <Checkbox id={stage.id} disabled />
                <Label className="font-normal">{stage.label}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Question 5: Workflow */}
        <div className="space-y-4 opacity-75 pointer-events-none">
          <Label className="text-base font-medium">
            5. Describe your AI collaboration workflow using the Input → Process → Output framework <span className="text-destructive">*</span>
          </Label>
          <p className="text-sm text-muted-foreground">
            Students provide up to 3 examples of how they collaborate with AI in their academic writing.
          </p>
          <div className="space-y-3">
            <Textarea placeholder="Input: What you provide to the AI..." disabled rows={2} />
            <Textarea placeholder="Process: What you ask the AI to do..." disabled rows={2} />
            <Textarea placeholder="Output: What result you expect..." disabled rows={2} />
          </div>
        </div>

        {/* Question 6: AI Wishlist */}
        <div className="space-y-3 opacity-75 pointer-events-none">
          <Label className="text-base font-medium">
            6. What do you wish AI tools could do better for academic writing? <span className="text-destructive">*</span>
          </Label>
          <Textarea 
            placeholder="Share any features, capabilities, or improvements you'd like to see..."
            disabled
            rows={4}
          />
        </div>

        <div className="flex justify-center pt-4 border-t">
          <Button asChild size="lg">
            <Link to="/mccp/dashboard">
              <ExternalLink className="h-4 w-4 mr-2" />
              Go to Dashboard to View Student Responses
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
