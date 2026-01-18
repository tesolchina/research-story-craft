/**
 * Short Answer Question Prompts for CARS Coach
 * 
 * These questions encourage deeper reflection and critical thinking.
 * The AI will ask these and evaluate student responses.
 */

export interface ShortAnswerPrompt {
  id: string;
  question: string;
  hints: string[];
  evaluationCriteria: string[];
  sampleGoodResponse: string;
  concept: string;
}

export const SHORT_ANSWER_PROMPTS: ShortAnswerPrompt[] = [
  {
    id: "sa_1",
    question: "In your own words, why do you think Move 2 (establishing a niche) is crucial for a research introduction?",
    hints: [
      "Think about what happens if you skip Move 2",
      "Consider the reader's perspective",
      "How does Move 2 connect Move 1 and Move 3?",
    ],
    evaluationCriteria: [
      "Explains the purpose of creating a 'gap' or 'space'",
      "Mentions justifying the need for the research",
      "Connects to reader engagement or understanding",
    ],
    sampleGoodResponse: "Move 2 is crucial because it justifies why your research needs to exist. Without it, you've shown a topic is important but not why more work is needed. It creates a logical bridge from 'this matters' to 'here's what I'm doing about it.'",
    concept: "move_2_importance",
  },
  {
    id: "sa_2",
    question: "How might the emphasis on different moves vary between disciplines? Give an example if you can.",
    hints: [
      "Think about your own field",
      "Consider sciences vs. humanities",
      "Some fields prioritize gaps; others focus on contributions",
    ],
    evaluationCriteria: [
      "Recognizes disciplinary variation",
      "Provides at least one example or comparison",
      "Shows awareness that CARS is flexible",
    ],
    sampleGoodResponse: "In sciences, Move 2 often emphasizes methodological gaps or unanswered empirical questions, while in humanities, it might focus more on overlooked perspectives or new theoretical angles. For example, in my field of education, we often frame gaps in terms of under-researched populations or contexts.",
    concept: "disciplinary_variation",
  },
  {
    id: "sa_3",
    question: "What signaling words or phrases have you noticed that indicate Move 3 (announcing your research)?",
    hints: [
      "Look for phrases that introduce the current study",
      "Think about verbs that announce research",
      "Consider how researchers position their work",
    ],
    evaluationCriteria: [
      "Identifies at least 2-3 relevant phrases",
      "Phrases are actually used for Move 3",
      "Shows understanding of announcement function",
    ],
    sampleGoodResponse: "Common signals include 'This study aims to...', 'The present research investigates...', 'Here, we examine...', and 'This paper argues that...'. These phrases clearly announce what the research will do and mark the transition from background to the current contribution.",
    concept: "signaling_language",
  },
  {
    id: "sa_4",
    question: "Why might an author cycle back through moves rather than following a strictly linear Move 1 → Move 2 → Move 3 pattern?",
    hints: [
      "Think about complex topics with multiple aspects",
      "Consider longer introductions",
      "How might multiple gaps be addressed?",
    ],
    evaluationCriteria: [
      "Understands non-linear structure possibility",
      "Provides logical reasons for cycling",
      "Shows sophisticated understanding of rhetorical flexibility",
    ],
    sampleGoodResponse: "Authors might cycle through moves when addressing multiple research questions or when the topic has several distinct aspects. For example, they might establish territory for one subtopic, show a gap, then do the same for another subtopic before finally announcing their comprehensive study that addresses all gaps.",
    concept: "structure_flexibility",
  },
  {
    id: "sa_5",
    question: "What advice would you give to a fellow student who is struggling to write Move 2 for their research introduction?",
    hints: [
      "Think about practical strategies",
      "Consider different ways to establish a niche",
      "What resources or models might help?",
    ],
    evaluationCriteria: [
      "Provides actionable advice",
      "Suggests multiple strategies or alternatives",
      "Shows ability to apply CARS knowledge",
    ],
    sampleGoodResponse: "I'd advise them to look at successful papers in their field and identify the gap-signaling language used. They could try different niche strategies: pointing to an overlooked topic, challenging previous methods, or extending existing work to a new context. Reading literature reviews can help identify where the conversation is incomplete.",
    concept: "practical_application",
  },
];

/**
 * Get a random short answer prompt excluding already asked ones
 */
export function getRandomShortAnswer(excludeIds: string[]): ShortAnswerPrompt | null {
  const available = SHORT_ANSWER_PROMPTS.filter(p => !excludeIds.includes(p.id));
  if (available.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

export default SHORT_ANSWER_PROMPTS;
