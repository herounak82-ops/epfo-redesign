# EPFO research notes

## Source-discovery findings

Search results identified these primary/official pages:

- EPFO Member Passbook: https://passbook.epfindia.gov.in/
- EPFO UAN Member Portal: https://unifiedportal-mem.epfindia.gov.in/memberinterface/
- EPFO employer/public portal: https://unifiedportal-emp.epfindia.gov.in/publicPortal/
- EPFO official FAQ mirror/domain: https://pmvbry.epfindia.gov.in/faq-epfo/
- EPFO EPF Scheme page: https://pmvbry.epfindia.gov.in/epf-scheme/
- EPFO EPS page: https://pmvbry.epfindia.gov.in/pension-scheme-eps/
- EPFO UMANG department page: https://web.umang.gov.in/landing/department/epfo.html
- EPFO establishment search: https://unifiedportal-emp.epfindia.gov.in/publicPortal/no-auth/misReport/home/loadEstSearchHome
- EPFO contact/grievance page: https://pmvbry.epfindia.gov.in/contact-us/

## Verified/observed snippets from source discovery

- EPFO’s official FAQ search result describes UAN as a 12-digit number allotted to each subscriber by linking it to the active PF account number from 31 July 2014.
- The official establishment-search result says establishments can be searched by part of establishment name and/or a 7-digit establishment code.
- The employer portal result says the revised ECR format is UAN-based without the erstwhile member ID.
- The official passbook result lists balance enquiry by missed call to 9966044425 and EPFO helpdesk/toll-free 1800118005.
- The official member portal result lists 14470 as the EPFO helpdesk and warns that EPFO does not request Aadhaar, PAN, or bank details over the phone or monetary deposits.
- The official UMANG result lists member services including checking PF balance, raising a claim, applying for a scheme certificate, applying for UAN, seeding UAN with Aadhaar, checking claim status, and searching establishments.
- Search results for the official EPF Scheme page state that UAN supports portability across jobs and that online services include balance checks, passbook download, and transfer between employers. These are treated as leads until cross-checked.
- Search results for the official EPS page state employer contribution of 8.33% of wages and Central Government contribution of 1.16%, subject to wage ceiling; this needs qualification and source-date checking before inclusion.
- Search results from PIB dated 15 Oct 2025 state that, under then-current policy, 75% of PF balance (including employee and employer contribution and interest) could be withdrawn immediately in unemployment cases. Because rules can change, the final package will label policy-sensitive rules as configurable and date-bound.

## Browser access issue

The browser returned CloudFront 403 pages for both the official FAQ and EPF Scheme pages on 27 Aug 2026. Continue with official search results, accessible official portals, statutory/legal text, PIB/Ministry releases, and authoritative secondary documentation; cite access limitations and avoid claiming undocumented internal database schemas.

## Important scope caveat

EPFO does not publicly publish a complete internal production database schema. The final deliverable must distinguish: (a) publicly observable identifiers and service fields; (b) a proposed application-facing canonical data model; and (c) synthetic records that are not valid EPFO credentials or official records.

## Current research direction

Next: retrieve accessible statutory scheme text, official portal pages, UMANG service descriptions, KYC/claim requirements, grievance/member profile correction details, and the current policy date for eligibility rules. Then define JSON Schemas and generate 20–30 synthetic citizens with masked/fictional identifiers, linked member employments, transactions, KYC states, claims, and intent→required information→action→result scenarios.

Saved after two browser operations per research protocol.
