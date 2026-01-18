-- Drop the old function and recreate with mccp_students
DROP FUNCTION IF EXISTS public.get_teacher_dashboard_data(text, text);

CREATE OR REPLACE FUNCTION public.get_teacher_dashboard_data(p_email text, p_password text)
RETURNS TABLE(
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
SET search_path TO 'public'
AS $$
BEGIN
  -- Verify teacher credentials first
  IF NOT public.verify_teacher_login(p_email, p_password) THEN
    RAISE EXCEPTION 'Invalid teacher credentials';
  END IF;
  
  -- Return joined data using mccp_students table
  RETURN QUERY
  SELECT 
    ms.display_name as pseudonym,
    ms.last_4_digits,
    prog.student_id,
    prog.task_id,
    prog.task_type,
    prog.answer,
    prog.ai_feedback,
    prog.is_correct,
    prog.score,
    prog.updated_at
  FROM public.mccp_students ms
  LEFT JOIN public.students_progress prog ON ms.last_4_digits = prog.student_id
  ORDER BY ms.display_name, prog.updated_at DESC;
END;
$$;