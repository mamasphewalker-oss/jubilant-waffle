import { anatomicalStructureSchema } from "../../types/medical";
/** Deliberately no medical source claim: procedural geometry is not anatomy. */
export const placeholder = anatomicalStructureSchema.parse({
  id: "demo-sphere",
  nameZh: "技术占位球体",
  nameEn: "Technical placeholder sphere",
  description: "用于验证交互，不代表人体解剖结构。",
  source: [],
  sourceOrganization: null,
  version: "0.1.0",
  publicationYear: null,
  evidenceLevel: "not-assessed",
  reviewedAt: null,
  status: "demo",
  evidenceSourceIds: [],
  kind: "anatomy",
  parentId: null,
  layer: "placeholder",
  scale: "organ",
  modelId: null,
});
