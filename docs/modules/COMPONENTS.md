# Components Documentation

## Overview

This document describes the reusable components in the application, their purposes, and usage patterns.

## UI Components (`src/components/ui/`)

These are shadcn/ui components providing consistent, accessible UI primitives.

### Commonly Used

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `Button` | Interactive buttons | `<Button variant="outline">Click</Button>` |
| `Card` | Content containers | `<Card><CardHeader>...</CardHeader></Card>` |
| `Dialog` | Modal dialogs | `<Dialog open={open}><DialogContent>...</DialogContent></Dialog>` |
| `Tabs` | Tabbed navigation | `<Tabs defaultValue="tab1"><TabsList>...</TabsList></Tabs>` |
| `Accordion` | Collapsible sections | `<Accordion type="single"><AccordionItem>...</AccordionItem></Accordion>` |
| `Table` | Data tables | `<Table><TableHeader>...</TableHeader></Table>` |
| `Badge` | Status indicators | `<Badge variant="secondary">Status</Badge>` |
| `Collapsible` | Show/hide content | `<Collapsible><CollapsibleTrigger>...</CollapsibleTrigger></Collapsible>` |
| `Sidebar` | Navigation sidebar | `<Sidebar><SidebarContent>...</SidebarContent></Sidebar>` |

## MCCP Components (`src/components/mccp/`)

Business-specific components for the MCCP course platform.

### StudentEntry

**File**: `StudentEntry.tsx`

**Purpose**: Allows students to verify their identity using the last 4 digits of their student ID, which maps to a pseudonym for privacy.

**Props**:
```typescript
interface StudentEntryProps {
  onStudentVerified: (studentId: string, pseudonym: string) => void;
}
```

**Features**:
- Input validation (exactly 4 digits)
- Supabase lookup for pseudonym
- LocalStorage persistence for session
- Error handling with user feedback

**Usage**:
```tsx
<StudentEntry 
  onStudentVerified={(id, pseudonym) => {
    setStudentId(id);
    setPseudonym(pseudonym);
  }} 
/>
```

---

### MCQuiz

**File**: `MCQuiz.tsx`

**Purpose**: Renders multiple-choice quizzes with automatic progress saving and scoring.

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

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}
```

**Features**:
- Progress persistence to Supabase
- Correct/incorrect feedback
- Explanations after submission
- Score calculation

---

### WritingTask

**File**: `WritingTask.tsx`

**Purpose**: Writing submission interface that provides AI-generated feedback.

**Props**:
```typescript
interface WritingTaskProps {
  title: string;
  description?: string;
  prompt: string;
  context?: string;
  taskId: string;
  studentId: string;
  taskType: "centrality_statement" | "paraphrase";
  onComplete?: () => void;
}
```

**Features**:
- Draft saving
- AI feedback generation via edge function
- Progress loading from database
- Character count and validation

---

### AIChatDialog

**File**: `AIChatDialog.tsx`

**Purpose**: Modal chat interface for AI-powered Q&A about course content.

**Props**:
```typescript
interface AIChatDialogProps {
  sectionId: string;
  sectionTitle: string;
  context: string;
  suggestedPrompts?: string[];
}
```

**Features**:
- Streaming chat responses
- Suggested prompts
- API key validation
- Message history within session

---

### DiscussionBoard

**File**: `DiscussionBoard.tsx`

**Purpose**: Forum-style discussion board for student interactions.

**Features**:
- Threaded replies
- Student pseudonym display
- Real-time updates (optional)
- Teacher badge for instructor posts

---

### TeacherDashboard

**File**: `TeacherDashboard.tsx`

**Purpose**: Administrative view for instructors to monitor student progress.

**Features**:
- Student progress overview
- Quiz score summaries
- Writing submission reviews
- Export functionality

---

### InstructorNotes

**File**: `InstructorNotes.tsx`

**Purpose**: Collapsible section for instructor-only notes within course content.

**Props**:
```typescript
interface InstructorNotesProps {
  sectionId: string;
  notes: string;
  className?: string;
}
```

---

## Component Patterns

### Loading States

All components that fetch data should display loading states:

```tsx
if (isLoading) {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}
```

### Error Handling

Use the toast hook for user-friendly error messages:

```tsx
import { toast } from "@/hooks/use-toast";

try {
  await someAsyncOperation();
} catch (error) {
  toast({
    title: "Error",
    description: "Something went wrong. Please try again.",
    variant: "destructive"
  });
}
```

### Form Validation

Use React Hook Form with Zod for form validation:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
  // ...
});
```

## Creating New Components

When creating new components:

1. **Keep files under 600 lines** - Split large components into smaller modules
2. **Add inline comments** - Explain the purpose of each section
3. **Use TypeScript interfaces** - Define props with proper types
4. **Follow naming conventions** - PascalCase for components, camelCase for functions
5. **Export from index** - Create barrel exports when appropriate
6. **Document in this file** - Add component documentation here
