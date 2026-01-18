-- Create chat_sessions table
CREATE TABLE public.chat_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by text NOT NULL,
  topic text NOT NULL,
  agenda jsonb DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'ended')),
  is_student_led boolean NOT NULL DEFAULT false,
  max_participants integer NOT NULL DEFAULT 50,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  ended_at timestamp with time zone
);

-- Create chat_messages table
CREATE TABLE public.chat_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  sender_type text NOT NULL CHECK (sender_type IN ('student', 'teacher', 'ai_expert', 'ai_peer_john', 'ai_peer_karen')),
  sender_id text,
  sender_name text NOT NULL,
  content text NOT NULL,
  is_queued boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create chat_participants table
CREATE TABLE public.chat_participants (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  student_id text NOT NULL,
  display_name text NOT NULL,
  is_teacher boolean NOT NULL DEFAULT false,
  joined_at timestamp with time zone NOT NULL DEFAULT now(),
  left_at timestamp with time zone,
  UNIQUE(session_id, student_id)
);

-- Enable RLS on all tables
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_participants ENABLE ROW LEVEL SECURITY;

-- RLS policies for chat_sessions
CREATE POLICY "Anyone can view chat sessions"
  ON public.chat_sessions FOR SELECT
  USING (true);

CREATE POLICY "Teachers can create sessions"
  ON public.chat_sessions FOR INSERT
  WITH CHECK (created_by = '1989' OR is_student_led = true);

CREATE POLICY "Teachers can update sessions"
  ON public.chat_sessions FOR UPDATE
  USING (created_by = '1989' OR is_student_led = true);

-- RLS policies for chat_messages
CREATE POLICY "Anyone can view messages"
  ON public.chat_messages FOR SELECT
  USING (true);

CREATE POLICY "Valid users can send messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (
    sender_type IN ('ai_expert', 'ai_peer_john', 'ai_peer_karen') OR
    sender_id = '1989' OR
    is_valid_student_code(sender_id)
  );

-- RLS policies for chat_participants
CREATE POLICY "Anyone can view participants"
  ON public.chat_participants FOR SELECT
  USING (true);

CREATE POLICY "Valid students can join"
  ON public.chat_participants FOR INSERT
  WITH CHECK (student_id = '1989' OR is_valid_student_code(student_id));

CREATE POLICY "Participants can update own record"
  ON public.chat_participants FOR UPDATE
  USING (student_id = '1989' OR is_valid_student_code(student_id));

-- Enable realtime for chat tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_participants;

-- Create indexes for performance
CREATE INDEX idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON public.chat_messages(created_at);
CREATE INDEX idx_chat_participants_session_id ON public.chat_participants(session_id);
CREATE INDEX idx_chat_sessions_status ON public.chat_sessions(status);