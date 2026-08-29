# EPFO India — Bad User Journeys & Major UX Problems

**Research report**  
**Scope:** EPFO member-facing digital experience in India  
**Focus:** Five major bad journeys that make the service feel difficult or unusable, backed by official grievance data, EPFO/government documentation, and recurring user reports.

---

## Executive Summary

The central EPFO UX problem is not simply that the website is old or visually dated. The deeper problem is that an apparently single service is actually a **distributed administrative network** involving EPFO, Aadhaar, banks, employers, UAN/member IDs, UMANG, service history and multiple grievance channels.

Users are therefore asked to solve problems that are often caused by the interaction of several systems. When something goes wrong, the interface frequently exposes the administrative data model instead of the user's goal.

The five journeys with the strongest combination of **frequency, financial consequence, failure severity, cross-system dependency, and user frustration** are:

1. **Access / recover UAN and EPFO account**
2. **Correct KYC and identity data**
3. **Claim / withdraw PF money**
4. **Transfer and consolidate PF after changing jobs**
5. **Recover from failure through grievance/support channels**

Official 2024 grievance data shows three of these are among EPFO's largest explicitly categorized member-problem areas: **withdrawal/final settlement (60,396), KYC correction/Joint Declaration (43,258), and PF transfer/Form 13/pension service (22,219)**. EPFiGMS as a whole received **1,580,559 grievances in 2024**. [1][2]

The strongest design opportunity is therefore not a cosmetic redesign. It is to change EPFO from a **form-and-status driven experience** into a **goal-driven, diagnostic and recovery-oriented service**.

---

# 1. Research Objective

## 1.1 Objective

Identify the five EPFO member journeys that most strongly contribute to the perception that EPFO's digital service is difficult, confusing, unreliable, or unusable.

## 1.2 Research questions

- Which member journeys generate the strongest evidence of friction?
- Which failures are visible in official grievance data?
- Which journeys have high financial or emotional stakes?
- Where do users encounter multiple systems, organizations or dependencies?
- Where does failure recovery force the user outside the main journey?
- Which areas should receive the highest UX redesign priority?

## 1.3 Evidence approach

This report triangulates four evidence types:

1. **Official EPFO / Ministry of Labour material** — grievance categories, grievance volumes, service rules, reform initiatives and portal information.
2. **Government public information** — changes announced to reduce transfer, KYC and account-maintenance friction.
3. **Current EPFO portal information** — current access and account-management arrangements.
4. **Recurring user reports** — examples from public discussions that illustrate real-world failure modes. These are qualitative examples, not prevalence estimates.

---

# 2. Evidence Snapshot

## 2.1 2024 EPFO grievance categories

| Problem category | New grievances in 2024 | UX interpretation |
|---|---:|---|
| PF withdrawal / final settlement | **60,396** | Highest-impact member task; money access is a major pain point |
| KYC / correction / Joint Declaration | **43,258** | Identity/data quality is a major source of friction |
| PF transfer / pension service / Form 13 | **22,219** | Job changes create continuity and service-history problems |
| UAN disabled / deactivated | **3,082** | Account access remains a meaningful failure point |
| Passbook / service issue | **1,072** | Information visibility and account state remain problematic |

**Source:** Ministry of Labour and Employment, Annual Report 2024–25 / EPFO qualitative grievance analysis. [1]

### Important interpretation

These are **formal grievances**, not a direct measure of all user difficulty. A grievance may include policy, employer or backend issues in addition to interface problems. However, the volumes identify where members repeatedly need help and therefore provide strong evidence for UX investigation.

## 2.2 Overall grievance burden

EPFiGMS received **1,580,559 grievances in 2024** and disposed of **1,518,984** during the year. EPFO's support ecosystem also recorded **3,691,424 call-centre calls** in 2024 and **226,032 WhatsApp grievances/queries**, of which **221,787** were resolved. [2]

This matters because support volume is itself a UX signal: a large digital service that repeatedly requires manual explanation, escalation or human intervention is not fully self-service in practice.

---

# 3. The Five Major UX Problems

## Problem 1 — Fragile access and authentication

