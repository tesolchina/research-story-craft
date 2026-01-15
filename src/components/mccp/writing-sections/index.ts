/**
 * Writing Materials Sections - Barrel Export
 * 
 * This folder contains the refactored sections from WritingMaterialsPage.tsx
 * Each section is a self-contained module with its own theory, tasks, samples, and resources.
 * 
 * Purpose:
 * - Keep individual files under 600 lines for maintainability
 * - Allow independent updates to each writing topic
 * - Share common components and constants across sections
 */

// Section components - each represents a major writing topic
export { IntroductionSection } from './IntroductionSection';
export { LiteratureReviewSection } from './LiteratureReviewSection';
export { MethodologySection } from './MethodologySection';
export { CohesionAbstractsSection } from './CohesionAbstractsSection';
export { AIWritingSection } from './AIWritingSection';

// Shared constants and data
export * from './WritingConstants';
