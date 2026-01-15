/**
 * Methodology Section - Placeholder
 */
import { PenTool } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const MethodologySection = () => (
  <AccordionItem value="methodology" className="border rounded-lg px-4">
    <AccordionTrigger className="hover:no-underline">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
          <PenTool className="h-5 w-5 text-purple-600 dark:text-purple-300" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold">Methodology & Results</h3>
          <p className="text-sm text-muted-foreground">DRaC Model, Language Features</p>
        </div>
      </div>
    </AccordionTrigger>
    <AccordionContent className="pt-4">
      <Card><CardHeader><CardTitle className="text-sm">Content in full page</CardTitle></CardHeader>
      <CardContent><p className="text-sm text-muted-foreground">See WritingMaterialsPage for complete content.</p></CardContent></Card>
    </AccordionContent>
  </AccordionItem>
);

export default MethodologySection;
