# UX4G + EPFO Government Service Design Skill

## Purpose

Use this skill whenever designing or implementing the EPFO redesign
hackathon project.

The target is **not** a generic SaaS dashboard, a flashy portfolio site,
or an AI-themed government mockup. The target is a credible Indian
public-service product that feels like a real EPFO member service while
making difficult journeys substantially clearer, faster, more
recoverable and more humane.

The design must be **UX4G-first**. AI may accelerate exploration and
implementation, but AI must not replace design-system discipline.

------------------------------------------------------------------------

## 1. Source-of-truth hierarchy

When making a design decision, use this order:

1.  Current **UX4G Design System 3.0**.
2.  Current UX4G developer documentation and Storybook.
3.  The supplied UX4G Figma design-system file.
4.  Current official EPFO member portal and official EPFO material.
5.  The user's EPFO bad-journey research, mock data and journey reports.
6.  General design knowledge and external inspiration only when the
    above do not answer the question.

### Important

Do not treat the older UX4G Bootstrap-like framework as the current v3
system when a current v3 source exists.

The current UX4G model is:

**requirements → UX4G foundations/tokens → components → service patterns
→ prototype → implementation → accessibility/audit → testing →
refinement**

AI is an acceleration layer inside that process, not a reason to bypass
it.

------------------------------------------------------------------------

# 2. What UX4G actually is

UX4G is not merely a collection of buttons, inputs and cards.

Treat it as five connected systems:

### A. Design language

-   color
-   typography
-   spacing
-   layout
-   elevation
-   iconography
-   design tokens
-   accessibility
-   content design

### B. Component library

-   form elements
-   feedback
-   data display
-   navigation
-   identity/accessibility-related components
-   states and variants

### C. Service-pattern library

-   Identity & Access
-   Consent & Declaration
-   Application & Submission
-   Status & Tracking
-   Payment & Transactions
-   Search & Discovery
-   Dashboard & My Applications
-   Notifications
-   Feedback & Communication

### D. Practice/governance

-   UX research
-   design
-   testing
-   iteration
-   UX audit
-   compliance
-   accessibility
-   privacy/consent
-   grievance/service standards
-   governance

### E. Implementation ecosystem

-   Figma
-   design tokens
-   Web Components
-   React
-   Angular
-   mobile/Flutter
-   Storybook
-   npm

The most important distinction from a generic UI library is the
**government workflow layer**. UX4G describes not only how a control
looks, but how recurring public-service flows should behave.

------------------------------------------------------------------------

# 3. Verified UX4G foundations

The current UX4G site identifies these foundations:

1.  Color
2.  Typography
3.  Spacing & Layout
4.  Elevation
5.  Iconography
6.  Design Tokens
7.  Accessibility Guidelines
8.  Content Design System

The current site also emphasizes:

-   WCAG 2.1 AA
-   keyboard operation
-   screen-reader support
-   focus management
-   plain language
-   multilingual support
-   mobile-first design
-   progressive disclosure
-   clear feedback
-   predictable navigation

------------------------------------------------------------------------

# 4. Verified Figma evidence

The supplied UX4G Figma file was inspected directly.

Its top-level resources include:

-   Get Started
-   Logos and Misc Icons
-   Button
-   Checkbox
-   Dropdown Menu
-   Form Field Group
-   Input - Text Field
-   Avatar
-   Card
-   Divider
-   Image
-   Spinner
-   Table
-   Tag
-   Link
-   NavBar
-   Accessibility Bar
-   Focus Ring
-   Slot
-   Identity and access
-   Atom Library

This is strong evidence that UX4G is intended to be used as a real
component/pattern library rather than as visual inspiration.

### Verified Figma variables observed

Do not invent these values and call them official; these are values
actually observed in the supplied file.

#### Color