Users can encounter UAN activation/recovery, password, OTP, Aadhaar authentication, account status and channel-switching problems before they even reach the service they need.

EPFO's current member portal states that **UAN activation for existing UANs and new UAN generation are handled through UMANG using Aadhaar-based Face Authentication**. [3]

### Why this matters

The user's mental model is simple:

> “I am using EPFO; I should be able to access and manage my EPFO account here.”

The service model is more complex, with important identity operations crossing into another channel. That channel handoff increases cognitive load and creates another failure boundary.

### UX symptom

**Access itself becomes a task.**

### Impact

A login/authentication failure blocks every downstream service: balance checking, KYC updates, claims, nomination and request tracking.

---

## Problem 2 — Fragmented identity and KYC data

A user's name, date of birth, Aadhaar, PAN, bank account, UAN and service records can be represented across different systems and records. Historically, corrections could also depend on employer approval.

In 2024, EPFO recorded **43,258 grievances** for KYC updation/correction/Joint Declaration issues. [1]

EPFO subsequently introduced profile-correction simplifications for Aadhaar-verified users. In its reform analysis, EPFO reported that **79.22% of sampled profile-correction cases were directly approved by members**, while **16.96% required employer approval**, showing the effect of reducing unnecessary approval dependencies. [4]

### UX symptom

A small personal-data correction becomes a multi-party administrative workflow.

### Impact

A mismatch can block claiming, transferring, authenticating or otherwise using the account.

### Core design issue

The system exposes its data structure to the user instead of presenting a single understandable identity record.

---

## Problem 3 — PF claim and withdrawal uncertainty

Claiming PF is arguably the highest-stakes task because the user is trying to access their own savings.

EPFO's official FAQ states that online claims require the account to be seeded with **Aadhaar, PAN and bank account information**, and says claims are to be settled within **20 days**. [5]

In 2024, **60,396 withdrawal/final-settlement grievances** were recorded, making withdrawal the largest of the explicitly categorized grievance groups in the cited analysis. [1]

### Common failure modes reported by users

- claim submission errors
- claims remaining under process without a clear diagnosis
- rejection reasons that are difficult to interpret
- contradictions between service history, exit information and claim status
- technical failures that disappear/reappear without clear explanation

Public user reports provide qualitative examples of these issues, including technical claim-submission failures and complaints about rejected or inconsistent service-history information. [6][7]

### UX symptom

**The most financially important workflow can feel uncertain and non-diagnostic.**

A good financial service should make four things obvious:

1. Am I eligible?
2. What is blocking me?
3. What happens next?
4. When should I expect the money?

EPFO's experience can require the member to infer these answers from statuses, messages and separate records.

### Important nuance

EPFO is also improving processing efficiency. It reported **5.08 crore claims settled in FY 2024–25**, with **1.87 crore auto-settled claims**. [8]

The problem therefore should not be framed as “EPFO cannot process claims.” The stronger UX finding is:

> **Backend processing improvements do not automatically create a predictable, understandable member experience.**

---

## Problem 4 — Legacy complexity around job changes and PF transfer

A job change should ideally preserve one continuous financial identity. Instead, the user can encounter UAN/member-ID complexity, multiple accounts, missing Date of Exit data, EPS/service-history inconsistencies and employer dependencies.

EPFO recorded **22,219 grievances** related to PF transfer, pension service and Form 13 in 2024. [1]

EPFO has explicitly targeted this area for simplification. From **15 January 2025**, it simplified transfer claims and removed employer approval for many KYC-verified members, with the stated aim of reducing turnaround time and grievances. [4]

### Common failure modes reported by users

- multiple UANs or old Member IDs
- missing/incorrect Date of Exit
- EPS information not aligning across records
- transfer rejection despite apparently correct member information
- service history not reflecting expected continuity
- uncertainty about which account/record should be authoritative

Public reports illustrate cases involving multiple UANs, conflicting service histories and long-running EPS/transfer problems. [9][10]

### UX symptom

**Changing jobs can turn into an account-reconstruction exercise.**

### Core design issue

EPFO often makes the member manage the system's legacy structure instead of presenting a unified employment/savings history.

