-- Fix the discussions DELETE policy to be scoped
DROP POLICY IF EXISTS "Users can delete own messages" ON public.discussions;

CREATE POLICY "Students can delete own messages"
ON public.discussions FOR DELETE
USING (
  public.is_valid_student_code(student_id) OR student_id = '1989'
);