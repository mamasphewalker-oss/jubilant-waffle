import { describe, it, expect } from "vitest";
import { tcmResearchSources } from "../../src/integrations/tcm/catalog";
import {
  knowledgeGraphSchema,
  knowledgeRelationSchema,
  validateLicensedGraph,
  type ResearchSource,
} from "../../src/integrations/tcm/contracts";

const edge = {
  id: "edge-1",
  from: "node-a",
  to: "node-b",
  kind: "compound-associated-target",
  domain: "modern-biomedical",
  basis: "computational-prediction",
  sourceRecordId: "synthetic-record",
  sourceUrl: "https://example.org/synthetic",
  evidenceSourceIds: ["synthetic-evidence"],
  status: "needs-review",
  reviewerId: null,
  reviewedAt: null,
};
const graph = {
  schemaVersion: "1",
  sourceId: "synthetic-source",
  datasetVersion: "test-only",
  license: "TEST-ONLY",
  sourceUrl: "https://example.org/synthetic",
  nodes: [
    {
      id: "node-a",
      kind: "compound",
      nameZh: "测试节点 A",
      nameEn: null,
      externalIds: {},
    },
    {
      id: "node-b",
      kind: "target",
      nameZh: "测试节点 B",
      nameEn: null,
      externalIds: {},
    },
  ],
  relations: [edge],
};
const candidate: ResearchSource = {
  id: "synthetic-source",
  name: "Synthetic test fixture",
  repository: "https://example.org/synthetic",
  revision: "a".repeat(40),
  checkedAt: "2026-10-12",
  decision: "EVALUATE",
  purpose: "unit-test-only",
  codeLicense: "MIT",
  dataLicense: null,
  dataPermission: "unverified",
  integration: "offline-adapter",
  rationale: "No real medical data",
  evidenceUrls: ["https://example.org/synthetic"],
};

describe("TCM export boundaries", () => {
  it("registers all six sources without enabling any real dataset import", () => {
    expect(tcmResearchSources).toHaveLength(6);
    expect(new Set(tcmResearchSources.map((s) => s.id)).size).toBe(6);
    for (const source of tcmResearchSources)
      expect(() => validateLicensedGraph(source, graph)).toThrow(
        "not approved",
      );
  });
  it("blocks unlicensed data even when the software has an MIT license", () => {
    expect(() => validateLicensedGraph(candidate, graph)).toThrow(
      "not approved",
    );
  });
  it("blocks reference and benchmark imports even with explicit data permission", () => {
    for (const integration of ["reference-only", "benchmark-only"] as const)
      expect(() =>
        validateLicensedGraph(
          {
            ...candidate,
            decision: "ADOPT",
            dataPermission: "approved",
            dataLicense: "TEST-ONLY",
            integration,
          },
          graph,
        ),
      ).toThrow("not approved");
  });
  it("validates a permitted synthetic normalized export and rejects source/license mismatch", () => {
    const approved = {
      ...candidate,
      decision: "ADOPT" as const,
      dataPermission: "approved" as const,
      dataLicense: "TEST-ONLY",
    };
    expect(validateLicensedGraph(approved, graph).nodes).toHaveLength(2);
    expect(() =>
      validateLicensedGraph(approved, { ...graph, license: "MIT" }),
    ).toThrow("does not match");
    expect(() =>
      validateLicensedGraph(approved, { ...graph, sourceId: "other" }),
    ).toThrow("does not match");
  });
  it("does not promote a computational association to clinical efficacy", () => {
    expect(
      knowledgeRelationSchema.safeParse({ ...edge, kind: "clinical-effect" })
        .success,
    ).toBe(false);
  });
  it("keeps traditional roles separate from modern biomedical evidence", () => {
    expect(
      knowledgeRelationSchema.safeParse({
        ...edge,
        kind: "traditional-role",
        basis: "traditional-description",
      }).success,
    ).toBe(false);
    expect(
      knowledgeRelationSchema.safeParse({
        ...edge,
        kind: "traditional-role",
        basis: "traditional-description",
        domain: "traditional-theory",
      }).success,
    ).toBe(true);
  });
  it("requires review identity/date before promotion", () => {
    expect(
      knowledgeRelationSchema.safeParse({ ...edge, status: "reviewed" })
        .success,
    ).toBe(false);
    expect(
      knowledgeRelationSchema.safeParse({
        ...edge,
        status: "reviewed",
        reviewerId: "test-reviewer",
        reviewedAt: "2026-02-30",
      }).success,
    ).toBe(false);
  });
  it("rejects unresolved or duplicate graph IDs", () => {
    expect(
      knowledgeGraphSchema.safeParse({ ...graph, nodes: [] }).success,
    ).toBe(false);
    expect(
      knowledgeGraphSchema.safeParse({
        ...graph,
        nodes: [graph.nodes[0], graph.nodes[0]],
      }).success,
    ).toBe(false);
    expect(
      knowledgeGraphSchema.safeParse({ ...graph, relations: [edge, edge] })
        .success,
    ).toBe(false);
  });
});
