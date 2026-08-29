# EPFO Redesign --- UX4G Government Service Design System

**Project:** EPFO Member Service Redesign --- Hackathon Prototype\
**Design authority:** UX4G Design System 3.0 + official EPFO
conventions\
**Primary goal:** Improve high-friction EPFO journeys without making the
product look like a commercial SaaS dashboard.

------------------------------------------------------------------------

# 01 --- DESIGN NORTH STAR

## The product should feel like

**A modern Indian government service that finally understands the
citizen's task.**

It should be:

-   official
-   calm
-   structured
-   trustworthy
-   accessible
-   mobile-first
-   multilingual-ready
-   information-dense without being cluttered
-   fast in interaction
-   explicit about system state
-   honest about dependencies

It should not feel like:

-   a startup
-   a fintech app
-   an AI demo
-   a design portfolio
-   a marketing website
-   a futuristic concept
-   a generic dashboard template

The design's "wow" factor should come from **clarity and service
intelligence**, not visual spectacle.

------------------------------------------------------------------------

# 02 --- RESEARCH BASIS

The EPFO research identifies five major UX areas:

1.  fragile access and authentication;
2.  KYC/identity correction;
3.  PF claim/withdrawal;
4.  PF transfer after changing jobs;
5.  failure recovery.

The strongest priorities are claim uncertainty, KYC correction, PF
transfer/service continuity and failure recovery.

The recurring system-level problem is:

> Complex cross-system dependencies are surfaced as user tasks, while
> diagnosis, ownership, progress and recovery remain insufficiently
> clear.

Therefore the redesign must make the hidden system visible in a useful
way.

------------------------------------------------------------------------

# 03 --- UX4G SYSTEM MAP

Use this hierarchy:

``` text
FOUNDATIONS
    ↓
COMPONENTS
    ↓
PATTERNS
    ↓
SERVICE JOURNEYS
    ↓
ACCESSIBILITY + CONTENT
    ↓
AUDIT + TESTING
```

Do not design screens independently.

Every screen must be explainable as:

``` text
Which user goal?
Which journey?
Which UX4G pattern?
Which components?
Which states?
Which data?
Which accessibility requirements?
Which recovery path?
```

------------------------------------------------------------------------

# 04 --- UX4G FOUNDATIONS

## 04.1 Color

Use semantic color roles.

Do not pick colors screen-by-screen.

### Verified UX4G base

  Token role           Value
  -------------------- -----------
  Primary strong       `#4A2BC2`
  Primary stronger     `#301C7D`
  Primary surface      `#F2EFFF`
  Text primary         `#171717`
  Text secondary       `#404040`
  Border default       `#D9D9D9`
  Border subtle        `#E5E5E5`
  Neutral background   `#FAFAFA`
  White                `#FFFFFF`
  Black                `#000000`

### Project-level EPFO accents

  Role          Value       Usage
  ------------- ----------- ----------------------------
  EPFO blue     `#0B5AA7`   institutional/secondary
  EPFO red      `#D65A3A`   critical/rejection
  Saffron cue   `#F4B63E`   small contextual/attention
  India green   `#138808`   success/verified

These four project accents are not claimed to be official UX4G tokens.
They are controlled project-level extensions.

------------------------------------------------------------------------

# 05 --- COLOR BEHAVIOR

## Primary action

Use UX4G purple.

Example:

**Check account health**

## Secondary action

Use blue or neutral outline depending on hierarchy.

Example:

**View requests**

## Destructive/critical

Use red only when the action/state is genuinely critical.

## Success

Use green + check icon + "Verified".

Never show a green dot alone.

## Warning

Use saffron/orange + warning icon + explanatory text.

## Information

Use blue + information icon.

------------------------------------------------------------------------

# 06 --- CONTRAST

Minimum:

-   normal text: 4.5:1
-   large text: 3:1
-   UI/graphics: 3:1

Every state must remain understandable in grayscale.

Never use:

> red = bad\
> green = good

without text.

Use:

> ✕ Rejected\
> ✓ Verified

with color as secondary reinforcement.

------------------------------------------------------------------------

# 07 --- TYPOGRAPHY

## Primary

**Noto Sans**

## Hindi

**Noto Sans Devanagari**

## Numeric/technical optional

**Roboto Mono**

The supplied UX4G Figma file uses Noto Sans for display, heading, body
and label roles.

------------------------------------------------------------------------

