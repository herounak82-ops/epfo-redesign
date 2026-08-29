# EPFO MEMBER SERVICE REDESIGN — MASTER IMPLEMENTATION PROMPT 01

## FOUNDATION APPLICATION + FRONTEND-FIRST IMPLEMENTATION

You are building the first implementation milestone of a serious hackathon prototype.

This is **not a design exercise, not a static mockup, not a Figma recreation, and not a generic SaaS dashboard**.

Build a real browser application whose frontend is production-quality in structure, visual system, responsiveness, accessibility, interaction design and component architecture, while the deeper business logic/backend for complex EPFO journeys is intentionally kept shallow in this first milestone.

The project will be developed across multiple controlled batches. Do NOT attempt to finish the entire EPFO system in this prompt.

Your job in this milestone is to create the strongest possible **foundation application** so that later batches can add deep Claim, KYC, Transfer, Failure Recovery and Assistant functionality without redesigning the product.

---

# 1. PROJECT PURPOSE

We are redesigning EPFO member services around real citizen problems identified through research.

The fundamental problem is not simply that the current service looks dated.

The deeper issue is that EPFO behaves like a distributed administrative network involving EPFO, employers, banks, Aadhaar, UAN/member IDs, UMANG, service history, pension/EPS information and grievance channels.

Users are therefore frequently forced to understand the administrative system before they can accomplish a simple goal.

The redesign must reverse that mental model:

CURRENT PATTERN:

user → understand system → find form/service → enter information → encounter unclear state → search for solution → contact another party

DESIRED PATTERN:

user → state goal → understand readiness → complete guided service → see transparent state → recover when blocked → finish

The project's central design principle is:

**Make the system understand the citizen's goal instead of making the citizen understand the system.**

---

# 2. IMPORTANT PROJECT BOUNDARIES

This prototype is NOT the official EPFO website.

It is a hackathon redesign/prototype.

Never imply:

- official Government of India approval
- official EPFO ownership
- real EPFO backend connectivity
- real Aadhaar verification
- real bank verification
- real OTP validation
- real claim submission
- real money transfer
- real KYC mutation
- real employer action
- real grievance filing

All sensitive data and service behavior must remain synthetic/demo-only.

The application must visibly distinguish demo/simulated behavior wherever the interface could otherwise imply that a real government transaction occurred.

Do not access, scrape, reverse-engineer, interfere with, or integrate with private/live EPFO systems.

Use the supplied mock service/data package.

---

# 3. SOURCE-OF-TRUTH HIERARCHY

Before writing substantial code, inspect the repository and all supplied project files.

Use this hierarchy when deciding anything:

1. Current UX4G Design System 3.0
2. Current UX4G developer documentation / Storybook
3. Supplied UX4G Figma/design resources
4. Official/current EPFO public information
5. EPFO research and bad-journey report
6. Supplied project context
7. Supplied mock-data package
8. General design/engineering knowledge only when the above do not answer something

Do not treat old/legacy UX4G Bootstrap-like material as the primary system when current UX4G v3 guidance exists.

Do not invent a different design system.

Do not replace UX4G semantics with arbitrary Tailwind/shadcn styling.

Project-level EPFO additions may extend UX4G where necessary, but they must remain visually and behaviorally compatible with the system.

---

# 4. REPOSITORY CONTEXT AND FILES YOU MUST READ BEFORE IMPLEMENTATION

All paths in this prompt are **repository-relative paths** unless explicitly stated otherwise.

The repository has already been packaged into a deliberate structure. Do not flatten it, move its reference files into the source tree, or create duplicate copies merely for convenience.

Before beginning substantial implementation, inspect the repository and read the following files in the roles described below.

## 4.1 Mandatory implementation/design files

### Persistent AI implementation skill

- `.agents/skills/epfo-government-service/SKILL.md`

Use this as the reusable AI implementation behavior and project guardrail. It contains UX4G-first rules, government-service design philosophy, EPFO journey principles, accessibility, content, states, prototype realism, testing and anti-patterns.

### Project design authority

- `docs/EPFO_DESIGN_SYSTEM.md`

Treat this as the canonical project-level design specification. It defines the visual system, UX hierarchy, shell, components, journeys, states, accessibility, responsive behavior, motion, content rules and quality gates.

### Machine-readable design tokens

