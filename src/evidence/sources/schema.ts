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
    reviewedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .nullable(),
    status: statusSchema,
    evidenceDomain: z.enum([
      "modern-biomedical",
      "traditional-theory",
      "educational-assumption",
    ]),
    accessedAt: z.string(),
    license: z.string().nullable(),
    reviewerId: z.string().nullable(),
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
