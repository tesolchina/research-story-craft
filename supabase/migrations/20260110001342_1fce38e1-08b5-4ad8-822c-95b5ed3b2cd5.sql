-- =====================================================
-- FIX 1: Remove public access to students table
-- Create secure RPC for name lookups
-- =====================================================

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view students" ON public.students;

-- Create a secure function to get student names by their codes
-- This returns a batch of names for given student codes (for discussion board)
CREATE OR REPLACE FUNCTION public.get_student_names_for_discussions(p_student_ids text[])
RETURNS TABLE(student_code text, name text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT s.student_code, s.name 
  FROM public.students s
  WHERE s.student_code = ANY(p_student_ids);
$$;

-- =====================================================
-- FIX 2: Add rate limiting to teacher login
-- =====================================================

-- Create login attempts tracking table
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  success BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS on login_attempts (no public access)
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Create index for efficient rate limit queries
CREATE INDEX IF NOT EXISTS idx_login_attempts_email_time 
ON public.login_attempts(email, attempted_at DESC);

-- Update verify_teacher_login with rate limiting
CREATE OR REPLACE FUNCTION public.verify_teacher_login(
  p_email text, 
  p_password text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_attempt_count INTEGER;
  v_result BOOLEAN;
BEGIN
  -- Check recent failed attempts (last 15 minutes)
  SELECT COUNT(*) INTO v_attempt_count
  FROM public.login_attempts
  WHERE email = lower(p_email)
  AND attempted_at > (now() - INTERVAL '15 minutes')
  AND success = false;
  
  -- Rate limit: max 5 failed attempts per 15 minutes
  IF v_attempt_count >= 5 THEN
    RAISE EXCEPTION 'Too many login attempts. Please try again in 15 minutes.';
  END IF;
  
  -- Verify password
  v_result := EXISTS (
    SELECT 1 FROM public.teacher_credentials
    WHERE email = lower(p_email)
    AND password_hash = crypt(p_password, password_hash)
  );
  
  -- Log this attempt
  INSERT INTO public.login_attempts (email, success) 
  VALUES (lower(p_email), v_result);
  
  -- Clean up old attempts (older than 1 hour)
  DELETE FROM public.login_attempts 
  WHERE attempted_at < (now() - INTERVAL '1 hour');
  
  RETURN v_result;
END;
$$;