- `docs/tokens.json`

Use this as the structured token source for colors, typography, spacing and project-level accents.

### Project history / working context

- `docs/EPFO_Hackathon_Project_Context.md`

Use this to understand why the project was chosen, the established product thesis, research decisions, existing batch strategy and current implementation state. It is contextual authority, not a replacement for the design system.

## 4.2 Mandatory research/problem file

- `reference/EPFO_Bad_User_Journeys_Report.md`

Use this to understand the actual member problems being redesigned: access, KYC correction, PF claim/withdrawal, PF transfer and failure recovery. Treat its quantitative grievance figures and qualitative reports according to the evidence limitations documented in the report.

## 4.3 Mandatory mock service/data package

- `data/epfo_mock_package/`

The package has **already been extracted** into the repository. Do not look for or expect an `epfo_mock_package.zip` file.

Inspect the package as one coherent synthetic mock service/data source, including where applicable:

- `README.md`
- `EPFO_SCHEMA_AND_NOTES.md`
- `epfo_mock_data.json`
- `mock_epfo_api.py`
- `function_examples.json`
- journey datasets
- member/account/KYC/claim datasets
- `research_notes.md`
- `qa_report.py`
- `build_exports.py`

Use the package's existing model and callable behavior as the starting point. Do not create a second competing mock-data model unless the existing package genuinely cannot represent a required UI state.

Do not randomly generate member data every render.

Deterministic behavior is required.

## 4.4 Reference-only material

The following files are available for research/reference when the active design/context documents do not sufficiently answer a question:

- `reference/UX4G_Complete_Research_Dossier.txt`
- `reference/build_what_moves_india_complete_site_information.txt`

These are **not competing design specifications**. Do not let legacy UX4G material override current UX4G v3 guidance or `docs/EPFO_DESIGN_SYSTEM.md`. Do not spend implementation effort exhaustively rereading reference material when the active project documents already resolve the decision.

## 4.5 Prompt/status files

This implementation brief lives at:

- `docs/IMPLEMENTATION_PROMPT_01_FOUNDATION.md`

At the end of the run, write or update the implementation handoff at:

- `docs/IMPLEMENTATION_STATUS.md`

Do not rewrite the full project context as a substitute for the status file.

---

## 4.6 Required reading order

Read in this order:

1. `.agents/skills/epfo-government-service/SKILL.md`
2. `docs/EPFO_DESIGN_SYSTEM.md`
3. `docs/tokens.json`
4. `docs/EPFO_Hackathon_Project_Context.md`
5. `reference/EPFO_Bad_User_Journeys_Report.md`
6. `data/epfo_mock_package/README.md` and `data/epfo_mock_package/EPFO_SCHEMA_AND_NOTES.md`
7. Relevant files inside `data/epfo_mock_package/` as needed
8. Reference-only files only when necessary

Do not start by generating UI from memory before reading the active project sources.

Do not randomly generate member data every render.

Deterministic behavior is required.

---

# 5. FIRST MILESTONE OBJECTIVE

This milestone is:

**REAL APPLICATION + EXCELLENT FRONTEND + SHALLOW FUNCTIONAL SCAFFOLDING**

The application must be real and runnable.

However, do NOT fully implement all five major service journeys yet.

Instead:

### Make the frontend excellent first.

That means:

- complete page hierarchy
- strong information architecture
- excellent government-service shell
- correct UX4G visual language
- reusable component architecture
- responsive behavior
- accessibility
- realistic content
- realistic states
- proper navigation
- proper empty/loading/error/success states
- basic interaction
- basic mock-data connection
- route wiring
- shallow journey scaffolds

The application should already feel like a coherent finished product even before deep business workflows are implemented.

Later batches will deepen the existing journeys.

---

# 6. DO NOT INTERPRET "FRONTEND-FIRST" AS "DESIGN-ONLY"

You are not producing:

- a visual concept
- static HTML screens
- disconnected mock screens
- a portfolio presentation
- Figma-only output

You ARE producing:

- actual application code
- actual routes
- actual components
- actual state
- actual interactions
- actual responsive layouts
- actual mock-data consumption
- actual navigation
- actual validation scaffolding
- actual loading/error/success states

The business logic may be intentionally shallow in this first pass, but the application architecture must support deep logic later.

Examples:

