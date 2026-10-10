# agent-builder-companion

[About Corey Alejandro and the connected GitHub accounts](COREY_ALEJANDRO.md) · [Experience the practice](https://corey-alejandro-work-in-motion.coreyalejandro.chatgpt.site)

A Mastra-powered AI companion designed to help you learn how to build agents—with a special focus on neurodivergent-friendly design patterns.

## What This Project Does

This project gives you two distinct AI personalities:

| Agent | Purpose |
|-------|--------|
| **Agent** (the generalist) | Research current topics, manage tasks, edit files in your workspace, run shell commands with approval gates, and create recurring schedules. |
| **Workbook Mentor** (the teacher) | A structured-learning agent that teaches you the principles of building AI agents using narrative analogies, cognitive-load reduction, and zero-assumption explanations. |

## Get Started

1. Set your API key:
   ```shell
   export GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"
   # or put it in .env as GOOGLE_GENERATIVE_AI_API_KEY
   ```

2. Run the development server:
   ```shell
   npm run dev
   ```

3. Open [http://localhost:4111](http://localhost:4111) to access Mastra Studio.

4. In Mastra Studio, select **Agent** and try these prompts:

   - `Get the weather forecast for Austin this weekend.` → The agent checks live data.
   - `Create a landing page for a Japanese sakura festival.` → It writes files in your workspace directory.
   - `Check the SPCX stock price now, then check it every minute.` → You get a schedule ID you can pause later.

## How The Generalist Agent Works

The general-purpose agent has these capabilities:

- **Web tools**: Google search and direct web page fetching (via `webFetchTool`)
- **Filesystem**: Read/write/delete files in the local `workspace/` directory with approval gates before destructive changes
- **Shell sandbox**: Run commands inside a restricted working directory (`LocalSandbox`)
- **Memory & tasks**: Persistent conversation memory, auto-generated thread titles, and task tracking using LibSQL + DuckDB
- **Scheduling**: Create recurring schedules that run across restarts (using Mastra's built-in scheduler)
- **Ask user**: A tool to ask the user a clarifying question before proceeding

## How The Workbook Mentor Works

The workbook mentor agent is built around four pedagogical rules from AGENTS.md:

1. **Narrative-first** – Every abstract concept gets a physical analogy before any code appears.
2. **Neurodivergent-first** – Cognitive load is minimized; instructions enforce single-tasking and provide clear verbal structure.
3. **Backwards design** – You see the final, working result first (the running agent), then trace backward to build it.
4. **The Blind Man's Test** – Zero assumptions about prior knowledge. Every tool is defined before use.

The mentor uses LibSQL for its own memory store and a separate vector database for semantic recall during lessons.

## Safety & Environment

- All file operations stay inside the `workspace/` directory (configurable in `src/mastra/agents/agent.ts`).
- Shell commands start from that same directory, but there is **no process isolation** – review every approval before running unknown commands.
- The default database is `file:./mastra.db`. To use Turso Cloud, set:
  ```env
  TURSO_DATABASE_URL="turso://..."
  TURSO_AUTH_TOKEN="your-token"
  ```

## Customizing The Project

Edit these files to change behavior:

| File | What It Controls |
|------|------------------|
| `src/mastra/index.ts` | Register agents, tools, storage (LibSQL → Turso), and observability exporters |
| `src/mastra/agents/agent.ts` | Change the generalist agent's model, instructions, memory config, workspace path, and approval policies |
| `src/mastra/tools/web-fetch-tool.ts` | Customize how web pages are fetched (headers, timeouts, error handling) |
| `src/mastra/tools/schedule-tools.ts` | Modify cron expressions or prompt templates for scheduling |
| `src/mastra/agents/workbook-mentor/*.ts` | Adjust the mentor's system prompts, constitution rules, and activation messages |

## Learn More

- [Mastra Documentation](https://mastra.ai/docs) – Framework APIs, tool creation, workspace patterns
- [Mastra Studio Tour](https://mastra.ai/learn/studio-tour) – How to use the GUI for testing agents
- AGENTS.md in this repo – The pedagogical philosophy behind the workbook mentor

## Deploy To The Mastra Platform

The [Mastra platform](https://projects.mastra.ai) provides hosting, monitoring, and deployment for agent applications. Read more in the [platform documentation](https://mastra.ai/docs/mastra-platform).
