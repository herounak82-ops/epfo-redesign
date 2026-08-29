# EPFO Master Execution Specification

## 1. Purpose

This is the execution contract for building the EPFO member-service redesign. The product is a real React/Vite/TypeScript prototype, not a static concept. The early objective is to achieve an excellent, coherent frontend with shallow-but-real functionality, then deepen service logic in controlled batches.

The agent must execute decisions already made. It should reason only where the specification deliberately leaves an implementation choice open.

## 2. Non-negotiable product model

The product is a citizen-goal-driven EPFO member service.

Primary goals:

- Get my PF money
- Fix my personal details
- Move my PF after changing jobs
- View my account and service history
- Fix a failed request

Core differentiator: **Account Health** should reveal readiness, blockers, ownership and next action before a high-stakes service begins.

Priority journeys:

1. Access/recovery
2. KYC correction
3. PF claim/withdrawal
4. PF transfer
5. Failure recovery

The normal UI is the primary product. The future Codex/assistant interaction is additive and must not replace or redesign the normal journeys.

## 3. Execution philosophy

The implementation order is:

inspect → route task → load minimum context → plan → implement → run → browser test → compare against locked specification → fix → validate → record state

Do not ask the AI to invent a new design direction unless the task explicitly requests exploration.

Do not use one giant generation to implement all future batches.

## 4. Batch boundaries

### Batch 1 — Foundation

Focus on:

- shell
- navigation
- member home
- Account Health
- goal-based service entry
- reusable component system
- deterministic mock-data integration
- responsive foundation
- accessibility foundation
- shallow journey scaffolds

Complex statutory/business logic is intentionally shallow here.

### Batch 2 — Claim

Deepen PF withdrawal/claim journey, including readiness, validation, review, simulated verification, acknowledgement, status and failure recovery.

### Batch 3 — KYC

Deepen correction diagnosis, editable fields, verification, ownership, tracking and return-to-journey behavior.

### Batch 4 — Transfer

Deepen previous-employment matching, readiness, Date of Exit/EPS conditions, submission, timeline and continuity confirmation.

### Batch 5 — Failure Recovery

Deepen diagnosis, ownership, required action/evidence, escalation and resume-original-journey behavior.

### Batch 6 — Assistant

Add Codex-powered interaction over the same service/data model. Do not make the assistant necessary for normal task completion.

### Batch 7 — Accessibility Audit

Full keyboard, screen-reader, focus, contrast, zoom, semantics and interaction audit.

### Batch 8 — Responsive Audit

Narrow mobile, standard mobile, tablet, desktop and large desktop validation.

### Batch 9 — Final Polish

Only after functional journeys and audits are strong: visual rhythm, content refinement, motion refinement, icon consistency, loading realism and performance.

## 5. Design lock

The following are locked unless a later task explicitly authorizes a system change:

### Character

- calm
- institutional
- Indian government-service character
- information-oriented
- accessible
- modern without looking trendy
- professionally designed

The visual target is:

**a government service that has been properly designed**

not a startup, fintech, portfolio, luxury or generic SaaS interface.

### Typography

Primary: Noto Sans.
Hindi: Noto Sans Devanagari.
Technical/reference numbers where useful: Roboto Mono.

Use the type hierarchy in `docs/EPFO_DESIGN_SYSTEM.md`.

### Core verified UX4G colors

- Primary strong: #4A2BC2
- Primary stronger: #301C7D
- Primary surface: #F2EFFF
- Text primary: #171717
- Text secondary: #404040
- Background: #FAFAFA
- White: #FFFFFF
- Black: #000000
- Border default: #D9D9D9
- Border subtle: #E5E5E5
- Primary border: #A391FF

### EPFO project accents

- Blue: #0B5AA7
- Red: #D65A3A
- Saffron: #F4B63E
- India green: #138808

Semantic behavior is more important than literal color frequency. Never communicate state by color alone.

### Spacing

Use a 4px base rhythm. Prefer the established values in the design system: 4, 8, 12, 16, 24, 32, 48, 64, 80+.

### Radius

Prefer restrained radii; verified values include 0, 12 and 16px. Do not turn every element into a pill or rounded card.

### Motion

Motion is functional and restrained. It should explain state, provide feedback or support hierarchy. Avoid spectacle, parallax, scroll hijacking, decorative 3D, animated backgrounds and artificial waiting.

### Graphics

Graphics are not a default requirement. Add a graphic only when it materially improves comprehension, identity or task confidence. Prefer government/institutional utility over decoration.

## 6. UX4G rule

Use current UX4G foundations, components and patterns where practical.

If direct package components are compatible and useful, prefer them.
If they are not practical for a specific implementation, reproduce verified UX4G semantics and token structure consistently in project-level components.

Never mix current UX4G with arbitrary unrelated frameworks simply for visual convenience.

Legacy UX4G material is historical reference unless current guidance lacks the needed implementation detail.

## 7. GIGW rule

Apply GIGW 3.0 as a government website/app quality and conformity reference.

Use the synthesized records in `EPFO_AI_KNOWLEDGE_SYSTEM/05_GIGW/` first.
Use the raw GIGW source only for provenance or unresolved detail.

For design/implementation tasks, prioritize relevant Quality and Accessibility rules.
For security-sensitive implementation, consult the relevant Cybersecurity records.
For release/maintenance decisions, consult Lifecycle records.

Do not describe the prototype as GIGW-certified.

## 8. Page strategy

Use the canonical route map and the page registry in `PAGE_REGISTRY.xml`.

The existing product route set includes:

- `/`
- `/account`
- `/account/health`
- `/services`
- `/services/claim`
- `/services/kyc`
- `/services/transfer`
- `/requests`
- `/requests/:id`
- `/recovery`
- `/help`
- `/profile`

