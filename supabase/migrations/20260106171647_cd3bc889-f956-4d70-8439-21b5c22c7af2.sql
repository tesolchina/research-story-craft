-- Create table for student pseudonyms
CREATE TABLE public.student_pseudonyms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pseudonym TEXT NOT NULL,
  last_4_digits TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.student_pseudonyms ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view pseudonyms (public lookup)
CREATE POLICY "Anyone can view pseudonyms"
ON public.student_pseudonyms
FOR SELECT
USING (true);