---

## Problem 5 — Failure recovery becomes an escalation maze

When the normal journey fails, the member may move from the main EPFO portal to the employer, EPFiGMS, WhatsApp, phone support, a regional office, CPGRAMS, RTI or in-person follow-up.

EPFiGMS itself is a substantial workflow: EPFO's 2024 annual reporting describes **65 grievance categories**, UAN-based routing, document uploads, reminders and three-level escalation. [2]

### UX symptom

The user first fails at the main task, then has to learn a separate complaint-management system.

### Why this is serious

Recovery should be a built-in property of a good service. Instead, the member often has to:

- identify what failed
- choose the right complaint category
- gather evidence
- decide who should own the issue
- submit the grievance
- wait
- remind/escalate
- potentially change channels

Recent public reports describe repeated grievances, escalation to CPGRAMS/RTI and, in extreme anecdotes, repeated office visits before resolution. [11]

### Core design issue

**Failure recovery is externalized to the user.**

---

# 4. The Five Bad Journeys — Detailed Journey Maps

---

## Journey 1 — Access / Recover UAN

### User goal

“I want to get into my EPFO account.”

### Typical journey

**EPFO → identify UAN → activate/recover UAN → authenticate → OTP/Face Authentication → login → reach member services**

### Friction points

| Stage | User question | Typical UX problem |
|---|---|---|
| Discover | Where do I start? | EPFO and UMANG responsibilities are not always intuitive |
| Identify | What is my UAN? | Users may not remember or know the correct account identifier |
| Authenticate | Why isn't OTP working? | Authentication failures block the journey |
| Recover | How do I regain access? | Recovery can be more complex than expected |
| Enter service | Why am I being redirected? | Channel switching creates context loss |

### Failure feeling

> “I cannot even get into the system to find out what is wrong.”

### UX severity

**High**

### Why it matters

Authentication is the gateway to every downstream action. A gateway failure creates a total-service failure.

---

## Journey 2 — Correct KYC / Identity Data

### User goal

“My name/date of birth/bank/Aadhaar details are wrong. I want to fix them.”

### Typical journey

**Login → KYC/profile → identify mismatch → submit correction → verification/approval → re-check → retry original service**

### Friction points

| Stage | Friction |
|---|---|
| Diagnose | The user may not know which record is causing the mismatch |
| Correct | Multiple fields/systems can interact |
| Verify | Approval or verification rules may intervene |
| Retry | The user may need to return to the original journey after the correction |

### Failure feeling

> “I am correcting one field, but the system is making me reconcile multiple identities.”

### Evidence

**43,258 KYC/correction/Joint Declaration grievances in 2024.** [1]

### UX severity

**Critical**

---

## Journey 3 — Claim / Withdraw PF

### User goal

“I need to get my PF money.”

### Typical journey

**Login → check eligibility → validate KYC/bank → select claim → submit → OTP → processing → approval/rejection → payment**

### Friction points

| Stage | Friction |
|---|---|
| Prepare | Hidden prerequisites can block the claim |
| Submit | Technical or validation errors can interrupt submission |
| Process | “Under process” can provide little diagnostic information |
| Reject | The user may not understand how to correct the failure |
| Wait | Timing is emotionally important when funds are needed urgently |
| Verify | Payment/status information may require checking multiple surfaces |

### Evidence

**60,396 withdrawal/final-settlement grievances in 2024.** [1]

### UX severity

**Critical / Highest**

---

## Journey 4 — Transfer PF After Changing Jobs

### User goal

“I changed jobs. I want my retirement savings and service history to follow me.”

### Typical journey

**New employer → identify previous account → transfer → reconcile service → handle EPS/exit data → confirm new record**

### Friction points

| Stage | Friction |
|---|---|
| Identify | Old UAN/Member IDs may create ambiguity |
| Transfer | Employer/service dependencies can appear |
| Reconcile | EPS/EPF and service history can diverge |
| Validate | Missing Date of Exit or legacy records can break the flow |
| Confirm | User may not know whether the transfer fully succeeded |

### Evidence

**22,219 transfer/pension service/Form 13 grievances in 2024.** [1]

