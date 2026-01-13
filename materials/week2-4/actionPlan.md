# Action Plan: Pre-Class Activities for Weeks 2-4

## Overview
Implement **flipped classroom** activities for students to complete before Weeks 2-4 small group meetings, targeting the **Writing Assignment (40%)** with MC questions, writing practice, and AI feedback integration.

---

## Phase 1: Quick Tasks (Week 2) - Immediate Implementation
**Goal:** Build foundational knowledge of rhetorical moves

1. **MC Quiz: Move Identification**
   - Students identify which move a sentence exemplifies (CARS model)
   - 5-10 questions on Introduction moves (Territory/Niche/Occupying)
   - Auto-graded with immediate feedback

2. **Mini-Writing: Centrality Statements**
   - Practice writing 2-3 centrality claims
   - AI provides feedback on strength and academic tone
   - 5-minute activity

3. **AI Agent Task**
   - "Analyze these 3 paragraphs and tell me which move each represents"

---

## Phase 2: Writing Practice (Week 3) - Structured Output
**Goal:** Draft move-by-move sections with AI guidance

1. **Move-by-Move Writing Prompts**
   - Each week focuses on 1-2 moves
   - Week 3: Draft Move 1 (Territory) & Move 2 (Niche)
   - Word count target: 200-300 words per move
   - AI analyzes against rubric criteria

2. **Gap Identification Exercise**
   - Given sample abstracts, identify research gaps
   - Open-ended question: "What gap would you add?"
   - AI suggests gap-indicating phrases

3. **Self-Assessment Checklist**
   - Pre-meeting checklist for students
   - "Have you: [ ] Indicated moves [ ] Used sources [ ] Synthesized literature"

---

## Phase 3: Synthesis & Review (Week 4) - Meeting Prep
**Goal:** Prepare for in-class peer review

1. **Literature Review Mini-Task**
   - Read 2 provided articles
   - Complete MC quiz on synthesis techniques
   - Write a 150-word synthesis paragraph
   - AI checks for cohesive devices

2. **Peer Feedback Simulation**
   - AI plays role of classmate
   - Student submits draft
   - AI provides comments based on rubric

3. **Progress Tracker Dashboard**
   - Visual progress bar: Moves completed / 7 moves
   - Word count tracker
   - AI suggestions for next steps

---

## Implementation Priorities

| Priority | Task | Est. Time | Dependencies |
|-----------|------|-------------|---------------|
| **High** | Create MC Quiz Component | 1 day | - |
| **High** | AI Writing Feedback API | 2 days | Supabase function |
| **Medium** | Move-by-Move Prompts UI | 2 days | Week 2-3 page |
| **Low** | Progress Tracker | 1 day | Writing dashboard |

**Total Estimated Time: 1 week**

---

## Key Deliverables

1. **Weeks2to4Tasks.tsx** - Page with structured activities
2. **MC Quiz Integration** - Reuse existing MCQuiz component
3. **AI Writing Prompts** - Prompts for each move
4. **Feedback Mechanism** - Pre-meeting AI feedback
5. **Progress Dashboard** - Visual tracker for students

---

## Success Metrics
- ✅ All 7 moves covered with activities
- ✅ MC questions + writing practice for each
- ✅ AI feedback on all submissions
- ✅ Student can complete tasks at home
- ✅ Ready for peer review in meetings

---

**Next Step:** Begin with **Phase 1** - Create MC Quiz for Move Identification (highest priority, quick win).
