/**
 * Centralized Configuration for Workbook Mentor Agent
 */

// =====================================================
// CONSTANTS - Single source of truth for all magic numbers
// =====================================================

export const AGENT_ID = 'workbook-mentor';
export const AGENT_NAME = 'Workbook Mentor';
export const DEFAULT_MODEL = 'google/gemini-3.5-flash' as const;
export const OBSERVATION_MODEL = DEFAULT_MODEL;

// Memory limits - using underscores for thousands (ESLint rule)
export const MEMORY_MESSAGE_LIMIT = 2_000;
export const OBSERVATION_TOKEN_LIMIT = 8_000;
export const REFLECTION_OBSERVATION_TOKENS = 16_000;
export const MAX_AGENT_STEPS = 20;

// Database configuration
export const WORKBOOK_STORAGE_ID = 'workbook-mentor-storage';
export const WORKBOOK_VECTOR_ID = 'workbook-mentor-vector';
export const DEFAULT_DB_URL = process.env.TURSO_DATABASE_URL || 'file:./mastra.db' as string;
export const DEFAULT_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN || undefined;

// =====================================================
// MEMORY CLASSIFICATION - Structured tags for observations
// =====================================================

/**
 * MemoryKind classifies what type of information we're observing.
 * This enables precise retrieval: "find all behavioral observations"
 */
export enum MemoryKind {
  Behavioral = 'behavioral',           // User actions, tool usage patterns
  Preference = 'preference',          // UI/theme/language preferences
  Project = 'project',               // File changes, build states
  Architecture = 'architecture',       // System design decisions
  Technical = 'technical',            // Stack choices, technical constraints
  Learning = 'learning',              // Key learning moments, breakthroughs
  Misconception = 'misconception',    // Incorrect mental models to address
  Milestone = 'milestone',           // Completed lessons/exercises
  Reflection = 'reflection'          // User self-reflections
}

// =====================================================
// MEMORY LIMITS FOR ACTIVATION PROMPT SUMMARY
// =====================================================

export const ACTIVATION_SUMMARY_MAX_TOKENS = {
  observation: OBSERVATION_TOKEN_LIMIT,
  reflection: REFLECTION_OBSERVATION_TOKENS,
};

// Default export for Mastra's agent registry - create an object and export it properly
const config = { AGENT_ID, AGENT_NAME, DEFAULT_MODEL, MEMORY_MESSAGE_LIMIT, WORKBOOK_STORAGE_ID, WORKBOOK_VECTOR_ID, DEFAULT_DB_URL, DEFAULT_AUTH_TOKEN, MemoryKind, ACTIVATION_SUMMARY_MAX_TOKENS };
export default config;