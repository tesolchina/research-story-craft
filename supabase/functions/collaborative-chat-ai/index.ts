import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PERSONA_PROMPTS = {
  ai_expert: {
    name: "Dr Cooper",
    systemPrompt: `You are Dr Cooper, a seasoned academic researcher with over 15 years of experience in corpus linguistics and academic writing. Your communication style is:

- Professional but warm and encouraging
- Evidence-based, often referencing academic literature and research methodologies
- Asks probing questions to help students think deeper
- Provides concrete examples from your research experience
- Uses academic discourse appropriately but accessibly
- Offers methodological guidance when discussing research approaches

Keep responses concise (2-4 paragraphs max) and focused on the discussion topic. Always be supportive of students' learning journey.`
  },
  ai_peer_john: {
    name: "John",
    systemPrompt: `You are John, an enthusiastic and motivated graduate student studying corpus linguistics. Your communication style is:

- Friendly and encouraging, often using positive language
- Curious and asks thoughtful follow-up questions
- Shares your own learning experiences and struggles
- Supports classmates' ideas and builds on them
- Uses casual but respectful language
- Shows genuine interest in others' research topics

Keep responses brief (1-2 paragraphs) and conversational. You're a peer, not an expert - it's okay to admit when you don't know something.`
  },
  ai_peer_karen: {
    name: "Karen",
    systemPrompt: `You are Karen, a laid-back but thoughtful graduate student. Your communication style is:

- Casual and relaxed, using informal language
- Occasionally skeptical or plays devil's advocate (constructively)
- Brings practical, real-world perspectives to academic discussions
- Sometimes shares relatable struggles with academic work
- Uses humor appropriately to lighten the mood
- Asks "obvious" questions that actually help clarify complex topics

Keep responses brief (1-2 paragraphs). You're approachable and help make academic discussions feel less intimidating.`
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, persona, topic, agenda, messages, task, userPrompt: mentionContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (action === "respond") {
      // Get persona config
      const personaConfig = PERSONA_PROMPTS[persona as keyof typeof PERSONA_PROMPTS];
      if (!personaConfig) {
        throw new Error(`Unknown persona: ${persona}`);
      }

      systemPrompt = personaConfig.systemPrompt;
      
      // Build context from recent messages
      const recentMessages = messages.slice(-15).map((m: any) => 
        `${m.sender_name}: ${m.content}`
      ).join("\n");

      userPrompt = `Current discussion topic: ${topic}

${agenda && agenda.length > 0 ? `Agenda items:\n${agenda.map((a: string, i: number) => `${i + 1}. ${a}`).join("\n")}\n` : ""}

Recent conversation:
${recentMessages}

${mentionContext ? `A student just mentioned you directly with this message: "${mentionContext}"\n\n` : ""}Please contribute to this discussion as ${personaConfig.name}. Respond naturally to what was just said${mentionContext ? ", addressing their question or comment directly" : ""}.`;

    } else if (action === "summarize") {
      systemPrompt = PERSONA_PROMPTS.ai_expert.systemPrompt;
      
      const allMessages = messages.map((m: any) => 
        `${m.sender_name}: ${m.content}`
      ).join("\n");

      userPrompt = `Please summarize the key points from this discussion:

Topic: ${topic}

Discussion:
${allMessages}

Provide a concise summary highlighting:
1. Main topics discussed
2. Key insights or conclusions
3. Any questions that remain open`;

    } else if (action === "task") {
      // Handle specific tasks like "encourage participation"
      const personaConfig = PERSONA_PROMPTS[persona as keyof typeof PERSONA_PROMPTS];
      systemPrompt = personaConfig?.systemPrompt || PERSONA_PROMPTS.ai_peer_john.systemPrompt;
      
      const recentMessages = messages.slice(-10).map((m: any) => 
        `${m.sender_name}: ${m.content}`
      ).join("\n");

      if (task === "encourage") {
        userPrompt = `The discussion seems quiet. Please encourage participation in a friendly way.

Topic: ${topic}
Recent messages:
${recentMessages}

Write a brief, encouraging message to spark more discussion.`;
      } else if (task === "clarify") {
        userPrompt = `A student might need help understanding something. Please offer clarification.

Topic: ${topic}
Recent messages:
${recentMessages}

Offer to help clarify any confusing points in a friendly, non-condescending way.`;
      } else {
        userPrompt = `Task: ${task}\n\nTopic: ${topic}\nContext:\n${recentMessages}`;
      }

    } else if (action === "auto_respond") {
      // For semi-autonomous responses in student-led sessions
      const personaConfig = PERSONA_PROMPTS[persona as keyof typeof PERSONA_PROMPTS];
      systemPrompt = personaConfig.systemPrompt + `

IMPORTANT: You are participating in a student-led practice session. Be helpful but don't dominate the conversation. Only respond if you have something valuable to add.`;

      const recentMessages = messages.slice(-10).map((m: any) => 
        `${m.sender_name}: ${m.content}`
      ).join("\n");

      userPrompt = `Topic: ${topic}

Recent conversation:
${recentMessages}

If appropriate, contribute briefly to this discussion. If the conversation is flowing well without you, respond with just "SKIP" (the system will not post anything).`;
    }

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
          { role: "user", content: userPrompt }
        ],
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "API credits exhausted. Please contact administrator." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Handle SKIP for auto_respond
    if (action === "auto_respond" && content.trim().toUpperCase() === "SKIP") {
      return new Response(
        JSON.stringify({ skipped: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const personaConfig = PERSONA_PROMPTS[persona as keyof typeof PERSONA_PROMPTS];

    return new Response(
      JSON.stringify({ 
        content,
        persona,
        name: personaConfig?.name || "AI Assistant"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("collaborative-chat-ai error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
