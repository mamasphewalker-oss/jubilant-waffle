# Third-party license register

This project has not adopted a project-wide license. Dependency licenses are tracked separately in [the existing dependency inventory](../docs/third-party-license-inventory.json) and [open-source stack decisions](../docs/open-source-stack.md). This file covers researched external resource candidates and never grants a license to their content.

| Resource | Verified license facts | Remaining gate |
|---|---|---|
| Z-Anatomy / Models-of-human-anatomy | Repository states CC BY-SA 4.0; README lists third-party models including CC BY-NC-SA 4.0 inner ear and CC BY-NC 4.0 kidney. | Exact mesh provenance/terms; share-alike and noncommercial compatibility per mesh. |
| BodyParts3D / Anatomography | DBCLS-associated source records CC BY-SA 2.1 Japan. | Exact dataset release and object-level rights; avoid assuming derivatives use identical terms. |
| HRA / HuBMAP | Portal states published HuBMAP data are CC BY 4.0; restricted access and external-data policy also apply. | Exact dataset/asset and access class, source lineage and attribution. |
| Open Anatomy Atlas | Upstream states application code MIT; atlas data are separately licensed, including noncommercial components. | No code or data reuse approved by this registry. |
| Open Anatomy Studio | Upstream states code MIT and 12 HRA models CC BY 4.0. | Verify its per-file asset manifest and data lineage before any use. |
| nqwrc/3d-anatomy | README reports a combined model distribution under CC BY-NC-SA 4.0 due to included NC assets. | Separate code and asset rights, exact revision and component-level terms. |
| Cornerstone3D | Repository states code MIT. | Recheck current package/version and separately license all DICOM/images. |
| OHIF/Viewers | Repository states code MIT. | Extensions, dependencies, deployment and image data each have separate obligations. |
| PhysioNet / MIT-BIH Arrhythmia Database v1.0.0 | Exact database page states ODC-By 1.0. | Attribute per ODC-By, record/version-level labels and medical review; dataset size makes it unsuitable for this infrastructure commit. |
| TCIA | Archive states most data are CC BY 3.0/4.0; some collections require restricted/custom agreement. | Verify collection-specific access, terms, privacy, citation and release. |
| SNOMED CT | License is territory/edition-specific; NLM notes free use in the US and other member territories. | Verify current territory, affiliate/license conditions and redistribution before importing any terminology. |
| Anatomy Atelier / BetterHeart | No authoritative license verified for code/assets. | Reference-only; no copying, downloading or importing. |
| CCKS / Yidu-S4K / MedCT / TCM-RobustSDT | No dataset-level reuse license or complete privacy clearance verified for this project. | No clinical record access/import; verify exact edition and all owner terms first. |

## Required license vocabulary

Record exact terms, not just an SPDX guess: MIT, Apache-2.0, GPL family, CC BY, CC BY-SA, CC BY-NC, CC BY-NC-SA, ODC-By, Public Domain, custom/restricted, or `unknown`. Keep `share_alike`, `noncommercial`, attribution and per-asset verification explicit. Use `pending_license_review` for an unresolved asset. A top-level repository license does not automatically cover bundled data or third-party content.

No external datasets, models, images or code from this table were downloaded or copied into the project.
