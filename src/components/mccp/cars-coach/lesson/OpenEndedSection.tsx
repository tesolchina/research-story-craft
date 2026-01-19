/**
 * OpenEndedSection.tsx
 * 
 * Chat-based AI tutoring for open-ended questions.
 * Students can have a back-and-forth conversation with the AI tutor.
 */

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Send,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface OpenEndedSectionProps {
  prompt: string;
  sectionTitle: string;
  sectionNumber: number;
  totalSections: number;
  discipline: string;
  onComplete: (messages: Message[]) => void;
  existingMessages?: Message[];
}

export default function OpenEndedSection({
  prompt,
  sectionTitle,
  sectionNumber,
  totalSections,
  discipline,
  onComplete,
  existingMessages,
}: OpenEndedSectionProps) {
  const [messages, setMessages] = useState<Message[]>(existingMessages || []);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canComplete, setCanComplete] = useState(existingMessages && existingMessages.length >= 4);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on new messages
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Allow completion after 2 exchanges (4 messages)
    if (messages.length >= 4) {
      setCanComplete(true);
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cars-coach-chat`;
      
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          phase: "open_ended_practice",
          discipline,
          sessionData: {
            openEndedPrompt: prompt,
            messageCount: updatedMessages.length,
          },
        }),
      });

      if (!resp.ok) {
        throw new Error("Failed to get response");
      }

      // Stream the response
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
              setMessages([...updatedMessages, { role: "assistant", content: assistantContent }]);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "I'm sorry, I had trouble responding. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="border-2 border-primary/20 flex flex-col h-[600px]">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{sectionTitle}</CardTitle>
              <CardDescription>Discuss with your AI tutor</CardDescription>
            </div>
          </div>
          <Badge variant="secondary">
            Section {sectionNumber} of {totalSections}
          </Badge>
        </div>

        {/* Prompt display */}
        <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-start gap-2">
            <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm text-primary mb-1">Your task:</p>
              <p className="text-sm text-foreground">{prompt}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0 space-y-4">
        {/* Messages area */}
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Start by sharing your thoughts on the task above</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-3",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-3">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="flex gap-2 flex-shrink-0">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your response..."
            className="min-h-[80px] resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-auto"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Complete button */}
        <div className="flex justify-between items-center pt-2 border-t flex-shrink-0">
          <p className="text-xs text-muted-foreground">
            {canComplete
              ? "You can continue discussing or proceed to the next section"
              : "Have at least 2 exchanges with the tutor to continue"}
          </p>
          <Button
            onClick={() => onComplete(messages)}
            disabled={!canComplete}
            className="gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Complete Section
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
