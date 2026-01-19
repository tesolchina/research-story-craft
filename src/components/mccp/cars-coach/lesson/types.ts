/**
 * Lesson Module Types
 * 
 * Defines the structure for interleaved teaching lessons:
 * Teaching Section → MC Questions → Teaching Section → MC Questions → Open-ended Discussion
 */

export interface TeachingPoint {
  id: string;
  title: string;
  content: string; // Markdown supported
  keyTakeaway?: string;
}

export interface TeachingUnit {
  id: string;
  title: string;
  description: string;
  points: TeachingPoint[];
}

export interface MCQuestionItem {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  relatedConcept: string;
}

export interface LessonSection {
  id: string;
  type: "teaching" | "mc_quiz" | "open_ended";
  title: string;
  // For teaching sections
  teachingUnit?: TeachingUnit;
  // For MC quiz sections
  questions?: MCQuestionItem[];
  // For open-ended sections
  openEndedPrompt?: string;
}

export interface LessonModule {
  id: string;
  title: string;
  description: string;
  sections: LessonSection[];
  estimatedMinutes: number;
}

export interface LessonProgress {
  moduleId: string;
  currentSectionIndex: number;
  completedSections: string[];
  mcResponses: {
    sectionId: string;
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
  }[];
  openEndedResponses: {
    sectionId: string;
    messages: { role: "user" | "assistant"; content: string }[];
  }[];
}

export type LessonSectionStatus = "locked" | "current" | "completed";
