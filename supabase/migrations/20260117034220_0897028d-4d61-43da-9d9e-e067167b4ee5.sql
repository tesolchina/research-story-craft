-- Create update_updated_at_column function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create mccp_students table for student registration
CREATE TABLE public.mccp_students (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    unique_id TEXT NOT NULL UNIQUE,
    last_4_digits TEXT NOT NULL,
    first_initial TEXT NOT NULL,
    last_initial TEXT NOT NULL,
    section TEXT,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.mccp_students ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read students (for login verification)
CREATE POLICY "Anyone can read mccp_students" 
ON public.mccp_students 
FOR SELECT 
USING (true);

-- Allow anyone to insert (for registration)
CREATE POLICY "Anyone can register as mccp_student" 
ON public.mccp_students 
FOR INSERT 
WITH CHECK (true);

-- Anyone can update students (for settings page)
CREATE POLICY "Anyone can update mccp_students" 
ON public.mccp_students 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_mccp_students_updated_at
BEFORE UPDATE ON public.mccp_students
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();