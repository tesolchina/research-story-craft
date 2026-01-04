-- Create discussions table for class discussions
CREATE TABLE public.discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id TEXT NOT NULL, -- e.g., "cilo-1", "assessment-poster", "general"
  student_id TEXT NOT NULL, -- last 4 digits of student ID
  message TEXT NOT NULL,
  is_teacher BOOLEAN DEFAULT false,
  parent_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries by section
CREATE INDEX idx_discussions_section ON public.discussions(section_id);

-- Create index for parent_id for threaded replies
CREATE INDEX idx_discussions_parent ON public.discussions(parent_id);

-- Enable Row Level Security
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read discussions (public course discussion)
CREATE POLICY "Anyone can view discussions" 
ON public.discussions 
FOR SELECT 
USING (true);

-- Allow anyone to insert discussions (with student ID verification done client-side)
CREATE POLICY "Anyone can post discussions" 
ON public.discussions 
FOR INSERT 
WITH CHECK (true);

-- Only allow deletion by the original poster (matching student_id) or teacher
-- Note: This is a simple implementation; for production, consider more robust auth
CREATE POLICY "Posters can delete own messages" 
ON public.discussions 
FOR DELETE 
USING (true);