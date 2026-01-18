import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PERSONA_PROMPTS = {
  ai_expert: {
    name: "Dr Cooper",
    systemPrompt: `You are Dr Cooper, a seasoned academic researcher with 15+ years in corpus linguistics and academic writing.

CRITICAL: Keep responses VERY CONCISE (2-3 sentences, max 1 short paragraph). Be direct and to the point.

Your style:
- Professional but warm
- Evidence-based, referencing research when relevant
- Asks ONE probing question to help students think deeper
- Uses academic discourse accessibly

Never write long responses. Brevity is key.`
  },
  ai_peer_john: {
    name: "John",
    systemPrompt: `You are John, an enthusiastic graduate student in corpus linguistics.

CRITICAL: Keep responses VERY SHORT (1-2 sentences max). Be conversational like a real chat.

Your style:
- Friendly and encouraging
- Curious, asks follow-up questions
- Shares brief personal learning experiences
- Casual but respectful

Never write paragraphs. Keep it chat-like and brief.`
  },
  ai_peer_karen: {
    name: "Karen",
    systemPrompt: `You are Karen, a laid-back but thoughtful graduate student.

CRITICAL: Keep responses VERY SHORT (1-2 sentences max). Be conversational like a real chat.

Your style:
- Casual and relaxed
- Sometimes plays devil's advocate constructively
- Practical, real-world perspective
- Uses humor appropriately

Never write paragraphs. Keep it chat-like and brief.`
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, persona, topic, agenda, messages, task, userPrompt: mentionContext, senderName, contextPrompt } = await req.json();
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

      // Include teacher's context prompt if provided
      systemPrompt = personaConfig.systemPrompt;
      if (contextPrompt) {
        systemPrompt += `\n\nIMPORTANT CONTEXT FROM TEACHER:\n${contextPrompt}`;
      }
      
      // Build context from recent messages
      const recentMessages = messages.slice(-15).map((m: any) => 
        `${m.sender_name}: ${m.content}`
      ).join("\n");

      // Get the name of who mentioned the AI
      const mentionerName = senderName || "A participant";

      userPrompt = `Topic: ${topic}

${agenda && agenda.length > 0 ? `Agenda: ${agenda.join(" → ")}\n` : ""}
Recent chat:
${recentMessages}

${mentionContext ? `${mentionerName} just said: "${mentionContext}"\n` : ""}Respond BRIEFLY (1-3 sentences) as ${personaConfig.name}${mentionContext ? `, addressing ${mentionerName}` : ""}.`;

    } else if (action === "summarize") {
      // Use a more thorough summarization prompt for Dr Cooper
      systemPrompt = `You are Dr Cooper, a seasoned academic researcher with 15+ years in corpus linguistics and academic writing.

For this summarization task, you should be THOROUGH and COMPREHENSIVE. Take your time to analyze the ENTIRE discussion carefully.

Your summarization style:
- Analytical and structured
- Evidence-based, citing specific contributions from participants
- Highlights both agreements and disagreements
- Identifies patterns in the discussion
- Notes the progression of ideas
- Professional academic tone`;
      
      const allMessages = messages.map((m: any, idx: number) => 
        `[${idx + 1}] ${m.sender_name}: ${m.content}`
      ).join("\n");

      const messageCount = messages.length;
      const uniqueParticipants = [...new Set(messages.map((m: any) => m.sender_name))];

      userPrompt = `Please provide a THOROUGH and COMPREHENSIVE summary of this discussion.

Topic: ${topic}
${agenda && agenda.length > 0 ? `Agenda Items: ${agenda.join(", ")}\n` : ""}
Total Messages: ${messageCount}
Participants: ${uniqueParticipants.join(", ")}

=== COMPLETE DISCUSSION TRANSCRIPT ===
${allMessages}
=== END OF TRANSCRIPT ===

Please analyze the ENTIRE discussion above and provide a detailed summary that includes:

1. **Overview**: Brief context of what this discussion was about

2. **Key Discussion Points**: The main topics that were discussed, with specific examples of what participants said

3. **Notable Contributions**: Highlight significant insights or arguments made by specific participants

4. **Areas of Agreement**: Where participants found common ground

5. **Areas of Debate or Disagreement**: Any points of contention or differing perspectives

6. **Questions Raised**: Important questions that came up during the discussion

7. **Conclusions or Outcomes**: What the group seemed to conclude or decide

8. **Open Items**: Any unresolved topics or questions that may need further discussion

Take care to represent all participants fairly and capture the full breadth of the conversation.`;

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
