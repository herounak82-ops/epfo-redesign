# EPFO Hackathon Project — Complete Working Context

> This document captures the **hackathon project only**, from project selection through the current UX4G/design-system stage. It intentionally excludes the earlier portfolio/Manus website project.

## 1. Project objective

We are building a **real, submission-ready redesign/prototype of an Indian government service**, centered on EPFO member services.

The goal is not to make a prettier government website or a generic SaaS dashboard. The goal is to demonstrate that difficult public-service journeys can be made:

- easier to understand;
- faster to complete;
- less repetitive;
- more transparent;
- easier to recover when something fails;
- more accessible;
- more modern while retaining government credibility.

The project is being attempted under a very tight hackathon deadline. The mindset is to make the strongest possible attempt, submit it, and learn from the experience rather than regret not trying.

---

## 2. Hackathon framing and rules

The organizer material we reviewed emphasized two broad ideas.

### Complete proof of concept

The project should be a complete, browser-accessible experience rather than disconnected mock screens.

Relevant principles:

- mock the backend where real integration is unnecessary;
- provide usable/demo credentials when login is involved;
- make the experience web-accessible;
- prioritize the user experience;
- build something that actually works as an experience.

### Ideas over code

The supplied competition material emphasized:

- interfaces and interactions;
- shipping useful ideas;
- building for busy citizens;
- avoiding bells and whistles that do not help the end user.

Core implication:

> **The UX improvement must itself be the product idea.**

Technical novelty should support the service improvement, not replace it.

---

## 3. Why EPFO was selected

We considered several targets.

### IRCTC

IRCTC was considered because the older experience has many UX problems. It was rejected because the ecosystem is already moving toward a newer/beta experience, reducing the value of recreating the old site.

### CBSE

CBSE was considered as an external public-service target because of:

- clutter;
- poorly structured previous-year papers;
- broken pages;
- inconsistent UX;
- glitches;
- outdated routes;
- possible security/quality concerns.

It remained interesting, but EPFO offered stronger public-service relevance and a much stronger problem story.

### EPFO

EPFO became the final target because:

1. It affects a very large population.
2. Its tasks have meaningful financial/emotional stakes.
3. The user has direct experience helping their father with an EPFO claim/transfer situation.
4. The problems are easy to explain through a real-world story.
5. The problems are not merely visual; they involve cross-system journeys.
6. The project can demonstrate major UX improvements without pretending to rebuild the real EPFO backend.

Observed pain points from the personal experience included:

- automatic session timeout after short periods;
- redirects to other services/sites;
- repeated login/context loss;
- unnecessary CAPTCHA friction and update problems;
- complicated claim/transfer requirements;
- confusing document requirements;
- needing to reconcile information across systems.

This gives the project an authentic reason for existing.

---

## 4. Main product thesis

The project is **not**:

> “An AI agent that replaces the EPFO website.”

It is:

> **A redesigned EPFO member service that makes high-friction tasks simpler, clearer, faster and easier to recover from — with an assistant layered on top.**

The assistant is important, especially because Codex integration is required/valued by the hackathon, but it is not the entire solution.

---

## 5. Core UX thesis

The strongest research insight is:

> EPFO becomes especially difficult when complex cross-system dependencies are exposed as tasks the citizen must personally coordinate, while diagnosis, ownership, progress and recovery remain unclear.

The product should therefore translate:

**administrative system → citizen goal**

rather than requiring:

**citizen → understand administrative system → discover the correct action**

---

## 6. Research artifacts already created

### `EPFO_Bad_User_Journeys_Report.md`

This report was based on:

- official EPFO / Ministry material;
- government public information;
- current EPFO portal information;
- recurring public user reports.

It explicitly treats public user reports as qualitative examples, not prevalence estimates.

### Other project materials

The project also has:

- mock data;
- bad journey reports / friction notes;
- user-supplied journey observations;
- UX4G research.

---

## 7. Evidence from EPFO research

The supplied research recorded 2024 formal grievance categories:

| Problem category | 2024 grievances |
|---|---:|
| PF withdrawal / final settlement | 60,396 |
| KYC / correction / Joint Declaration | 43,258 |
| PF transfer / pension service / Form 13 | 22,219 |
| UAN disabled / deactivated | 3,082 |
| Passbook / service issue | 1,072 |

It also recorded:

- 1,580,559 EPFiGMS grievances in 2024;
- 3,691,424 call-centre calls;
- 226,032 WhatsApp grievances/queries.

These numbers are being used to prioritize investigation. They are not being treated as proof that all of the problems are purely interface defects.

---

## 8. Major EPFO UX problems identified

### 8.1 Fragile access/authentication

Problems can include:

- UAN issues;
- OTP problems;
- Aadhaar authentication problems;
- recovery difficulty;
- channel switching;
- context loss.

Key feeling:

> Access itself becomes a task.

The current EPFO ecosystem also routes some identity operations through UMANG/Aadhaar-based Face Authentication, so the redesign must represent cross-channel dependencies honestly.

### 8.2 KYC / identity correction

Typical goal:

> “My name/date of birth/bank/Aadhaar details are wrong. I want to fix them.”

The redesign should make it clear:

- which record is wrong;
- what can be changed;
- who validates it;
- who owns the next step;
- when the original journey can resume.

### 8.3 PF claim / withdrawal

Typical goal:

> “I need to get my PF money.”

Problems:

- hidden prerequisites;
- technical/validation failure;
- unclear processing;
- weak rejection explanation;
- unclear recovery path.

### 8.4 PF transfer after changing jobs

Typical goal:

> “I changed jobs and want my retirement savings and service history to follow me.”

Problems:

- ambiguous old accounts;
- employer dependencies;
- Date of Exit issues;
- EPS/EPF complexity;
- uncertainty about completion.

### 8.5 Failure recovery

Typical goal:

> “My EPFO process failed. Tell me exactly how to fix it.”

Recovery should answer:

1. what happened;
2. why;
3. who owns the fix;
4. what the user should do;
5. what happens next;
6. how to return to the original journey.

---

## 9. Priority order

The report ranked the areas approximately:

1. PF withdrawal / claim uncertainty — Critical
2. KYC / identity correction — Critical
3. PF transfer / service continuity — Critical
4. Failure recovery / grievance maze — Critical
5. Login / UAN access — High

We therefore decided not to recreate the entire EPFO ecosystem. The prototype should concentrate on a small number of journeys that can actually be made excellent.

---

## 10. Goal-first information architecture

The member experience should begin with the citizen's goal, not with administrative forms.

Preferred top-level actions:

- Get my PF money
- Fix my personal details
- Move my PF after changing jobs
- View my account and service history
- Fix a failed request

Terms such as:

- Form 13;
- Form 19;
- Form 10C;
- UAN;
- EPF;
- EPS;
- KYC;

can still appear, but should normally be secondary to the user's goal.

---

## 11. Account Health concept

A major product differentiator is an **Account Health** layer.

Before starting a high-stakes action, the user should see readiness for:

- UAN;
- Aadhaar;
- PAN;
- bank;
- Date of Exit;
- service history;
- EPS;
- nomination.

Each item should expose:

- state;
- why it matters;
- action;
- responsible party;
- optionally last checked information.

Example:

> Date of Exit — Action needed  
> Your previous employer has not supplied a Date of Exit for this employment. This needs to be corrected before the transfer can be completed.

This allows blockers to be fixed before a user reaches the end of a long form.

---

## 12. Planned journeys

### Claim

```text
Account health
→ eligibility
→ choose claim goal
→ show required records
→ confirm KYC/bank readiness
→ enter necessary details
→ review
→ OTP/mock verification
→ submit
→ acknowledgement
→ status tracking
→ outcome/payment state
```

### KYC correction

```text
Account health
→ identify mismatch
→ explain affected record
→ select correction
→ edit allowed field
→ explain verification
→ review
→ submit
→ show owner
→ track correction
→ return to original task
```

### Transfer

```text
Transfer PF
→ identify previous employment
→ show matched account
→ show service history
→ show Date of Exit / EPS readiness
→ explain blockers
→ submit
→ acknowledgement
→ timeline
→ final confirmation
```

### Failure recovery

```text
Request failed
→ diagnose
→ explain owner
→ explain required action
→ fix/redirect
→ resume original journey
→ verify outcome
```

---

## 13. Authentication and session philosophy

A key redesign goal is to remove the psychological damage caused by:

- automatic timeout;
- silent redirects;
- repeated re-login;
- losing form context.

Preferred behavior:

```text
Your session has expired.

We kept your saved information.

Sign in again to continue securely.

[Sign in and continue]
```

No silent redirection.

No unnecessary context loss.

---

