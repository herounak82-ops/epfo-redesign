# AI Execution Protocol

## Before coding

- Identify the task class.
- Open the matching route in `TASK_ROUTER.xml`.
- Load mandatory context only.
- Inspect current code and current-state records.
- State the intended change and what will remain untouched.

## During coding

- Reuse existing tokens/components.
- Keep the mock package authoritative.
- Preserve route structure unless the task explicitly changes it.
- Prefer small, reviewable edits.
- Do not invent new visual systems.

## After coding

- Run build/tests.
- Run browser checks where available.
- Compare the result against `docs/MASTER_EXECUTION/DESIGN_LOCK.json` and the applicable page registry entry.
- Check service states and responsive behavior.
- Update `docs/IMPLEMENTATION_STATUS.md` when the project state materially changes.

## Stop conditions

Stop and report rather than inventing an answer when:

- a government rule is unclear;
- UX4G current vs legacy guidance conflicts;
- a real EPFO business rule is not established;
- an asset's ownership/licensing is unknown;
- a requested feature exceeds the current batch scope.

Record uncertainty instead of hallucinating.
