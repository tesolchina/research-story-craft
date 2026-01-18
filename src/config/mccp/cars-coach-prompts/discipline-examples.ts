/**
 * CARS Model Examples by Discipline
 * 
 * These examples are used to show students how the CARS model
 * applies in their specific field. Developers can add more examples
 * or modify existing ones.
 * 
 * Each example includes:
 * - paragraph: The actual text
 * - annotations: Move and step labels with positions
 * - source: Citation or "Adapted from..." note
 */

export interface DisciplineExample {
  id: string;
  discipline: string;
  paragraph: string;
  annotations: {
    move: number;
    step: number;
    label: string;
    text: string;
  }[];
  source: string;
}

export const DISCIPLINE_EXAMPLES: DisciplineExample[] = [
  // Applied Linguistics
  {
    id: "al_1",
    discipline: "applied_linguistics",
    paragraph: `Academic writing has become increasingly important in higher education contexts worldwide, with universities placing greater emphasis on students' ability to communicate research effectively (Hyland, 2009). However, despite this growing recognition, many graduate students, particularly those from non-English speaking backgrounds, struggle to master the conventions of academic discourse in their disciplines. This study investigates how L2 doctoral students learn to navigate genre expectations in research article introductions.`,
    annotations: [
      { move: 1, step: 1, label: "Claiming centrality", text: "Academic writing has become increasingly important in higher education contexts worldwide" },
      { move: 1, step: 2, label: "Making topic generalizations", text: "with universities placing greater emphasis on students' ability to communicate research effectively" },
      { move: 2, step: 1, label: "Indicating a gap", text: "However, despite this growing recognition, many graduate students... struggle to master the conventions" },
      { move: 3, step: 1, label: "Announcing present research", text: "This study investigates how L2 doctoral students learn to navigate genre expectations" },
    ],
    source: "Adapted from published research in English for Specific Purposes",
  },
  {
    id: "al_2",
    discipline: "applied_linguistics",
    paragraph: `The teaching of pragmatics has received considerable attention in second language acquisition research (Kasper & Rose, 2002; Taguchi, 2015). Studies have consistently shown that explicit instruction can facilitate the development of pragmatic competence. Yet, relatively few studies have examined how teachers actually implement pragmatics instruction in real classroom contexts. The present study addresses this gap by observing and analyzing pragmatics teaching practices in six ESL classrooms.`,
    annotations: [
      { move: 1, step: 1, label: "Claiming centrality", text: "The teaching of pragmatics has received considerable attention in second language acquisition research" },
      { move: 1, step: 3, label: "Reviewing previous research", text: "Studies have consistently shown that explicit instruction can facilitate the development of pragmatic competence" },
      { move: 2, step: 1, label: "Indicating a gap", text: "Yet, relatively few studies have examined how teachers actually implement pragmatics instruction" },
      { move: 3, step: 1, label: "Announcing present research", text: "The present study addresses this gap by observing and analyzing" },
    ],
    source: "Adapted from published research in Applied Linguistics",
  },

  // Education
  {
    id: "ed_1",
    discipline: "education",
    paragraph: `Student motivation has long been recognized as a crucial factor in academic achievement (Deci & Ryan, 2000; Wigfield & Eccles, 2000). Extensive research demonstrates that intrinsically motivated students show greater persistence, deeper engagement, and better learning outcomes. However, the mechanisms through which teachers can effectively foster intrinsic motivation remain poorly understood. This paper presents findings from a mixed-methods study examining teacher practices that promote student motivation in middle school mathematics classrooms.`,
    annotations: [
      { move: 1, step: 1, label: "Claiming centrality", text: "Student motivation has long been recognized as a crucial factor in academic achievement" },
      { move: 1, step: 3, label: "Reviewing previous research", text: "Extensive research demonstrates that intrinsically motivated students show greater persistence" },
      { move: 2, step: 1, label: "Indicating a gap", text: "However, the mechanisms through which teachers can effectively foster intrinsic motivation remain poorly understood" },
      { move: 3, step: 1, label: "Announcing present research", text: "This paper presents findings from a mixed-methods study examining teacher practices" },
    ],
    source: "Adapted from published research in Educational Psychology",
  },
  {
    id: "ed_2",
    discipline: "education",
    paragraph: `Online learning has transformed educational delivery across all levels of instruction, particularly following the global shift to remote education in 2020 (Hodges et al., 2020). While technological infrastructure has improved rapidly, questions remain about pedagogical approaches that best support student learning in virtual environments. Little attention has been paid to how instructors adapt their feedback practices in asynchronous online courses. This study explores feedback strategies employed by experienced online instructors and their perceived effectiveness.`,
    annotations: [
      { move: 1, step: 1, label: "Claiming centrality", text: "Online learning has transformed educational delivery across all levels of instruction" },
      { move: 1, step: 2, label: "Making topic generalizations", text: "While technological infrastructure has improved rapidly" },
      { move: 2, step: 1, label: "Indicating a gap", text: "Little attention has been paid to how instructors adapt their feedback practices" },
      { move: 3, step: 1, label: "Announcing present research", text: "This study explores feedback strategies employed by experienced online instructors" },
    ],
    source: "Adapted from published research in Distance Education",
  },

  // Social Sciences
  {
    id: "ss_1",
    discipline: "social_sciences",
    paragraph: `Social media platforms have fundamentally altered how individuals form and maintain relationships (boyd & Ellison, 2007). The pervasive use of platforms such as Instagram and TikTok among adolescents has prompted concerns about potential impacts on mental health and well-being. While some studies suggest negative associations between social media use and psychological outcomes, findings remain inconsistent and methodologically limited. The current study employs longitudinal methods to examine the relationship between social media engagement patterns and adolescent well-being over a two-year period.`,
    annotations: [
      { move: 1, step: 1, label: "Claiming centrality", text: "Social media platforms have fundamentally altered how individuals form and maintain relationships" },
      { move: 1, step: 2, label: "Making topic generalizations", text: "The pervasive use of platforms... has prompted concerns about potential impacts on mental health" },
      { move: 2, step: 1, label: "Indicating a gap", text: "findings remain inconsistent and methodologically limited" },
      { move: 3, step: 1, label: "Announcing present research", text: "The current study employs longitudinal methods to examine the relationship" },
    ],
    source: "Adapted from published research in Journal of Social Psychology",
  },

  // STEM
  {
    id: "stem_1",
    discipline: "stem",
    paragraph: `Climate change poses significant threats to global food security, with rising temperatures and altered precipitation patterns affecting crop yields worldwide (IPCC, 2021). Advances in genetic engineering have opened new possibilities for developing climate-resilient crop varieties. Previous research has successfully enhanced drought tolerance in laboratory conditions, but field performance of these modified varieties remains largely untested. Here we present results from multi-year field trials of drought-tolerant wheat varieties across three distinct climate zones.`,
    annotations: [
      { move: 1, step: 1, label: "Claiming centrality", text: "Climate change poses significant threats to global food security" },
      { move: 1, step: 3, label: "Reviewing previous research", text: "Advances in genetic engineering have opened new possibilities... Previous research has successfully enhanced drought tolerance" },
      { move: 2, step: 1, label: "Indicating a gap", text: "but field performance of these modified varieties remains largely untested" },
      { move: 3, step: 1, label: "Announcing present research", text: "Here we present results from multi-year field trials" },
    ],
    source: "Adapted from published research in Nature Plants",
  },
  {
    id: "stem_2",
    discipline: "stem",
    paragraph: `Machine learning algorithms have achieved remarkable success in image classification tasks (LeCun et al., 2015). Deep neural networks can now match or exceed human performance on specific visual recognition benchmarks. Nevertheless, these models remain vulnerable to adversarial examples—carefully crafted inputs that cause misclassification while appearing unchanged to humans. This paper proposes a novel defense mechanism based on input transformation that significantly improves model robustness against adversarial attacks.`,
    annotations: [
      { move: 1, step: 1, label: "Claiming centrality", text: "Machine learning algorithms have achieved remarkable success in image classification tasks" },
      { move: 1, step: 3, label: "Reviewing previous research", text: "Deep neural networks can now match or exceed human performance" },
      { move: 2, step: 2, label: "Presenting a problem", text: "Nevertheless, these models remain vulnerable to adversarial examples" },
      { move: 3, step: 1, label: "Announcing present research", text: "This paper proposes a novel defense mechanism" },
    ],
    source: "Adapted from published research in Computer Science",
  },

  // Humanities
  {
    id: "hum_1",
    discipline: "humanities",
    paragraph: `Victorian literature has long served as a lens for understanding nineteenth-century attitudes toward class, gender, and empire (Said, 1993; Poovey, 1988). Scholars have extensively analyzed how canonical authors represented social hierarchies in their fiction. However, the voices of working-class women writers from this period remain largely absent from critical discourse. This article recovers and examines the writings of three previously overlooked factory workers who published fiction in regional newspapers between 1850 and 1880.`,
    annotations: [
      { move: 1, step: 1, label: "Claiming centrality", text: "Victorian literature has long served as a lens for understanding nineteenth-century attitudes" },
      { move: 1, step: 3, label: "Reviewing previous research", text: "Scholars have extensively analyzed how canonical authors represented social hierarchies" },
      { move: 2, step: 1, label: "Indicating a gap", text: "However, the voices of working-class women writers from this period remain largely absent" },
      { move: 3, step: 1, label: "Announcing present research", text: "This article recovers and examines the writings of three previously overlooked factory workers" },
    ],
    source: "Adapted from published research in Victorian Studies",
  },

  // Business
  {
    id: "bus_1",
    discipline: "business",
    paragraph: `Corporate sustainability practices have become increasingly central to organizational strategy and stakeholder relations (Elkington, 1997; Porter & Kramer, 2011). Research demonstrates that companies with strong environmental, social, and governance (ESG) performance often achieve better long-term financial outcomes. Yet, the processes through which organizations authentically embed sustainability into their core operations, rather than treating it as peripheral PR activity, are not well documented. Through comparative case studies of five multinational corporations, this study identifies key organizational mechanisms that facilitate genuine sustainability integration.`,
    annotations: [
      { move: 1, step: 1, label: "Claiming centrality", text: "Corporate sustainability practices have become increasingly central to organizational strategy" },
      { move: 1, step: 3, label: "Reviewing previous research", text: "Research demonstrates that companies with strong ESG performance often achieve better long-term financial outcomes" },
      { move: 2, step: 1, label: "Indicating a gap", text: "Yet, the processes through which organizations authentically embed sustainability... are not well documented" },
      { move: 3, step: 1, label: "Announcing present research", text: "Through comparative case studies... this study identifies key organizational mechanisms" },
    ],
    source: "Adapted from published research in Strategic Management Journal",
  },

  // Health Sciences
  {
    id: "hs_1",
    discipline: "health_sciences",
    paragraph: `Mental health disorders represent a leading cause of disability worldwide, with depression affecting over 300 million people globally (WHO, 2017). While pharmacological treatments remain widely prescribed, growing evidence supports the efficacy of psychological interventions, particularly cognitive-behavioral therapy. However, access to qualified therapists remains limited, especially in low-resource settings. This randomized controlled trial evaluates the effectiveness of a smartphone-based CBT application in reducing depressive symptoms among adults in rural communities.`,
    annotations: [
      { move: 1, step: 1, label: "Claiming centrality", text: "Mental health disorders represent a leading cause of disability worldwide" },
      { move: 1, step: 3, label: "Reviewing previous research", text: "growing evidence supports the efficacy of psychological interventions, particularly cognitive-behavioral therapy" },
      { move: 2, step: 2, label: "Presenting a problem", text: "However, access to qualified therapists remains limited, especially in low-resource settings" },
      { move: 3, step: 1, label: "Announcing present research", text: "This randomized controlled trial evaluates the effectiveness of a smartphone-based CBT application" },
    ],
    source: "Adapted from published research in JAMA Psychiatry",
  },

  // Generic/Other
  {
    id: "other_1",
    discipline: "other",
    paragraph: `Research on [topic] has grown substantially in recent decades, reflecting its importance to both theory and practice in the field. Previous studies have established key principles and frameworks for understanding [topic]. However, significant questions remain about [specific aspect]. This study addresses this gap by examining [approach/method].`,
    annotations: [
      { move: 1, step: 1, label: "Claiming centrality", text: "Research on [topic] has grown substantially in recent decades" },
      { move: 1, step: 3, label: "Reviewing previous research", text: "Previous studies have established key principles and frameworks" },
      { move: 2, step: 1, label: "Indicating a gap", text: "However, significant questions remain about [specific aspect]" },
      { move: 3, step: 1, label: "Announcing present research", text: "This study addresses this gap by examining" },
    ],
    source: "Generic template - adapt to your discipline",
  },
];

/**
 * Get examples for a specific discipline
 */
export function getExamplesForDiscipline(discipline: string): DisciplineExample[] {
  const examples = DISCIPLINE_EXAMPLES.filter(e => e.discipline === discipline);
  // If no specific examples, return generic ones
  if (examples.length === 0) {
    return DISCIPLINE_EXAMPLES.filter(e => e.discipline === "other");
  }
  return examples;
}

export default DISCIPLINE_EXAMPLES;
