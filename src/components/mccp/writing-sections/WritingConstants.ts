/**
 * Writing Materials - Shared Constants and Data
 * 
 * Contains all shared data structures, sample texts, and configuration
 * used across the writing materials sections.
 * 
 * Purpose:
 * - Centralize content that may need updates
 * - Avoid duplication across section components
 * - Make content easily editable by non-developers
 */

// ============================================================================
// CARS Model Data (Swales, 1990)
// Used in Introduction Writing section
// ============================================================================

export interface CARSMove {
  title: string;
  subtitle: string;
  steps: string[];
}

/**
 * The CARS (Create A Research Space) Model moves
 * Core framework for analyzing and writing research introductions
 */
export const CARS_MODEL: CARSMove[] = [
  {
    title: "Move 1: Establishing Territory",
    subtitle: "The Situation",
    steps: [
      "Describe the research problem and provide evidence to support why the topic is important",
      "Explain the current state of knowledge, consensus, practice or description of phenomena",
      "Synthesize key prior research that supports the need to study the research problem"
    ]
  },
  {
    title: "Move 2: Establishing a Niche",
    subtitle: "The Problem",
    steps: [
      "Introduce an opposing viewpoint/perspective to current knowledge; OR",
      "Develop the research around a gap/understudied area; OR",
      "Present key questions about consequences of gaps; OR",
      "Extend prior research to expand/clarify a problem"
    ]
  },
  {
    title: "Move 3: Occupying the Niche",
    subtitle: "The Solution",
    steps: [
      "Explain clearly the objectives of your study",
      "Present a brief summary of the key findings",
      "Indicate how the remainder is organized"
    ]
  }
];

// ============================================================================
// Centrality Statement Features
// Used in Introduction Writing section
// ============================================================================

export interface CentralityFeature {
  title: string;
  examples: string;
}

export const CENTRALITY_FEATURES: CentralityFeature[] = [
  {
    title: "Evaluative Adjectives",
    examples: "valuable, central, major, important, significant"
  },
  {
    title: "Impact/Growing Awareness",
    examples: "increasingly, growing, a classic problem"
  },
  {
    title: "Currency of Topic",
    examples: "current, recent, recently"
  },
  {
    title: "Inversion Patterns",
    examples: '"Particularly noteworthy is that...", "Of great concern is..."'
  }
];

export const CENTRALITY_EXAMPLES = [
  '"Recently, there has been a wide interest in..."',
  '"The study of X has become an important aspect of..."',
  '"The relationship between X and Y has been studied by many researchers."'
];

// ============================================================================
// Literature Review Data
// ============================================================================

export interface LiteratureReviewMove {
  move: string;
  function: string;
}

export const LITERATURE_REVIEW_MOVES: LiteratureReviewMove[] = [
  { move: "Move 1", function: "Background information / Main theme introduction" },
  { move: "Move 2", function: "Research focus with summaries/syntheses of previous studies" },
  { move: "Move 3", function: "Research gap identification" },
  { move: "Move 4", function: "Justification of methodology / Importance of current study" },
  { move: "Move 5", function: "Objectives of current study" }
];

export interface ReportingVerbs {
  tentative: string[];
  neutral: string[];
  strong: string[];
}

export const REPORTING_VERBS: ReportingVerbs = {
  tentative: ["suggest", "hypothesize", "imply", "postulate", "propose", "question", "speculate"],
  neutral: ["describe", "discuss", "examine", "explain", "identify", "indicate", "note", "observe", "report", "show", "state"],
  strong: ["argue", "assert", "claim", "conclude", "confirm", "contend", "emphasize", "establish", "maintain", "stress"]
};

export interface EvaluativeLanguage {
  positive: string[];
  negative: string[];
  hedging: string[];
  boosting: string[];
}

export const EVALUATIVE_LANGUAGE: EvaluativeLanguage = {
  positive: ["significant", "insightful", "comprehensive", "rigorous", "innovative", "pioneering"],
  negative: ["limited", "flawed", "inconclusive", "overlooked", "problematic", "outdated"],
  hedging: ["may", "might", "could", "possibly", "appears to", "seems to", "tends to", "it is likely that"],
  boosting: ["clearly", "certainly", "definitely", "undoubtedly", "it is evident that"]
};