## 14. Chatbot / assistant

The assistant is a **feature inside the redesigned service**, not the core replacement for it.

It should:

- find a service;
- explain account health;
- explain a request status;
- identify a blocker;
- ask only the necessary questions;
- navigate to the correct place;
- trigger simulated actions;
- confirm results.

Example:

```text
User:
I want to transfer my PF from my old company.

Assistant:
I can help with that.
I'll first check whether your previous employment is ready for transfer.

[Check my account]
```

Then:

```text
Your previous employment was found.

Your Date of Exit is missing.

This needs to be corrected before the transfer can be submitted.

[See how to fix it]
```

### Critical honesty rule

The assistant must not pretend to have real EPFO backend access.

It must not claim that:

- a real claim was submitted;
- money was transferred;
- Aadhaar was actually verified;
- EPFO records were really changed.

For simulated actions, the interface should distinguish them as demo behavior.

---

## 15. Voice interaction

Voice/TTS is an additional interaction mode.

The concept:

> A busy citizen should be able to say what they need instead of navigating through many menus and administrative terms.

But voice must never be the only route.

Everything should remain possible through standard UI.

The assistant should ask only for information actually needed to complete the selected task.

---

## 16. Codex strategy

Codex is mandatory/important for the hackathon.

We decided not to make the entire product merely an “AI agent demo”.

Preferred order:

```text
Design/service architecture
→ functional frontend
→ mock service/backend behavior
→ complete journeys
→ test
→ integrate Codex-driven functionality
→ add assistant/voice
```

The assistant should be genuinely connected to the website's service model.

The desired result is not:

> “Here is an unrelated chatbot.”

It is:

> “The same redesigned EPFO service can also be driven through a useful assistant.”

---

## 17. Design challenge

The user is more experienced with visual/marketing-heavy website categories such as:

- real estate;
- salons;
- restaurants;
- studios;
- portfolio websites.

That visual language should **not** be copied into EPFO.

The EPFO design should instead be:

- calm;
- institutional;
- structured;
- information-oriented;
- accessible;
- modern;
- highly usable.

It should still feel professionally designed rather than old or neglected.

---

## 18. Major discovery: UX4G

A major turning point was discovering **UX4G — User Experience for Government**.

UX4G is a Government of India / Digital India design-system ecosystem for government UX/UI, accessibility, usability, consistency and service delivery.

It is not merely a component library.

Its current ecosystem includes:

- Foundations;
- Components;
- Patterns;
- design tokens;
- accessibility guidance;
- content guidance;
- Figma;
- Storybook;
- developer implementation;
- UX Handbook;
- UX Audit;
- compliance;
- government assets;
- case studies;
- training/capacity building;
- governance;
- AI-assisted build guidance.

This became the primary design-system reference for the project.

---

## 19. UX4G source-of-truth hierarchy

Current project rule:

1. Current UX4G Design System 3.0
2. Current UX4G developer documentation / Storybook
3. Supplied UX4G Figma resource
4. Official/current EPFO information
5. Our EPFO research, mock data and journey reports
6. General design knowledge only where the above does not answer something

Older UX4G legacy/Bootstrap-like material is historical reference material and should not automatically override current v3 guidance.

---

## 20. UX4G foundations identified

The current system organizes foundations around:

1. Color
2. Typography
3. Spacing & Layout
4. Elevation
5. Iconography
6. Design Tokens
7. Accessibility Guidelines
8. Content Design System

Important system principles:

- tokens first;
- reusable components;
- service patterns;
- accessibility by default;
- plain language;
- mobile-first;
- progressive disclosure;
- predictable navigation;
- clear feedback;
- multilingual readiness.

---

## 21. UX4G service-pattern layer

The current pattern architecture includes families relevant to this project:

- Identity & Access
- Consent & Declaration
- Application & Submission
- Status & Tracking
- Payment & Transactions
- Search & Discovery
- Dashboard & My Applications
- Notifications
- Feedback & Communication

This is important because the EPFO problem is fundamentally a service-journey problem, not just a visual design problem.

---

## 22. UX4G Figma investigation

The supplied UX4G Figma file was directly inspected.

Important resources included:

- Get Started
- Logos and Misc Icons
- Button
- Checkbox
- Dropdown Menu
- Form Field Group
- Input - Text Field
- Avatar
- Card
- Divider
- Image
- Spinner
- Table
- Tag
- Link
- NavBar
- Accessibility Bar
- Focus Ring
- Slot
- Identity and access
- Atom Library

