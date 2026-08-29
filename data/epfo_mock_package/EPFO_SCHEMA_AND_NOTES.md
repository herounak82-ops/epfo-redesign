# EPFO India mock-data package

**Prepared by Manus AI · Research snapshot: 27 August 2026**

## Scope and realism boundary

This package models the public-facing concepts that an EPFO member-service application would commonly need: UAN discovery, linked member accounts, establishment references, employment spells, wage-month contribution ledgers, KYC states, nominations, claims, transfers, pension-related service history, grievances, and member-profile corrections. It is **not** an internal EPFO database dump. EPFO does not publish a complete production relational schema, retention schedule, API contract, or all validation rules. Accordingly, the package explicitly separates public facts from a proposed application-facing canonical model.

> **All records are fictional.** The UANs, member IDs, PAN fragments, Aadhaar fragments, bank references, PPO references, employers, claims, transactions, dates, names, and contact details are synthetic and invalid. Do not use them for identity verification, payments, or integration with EPFO.

EPFO’s public material supports the central relationship model: a person has one portable UAN, while employment with different establishments is represented through separate PF member accounts/member IDs. The official FAQ says that membership is reckoned separately for each establishment under different PF account numbers/member IDs, and it also describes online transfer from a previous establishment to a present establishment.[1] The official search result for the UAN FAQ describes UAN as a 12-digit identifier; the member portal exposes UAN activation, UAN recovery, KYC, claims, and other member services.[1] [2]

## Publicly grounded concepts

| Concept | What the public sources support | How this package models it |
| --- | --- | --- |
| UAN | A portable, 12-digit identifier associated with a member and linked to PF employment accounts.[1] [2] | `uan_masked`, `uan_status`, `uan_source`, and a one-to-many `employments` array. |
| Member ID / PF account | A job-specific account relationship; official FAQ says separate establishment membership uses different PF account numbers/member IDs.[1] | `member_id_masked`, parsed display components, establishment reference, dates of joining/exit, status, transfer state. |
| Establishment | Public establishment search accepts establishment name or a seven-digit establishment code.[4] | Synthetic establishment registry with code, name, sector, region, and PF office. |
| Passbook / ledger | EPFO provides member passbook access and public balance-enquiry channels; the FAQ says the passbook/annual statement shows amounts paid by the employer and monthly credit can be checked after UAN activation.[1] [3] | Wage-month rows with gross wages, EPF/EPS/EDLI wages, employee share, employer EPF share, EPS share, interest, source, and posting status. |
| ECR contribution submission | Public employer material refers to Electronic Challan-cum-Return and a UAN-based revised ECR.[4] | `source: synthetic ECR monthly posting`, plus a `posting_status` that can simulate a missing remittance or delayed ledger post. |
| KYC | The member portal and official claim guidance connect online claims with UAN activation and KYC; publicly visible member flows include Aadhaar, PAN, and bank-related statuses.[1] [2] | KYC items have type, masked value, verification source, submission/approval dates, status, and rejection reason category. |
| Claims | EPFO public material references Form 19, Form 10C, and Form 31. The FAQ says members can submit these claim types without employer attestation when the UAN and required KYC conditions are met.[1] | Claims have masked ID, form type, reason, filing date, amount requested/approved, status history, rejection code, and payment-reference suffix. |
| Grievances | EPFiGMS supports PF members, EPS pensioners, employers, and others; it supports OTP verification, UAN integration, multiple PF numbers, reminders, status, feedback, and document upload.[5] | Grievances include masked registration number, category, routed office, status, dates, reminder state, and document count. |
| Pension / EPS | Public EPFO material describes EPS service, pension status, scheme certificates, and a commonly cited illustrative formula. Eligibility and calculation rules are policy-sensitive and must be verified against current official rules.[1] [9] | `pension` stores service months, approximate service years, average salary field, PPO mask, status, and an explicit illustrative-only note. |
| Security notices | EPFO and EPFiGMS warn users not to disclose UAN, password, PAN, Aadhaar, bank, or OTP details to callers/messages.[2] [5] | The mock package only contains masks/last-four fragments and never stores passwords, OTPs, PINs, or full financial identifiers. |

## Proposed canonical application model

