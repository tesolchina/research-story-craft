-- Drop and recreate the verify_teacher_login function with proper pgcrypto reference
DROP FUNCTION IF EXISTS public.verify_teacher_login(text, text);

CREATE OR REPLACE FUNCTION public.verify_teacher_login(p_email text, p_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_attempt_count INTEGER;
  v_result BOOLEAN;
  v_stored_hash TEXT;
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
  
  -- Get stored password hash
  SELECT password_hash INTO v_stored_hash
  FROM public.teacher_credentials
  WHERE email = lower(p_email);
  
  -- Verify password using extensions.crypt
  IF v_stored_hash IS NOT NULL THEN
    v_result := (v_stored_hash = extensions.crypt(p_password, v_stored_hash));
  ELSE
    v_result := false;
  END IF;
  
  -- Log this attempt
  INSERT INTO public.login_attempts (email, success) 
  VALUES (lower(p_email), v_result);
  
  -- Clean up old attempts (older than 1 hour)
  DELETE FROM public.login_attempts 
  WHERE attempted_at < (now() - INTERVAL '1 hour');
  
  RETURN v_result;
END;
$$;