GOOD:

`Submit Claim` → validates basic UI state → shows realistic demo processing state → shows acknowledgement shell

NOT REQUIRED YET:

Full statutory claim decision engine with every EPFO policy rule.

GOOD:

`Fix personal details` → opens real correction UI → displays mock current record → allows editing → demonstrates review/submit state

NOT REQUIRED YET:

Full backend reconciliation across every EPFO production system.

GOOD:

`Move my PF after changing jobs` → opens a real transfer interface → displays synthetic previous employment → shows readiness/blocker UI

NOT REQUIRED YET:

Complete production-grade transfer processing.

---

# 7. FIRST IMPLEMENTATION SCOPE

Build the foundation around these member-facing surfaces.

## A. Global/service shell

Create:

- desktop header
- mobile header
- authenticated member shell
- service navigation
- account menu
- language control
- accessibility entry
- help/support access
- footer
- prototype disclosure
- current-section indication
- responsive navigation behavior

The shell must remain consistent throughout all future journeys.

Never create a new visual shell for every route.

---

# 8. PRIMARY INFORMATION ARCHITECTURE

The member experience must begin with citizen goals rather than administrative forms.

Primary goals:

1. **Get my PF money**
2. **Fix my personal details**
3. **Move my PF after changing jobs**
4. **View my account and service history**
5. **Fix a failed request**

Administrative terms such as:

- Form 19
- Form 13
- Form 10C
- Form 31
- UAN
- Member ID
- EPF
- EPS
- KYC
- Date of Exit

may appear where necessary, but must not dominate the primary navigation or mental model.

Do not make the landing experience begin with a list of government forms.

---

# 9. MEMBER HOME

Build a genuinely useful authenticated home.

Structure:

header

→ welcome/service context

→ account health

→ primary user goals

→ active requests

→ recent activity

→ service/history access

→ help/support

The opening area should communicate the service clearly.

Use the design system's direct service-oriented voice.

Do not create a giant marketing hero.

Do not use startup-style storytelling.

Do not use decorative gradients to create visual drama.

---

# 10. ACCOUNT HEALTH — CORE DIFFERENTIATOR

Implement Account Health as a real reusable component/system.

It should expose readiness for important member services.

At minimum represent:

- UAN
- Aadhaar
- PAN
- bank
- Date of Exit
- service history
- EPS/service readiness
- nomination

Each item must have:

- visible status
- icon
- text explanation
- why it matters
- next action
- responsible party where relevant
- optional last-checked state

Examples of status language:

- Verified
- Ready
- Action needed
- Under verification
- Needs employer action
- Needs EPFO action

Never communicate state using color alone.

A blocked item should be actionable.

Selecting an Account Health issue should open an explanation such as:

What is wrong?

Why does it matter?

Who can fix it?

What can I do?

What happens next?

---

# 11. GOAL-BASED SERVICE ENTRY

Create a service-entry section where citizens can select their goal directly.

Cards or equivalent interaction surfaces should exist for:

### Get my PF money

Check readiness, understand eligibility, prepare a claim and track the request.

### Fix my personal details

Find incorrect KYC/profile information and understand how to correct it.

### Move my PF after changing jobs

Find previous employment, inspect transfer readiness and prepare a transfer.

### View my account

See contribution history, employment history, service records and requests.

### Fix a failed request

Understand the cause, identify who owns the problem and resume the original task.

Keep these interfaces restrained and service-oriented.

They must NOT look like commercial SaaS feature cards.

---

# 12. SUPPORTING FOUNDATION PAGES

Create the reusable page foundation for:

- Member home
- Account overview
- Account Health
- Service hub
- Service history
- Requests/status
- KYC/profile area
- Claim area
- Transfer area
- Failure/recovery area
- Help/support

These can initially contain shallow functionality.

The objective is to establish the complete product structure so future batches plug deep workflows into existing pages.

Do not generate dozens of unrelated screens merely to make the project appear larger.

Every screen must have a real purpose in the service architecture.

---

# 13. JOURNEY SCAFFOLDING

Create entry points and basic working shells for the five research-driven journeys.

## Journey 1 — Access/UAN

Foundation only.

Provide:

- sign-in/recovery entry
- UAN-related service context
- mock states
- authentication shell
- recovery shell
- session-expiry state
- no silent redirect

