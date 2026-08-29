# Synthetic EPFO India member-service dataset

This package contains **24 fictional citizen records** and **8 fictional employers** designed for testing an EPFO-style member-service assistant or API adapter. It covers balances, passbooks, UAN recovery, KYC, claims, eligibility pre-checks, transfers, nominations, EPS service history, pension enquiries, grievances, profile correction, mobile changes, employer remittance gaps, and establishment search.

The records are **not official EPFO data**. All identifiers are masked or fabricated, all employers are marked synthetic, and no UAN password, OTP, full Aadhaar, full PAN, full bank account, or live credential is included.

## Quickstart

```bash
cd epfo_mock_package
python3 -c "from mock_epfo_api import getBalance; print(getBalance('CIT-001'))"
python3 -c "from mock_epfo_api import findUAN; print(findUAN('Sana Parveen', '1996-05-30', '6241'))"
python3 -c "from mock_epfo_api import trackClaim; print(trackClaim(claim_id_masked='CLM-26-000002'))"
python3 -c "from mock_epfo_api import getKYC; print(getKYC('CIT-005'))"
python3 -c "from mock_epfo_api import checkEligibility; print(checkEligibility('CIT-007', 'form_31_advance', 'housing', 50000))"
```

## Core shape

```json
{
  "synthetic_citizen_id": "CIT-001",
  "uan_masked": "1000XXXX5501",
  "uan_status": "active",
  "kyc": [
    {"type": "aadhaar", "status": "approved", "value_masked": "XXXX-XXXX-6001"},
    {"type": "pan", "status": "approved", "value_masked": "XXXXX21XX"},
    {"type": "bank", "status": "approved", "value_masked": "XXXXXX7001"}
  ],
  "employments": [
    {
      "member_id_masked": "DL/CPM/0012780/001/0100001",
      "date_of_joining": "2019-01-02",
      "date_of_exit": null,
      "employment_status": "current",
      "current_epf_balance": 59350,
      "ledger": []
    }
  ],
  "claims": [],
  "intent_journey": {
    "intent": "get_balance",
    "required_information": ["synthetic citizen ID or masked UAN"],
    "action": "Aggregate posted credits, transfers, debits, and interest.",
    "result": "Return current balance and contribution breakdown."
  }
}
```

## Included files

| File | Purpose |
| --- | --- |
| `epfo_mock_data.json` | Main nested dataset. |
| `mock_epfo_api.py` | Local read-only callable functions. |
| `function_examples.json` | Function-call examples. |
| `citizens_index.csv` | Citizen summary table. |
| `member_accounts.csv` | Employment/member-account table. |
| `kyc_status.csv` | KYC states. |
| `claims.csv` | Claim states and sample outcomes. |
| `intent_journeys.csv` | Intent → required information → action → result rows. |
| `EPFO_SCHEMA_AND_NOTES.md` | Research-backed data model, security guidance, citations, and limitations. |

## Function names

The module exposes `getBalance`, `getPassbook`, `trackClaim`, `checkEligibility`, `findUAN`, `getKYC`, `listMemberAccounts`, `getServiceHistory`, `getNomination`, `trackTransfer`, `trackGrievance`, `findEstablishment`, and `getPensionStatus`. These are deterministic local functions, not live EPFO APIs.

## Important production boundary

EPFO does not publish a complete internal production database schema or a stable public API contract for all member services. The data model therefore separates publicly observable concepts from proposed internal entities. For real deployment, use official EPFO documentation and current circulars to configure eligibility and claim rules; do not let this dataset make a legal, pension, tax, or financial decision.

See `EPFO_SCHEMA_AND_NOTES.md` for the source citations and field-by-field rationale.
