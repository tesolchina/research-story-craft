-- Add RLS policies for chat tables
-- These tables use a custom student login system, not Supabase Auth
-- So we need permissive policies for anon role

-- chat_sessions policies
CREATE POLICY "Allow anyone to read active sessions" 
ON public.chat_sessions FOR SELECT 
USING (true);

CREATE POLICY "Allow anyone to insert sessions" 
ON public.chat_sessions FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anyone to update sessions" 
ON public.chat_sessions FOR UPDATE 
USING (true);

-- chat_participants policies  
CREATE POLICY "Allow anyone to read participants" 
ON public.chat_participants FOR SELECT 
USING (true);

CREATE POLICY "Allow anyone to join sessions" 
ON public.chat_participants FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anyone to update participants" 
ON public.chat_participants FOR UPDATE 
USING (true);

-- chat_messages policies
CREATE POLICY "Allow anyone to read messages" 
ON public.chat_messages FOR SELECT 
USING (true);

CREATE POLICY "Allow anyone to send messages" 
ON public.chat_messages FOR INSERT 
WITH CHECK (true);