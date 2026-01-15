/**
 * Cohesion & Abstracts Section - Placeholder
 */
import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const CohesionAbstractsSection = () => (
  <AccordionItem value="cohesion" className="border rounded-lg px-4">
    <AccordionTrigger className="hover:no-underline">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
          <MessageSquare className="h-5 w-5 text-orange-600 dark:text-orange-300" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold">Cohesion, Coherence & Abstracts</h3>
          <p className="text-sm text-muted-foreground">Signposting, Abstract Structure</p>
        </div>
      </div>
    </AccordionTrigger>
    <AccordionContent className="pt-4">
      <Card><CardHeader><CardTitle className="text-sm">Content in full page</CardTitle></CardHeader>
      <CardContent><p className="text-sm text-muted-foreground">See WritingMaterialsPage for complete content.</p></CardContent></Card>
    </AccordionContent>
  </AccordionItem>
);

export default CohesionAbstractsSection;
