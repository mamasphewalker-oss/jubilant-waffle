import { existsSync, readFileSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const errors = [];
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const requireFields = (record, fields, label) => {
  for (const field of fields) {
    if (!(field in record) || record[field] === undefined || record[field] === '') {
      errors.push(`${label}: missing required field ${field}`);
    }
  }
};
const requireHttpUrl = (value, label) => {
  if (value === null) return;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('unsupported protocol');
  } catch {
    errors.push(`${label}: expected an http(s) URL or null`);
  }
};
const unique = (records, key, label) => {
  const seen = new Set();
  for (const record of records) {
    if (seen.has(record[key])) errors.push(`${label}: duplicate ${key} ${record[key]}`);
    seen.add(record[key]);
  }
};

try {
  const resources = readJson('sources/RESOURCE_REGISTRY.yaml');
  requireFields(resources, ['schemaVersion', 'registryPurpose', 'resources'], 'RESOURCE_REGISTRY.yaml');
  if (resources.schemaVersion !== 1 || !Array.isArray(resources.resources)) {
    errors.push('RESOURCE_REGISTRY.yaml: schemaVersion must be 1 and resources must be an array');
  } else {
    unique(resources.resources, 'id', 'RESOURCE_REGISTRY.yaml');
    for (const resource of resources.resources) {
      const label = `resource ${resource.id ?? '<missing id>'}`;
      requireFields(resource, ['id', 'name', 'category', 'official_url', 'repository_url', 'source_type', 'purpose', 'priority', 'usage', 'ai_permissions', 'license', 'download_strategy', 'medical_role', 'notes', 'last_verified'], label);
      if (!/^[a-z0-9][a-z0-9-]*$/.test(resource.id ?? '')) errors.push(`${label}: id must be stable lowercase kebab-case`);
      if (!['AUTO_USE', 'VERIFY_THEN_USE', 'REFERENCE_ONLY', 'MEDICAL_VERIFY_REQUIRED'].includes(resource.usage)) errors.push(`${label}: invalid usage class`);
      for (const key of ['official_url', 'repository_url']) requireHttpUrl(resource[key], `${label}.${key}`);
      requireFields(resource.ai_permissions ?? {}, ['inspect', 'download', 'copy_code', 'import_assets', 'modify', 'redistribute'], `${label}.ai_permissions`);
      for (const key of ['inspect', 'download', 'copy_code', 'import_assets', 'modify', 'redistribute']) {
        if (typeof resource.ai_permissions?.[key] !== 'boolean') errors.push(`${label}.ai_permissions.${key}: must be boolean`);
      }
      requireFields(resource.license ?? {}, ['name', 'status', 'attribution_required', 'share_alike', 'noncommercial', 'verify_per_asset'], `${label}.license`);
      if (!['verified', 'pending_verification', 'pending_license_review', 'unknown', 'restricted', 'rejected'].includes(resource.license?.status)) errors.push(`${label}.license.status: invalid value`);
      if (resource.license?.status === 'pending_verification' || resource.license?.status === 'pending_license_review') {
        for (const key of ['attribution_required', 'share_alike', 'noncommercial']) {
          if (resource.license[key] !== 'pending_verification') errors.push(`${label}.license.${key}: unresolved license facts must remain pending_verification`);
        }
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(resource.last_verified ?? '')) errors.push(`${label}.last_verified: expected YYYY-MM-DD`);
    }
  }

  const assets = readJson('sources/ASSET_REGISTRY.json');
  requireFields(assets, ['schemaVersion', 'assets'], 'ASSET_REGISTRY.json');
  if (assets.schemaVersion !== 1 || !Array.isArray(assets.assets)) errors.push('ASSET_REGISTRY.json: invalid root schema');
  else {
    unique(assets.assets, 'assetId', 'ASSET_REGISTRY.json');
    for (const asset of assets.assets) {
      const label = `asset ${asset.assetId ?? '<missing assetId>'}`;
      requireFields(asset, ['assetId', 'type', 'localPath', 'title', 'sourceName', 'sourceUrl', 'originalAssetId', 'author', 'license', 'licenseUrl', 'attribution', 'modified', 'modificationDescription', 'allowedOffline', 'allowedRedistribution', 'medicalReviewed', 'reviewedAt', 'importedAt'], label);
      requireHttpUrl(asset.sourceUrl, `${label}.sourceUrl`);
      requireHttpUrl(asset.licenseUrl, `${label}.licenseUrl`);
      const localPath = String(asset.localPath ?? '').replaceAll('\\', '/');
      const absoluteAssetPath = resolve(root, localPath);
      const relativeAssetPath = relative(root, absoluteAssetPath);
      if (!localPath || isAbsolute(localPath) || relativeAssetPath.startsWith('..') || !existsSync(absoluteAssetPath)) errors.push(`${label}.localPath: must resolve to an existing file inside this repository`);
      if (asset.licenseStatus !== 'verified') errors.push(`${label}: imported assets require licenseStatus=verified`);
      if (asset.verificationStatus === 'pendingVerification') errors.push(`${label}: pending assets cannot be registered as imported project assets`);
      if (asset.allowedOffline !== true || typeof asset.allowedRedistribution !== 'boolean' || typeof asset.medicalReviewed !== 'boolean') errors.push(`${label}: offline, redistribution and medical review permissions must be explicit booleans`);
      if (asset.modified === true && !asset.modificationDescription?.trim()) errors.push(`${label}: modifications need a description`);
    }
  }

  const sources = readJson('sources/SOURCE_REGISTRY.json');
  requireFields(sources, ['schemaVersion', 'sources'], 'SOURCE_REGISTRY.json');
  if (sources.schemaVersion !== 1 || !Array.isArray(sources.sources)) errors.push('SOURCE_REGISTRY.json: invalid root schema');
  else {
    unique(sources.sources, 'sourceId', 'SOURCE_REGISTRY.json');
    for (const source of sources.sources) {
      const label = `source ${source.sourceId ?? '<missing sourceId>'}`;
      requireFields(source, ['sourceId', 'type', 'title', 'organization', 'officialUrl', 'publication', 'doi', 'year', 'version', 'population', 'scope', 'recommendationSystem', 'licenseStatus', 'reviewedAt', 'status', 'supersedes', 'supersededBy', 'verificationStatus', 'usage'], label);
      requireHttpUrl(source.officialUrl, `${label}.officialUrl`);
      if (!['guideline', 'textbook', 'drug_label', 'pharmacopoeia', 'consensus', 'clinical_manual', 'paper', 'terminology_source', 'case_source'].includes(source.type)) errors.push(`${label}: invalid source type`);
      if (!['verified', 'pendingVerification', 'superseded', 'archived'].includes(source.status)) errors.push(`${label}: invalid status`);
      if (source.status === 'verified' && (source.verificationStatus !== 'verified' || !source.reviewedAt || !source.year || !source.version)) errors.push(`${label}: verified sources require verification status, review date, year and version`);
      if (source.licenseStatus !== 'verified' && source.status === 'verified') errors.push(`${label}: source cannot be verified while its license is unresolved`);
    }
  }

  for (const doc of ['docs/PROJECT_SPEC.md', 'docs/MEDICAL_RULES.md', 'docs/DATA_SCHEMA.md', 'docs/ASSET_POLICY.md', 'sources/EXTERNAL_RESOURCES.md', 'sources/LICENSES.md', 'sources/ATTRIBUTIONS.md', 'sources/GOLDEN_SAMPLE_CARDIOVASCULAR.md']) {
    if (!existsSync(resolve(root, doc))) errors.push(`required documentation file is missing: ${doc}`);
  }
  for (const doc of ['README.md', 'docs/PROJECT_SPEC.md', 'docs/MEDICAL_RULES.md', 'docs/DATA_SCHEMA.md', 'docs/ASSET_POLICY.md', 'sources/EXTERNAL_RESOURCES.md', 'sources/LICENSES.md', 'sources/ATTRIBUTIONS.md', 'sources/GOLDEN_SAMPLE_CARDIOVASCULAR.md']) {
    if (!existsSync(resolve(root, doc))) continue;
    const contents = readFileSync(resolve(root, doc), 'utf8');
    for (const [, target] of contents.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const cleanTarget = target.split('#')[0];
      if (!cleanTarget || /^[a-z][a-z\d+.-]*:/i.test(cleanTarget) || cleanTarget.startsWith('/')) continue;
      const linkedPath = resolve(root, doc, '..', decodeURIComponent(cleanTarget));
      const relativePath = relative(root, linkedPath);
      if (relativePath.startsWith('..') || !existsSync(linkedPath)) errors.push(`${doc}: broken or out-of-repository relative link ${cleanTarget}`);
    }
  }
  for (const schemaPath of ['sources/schemas/resource-registry.schema.json', 'sources/schemas/asset-registry.schema.json', 'sources/schemas/source-registry.schema.json']) readJson(schemaPath);
} catch (error) {
  errors.push(error instanceof Error ? error.message : String(error));
}

if (errors.length) {
  console.error(`Registry validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('External resource, asset, medical source and linked policy registries are valid.');
}
