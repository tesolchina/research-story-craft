-- Create students_progress table for tracking task completion
CREATE TABLE public.students_progress (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id TEXT NOT NULL,
    task_id TEXT NOT NULL,
    task_type TEXT NOT NULL CHECK (task_type IN ('mc', 'writing')),
    answer JSONB,
    ai_feedback TEXT,
    is_correct BOOLEAN,
    score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(student_id, task_id)
);

-- Enable RLS
ALTER TABLE public.students_progress ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view progress (for teacher dashboard)
CREATE POLICY "Anyone can view progress"
ON public.students_progress
FOR SELECT
USING (true);

-- Allow anyone to insert progress (students identified by student_id)
CREATE POLICY "Anyone can insert progress"
ON public.students_progress
FOR INSERT
WITH CHECK (true);

-- Allow anyone to update their own progress
CREATE POLICY "Anyone can update progress"
ON public.students_progress
FOR UPDATE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_students_progress_updated_at
BEFORE UPDATE ON public.students_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_progress_updated_at();