Do not fully engineer production authentication.

---

## Journey 2 — KYC correction

Foundation only.

Provide:

- identify problematic record
- display current masked value
- select correction
- edit
- review
- submit/demo state
- ownership state
- request status shell

Do not fully implement all EPFO correction policies yet.

---

## Journey 3 — PF claim/withdrawal

Foundation only.

Provide:

- readiness check
- eligibility entry
- claim goal selection
- account/KYC/bank summary
- basic claim form
- review
- verification shell
- acknowledgement shell
- tracking shell

Deep claim business logic belongs to a later batch.

---

## Journey 4 — PF transfer

Foundation only.

Provide:

- previous employment search/selection
- matched member account
- service history view
- Date of Exit readiness
- EPS readiness
- blocker explanation
- review/submit shell
- transfer tracking shell

Deep transfer logic belongs to a later batch.

---

## Journey 5 — Failure recovery

Foundation only.

Create one of the strongest areas of the application.

A failed request should expose:

- what happened
- why it happened
- who owns the problem
- what the member should do
- what evidence may be required
- expected next step
- expected timeline
- reference/request number
- how to return to the original journey

The recovery UI must feel like part of the main service, not a separate website.

---

# 14. COMPONENT SYSTEM

Build reusable components instead of one-off page implementations.

At minimum establish architecture for:

## Shell

- GovernmentHeader
- MobileHeader
- AccessibilityBar
- ServiceNav
- Footer

## Core controls

- Button
- Link
- Input
- Textarea
- Select
- RadioGroup
- Checkbox
- DateField
- Search
- Tag
- Badge
- Divider
- Card

## Feedback

- Alert
- InlineError
- Toast
- Modal
- Spinner
- Skeleton
- EmptyState

## Data

- Table
- RecordCard
- Timeline
- Status
- AccountHealthItem
- RequestCard

## Journey

- Stepper
- ReviewSummary
- EligibilityCheck
- DocumentChecklist
- Confirmation
- RecoveryPanel

These should be genuinely reusable.

Do not copy/paste slightly different card designs between pages.

---

# 15. COMPONENT STATES

Every important interactive component must account for:

- default
- hover
- focus
- active
- disabled
- loading
- error
- success

Forms additionally need:

- empty
- filled
- invalid
- valid
- readonly

Do not design only the happy path.

States must feel intentional rather than added as an afterthought.

---

# 16. UX4G VISUAL SYSTEM

UX4G is the primary design authority.

Use the verified values from `docs/tokens.json` and `docs/EPFO_DESIGN_SYSTEM.md`.

Core verified UX4G values include:

Primary:

`#4A2BC2`

Primary stronger:

`#301C7D`

Primary surface:

`#F2EFFF`

Text primary:

`#171717`

Text secondary:

`#404040`

Default border:

`#D9D9D9`

Subtle border:

`#E5E5E5`

Background:

`#FAFAFA`

White:

`#FFFFFF`

Black:

`#000000`

Project-level EPFO accents:

EPFO blue:

`#0B5AA7`

EPFO red:

`#D65A3A`

Saffron cue:

`#F4B63E`

India green:

`#138808`

These EPFO colors are project-level extensions, not replacements for UX4G.

---

# 17. COLOR THEORY

Color must communicate hierarchy and system state.

Use:

### Purple

Primary actions and core interaction emphasis.

### Blue

Institutional/informational meaning and secondary actions.

### Red

Only:

- rejection
- destructive action
- critical issue
- genuinely serious failure

### Green

Only as reinforcement for:

- verified
- complete
- approved
- ready

Always combine color with icon/text.

### Saffron

Use as a restrained Indian contextual/attention cue.

Never use saffron as the dominant primary CTA color.

Do not cover large portions of the interface with the Indian tricolor.

The Indian identity should be expressed through subtle, professional cues rather than patriotic decoration.

---

# 18. TYPOGRAPHY

Primary typeface:

**Noto Sans**

Hindi:

**Noto Sans Devanagari**

Optional technical/reference numeric type:

**Roboto Mono**

Maintain the established hierarchy:

Display L — 60/64/600

Display S — 40/44/600

Heading XXL — 40/48/600

Heading L — 28/36/600

Heading M — 24/32/600

Heading S — 20/28/600

