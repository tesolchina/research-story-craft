/**
 * Multiple Choice Question Bank for CARS Coach
 * 
 * These questions test student understanding of moves and steps.
 * The AI uses these as a reference but can also generate new questions.
 * 
 * Difficulty levels:
 * - easy: Basic concept recognition
 * - medium: Application and identification
 * - hard: Analysis and evaluation
 */

export interface MCQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  concept: string;
}

export const MC_QUESTION_BANK: MCQuestion[] = [
  // Easy questions - Basic concept recognition
  {
    id: "mc_easy_1",
    question: "How many moves are in the CARS model?",
    options: [
      { label: "A", text: "2 moves" },
      { label: "B", text: "3 moves" },
      { label: "C", text: "4 moves" },
      { label: "D", text: "5 moves" },
    ],
    correctAnswer: "B",
    explanation: "The CARS model consists of 3 moves: Move 1 (Establishing a Territory), Move 2 (Establishing a Niche), and Move 3 (Occupying the Niche).",
    difficulty: "easy",
    concept: "basic_structure",
  },
  {
    id: "mc_easy_2",
    question: "What does CARS stand for in the CARS model?",
    options: [
      { label: "A", text: "Create A Research Study" },
      { label: "B", text: "Create A Research Space" },
      { label: "C", text: "Critical Analysis of Research Structure" },
      { label: "D", text: "Construct Academic Research Sections" },
    ],
    correctAnswer: "B",
    explanation: "CARS stands for 'Create A Research Space,' developed by John Swales to describe how research article introductions work.",
    difficulty: "easy",
    concept: "basic_terminology",
  },
  {
    id: "mc_easy_3",
    question: "Which move involves showing that your research topic is important?",
    options: [
      { label: "A", text: "Move 1: Establishing a Territory" },
      { label: "B", text: "Move 2: Establishing a Niche" },
      { label: "C", text: "Move 3: Occupying the Niche" },
      { label: "D", text: "None of the above" },
    ],
    correctAnswer: "A",
    explanation: "Move 1 (Establishing a Territory) is about demonstrating the importance and relevance of your research area.",
    difficulty: "easy",
    concept: "move_1",
  },

  // Medium questions - Application
  {
    id: "mc_med_1",
    question: "Which phrase typically signals Move 2 (establishing a niche)?",
    options: [
      { label: "A", text: "Research on this topic has grown significantly..." },
      { label: "B", text: "However, little attention has been paid to..." },
      { label: "C", text: "This study aims to investigate..." },
      { label: "D", text: "Many scholars have examined..." },
    ],
    correctAnswer: "B",
    explanation: "'However, little attention has been paid to...' signals a gap in existing research, which is the purpose of Move 2.",
    difficulty: "medium",
    concept: "gap_language",
  },
  {
    id: "mc_med_2",
    question: "A writer states: 'Climate change has become one of the most pressing issues of our time.' Which step of Move 1 is this?",
    options: [
      { label: "A", text: "Step 1: Claiming centrality" },
      { label: "B", text: "Step 2: Making topic generalizations" },
      { label: "C", text: "Step 3: Reviewing previous research" },
      { label: "D", text: "This is actually Move 2" },
    ],
    correctAnswer: "A",
    explanation: "Claiming centrality involves asserting that the research topic is important, significant, or interesting—exactly what this sentence does.",
    difficulty: "medium",
    concept: "move_1_steps",
  },
  {
    id: "mc_med_3",
    question: "What is the primary purpose of Move 3?",
    options: [
      { label: "A", text: "To review all previous literature on the topic" },
      { label: "B", text: "To identify problems with existing research" },
      { label: "C", text: "To state how your research addresses the gap" },
      { label: "D", text: "To summarize the key findings" },
    ],
    correctAnswer: "C",
    explanation: "Move 3 (Occupying the Niche) is where you announce your research and explain how it fills the gap identified in Move 2.",
    difficulty: "medium",
    concept: "move_3",
  },
  {
    id: "mc_med_4",
    question: "Which sentence represents Move 2, Step 2 (Presenting a problem)?",
    options: [
      { label: "A", text: "Few researchers have examined this phenomenon." },
      { label: "B", text: "Previous approaches suffer from methodological limitations." },
      { label: "C", text: "This study investigates three aspects of the issue." },
      { label: "D", text: "Several studies have explored this topic." },
    ],
    correctAnswer: "B",
    explanation: "Presenting a problem (Step 2 of Move 2) involves pointing out issues or limitations with current research, as shown in option B.",
    difficulty: "medium",
    concept: "move_2_steps",
  },

  // Hard questions - Analysis
  {
    id: "mc_hard_1",
    question: "In some disciplines, Move 2 may be optional. Why might a researcher skip Move 2?",
    options: [
      { label: "A", text: "When the topic is completely new with no existing research" },
      { label: "B", text: "When the introduction is too long" },
      { label: "C", text: "When writing for a non-academic audience" },
      { label: "D", text: "Move 2 is never optional" },
    ],
    correctAnswer: "A",
    explanation: "When a topic is entirely new, there may be no gap to identify because there's no prior research. In such cases, the niche is self-evident.",
    difficulty: "hard",
    concept: "flexibility",
  },
  {
    id: "mc_hard_2",
    question: "A writer uses citations like '(Smith, 2020; Jones, 2019; Lee, 2021)' after making a claim. This combination is most likely:",
    options: [
      { label: "A", text: "Move 1, Step 1: Claiming centrality with evidence" },
      { label: "B", text: "Move 1, Step 3: Reviewing previous research" },
      { label: "C", text: "Move 2, Step 1: Indicating a gap" },
      { label: "D", text: "Move 3, Step 2: Presenting main findings" },
    ],
    correctAnswer: "B",
    explanation: "Multiple citations supporting a claim typically indicate Move 1, Step 3, where the writer reviews and summarizes existing research.",
    difficulty: "hard",
    concept: "citation_patterns",
  },
  {
    id: "mc_hard_3",
    question: "How do the moves in the CARS model create a 'rhetorical' space for research?",
    options: [
      { label: "A", text: "By using persuasive language throughout" },
      { label: "B", text: "By first establishing importance, then showing a need, then filling that need" },
      { label: "C", text: "By avoiding technical jargon" },
      { label: "D", text: "By following a strict word count formula" },
    ],
    correctAnswer: "B",
    explanation: "The CARS model creates rhetorical space by building a logical argument: the topic matters (M1), there's something missing (M2), and here's how this research helps (M3).",
    difficulty: "hard",
    concept: "rhetorical_purpose",
  },
];

/**
 * Get questions by difficulty level
 */
export function getQuestionsByDifficulty(difficulty: "easy" | "medium" | "hard"): MCQuestion[] {
  return MC_QUESTION_BANK.filter(q => q.difficulty === difficulty);
}

/**
 * Get a random question excluding already asked ones
 */
export function getRandomQuestion(excludeIds: string[], preferDifficulty?: "easy" | "medium" | "hard"): MCQuestion | null {
  let available = MC_QUESTION_BANK.filter(q => !excludeIds.includes(q.id));
  
  if (preferDifficulty) {
    const preferred = available.filter(q => q.difficulty === preferDifficulty);
    if (preferred.length > 0) {
      available = preferred;
    }
  }
  
  if (available.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

export default MC_QUESTION_BANK;