# 08 --- TYPE SCALE

  Role             Size / line-height   Weight
  -------------- -------------------- --------
  Display L                   60 / 64      600
  Display S                   40 / 44      600
  Heading XXL                 40 / 48      600
  Heading L                   28 / 36      600
  Heading M                   24 / 32      600
  Heading S                   20 / 28      600
  Heading XS                  16 / 22      700
  Body L                      18 / 26      400
  Body M                      16 / 24      400
  Body S                      14 / 20      400
  Label                       16 / 20      500
  Strong label                16 / 20      700

Do not use decorative fonts.

Do not use extremely thin weights for government-service content.

------------------------------------------------------------------------

# 09 --- SPACING

Base unit:

**4px**

Recommended project scale:

``` text
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
```

The supplied Figma file explicitly contains:

-   24px section XS
-   48px section M
-   64px section XL
-   24px padding XL
-   32px padding XXL

------------------------------------------------------------------------

# 10 --- RADII

UX4G evidence includes:

-   0px
-   12px
-   16px

Project rule:

Use restrained radii.

Preferred:

``` text
0–4px   dense controls
8px     compact cards
12px    primary surfaces
16px    larger feature surfaces
9999px  pills only
```

Do not make every component pill-shaped.

------------------------------------------------------------------------

# 11 --- ELEVATION

Use elevation to establish hierarchy.

Recommended project levels:

``` text
Level 0 — flat content
Level 1 — card
Level 2 — dropdown/popover
Level 3 — modal
```

Shadows should be subtle.

Avoid floating-everything.

------------------------------------------------------------------------

# 12 --- ICONOGRAPHY

Use a coherent SVG icon set.

Icons should:

-   have consistent stroke/weight;
-   align optically with text;
-   have accessible labels where necessary;
-   never replace critical text;
-   not be used purely as decoration in dense forms.

Use familiar symbols:

-   check
-   alert
-   info
-   arrow
-   calendar
-   search
-   download
-   lock
-   user
-   bank
-   document
-   clock
-   help

------------------------------------------------------------------------

# 13 --- GOVERNMENT SHELL

## Header

Recommended structure:

``` text
[EPFO identity]  Member Services
                    Services   Requests   Help   Language   Account
```

On mobile:

``` text
[EPFO identity]          [Menu]
```

The header should be compact and institutional.

------------------------------------------------------------------------

# 14 --- ACCESSIBILITY BAR

Consider a persistent or easily discoverable accessibility entry.

Possible controls:

-   text size
-   contrast mode
-   language
-   keyboard guidance
-   screen-reader information

Do not overload the bar with decorative controls.

------------------------------------------------------------------------

# 15 --- MEMBER HOME

The home page should not begin with a giant marketing hero.

Instead:

``` text
Header
↓
Welcome / service context
↓
Account Health
↓
What do you want to do?
↓
Active requests
↓
Recent activity
↓
Help / support
```

## Hero/content opening

Use:

### "Your EPFO account, in one place."

Supporting copy:

> Check your account, fix missing details, withdraw your PF or track a
> request without having to figure out which service to open first.

This is intentionally direct.

------------------------------------------------------------------------

# 16 --- ACCOUNT HEALTH

This is one of the main product differentiators.

Example layout:

``` text
Account health
Ready for most services

✓ UAN                Active
✓ Aadhaar            Verified
✓ PAN                Verified
✓ Bank account       Verified
! Date of Exit       Action needed
✓ Nomination         Complete
```

Each row is interactive.

Clicking a problem should explain:

``` text
What is wrong
Why it matters
Who can fix it
What you can do
```

------------------------------------------------------------------------

# 17 --- GOAL-BASED SERVICES

Use large but restrained action groups.

### What do you need to do?

**Get my PF money**\
Check eligibility, prepare your claim and track payment.

**Move my PF after changing jobs**\
Find your previous employment and transfer your savings.

**Fix my personal details**\
Correct KYC or identity information.

**View my account**\
See contributions, service history and requests.

**Fix a failed request**\
Understand what went wrong and what to do next.

Do not lead with Form 19 / Form 13 / Form 10C.

------------------------------------------------------------------------

# 18 --- CLAIM FLOW

## Step 1

**Check readiness**

Show account health.

If blocked:

> Your claim cannot be submitted yet.

Then list the blocker.

## Step 2

**Choose what you need**

Use goal-oriented choices.

## Step 3

**Confirm details**

Show:

-   bank
-   KYC
-   employment
-   eligibility

## Step 4

**Review**

Provide a complete summary.

## Step 5

**Verify**

Use OTP/mock verification.

## Step 6

**Submitted**

Show:

-   acknowledgement number
-   submission date
-   current status
-   expected next step

------------------------------------------------------------------------

# 19 --- KYC FLOW

Start with:

> Which detail needs correction?

Options:

-   Name
-   Date of birth
-   Aadhaar
-   PAN
-   Bank account
-   Other

Then:

``` text
Current value
↓
Proposed value
↓
Why this change is needed
↓
Verification method
↓
Review
↓
Submit
```

If another party must approve:

> This correction needs employer verification.

Do not hide that information until the end.

------------------------------------------------------------------------

# 20 --- TRANSFER FLOW

Start with:

> Find the PF account from your previous job.

Show matched employment:

``` text
Previous employer
ABC Technologies Pvt. Ltd.

Member ID
XXXXXX

Employment period
Apr 2018 — Jun 2024

Transfer readiness
! Date of Exit needs attention
```

This is much easier than forcing the user to understand the
administrative model first.

------------------------------------------------------------------------

# 21 --- FAILURE RECOVERY

The failure page should be one of the best-designed screens.

Example:

``` text
Your PF transfer could not be completed.

Why this happened

Your previous employment does not have a Date of Exit.

Who can fix it

Previous employer

What you can do now

Ask your previous employer to update the record.

What happens after that

You can return here and continue the transfer.

[View employer guidance]
[Return to transfer]
```

Never make the user restart from the beginning.

------------------------------------------------------------------------

# 22 --- REQUEST STATUS

Use a timeline.

Example:

``` text
Transfer request
#TRF-2026-08421

✓ Request submitted
  12 Aug, 10:42 AM

✓ Previous account matched
  12 Aug, 10:43 AM

✓ KYC checked
  12 Aug, 10:44 AM

● EPFO processing
  Current step

Next update expected
Within 2–3 working days
```

Status is the product.

Do not make users repeatedly refresh pages to discover nothing changed.

------------------------------------------------------------------------

# 23 --- SESSION MANAGEMENT

A major improvement.

Do not:

-   silently redirect
-   destroy entered data
-   send users to a different domain without context
-   force unrelated re-login

Instead:

``` text
Your session has expired.

We kept your saved information.

Sign in again to continue securely.

[Sign in and continue]
```

If the prototype uses mock authentication, make the behavior realistic
but safe.

------------------------------------------------------------------------

# 24 --- LOADING

Government-service realism should come from believable state changes,
not fake slowness.

Use:

``` text
Checking your account…
Verifying your details…
Submitting your request…
Loading request history…
```

Keep durations short.

Never add 5--10 second waits just to imitate an old government website.

------------------------------------------------------------------------

# 25 --- NOTIFICATIONS

Use a notification centre for:

-   request updates
-   action required
-   verification updates
-   service announcements
-   reminders

Each notification should contain:

``` text
what changed
why it matters
what to do
```

Avoid:

> Your request status has been updated.

Prefer:

> Your PF transfer is waiting for employer verification. No action is
> needed from you yet.

------------------------------------------------------------------------

# 26 --- CHAT ASSISTANT

The assistant should sit alongside the service, not replace it.

Possible trigger:

**Need help? Ask EPFO Assistant**

Conversation:

``` text
User:
I want to withdraw my PF.

Assistant:
I can help with that.
I'll first check whether your account is ready.

[Check account]

Assistant:
Your bank and KYC are verified.
Your Date of Exit is present.

You can continue with the claim.

[Start claim]
```

For voice:

``` text
[Hold to speak]
```

Do not make voice the only interaction.

------------------------------------------------------------------------

# 27 --- ASSISTANT SAFETY

The assistant must never claim:

-   a real claim was submitted;
-   real money was transferred;
-   real EPFO records were changed;
-   real Aadhaar verification occurred;
-   real government backend access exists.

For the hackathon prototype:

> Demo action completed. No real EPFO request was submitted.

Use mock data.

------------------------------------------------------------------------

# 28 --- MOBILE DESIGN

Mobile is the primary design constraint.

Target:

``` text
360px
390px
412px
```

Rules:

-   16--24px page padding
-   large tap targets
-   stacked actions
-   no tiny labels
-   no desktop table squeezed into mobile
-   expandable record rows
-   sticky primary action only when helpful
-   short form sections
-   persistent context

------------------------------------------------------------------------

# 29 --- DESKTOP DESIGN

Use a 1200--1280px content region.

Recommended structure:

``` text
Global header
──────────────────────────────
Page title                    Help
──────────────────────────────
Main content      Context/summary
──────────────────────────────
```

Use two-column layouts when they reduce scanning.

Do not fill every pixel.

------------------------------------------------------------------------

# 30 --- COMPONENT INVENTORY

Build reusable components for:

### Shell

-   GovernmentHeader
-   MobileHeader
-   AccessibilityBar
-   ServiceNav
-   Footer

### Core