-   `Background/Brand/Primary/Strong` = `#4A2BC2`
-   `Background/Brand/Primary/Stronger` = `#301C7D`
-   `Background/Brand/Primary/Default` = `#F2EFFF`
-   `Text/Brand/Primary/Default` = `#4A2BC2`
-   `Text/Neutral/Primary` = `#171717`
-   `Text/Neutral/Secondary` = `#404040`
-   `Text/Neutral/Inverse` = `#FAFAFA`
-   `Border/Neutral/Default` = `#D9D9D9`
-   `Border/Neutral/Subtle` = `#E5E5E5`
-   `Border/Brand/Primary/Default` = `#A391FF`
-   `Colors/Neutral/0-White` = `#FFFFFF`
-   `Colors/Neutral/1000-Black` = `#000000`
-   `Background/Neutral/Default` = `#FAFAFA`
-   `Text/Link/Default/Default` = `#4A2BC2`

#### Typography

-   Display L: `60px / 64px`, weight 600, Noto Sans
-   Display S: `40px / 44px`, weight 600, Noto Sans
-   Heading XXL: `40px / 48px`, weight 600, Noto Sans
-   Heading L: `28px / 36px`, weight 600, Noto Sans
-   Heading XS: `16px / 22px`, bold, Noto Sans
-   Body L: `18px / 26px`, regular, Noto Sans
-   Body M: `16px / 24px`, regular, Noto Sans
-   Label XL: `16px / 20px`, Noto Sans
-   Label XL default weight: medium
-   Label XL strong weight: bold

#### Spacing

-   base spacing model: 4px
-   Section XS: 24px
-   Section M: 48px
-   Section XL: 64px
-   Padding XL: 24px
-   Padding XXL: 32px
-   Padding None: 0
-   Inline XS: 4px
-   Stack None: 0

#### Radius

Observed:

-   radius none = 0
-   radius 12px
-   radius 16px

Use project-level radius decisions for values not present in the
verified variables.

------------------------------------------------------------------------

# 5. UX4G implementation direction

The current UX4G developer documentation identifies
`ux4g-web-components` as the current package and documents CSS/runtime
use, React/Angular/Web Components and shared tokens.

For a React implementation, the preferred direction is conceptually:

``` text
install current UX4G package
        ↓
import the UX4G stylesheet/runtime once
        ↓
use UX4G components/tokens where available
        ↓
compose them into EPFO-specific service patterns
        ↓
add project-level components only where the system does not cover the need
```

Do not blindly copy legacy UX4G CSS or legacy Bootstrap-style markup.

If the hackathon environment makes the current package impractical,
reproduce the **verified UX4G semantics and token structure** in
project-level components instead of mixing random Tailwind/shadcn styles
with unrelated visual rules.

------------------------------------------------------------------------

# 6. Accessibility is a design requirement

Minimum target: **WCAG 2.1 AA**.

### Contrast

-   normal text: at least 4.5:1
-   large text: at least 3:1
-   UI components/graphics: at least 3:1

Never communicate a state using color alone.

Use:

**icon + label + color**

not:

**color only**

### Focus

Every interactive element must have a visible focus state.

The verified UX4G accessibility page specifies a 4px focus ring, with a
2px offset, and a high-visibility focus color.

Do not remove focus outlines.

### Keyboard

Support:

-   Tab
-   Shift + Tab
-   Enter
-   Space
-   Arrow keys for composite controls
-   Escape for dialogs/dropdowns
-   Home/End where the component pattern requires them

### Forms

-   Every input has a visible label.
-   Required fields are clear.
-   Errors are associated with their fields.
-   Radio/checkbox groups have proper grouping semantics.
-   Forms can be reviewed before submission.
-   Entered data survives validation failures.
-   Long forms can preserve progress.

### Navigation

-   semantic landmarks
-   logical h1-h6 hierarchy
-   skip link
-   current-page indication
-   meaningful link labels
-   predictable focus order

### Special cases

-   Provide a text/manual alternative for date entry when calendar
    interaction is problematic.
-   Never make charts the only representation of important data.
-   Provide a table or text explanation for data visualizations.
-   Test at 200% zoom.
-   Test with keyboard only.
-   Run automated accessibility checks.
-   Perform manual review.

------------------------------------------------------------------------

# 7. Content rules

Government-service copy should sound like a human service team.

Use:

-   plain language
-   short sentences
-   specific verbs
-   concrete instructions
-   familiar words first
-   administrative terminology only when necessary
-   bilingual-ready structure
-   explanations next to unfamiliar concepts