The model intentionally uses a normalized conceptual core rather than pretending to reproduce EPFO’s private tables. A production application should keep `CitizenProfile`, `UANAccount`, `MemberAccount`, `Establishment`, `ContributionLedgerEntry`, `KYCItem`, `Nomination`, `Claim`, `Transfer`, `PensionProfile`, `Grievance`, and `AuditEvent` as separate entities linked by stable internal keys. A read model can then compose them into the member dashboard.

| Entity | Recommended fields | Purpose |
| --- | --- | --- |
| `CitizenProfile` | internal citizen key, name, DOB, gender, father/spouse name, address, mobile/email references, consent/notice state | Personal profile needed to match and display a member record. Keep identity attributes separated from operational events. |
| `UANAccount` | internal UAN key, UAN token or encrypted value, display mask, activation state, mobile verification state, creation/source, last verified time | Portable identity layer across employments. |
| `MemberAccount` | internal member-account key, UAN key, member-ID token/mask, establishment key, region/office, extension/member-number display components, DOJ, DOE, exit reason, employment status, transfer state | Job-specific PF account relationship. |
| `Establishment` | establishment key, seven-digit display code, legal/display name, sector, address/state, PF office, exemption flag if applicable, active state | Employer/establishment directory and routing. |
| `ContributionLedgerEntry` | member-account key, wage month, transaction type, gross wage, EPF/EPS/EDLI wages, employee share, employer EPF share, EPS share, interest, arrear flag, ECR/remittance reference token, posting state, posted timestamp | Explainable balance and passbook. Never derive a balance from only a display total. |
| `KYCItem` | UAN key, type, encrypted/tokenized value, last-four display, verification source, status, submitted/approved timestamps, rejection category, approver class | Track Aadhaar/PAN/bank workflow without leaking raw values. |
| `Nomination` | UAN key, filed state, last updated, nominee count, allocation percentages, e-sign/authentication state, document/reference token | e-Nomination completion and beneficiary-readiness status. |
| `Claim` | claim key, UAN/member key, form type, reason, filed timestamp, requested/approved amount, current state, state history, rejection code/category, settlement/payment reference token | Claim tracking, explanations, and payment status. |
| `Transfer` | source and destination member keys, request key, initiated/approved/settled timestamps, amount transferred, source/destination offices, Annexure-K/reference state, mismatch flags | Preserve the lineage of an inter-employer transfer. |
| `PensionProfile` | UAN/PPO token, EPS service months, pensionable salary inputs, age gates, pension state, life-certificate state, disbursing-bank token | Pensioner and service-history enquiries. |
| `Grievance` | registration token, UAN/member/PPO key, category, routed office, state, timestamps, reminder/feedback state, document metadata | EPFiGMS-style case tracking. |
| `AuditEvent` | actor type, purpose, consent/notice version, entity/key accessed, fields returned, timestamp, correlation ID, outcome, retention class | Accountability and least-privilege access. This entity is not included in the citizen JSON but should exist in a production design. |

## Sensitive-data handling recommendations

The EPFO member-service use case involves highly sensitive identity and financial data. The service layer should keep raw Aadhaar, PAN, bank account, IFSC, UAN, PPO, and mobile values in a protected vault or encrypted store only where the lawful purpose requires them. The UI and ordinary logs should use a mask or last-four representation. UAN passwords, OTPs, ATM/PIN values, card credentials, and authentication secrets should never be persisted in the mock dataset or ordinary application logs.

The application should record a purpose code and actor type for every read, use role-based access control, encrypt data in transit and at rest, redact structured logs, enforce field-level authorization, retain only necessary document metadata, and separate demo data from any production tenant. The functions in `mock_epfo_api.py` return only synthetic records and masks; they do not implement real authentication and must not be presented as an official EPFO API.

## Service catalogue and callable contracts

The package includes the following local functions. Each function takes a synthetic citizen or masked reference and returns a read-only response. In a production adapter, every function should additionally receive an authenticated session context, purpose code, correlation ID, and consent/notice state.

