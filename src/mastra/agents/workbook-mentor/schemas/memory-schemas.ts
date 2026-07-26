/**
 * Typed Schemas for Working Memory and Observations
 */

import { z } from 'zod';

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

/**
 * WorkingMemoryState - The instructional state machine the mentor follows.
 * This mirrors the lesson structure you're teaching, creating consistency between
 * what students learn and how the agent operates.
 */
export enum LessonState {
  /** Initial orientation to the workbook */
  INTRODUCTION = 'introduction',
  
  /** Defining what successful completion looks like */
  OUTCOME = 'outcome',
  
  /** Setting up the environment and prerequisites */
  SETUP = 'setup',
  
  /** The actual coding/building phase */
  BUILD = 'build',
  
  /** Verifying against expected output, files, tests */
  VERIFY = 'verify',
  
  /** Reflecting on what was learned and misconceptions corrected */
  REFLECT = 'reflect',
  
  /** Transition to the next lesson or completion */
  NEXT = 'next'
}

/**
 * WorkingMemorySchema - What we track in short-term memory.
 * These are transient, episode-specific states that reset each workbook session.
 */
export const workingMemorySchema = z.object({
  /** Which lesson we're currently teaching */
  currentChapter: z.string().optional(),
  
  /** The specific section within a chapter */
  currentSection: z.string().optional(),
  
  /** The exact exercise or task being worked on */
  currentExercise: z.string().optional(),
  
  /** What the learner should accomplish in this session */
  currentGoal: z.string().optional(),
  
  /** Common misunderstandings that have emerged during this lesson */
  activeMisconceptions: z.array(z.object({
    id: z.string(),
    description: z.string(),
    severity: z.enum(['minor', 'moderate', 'critical'])
  })).optional().default([]),
  
  /** Is the current build working? What errors are blocking progress? */
  validationState: z.object({
    isWorking: z.boolean(),
    lastError: z.string().nullable(),
    expectedBuildOutput: z.string().optional()
  }),
  
  /** When did the last successful build occur? */
  lastSuccessfulBuild: z.number().nullish(), // timestamp in ms
  
  /** Questions or clarifications pending resolution from the user */
  pendingQuestions: z.array(z.string()).optional().default([]),
  
  /** Any constraints the learner has mentioned (time, tools, skills) */
  knownConstraints: z.array(z.object({
    type: z.enum(['environment', 'skill', 'availability', 'hardware']),
    description: z.string()
  })).optional().default([]),
  
  /** Approximate cognitive load the learner is experiencing */
  estimatedCognitiveLoad: z.number().optional() // 0-10 scale
}).passthrough();

export type WorkingMemoryState = z.infer<typeof workingMemorySchema>;

/**
 * ObservationRecord - The structured format for memory observer summaries.
 * Using Zod schemas ensures type safety and document-like clarity.
 */
export const observationSchema = z.object({
  /** What category does this observation belong to? Enables retrieval filtering. */
  kind: z.nativeEnum(MemoryKind),
  
  /** The actual text summary of what happened or was learned */
  summary: z.string().max(2000),
  
  /** How confident is this observation? Helps with prioritization in summaries. */
  confidence: z.number().min(0).max(1), // 0-1, where 1 = very certain
  
  /** Why did we consider this important enough to remember? */
  reason: z.string(),
  
  /** Should this appear in the next activation summary? Yes/No flag. */
  shouldPersist: z.boolean().default(true)
}).passthrough();

export type ObservationRecord = z.infer<typeof observationSchema>;

/**
 * User profile schema - This is NOT part of system prompts.
 * It lives in memory and gets injected via middleware when needed.
 */
export const userProfileSchema = z.object({
  /** Neurodivergent traits that affect learning style */
  neurodivergence: z.array(z.object({
    condition: z.string(), // e.g., "ADHD", "Autism", "dyslexia"
    preferredInstructions: z.string(), // "Visual step-by-step" for ADHD, etc.
    sensoryPreferences: z.any().optional()
  })).optional().default([]),
  
  /** Technical preferences (IDE theme, language settings) */
  technicalPreferences: z.object({
    editorTheme: z.string().optional(),
    preferredEditor: z.string().optional(),
    shell: z.enum(['zsh', 'bash', 'fish']).optional()
  }).optional().default({}),
  
  /** Curriculum preferences (pacing, difficulty level) */
  learningPreferences: z.object({
    pace: z.enum(['slow', 'moderate', 'fast']).optional(),
    explanationStyle: z.string().optional(), // "more metaphors", "less jargon"
    challengeLevel: z.number().min(1).max(5).optional()
  }).optional().default({})
}).passthrough();

export type UserProfile = z.infer<typeof userProfileSchema>;