This confirmed that the Figma file is a real component/pattern resource rather than simply a visual moodboard.

---

## 23. Verified UX4G Figma variables

Observed in the supplied Figma file:

### Colors

```text
Background/Brand/Primary/Strong      #4A2BC2
Background/Brand/Primary/Stronger    #301C7D
Background/Brand/Primary/Default     #F2EFFF
Text/Neutral/Primary                 #171717
Text/Neutral/Secondary               #404040
Text/Neutral/Inverse                 #FAFAFA
Background/Neutral/Default           #FAFAFA
Border/Neutral/Default               #D9D9D9
Border/Neutral/Subtle                #E5E5E5
Border/Brand/Primary/Default         #A391FF
Colors/Neutral/0-White               #FFFFFF
Colors/Neutral/1000-Black            #000000
Text/Brand/Primary/Default           #4A2BC2
Text/Link/Default/Default             #4A2BC2
```

### Typography

```text
Display L      60 / 64 / 600
Display S      40 / 44 / 600
Heading XXL    40 / 48 / 600
Heading L      28 / 36 / 600
Heading XS     16 / 22 / 700
Body L         18 / 26 / 400
Body M         16 / 24 / 400
Label XL       16 / 20
```

Font family observed:

**Noto Sans**

### Spacing

The file demonstrates a 4px spacing basis and includes:

- 24px section spacing;
- 48px section spacing;
- 64px section spacing;
- 24px padding;
- 32px padding.

### Radius

Observed values include:

- 0px;
- 12px;
- 16px.

These values are now the verified foundation for the project's system.

---

## 24. Current UX4G implementation direction

Current UX4G developer documentation identifies:

`ux4g-web-components`

and documents:

- Web Components / HTML;
- React;
- Angular;
- shared tokens;
- accessibility;
- Storybook/reference documentation.

The current direction is therefore:

```text
UX4G foundations
→ UX4G components
→ UX4G patterns
→ EPFO-specific journey components
```

The old UX4G Bootstrap-like legacy framework should not be mixed in indiscriminately.

---

## 25. Accessibility direction

Minimum target:

**WCAG 2.1 AA**

Required considerations:

- keyboard navigation;
- visible focus;
- screen-reader compatibility;
- semantic HTML;
- correct labels;
- associated errors;
- sufficient contrast;
- responsive behavior;
- reduced-motion behavior;
- 200% zoom;
- text alternatives for charts/data visualizations.

Color must never be the sole communication mechanism.

Use:

```text
icon + label + semantic color
```

instead of color alone.

---

## 26. Government visual direction

Target:

> **credible + calm + structured + modern + Indian + service-first**

Avoid:

- neon;
- giant gradients;
- glassmorphism;
- decorative 3D;
- giant floating blobs;
- startup dashboard aesthetics;
- unnecessary visual spectacle;
- excessive roundness.

Use:

- strong information hierarchy;
- meaningful whitespace;
- useful information density;
- dividers;
- status surfaces;
- progressive disclosure;
- clear actions;
- predictable navigation;
- institutional typography.

The desired result is:

> “This looks like a government service that was finally designed properly.”

---

## 27. Indian character

Indian character should come from context and design behavior, not decorative nationalism.

Good:

- multilingual readiness;
- Indian number/date/currency conventions;
- government-service conventions;
- EPFO institutional blue/red;
- restrained saffron/green semantic cues;
- official assets when appropriate.

Avoid:

- fake seals;
- fake government authority;
- huge Indian flags;
- tricolor gradients;
- patriotic decoration used as visual filler.

---

## 28. Project color direction

### UX4G foundation

```text
#4A2BC2
#301C7D
#F2EFFF
#171717
#404040
#FAFAFA
#FFFFFF
#D9D9D9
#E5E5E5
```

### Project-level accents

```text
EPFO blue       #0B5AA7
EPFO red        #D65A3A
Saffron cue     #F4B63E
India green     #138808
```

These additional accents are project-level additions, not official UX4G token claims.

Semantic usage:

- purple → primary action;
- blue → institutional/informational;
- red → critical/rejected/destructive;
- green → verified/complete;
- saffron → small contextual/attention usage.

---

## 29. Typography direction

Primary:

**Noto Sans**

Hindi:

**Noto Sans Devanagari**