Avoid:

-   "seamless"
-   "revolutionary"
-   "empowering"
-   "unlock"
-   "next-generation"
-   "AI-powered" as decorative marketing language
-   vague "Something went wrong"
-   copy that sounds like a design prompt
-   copy that sounds like an AI wrote a case study

### Critical anti-context-copy rule

Never generate citizen-facing copy by literally copying or paraphrasing
unrelated:

-   prompts
-   custom instructions
-   hidden planning context
-   skills
-   recent tasks
-   recent files
-   agent notes
-   internal research instructions

The copy must be written for the actual citizen and actual service.

------------------------------------------------------------------------

# 8. EPFO problem model

The redesign should address the problems supported by the EPFO research
and current official evidence.

Recurring issues include:

-   authentication itself becoming a task;
-   channel switching and context loss;
-   KYC/data correction spanning multiple records;
-   hidden prerequisites before claims;
-   unclear claim failure reasons;
-   unclear ownership of a problem;
-   service-history and transfer dependencies;
-   fragmented recovery;
-   administrative terminology replacing goal-oriented language;
-   repeated information entry;
-   poor visibility into status and next action;
-   users being forced to coordinate EPFO, employer, bank, Aadhaar,
    UMANG and other channels.

The official member portal also currently communicates that UAN
activation/generation is handled through UMANG using Aadhaar-based Face
Authentication. The redesign should therefore model cross-channel
dependencies honestly instead of pretending every operation happens
inside one backend.

------------------------------------------------------------------------

# 9. Priority journeys

Prioritize these journeys:

## Journey 1 --- Claim / Withdraw PF

User goal:

> I need to get my PF money.

Prototype path:

``` text
Account health
→ eligibility
→ choose claim goal
→ show required records
→ confirm bank/KYC readiness
→ enter only necessary details
→ review
→ OTP/mock verification
→ submit
→ acknowledgement
→ status tracking
→ approval/payment outcome
```

The improved version must surface blockers before the user reaches the
final submission step.

------------------------------------------------------------------------

## Journey 2 --- Correct KYC / Identity Details

User goal:

> My personal or bank details are wrong. I want to fix them.

Prototype path:

``` text
Account health
→ identify mismatch
→ explain which record is affected
→ select correction
→ edit allowed field
→ show verification requirement
→ submit
→ show who owns approval
→ track correction
→ return to original task
```

The user must not feel that they are correcting one field while secretly
reconciling five systems.

------------------------------------------------------------------------

## Journey 3 --- Transfer PF After Changing Jobs

User goal:

> I changed jobs and want my PF and service history to follow me.

Prototype path:

``` text
Transfer PF
→ identify old employment
→ show matched previous account
→ show service history
→ show Date of Exit / EPS readiness
→ explain any blocker
→ submit transfer
→ acknowledgement
→ timeline
→ final confirmation
```

Show the user what is happening instead of exposing Form 13 terminology
as the primary mental model.

------------------------------------------------------------------------

## Journey 4 --- Failure Recovery

User goal:

> My request failed. Tell me what I need to do now.

Prototype path:

``` text
Request status
→ failed/rejected
→ diagnose
→ explain owner
→ show required action
→ fix or contact responsible party
→ resume original journey
→ verify
```

This is one of the most important differentiators.

------------------------------------------------------------------------

# 10. Account Health

Make Account Health a reusable service layer.

Before a high-stakes action, show:

-   UAN
-   Aadhaar
-   PAN
-   bank
-   Date of Exit
-   service history
-   EPS record
-   nomination

Each item needs:

1.  status
2.  plain-language explanation
3.  why it matters
4.  next action
5.  responsible party if external
6.  optional last-checked timestamp

Example:

``` text
Bank account
Verified

Your bank details are ready for online claim payment.

[View details]
```

Blocked example:

``` text
Date of Exit
Action needed

Your previous employer has not supplied a Date of Exit for this employment.

You cannot complete the transfer until this is corrected.

[See what to do]
```

------------------------------------------------------------------------

# 11. Goal-first information architecture

The home/member experience should begin with goals, not forms.

Preferred entry points:

-   Get my PF money
-   Move my PF after changing jobs
-   Fix my personal details
-   View my account and service history
-   Fix a failed request

Administrative terminology such as:

-   Form 13
-   Form 19
-   Form 10C
-   UAN
-   EPS
-   EPF
-   KYC

can remain visible, but should usually be secondary to the user's goal.

------------------------------------------------------------------------

# 12. Government visual character

The visual target is:

**credible + calm + structured + modern + Indian + service-first**

It is NOT:

**startup + neon + futuristic + glassmorphism + 3D + marketing**

### Avoid

-   glassmorphism
-   neon gradients
-   giant gradient text
-   excessive rounded cards
-   floating blobs
-   decorative 3D objects
-   giant AI chat bubbles
-   oversized marketing photography
-   dashboard-everything layouts
-   excessive parallax
-   unnecessary animation
-   huge empty hero sections

### Use

-   strong hierarchy
-   restrained color
-   clear dividers
-   information grouping
-   predictable actions
-   status surfaces
-   progressive disclosure
-   meaningful whitespace
-   operational density
-   trustworthy typography
-   responsive layouts

------------------------------------------------------------------------

# 13. Indian visual character

Indian character should be **structural and contextual**, not decorative
nationalism.

Use:

-   official/institutional tone
-   bilingual readiness
-   Indian date/number/currency conventions
-   EPFO institutional blue/red heritage as an accent layer
-   restrained saffron/green semantic cues
-   official government/EPFO identity assets when legally and
    contextually appropriate

Do not use:

-   fake government seals
-   decorative State Emblem
-   giant Indian flags
-   tricolor gradients
-   Ashoka Chakra decorations
-   patriotic clip-art

A government site can feel Indian without looking like a Republic Day
poster.

------------------------------------------------------------------------

# 14. Project color system

### UX4G foundation layer --- verified

``` text
UX4G Primary Strong      #4A2BC2
UX4G Primary Stronger    #301C7D
UX4G Brand Surface       #F2EFFF
Text Primary             #171717
Text Secondary           #404040
Border Default           #D9D9D9
Border Subtle            #E5E5E5
White                    #FFFFFF
Black                    #000000
Neutral Background       #FAFAFA
```

### EPFO project layer --- intentionally project-level

``` text
EPFO Blue                #0B5AA7
EPFO Red                 #D65A3A
Indian Saffron Cue       #F4B63E
Indian Green / Success   #138808
```

The project palette was explored using the Color Designer connector.

### Color roles

Do not use every color everywhere.

#### Purple

Use for:

-   primary system action
-   selected navigation
-   focus-adjacent brand cues
-   links
-   key progress states

#### Blue

Use for:

-   institutional information
-   secondary actions
-   informational status
-   EPFO-specific identity accents

#### Red

Use for:

-   rejection
-   critical errors
-   destructive actions
-   important warnings only

#### Saffron

Use sparingly:

-   small contextual Indian cue
-   attention/warning where semantically appropriate

Never make saffron the main CTA color.

#### Green

Use for:

-   verified
-   complete
-   approved
-   ready

Never use green alone to communicate success.

------------------------------------------------------------------------

# 15. Typography system

Primary typeface:

**Noto Sans**

Hindi:

**Noto Sans Devanagari**

Technical/reference numbers where useful:

**Roboto Mono**

The Font Pairing connector was used to confirm a multilingual Noto-based
system.

### Recommended hierarchy

``` text
Display L      60 / 64 / 600
Display S      40 / 44 / 600
Heading XXL    40 / 48 / 600
Heading L      28 / 36 / 600
Heading M      24 / 32 / 600
Heading S      20 / 28 / 600
Heading XS     16 / 22 / 700

Body L         18 / 26 / 400
Body M         16 / 24 / 400
Body S         14 / 20 / 400

Label          16 / 20 / 500
Strong Label   16 / 20 / 700
```

The larger values are aligned with the observed UX4G Figma variables.
Project-level additions must not contradict the system.

------------------------------------------------------------------------

# 16. Layout system

Use a 4px base spacing system.

Suggested project rhythm:

``` text
4   micro
8   tight
12  compact
16  standard
24  section-inner
32  large
48  section
64  major section
80+ page-level separation
```