EPFO's January 2025 transfer reforms explicitly targeted reduction of employer approvals and turnaround time. [4]

### UX severity

**Critical**

---

## Journey 5 — Recover From Failure

### User goal

“My EPFO process failed. Tell me exactly how to fix it.”

### Typical journey

**Failure → understand reason → identify owner → EPFiGMS/support → submit evidence → wait → reminder → escalation → alternative channel / office**

### Friction points

| Stage | Friction |
|---|---|
| Diagnose | Error messages may not explain the real cause |
| Ownership | User may not know whether employer, EPFO, bank or another system owns the fix |
| Escalate | Different channels have different roles and processes |
| Follow-up | The member must actively manage the case |
| Closure | A resolved grievance may still require the user to verify the original service |

### Evidence

**1,580,559 EPFiGMS grievances in 2024**, plus millions of support interactions across phone and WhatsApp channels. [2]

### UX severity

**Critical**

---

# 5. Cross-Journey Failure Patterns

The five journeys look different on the surface, but the same systemic issues recur.

## 5.1 The user sees symptoms, not causes

Example:

**System:** “Claim rejected.”

**User needs:** “Which record is wrong, who can fix it, what should I do now, and will this unblock the claim?”

The UX problem is a lack of **diagnostic transparency**.

---

## 5.2 The service exposes administrative terminology

Common concepts include:

- UAN
- Member ID
- EPS
- EPF
- Form 13
- Form 19
- Form 10C
- Joint Declaration
- Date of Exit
- KYC
- Aadhaar seeding

These are legitimate administrative concepts, but the member's goal is usually simpler: **access account, fix details, transfer savings, or get money**.

The system should translate the administrative model into a goal-based user model.

---

## 5.3 Ownership of the problem is unclear

A single issue may involve:

**EPFO + current employer + previous employer + bank + Aadhaar + UMANG + service records**

When responsibility is unclear, the user becomes the coordinator.

---

## 5.4 Multiple channels fragment the experience

The broader ecosystem can include:

**EPFO website / Member portal / Passbook / UMANG / EPFiGMS / WhatsApp / call centre / employer / regional office / CPGRAMS**

Multiple channels can improve coverage, but only when the user does not have to understand which channel owns which problem.

---

## 5.5 High-stakes tasks have high emotional cost

EPFO is not just an information service. The user may be trying to access retirement savings, emergency funds, or benefits after leaving employment.

Therefore:

**uncertainty + money + long waiting + low visibility = very high perceived failure**

---

# 6. Why the Experience Can Feel “Unusable”

A website can be technically functional yet feel unusable when the following conditions combine:

1. **The correct action is hard to discover.**
2. **The system's terminology is unfamiliar.**
3. **The user cannot see why something failed.**
4. **The user does not know who owns the problem.**
5. **The recovery path is separate from the original journey.**
6. **The user has to repeat information across channels.**
7. **The financial stakes make uncertainty much more costly.**

EPFO exhibits several of these conditions simultaneously.

---

# 7. Major Problems Ranked by UX Importance

| Rank | Major problem | Frequency evidence | Financial impact | Cross-system complexity | Recovery difficulty | UX priority |
|---:|---|---|---|---|---|---|
| **1** | PF withdrawal/claim uncertainty | Very High | **Very High** | High | High | **Critical** |
| **2** | KYC / identity correction | Very High | High | **Very High** | High | **Critical** |
| **3** | PF transfer / service continuity | High | High | **Very High** | **Very High** | **Critical** |
| **4** | Failure recovery / grievance maze | Very High | Very High | **Very High** | **Very High** | **Critical** |
| **5** | Login / UAN access | High | High | High | High | **High** |

---

# 8. What Should Be Redesigned First

## 8.1 Move from “forms” to “goals”

The home/member experience should begin with user goals:

- **Get my PF money**
- **Fix my personal details**
- **Move PF after changing jobs**
- **View my account and service history**
- **Fix a failed request**

Then the system should determine the required forms, records and prerequisites.

---

## 8.2 Build a single “account health” layer

Before a user starts a claim or transfer, EPFO should proactively show:

**Account health**

- Aadhaar: Verified / issue
- PAN: Verified / issue
- Bank: Verified / issue
- UAN: Active / issue
- Date of Exit: Present / missing
- Service history: Consistent / issue
- EPS record: Consistent / issue
- Nomination: Complete / incomplete

The user should be able to fix the blocker before starting the high-stakes transaction.

---

## 8.3 Replace generic errors with diagnostic explanations

Instead of:

> “Claim rejected.”

Use:

> **Your claim cannot be processed because your Date of Exit is missing for your previous employer.**
>
> **Who can fix it:** Previous employer / EPFO
>
> **What to do:** Submit Date-of-Exit correction
>
> **Expected effect:** Your PF claim can be retried after the record is corrected.

The system should always answer **what / why / who / next / when**.

---

## 8.4 Make recovery part of the journey

The most important redesign principle is:

> **Never force the user to leave the failed journey to understand how to recover.**

Every failure state should contain:

- cause
- owner
- required evidence
- action button
- expected timeline
- case/reference ID
- progress tracker

---

## 8.5 Unify service history

A user should see one continuous employment and savings timeline rather than having to infer continuity from multiple UANs, Member IDs, forms and EPS information.

Example:

**2019–2022 — Employer A**  
EPF contribution: ₹X  
Service: X years

**2022–2024 — Employer B**  
EPF contribution: ₹Y  
Transfer: Complete

**2024–Present — Employer C**  
Current contribution: ₹Z

The administrative records can still exist underneath this view, but they should not be the primary mental model.

---

# 9. What the Recent EPFO Reforms Tell Us

Recent reforms are useful evidence because they show where EPFO itself has identified friction.

### KYC/profile correction

EPFO simplified profile corrections for Aadhaar-verified members, reducing approval dependencies and enabling more member-led correction. [4]

### PF transfer

From January 2025, EPFO simplified many transfer claims and reduced employer approval requirements. [4]

### Incorrect Member ID handling

Government communication has also highlighted online delinking of incorrectly linked Member IDs as part of simplification. [12]

### Auto-settlement

EPFO reported strong growth in auto-settlement of eligible claims, showing movement toward reducing manual processing. [8]

### Interpretation

The most promising direction is consistent across these reforms:

> **Reduce unnecessary human dependency, detect data conditions earlier, and allow the member to complete more tasks directly.**

The UX layer should make these backend/process reforms visible as a simpler experience.

---

# 10. Research-Based Design Principle

## The biggest insight

> **EPFO looks like one website, but behaves like a distributed administrative network.**

That mismatch creates many of the strongest user frustrations.

The user should not need to understand how EPFO's internal systems are connected.

Instead, the service should understand the user's goal and orchestrate the underlying systems on the user's behalf.

### Current mental model

**User → website → form → error → search internet → ask employer → grievance → escalation**

### Desired mental model

**User → goal → account health check → guided resolution → transaction → transparent status → completion**

---

# 11. Evidence Limitations

This report combines quantitative administrative evidence with qualitative user reports.

### Quantitative limitation

Official grievance counts measure **reported grievances**, not all instances of friction. They also include administrative, policy and employer problems that are not purely UI/UX defects.

### Qualitative limitation

Reddit and other public user reports are useful for identifying recurring failure modes and lived experience, but they are **not representative survey data**. They should be used as supporting qualitative evidence rather than prevalence estimates.

### Research implication

The next research phase should validate these findings through:

- task-based usability testing
- moderated interviews
- funnel analytics
- claim-rejection reason analysis
- time-to-resolution data
- contact-centre reasons for calling
- EPFiGMS category-level root-cause analysis

---

# 12. Recommended UX Research Prioritization

## Priority 1 — PF withdrawal

**Research questions:**

- Where do users abandon claims?
- Which prerequisites are discovered too late?
- Which rejection reasons are least understood?
- How often do users contact support after a failed claim?

## Priority 2 — KYC correction

**Research questions:**

- Which data mismatches cause the largest downstream failures?
- Which corrections are self-service versus employer-dependent?
- Can the system diagnose the exact source of a mismatch automatically?

