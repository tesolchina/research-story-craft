/**
 * cars-lesson-content.ts
 * 
 * Content for the CARS Model lesson with interleaved teaching and quizzes.
 * Structure: Teach → MC → Teach → MC → Open-ended
 */

import type { LessonModule, TeachingUnit, MCQuestionItem } from "./types";

// Teaching Unit 1: Introduction to CARS & Move 1
const teachingUnit1: TeachingUnit = {
  id: "unit_1",
  title: "Introduction to CARS & Move 1",
  description: "Learn what the CARS model is and how to establish your research territory",
  points: [
    {
      id: "point_1_1",
      title: "What is the CARS Model?",
      content: `The CARS model (Create A Research Space) was developed by linguist John Swales to explain how research article introductions work. It's a "rhetorical" model, meaning it focuses on how writers persuade readers that their research is important and necessary.

Think of it like entering a crowded room at a party. First, you need to establish that you belong there (Move 1), then find your unique spot (Move 2), and finally claim that spot as your own (Move 3).`,
      keyTakeaway: "CARS = Create A Research Space. It explains how introductions work rhetorically.",
    },
    {
      id: "point_1_2",
      title: "Move 1: Establishing a Territory",
      content: `Move 1 is about convincing readers that your research topic matters. You're essentially saying, "This is an important area of research, and many people are working on it."

Writers accomplish this through three possible steps:
• Step 1: Claiming centrality - asserting the topic's importance
• Step 2: Making topic generalizations - stating what's generally known
• Step 3: Reviewing previous research - citing relevant studies`,
      keyTakeaway: "Move 1 = Show the topic is important and well-researched.",
    },
    {
      id: "point_1_3",
      title: "Move 1 Language Patterns",
      content: `Certain words and phrases signal Move 1:

Centrality claims: "recently," "increasingly," "growing interest," "significant attention," "critical importance"

Example: "Climate change has become one of the most pressing issues of our time, attracting significant attention from researchers across multiple disciplines."

This sentence claims the topic is important (centrality) and suggests many researchers are involved (territory).`,
      keyTakeaway: "Look for words like 'important,' 'significant,' 'increasingly' to identify Move 1.",
    },
  ],
};

// MC Questions for Unit 1
const mcQuestions1: MCQuestionItem[] = [
  {
    id: "mc_1_1",
    question: "What does CARS stand for?",
    options: [
      { label: "A", text: "Create A Research Study" },
      { label: "B", text: "Create A Research Space" },
      { label: "C", text: "Critical Analysis of Research Structure" },
      { label: "D", text: "Construct Academic Research Sections" },
    ],
    correctAnswer: "B",
    explanation: "CARS stands for 'Create A Research Space,' developed by John Swales to describe how research article introductions work rhetorically.",
    relatedConcept: "basic_terminology",
  },
  {
    id: "mc_1_2",
    question: "What is the main purpose of Move 1 in the CARS model?",
    options: [
      { label: "A", text: "To identify gaps in existing research" },
      { label: "B", text: "To state your research objectives" },
      { label: "C", text: "To establish that your research topic is important" },
      { label: "D", text: "To summarize your findings" },
    ],
    correctAnswer: "C",
    explanation: "Move 1 (Establishing a Territory) is about convincing readers that your research topic matters and is an active area of research.",
    relatedConcept: "move_1_purpose",
  },
  {
    id: "mc_1_3",
    question: "Which phrase best signals Move 1, Step 1 (Claiming Centrality)?",
    options: [
      { label: "A", text: "However, little attention has been paid to..." },
      { label: "B", text: "This study aims to investigate..." },
      { label: "C", text: "Climate change has become increasingly important..." },
      { label: "D", text: "The results indicate that..." },
    ],
    correctAnswer: "C",
    explanation: "Phrases like 'increasingly important,' 'significant attention,' or 'critical issue' signal that the writer is claiming the topic's centrality and importance.",
    relatedConcept: "move_1_language",
  },
];

// Teaching Unit 2: Move 2 & Move 3
const teachingUnit2: TeachingUnit = {
  id: "unit_2",
  title: "Move 2 & Move 3: Finding and Filling the Gap",
  description: "Learn how to identify research gaps and announce your contribution",
  points: [
    {
      id: "point_2_1",
      title: "Move 2: Establishing a Niche",
      content: `Move 2 is the pivot point of your introduction. After showing the topic is important, you now show there's something missing - a gap your research will fill.

Think of it as the "however" moment. You've praised existing research, but now you reveal its limitations:
• Step 1A: Indicating a gap - "However, few studies have examined..."
• Step 1B: Adding to what is known - "Building on this research..."
• Step 2: Presenting a problem - "Current approaches suffer from..."
• Step 3: Raising questions - "What remains unclear is..."`,
      keyTakeaway: "Move 2 = The 'however' moment. Show what's missing in current research.",
    },
    {
      id: "point_2_2",
      title: "Move 2 Language Patterns",
      content: `Move 2 uses contrast language and negative expressions:

Gap indicators: "however," "yet," "nevertheless," "but," "although"
Negative expressions: "little research has," "few studies have," "rarely," "no study has," "remains unclear"

Example: "However, while much research has focused on urban areas, rural communities have received little attention."

This creates tension - the reader now expects you to address this gap.`,
      keyTakeaway: "Look for 'however,' 'yet,' 'little/few studies' to identify Move 2.",
    },
    {
      id: "point_2_3",
      title: "Move 3: Occupying the Niche",
      content: `Move 3 is where you announce YOUR research. You've created a space (the gap), now you fill it with your study.

Key steps in Move 3:
• Step 1A: Outlining purposes - "This study aims to..."
• Step 1B: Announcing present research - "This paper investigates..."
• Step 2: Presenting findings - "The results reveal..."
• Step 3: Outlining structure - "The paper is organized as follows..."`,
      keyTakeaway: "Move 3 = Announce your research and how it fills the gap.",
    },
    {
      id: "point_2_4",
      title: "The Hourglass Structure",
      content: `The CARS model creates an "hourglass" shape:

WIDE (Move 1): Start broad - the general importance of the topic
↓
NARROW (Move 2): Focus down - the specific gap or problem
↓
WIDE AGAIN (Move 3): Expand out - your research and its contributions

This structure guides readers from the general field to your specific contribution, making your research feel natural and necessary.`,
      keyTakeaway: "CARS creates an hourglass: Broad → Narrow (gap) → Broad (your research).",
    },
  ],
};

