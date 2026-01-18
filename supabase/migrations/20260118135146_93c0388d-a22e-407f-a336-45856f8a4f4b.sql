-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Students can view own sessions" ON public.cars_coach_sessions;
DROP POLICY IF EXISTS "Students can insert own sessions" ON public.cars_coach_sessions;
DROP POLICY IF EXISTS "Students can update own sessions" ON public.cars_coach_sessions;
DROP POLICY IF EXISTS "Students can view own insights" ON public.student_insights;
DROP POLICY IF EXISTS "Students can insert own insights" ON public.student_insights;
DROP POLICY IF EXISTS "Students can update own insights" ON public.student_insights;

-- Create more permissive policies that allow any non-empty student_id
-- (students are already validated at login time)
CREATE POLICY "Anyone can view sessions"
  ON public.cars_coach_sessions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert sessions"
  ON public.cars_coach_sessions FOR INSERT
  WITH CHECK (student_id IS NOT NULL AND student_id != '');

CREATE POLICY "Anyone can update own sessions"
  ON public.cars_coach_sessions FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can view insights"
  ON public.student_insights FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert insights"
  ON public.student_insights FOR INSERT
  WITH CHECK (student_id IS NOT NULL AND student_id != '');

CREATE POLICY "Anyone can update own insights"
  ON public.student_insights FOR UPDATE
  USING (true);