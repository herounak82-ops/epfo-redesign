# EPFO Master Execution Package

This directory is the **implementation control layer** for future AI work on the EPFO redesign.

It does not replace the canonical design system, project context, UX4G/GIGW knowledge system, or application code. It tells an AI **how to execute** against those sources without inventing product decisions or flooding its context.

## Read order

1. `.agents/skills/epfo-government-service/SKILL.md` — persistent implementation behavior.
2. `docs/EPFO_DESIGN_SYSTEM.md` — canonical project design authority.
3. `docs/EPFO_Hackathon_Project_Context.md` — project rationale and history.
4. `docs/tokens.json` — machine-readable core tokens.
5. `docs/MASTER_EXECUTION/MASTER_EXECUTION_SPEC.md` — this execution contract.
6. Load only the files selected by `TASK_ROUTER.xml` for the current task.
7. Inspect the live code before editing.
8. Validate using the applicable validation route.

## Important

`reference/`, `EPFO_AI_KNOWLEDGE_SYSTEM/90_RAW_SOURCE/`, and the full UX4G/GIGW research corpora are **not default context**. Use the retrieval system and route files to load only what the current task needs.
