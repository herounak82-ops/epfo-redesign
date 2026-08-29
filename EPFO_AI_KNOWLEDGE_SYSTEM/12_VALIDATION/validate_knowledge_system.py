#!/usr/bin/env python3
from pathlib import Path
import json, re, xml.etree.ElementTree as ET
ROOT = Path(__file__).resolve().parents[1]
errors, checks = [], []
def ok(msg): checks.append(msg)
def fail(msg): errors.append(msg)
def req(rel):
    p = ROOT / rel
    if p.exists(): ok('exists ' + rel)
    else: fail('missing ' + rel)
    return p
required_dirs = ['00_START_HERE','01_CANONICAL','02_EPFO_PRODUCT','03_DESIGN_SYSTEM','04_UX4G','05_GIGW','06_EPFO_RESEARCH','07_MOCK_SERVICE','08_REFERENCE_WEB','09_INTERACTION','10_IMPLEMENTATION','11_RETRIEVAL','12_VALIDATION','90_RAW_SOURCE']
for d in required_dirs: req(d)
required_files = ['00_START_HERE/AI_CONTEXT.md','00_START_HERE/AI_INSTRUCTIONS.txt','00_START_HERE/CONTEXT_POLICY.xml','01_CANONICAL/ACTIVE_DECISIONS.xml','01_CANONICAL/ACTIVE_REQUIREMENTS.xml','01_CANONICAL/CURRENT_STATE.xml','02_EPFO_PRODUCT/JOURNEY_MODEL.xml','03_DESIGN_SYSTEM/COMPONENT_SYSTEM.xml','03_DESIGN_SYSTEM/STATE_SYSTEM.xml','05_GIGW/GIGW_RULE_REGISTRY.json','05_GIGW/GIGW_SOURCE_MAP.json','11_RETRIEVAL/RETRIEVAL_ROUTER.xml','11_RETRIEVAL/ROUTE_REGISTRY.json','11_RETRIEVAL/PACKAGE_MANIFEST.json','11_RETRIEVAL/SOURCE_REGISTER.json','11_RETRIEVAL/SOURCE_INVENTORY.json','11_RETRIEVAL/PROVENANCE_MAP.json']
for f in required_files: req(f)
for f in ROOT.rglob('*.xml'):
    try: ET.parse(f); ok('xml ' + str(f.relative_to(ROOT)))
    except Exception as e: fail('invalid xml ' + str(f.relative_to(ROOT)) + ': ' + str(e))
for f in ROOT.rglob('*.json'):
    try: json.loads(f.read_text()); ok('json ' + str(f.relative_to(ROOT)))
    except Exception as e: fail('invalid json ' + str(f.relative_to(ROOT)) + ': ' + str(e))
for f in [ROOT/'01_CANONICAL/ACTIVE_DECISIONS.xml', ROOT/'01_CANONICAL/ACTIVE_REQUIREMENTS.xml']:
    text = f.read_text(); ids = re.findall(r'\bid="([A-Z0-9_-]+)"', text)
    if len(ids) == len(set(ids)): ok('unique ids ' + str(f.relative_to(ROOT)))
    else: fail('duplicate ids ' + str(f.relative_to(ROOT)))
routes = json.loads((ROOT/'11_RETRIEVAL/ROUTE_REGISTRY.json').read_text())['routes']
for r in routes:
    if not r.get('mandatory_loads'): fail('route has no mandatory loads ' + r['task'])
    for p in r['mandatory_loads']:
        if p.startswith('90_RAW_SOURCE'): fail('raw mandatory route ' + r['task'] + ' ' + p)
        elif not (ROOT / p).exists(): fail('broken route target ' + r['task'] + ' ' + p)
    if any(p in r['mandatory_loads'] for p in r['blocked_paths']): fail('blocked mandatory route ' + r['task'])
ok('routes validated ' + str(len(routes)))
sources = json.loads((ROOT/'11_RETRIEVAL/SOURCE_REGISTER.json').read_text())['sources']; source_ids = {s['id'] for s in sources}
for x in json.loads((ROOT/'05_GIGW/GIGW_RULE_REGISTRY.json').read_text())['rules']:
    if x.get('source_id') not in source_ids: fail('unresolved GIGW source ' + x['id'])
    else: ok('GIGW source ' + x['id'])
man = json.loads((ROOT/'11_RETRIEVAL/PACKAGE_MANIFEST.json').read_text())['files']
for x in man:
    if not (ROOT / x['path']).exists(): fail('manifest path missing ' + x['path'])
ok('manifest paths validated ' + str(len(man)))
sims = json.loads((ROOT/'12_VALIDATION/retrieval_simulations.json').read_text())['simulations']
for s in sims:
    if not s['expected'] or not s['must_not_preload']: fail('incomplete simulation ' + s['id'])
    else: ok('simulation ' + s['id'])
result = {'status':'PASS' if not errors else 'FAIL','checked':checks,'errors':errors,'error_count':len(errors),'check_count':len(checks)}
(ROOT/'12_VALIDATION/VALIDATION_RESULTS.json').write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps(result, indent=2))
raise SystemExit(1 if errors else 0)