-   Button
-   Link
-   Input
-   Textarea
-   Select
-   RadioGroup
-   Checkbox
-   DateField
-   Search
-   Tag
-   Badge
-   Divider
-   Card

### Feedback

-   Alert
-   InlineError
-   Toast
-   Modal
-   Spinner
-   Skeleton
-   EmptyState

### Data

-   Table
-   RecordCard
-   Timeline
-   Status
-   AccountHealthItem
-   RequestCard

### Journey

-   Stepper
-   ReviewSummary
-   EligibilityCheck
-   DocumentChecklist
-   Confirmation
-   RecoveryPanel

### Assistant

-   AssistantLauncher
-   AssistantPanel
-   Message
-   VoiceButton
-   SuggestedAction

------------------------------------------------------------------------

# 31 --- COMPONENT STATES

Every interactive component needs:

``` text
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

``` text
empty
filled
invalid
valid
readonly
```

Do not design only the happy path.

------------------------------------------------------------------------

# 32 --- CONTENT SYSTEM

### Labels

Prefer:

> Bank account

over:

> Bank Account Details Information

### Buttons

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

### Errors

Prefer:

> Your bank account is not verified.

over:

> Invalid bank details.

### Success

Prefer:

> Claim submitted successfully.

with reference number and next step.

Avoid:

> Success!

as the entire confirmation.

------------------------------------------------------------------------

# 33 --- BILINGUAL READINESS

Do not hardcode layout assumptions that break when Hindi is enabled.

Use:

-   flexible text containers
-   natural wrapping
-   no fixed-height text boxes
-   language toggle
-   translated labels in a content dictionary
-   adequate line-height

Do not use image-based text.

------------------------------------------------------------------------

# 34 --- ICON + COLOR + TEXT STATUS

Example:

``` text
✓ Verified
```

not:

``` text
●
```

Example:

``` text
! Action needed
```

not:

``` text
orange border
```

This improves accessibility and comprehension.

------------------------------------------------------------------------

# 35 --- DATA DENSITY

The product is a government service, so density is acceptable.

The goal is not maximum whitespace.

The goal is:

**maximum useful information per unit of attention.**

Use hierarchy:

``` text
Most important
↓
What needs action
↓
Why
↓
Details
↓
Technical reference
```

------------------------------------------------------------------------

# 36 --- TRUST SURFACES

Include appropriate:

-   department identity
-   service ownership
-   privacy information
-   support/contact
-   last updated information where relevant
-   reference numbers
-   acknowledgement details
-   security notices

But do not turn every page into a legal document.

------------------------------------------------------------------------

# 37 --- MOTION SYSTEM

Use subtle motion:

``` text
150–200ms small transitions
200–300ms panels/dialogs
```

Avoid:

-   bouncing cards
-   parallax
-   scroll-triggered spectacle
-   3D transitions
-   animated backgrounds

Respect reduced motion.

------------------------------------------------------------------------

# 38 --- AI DESIGN PROCESS

The AI must work in batches.

## Batch A --- Architecture

Build:

-   shell
-   navigation
-   account health
-   service home
-   data model

## Batch B --- Claim

Complete the entire claim journey.

## Batch C --- KYC

Complete correction journey.

## Batch D --- Transfer

Complete transfer journey.

## Batch E --- Recovery

Complete failure/recovery.

## Batch F --- Assistant

Add the assistant across those journeys.

## Batch G --- Accessibility

Audit every page.

## Batch H --- Responsive

Audit mobile/desktop.

## Batch I --- Polish

Only after all journeys work.

------------------------------------------------------------------------

# 39 --- ACCEPTANCE CRITERIA

The prototype is not complete until:

### Journey

-   user can complete each selected journey;
-   every step has a clear next action;
-   errors have recovery paths;
-   state is preserved.

### Visual

-   UX4G tokens are consistent;
-   Noto typography is consistent;
-   colors are semantic;
-   no random component styling;
-   no generic SaaS look.

### Accessibility

-   keyboard navigation works;
-   focus is visible;
-   contrast passes;
-   labels are correct;
-   errors are associated;
-   responsive text works at 200% zoom.

### Realism

-   deterministic mock data;
-   realistic references;
-   believable status;
-   realistic processing states;
-   honest prototype boundaries.

### Content

-   no AI filler;
-   no prompt-derived copy;
-   no unexplained jargon;
-   no fake claims.

------------------------------------------------------------------------

# 40 --- FINAL VISUAL PRINCIPLE

The interface should make the user think:

> "This looks like a government service, but someone finally designed it
> properly."

Not:

> "This looks like a startup pretending to be a government website."

That distinction is the design target.
