import { z } from "zod";
export const statusSchema = z.enum(["demo", "needs-review", "reviewed"]);
export const evidenceLevelSchema = z.enum([
  "not-assessed",
  "limited",
  "observational",
  "trial",
  "systematic-review",
  "guideline",
]);
const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use ISO calendar date");
const provenance = z.object({
  id: z.string().min(1),
  nameZh: z.string().min(1),
  nameEn: z.string().min(1),
  latinName: z.string().optional(),
  description: z.string().min(1),
  source: z.array(z.url()),
  sourceOrganization: z.string().nullable(),
  version: z.string().min(1),
  publicationYear: z.number().int().min(1800).max(2200).nullable(),
  evidenceLevel: evidenceLevelSchema,
  reviewedAt: dateSchema.nullable(),
  status: statusSchema,
  evidenceSourceIds: z.array(z.string()),
});
function reviewedProvenance(value: z.infer<typeof provenance>) {
  return (
    value.status !== "reviewed" ||
    (value.source.length > 0 &&
      Boolean(value.sourceOrganization) &&
      value.reviewedAt !== null &&
      value.publicationYear !== null &&
      value.evidenceSourceIds.length > 0 &&
      value.evidenceLevel !== "not-assessed")
  );
}
const metadata = {
  message:
    "Reviewed content requires traceable sources, organization, evidence, publication year and review date",
};
export const medicalObjectSchema = provenance.refine(
  reviewedProvenance,
  metadata,
);
export const anatomicalStructureSchema = provenance
  .extend({
    kind: z.literal("anatomy"),
    parentId: z.string().nullable(),
    layer: z.string(),
    scale: z.enum(["body", "system", "organ", "tissue", "cell", "receptor"]),
    modelId: z.string().nullable(),
  })
  .refine(reviewedProvenance, metadata);
export const physiologicalProcessSchema = provenance
  .extend({
    kind: z.literal("physiology"),
    structureIds: z.array(z.string()),
    assumptions: z.array(z.string()),
  })
  .refine(reviewedProvenance, metadata);
export const pathologyStateSchema = provenance
  .extend({
    kind: z.literal("pathology"),
    stage: z.enum(["normal", "early", "progression", "complication"]),
    structureIds: z.array(z.string()),
  })
  .refine(reviewedProvenance, metadata);
export const diseaseSchema = provenance
  .extend({
    kind: z.literal("disease"),
    pathologyIds: z.array(z.string()),
    guidelineIds: z.array(z.string()),
  })
  .refine(reviewedProvenance, metadata);
export const diagnosticTestSchema = provenance
  .extend({
    kind: z.literal("diagnostic-test"),
    modality: z.string(),
    limitations: z.array(z.string()),
  })
  .refine(reviewedProvenance, metadata);
export const drugTargetSchema = provenance
  .extend({
    kind: z.literal("drug-target"),
    structureIds: z.array(z.string()),
    mechanism: z.string(),
  })
  .refine(reviewedProvenance, metadata);
export const drugSchema = provenance
  .extend({
    kind: z.literal("drug"),
    targetIds: z.array(z.string()),
    indications: z.array(z.string()),
    contraindications: z.array(z.string()),
    adverseEffects: z.array(z.string()),
    interactions: z.array(z.string()),
    specialPopulations: z.array(z.string()),
  })
  .refine(reviewedProvenance, metadata);
export const formulaSchema = provenance
  .extend({
    kind: z.literal("formula"),
    traditionalTheory: z.string(),
    modernBiomedicalEvidence: z.string(),
    herbs: z.array(
      z.object({
        id: z.string(),
        traditionalRole: z.enum(["jun", "chen", "zuo", "shi"]),
      }),
    ),
    safety: z.array(z.string()),
    drugHerbInteractions: z.array(z.string()),
  })
  .refine(reviewedProvenance, metadata);
export const guidelineSchema = provenance
  .extend({
    kind: z.literal("guideline"),
    recommendationScope: z.string(),
    supersedes: z.string().nullable(),
  })
  .refine(reviewedProvenance, metadata);
export const clinicalCaseSchema = provenance
  .extend({
    kind: z.literal("clinical-case"),
    origin: z.enum(["synthetic", "de-identified"]),
    stages: z.array(z.string()),
    redFlags: z.array(z.string()),
    reviewerId: z.string().nullable(),
  })
  .refine(reviewedProvenance, metadata);
export type MedicalObject = z.infer<typeof medicalObjectSchema>;
export type AnatomicalStructure = z.infer<typeof anatomicalStructureSchema>;
export type PhysiologicalProcess = z.infer<typeof physiologicalProcessSchema>;
export type PathologyState = z.infer<typeof pathologyStateSchema>;
export type Disease = z.infer<typeof diseaseSchema>;
export type DiagnosticTest = z.infer<typeof diagnosticTestSchema>;
export type Drug = z.infer<typeof drugSchema>;
export type DrugTarget = z.infer<typeof drugTargetSchema>;
export type Formula = z.infer<typeof formulaSchema>;
export type Guideline = z.infer<typeof guidelineSchema>;
export type ClinicalCase = z.infer<typeof clinicalCaseSchema>;
