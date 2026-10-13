# Asset policy

This is the canonical policy for external visual assets. The existing [anatomy-model-policy.md](anatomy-model-policy.md) retains the model-specific technical gate; this file governs all imported media and directs agents to the registries.

## Usage classes

- `AUTO_USE`: source, license and intended use have been verified for the specific resource. AI may retrieve and use it only after adding the actual imported file to Asset Registry.
- `VERIFY_THEN_USE`: verify the exact source, asset-level license, permission scope, attribution and any share-alike/noncommercial terms before download or import.
- `REFERENCE_ONLY`: study public UI, architecture, algorithms or interaction. Do not copy protected content, assets or source code unless a separate license review approves that exact material.
- `MEDICAL_VERIFY_REQUIRED`: medical knowledge, guidelines, cases, labels, dosing, diagnostic criteria, scores, formulas and treatment material require original-source verification and qualified medical review before production use.

## Import gate

Only files actually present in the project belong in `sources/ASSET_REGISTRY.json`. Each record must contain the fields defined by `sources/schemas/asset-registry.schema.json`, including source URL, original asset ID, author, exact license and license URL, attribution, changes, offline/redistribution rights, and medical review state. Unknown permissions use `pending_license_review`; such files cannot be production assets. Keep original notices and record checksums for binary assets.

Code licenses never license models, images or clinical records by implication. A dataset repository may combine assets under different terms; record each component separately. Preserve attribution and share-alike obligations. Treat noncommercial terms as binding and do not assume they fit the project's eventual distribution model. Public availability is not permission.

Large models, whole-slide images, CT/MRI, ECG collections and case corpora stay outside this repository unless a future task approves a specific small, licensed sample. Never collect medical images from search-engine results. Do not store patient-identifying data or pediatric cases. Never convert case treatments into runtime rules.

The current Asset Registry is intentionally empty. See [registry overview](../sources/EXTERNAL_RESOURCES.md), [licenses](../sources/LICENSES.md) and [attributions](../sources/ATTRIBUTIONS.md).
