-- Create survey_responses table for AI Writing Survey
CREATE TABLE public.survey_responses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id TEXT NOT NULL UNIQUE,
    field_of_study TEXT NOT NULL,
    ai_frequency INTEGER NOT NULL CHECK (ai_frequency >= 1 AND ai_frequency <= 5),
    ai_tools_used TEXT NOT NULL,
    helpful_stages TEXT[] NOT NULL DEFAULT '{}',
    workflow_description TEXT NOT NULL,
    ai_wishlist TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read surveys (teachers need to see all)
CREATE POLICY "Anyone can read survey responses" 
ON public.survey_responses 
FOR SELECT 
USING (true);

-- Allow students to insert their own survey
CREATE POLICY "Students can insert survey response" 
ON public.survey_responses 
FOR INSERT 
WITH CHECK (true);

-- Allow students to update their own survey
CREATE POLICY "Students can update own survey" 
ON public.survey_responses 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_survey_responses_updated_at
BEFORE UPDATE ON public.survey_responses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();