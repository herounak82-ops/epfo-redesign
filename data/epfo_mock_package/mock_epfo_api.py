"""Synthetic EPFO-style service functions.

This module is a local demo adapter over epfo_mock_data.json. It does not connect
 to EPFO and never accepts or returns live credentials.
"""
from __future__ import annotations
import json
from datetime import date
from pathlib import Path

DATA = json.loads((Path(__file__).parent / 'epfo_mock_data.json').read_text())
CITIZENS = {c['synthetic_citizen_id']: c for c in DATA['citizens']}
EMPLOYERS = DATA['employers']
POLICY = DATA['policy_config']['illustrative_checks']


def _citizen(citizen_id):
    if citizen_id not in CITIZENS:
        raise KeyError(f'Unknown synthetic citizen_id: {citizen_id}')
    return CITIZENS[citizen_id]


def _mask(s):
    if not s:
        return None
    return s


def getBalance(citizen_id: str, member_index: int | None = None) -> dict:
    c = _citizen(citizen_id)
    accounts = c['employments'] if member_index is None else [c['employments'][member_index]]
    result = []
    for account in accounts:
        employee = sum(x.get('employee_share', 0) for x in account['ledger'])
        employer = sum(x.get('employer_epf_share', 0) for x in account['ledger'])
        interest = sum(x.get('interest_credited', 0) for x in account['ledger'])
        result.append({'member_id_masked': account['member_id_masked'], 'total_epf_balance': account['current_epf_balance'], 'employee_share_posted': employee, 'employer_epf_share_posted': employer, 'interest_credited_in_sample': interest, 'eps_service_months': account['eps_service_months'], 'last_posted_wage_month': account['passbook_last_posted_wage_month']})
    return {'citizen_id': citizen_id, 'uan_masked': c['uan_masked'], 'accounts': result, 'data_freshness': 'synthetic_as_of_2026-08-27'}


def getPassbook(citizen_id: str, member_index: int = 0) -> dict:
    c = _citizen(citizen_id)
    account = c['employments'][member_index]
    return {'citizen_id': citizen_id, 'member_id_masked': account['member_id_masked'], 'entries': account['ledger'], 'notice': 'Synthetic passbook; posting/interest numbers are illustrative.'}


def trackClaim(citizen_id: str | None = None, claim_id_masked: str | None = None) -> dict:
    matches = []
    for c in CITIZENS.values():
        for claim in c['claims']:
            if (citizen_id and c['synthetic_citizen_id'] == citizen_id) or (claim_id_masked and claim['claim_id_masked'] == claim_id_masked):
                matches.append({'citizen_id': c['synthetic_citizen_id'], 'uan_masked': c['uan_masked'], **claim})
    return {'matches': matches, 'count': len(matches)}


def checkEligibility(citizen_id: str, claim_type: str, reason: str | None = None, requested_amount: int | None = None) -> dict:
    c = _citizen(citizen_id)
    account = c['employments'][0]
    blockers = []
    if c['uan_status'] != 'active':
        blockers.append('uan_not_activated')
    kyc_status = {k['type']: k['status'] for k in c['kyc']}
    if kyc_status.get('aadhaar') != 'approved':
        blockers.append('aadhaar_not_approved')
    if kyc_status.get('bank') != 'approved':
        blockers.append('bank_kyc_not_approved')
    if claim_type in {'form_19_final_settlement', 'form_19'}:
        if not account['date_of_exit']:
            blockers.append('date_of_exit_not_recorded')
        if account['date_of_exit'] and (date.fromisoformat('2026-08-27') - date.fromisoformat(account['date_of_exit'])).days < POLICY['epf_final_settlement_unemployment_days']:
            blockers.append('configured_unemployment_waiting_period_not_met')
        decision = 'eligible' if not blockers else 'not_ready'
    elif claim_type in {'form_31_advance', 'form_31'}:
        if not reason:
            blockers.append('claim_reason_required')
        if not requested_amount or requested_amount <= 0:
            blockers.append('positive_requested_amount_required')
        ceiling = account['current_epf_balance']
        decision = 'eligible_subject_to_reason_rule' if not blockers and requested_amount <= ceiling else 'not_ready'
    elif claim_type in {'form_10c', 'scheme_certificate'}:
        decision = 'scheme_certificate_or_withdrawal_benefit_review' if not blockers else 'not_ready'
        ceiling = None
    else:
        return {'citizen_id': citizen_id, 'decision': 'unsupported_claim_type', 'supported_claim_types': ['form_19_final_settlement', 'form_31_advance', 'form_10c', 'scheme_certificate']}
    return {'citizen_id': citizen_id, 'claim_type': claim_type, 'decision': decision, 'reason': reason, 'requested_amount': requested_amount, 'configured_balance_ceiling': locals().get('ceiling', account['current_epf_balance']), 'blockers': blockers, 'policy_config_id': DATA['policy_config']['policy_config_id'], 'disclaimer': 'Not an official EPFO eligibility decision.'}


