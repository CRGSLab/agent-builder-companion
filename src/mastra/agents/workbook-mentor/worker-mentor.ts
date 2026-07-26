/**
 * Workbook Mentor Agent - Composition Root
 */

import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { ModelRouterEmbeddingModel } from '@mastra/core/llm';
import { LibSQLStore, LibSQLVector } from '@mastra/libsql';

// =====================================================
// STEP 1: Import all configuration and prompts
// =====================================================

import {
  AGENT_ID,
  DEFAULT_MODEL,
  MEMORY_MESSAGE_LIMIT,
  WORKBOOK_STORAGE_ID,
  WORKBOOK_VECTOR_ID,
  DEFAULT_DB_URL,
  DEFAULT_AUTH_TOKEN,
} from './config.js';

import baseSystemPrompt from './prompts/system-prompt.js';
import { composeFullSystemPrompt } from './prompts/constitution.js';
import memoryObserverPrompt from './prompts/activation-prompt.js';

// =====================================================
// STEP 2: Compose the system prompt (modular assembly)
// =====================================================

const fullSystemPrompt = composeFullSystemPrompt();

// =====================================================
// STEP 3: Construct memory with proper options
// =====================================================

/**
 * Observational Memory Configuration - simplified without incorrect type imports
 */
const observationalMemoryOptions = {
  model: DEFAULT_MODEL,
  observation: { messageTokens: MEMORY_MESSAGE_LIMIT },
  reflection: { observationTokens: MEMORY_MESSAGE_LIMIT * 4 },
  activationPrompt: memoryObserverPrompt,
};

// =====================================================
// STEP 4: Construct the Agent instance
// =====================================================

export const workbookMentorAgent = new Agent({
  id: AGENT_ID,
  name: 'Workbook Mentor',
  description:
    'A neurodivergent-first AI agent that teaches the principles of building AI agents through structured learning, reflection, and mastery-based guidance.',

  instructions: fullSystemPrompt,
  model: DEFAULT_MODEL,

  memory: new Memory({
    storage: new LibSQLStore({
      id: WORKBOOK_STORAGE_ID,
      url: DEFAULT_DB_URL,
      authToken: DEFAULT_AUTH_TOKEN,
    }),
    vector: new LibSQLVector({
      id: WORKBOOK_VECTOR_ID,
      url: DEFAULT_DB_URL,
      authToken: DEFAULT_AUTH_TOKEN,
    }),
    embedder: new ModelRouterEmbeddingModel(DEFAULT_MODEL),
    options: {
      semanticRecall: true,
      generateTitle: true,
      observationalMemory: observationalMemoryOptions,
      workingMemory: { enabled: true, useStateSignals: true },
    },
  }),

  defaultOptions: { maxSteps: 20 },
});

export default workbookMentorAgent;
