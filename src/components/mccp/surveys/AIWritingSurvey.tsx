import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle, Plus, Trash2 } from 'lucide-react';
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

interface ToolUsage {
  tool: string;
  useCase: string;
}

interface WorkflowExample {
  input: string;
  process: string;
  output: string;
}

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
  const [discipline, setDiscipline] = useState('');
  const [subField, setSubField] = useState('');
  const [aiFrequency, setAiFrequency] = useState('');
  const [toolUsages, setToolUsages] = useState<ToolUsage[]>([
    { tool: '', useCase: '' },
    { tool: '', useCase: '' },
    { tool: '', useCase: '' },
  ]);
  const [helpfulStages, setHelpfulStages] = useState<string[]>([]);
  const [otherStage, setOtherStage] = useState('');
  const [workflowExamples, setWorkflowExamples] = useState<WorkflowExample[]>([
    { input: '', process: '', output: '' },
  ]);
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

  const handleToolUsageChange = (index: number, field: keyof ToolUsage, value: string) => {
    const updated = [...toolUsages];
    updated[index][field] = value;
    setToolUsages(updated);
  };

  const addToolUsage = () => {
    if (toolUsages.length < 10) {
      setToolUsages([...toolUsages, { tool: '', useCase: '' }]);
    }
  };

  const removeToolUsage = (index: number) => {
    if (toolUsages.length > 3) {
      setToolUsages(toolUsages.filter((_, i) => i !== index));
    }
  };

  const handleWorkflowChange = (index: number, field: keyof WorkflowExample, value: string) => {
    const updated = [...workflowExamples];
    updated[index][field] = value;
    setWorkflowExamples(updated);
  };

  const addWorkflowExample = () => {
    if (workflowExamples.length < 3) {
      setWorkflowExamples([...workflowExamples, { input: '', process: '', output: '' }]);
    }
  };

  const removeWorkflowExample = (index: number) => {
    if (workflowExamples.length > 1) {
      setWorkflowExamples(workflowExamples.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    if (!discipline.trim()) return 'Please enter your academic discipline';
    if (!subField.trim()) return 'Please enter your sub-field or specialization';
    if (!aiFrequency) return 'Please select your AI usage frequency';
    
    const filledTools = toolUsages.filter(t => t.tool.trim() && t.useCase.trim());
    if (filledTools.length < 3) return 'Please provide at least 3 AI tools with their use cases';
    
    if (helpfulStages.length === 0) return 'Please select at least one helpful stage';
    
    const filledWorkflows = workflowExamples.filter(w => w.input.trim() && w.process.trim() && w.output.trim());
    if (filledWorkflows.length === 0) return 'Please provide at least one complete workflow example (input, process, and output)';
    
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

      // Format tools as structured string
      const toolsFormatted = toolUsages
        .filter(t => t.tool.trim() && t.useCase.trim())
        .map(t => `${t.tool}: ${t.useCase}`)
        .join('\n');

      // Format workflow examples
      const workflowFormatted = workflowExamples
        .filter(w => w.input.trim() || w.process.trim() || w.output.trim())
        .map((w, i) => `Example ${i + 1}:\nInput: ${w.input}\nProcess: ${w.process}\nOutput: ${w.output}`)
        .join('\n\n');

      const surveyData: SurveyData = {
        student_id: studentId,
        field_of_study: `${discipline.trim()} - ${subField.trim()}`,
        ai_frequency: parseInt(aiFrequency),
        ai_tools_used: toolsFormatted,
        helpful_stages: allStages,
        workflow_description: workflowFormatted,
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
          This survey aims to understand how researchers and students utilize AI tools for collaborative writing and research. Your responses will help us identify current trends in human-AI co-creation. The survey is anonymous and takes approximately 5 minutes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Discipline and Sub-field */}
        <div className="space-y-4">
          <Label className="text-base font-medium">
            What is your academic discipline and area of specialization? <span className="text-destructive">*</span>
          </Label>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discipline" className="text-sm text-muted-foreground">
                Primary Discipline
              </Label>
              <Input
                id="discipline"
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                placeholder="e.g., Linguistics, Education, Computer Science"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sub-field" className="text-sm text-muted-foreground">
                Sub-field / Specialization
              </Label>
              <Input
                id="sub-field"
                value={subField}
                onChange={(e) => setSubField(e.target.value)}
                placeholder="e.g., Applied Linguistics, TESOL, NLP"
              />
            </div>
          </div>
        </div>

        {/* AI Frequency */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
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

        {/* AI Tools Used - Two Column Layout */}
        <div className="space-y-4">
          <Label className="text-base font-medium">
            Which AI tools or platforms do you actively use for writing or research? <span className="text-destructive">*</span>
          </Label>
          <p className="text-sm text-muted-foreground">
            Please list at least 3 tools and describe the primary purpose for which you use each one.
          </p>
          
          <div className="space-y-3">
            <div className="grid grid-cols-[1fr_1fr_40px] gap-2 text-sm font-medium text-muted-foreground">
              <span>Tool / Platform</span>
              <span>Primary Use Case</span>
              <span></span>
            </div>
            
            {toolUsages.map((usage, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_40px] gap-2 items-center">
                <Input
                  value={usage.tool}
                  onChange={(e) => handleToolUsageChange(index, 'tool', e.target.value)}
                  placeholder="e.g., ChatGPT, Grammarly"
                />
                <Input
                  value={usage.useCase}
                  onChange={(e) => handleToolUsageChange(index, 'useCase', e.target.value)}
                  placeholder="e.g., Drafting paragraphs, Grammar check"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeToolUsage(index)}
                  disabled={toolUsages.length <= 3}
                  className="h-9 w-9"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
            
            {toolUsages.length < 10 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addToolUsage}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Another Tool
              </Button>
            )}
          </div>
        </div>

        {/* Helpful Stages */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
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

        {/* Workflow Description - Input/Process/Output */}
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">
              Describe your AI collaboration workflow using the Input → Process → Output framework <span className="text-destructive">*</span>
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Please provide up to 3 examples of how you collaborate with AI in your academic writing. Each example should include:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 ml-4 list-disc space-y-1">
              <li><strong>Input:</strong> What you provide to the AI (e.g., a draft paragraph, teacher feedback, research notes)</li>
              <li><strong>Process:</strong> What you ask the AI to do (e.g., revise based on feedback, summarize, check grammar)</li>
              <li><strong>Output:</strong> What result you expect (e.g., a revised paragraph with explanations, a summary)</li>
            </ul>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg border">
            <p className="text-sm font-medium mb-2">Example:</p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Input:</strong> A paragraph I wrote + teacher's comment suggesting more specific examples</p>
              <p><strong>Process:</strong> Ask AI to revise the paragraph incorporating more concrete examples while maintaining my voice</p>
              <p><strong>Output:</strong> A revised paragraph with added examples and brief explanations of the changes made</p>
            </div>
          </div>

          {workflowExamples.map((example, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3 bg-background">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Workflow Example {index + 1}</span>
                {workflowExamples.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeWorkflowExample(index)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Input (What do you provide to the AI?)</Label>
                  <Textarea
                    value={example.input}
                    onChange={(e) => handleWorkflowChange(index, 'input', e.target.value)}
                    placeholder="Describe what materials or content you give to the AI..."
                    rows={2}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Process (What do you ask the AI to do?)</Label>
                  <Textarea
                    value={example.process}
                    onChange={(e) => handleWorkflowChange(index, 'process', e.target.value)}
                    placeholder="Describe the task or instruction you give to the AI..."
                    rows={2}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Output (What result do you expect?)</Label>
                  <Textarea
                    value={example.output}
                    onChange={(e) => handleWorkflowChange(index, 'output', e.target.value)}
                    placeholder="Describe the expected outcome from the AI..."
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}

          {workflowExamples.length < 3 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addWorkflowExample}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Another Workflow Example
            </Button>
          )}
        </div>

        {/* AI Wishlist */}
        <div className="space-y-2">
          <Label htmlFor="wishlist" className="text-base font-medium">
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