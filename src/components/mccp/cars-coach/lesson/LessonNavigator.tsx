/**
 * LessonNavigator.tsx
 * 
 * Visual progress indicator showing lesson sections.
 * Displays completed, current, and upcoming sections.
 */

import { cn } from "@/lib/utils";
import { CheckCircle2, BookOpen, Brain, MessageSquare, Lock } from "lucide-react";
import type { LessonSection, LessonSectionStatus } from "./types";

interface LessonNavigatorProps {
  sections: LessonSection[];
  currentIndex: number;
  completedSections: string[];
}

export default function LessonNavigator({
  sections,
  currentIndex,
  completedSections,
}: LessonNavigatorProps) {
  const getStatus = (section: LessonSection, index: number): LessonSectionStatus => {
    if (completedSections.includes(section.id)) return "completed";
    if (index === currentIndex) return "current";
    return "locked";
  };

  const getIcon = (section: LessonSection, status: LessonSectionStatus) => {
    if (status === "completed") return CheckCircle2;
    if (status === "locked") return Lock;
    
    switch (section.type) {
      case "teaching":
        return BookOpen;
      case "mc_quiz":
        return Brain;
      case "open_ended":
        return MessageSquare;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Lesson Progress</h3>
      <div className="space-y-1">
        {sections.map((section, index) => {
          const status = getStatus(section, index);
          const Icon = getIcon(section, status);

          return (
            <div
              key={section.id}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg transition-colors",
                status === "current" && "bg-primary/10 border border-primary/30",
                status === "completed" && "text-muted-foreground",
                status === "locked" && "opacity-50"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  status === "completed" && "text-green-500",
                  status === "current" && "text-primary",
                  status === "locked" && "text-muted-foreground"
                )}
              />
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm truncate",
                    status === "current" && "font-medium",
                    status === "completed" && "line-through"
                  )}
                >
                  {section.title}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {section.type.replace("_", " ")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
