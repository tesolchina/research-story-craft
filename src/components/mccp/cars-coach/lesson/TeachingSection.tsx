/**
 * TeachingSection.tsx
 * 
 * Displays teaching content in expandable accordion sections.
 * Students can explore concepts at their own pace.
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, BookOpen, ArrowRight, Lightbulb } from "lucide-react";
import type { TeachingUnit } from "./types";

interface TeachingSectionProps {
  unit: TeachingUnit;
  sectionNumber: number;
  totalSections: number;
  onComplete: () => void;
  isCompleted?: boolean;
}

export default function TeachingSection({
  unit,
  sectionNumber,
  totalSections,
  onComplete,
  isCompleted = false,
}: TeachingSectionProps) {
  const [expandedPoints, setExpandedPoints] = useState<string[]>([unit.points[0]?.id || ""]);
  const [viewedPoints, setViewedPoints] = useState<Set<string>>(new Set([unit.points[0]?.id || ""]));

  const handleAccordionChange = (value: string[]) => {
    setExpandedPoints(value);
    // Track which points have been viewed
    value.forEach((id) => {
      if (!viewedPoints.has(id)) {
        setViewedPoints(new Set([...viewedPoints, id]));
      }
    });
  };

  const allPointsViewed = unit.points.every((p) => viewedPoints.has(p.id));

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{unit.title}</CardTitle>
              <CardDescription>{unit.description}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary">
            Section {sectionNumber} of {totalSections}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Accordion
          type="multiple"
          value={expandedPoints}
          onValueChange={handleAccordionChange}
          className="space-y-2"
        >
          {unit.points.map((point, index) => (
            <AccordionItem
              key={point.id}
              value={point.id}
              className="border rounded-lg px-4 bg-background/50"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-left">
                  {viewedPoints.has(point.id) ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                  )}
                  <span className="font-medium">
                    {index + 1}. {point.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-2">
                <div className="pl-8 space-y-3">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {point.content.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {point.keyTakeaway && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                      <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>Key takeaway:</strong> {point.keyTakeaway}
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Progress indicator */}
        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {viewedPoints.size} of {unit.points.length} topics explored
          </p>
          <Button
            onClick={onComplete}
            disabled={!allPointsViewed && !isCompleted}
            className="gap-2"
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </>
            ) : (
              <>
                Continue to Quiz
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {!allPointsViewed && !isCompleted && (
          <p className="text-xs text-muted-foreground text-center">
            Please expand and read all topics before continuing
          </p>
        )}
      </CardContent>
    </Card>
  );
}
