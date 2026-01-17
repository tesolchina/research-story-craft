import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const HELPFUL_STAGES = [
  { id: 'brainstorming', label: 'Brainstorming & Outlining (Topic selection)' },
  { id: 'literature', label: 'Literature Review & Summarization' },
  { id: 'drafting', label: 'Drafting Content (Generating text)' },
  { id: 'editing', label: 'Editing & Proofreading (Grammar/Style)' },
  { id: 'translating', label: 'Translating (Native language to English)' },
  { id: 'coding', label: 'Coding / Data Analysis' },
  { id: 'citation', label: 'Citation Management' },
];

interface SurveyData {
  student_id: string;
  field_of_study: string;
  ai_frequency: number;
  ai_tools_used: string;
  helpful_stages: string[];
  workflow_description: string;
  ai_wishlist: string;
}

export function AIWritingSurvey() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [existingResponse, setExistingResponse] = useState<boolean>(false);
  
  // Form state
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [aiFrequency, setAiFrequency] = useState('');
  const [aiToolsUsed, setAiToolsUsed] = useState('');
  const [helpfulStages, setHelpfulStages] = useState<string[]>([]);
  const [otherStage, setOtherStage] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [aiWishlist, setAiWishlist] = useState('');

  const studentId = localStorage.getItem('mccp_student_id');
  const userType = localStorage.getItem('mccp_user_type');

  useEffect(() => {
    const checkExistingResponse = async () => {
      if (!studentId || userType !== 'student') return;

      const { data } = await supabase
        .from('survey_responses' as any)
        .select('id')
        .eq('student_id', studentId)
        .single();

      if (data) {
        setExistingResponse(true);
      }
    };

    checkExistingResponse();
  }, [studentId, userType]);

  const handleStageChange = (stageId: string, checked: boolean) => {
    if (checked) {
      setHelpfulStages([...helpfulStages, stageId]);
    } else {
      setHelpfulStages(helpfulStages.filter(s => s !== stageId));
    }
  };

  const validateForm = () => {
    if (!fieldOfStudy.trim()) return 'Please enter your field of study';
    if (!aiFrequency) return 'Please select your AI usage frequency';
    if (!aiToolsUsed.trim()) return 'Please list the AI tools you use';
    if (helpfulStages.length === 0) return 'Please select at least one helpful stage';
    if (!workflowDescription.trim()) return 'Please describe your workflow';
    if (!aiWishlist.trim()) return 'Please share what you wish AI could do better';
    return null;
  };

  const handleSubmit = async () => {
    if (!studentId || userType !== 'student') {
      navigate('/mccp/auth');
      toast.error('Please sign in as a student to submit the survey');
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const allStages = otherStage.trim() 
        ? [...helpfulStages, `other: ${otherStage}`]
        : helpfulStages;

      const surveyData: SurveyData = {
        student_id: studentId,
        field_of_study: fieldOfStudy.trim(),
        ai_frequency: parseInt(aiFrequency),
        ai_tools_used: aiToolsUsed.trim(),
        helpful_stages: allStages,
        workflow_description: workflowDescription.trim(),
        ai_wishlist: aiWishlist.trim()
      };

      const { error: insertError } = await supabase
        .from('survey_responses' as any)
        .upsert(surveyData as any, {
          onConflict: 'student_id'
        });

      if (insertError) throw insertError;

      setIsSubmitted(true);
      toast.success('Survey submitted successfully!');
    } catch (err) {
      console.error('Survey submission error:', err);
      setError('Failed to submit survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!studentId || userType !== 'student') {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert>
            <AlertDescription>
              Please <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/mccp/auth')}>sign in as a student</Button> to complete this survey.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (isSubmitted || existingResponse) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4 py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold">Thank You!</h3>
            <p className="text-muted-foreground">
              {existingResponse && !isSubmitted 
                ? 'You have already submitted this survey.' 
                : 'Your response has been recorded successfully.'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Survey on AI-Collaborative Academic Writing</CardTitle>
        <CardDescription>
          This survey aims to understand how researchers and students utilize AI tools for collaborative writing and research. Your responses will help us identify current trends in human-AI co-creation. The survey is anonymous and takes approximately 3 minutes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Field of Study */}
        <div className="space-y-2">
          <Label htmlFor="field-of-study">
            Which field of study best describes your research? <span className="text-destructive">*</span>
          </Label>
          <Input
            id="field-of-study"
            value={fieldOfStudy}
            onChange={(e) => setFieldOfStudy(e.target.value)}
            placeholder="e.g., Computer Science, Education, Linguistics"
          />
        </div>

        {/* AI Frequency */}
        <div className="space-y-3">
          <Label>
            How frequently do you use AI tools in your academic writing process? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup value={aiFrequency} onValueChange={setAiFrequency}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Never</span>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center gap-1">
                    <RadioGroupItem value={value.toString()} id={`freq-${value}`} />
                    <Label htmlFor={`freq-${value}`} className="text-sm">{value}</Label>
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">For almost every task</span>
            </div>
          </RadioGroup>
        </div>

        {/* AI Tools Used */}
        <div className="space-y-2">
          <Label htmlFor="ai-tools">
            Which AI tools or Platform do you actively use for writing or research? (List out at least 3 Tools / Platforms) <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="ai-tools"
            value={aiToolsUsed}
            onChange={(e) => setAiToolsUsed(e.target.value)}
            placeholder="e.g., ChatGPT, Claude, Grammarly, Perplexity, Notion AI..."
            rows={3}
          />
        </div>

        {/* Helpful Stages */}
        <div className="space-y-3">
          <Label>
            In which stages of the writing process do you find AI most helpful? <span className="text-destructive">*</span>
          </Label>
          <div className="space-y-2">
            {HELPFUL_STAGES.map((stage) => (
              <div key={stage.id} className="flex items-center space-x-2">
                <Checkbox
                  id={stage.id}
                  checked={helpfulStages.includes(stage.id)}
                  onCheckedChange={(checked) => handleStageChange(stage.id, checked as boolean)}
                />
                <Label htmlFor={stage.id} className="font-normal cursor-pointer">
                  {stage.label}
                </Label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="other"
                checked={!!otherStage}
                onCheckedChange={(checked) => !checked && setOtherStage('')}
              />
              <Label htmlFor="other" className="font-normal">Other:</Label>
              <Input
                value={otherStage}
                onChange={(e) => setOtherStage(e.target.value)}
                placeholder="Specify other stage..."
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Workflow Description */}
        <div className="space-y-2">
          <Label htmlFor="workflow">
            Briefly describe your workflow: How do you collaborate with AI to do academic writing? <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="workflow"
            value={workflowDescription}
            onChange={(e) => setWorkflowDescription(e.target.value)}
            placeholder='e.g., "I use ChatGPT for outlining, then search articles by Perplexity, and finally edit with Grammarly."'
            rows={4}
          />
        </div>

        {/* AI Wishlist */}
        <div className="space-y-2">
          <Label htmlFor="wishlist">
            Which specific tasks do you wish AI could handle better or more automatically? <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="wishlist"
            value={aiWishlist}
            onChange={(e) => setAiWishlist(e.target.value)}
            placeholder="Share your thoughts on what AI could improve..."
            rows={4}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="w-full gap-2"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? 'Submitting...' : 'Submit Survey'}
        </Button>
      </CardContent>
    </Card>
  );
}
