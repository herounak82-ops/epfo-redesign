from pathlib import Path
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]

REQUIRED = [
    '.agents/skills/epfo-government-service/SKILL.md',
    'docs/EPFO_DESIGN_SYSTEM.md',
    'docs/tokens.json',
    'docs/EPFO_Hackathon_Project_Context.md',
    'docs/IMPLEMENTATION_PROMPT_01_FOUNDATION.md',
    'docs/IMPLEMENTATION_STATUS.md',
    'reference/EPFO_Bad_User_Journeys_Report.md',
    'reference/UX4G_Complete_Research_Dossier.txt',
    'reference/build_what_moves_india_complete_site_information.txt',
    'data/epfo_mock_package',
    'EPFO_AI_KNOWLEDGE_SYSTEM',
]

errors = []
for item in REQUIRED:
    if not (ROOT / item).exists():
        errors.append(f'missing required path: {item}')

# XML validity
for path in ROOT.rglob('*.xml'):
    try:
        ET.parse(path)
    except Exception as exc:
        errors.append(f'invalid XML: {path.relative_to(ROOT)}: {exc}')

# JSON validity (tsconfig files are JSONC/TypeScript config and intentionally excluded)
for path in ROOT.rglob('*.json'):
    if path.name in {'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json'}:
        continue
    try:
        json.loads(path.read_text())
    except Exception as exc:
        errors.append(f'invalid JSON: {path.relative_to(ROOT)}: {exc}')

router = ROOT / 'docs/MASTER_EXECUTION/TASK_ROUTER.xml'
if router.exists():
    text = router.read_text()
    refs = re.findall(r'<(?:mandatory|optional)>([^<]+)</(?:mandatory|optional)>', text)
    for ref in refs:
        if not (ROOT / ref).exists():
            errors.append(f'router target missing: {ref}')

# Canonical/master execution route consistency
for rel in [
    'EPFO_AI_KNOWLEDGE_SYSTEM/01_CANONICAL/CURRENT_STATE.xml',
    'EPFO_AI_KNOWLEDGE_SYSTEM/02_EPFO_PRODUCT/JOURNEY_MODEL.xml',
    'EPFO_AI_KNOWLEDGE_SYSTEM/02_EPFO_PRODUCT/SERVICE_MODEL.xml',
    'EPFO_AI_KNOWLEDGE_SYSTEM/10_IMPLEMENTATION/ROUTE_MAP.xml',
]:
    path = ROOT / rel
    if path.exists() and '/account-health' in path.read_text():
        errors.append(f'stale route reference in {rel}')

# Asset registry paths must resolve.
asset_path = ROOT / 'docs/MASTER_EXECUTION/ASSET_REGISTRY.json'
if asset_path.exists():
    assets = json.loads(asset_path.read_text())
    for key in ('existing_project_assets', 'starter_assets_to_review'):
        for item in assets.get(key, []):
            target = item.get('path')
            if target and not (ROOT / target).exists():
                errors.append(f'asset path missing: {target}')

# No nonexistent component registry token in the master spec.
spec = (ROOT / 'docs/MASTER_EXECUTION/MASTER_EXECUTION_SPEC.md').read_text()
if 'COMPONENT_REGISTRY' in spec:
    errors.append('nonexistent COMPONENT_REGISTRY reference remains in MASTER_EXECUTION_SPEC.md')

if errors:
    print('FAIL')
    for error in errors:
        print(error)
    raise SystemExit(1)

print('PASS')
print(f'validated_root={ROOT}')
print(f'xml_files={len(list(ROOT.rglob("*.xml")))}')
print(f'json_files={len([p for p in ROOT.rglob("*.json") if p.name not in {"tsconfig.json", "tsconfig.app.json", "tsconfig.node.json"}])}')
print('router_targets=valid')
print('route_refs=valid')
print('asset_paths=valid')
print('component_registry_reference=absent')
