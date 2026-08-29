import json
from pathlib import Path

root = Path(__file__).parent
data = json.loads((root / 'epfo_mock_data.json').read_text())
assert data['dataset_type'] == 'synthetic_epfo_service_demo'
assert len(data['citizens']) == 24
assert len(data['employers']) == 8
assert len({c['synthetic_citizen_id'] for c in data['citizens']}) == 24
assert len({c['uan_masked'] for c in data['citizens']}) == 24
required = {'intent', 'required_information', 'action', 'result', 'demo_outcome'}
scenarios = set()
for c in data['citizens']:
    assert c['record_status'] == 'synthetic_demo_record'
    assert required.issubset(c['intent_journey'])
    scenarios.add(c['intent_journey']['intent'])
    assert c['contact']['email'].endswith('@example.test')
    assert 'password' not in json.dumps(c).lower()
    assert 'otp' not in json.dumps(c).lower() or c['intent_journey']['intent'] in {'get_profile_change_status'}
    for a in c['employments']:
        assert a['member_id_masked']
        assert a['establishment']['establishment_code'].isdigit()
        assert len(a['establishment']['establishment_code']) == 7
        assert a['date_of_joining']
        assert len(a['ledger']) >= 5
print(f'citizens={len(data["citizens"])} employers={len(data["employers"])} scenarios={len(scenarios)}')
print('scenario_intents=' + ','.join(sorted(scenarios)))
print('qa=passed')
