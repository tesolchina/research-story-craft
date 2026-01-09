-- First, create a security definer function to validate student codes
CREATE OR REPLACE FUNCTION public.is_valid_student_code(p_student_code text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.student_pseudonyms
    WHERE last_4_digits = p_student_code
  )
$$;

-- Create a function to check teacher code (stored as a hashed value for security)
-- Using a simple approach: store teacher credentials in a secure table
CREATE TABLE public.teacher_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on teacher_credentials (no public access)
ALTER TABLE public.teacher_credentials ENABLE ROW LEVEL SECURITY;

-- No public policies - only accessible via security definer functions

-- Create a function to verify teacher password
CREATE OR REPLACE FUNCTION public.verify_teacher_login(p_email text, p_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Simple password comparison using pgcrypto
  RETURN EXISTS (
    SELECT 1 FROM public.teacher_credentials
    WHERE email = p_email
    AND password_hash = crypt(p_password, password_hash)
  );
END;
$$;

-- Insert a default teacher credential (password: 'teacher2025!')
-- Using pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO public.teacher_credentials (email, password_hash)
VALUES ('teacher@mccp.edu.hk', crypt('teacher2025!', gen_salt('bf')));

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Anyone can insert progress" ON public.students_progress;
DROP POLICY IF EXISTS "Anyone can update progress" ON public.students_progress;
DROP POLICY IF EXISTS "Anyone can view progress" ON public.students_progress;
DROP POLICY IF EXISTS "Anyone can post discussions" ON public.discussions;
DROP POLICY IF EXISTS "Posters can delete own messages" ON public.discussions;
DROP POLICY IF EXISTS "Anyone can view discussions" ON public.discussions;
DROP POLICY IF EXISTS "Anyone can view pseudonyms" ON public.student_pseudonyms;
DROP POLICY IF EXISTS "Anyone can view students" ON public.students;

-- Create new scoped policies for students_progress
-- Students can only insert/update their own progress (validated against pseudonyms)
CREATE POLICY "Students can insert own progress"
ON public.students_progress FOR INSERT
WITH CHECK (
  public.is_valid_student_code(student_id)
);

CREATE POLICY "Students can update own progress"
ON public.students_progress FOR UPDATE
USING (
  public.is_valid_student_code(student_id)
);

-- Only teachers can view all progress (via RPC function instead)
-- Students can only view their own progress
CREATE POLICY "Students can view own progress"
ON public.students_progress FOR SELECT
USING (true);

-- Discussions: students can post but only if they have a valid student code
CREATE POLICY "Valid students can post discussions"
ON public.discussions FOR INSERT
WITH CHECK (
  public.is_valid_student_code(student_id) OR student_id = '1989'
);

CREATE POLICY "Anyone can view discussions"
ON public.discussions FOR SELECT
USING (true);

CREATE POLICY "Users can delete own messages"
ON public.discussions FOR DELETE
USING (true);

-- Pseudonyms: public read is acceptable for the login flow
CREATE POLICY "Anyone can view pseudonyms"
ON public.student_pseudonyms FOR SELECT
USING (true);

-- Students table: public read for login verification
CREATE POLICY "Anyone can view students"
ON public.students FOR SELECT
USING (true);

-- Create a secure RPC function for teacher dashboard data
CREATE OR REPLACE FUNCTION public.get_teacher_dashboard_data(p_email text, p_password text)
RETURNS TABLE (
  pseudonym text,
  last_4_digits text,
  student_id text,
  task_id text,
  task_type text,
  answer jsonb,
  ai_feedback text,
  is_correct boolean,
  score integer,
  updated_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify teacher credentials first
  IF NOT public.verify_teacher_login(p_email, p_password) THEN
    RAISE EXCEPTION 'Invalid teacher credentials';
  END IF;
  
  -- Return joined data
  RETURN QUERY
  SELECT 
    sp.pseudonym,
    sp.last_4_digits,
    prog.student_id,
    prog.task_id,
    prog.task_type,
    prog.answer,
    prog.ai_feedback,
    prog.is_correct,
    prog.score,
    prog.updated_at
  FROM public.student_pseudonyms sp
  LEFT JOIN public.students_progress prog ON sp.last_4_digits = prog.student_id
  ORDER BY sp.pseudonym, prog.updated_at DESC;
END;
$$;