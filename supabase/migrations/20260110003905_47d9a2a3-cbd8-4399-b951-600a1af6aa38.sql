-- Fix 1: Add database constraints for discussions table
-- Enforce student_id format (4 digits or teacher code '1989')
ALTER TABLE public.discussions
  ADD CONSTRAINT discussions_student_id_format 
  CHECK (
    student_id ~ '^[0-9]{4}$' OR student_id = '1989'
  );

-- Enforce message length limit (1-1000 characters)
ALTER TABLE public.discussions
  ADD CONSTRAINT discussions_message_length 
  CHECK (
    char_length(message) > 0 
    AND char_length(message) <= 1000
  );

-- Enforce section_id whitelist
ALTER TABLE public.discussions
  ADD CONSTRAINT discussions_valid_section 
  CHECK (
    section_id IN (
      'week1-ai-agent-overview',
      'week2-intro-methods', 
      'week2-centrality',
      'week3-lit-review',
      'week3-paraphrasing',
      'week4-critical-evaluation',
      'general'
    )
  );

-- Fix 2: Add constraint to students_progress table
ALTER TABLE public.students_progress
  ADD CONSTRAINT students_progress_student_id_format
  CHECK (student_id ~ '^[0-9]{4}$');

-- Fix 3: Update DELETE policy to only allow teacher deletion (since there's no auth system)
-- Drop existing policy that allows any valid student to delete any message
DROP POLICY IF EXISTS "Students can delete own messages" ON public.discussions;

-- Create new policy that only allows teacher (code '1989') to delete messages
CREATE POLICY "Only teacher can delete messages"
ON public.discussions FOR DELETE
USING (student_id = '1989');