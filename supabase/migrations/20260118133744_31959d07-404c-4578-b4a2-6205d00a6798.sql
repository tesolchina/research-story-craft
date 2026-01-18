-- Create cars_coach_sessions table for tracking learning sessions
CREATE TABLE public.cars_coach_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id TEXT NOT NULL,
  discipline TEXT NOT NULL,
  current_phase TEXT NOT NULL DEFAULT 'discipline_selection',
  tasks_completed JSONB DEFAULT '[]'::jsonb,
  mc_responses JSONB DEFAULT '[]'::jsonb,
  short_answers JSONB DEFAULT '[]'::jsonb,
  paragraph_analysis JSONB DEFAULT NULL,
  chat_history JSONB DEFAULT '[]'::jsonb,
  learning_report JSONB DEFAULT NULL,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create student_insights table for cross-task accessible insights
CREATE TABLE public.student_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id TEXT NOT NULL,
  source_task TEXT NOT NULL,
  source_session_id UUID REFERENCES public.cars_coach_sessions(id) ON DELETE SET NULL,
  insight_text TEXT NOT NULL,
  category TEXT NOT NULL,
  is_applied BOOLEAN DEFAULT false,
  student_notes TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cars_coach_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_insights ENABLE ROW LEVEL SECURITY;

-- RLS policies for cars_coach_sessions
CREATE POLICY "Students can view own sessions"
  ON public.cars_coach_sessions FOR SELECT
  USING (is_valid_student_code(student_id));

CREATE POLICY "Students can insert own sessions"
  ON public.cars_coach_sessions FOR INSERT
  WITH CHECK (is_valid_student_code(student_id));

CREATE POLICY "Students can update own sessions"
  ON public.cars_coach_sessions FOR UPDATE
  USING (is_valid_student_code(student_id));

-- RLS policies for student_insights
CREATE POLICY "Students can view own insights"
  ON public.student_insights FOR SELECT
  USING (is_valid_student_code(student_id));

CREATE POLICY "Students can insert own insights"
  ON public.student_insights FOR INSERT
  WITH CHECK (is_valid_student_code(student_id));

CREATE POLICY "Students can update own insights"
  ON public.student_insights FOR UPDATE
  USING (is_valid_student_code(student_id));

-- Trigger for updated_at
CREATE TRIGGER update_cars_coach_sessions_updated_at
  BEFORE UPDATE ON public.cars_coach_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_student_insights_updated_at
  BEFORE UPDATE ON public.student_insights
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();