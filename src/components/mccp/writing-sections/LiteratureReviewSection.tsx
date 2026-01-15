/**
 * Literature Review Section - Placeholder
 * Full implementation to be completed in next iteration
 */

import { BookOpen, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const LiteratureReviewSection = () => (
  <AccordionItem value="literature-review" className="border rounded-lg px-4">
    <AccordionTrigger className="hover:no-underline">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
          <BookOpen className="h-5 w-5 text-green-600 dark:text-green-300" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold">Literature Review</h3>
          <p className="text-sm text-muted-foreground">Review Structure, Reporting Verbs, Critical Evaluation</p>
        </div>
      </div>
    </AccordionTrigger>
    <AccordionContent className="pt-4">
      <Card className="bg-green-50 dark:bg-green-900/20">
        <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Target className="h-4 w-4" />Content available in full page</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-muted-foreground">See WritingMaterialsPage for complete literature review content.</p></CardContent>
      </Card>
    </AccordionContent>
  </AccordionItem>
);

export default LiteratureReviewSection;