Heading XS — 16/22/700

Body L — 18/26/400

Body M — 16/24/400

Body S — 14/20/400

Label — 16/20/500

Strong Label — 16/20/700

Do not introduce another font family for visual novelty.

---

# 19. SPACING AND GEOMETRY

Use the established 4px base system.

Preferred rhythm:

4
8
12
16
24
32
48
64
80
96

Use restrained radii.

Prefer:

0–4px for dense controls

8px for compact grouping

12px for primary surfaces

16px for larger feature surfaces

Use pills only when their semantics justify them.

Do not make every card heavily rounded.

Do not put every field inside a floating card.

The result must retain information density appropriate to a public-service product.

---

# 20. INFORMATION DENSITY

Do not pursue “maximum whitespace.”

The target is:

**maximum useful information per unit of attention.**

Prioritise:

1. what matters most
2. what needs action
3. why
4. useful details
5. technical/reference information

Use whitespace to separate concepts, not to imitate premium SaaS landing pages.

---

# 21. GOVERNMENT VISUAL LANGUAGE

The result should feel:

- Indian
- institutional
- calm
- trustworthy
- structured
- accessible
- modern
- information-oriented
- professional

It should NOT feel:

- startup-like
- fintech-like
- portfolio-like
- futuristic
- playful SaaS
- AI-themed
- luxury
- marketing-heavy

The visual achievement is:

**“This feels like a government service, but someone finally designed it properly.”**

Not:

**“This looks like a startup pretending to be a government service.”**

---

# 22. REAL GOVERNMENT REFERENCE INSPIRATION

You may inspect current/public government-service references where useful.

Use them to understand:

- density
- hierarchy
- institutional trust
- navigation behavior
- government content conventions
- service-state presentation
- document/reference information
- accessibility treatment

Do NOT blindly copy any government website.

Do NOT copy a legacy website's poor UX simply because it is government-like.

Use government references to improve realism while using UX4G and this project system as the governing design framework.

---

# 23. NO DECORATIVE DESIGN

Do not add:

- random gradients
- giant abstract blobs
- glassmorphism
- decorative 3D
- parallax
- animated backgrounds
- excessive shadows
- floating cards everywhere
- huge marketing hero sections
- unnecessary illustrations
- AI sparkle motifs
- futuristic HUD styling
- visual effects unrelated to service comprehension

Motion must communicate state, feedback or hierarchy.

Never add animation solely to look impressive.

---

# 24. RESPONSIVE DESIGN

Design mobile-first.

The application must work on:

- narrow mobile
- normal mobile
- tablet
- desktop
- large desktop

Mobile principles:

- 16–24px horizontal page padding
- single-column prioritisation
- stacked actions
- readable typography
- large enough touch targets
- no critical horizontal scrolling
- no desktop tables squeezed into tiny screens

Desktop principles:

- approximately 1200–1280px content region
- stable alignment
- controlled reading measure
- clear primary/secondary column hierarchy

Responsive behavior must be implemented, not merely planned.

---

# 25. ACCESSIBILITY

Minimum target:

**WCAG 2.1 AA**

Implement from the beginning.

Must support:

- keyboard navigation
- visible focus
- semantic HTML
- screen-reader compatible labels
- correct heading hierarchy
- form error association
- logical focus order
- skip navigation
- meaningful link labels
- accessible dialogs/dropdowns
- accessible status communication

Never use color alone to indicate state.

Test at 200% zoom.

Use a manual keyboard pass in addition to automated checks.

Every form input must have a visible label.

---

# 26. CONTENT DESIGN

Citizen-facing content must sound like an actual service team.

Use:

- plain language
- short sentences
- direct verbs
- specific actions
- concrete explanations
- familiar language
- necessary administrative terms only when useful

Examples of desired CTA language:

“Check account health”

“Submit claim”

“View what needs fixing”

“Continue securely”

Avoid:

“Proceed”

“Submit”

“Click here”

“Something went wrong.”

Do not use generic AI-generated marketing copy.

Do not mention internal prompts, skills, agents, implementation notes or research language in citizen-facing content.

---

# 27. ERROR DESIGN

Every significant error must answer:

1. What happened?
2. Why?
3. What can the user do?
4. Who owns the problem?
5. What happens next?
6. Was the entered information preserved?

Example pattern:

