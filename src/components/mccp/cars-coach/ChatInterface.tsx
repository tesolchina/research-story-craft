import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Phase, Message, CarsCoachSession } from "./types";

interface ChatInterfaceProps {
  session: Partial<CarsCoachSession>;
  currentPhase: Phase;
  onPhaseComplete: (current: Phase, next: Phase) => void;
  studentId: string;
}

const PHASE_ORDER: Phase[] = ["introduction", "mc_questions", "examples", "short_answers", "paragraph_analysis", "completion"];

export default function ChatInterface({ session, currentPhase, onPhaseComplete, studentId }: ChatInterfaceProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canAdvance, setCanAdvance] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session.chatHistory?.length) {
      setMessages(session.chatHistory);
    } else if (messages.length === 0) {
      startConversation();
    }
  }, [currentPhase]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startConversation = async () => {
    setIsLoading(true);
    try {
      await streamMessage([{ role: "user", content: "Hello, I'm ready to learn!" }], true);
    } finally {
      setIsLoading(false);
    }
  };

  const streamMessage = async (chatMessages: { role: string; content: string }[], isStart = false) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cars-coach-chat`;
    
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: chatMessages,
        phase: currentPhase,
        discipline: session.discipline,
        sessionData: {
          mcResponses: session.mcResponses,
          shortAnswers: session.shortAnswers,
          mcCorrect: session.mcResponses?.filter((r: any) => r.isCorrect).length || 0,
          mcTotal: session.mcResponses?.length || 0,
        },
      }),
    });

    if (!resp.ok) {
      const error = await resp.json();
      throw new Error(error.error || "Failed to get response");
    }

    const reader = resp.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let assistantContent = "";
    let textBuffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      textBuffer += decoder.decode(value, { stream: true });
      let newlineIndex: number;

      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
              }
              return [...prev, { id: crypto.randomUUID(), role: "assistant", content: assistantContent, timestamp: new Date() }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    setCanAdvance(true);
    await saveMessages();
  };

  const saveMessages = async () => {
    if (!session.id) return;
    await supabase
      .from("cars_coach_sessions")
      .update({ chat_history: messages })
      .eq("id", session.id);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: input.trim(), timestamp: new Date() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setCanAdvance(false);

    try {
      await streamMessage(newMessages.map(m => ({ role: m.role, content: m.content })));
    } catch (error) {
      toast({ title: "Error", description: error instanceof Error ? error.message : "Failed to send message", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvance = () => {
    const currentIndex = PHASE_ORDER.indexOf(currentPhase);
    if (currentIndex < PHASE_ORDER.length - 1) {
      onPhaseComplete(currentPhase, PHASE_ORDER[currentIndex + 1]);
      setMessages([]);
      setCanAdvance(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-lg p-3 ${
              msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary animate-pulse" />
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-100" />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      <CardFooter className="border-t p-4 gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="min-h-[44px] max-h-32 resize-none"
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
        />
        <Button onClick={handleSend} disabled={!input.trim() || isLoading} size="icon">
          <Send className="h-4 w-4" />
        </Button>
        {canAdvance && currentPhase !== "paragraph_analysis" && (
          <Button onClick={handleAdvance} variant="secondary">
            Next <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        )}
        {canAdvance && currentPhase === "paragraph_analysis" && (
          <Button onClick={handleAdvance} variant="default">
            Complete <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
