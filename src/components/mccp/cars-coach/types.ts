export type Phase =
  | "discipline_selection"
  | "introduction"
  | "mc_questions"
  | "examples"
  | "short_answers"
  | "paragraph_analysis"
  | "final_reflection"
  | "completion";

export interface Task {
  id: string;
  number: number;
  title: string;
  phase: Phase;
  completed: boolean;
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface MCResponse {
  questionId: string;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface ShortAnswer {
  questionId: string;
  question: string;
  answer: string;
  feedback: string;
}

export interface ParagraphAnalysis {
  originalText: string;
  studentAnalysis: string;
  moves: {
    move: number;
    label: string;
    identified: boolean;
    studentNotes: string;
  }[];
  aiFeedback: string;
}

export interface Insight {
  id: string;
  studentId: string;
  sourceTask: string;
  sourceSessionId: string | null;
  insightText: string;
  category: string;
  isApplied: boolean;
  studentNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningReport {
  summary: string;
  discipline: string;
  mcAccuracy: number;
  mcTotal: number;
  mcCorrect: number;
  shortAnswerCount: number;
  paragraphAnalyzed: boolean;
  timeSpentMinutes: number;
  keyTakeaways: string[];
  actionableInsights: {
    text: string;
    category: string;
  }[];
  completedAt: Date;
}

export interface CarsCoachSession {
  id: string;
  studentId: string;
  discipline: string;
  currentPhase: Phase;
  tasksCompleted: string[];
  mcResponses: MCResponse[];
  shortAnswers: ShortAnswer[];
  paragraphAnalysis: ParagraphAnalysis | null;
  chatHistory: Message[];
  learningReport: LearningReport | null;
  startedAt: Date;
  completedAt: Date | null;
}

export const DISCIPLINE_CATEGORIES = [
  {
    category: "STEM",
    fields: [
      "Computer Science",
      "Cybersecurity",
      "Data Science / AI / Machine Learning",
      "Software Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Chemical Engineering",
      "Biomedical Engineering",
      "Physics",
      "Chemistry",
      "Biology",
      "Mathematics",
      "Environmental Science",
    ],
  },
  {
    category: "Health Sciences",
    fields: [
      "Nursing",
      "Public Health",
      "Medicine",
      "Pharmacy",
      "Physical Therapy",
      "Nutrition / Dietetics",
      "Psychology (Clinical)",
      "Epidemiology",
    ],
  },
  {
    category: "Social Sciences",
    fields: [
      "Psychology (Research)",
      "Sociology",
      "Anthropology",
      "Political Science",
      "Economics",
      "Geography",
      "Communication Studies",
      "Criminology",
    ],
  },
  {
    category: "Education",
    fields: [
      "TESOL / Applied Linguistics",
      "Curriculum & Instruction",
      "Educational Psychology",
      "Higher Education",
      "Special Education",
      "Educational Technology",
      "Educational Leadership",
    ],
  },
  {
    category: "Business & Management",
    fields: [
      "Business Administration",
      "Marketing",
      "Finance",
      "Accounting",
      "Human Resource Management",
      "Operations Management",
      "Entrepreneurship",
      "Information Systems",
    ],
  },
  {
    category: "Humanities",
    fields: [
      "English Literature",
      "History",
      "Philosophy",
      "Religious Studies",
      "Linguistics",
      "Art History",
      "Music",
      "Cultural Studies",
    ],
  },
  {
    category: "Law & Policy",
    fields: [
      "Law",
      "Public Policy",
      "International Relations",
      "Public Administration",
    ],
  },
] as const;

// Legacy - for backwards compatibility
export const DISCIPLINES = [
  { value: "applied_linguistics", label: "Applied Linguistics" },
  { value: "education", label: "Education" },
  { value: "social_sciences", label: "Social Sciences" },
  { value: "stem", label: "STEM (Science, Technology, Engineering, Math)" },
  { value: "humanities", label: "Humanities" },
  { value: "business", label: "Business & Management" },
  { value: "health_sciences", label: "Health Sciences" },
  { value: "other", label: "Other" },
] as const;

export const TASKS: Task[] = [
  { id: "discipline", number: 1, title: "Select your discipline", phase: "discipline_selection", completed: false },
  { id: "intro", number: 2, title: "Learn about moves and steps", phase: "introduction", completed: false },
  { id: "mc", number: 3, title: "Answer concept check questions", phase: "mc_questions", completed: false },
  { id: "examples", number: 4, title: "Study CARS model examples", phase: "examples", completed: false },
  { id: "short_answers", number: 5, title: "Complete guided learning questions", phase: "short_answers", completed: false },
  { id: "analysis", number: 6, title: "Analyze your own paragraph", phase: "paragraph_analysis", completed: false },
  { id: "reflection", number: 7, title: "Share your reflections", phase: "final_reflection", completed: false },
  { id: "summary", number: 8, title: "View learning summary", phase: "completion", completed: false },
];
