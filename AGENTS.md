# Canonical Rules: The Narrative of the Master Barista's Manual

## Core Philosophy

If a person walked into this shop having never seen a coffee bean, and if this manual were read aloud to them while they kept their eyes closed, they could pull a flawless, Michelin-star double-shot of espresso on their very first attempt.

The manual does not start with a dry lecture. It starts by describing the **perfect, extracted espresso** in a pre-heated ceramic cup: its dark hazelnut color, thick honey-like crema, and exact volume of 36 grams. This is **Backwards Design**—knowing exactly what the destination looks before touching a single dial.

It breaks physical movement into tiny, single, non-overlapping motions. Not "grind the coffee." Instead: "Place the metal portafilter basket directly under the grinder chute. Press the black button with your index finger for exactly 5.2 seconds." This is **Task Analysis**.

It assumes zero prior knowledge. Every tool is defined before use. Every step has an undeniable physical signal: "You will know the grind is correct because when you pinch it between thumb and forefinger, it feels like dry sand, not flour." This is the **Blind Man's Test**.

By framing software engineering this way, we eliminate the terror of the blank page. We bypass executive dysfunction. We turn coding into a predictable, rhythmic, deeply satisfying tactile experience.

---

## The Four Canonical Elements: Logic Flows and Definitions

These four foundational rules function as strict logical algorithms. Every chapter written, every exercise constructed, and every word spoken must conform to them.

### 1. Narrative-First

**Definition:** Grounding every abstract computational concept in a physical, real-world narrative analogy (The Smart Espresso Bar) *before* introducing a single line of code or technical jargon. This creates a solid spatial and functional mental model for the brain to attach new information to.

**Logic Flow:
```
[Start Section]
     |
     v
[Identify the Technical Concept] (e.g., "System Prompt vs. Tool Definition")
     |
     v
[Map to Physical Analogy] (e.g., "Recipe Card vs. Physical Grinder Button")
     |
     v
[Translate Functions] (Explain how physics of analogy matches code logic)
     |
     v
[Introduce the Code] (Directly referencing the physical analog we just built)
```

### 2. Neurodivergent-First

**Definition:** Designing the instructional interface specifically to reduce cognitive load, support short-term working memory, accommodate poor spatial reasoning, and eliminate sensory or emotional anxiety.

**Logic Flow:
```
[Acknowledge Cognitive Load] (State clearly: "This step requires writing code. We will focus on only one file.)
     |
     v
[Enforce Single-Tasking] (Never ask the user to jump back and forth between multiple open files)
     |
     v
[Format with Verbal Structure] (Use structured lists, clear spacing; avoid complex visual diagrams that require mental rotation)
     |
     v
[Establish Emotional Predictability] (Present errors as expected milestones, reassuring the user they are on the correct path)
```

### 3. Backwards Design (Zero Day)

**Definition:** Beginning the educational unit at the final, successfully running program. Define the exact, tangible end product and verification command *first*, then trace backward step-by-step to build the files and configuration required to make that run.

**Logic Flow:
```
[Define the End State] (What does the running TypeScript agent do in the terminal?)
     |
     v
[Show the Execution Command] (e.g., "node index.js" or "npm run start")
     |
     v
[Show the Expected Terminal Output] (The exact text the user will see when it works)
     |
     v
[Trace Dependencies Backward]
   - What file runs this command? (index.ts)
   - What configuration lets this run? (tsconfig.json, package.json)
   - What directories must be created first?
```

### 4. The Blind Man's Test (Zero Prior Knowledge)

**Definition:** A standard of writing instructions where absolutely zero steps, settings, or terminal paths are assumed. Every noun is defined before it is used, every command is written out in full (no placeholders or abbreviations), and every action has an explicit, observable feedback signal.

**Logic Flow:
```
[Introduce the Step]
     |
     v
[Define All Nouns] (e.g., "A Terminal is a window on your computer where you type text commands to talk directly to your system.)
     |
     v
[Provide the Absolute, Literal Command] (Write out code files fully; NEVER use "// ... rest of code goes here" or placeholders)
     |
     v
[Provide the Observable Verification Signal] ("You will know you did this correctly when you see exactly this output in your terminal...")
```

---

## AGENTS.md: Workspace-Specific Instructions

### CRITICAL: Load `mastra` skill first
Load the `mastra` skill BEFORE any Mastra work. Never rely on cached knowledge — APIs change between versions.

### Rules for Implementation
- Register all agents, tools, workflows, and scorers in `src/mastra/index.ts`
- Use the `dev` and `build` scripts from `package.json` instead of running `mastra dev` / `mastra build` directly

### Resources
- [Mastra Documentation](https://mastra.ai/llms.txt)