// ============================================================================
// Abstract Structure Data (Hyland, 2000)
// ============================================================================

export interface AbstractMove {
  code: string;
  name: string;
  content: string;
  tense: string;
}

export const ABSTRACT_MOVES: AbstractMove[] = [
  { code: "I", name: "Introduction", content: "Background context", tense: "Present/Present Perfect" },
  { code: "P", name: "Purpose", content: "Research objectives", tense: "Present" },
  { code: "M", name: "Method", content: "Research approach", tense: "Past" },
  { code: "Pr", name: "Product", content: "Key findings", tense: "Past" },
  { code: "C", name: "Conclusion", content: "Implications (optional)", tense: "Present/Modal" }
];

export interface DisciplineAbstractPattern {
  discipline: string;
  patterns: string;
}

export const DISCIPLINE_ABSTRACT_PATTERNS: DisciplineAbstractPattern[] = [
  { discipline: "Philosophy", patterns: "I-P-Pr, P-Pr" },
  { discipline: "Sociology", patterns: "I-P-M-Pr, P-M-Pr-C" },
  { discipline: "Applied Linguistics", patterns: "I-P-M-Pr-C (full IMRAD)" },
  { discipline: "Biology", patterns: "P-M-Pr-C" },
  { discipline: "Physics", patterns: "P-M-Pr, P-Pr" }
];

// ============================================================================
// Methodology Language Features
// ============================================================================

export const METHODOLOGY_LANGUAGE = {
  tenseUsage: {
    past: "Describe what you did in your study",
    present: "Facts, references to figures/diagrams, standard procedures"
  },
  voiceUsage: {
    passive: "When emphasizing what was done",
    active: "When emphasizing who did it (preferred by Nature, Science, BMJ)"
  },
  sequencers: ["First", "Then", "After", "Subsequently", "Finally", "Prior to", "During", "Following"],
  purposeExpressions: [
    '"To avoid...", "In order to...", "To assess..."',
    '"In an effort to evaluate...", "For the purpose of..."',
    '"In the interest of obtaining useful data..."'
  ]
};

// ============================================================================
// External Resources
// ============================================================================

export interface ExternalResource {
  title: string;
  url: string;
  description?: string;
}

export const PHRASEBANK_RESOURCES: ExternalResource[] = [
  {
    title: "Academic Phrasebank - Introducing Work",
    url: "http://www.phrasebank.manchester.ac.uk/introducing-work/",
    description: "University of Manchester"
  },
  {
    title: "Academic Phrasebank - Describing Methods",
    url: "http://www.phrasebank.manchester.ac.uk/describing-methods/",
    description: "University of Manchester"
  },
  {
    title: "Academic Phrasebank - Reporting Results",
    url: "http://www.phrasebank.manchester.ac.uk/reporting-results/",
    description: "University of Manchester"
  }
];

export const AI_DETECTION_TOOLS: ExternalResource[] = [
  { title: "GPTZero", url: "https://gptzero.me/" },
  { title: "Copyleaks AI Content Detector", url: "https://copyleaks.com/ai-content-detector" }
];

// ============================================================================
// AI Prompts for Academic Writing
// ============================================================================

export interface AIPrompt {
  title: string;
  prompt: string;
}

export const AI_WRITING_PROMPTS: AIPrompt[] = [
  {
    title: "Analyze CARS Moves",
    prompt: "Analyze the following introduction using Swales' CARS model. Identify Move 1, 2, and 3, and highlight the centrality statements."
  },
  {
    title: "Evaluate Centrality Statement",
    prompt: "Comment on the following centrality statement for my thesis. Does it effectively establish the importance of my topic? What can be improved?"
  },
  {
    title: "Check Paraphrase Quality",
    prompt: "Compare my paraphrase with the original. Have I changed the structure, used different vocabulary, and maintained the meaning?"
  },
  {
    title: "Analyze Literature Review",
    prompt: "Analyze this literature review excerpt. Identify the moves, evaluate the synthesis quality, and suggest improvements."
  }
];
