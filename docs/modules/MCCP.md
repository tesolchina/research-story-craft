# MCCP Module Documentation

## Overview

The MCCP (Master's Course Communication Program) module is the primary content area of this application. It provides course materials for MCCP 6020: Advanced English for Academic Purposes.

## Module Structure

```
src/pages/mccp/
├── MCCPLayout.tsx          # Main layout with sidebar navigation
├── Week1.tsx               # Week 1 course introduction
├── Week1KeyPoints.tsx      # Summary of Week 1 key concepts
├── Week1AIAgent.tsx        # AI agent setup and activities hub
├── Week1Activity1.tsx      # Activity 1.1: Learning journey mapping
├── Week1Activity2.tsx      # Activity 1.2: CARS model analysis
├── Week1Activity3.tsx      # Activity 1.3: AI review of AI output
├── Week1Activity4.tsx      # Activity 1.4: Choosing activity ideas
├── Weeks2to4.tsx           # Weeks 2-4 overview
├── Weeks2to4Tasks.tsx      # Pre-meeting tasks
├── WritingMaterialsPage.tsx # Comprehensive writing reference hub
├── Weeks5to6.tsx           # Research paper presentation
├── Weeks7to9.tsx           # Small group meetings
├── Week10.tsx              # Poster presentation
├── Weeks11to12.tsx         # Individual consultations
├── Week13.tsx              # 3MT presentation
├── ApiKeyPage.tsx          # API key configuration
├── ResourcesPage.tsx       # Course resources links
├── FeedbackPage.tsx        # Course feedback channels
├── StudentParticipation.tsx # Student pseudonym system
└── AssessmentPage.tsx      # Assessment details and rubrics
```

## Data Dependencies

```
┌───────────────────────────────────────────────────────────────┐
│                     MCCPLayout.tsx                             │
│  Provides: Sidebar navigation, header, outlet for child routes │
└────────────────────────────┬──────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────────┐
│   Week Pages  │   │ Utility Pages │   │  Content Pages    │
│               │   │               │   │                   │
│ Week1.tsx     │   │ ApiKeyPage    │   │ WritingMaterials  │
│ Weeks2to4.tsx │   │ ResourcesPage │   │ AssessmentPage    │
│ Week10.tsx    │   │ FeedbackPage  │   │                   │
│ Week13.tsx    │   │ Participation │   │                   │
└───────┬───────┘   └───────────────┘   └───────────────────┘
        │
        ▼
┌───────────────────────────────────────────────────────────────┐
│                   MCCP Components                              │
│  src/components/mccp/                                         │
├───────────────────────────────────────────────────────────────┤
│ StudentEntry.tsx    - Student ID verification                 │
│ MCQuiz.tsx          - Multiple choice quizzes                 │
│ WritingTask.tsx     - Writing submissions + AI feedback       │
│ AIChatDialog.tsx    - AI chat interface                       │
│ DiscussionBoard.tsx - Student discussions                     │
│ TeacherDashboard.tsx - Instructor dashboard                   │
│ InstructorNotes.tsx - Collapsible instructor notes            │
└───────────────────────────────────────────────────────────────┘
```

## Navigation Structure

The sidebar navigation is defined in `MCCPLayout.tsx`:

```typescript
const weeklySchedule = [
  { 
    id: "week1", 
    label: "Week 1: Introduction",
    items: [
      { label: "Summary of Week 1", path: "/mccp/week1/key-points" },
      { label: "AI Agent Activities", path: "/mccp/week1/ai-agent" }
    ]
  },
  { 
    id: "weeks2-4",
    items: [
      { label: "Writing Component", path: "/mccp/weeks2-4/writing-materials" }
    ]
  },
  // ... more weeks
];
```

## Key Components

### StudentEntry

**Purpose**: Verifies student identity using last 4 digits of student ID.

**Dependencies**:
- Supabase `student_pseudonyms` table
- localStorage for session persistence

**Usage**:
```tsx
<StudentEntry onStudentVerified={(id, pseudonym) => handleVerified(id, pseudonym)} />
```

### MCQuiz

**Purpose**: Interactive multiple-choice quizzes with progress persistence.

**Dependencies**:
- Supabase `students_progress` table

**Props**:
```typescript
interface MCQuizProps {
  title: string;
  description?: string;
  questions: Question[];
  taskId: string;
  studentId: string;
  onComplete?: (score: number) => void;
}
```

### WritingTask

**Purpose**: Writing submission interface with AI-generated feedback.

**Dependencies**:
- Edge function `generate-writing-feedback`
- Supabase `students_progress` table

### AIChatDialog

**Purpose**: Chat interface for AI-powered Q&A about course content.

**Dependencies**:
- External AI API (configured via API key page)
- localStorage for API key storage

## Database Interactions

### Student Progress Flow

```
User Action → Component → Supabase Client → students_progress table
     │                                              │
     │                                              ▼
     │                                    ┌─────────────────┐
     │                                    │ Progress Record │
     │                                    │ - student_id    │
     │                                    │ - task_id       │
     │                                    │ - answer        │
     │                                    │ - ai_feedback   │
     │                                    │ - score         │
     │                                    └─────────────────┘
     │                                              │
     └──────────────── UI Update ◄─────────────────┘
```

## Styling Conventions

- Use Tailwind CSS utility classes
- Use design tokens from `index.css` (e.g., `bg-primary`, `text-muted-foreground`)
- Use shadcn/ui components for consistent UI patterns
- Responsive design with `sm:`, `md:`, `lg:` breakpoints

## Error Handling

All database operations should:
1. Use try-catch blocks
2. Log errors using the logger utility
3. Display user-friendly error messages via toast notifications
4. Handle loading states appropriately

```typescript
import { logger } from "@/utils/logger";
import { handleError } from "@/utils/errorHandler";
import { toast } from "@/hooks/use-toast";

try {
  const { data, error } = await supabase.from("table").select();
  if (error) throw error;
  // handle success
} catch (error) {
  handleError(error, "Failed to load data");
}
```
