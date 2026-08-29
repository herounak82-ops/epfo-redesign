import csv, json
from pathlib import Path

root = Path(__file__).parent
data = json.loads((root / 'epfo_mock_data.json').read_text())


def write_csv(name, rows, fields):
    with (root / name).open('w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)

citizen_rows = []
account_rows = []
kyc_rows = []
claim_rows = []
journey_rows = []
for c in data['citizens']:
    citizen_rows.append({
        'synthetic_citizen_id': c['synthetic_citizen_id'], 'full_name': c['full_name'], 'date_of_birth': c['date_of_birth'], 'gender': c['gender'], 'city': c['address']['city'], 'state': c['address']['state'], 'mobile_masked': c['contact']['mobile_masked'], 'uan_masked': c['uan_masked'], 'uan_status': c['uan_status'], 'nomination_status': c['nomination']['status'], 'pension_status': c['pension']['pension_status'], 'intent': c['intent_journey']['intent'], 'demo_outcome': c['intent_journey']['demo_outcome']
    })
    journey_rows.append({'synthetic_citizen_id': c['synthetic_citizen_id'], 'intent': c['intent_journey']['intent'], 'required_information': ' | '.join(c['intent_journey']['required_information']), 'action': c['intent_journey']['action'], 'result': c['intent_journey']['result'], 'demo_outcome': c['intent_journey']['demo_outcome']})
    for a in c['employments']:
        account_rows.append({'synthetic_citizen_id': c['synthetic_citizen_id'], 'uan_masked': c['uan_masked'], 'member_id_masked': a['member_id_masked'], 'establishment_name': a['establishment']['name'], 'establishment_code': a['establishment']['establishment_code'], 'pf_office': a['establishment']['pf_office'], 'date_of_joining': a['date_of_joining'], 'date_of_exit': a['date_of_exit'], 'employment_status': a['employment_status'], 'exit_reason': a['exit_reason'], 'basic_plus_da_monthly': a['basic_plus_da_monthly'], 'epf_wages_monthly': a['epf_wages_monthly'], 'eps_wages_monthly': a['eps_wages_monthly'], 'current_epf_balance': a['current_epf_balance'], 'eps_service_months': a['eps_service_months'], 'transfer_status': a['transfer_status']})
    for k in c['kyc']:
        kyc_rows.append({'synthetic_citizen_id': c['synthetic_citizen_id'], 'uan_masked': c['uan_masked'], 'type': k['type'], 'value_masked': k['value_masked'], 'status': k['status'], 'submitted_on': k['submitted_on'], 'approved_on': k['approved_on'], 'rejection_reason': k.get('rejection_reason')})
    for claim in c['claims']:
        claim_rows.append({'synthetic_citizen_id': c['synthetic_citizen_id'], 'uan_masked': c['uan_masked'], 'claim_id_masked': claim['claim_id_masked'], 'form_type': claim['form_type'], 'claim_reason': claim['claim_reason'], 'filed_on': claim['filed_on'], 'amount_requested': claim['amount_requested'], 'amount_approved': claim['amount_approved'], 'status': claim['status'], 'rejection_code': claim.get('rejection_code'), 'rejection_reason': claim.get('rejection_reason')})

write_csv('citizens_index.csv', citizen_rows, list(citizen_rows[0]))
write_csv('member_accounts.csv', account_rows, list(account_rows[0]))
write_csv('kyc_status.csv', kyc_rows, list(kyc_rows[0]))
write_csv('claims.csv', claim_rows, list(claim_rows[0]))
write_csv('intent_journeys.csv', journey_rows, list(journey_rows[0]))
print('CSV exports written')
