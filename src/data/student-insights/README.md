# Student Insights Data

This folder contains real examples of student learning insights and templates for developers to extend the insight generation system.

## Overview

Student insights are actionable recommendations generated from CARS Coach sessions. These insights:
- Are stored in the database (`student_insights` table)
- Are accessible to all follow-up learning tasks
- Can be edited by students (mark as applied, add notes)
- Appear on the student dashboard

## Files

### `insight-templates.ts`
Contains template insights organized by category that the AI uses as reference when generating personalized insights.

### `example-insights.json`
Contains anonymized real examples from student sessions to help developers understand the format and quality expected.

## Insight Categories

| Category | Description |
|----------|-------------|
| `move_1` | Related to Establishing Territory (importance, centrality, literature review) |
| `move_2` | Related to Establishing Niche (gaps, problems, limitations) |
| `move_3` | Related to Occupying Niche (announcing research, stating purpose) |
| `structure` | Related to overall introduction organization |
| `language` | Related to signaling phrases and academic language |
| `discipline` | Specific to the student's discipline conventions |

## How Insights Are Generated

1. **During Session**: The AI observes student responses to MC questions, short answers, and paragraph analysis
2. **At Completion**: The AI generates 3-5 personalized insights based on:
   - Areas where the student struggled
   - Concepts they demonstrated understanding of
   - Their specific discipline
   - The paragraph they analyzed
3. **Storage**: Insights are saved to `student_insights` table with references to the session
4. **Access**: Other tasks can query student insights to build on prior learning

## API for Other Tasks

Other learning modules can access student insights:

```typescript
// Get all insights for a student
const { data: insights } = await supabase
  .from('student_insights')
  .select('*')
  .eq('student_id', studentId)
  .order('created_at', { ascending: false });

// Get unapplied insights to remind students
const { data: pendingInsights } = await supabase
  .from('student_insights')
  .select('*')
  .eq('student_id', studentId)
  .eq('is_applied', false);
```

## Adding New Insight Templates

To add new template insights, edit `insight-templates.ts`:

```typescript
{
  category: "move_2",
  templates: [
    "Consider using gap-indicating language like 'however' or 'yet' before stating what's missing",
    "Your discipline typically signals gaps by [specific pattern]",
    // Add more templates...
  ]
}
```

## Student Interaction

Students can:
1. **View insights** on their dashboard
2. **Mark as applied** when they've used the advice in their writing
3. **Add notes** to record how they applied it or why it was helpful
4. **See history** of all insights across different learning tasks

This creates a personal knowledge base that grows with each learning activity.