“Your bank account is not verified, so this claim cannot be submitted yet. Verify the bank details in KYC, then return here. Your claim form is saved.”

Do not expose raw exceptions, stack traces, API payloads or technical error codes to citizens.

---

# 28. SESSION / AUTHENTICATION EXPERIENCE

A core project pain point is context loss.

Therefore implement a realistic session-expiry experience.

Never silently throw the user somewhere else.

Use a clear state such as:

“Your session has expired after a period of inactivity.

Your saved information is still here.

Sign in again to continue securely.”

Provide a clear action.

Preserve the simulated form state wherever possible.

---

# 29. MOCK DATA ARCHITECTURE

Use the supplied `data/epfo_mock_package/` mock service/data package.

Do not randomly fabricate data.

Do not invent a completely new backend schema.

The mock package already provides:

- synthetic citizens
- UAN/member account information
- KYC
- claims
- service history
- transfers
- grievances
- journeys
- callable-function examples

Create a clean frontend service layer around the available mock data.

The UI should not directly depend everywhere on raw JSON files.

Use a small service/data-access abstraction so future real backend integration could conceptually replace the mock implementation.

The browser must never expose sensitive mock secrets because none should exist.

Mask identity/financial values.

---

# 30. BASIC FUNCTIONALITY REQUIRED NOW

Even in this frontend-first batch, implement enough behavior to prove this is a real application.

At minimum:

- route navigation works
- mobile navigation works
- buttons have real behaviors
- goal cards navigate
- Account Health items open useful details
- mock data loads
- loading state works
- empty state works where appropriate
- error state works where appropriate
- forms accept input
- basic validation works
- review states exist
- simulated submission states work
- request/status pages work
- back navigation preserves expected state
- page refresh does not catastrophically break routing
- no dead primary CTA

Do not spend this milestone implementing every statutory/business rule.

---

# 31. PERFORMANCE

The service should feel fast even when realistic loading behavior is shown.

Use:

- sensible code splitting
- lightweight assets
- lazy loading where appropriate
- no unnecessary libraries
- no giant images
- no decorative animation packages
- no artificial long delays

Small realistic processing delays may be used to make service-state transitions feel credible.

Do not intentionally make the application slow just to imitate government websites.

---

# 32. FILE / CODE ARCHITECTURE

Before implementing, inspect the existing repository.

If a project already exists, preserve useful existing infrastructure unless there is a strong reason to change it.

If no suitable frontend exists, establish a clean React/TypeScript application architecture appropriate to the current environment.

Prefer:

- route-level page components
- reusable service components
- central design tokens
- central mock service layer
- reusable state components
- content/config separation where useful

Avoid a monolithic giant component.

Avoid one file containing the entire application.

Avoid duplicated styles.

Avoid inline random styling.

---

# 33. DESIGN TOKEN IMPLEMENTATION

Treat `docs/tokens.json` as structured source data.

Where practical, expose the design values through CSS custom properties or the project's equivalent token mechanism.

Do not hard-code random colours throughout the application.

Do not define a new shade every time you need emphasis.

A future design refinement should be able to change the system centrally.

---

# 34. UX4G IMPLEMENTATION

Determine whether the current environment can directly consume the current UX4G package/components appropriately.

The current UX4G implementation direction is conceptually:

UX4G foundations

→ UX4G components

→ UX4G patterns

→ EPFO-specific service components

If the package is practical in this environment, use it appropriately.

If direct package integration creates instability or incompatibility, reproduce the verified UX4G semantics/token structure in project components.

Do NOT:

- mix arbitrary legacy UX4G CSS with modern unrelated styling
- copy a Bootstrap-era implementation blindly
- create a visually inconsistent hybrid system

Use the current UX4G system as the foundation.

---

# 35. DESIGN + CODE CO-EVOLUTION

Do not separate the visual work from the real implementation.

Every design decision should be implemented in reusable code.

Every reusable component should have appropriate states.

Every page should use the real component system.

Every important interaction should work.

This is still a software project even though the first milestone heavily prioritizes frontend quality.

---

# 36. TESTING EXPECTATIONS FOR THIS BATCH

After implementation, actually run the application.

Use the browser to inspect and interact with the product.

Test:

