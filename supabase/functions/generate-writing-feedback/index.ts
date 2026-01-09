import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation
const ALLOWED_TASK_TYPES = ['centrality_statement', 'paraphrase'];
const MIN_TEXT_LENGTH = 10;
const MAX_TEXT_LENGTH = 5000;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, taskType, taskContext, studentId } = await req.json();

    // Validate required fields
    if (!text || typeof text !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid required field: text' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!taskType || typeof taskType !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid required field: taskType' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate text length
    const trimmedText = text.trim();
    if (trimmedText.length < MIN_TEXT_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Text must be at least ${MIN_TEXT_LENGTH} characters` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (trimmedText.length > MAX_TEXT_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Text must be no more than ${MAX_TEXT_LENGTH} characters` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate taskType is in allowed list
    if (!ALLOWED_TASK_TYPES.includes(taskType)) {
      return new Response(
        JSON.stringify({ error: 'Invalid task type. Must be one of: ' + ALLOWED_TASK_TYPES.join(', ') }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate studentId if provided (for rate limiting)
    if (studentId) {
      // Create Supabase client for validation
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Validate student exists
      const { data: studentExists, error: studentError } = await supabase.rpc('is_valid_student_code', {
        p_student_code: studentId
      });

      if (studentError || !studentExists) {
        console.log('Invalid student code attempted:', studentId);
        return new Response(
          JSON.stringify({ error: 'Invalid student code' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Rate limiting: Check recent feedback requests for this student
      const { count, error: countError } = await supabase
        .from('students_progress')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', studentId)
        .eq('task_type', 'writing')
        .not('ai_feedback', 'is', null)
        .gte('updated_at', new Date(Date.now() - 60000).toISOString()); // Last minute

      if (!countError && count !== null && count >= 5) {
        console.log('Rate limit exceeded for student:', studentId);
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please wait a moment before submitting again.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not set');
      throw new Error('Server configuration error');
    }

    let systemPrompt = '';
    
    if (taskType === 'centrality_statement') {
      systemPrompt = `You are an academic writing tutor specializing in thesis and journal article writing. 
      
Your task is to provide constructive feedback on a student's centrality statement for their research introduction.

Evaluate the writing based on:
1. **Rhetorical effectiveness**: Does it establish the importance/centrality of the research topic?
2. **Language features**: Appropriate use of present tense, evaluative adjectives (e.g., "important", "crucial", "significant")
3. **CARS Model alignment**: Does it follow Move 1 (Establishing a territory) conventions?
4. **Clarity and conciseness**: Is the statement clear and well-structured?

Provide:
- 2-3 specific strengths
- 2-3 areas for improvement with concrete suggestions
- An example of how to improve one sentence (if applicable)

Keep feedback encouraging but specific. Use simple language suitable for non-native English speakers.`;
    } else if (taskType === 'paraphrase') {
      systemPrompt = `You are an academic writing tutor specializing in literature review writing.

Your task is to provide constructive feedback on a student's paraphrase or synthesis of academic sources.

Evaluate the writing based on:
1. **Paraphrasing quality**: Has the student truly rephrased the ideas in their own words?
2. **Meaning preservation**: Is the original meaning accurately conveyed?
3. **Academic voice**: Is the tone appropriately academic?
4. **Synthesis skills**: (if applicable) Are multiple sources integrated effectively?
5. **Citation awareness**: Does the student show understanding of when/how to cite?

Provide:
- 2-3 specific strengths
- 2-3 areas for improvement with concrete suggestions
- A tip for avoiding unintentional plagiarism

Keep feedback encouraging but specific. Use simple language suitable for non-native English speakers.`;
    } else {
      systemPrompt = `You are an academic writing tutor. Provide constructive feedback on the student's writing, focusing on clarity, academic voice, and structure. Be encouraging but specific.`;
    }

    // Sanitize taskContext if provided
    const sanitizedContext = taskContext ? String(taskContext).slice(0, 2000) : undefined;
    
    const userPrompt = sanitizedContext 
      ? `Context: ${sanitizedContext}\n\nStudent's writing:\n"${trimmedText}"\n\nPlease provide detailed feedback.`
      : `Student's writing:\n"${trimmedText}"\n\nPlease provide detailed feedback.`;

    console.log('Processing feedback request for taskType:', taskType, 'textLength:', trimmedText.length);
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error('AI service temporarily unavailable');
    }

    const data = await response.json();
    const feedback = data.choices[0].message.content;

    console.log('Feedback generated successfully');

    return new Response(
      JSON.stringify({ feedback }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in generate-writing-feedback:', error);
    // Return generic error message to client
    return new Response(
      JSON.stringify({ error: 'An error occurred while generating feedback. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});