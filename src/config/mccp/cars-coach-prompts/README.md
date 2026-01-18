# CARS Coach Prompts Configuration

This folder contains all the configurable prompts and content for the CARS Coach AI tutor. Developers can edit these files to customize the learning experience.

## Files Overview

### `system-prompts.ts`
Contains the main AI system prompts that control the tutor's behavior at each learning phase:
- `systemIdentity`: The AI's personality and teaching approach
- `introduction`: How to introduce the CARS model
- `mcQuestions`: Guidelines for generating MC questions
- `examples`: How to present discipline-specific examples
- `shortAnswerPrompts`: Guidelines for reflection questions
- `paragraphAnalysis`: How to guide paragraph analysis practice
- `completion`: How to generate the learning summary
- `insightGeneration`: How to create actionable insights

### `discipline-examples.ts`
Contains annotated example paragraphs from different academic disciplines:
- Each example shows a real research introduction paragraph
- Annotations highlight which text corresponds to which Move/Step
- Add new examples by following the `DisciplineExample` interface

**To add a new discipline example:**
```typescript
{
  id: "unique_id",
  discipline: "discipline_key", // must match DISCIPLINES in types.ts
  paragraph: "The example paragraph text...",
  annotations: [
    { move: 1, step: 1, label: "Claiming centrality", text: "The relevant sentence..." },
    // ... more annotations
  ],
  source: "Citation or 'Adapted from...' note"
}
```

### `mc-questions.ts`
Contains the multiple-choice question bank:
- Questions organized by difficulty (easy, medium, hard)
- The AI uses these as reference and can also generate new questions
- Each question includes explanation and concept tags

**To add a new MC question:**
```typescript
{
  id: "mc_new_1",
  question: "Your question text?",
  options: [
    { label: "A", text: "Option A" },
    { label: "B", text: "Option B" },
    { label: "C", text: "Option C" },
    { label: "D", text: "Option D" },
  ],
  correctAnswer: "B", // The correct option label
  explanation: "Why B is correct...",
  difficulty: "medium",
  concept: "concept_tag"
}
```

### `short-answer-prompts.ts`
Contains reflection questions for deeper learning:
- Each prompt includes hints for students
- Evaluation criteria for the AI to assess responses
- Sample good responses for reference

## Customization Tips

1. **Adjusting AI Personality**: Edit `systemIdentity` in `system-prompts.ts` to change how the AI communicates.

2. **Adding Discipline Examples**: Add new examples to `DISCIPLINE_EXAMPLES` array in `discipline-examples.ts`.

3. **Modifying Difficulty**: Add or remove questions from `mc-questions.ts` to adjust difficulty progression.

4. **Changing Learning Flow**: The phase progression is controlled in the edge function (`supabase/functions/cars-coach-chat/index.ts`).

## Data Flow

```
Student starts session
    ↓
DisciplineSelector → discipline selected
    ↓
ChatInterface ← AI uses prompts from this folder
    ↓
Session saved to database
    ↓
Insights generated and saved to student_insights table
    ↓
Available across all future tasks
```

## Related Files

- Edge Function: `supabase/functions/cars-coach-chat/index.ts`
- Components: `src/components/mccp/cars-coach/`
- Types: `src/components/mccp/cars-coach/types.ts`
- Student Insights Data: `src/data/student-insights/`
