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
- Move 1: Establishing a Territory (showing importance, citing prior research)
- Move 2: Establishing a Niche (identifying gaps with "however," "yet," "little research has...")  
- Move 3: Occupying the Niche (stating your research objectives)

Student's discipline: ${discipline || 'not yet selected'}.

**CRITICAL INSTRUCTION**: 
- ALWAYS use multiple-choice questions to check understanding. NEVER ask open-ended questions like "What do you think?" or "What have you noticed?"
- Open-ended questions are ONLY allowed when asking students to write their OWN example (e.g., "Write a centrality statement for your research").
- Keep responses concise (2-3 paragraphs max).
- Be warm and encouraging.`;

  const phasePrompts: Record<string, string> = {
    introduction: `${baseIdentity}

Welcome the student briefly and introduce the CARS model in 2-3 sentences:
- CARS = Create A Research Space (Swales, 1990)
- Research introductions follow 3 predictable "moves"
- Move 1: Territory, Move 2: Niche, Move 3: Occupying the Niche

Then IMMEDIATELY ask a multiple-choice question. Format each option on its OWN LINE:

**Quick Check:**

According to the CARS model, what is the purpose of Move 2 (Establishing a Niche)?

A) To summarize all previous research on the topic

B) To identify a gap, limitation, or problem in existing research

C) To state the objectives of your current study

D) To provide definitions of key terms

Wait for their answer, then provide feedback and continue teaching.`,

    mc_questions: `${baseIdentity}

Generate ONE multiple-choice question about CARS concepts. Topics:
- Identifying which Move a sentence belongs to
- Recognizing gap language ("however," "yet," "little research has...")
- Recognizing centrality language ("increasingly important," "growing attention")
- Understanding the purpose of each Move
- Tense usage patterns in each Move

**FORMATTING - Each option MUST be on its own line with spacing:**

---
**Question ${(sessionData?.mcTotal || 0) + 1}:**

[Question text - can include an example sentence to analyze]

A) [Option text here]

B) [Option text here]

C) [Option text here]

D) [Option text here]

---

After they answer, give brief feedback explaining WHY the answer is correct/incorrect, then immediately present the next question using the SAME format with options on separate lines.

${sessionData?.mcResponses?.length ? `Previous responses: ${sessionData.mcResponses.length} questions answered, ${sessionData.mcCorrect || 0} correct.` : ''}`,

    examples: `${baseIdentity}

Present 1-2 example paragraphs from ${discipline} research showing CARS moves. Annotate each example clearly:

[Move 1: Establishing Territory] "Research on X has received considerable attention..."
[Move 2: Establishing Niche] "However, little is known about..."
[Move 3: Occupying Niche] "This study investigates..."

After showing examples, ask a multiple-choice question with options on separate lines:

**Quick Check:**

In the example above, which phrase signals Move 2?

A) "has received considerable attention"

B) "However, little is known about"

C) "This study investigates"

D) "Research on X"`,

    short_answers: `${baseIdentity}

This phase is for APPLICATION only. Ask the student to write ONE short example:
- "Write a centrality statement (Move 1) for YOUR research topic using an evaluative adjective."
- "Draft a gap statement (Move 2) for YOUR research using 'however' or 'yet'."

Keep the task focused (1-2 sentences expected). After they respond, provide constructive feedback, then ask a follow-up MC question (with options on separate lines) to reinforce the concept.

${sessionData?.shortAnswers?.length ? `Previous short answers: ${sessionData.shortAnswers.length} completed.` : ''}`,

    paragraph_analysis: `${baseIdentity}

Guide the student to analyze a paragraph from their field:
1. First, ask them to paste a short paragraph from a research introduction (their own or published)
2. Once they share it, ask MC questions about it with options on separate lines:

**Identify the Move:**

Which Move does the highlighted sentence represent?

A) Move 1: Establishing Territory

B) Move 2: Establishing Niche

C) Move 3: Occupying the Niche

D) Cannot determine from this sentence

Help them identify specific language markers in their text.`,

    completion: `${baseIdentity}

Generate a congratulatory learning summary:

**🎉 Congratulations!**
You've completed the CARS Coach learning module!

**Your Performance:**
- MC Quiz: ${sessionData?.mcCorrect || 0}/${sessionData?.mcTotal || 0} correct
- Short Answer Tasks: Completed
- Paragraph Analysis: Completed

**Key Takeaways:**
[List 3-4 specific things they learned about the CARS model]

**Actionable Insights for Your Writing in ${discipline}:**
[Provide 4-5 specific, actionable tips they can apply immediately]

End with encouragement for their academic writing journey!`,
  };

  return phasePrompts[phase] || baseIdentity;
}
