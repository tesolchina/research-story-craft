import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, ArrowRight, Save, CheckCircle2 } from "lucide-react";
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

const PHASE_LABELS: Record<Phase, string> = {
  discipline_selection: "Select Discipline",
  introduction: "Introduction to CARS",
  mc_questions: "Concept Check Questions",
  examples: "Analyze Examples",
  short_answers: "Practice Writing",
  paragraph_analysis: "Analyze Your Paragraph",
  completion: "Learning Summary",
};

export default function ChatInterface({ session, currentPhase, onPhaseComplete, studentId }: ChatInterfaceProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canAdvance, setCanAdvance] = useState(false);
  const [showPhaseComplete, setShowPhaseComplete] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
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
    setShowPhaseComplete(true);
    await saveMessages();
    setLastSaved(new Date());
  };

  const saveMessages = async () => {
    if (!session.id) return;
    // Convert Message[] to JSON-compatible format for Supabase
    // Handle both Date objects and string timestamps
    const chatHistoryJson = messages.map(m => ({
      id: m.id,
      role: m.role,
      content: m.content,
      timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : String(m.timestamp),
    }));
    await supabase
      .from("cars_coach_sessions")
      .update({ chat_history: chatHistoryJson })
      .eq("id", session.id);
    setLastSaved(new Date());
  };

  const handleSaveAndExit = async () => {
    await saveMessages();
    toast({ 
      title: "Progress Saved! ✓", 
      description: "You can continue where you left off anytime." 
    });
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
      setShowPhaseComplete(false);
    }
  };

  const getNextPhaseName = () => {
    const currentIndex = PHASE_ORDER.indexOf(currentPhase);
    if (currentIndex < PHASE_ORDER.length - 1) {
      return PHASE_LABELS[PHASE_ORDER[currentIndex + 1]];
    }
    return null;
  };

  const currentPhaseIndex = PHASE_ORDER.indexOf(currentPhase);
  const totalPhases = PHASE_ORDER.length;

  return (
    <Card className="flex flex-col h-[600px]">
      {/* Phase Progress Header */}
      <div className="px-4 py-2 border-b bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Phase {currentPhaseIndex + 1} of {totalPhases}:</span>
          <span className="font-medium">{PHASE_LABELS[currentPhase]}</span>
        </div>
        {lastSaved && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Save className="h-3 w-3" />
            <span>Saved</span>
          </div>
        )}
      </div>

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
              {msg.role === "assistant" ? (
                <div className="text-sm prose prose-sm dark:prose-invert max-w-none [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2 [&>h1]:text-lg [&>h2]:text-base [&>h3]:text-sm [&>strong]:font-semibold [&_.katex]:text-inherit">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {/* Phase Complete Card */}
        {showPhaseComplete && canAdvance && (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 my-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800 dark:text-green-200">
                {PHASE_LABELS[currentPhase]} Complete!
              </span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 mb-3">
              Great work! Your progress has been saved automatically.
              {getNextPhaseName() && (
                <> Ready to continue to <strong>{getNextPhaseName()}</strong>?</>
              )}
            </p>
            <div className="flex gap-2">
              <Button onClick={handleAdvance} size="sm">
                Continue <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button onClick={handleSaveAndExit} variant="outline" size="sm">
                <Save className="h-4 w-4 mr-1" /> Save & Exit
              </Button>
            </div>
          </div>
        )}

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
        {!showPhaseComplete && canAdvance && (
          <Button onClick={() => setShowPhaseComplete(true)} variant="secondary" size="sm">
            Done with this phase
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