- home
- Account Health
- service entry
- navigation
- mobile navigation
- forms
- representative error state
- representative loading state
- representative success state
- session expiry state
- at least one shallow journey from start to completion
- keyboard navigation
- responsive behavior

Do not merely say that testing was performed.

Actually inspect the running UI and fix obvious problems discovered during testing.

---

# 37. FIRST BATCH DEFINITION OF DONE

This batch is successful when:

### Product

The application feels like one coherent EPFO member service rather than a collection of generated screens.

### Frontend

The visual system is strong, consistent and reusable.

### UX

The user's goals are obvious.

### Government character

The experience feels credible and institutional.

### UX4G

UX4G semantics and verified project tokens are used consistently.

### Accessibility

The foundation is accessible rather than requiring a later total rewrite.

### Responsiveness

The primary pages work properly on mobile and desktop.

### Functionality

The application is genuinely interactive, even though complex service logic is shallow.

### Data

Mock data is deterministic and connected through a service layer.

### Architecture

Later Claim/KYC/Transfer/Recovery/Assistant batches can extend the current code without rebuilding the frontend.

### Honesty

Nothing implies that real EPFO transactions occurred.

---

# 38. IMPORTANT: DO NOT OVERBUILD

Do not interpret this prompt as permission to implement the complete hackathon project.

Do NOT fully implement:

- every claim rule
- every pension rule
- every grievance category
- every EPFO administrative workflow
- real authentication
- real OTP
- real Aadhaar
- real payments
- real employer integrations
- production security infrastructure

Those belong to later stages.

Build the foundation extremely well.

---

# 39. WORKING PROCESS

Before making major code changes:

1. Inspect the repository.
2. Inspect the provided files.
3. Inspect the mock package.
4. Inspect the existing environment/framework.
5. Identify the current UX4G integration strategy.
6. Create a concise implementation plan.
7. Implement the foundation.
8. Run the application.
9. Test it in the browser.
10. Fix problems.
11. Do a second visual/accessibility pass.
12. Update implementation status documentation.

Do not stop after planning.

Do not stop after generating components.

The deliverable is a running application.

---

# 40. REQUIRED OUTPUT FROM THIS AGENT RUN

At the end of this milestone, provide:

1. A running application.
2. The implemented route/page structure.
3. The reusable component structure.
4. The mock-data integration layer.
5. A brief implementation status document.
6. A list of intentionally shallow/unfinished deep-business areas reserved for later batches.
7. A concise list of testing performed.
8. Any significant technical limitation discovered.
9. Recommended next batch.

Do not rewrite the entire project context.

Create or update `docs/IMPLEMENTATION_STATUS.md` instead.

---

# 41. PRESERVE FUTURE BATCH BOUNDARIES

Future work will happen approximately in this order:

Batch 1 — Foundation/frontend

Batch 2 — Claim

Batch 3 — KYC

Batch 4 — Transfer

Batch 5 — Failure Recovery

Batch 6 — Assistant + voice

Batch 7 — Accessibility audit

Batch 8 — Responsive audit

Batch 9 — Final polish

Do not pull later batches into this one unless required to make the foundation functional.

---

# 42. CRITICAL QUALITY RULE

Do not optimize for the number of pages generated.

Optimize for:

**coherence + usability + realism + accessibility + reusable architecture + visible service improvement**

A smaller, extremely well-designed foundation is better than 100 shallow screens that feel disconnected.

---

# 43. FINAL DESIGN TEST

Before declaring this batch complete, inspect the running product and ask:

Would a stressed citizen understand what they can do here?

Would they know what needs attention?

Would they understand why something is blocked?

Would they know who owns the issue?

Would they know what happens next?

Does it feel like a government service rather than a SaaS dashboard?

Does the interface still work if the user never touches the assistant?

Does the product look professionally rebuilt without looking flashy?

Does the system remain coherent on mobile?

Would the later Claim/KYC/Transfer/Recovery batches naturally fit into this foundation?

If any answer is no, fix it before declaring the batch complete.

---

# 44. THE MOST IMPORTANT INSTRUCTION

Do not make EPFO merely prettier.

Make the service easier to understand.

Build the foundation that allows the citizen to see:

**What am I trying to do?**

**Am I ready?**

**What is blocking me?**

**Who needs to act?**

**What happens next?**

**Where is my request now?**

Build that into the product architecture from the beginning.