// MC Questions for Unit 2
const mcQuestions2: MCQuestionItem[] = [
  {
    id: "mc_2_1",
    question: "Which phrase typically signals Move 2 (Establishing a Niche)?",
    options: [
      { label: "A", text: "Research on this topic has grown significantly..." },
      { label: "B", text: "However, little attention has been paid to..." },
      { label: "C", text: "This study aims to investigate..." },
      { label: "D", text: "Many scholars have examined..." },
    ],
    correctAnswer: "B",
    explanation: "'However, little attention has been paid to...' indicates a gap in existing research, which is the purpose of Move 2.",
    relatedConcept: "move_2_language",
  },
  {
    id: "mc_2_2",
    question: "What is the primary purpose of Move 3?",
    options: [
      { label: "A", text: "To review all previous literature on the topic" },
      { label: "B", text: "To identify problems with existing research" },
      { label: "C", text: "To state how your research addresses the gap" },
      { label: "D", text: "To summarize the field's key findings" },
    ],
    correctAnswer: "C",
    explanation: "Move 3 (Occupying the Niche) is where you announce your research and explain how it fills the gap identified in Move 2.",
    relatedConcept: "move_3_purpose",
  },
  {
    id: "mc_2_3",
    question: "Why is the CARS model described as creating an 'hourglass' structure?",
    options: [
      { label: "A", text: "Because it emphasizes time management in research" },
      { label: "B", text: "Because it moves from broad to narrow to broad again" },
      { label: "C", text: "Because it requires exactly three paragraphs" },
      { label: "D", text: "Because it focuses on visual presentation" },
    ],
    correctAnswer: "B",
    explanation: "The hourglass metaphor describes how CARS moves from general importance (broad) to a specific gap (narrow) to your research contribution (broad again).",
    relatedConcept: "structure",
  },
  {
    id: "mc_2_4",
    question: "A writer states: 'Despite extensive research on online learning, student motivation in asynchronous courses remains poorly understood.' Which moves are present?",
    options: [
      { label: "A", text: "Move 1 only" },
      { label: "B", text: "Move 2 only" },
      { label: "C", text: "Move 1 and Move 2 combined" },
      { label: "D", text: "Move 3 only" },
    ],
    correctAnswer: "C",
    explanation: "'Extensive research' establishes Move 1 (territory), while 'despite' and 'remains poorly understood' signals Move 2 (the gap). This sentence elegantly combines both moves.",
    relatedConcept: "move_combination",
  },
];

// Open-ended prompt
const openEndedPrompt = `Now let's apply what you've learned! Think about your own research area or a topic you're interested in.

Try to write a brief research introduction paragraph (3-5 sentences) that uses the CARS model:
1. Start with Move 1: Establish why the topic is important
2. Then Move 2: Identify a gap or problem
3. Finally Move 3: State what your research would investigate

Share your paragraph, and I'll give you feedback on how well it follows the CARS structure.`;

// Complete Lesson Module
export const CARS_LESSON_MODULE: LessonModule = {
  id: "cars_intro_lesson",
  title: "Introduction to the CARS Model",
  description: "Learn how to write effective research introductions using the Create A Research Space framework",
  estimatedMinutes: 25,
  sections: [
    {
      id: "section_1",
      type: "teaching",
      title: "Introduction & Move 1",
      teachingUnit: teachingUnit1,
    },
    {
      id: "section_2",
      type: "mc_quiz",
      title: "Concept Check: CARS Basics",
      questions: mcQuestions1,
    },
    {
      id: "section_3",
      type: "teaching",
      title: "Move 2 & Move 3",
      teachingUnit: teachingUnit2,
    },
    {
      id: "section_4",
      type: "mc_quiz",
      title: "Concept Check: Gap & Niche",
      questions: mcQuestions2,
    },
    {
      id: "section_5",
      type: "open_ended",
      title: "Apply Your Knowledge",
      openEndedPrompt,
    },
  ],
};

export default CARS_LESSON_MODULE;