Do not add a route merely to increase page count.

Every route must serve a member goal, service operation, diagnostic need, or necessary trust/help function.

## 9. Page construction rule

Every page must specify:

- user goal
- entry context
- primary action
- secondary actions
- information hierarchy
- relevant data
- relevant status states
- error/recovery behavior
- ownership where applicable
- mobile transformation
- accessibility requirements
- applicable UX4G components/patterns
- applicable GIGW rules

A page is not complete because it looks attractive.

## 10. Component rule

Use reusable components and a shared service layer. Do not implement the same control or status pattern independently on multiple pages.

Core component families are defined by `docs/EPFO_DESIGN_SYSTEM.md`, `EPFO_AI_KNOWLEDGE_SYSTEM/03_DESIGN_SYSTEM/COMPONENT_SYSTEM.xml`.

Every reusable component must have appropriate default, hover, focus, active, disabled, loading, error and success states where applicable. Forms additionally need empty, filled, valid, invalid and readonly behavior where applicable.

## 11. Account Health rule

Account Health is a first-class system, not a decorative dashboard.

Items:

- UAN
- Aadhaar
- PAN
- Bank
- Date of Exit
- Service History
- EPS
- Nomination

Every item should expose, where applicable:

status → meaning → why it matters → next action → responsible party → optional last-checked state

## 12. Service-state rule

Status is always expressed through:

icon + text + semantic color

Use clear states such as:

Ready
Action needed
In progress
Submitted
Under verification
Approved
Rejected
Needs member action
Needs employer action
Needs EPFO action
Failed — retry available

Every meaningful status should answer:

What is happening?
What do I need to do?
Who is responsible?
When should I expect the next update?

## 13. Content rule

Citizen copy should be direct, plain and specific.

Prefer:

- Check account health
- Submit claim
- View what needs fixing
- Continue securely

Avoid:

- Proceed
- Submit
- Click here
- Something went wrong

Administrative terminology can appear where necessary, but the citizen goal remains primary.

## 14. Trust and prototype honesty

Show appropriate institutional identity, ownership, help/contact information, privacy/trust surfaces and reference numbers where the flow needs them.

Do not imply:

- real EPFO connectivity
- real authentication
- real Aadhaar verification
- real money transfer
- real claim submission
- real government approval

Synthetic/demo behavior must remain distinguishable from real government transactions.

## 15. Assets

Use an asset only when it serves a defined product purpose.

Approved categories:

- verified government/institutional identity assets where appropriate
- accessible SVG icons
- service-specific diagrams/illustrations when they improve comprehension
- lightweight decorative texture only when it remains subordinate to service content

Forbidden by default:

- stock-photo hero backgrounds
- decorative 3D scenes
- random AI art
- flashy gradients
- visual clutter
- imagery that makes the government service resemble a commercial product

The asset registry is authoritative for what is already available versus what must still be sourced.

## 16. Data

Use `data/epfo_mock_package/` as the authoritative synthetic data/service package.

Never maintain competing copies of the same dataset.

Do not randomly generate user data per render.

Mask sensitive-looking values.

Keep business rules and mock responses behind a service abstraction.

## 17. Browser execution

For any implementation task, run the application and inspect the actual rendered result whenever browser tooling is available.

Do not declare visual completion from source-code inspection alone.

At minimum validate:

- primary desktop viewport
- mobile viewport
- navigation
- primary CTA
- representative form interaction
- loading
- error
- success/confirmation
- focus visibility
- route navigation

## 18. Refinement protocol

Do refinement in passes.

Pass A — structural correctness

- route hierarchy
- component reuse
- information architecture
- content order
- service logic

Pass B — visual system

- typography
- spacing
- colors
- borders
- elevation
- icons
- alignment

Pass C — states and feedback

- loading
- empty
- error
- blocked
- success
- confirmation
- session expiry

Pass D — accessibility

- semantics
- labels
- focus
- keyboard
- contrast
- zoom
- screen-reader behavior

Pass E — responsive

- narrow mobile
- mobile
- tablet
- desktop
- large desktop

Pass F — polish

Only now:

- motion
- microinteraction timing
- visual rhythm
- content refinement
- performance

Never jump directly to polish before structural quality is sound.

## 19. Change discipline

Before editing:

- inspect current state
- identify the smallest affected surface
- identify canonical requirements
- identify dependencies
- identify what must not change

After editing:

- build
- test
- inspect result
- update status where appropriate

Avoid broad rewrites when a localized change solves the problem.

## 20. What counts as a good implementation

A good implementation is one where:

- the user understands their goal immediately
- prerequisites are visible early
- blockers are diagnostic
- ownership is clear
- state is understandable
- recovery remains connected to the original journey
- the visual system is consistent
- the government character is credible
- the UI works without the assistant
- future batches can extend the architecture without redesigning the foundation

## 21. What the agent must never do

Never:

- invent official policy
- invent UX4G values
- invent GIGW requirements
- treat a research example as canonical
- silently override canonical project decisions
- preload the entire knowledge corpus
- duplicate the mock data
- add unrelated visual trends
- turn every page into a marketing surface
- use 3D for spectacle
- hide errors behind generic messages
- claim work was browser-tested when it was not
- claim real EPFO transactions occurred

## 22. Completion protocol

Before declaring a task complete:

1. Confirm the intended routes/pages exist.
2. Confirm the shared components are used rather than duplicated.
3. Confirm relevant tokens are used.
4. Confirm relevant UX4G/GIGW guidance was applied.
5. Confirm service states are covered.
6. Confirm accessibility requirements were tested where possible.
7. Confirm responsive behavior was tested where possible.
8. Confirm the build passes.
9. Confirm browser behavior was inspected when tooling exists.
10. Update current-state/status records.

If a required check could not be performed, state that explicitly.