## Priority 3 — PF transfer

**Research questions:**

- Why do users end up with multiple UANs/member IDs?
- Which service-history fields most frequently block transfers?
- Can transfer readiness be shown before submission?

## Priority 4 — Failure recovery

**Research questions:**

- What percentage of support contacts are caused by failed digital journeys?
- Can the system route a failure automatically to the correct owner?
- How many grievances are caused by users choosing the wrong category?

## Priority 5 — Login / UAN access

**Research questions:**

- Which authentication failures dominate?
- How many users switch between EPFO and UMANG during recovery?
- Can account recovery become a single guided flow?

---

# 13. Final Assessment

EPFO's five most damaging user journeys are not random website annoyances. They cluster around the moments when users need the service most:

1. **Get access**
2. **Fix identity**
3. **Get money**
4. **Carry savings across jobs**
5. **Recover when something fails**

These journeys are especially problematic because they combine **high frequency, high stakes, multiple dependencies, opaque system state and difficult recovery**.

The official grievance data makes the priority clear: **withdrawal/final settlement, KYC/correction and transfer/service issues account for large, explicitly identified volumes of member complaints**, while the overall grievance ecosystem processes more than **1.5 million complaints a year**. [1][2]

The most useful UX strategy is therefore not “make the website look modern.” It is:

> **Make EPFO explain itself, diagnose problems before submission, reduce unnecessary handoffs, unify the member's history, and keep recovery inside the main journey.**

That would address the structural reasons the service can feel unusable, rather than only improving the visual layer.

---

# References

**[1] Ministry of Labour and Employment, Government of India — Annual Report 2024–25 / EPFO grievance analysis.**  
https://labour.gov.in/sites/default/files/arenglish2024-25_compressed.pdf

**[2] Ministry of Labour and Employment, Government of India — EPFO/EPFiGMS grievance and support statistics.**  
https://www.labour.gov.in/static/uploads/2025/06/2e2caf1b03576b863340ee42155a0fdf.pdf

**[3] EPFO Member Portal — current member login/UAN activation information.**  
https://unifiedportal-mem.epfindia.gov.in/memberinterface/

**[4] EPFO / Central Board of Trustees material — reforms covering profile correction and transfer claims.**  
https://www.epfindia.gov.in/site_docs/PDFs/CBT_Files/EC_meeting_Agenda_112.pdf

**[5] EPFO FAQ — online claim prerequisites and stated claim settlement timeline.**  
https://www.epfindia.gov.in/site_en/FAQ.php

**[6] Public user report — EPFO login/OTP and related service issues.**  
https://www.reddit.com/r/epfoindia/comments/1t94wzq/anyone_else_facing_pf_issues_lately_uan_claim_kyc/

**[7] Public user report — EPFO withdrawal/claim technical issue example.**  
https://www.reddit.com/r/epfoindia/comments/1pyg1f6/epfo_website_is_awesome_s/

**[8] EPFO press release — claim settlement and auto-settlement figures for FY 2024–25.**  
https://www.epfindia.gov.in/site_docs/PDFs/EPFO_PRESS_RELEASES/06022025_EPFOAchievesSettlingOver_5CroreClaims_FY%20202425.pdf

**[9] Public user report — multiple UAN/service-history issue.**  
https://www.reddit.com/r/epfoindia/comments/1u4fqay/issue_of_multiple_uan_and_new_company_tagged/

**[10] Public user report — extended EPS/transfer issue example.**  
https://www.reddit.com/r/epfoindia/comments/1pv6tf7/corrected_my_eps_issue_after_10_months_of/

**[11] Public user discussion — grievance escalation / EPFiGMS difficulty examples.**  
https://www.reddit.com/r/IndiaTax/comments/1j29hy6/issues_with_epf_grievance_portal_epf_feels_like/

**[12] Press Information Bureau / Government of India — EPFO simplification measures including incorrect Member ID handling.**  
https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=2136592

---

## One-line problem statement

**EPFO's digital experience fails users most when they need it most because complex cross-system dependencies are surfaced as user tasks, while diagnosis, ownership, progress and recovery remain insufficiently clear.**
