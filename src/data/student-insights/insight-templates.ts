/**
 * Insight Templates for CARS Coach
 * 
 * These templates help the AI generate consistent, high-quality
 * actionable insights. The AI personalizes these based on student performance.
 * 
 * Developers can add more templates to expand the insight library.
 */

export interface InsightTemplate {
  category: string;
  templates: string[];
}

export const INSIGHT_TEMPLATES: InsightTemplate[] = [
  {
    category: "move_1",
    templates: [
      "Start your introduction with a strong centrality claim that connects your topic to broader issues in {discipline}.",
      "Use authoritative language like 'increasingly,' 'critically important,' or 'growing attention' to establish your topic's significance.",
      "Include 2-3 key citations when making claims about your topic's importance—this adds credibility to Move 1.",
      "Consider opening with a striking statistic or recent development to immediately capture reader interest.",
      "Review your introduction's opening sentences—do they clearly communicate why your topic matters to the field?",
      "Balance general importance claims with specific relevance to your research context.",
    ],
  },
  {
    category: "move_2",
    templates: [
      "Use gap-indicating language like 'however,' 'yet,' 'nevertheless,' or 'little research has...' to clearly signal Move 2.",
      "Your niche doesn't have to be a complete gap—you can also point to methodological limitations or overlooked perspectives.",
      "Make sure your gap statement directly connects to what your research will address in Move 3.",
      "Consider whether a 'counter-claiming' strategy fits your research: challenging assumptions in existing literature.",
      "Be specific about what's missing rather than vague claims like 'more research is needed.'",
      "In {discipline}, gaps are often framed as [specific pattern]—observe how experts in your field do this.",
    ],
  },
  {
    category: "move_3",
    templates: [
      "Begin Move 3 with clear announcement phrases like 'This study aims to...' or 'The present research investigates...'",
      "Ensure your research announcement directly addresses the gap you identified in Move 2.",
      "Consider including a brief preview of your methodology or approach in Move 3.",
      "State your contribution explicitly—don't assume readers will infer how your work fills the gap.",
      "If you have research questions or hypotheses, Move 3 is where they typically appear.",
      "Your Move 3 should make readers understand exactly what to expect from the rest of your paper.",
    ],
  },
  {
    category: "structure",
    templates: [
      "Think of your introduction as telling a story: set the scene (M1), create tension (M2), resolve it (M3).",
      "Consider the 'funnel' structure: start broad with your field, narrow to your specific topic, then your specific contribution.",
      "For longer introductions, you may cycle through moves—but maintain clear transitions between each cycle.",
      "Review your transitions between moves—readers should feel a logical flow from territory to niche to your research.",
      "The length of each move should roughly reflect its importance to your argument.",
      "Use paragraph breaks strategically to signal transitions between major moves.",
    ],
  },
  {
    category: "language",
    templates: [
      "Collect signaling phrases from published papers in your field—create a personal toolkit of expressions for each move.",
      "Notice how modal verbs change between moves: certainty in M1, hedging in M2, commitment in M3.",
      "Use present tense for established knowledge (M1), but 'has been/have been' for identifying gaps (M2).",
      "Your Move 3 typically uses future tense or 'aims to' constructions to signal what your research will do.",
      "Pay attention to how you use 'however,' 'although,' and 'while'—these transition words are crucial for signaling Move 2.",
      "Academic hedging ('may,' 'might,' 'suggests') is appropriate when discussing implications but not when announcing your research.",
    ],
  },
  {
    category: "discipline",
    templates: [
      "In {discipline}, authors often establish territory by emphasizing [specific emphasis].",
      "Research introductions in {discipline} frequently cycle between M1 and M2 before reaching M3.",
      "Note that {discipline} conventions may emphasize practical/theoretical/methodological gaps differently than other fields.",
      "Your field values [specific type] of evidence—make sure your Move 1 reflects this.",
      "Look at recent publications in your target journals to see current conventions for introduction structure.",
      "In {discipline}, the line between literature review and introduction may differ from other fields—adjust accordingly.",
    ],
  },
];

/**
 * Get templates for a specific category
 */
export function getTemplatesByCategory(category: string): string[] {
  const found = INSIGHT_TEMPLATES.find(t => t.category === category);
  return found?.templates || [];
}

/**
 * Get all templates flattened with their categories
 */
export function getAllTemplates(): { category: string; text: string }[] {
  return INSIGHT_TEMPLATES.flatMap(t => 
    t.templates.map(text => ({ category: t.category, text }))
  );
}

export default INSIGHT_TEMPLATES;
