/**
 * AI Writing Section - Placeholder
 */
import { Bot, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AI_WRITING_PROMPTS } from "./WritingConstants";

export const AIWritingSection = () => (
  <AccordionItem value="ai-writing" className="border rounded-lg px-4">
    <AccordionTrigger className="hover:no-underline">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
          <Bot className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold flex items-center gap-2">AI-Assisted Writing <Sparkles className="h-4 w-4" /></h3>
          <p className="text-sm text-muted-foreground">Using AI for Academic Writing</p>
        </div>
      </div>
    </AccordionTrigger>
    <AccordionContent className="pt-4 space-y-4">
      <h4 className="font-semibold">Useful AI Prompts</h4>
      {AI_WRITING_PROMPTS.slice(0, 3).map((item, i) => (
        <Card key={i} className="bg-muted/50">
          <CardContent className="pt-4 text-sm">
            <p className="font-medium mb-2">{item.title}:</p>
            <p className="italic text-muted-foreground">{item.prompt}</p>
          </CardContent>
        </Card>
      ))}
    </AccordionContent>
  </AccordionItem>
);

export default AIWritingSection;
