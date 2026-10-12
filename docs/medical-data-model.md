# Medical data model

Runtime schemas and inferred TypeScript types live in src/types/medical.ts. Common metadata: id, nameZh, nameEn, optional latinName, description, source URL array, sourceOrganization (nullable), version, publicationYear (nullable), evidenceLevel, reviewedAt (nullable), status and evidenceSourceIds. Unknown metadata is null/empty, never invented.

AnatomicalStructure: parent/layer/scale/model reference. PhysiologicalProcess: structures and assumptions. PathologyState: normal/early/progression/complication. Disease: pathology and guideline references. DiagnosticTest: modality/limitations. DrugTarget: mechanism/structures. Drug: targets, indications, contraindications, adverse effects, interactions, special populations; no dose field. Formula: herbs/traditional roles, traditionalTheory, modernBiomedicalEvidence, safety/interactions; no automatic prescriptions. Guideline: scope/supersedes. ClinicalCase: synthetic/de-identified origin, stages/red flags/reviewer. EvidenceSource: URL, organization, version/year, level, review date/reviewer, domain, license, accessed date.

Review promotion requires nonempty source URLs, organization, publication year, evidence IDs, assessed evidence and review date. EvidenceSource additionally requires reviewer ID. Runtime validation checks structure, not truth: peer review must verify that citations support each claim and IDs resolve. Date regex currently enforces ISO shape only; future ingestion should validate calendar validity and chronology.

No anatomical facts are seeded. demo-sphere deliberately has no sources and is labeled technical geometry. A nullable provenance field does not grant permission to publish reviewed content.
