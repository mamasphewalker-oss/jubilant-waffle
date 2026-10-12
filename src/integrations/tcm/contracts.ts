import { z } from "zod";

export const researchSourceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  repository: z.url(),
  revision: z.string().regex(/^[a-f0-9]{40}$/),
  checkedAt: z.iso.date(),
  decision: z.enum(["ADOPT", "EVALUATE", "REFERENCE ONLY", "REJECT"]),
  purpose: z.string().min(1),
  codeLicense: z.string().nullable(),
  dataLicense: z.string().nullable(),
  dataPermission: z.enum(["unverified", "restricted", "approved"]),
  integration: z.enum(["offline-adapter", "reference-only", "benchmark-only"]),
  rationale: z.string().min(1),
  evidenceUrls: z.array(z.url()).min(1),
});
export type ResearchSource = z.infer<typeof researchSourceSchema>;

export const knowledgeNodeSchema = z.object({
  id: z.string().min(1),
  kind: z.enum([
    "formula",
    "herb",
    "compound",
    "target",
    "pathway",
    "disease",
    "traditional-concept",
  ]),
  nameZh: z.string().min(1),
  nameEn: z.string().nullable(),
  externalIds: z.record(z.string(), z.string()),
});
const relation = z.object({
  id: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
  kind: z.enum([
    "formula-contains-herb",
    "herb-associated-compound",
    "compound-associated-target",
    "target-associated-pathway",
    "pathway-associated-disease",
    "traditional-role",
    "clinical-effect",
  ]),
  domain: z.enum(["traditional-theory", "modern-biomedical"]),
  basis: z.enum([
    "traditional-description",
    "database-association",
    "computational-prediction",
    "experimental-study",
    "clinical-study",
  ]),
  sourceRecordId: z.string().min(1),
  sourceUrl: z.url(),
  evidenceSourceIds: z.array(z.string().min(1)).min(1),
  status: z.enum(["needs-review", "reviewed"]),
  reviewerId: z.string().nullable(),
  reviewedAt: z.iso.date().nullable(),
});
export const knowledgeRelationSchema = relation.superRefine((r, ctx) => {
  if (
    (r.kind === "traditional-role" || r.basis === "traditional-description") &&
    r.domain !== "traditional-theory"
  ) {
    ctx.addIssue({
      code: "custom",
      message:
        "Traditional descriptions must remain in the traditional-theory domain",
    });
  }
  if (
    r.kind !== "traditional-role" &&
    r.basis !== "traditional-description" &&
    r.domain !== "modern-biomedical"
  ) {
    ctx.addIssue({
      code: "custom",
      message:
        "Biomedical associations must remain in the modern-biomedical domain",
    });
  }
  if (
    r.kind === "clinical-effect" &&
    (r.basis !== "clinical-study" || r.domain !== "modern-biomedical")
  ) {
    ctx.addIssue({
      code: "custom",
      message: "Database associations and predictions are not clinical effects",
    });
  }
  if (r.status === "reviewed" && (!r.reviewerId?.trim() || !r.reviewedAt)) {
    ctx.addIssue({
      code: "custom",
      message:
        "Reviewed relations require a named reviewer and valid review date",
    });
  }
});

export const knowledgeGraphSchema = z
  .object({
    schemaVersion: z.literal("1"),
    sourceId: z.string().min(1),
    datasetVersion: z.string().min(1),
    license: z.string().min(1),
    sourceUrl: z.url(),
    nodes: z.array(knowledgeNodeSchema),
    relations: z.array(knowledgeRelationSchema),
  })
  .superRefine((graph, ctx) => {
    const ids = new Set<string>();
    for (const node of graph.nodes) {
      if (ids.has(node.id))
        ctx.addIssue({
          code: "custom",
          message: `Duplicate node ID: ${node.id}`,
        });
      ids.add(node.id);
    }
    const relationIds = new Set<string>();
    for (const edge of graph.relations) {
      if (relationIds.has(edge.id))
        ctx.addIssue({
          code: "custom",
          message: `Duplicate relation ID: ${edge.id}`,
        });
      relationIds.add(edge.id);
      if (!ids.has(edge.from) || !ids.has(edge.to))
        ctx.addIssue({
          code: "custom",
          message: `Unresolved relation endpoints: ${edge.id}`,
        });
    }
  });
export type KnowledgeGraph = z.infer<typeof knowledgeGraphSchema>;

/** Future adapters normalize licensed exports offline. No browser scraping or LLM execution. */
export interface TcmExportAdapter {
  readonly sourceId: string;
  normalize(
    exportedRecords: unknown,
    signal: AbortSignal,
  ): Promise<KnowledgeGraph>;
}

/** Mechanical gate only; approved permissions must come from an independent data-rights review. */
export function validateLicensedGraph(
  source: ResearchSource,
  payload: unknown,
): KnowledgeGraph {
  const candidate = researchSourceSchema.parse(source);
  if (
    candidate.integration !== "offline-adapter" ||
    candidate.decision !== "ADOPT" ||
    candidate.dataPermission !== "approved" ||
    !candidate.dataLicense
  ) {
    throw new Error("This source is not approved for dataset import");
  }
  const graph = knowledgeGraphSchema.parse(payload);
  if (
    graph.sourceId !== candidate.id ||
    graph.license !== candidate.dataLicense
  )
    throw new Error(
      "Dataset source/license does not match the approved registry",
    );
  return graph;
}
