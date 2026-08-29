# EPFO AI Knowledge / Context Operating System

This repository is an external-memory layer for the EPFO member-service redesign. It is not a second application and it is not a document dump. It classifies a task, identifies authority, retrieves the smallest useful package, maps decisions to the current implementation, validates the result, and preserves reusable corrections.

## Default loading order

1. Read the current task and `AI_INSTRUCTIONS.txt`.
2. Read `01_CANONICAL/ACTIVE_DECISIONS.xml`, `ACTIVE_REQUIREMENTS.xml`, and the task-relevant parts of `CURRENT_STATE.xml`.
3. Use `11_RETRIEVAL/RETRIEVAL_ROUTER.xml` and `ROUTE_REGISTRY.json` to select one route.
4. Load only mandatory route targets; load optional targets only when they answer a concrete question.
5. Inspect current code before changing it, then validate with `12_VALIDATION`.

## Authority and context layers

`P0` is the current task. `P1` is canonical project truth. `P2` is task-relevant derived knowledge. `P3` is selected supporting reference. `P4` is historical or benchmark material. `P9` is raw provenance and is never a default load. When sources conflict, follow the authority model, record the conflict, and do not silently erase history.

The project distinction is explicit: **GIGW** supplies government website/app quality, accessibility, cybersecurity, and lifecycle expectations; **UX4G** supplies government UX foundations, components, patterns, content, and implementation guidance; the **EPFO design system** applies both to this product.

All mock data is synthetic. The application is a React/Vite prototype with shallow-but-real flows and no implied production EPFO backend access. The standard UI remains primary; a future Codex assistant is additive and must not override the service model, UX4G, GIGW, or normal journeys.

> Narrow task, narrow context. Never read every file by default.
