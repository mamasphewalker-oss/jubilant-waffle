import { describe, it, expect } from "vitest";
import { placeholder } from "../../src/medical/anatomy/demo";
import { medicalObjectSchema } from "../../src/types/medical";
import { evidenceSourceSchema } from "../../src/evidence/sources/schema";

const reviewed = {
  ...placeholder,
  source: ["https://example.org/synthetic"],
  sourceOrganization: "Test fixture only",
  publicationYear: 2026,
  evidenceSourceIds: ["synthetic-evidence"],
  evidenceLevel: "trial",
  status: "reviewed",
  reviewerId: "test-reviewer",
  reviewedAt: "2026-10-12",
};
describe("review provenance", () => {
  it("requires reviewer identity and nonblank evidence references", () => {
    expect(medicalObjectSchema.safeParse(reviewed).success).toBe(true);
    for (const reviewerId of [null, "", " "])
      expect(
        medicalObjectSchema.safeParse({ ...reviewed, reviewerId }).success,
      ).toBe(false);
    expect(
      medicalObjectSchema.safeParse({ ...reviewed, evidenceSourceIds: [" "] })
        .success,
    ).toBe(false);
    expect(
      medicalObjectSchema.safeParse({ ...reviewed, sourceOrganization: " " })
        .success,
    ).toBe(false);
  });
  it("rejects impossible calendar review and access dates", () => {
    expect(
      medicalObjectSchema.safeParse({ ...reviewed, reviewedAt: "2026-02-30" })
        .success,
    ).toBe(false);
    const evidence = {
      ...reviewed,
      source: "https://example.org/synthetic",
      evidenceDomain: "modern-biomedical",
      accessedAt: "2026-10-12",
      license: null,
    };
    expect(evidenceSourceSchema.safeParse(evidence).success).toBe(true);
    expect(
      evidenceSourceSchema.safeParse({ ...evidence, accessedAt: "2026-02-30" })
        .success,
    ).toBe(false);
    expect(
      evidenceSourceSchema.safeParse({ ...evidence, reviewerId: " " }).success,
    ).toBe(false);
  });
});
