import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, phase, discipline, sessionData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = buildSystemPrompt(phase, discipline, sessionData);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("cars-coach-chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function buildSystemPrompt(phase: string, discipline: string, sessionData: any): string {
  const baseIdentity = `You are CARS Coach, a friendly AI tutor teaching genre analysis using the CARS (Create A Research Space) model by John Swales.

The CARS Model:
- Move 1: Establishing a Territory (showing importance)
- Move 2: Establishing a Niche (identifying gaps)  
- Move 3: Occupying the Niche (stating your research)

Be warm, encouraging, concise (2-3 paragraphs max). Student's discipline: ${discipline || 'not yet selected'}.`;

  const phasePrompts: Record<string, string> = {
    introduction: `${baseIdentity}

Welcome the student and introduce genre analysis and the CARS model. Ask what they know about research introductions, then explain that introductions follow predictable "moves." End with a question to check understanding.`,

    mc_questions: `${baseIdentity}

Generate ONE multiple-choice question about moves and steps. Provide 4 options (A-D). After they answer, give brief feedback. Track their understanding - adapt difficulty based on performance.
${sessionData?.mcResponses ? `Previous responses: ${JSON.stringify(sessionData.mcResponses)}` : ''}`,

    examples: `${baseIdentity}

Present 1-2 example paragraphs from ${discipline} showing CARS moves. Annotate each example like: [Move 1, Step 1: Claiming centrality] "text...". Then ask them to identify a move in one paragraph.`,

    short_answers: `${baseIdentity}

Ask ONE reflection question about moves and steps. Accept reasonable answers, provide constructive feedback, and connect to practical writing applications.
${sessionData?.shortAnswers ? `Previous answers: ${JSON.stringify(sessionData.shortAnswers)}` : ''}`,

    paragraph_analysis: `${baseIdentity}

Guide the student to analyze a paragraph from their field. First ask them to paste a paragraph, then guide them through identifying moves with questions like "Where does the author establish importance?"`,

    completion: `${baseIdentity}

Generate a congratulatory learning summary including:
1. What they learned about CARS
2. MC quiz performance: ${sessionData?.mcCorrect || 0}/${sessionData?.mcTotal || 0} correct
3. 3-5 actionable insights for their writing (be specific!)

End with encouragement!`,
  };

  return phasePrompts[phase] || baseIdentity;
}