Desktop:

-   content width around 1200--1280px
-   stable left alignment
-   controlled reading measure

Mobile:

-   16--24px horizontal page padding
-   single-column priority
-   stacked actions
-   no tiny tap targets
-   no critical horizontal scrolling

Use cards only when they help grouping.

A form field does not need its own card.

------------------------------------------------------------------------

# 17. Header and shell

## Public/member header

Include:

-   official identity/wordmark treatment
-   service name
-   language
-   accessibility
-   help
-   account/session controls when signed in

Avoid giant marketing navigation.

## Authenticated shell

Use:

-   clear service navigation
-   current-section indication
-   account menu
-   persistent help/support access
-   consistent header across the entire journey

Do not repeatedly throw the user into a new login session for every
service.

------------------------------------------------------------------------

# 18. Forms

Rules:

-   label above field
-   helper text before failure
-   only ask for what is needed
-   validate early
-   preserve data after failure
-   use progressive disclosure
-   explain why sensitive information is required
-   provide a review step
-   keep a visible summary for long tasks

Use:

-   radio groups for mutually exclusive choices
-   checkboxes for independent confirmations
-   selects for genuinely long lists
-   segmented controls only when there are very few stable choices

For the prototype, use a custom accessible select/dropdown matching the
design system instead of browser-native selection dialogs when
consistency matters.

------------------------------------------------------------------------

# 19. Error system

Never show:

> Something went wrong.

Every error must answer:

1.  What happened?
2.  Why?
3.  What can I do?
4.  Who owns the fix?
5.  What happens next?
6.  Is my data safe/preserved?

### Good

> Your bank account is not verified, so this claim cannot be submitted
> yet. Verify the bank details in KYC, then return here. Your claim form
> is saved.

### Technical uncertainty

> We couldn't confirm the request just now. Nothing has been submitted.
> Check Request status before trying again.

### Session timeout

Do not silently redirect.

Show:

> Your session expired after a period of inactivity.
>
> Your saved information is still here.
>
> \[Continue securely\]

If re-authentication is actually required, explain why.

------------------------------------------------------------------------

# 20. Status model

Use:

-   icon
-   text
-   color
-   optional timestamp

Preferred states:

``` text
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
```

Every status should answer:

**What is happening? What do I need to do? Who is responsible? When
should I check again?**

------------------------------------------------------------------------

# 21. Tables and records

Use tables when the user needs to compare rows/columns.

Good EPFO examples:

-   employment history
-   contribution history
-   service records
-   request history
-   KYC records

On mobile:

-   prioritize the most important columns
-   allow row expansion
-   avoid tiny text
-   do not force the user to horizontally scroll to discover the main
    action

------------------------------------------------------------------------

# 22. Progress and timelines

Use:

### Stepper

for an active multi-step task.

### Timeline

for a submitted request.

Example:

``` text
12 Aug   Request submitted       ✓
13 Aug   KYC verified             ✓
14 Aug   Employer verification    ✓
15 Aug   EPFO processing          ●
          Expected update: 2–3 days
```

The timeline is not decoration. It is the user's mental model of system
state.

------------------------------------------------------------------------

# 23. Motion

Motion should explain state.

Use:

-   short transitions
-   restrained page transitions
-   loading indicators only when work is occurring
-   skeletons when content is actually loading
-   small confirmation animations

Respect:

`prefers-reduced-motion`

Do not add:

-   parallax
-   scroll hijacking
-   long entrance animations
-   decorative 3D motion
-   artificial delays that make the prototype frustrating

A tiny realistic processing delay can be used in a demo to make a
service feel operational, but never delay an action merely to look
"official".

------------------------------------------------------------------------

# 24. Chatbot / service assistant

The assistant is a **feature of the EPFO redesign**, not the entire
redesign.

Its purpose:

-   find a service
-   explain account health
-   explain a status
-   identify a blocker
-   ask only necessary questions
-   navigate the user to the right place
-   execute simulated actions in the prototype
-   confirm the result

Example:

User:

> I want to transfer my PF from my old company.

Assistant:

> I can help with that. First I need to check whether your previous
> employment is ready for transfer. Shall I check your account?

Then:

> Your previous employment is found. Your Date of Exit is missing. This
> needs to be corrected before the transfer can be submitted.
>
> \[See how to fix it\]

### Important

The assistant must not pretend it has access to real EPFO backend
systems.

If an action is simulated:

> Demo action completed. No real EPFO request was submitted.

Voice/TTS is an additional interaction mode. Every task must still be
possible through normal UI.

------------------------------------------------------------------------

# 25. Prototype data model

Use deterministic mock data.

Do not use random values that change every render.

Create realistic records for:

-   member
-   UAN
-   employment
-   KYC
-   bank
-   service history
-   EPS
-   nominations
-   requests
-   claim
-   transfer
-   grievance
-   notifications

Every demo journey should have known states:

``` text
READY
BLOCKED
IN_PROGRESS
SUBMITTED
APPROVED
REJECTED
NEEDS_ACTION
```

This makes testing predictable.

------------------------------------------------------------------------

# 26. Prototype realism

The prototype should feel like a real government service.

Use:

-   realistic request IDs
-   realistic timestamps
-   realistic processing language
-   restrained loading states
-   acknowledgement numbers
-   status histories
-   service ownership
-   clear legal/help surfaces

Do not use fake backend claims.

Do not imply that a real claim, transfer or financial transaction
occurred.

------------------------------------------------------------------------

# 27. Quality gate

A screen is not "done" because it looks good.

Before accepting it, ask:

### Service

-   Does it solve a real EPFO task?
-   Is the user's goal obvious?
-   Is the next action obvious?

### Content

-   Can a first-time user understand it?
-   Is jargon explained?
-   Does it sound written for a citizen?

### Design system

-   Is it consistent with UX4G foundations?
-   Is it using reusable components?
-   Is it using patterns rather than inventing a new flow?

### Accessibility

-   WCAG 2.1 AA?
-   Keyboard?
-   Focus?
-   Contrast?
-   Labels?
-   Error association?
-   200% zoom?

### Responsive

-   mobile
-   tablet
-   desktop

### Failure

-   empty
-   loading
-   error
-   blocked
-   success
-   disabled

### Trust

-   no invented government authority
-   no fake backend integration
-   no misleading official status
-   no unnecessary personal data

------------------------------------------------------------------------

# 28. Design anti-patterns

Reject the design if it contains:

-   random gradients
-   arbitrary colors
-   unrelated font families
-   excessive rounded cards
-   generic SaaS dashboards
-   "AI" everywhere
-   decorative 3D
-   unnecessary illustrations
-   unclear CTAs
-   browser-native controls that visually clash
-   giant paragraphs
-   jargon-heavy instructions
-   generic error messages
-   hidden progress
-   hidden ownership
-   repeated login/session resets
-   forced channel switching without explanation

------------------------------------------------------------------------

# 29. AI workflow

When an AI tool generates UI:

### Pass 1 --- Structure

Ask for:

-   page hierarchy
-   service shell
-   real journeys
-   reusable components
-   deterministic mock data

Do not obsess over visual polish yet.

### Pass 2 --- UX4G alignment

Audit:

-   tokens
-   typography
-   spacing
-   components
-   patterns
-   accessibility
-   content

### Pass 3 --- Journey completion

Walk every journey from beginning to end.

Do not judge individual screens only.

### Pass 4 --- Failure states

Intentionally test:

-   invalid KYC
-   missing Date of Exit
-   failed claim
-   session expiry
-   network failure
-   duplicate submission
-   missing bank verification
-   employer action required

### Pass 5 --- Responsive

Test:

-   mobile first
-   desktop
-   narrow mobile
-   large desktop

### Pass 6 --- Polish

Only now refine:

-   spacing
-   density
-   motion
-   hierarchy
-   copy
-   icons
-   visual rhythm

------------------------------------------------------------------------

# 30. Final rule

When in doubt:

**Make the service easier to understand, not merely prettier.**

The best EPFO redesign is the one where a person who is already stressed
about their PF can immediately answer:

> What am I trying to do?

> Am I ready?

> What is blocking me?

> Who needs to fix it?

> What happens next?

> Where is my request now?

That is the standard every screen should meet.