def findUAN(full_name: str, date_of_birth: str, mobile_last4: str) -> dict:
    matches = [c for c in CITIZENS.values() if c['full_name'].casefold() == full_name.casefold() and c['date_of_birth'] == date_of_birth and c['contact']['mobile_masked'].endswith(mobile_last4)]
    return {'matches': [{'synthetic_citizen_id': c['synthetic_citizen_id'], 'uan_masked': c['uan_masked'], 'uan_status': c['uan_status'], 'linked_member_count': len(c['employments'])} for c in matches], 'match_count': len(matches), 'privacy_note': 'Production systems should require stronger authentication before disclosure.'}


def getKYC(citizen_id: str) -> dict:
    c = _citizen(citizen_id)
    return {'citizen_id': citizen_id, 'uan_masked': c['uan_masked'], 'items': c['kyc'], 'overall_state': 'approved' if all(x['status'] == 'approved' for x in c['kyc']) else 'action_required'}


def listMemberAccounts(citizen_id: str) -> dict:
    c = _citizen(citizen_id)
    return {'citizen_id': citizen_id, 'uan_masked': c['uan_masked'], 'member_accounts': [{'member_id_masked': a['member_id_masked'], 'establishment_name': a['establishment']['name'], 'date_of_joining': a['date_of_joining'], 'date_of_exit': a['date_of_exit'], 'transfer_status': a['transfer_status']} for a in c['employments']]}


def getServiceHistory(citizen_id: str) -> dict:
    c = _citizen(citizen_id)
    return {'citizen_id': citizen_id, 'uan_masked': c['uan_masked'], 'service_history': [{'member_id_masked': a['member_id_masked'], 'date_of_joining': a['date_of_joining'], 'date_of_exit': a['date_of_exit'], 'eps_service_months': a['eps_service_months'], 'establishment_name': a['establishment']['name']} for a in c['employments']]}


def getNomination(citizen_id: str) -> dict:
    c = _citizen(citizen_id)
    n = c['nomination']
    return {'citizen_id': citizen_id, 'uan_masked': c['uan_masked'], 'nomination': n, 'is_complete': n['status'] == 'filed' and n['allocation_sum_percent'] == 100}


def trackTransfer(citizen_id: str) -> dict:
    c = _citizen(citizen_id)
    return {'citizen_id': citizen_id, 'uan_masked': c['uan_masked'], 'transfer_status': [a['transfer_status'] for a in c['employments']], 'member_accounts': [a['member_id_masked'] for a in c['employments']]}


def trackGrievance(citizen_id: str) -> dict:
    c = _citizen(citizen_id)
    return {'citizen_id': citizen_id, 'grievances': c['grievances'], 'count': len(c['grievances'])}


def findEstablishment(name_fragment: str | None = None, establishment_code: str | None = None) -> dict:
    term = (name_fragment or '').casefold()
    matches = [e for e in EMPLOYERS if (establishment_code and e['establishment_code'] == establishment_code) or (term and term in e['name'].casefold())]
    return {'matches': matches, 'count': len(matches)}


def getPensionStatus(citizen_id: str) -> dict:
    c = _citizen(citizen_id)
    return {'citizen_id': citizen_id, 'pension': c['pension'], 'notice': 'Synthetic pension enquiry; not an official PPO or sanction record.'}