| Function | Key input | Response focus |
| --- | --- | --- |
| `getBalance(citizen_id, member_index=None)` | Synthetic citizen key and optional linked account selector | Total EPF balance, employee share, employer EPF share, interest sample, EPS service, freshness. |
| `getPassbook(citizen_id, member_index=0)` | Synthetic citizen key | Detailed wage-month ledger and posting status. |
| `trackClaim(citizen_id=None, claim_id_masked=None)` | Citizen key or masked claim ID | Current claim state, history, form, amounts, rejection and payment fields. |
| `checkEligibility(citizen_id, claim_type, reason=None, requested_amount=None)` | Member context and claim details | Configurable pre-check, blockers, ceiling, and policy-config ID. It is not an official decision. |
| `findUAN(full_name, date_of_birth, mobile_last4)` | Stronger-than-name-only match inputs | Masked UAN, match count, status, linked-account count. Production use requires robust authentication and anti-enumeration controls. |
| `getKYC(citizen_id)` | Synthetic citizen key | KYC item states, masked values, approval/rejection metadata. |
| `listMemberAccounts(citizen_id)` | Synthetic citizen key | All linked member IDs, employers, DOJ/DOE, and transfer states. |
| `getServiceHistory(citizen_id)` | Synthetic citizen key | Chronological employment and EPS service history. |
| `getNomination(citizen_id)` | Synthetic citizen key | Filed state, nominee count, allocation total, completeness. |
| `trackTransfer(citizen_id)` | Synthetic citizen key | Transfer state and linked account references. |
| `trackGrievance(citizen_id)` | Synthetic citizen key | EPFiGMS-like status, routed office, age, reminder and document count. |
| `findEstablishment(name_fragment=None, establishment_code=None)` | Name fragment or seven-digit synthetic code | Establishment matches and routing details. |
| `getPensionStatus(citizen_id)` | Synthetic citizen key | PPO mask, payment state, service inputs, life-certificate flag. |

The corresponding scenarios follow the requested format:

```text
intent
→ required information
→ action
→ result
```

Every citizen in the JSON has an `intent_journey` object with those four fields plus a `demo_outcome`. The `intent_journeys.csv` export makes these flows easy to load into a test harness or conversation simulator.

## Policy-sensitive configuration

The `policy_config` object is deliberately versioned and date-stamped. It contains illustrative values such as a 12% EPF contribution assumption, an EPS contribution assumption, a 20-day service target, a 120-month EPS-service threshold, a 60-day final-settlement gate, and the commonly used pension-formula example. These values are **not hard-coded legal truth**. EPFO rules, form eligibility, waiting periods, contribution ceilings, and withdrawal policy can change through schemes, notifications, circulars, or portal changes. The application must replace them with a reviewed policy source before making any real eligibility or financial decision.

The old EPFO FAQ records a two-month waiting period after resignation for withdrawal and describes Forms 19, 10C, and 31; more recent government communications describe changes to withdrawal conditions. This is why the mock API returns `policy_config_id`, `blockers`, and a disclaimer instead of claiming that a synthetic decision is official.[1] [8]

## Included files

| File | Description |
| --- | --- |
| `epfo_mock_data.json` | Main package: 24 citizens, 8 synthetic establishments, linked employment accounts, ledgers, KYC, nominations, claims, pension, grievances, and intent journeys. |
| `function_examples.json` | Example function calls and expected response keys. |
| `mock_epfo_api.py` | Local read-only mock functions. |
| `citizens_index.csv` | One-row-per-citizen summary. |
| `member_accounts.csv` | One-row-per-linked-employment summary. |
| `kyc_status.csv` | KYC workflow summary. |
| `claims.csv` | Claim summary. |
| `intent_journeys.csv` | Intent → required information → action → result test cases. |
| `EPFO_SCHEMA_AND_NOTES.md` | This research and design guide. |

## References

[1]: https://www.epfindia.gov.in/site_en/FAQ.php "EPFO official FAQs"

[2]: https://unifiedportal-mem.epfindia.gov.in/memberinterface/ "EPFO Unified Member Portal"

[3]: https://passbook.epfindia.gov.in/ "EPFO Member Passbook"

[4]: https://unifiedportal-emp.epfindia.gov.in/publicPortal/ "EPFO employer/public portal and establishment search"

[5]: https://epfigms.gov.in/ "EPFiGMS grievance management system"

[6]: https://web.umang.gov.in/landing/department/epfo.html "UMANG department landing page"

[7]: https://pmvbry.epfindia.gov.in/contact-us/ "EPFO contact and grievance information"

[8]: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2179689 "PIB / Ministry of Labour communication on EPFO withdrawal rules, 15 October 2025"

[9]: https://www.epfindia.gov.in/site_en/Pension_Scheme.php "EPFO Employees’ Pension Scheme page"