Optional numeric/technical:

**Roboto Mono**

The Noto-based direction was also checked using the available Font Pairing connector.

Decorative fonts are not appropriate for the service.

---

## 30. Core component inventory

Planned reusable groups:

### Shell

- GovernmentHeader
- MobileHeader
- AccessibilityBar
- ServiceNav
- Footer

### Core controls

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

### Feedback

- Alert
- InlineError
- Toast
- Modal
- Spinner
- Skeleton
- EmptyState

### Data

- Table
- RecordCard
- Timeline
- Status
- AccountHealthItem
- RequestCard

### Journey

- Stepper
- ReviewSummary
- EligibilityCheck
- DocumentChecklist
- Confirmation
- RecoveryPanel

### Assistant

- AssistantLauncher
- AssistantPanel
- Message
- VoiceButton
- SuggestedAction

Every reusable interactive component should support appropriate:

```text
default
hover
focus
active
disabled
loading
error
success
```

Forms additionally need:

```text
empty
filled
invalid
valid
readonly
```

---

## 31. Content rules

Citizen-facing language must be written as real service content.

Prefer:

> Check account health

over:

> Proceed

Prefer:

> Submit claim

over:

> Submit

Prefer:

> View what needs fixing

over:

> Click here

Never use:

> Something went wrong.

when the system can explain the problem.

### Anti-AI-context-copy rule

Citizen-facing content must **not** be literally copied or obviously paraphrased from:

- prompts;
- internal plans;
- recent task context;
- hidden instructions;
- skill files;
- implementation notes;
- research instructions.

The question should instead be:

> “How would an actual government service team write this for a normal citizen?”

Copy should be:

- direct;
- specific;
- plain;
- natural;
- operational.

Avoid generic marketing language such as:

- seamless;
- revolutionary;
- empowering;
- next-generation;
- unlock;
- AI-powered as decoration.

---

## 32. Form philosophy

Rules:

- visible label above field;
- only ask for necessary information;
- validate early;
- preserve data after failure;
- use progressive disclosure;
- explain sensitive requests;
- provide review before submission;
- show important requirements before the user reaches the end.

Use:

- radios for small mutually exclusive sets;
- selects for genuinely long option lists;
- checkboxes for independent confirmations;
- consistent custom controls when the native browser UI would visually conflict with the service.

---

## 33. Error philosophy

Every important error should answer:

1. What happened?
2. Why?
3. What can I do?
4. Who owns the fix?
5. What happens next?
6. Is my information preserved?

Example:

> Your bank account is not verified, so this claim cannot be submitted yet. Verify the bank details in KYC, then return here. Your claim form is saved.

Do not present raw runtime/validation objects to citizens.

---

## 34. Status philosophy

Preferred statuses include:

- Ready
- Action needed
- In progress
- Submitted
- Under verification
- Approved
- Rejected
- Needs member action
- Needs employer action
- Needs EPFO action
- Failed — retry available

Every important status should explain:

**what is happening + what the user needs to do + who is responsible + what happens next**

---

## 35. Timeline/progress philosophy

Use:

- stepper for active multi-step forms;
- timeline for submitted requests.

Example:

```text
12 Aug    Request submitted       ✓
13 Aug    KYC verified             ✓
14 Aug    Employer verification    ✓
15 Aug    EPFO processing          ●
          Expected update: 2–3 days
```

The status timeline is not decoration. It is the user's mental model of system state.

---

## 36. Loading/realism philosophy

The product should feel operational without becoming frustrating.

Use short, meaningful loading states:

```text
Checking your account…
Verifying your details…
Submitting your request…
Loading request history…
```

A small simulated processing delay is acceptable for demo realism, but unnecessary multi-second artificial waiting is not.

Realism should come from credible state transitions, references, timestamps and acknowledgements.

---

## 37. Mobile-first strategy

Primary targets:

```text
360px
390px
412px
```

Rules:

- 16–24px page padding;
- large tap targets;
- stacked actions;
- no tiny labels;
- expandable record rows;
- important content first;
- no critical horizontal scrolling;
- no desktop table squeezed into mobile.

---

## 38. Desktop strategy

Use a roughly 1200–1280px content region.

Typical structure:

```text
Global header
────────────────────────
Page title                   Help
────────────────────────
Main service       Context/summary
────────────────────────
```

Use two columns when they reduce scanning; do not fill space purely for decoration.

---

