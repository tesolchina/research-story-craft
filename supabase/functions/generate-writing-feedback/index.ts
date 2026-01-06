import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, taskType, taskContext } = await req.json();

    if (!text || !taskType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: text and taskType' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not set');
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

    const userPrompt = taskContext 
      ? `Context: ${taskContext}\n\nStudent's writing:\n"${text}"\n\nPlease provide detailed feedback.`
      : `Student's writing:\n"${text}"\n\nPlease provide detailed feedback.`;

    console.log('Sending request to Lovable AI Gateway...');
    
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
      console.error('AI Gateway error:', errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
