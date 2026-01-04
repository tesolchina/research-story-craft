import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Loader2, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatDialogProps {
  sectionId: string;
  sectionTitle: string;
  context: string;
  suggestedPrompts?: string[];
  className?: string;
}

const AIChatDialog = ({
  sectionId,
  sectionTitle,
  context,
  suggestedPrompts = [],
  className = "",
}: AIChatDialogProps) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get API key from localStorage
  const getApiKey = () => {
    return localStorage.getItem("hkbu_genai_api_key") || "";
  };

  useEffect(() => {
    // Scroll to bottom when new messages appear
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const userMessage = messageText || input.trim();
    if (!userMessage) return;

    const apiKey = getApiKey();
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: userMessage },
        {
          role: "assistant",
          content:
            "⚠️ No API key found. Please go to the API Key page in the sidebar to set up your HKBU Gen AI API key first.",
        },
      ]);
      setInput("");
      return;
    }

    setLoading(true);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const systemPrompt = `You are a helpful academic assistant for the MCCP 6020 course "Advanced English for Academic Purposes" at HKBU. 
      
Context about this section: ${context}

Help students understand the course content, learning outcomes, and assessments. Be encouraging and provide practical advice for academic writing and presentations. Keep responses concise but helpful.`;

      const response = await fetch(
        "https://genai.hkbu.edu.hk/general/rest/deployments/gpt-4o-mini/chat/completions?api-version=2024-10-21",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
          body: JSON.stringify({
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
              { role: "user", content: userMessage },
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      console.error("AI Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error connecting to the AI service. Please check your API key and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={`gap-2 ${className}`}>
          <Sparkles className="h-4 w-4" />
          Ask AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 pb-2 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Assistant - {sectionTitle}
          </DialogTitle>
        </DialogHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground text-sm">
                  Ask me anything about this section of the course!
                </p>
                {suggestedPrompts.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Try asking:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {suggestedPrompts.map((prompt, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleSend(prompt)}
                        >
                          {prompt}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              className="resize-none"
              disabled={loading}
            />
            <Button onClick={() => handleSend()} disabled={loading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIChatDialog;
