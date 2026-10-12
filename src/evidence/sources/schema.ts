import { z } from "zod";
import { evidenceLevelSchema, statusSchema } from "../../types/medical";
export const evidenceSourceSchema = z
  .object({
    id: z.string().min(1),
    nameZh: z.string().min(1),
    nameEn: z.string().min(1),
    description: z.string(),
    source: z.url(),
    sourceOrganization: z.string().min(1),
    version: z.string().min(1),
    publicationYear: z.number().int().nullable(),
    evidenceLevel: evidenceLevelSchema,
    reviewedAt: z.iso.date().nullable(),
    status: statusSchema,
    evidenceDomain: z.enum([
      "modern-biomedical",
      "traditional-theory",
      "educational-assumption",
    ]),
    accessedAt: z.iso.date(),
    license: z.string().nullable(),
    reviewerId: z.string().trim().min(1).nullable(),
  })
  .refine(
    (s) =>
      s.status !== "reviewed" ||
      (s.reviewedAt !== null &&
        s.reviewerId !== null &&
        s.publicationYear !== null &&
        s.evidenceLevel !== "not-assessed"),
    { message: "Reviewed evidence needs named review and assessed provenance" },
  );
export type EvidenceSource = z.infer<typeof evidenceSourceSchema>;
