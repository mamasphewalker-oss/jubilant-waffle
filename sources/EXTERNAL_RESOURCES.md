# External resources

This is the human-readable index for [RESOURCE_REGISTRY.yaml](RESOURCE_REGISTRY.yaml), the primary discovery registry used by Codex/AI. Registry membership means discovery metadata only. It does not mean data were downloaded, a license permits import, or medical claims have been validated.

## Use classes

`AUTO_USE` = verified for the specific intended use; imported media still requires Asset Registry entry. `VERIFY_THEN_USE` = verify source/version and exact license before download or import. `REFERENCE_ONLY` = inspect implementation/interaction only; do not copy protected code, media or data. `MEDICAL_VERIFY_REQUIRED` = original source and qualified medical review are required before production.

## High-priority groups

- **Anatomy and web atlases:** Z-Anatomy, BodyParts3D/Anatomography, HRA/HuBMAP, Open Anatomy Atlas, Open Anatomy Studio and nqwrc/3d-anatomy. Preserve per-model provenance and separate code from data terms. Z-Anatomy contains NC components; do not infer one license for all meshes.
- **Guidelines, cases and terminology:** Chinese guideline publishers, CCKS medical NLP, Yidu-S4K, TCM-RobustSDT, MedCT and SNOMED CT. No clinical records, full guidelines or terminology packages are imported. Verify privacy, geography, version and reuse rights.
- **ECG, imaging and pathology:** PhysioNet and the MIT-BIH Arrhythmia Database are dataset/version-specific; TCIA access/license varies by collection. Cornerstone3D is software; OHIF is kept as a viewer reference. No DICOM or image data are present.
- **Interaction references:** Anatomy Atelier and BetterHeart are reference-only until exact source and asset licenses are confirmed. Neither is a medical authority.

## Import sequence

1. Identify exact record, revision and original owner; use authoritative source rather than a mirror.
2. Verify data/code/asset license, privacy/access conditions and attribution separately.
3. For clinical content, verify medical scope, population, currency and qualified reviewer.
4. For any media actually imported, record the file in [ASSET_REGISTRY.json](ASSET_REGISTRY.json) with checksum, changes and permitted use.
5. Add claims and their source IDs to the application schema; keep pending material out of production.

See [source registry](SOURCE_REGISTRY.json), [asset policy](../docs/ASSET_POLICY.md), [licenses](LICENSES.md), [attributions](ATTRIBUTIONS.md), and the [cardiovascular Golden Sample queue](GOLDEN_SAMPLE_CARDIOVASCULAR.md). The registry was checked on 2026-10-13; licensing and access conditions can change and must be rechecked for each import.
