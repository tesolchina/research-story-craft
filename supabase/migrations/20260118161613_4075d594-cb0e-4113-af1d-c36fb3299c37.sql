-- Add context_prompt field to chat_sessions for teacher-editable system context
ALTER TABLE public.chat_sessions 
ADD COLUMN context_prompt TEXT DEFAULT NULL;

-- Add a comment explaining the field
COMMENT ON COLUMN public.chat_sessions.context_prompt IS 'Teacher-editable context/instructions that AI personas should be aware of';