## 39. AI development workflow

The project is intended to be built in **batches**, not through one giant generation.

### Batch 1 — Foundation

- shell;
- navigation;
- member home;
- account health;
- service goals;
- deterministic data;
- core components.

### Batch 2 — Claim

Complete the full claim journey.

### Batch 3 — KYC

Complete correction.

### Batch 4 — Transfer

Complete transfer.

### Batch 5 — Failure recovery

Complete diagnostic/recovery.

### Batch 6 — Assistant

Add assistant/voice to the completed service flows.

### Batch 7 — Accessibility

Audit all pages/journeys.

### Batch 8 — Responsive

Audit mobile/desktop.

### Batch 9 — Polish

Only after functionality and UX are solid:

- visual refinement;
- spacing;
- motion;
- icons;
- content refinement;
- performance.

---

## 40. Why batch work matters

From previous AI website work, a recurring pattern was observed:

When one feature receives too much prompt attention, an agent can over-focus on that feature and lose the broader product context.

For this project, every implementation prompt should preserve the whole model:

```text
EPFO service
+
UX4G
+
real citizen goal
+
accessibility
+
service state
+
failure recovery
```

The assistant must not consume the entire design context.

Neither should any individual journey.

---

## 41. Tools/connectors already used

The design-system stage used:

- **Figma** — direct inspection of the supplied UX4G Figma file;
- **Color Designer — Palette Maker** — explored the controlled project palette;
- **Font Pairing: Design & Brands** — explored/validated typography pairing;
- **Themely Design+Style Generator** — explored the overall service theme.

The requested Frontend Design Premium, AI Graphic Design and Template Creator connectors were not exposed in the active environment, so they were not falsely treated as used.

---

## 42. Design files created

### `SKILL.md`

Reusable Antigravity skill containing:

- UX4G source hierarchy;
- government-service design philosophy;
- EPFO journey model;
- UX4G foundations/components/patterns;
- accessibility;
- content rules;
- colors;
- typography;
- forms;
- errors;
- status;
- assistant;
- prototype realism;
- AI workflow;
- acceptance criteria;
- anti-patterns.

### `EPFO_DESIGN_SYSTEM.md`

Project-level design system covering:

- UX4G foundations;
- colors;
- typography;
- spacing;
- government shell;
- forms;
- data display;
- service journeys;
- assistant;
- mobile/desktop;
- states;
- accessibility;
- quality gates.

### `tokens.json`

Machine-readable core token set containing verified UX4G values and project-level EPFO accents.

---

## 43. Current implementation strategy

Primary environment intended:

**Antigravity**

Reason:

- persistent skill support;
- easier batch-based workflow;
- ability to carry the design-system rules consistently.

**Manus** remains a fallback if Antigravity encounters usage/credit constraints.

The same skill/design-system files should be portable across both environments.

---

## 44. Current state

### Completed

- EPFO selected as the project target.
- Main problem thesis established.
- EPFO bad-journey research created.
- Mock data prepared.
- Major journeys identified.
- UX4G discovered and researched.
- UX4G current-v3 source hierarchy established.
- UX4G Figma directly inspected.
- UX4G components/patterns/tokens mapped to the project.
- Government-style visual direction established.
- EPFO project palette established.
- Noto typography direction established.
- Reusable `SKILL.md` created.
- Reusable `EPFO_DESIGN_SYSTEM.md` created.
- `tokens.json` created.

### Not yet completed

The large Antigravity implementation pass that turns this design specification into the complete EPFO prototype has not yet been completed.

The next major task is the detailed **first Antigravity implementation prompt**, not another round of basic UX4G research.

---

## 45. Next planned implementation stage

First build batch:

```text
UX4G foundation
→ EPFO shell
→ member home
→ account health
→ goal-based service entry
→ core reusable components
→ deterministic mock data
→ baseline functionality
```

Only after this foundation is working should the project move into the heavier journey batches.

---

## 46. Final project principle

The entire project can be summarized as:

> **Take a government service that currently makes citizens understand the system, and redesign it so the system understands the citizen's goal.**

UX4G provides the design-system and public-service discipline.

EPFO provides the real-world problem.

The redesigned journeys provide the actual product innovation.

The assistant provides the Codex-connected capability.

The final experience should be:

**credible enough to feel official, modern enough to feel thoughtfully rebuilt, and useful enough that the improvements remain obvious even without the assistant.**
