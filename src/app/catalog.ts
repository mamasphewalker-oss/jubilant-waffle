export type Language = "zh" | "en";
export type CatalogNode = {
  id: string;
  zh: string;
  en: string;
  kind:
    | "anatomy"
    | "physiology"
    | "disease"
    | "diagnosis"
    | "treatment"
    | "case"
    | "system";
  status: "prototype" | "pending";
  path?: string;
  keywords?: string[];
  children?: CatalogNode[];
};
// Navigation metadata only. These labels do not assert medical facts or review.
export const catalog: CatalogNode[] = [
  {
    id: "cardiovascular",
    zh: "循环系统",
    en: "Cardiovascular",
    kind: "system",
    status: "prototype",
    children: [
      {
        id: "anatomy",
        zh: "人体解剖",
        en: "Anatomy",
        kind: "anatomy",
        status: "prototype",
        path: "/anatomy",
        children: [
          {
            id: "heart",
            zh: "心脏图谱",
            en: "Heart atlas",
            kind: "anatomy",
            status: "pending",
            children: [
              {
                id: "coronary",
                zh: "冠状动脉",
                en: "Coronary arteries",
                kind: "anatomy",
                status: "pending",
                keywords: ["LM", "LAD", "LCX", "RCA"],
              },
              {
                id: "chambers",
                zh: "心腔与瓣膜",
                en: "Chambers & valves",
                kind: "anatomy",
                status: "pending",
              },
            ],
          },
        ],
      },
      {
        id: "physiology",
        zh: "生理教学模型",
        en: "Physiology model",
        kind: "physiology",
        status: "prototype",
        path: "/physiology",
      },
      {
        id: "ccs",
        zh: "慢性冠脉综合征 · CCS",
        en: "Chronic coronary syndrome · CCS",
        kind: "disease",
        status: "pending",
        keywords: ["慢性冠状动脉综合征"],
        children: [
          {
            id: "pathology",
            zh: "病理与药理",
            en: "Pathology & pharmacology",
            kind: "disease",
            status: "prototype",
            path: "/pathology-pharmacology",
          },
          {
            id: "diagnosis",
            zh: "诊断教学框架",
            en: "Diagnostic framework",
            kind: "diagnosis",
            status: "prototype",
            path: "/diagnosis",
            keywords: ["胸痛", "chest pain", "ECG", "心电图"],
          },
          {
            id: "treatment",
            zh: "治疗与安全框架",
            en: "Treatment & safety framework",
            kind: "treatment",
            status: "prototype",
            path: "/treatment",
          },
          {
            id: "cases",
            zh: "病例推理框架",
            en: "Case reasoning framework",
            kind: "case",
            status: "prototype",
            path: "/cases",
          },
        ],
      },
    ],
  },
];
export function flattenCatalog(nodes: CatalogNode[]): CatalogNode[] {
  return nodes.flatMap((node) => [
    node,
    ...flattenCatalog(node.children ?? []),
  ]);
}
export function searchCatalog(
  query: string,
  pathname: string,
  nodes = catalog,
): CatalogNode[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return flattenCatalog(nodes)
    .filter((node) =>
      terms.every((term) =>
        [node.zh, node.en, ...(node.keywords ?? [])]
          .join(" ")
          .toLocaleLowerCase()
          .includes(term),
      ),
    )
    .sort((a, b) => Number(b.path === pathname) - Number(a.path === pathname));
}
export const kindLabels = {
  anatomy: ["解剖", "Anatomy"],
  physiology: ["生理", "Physiology"],
  disease: ["疾病", "Disease"],
  diagnosis: ["诊断", "Diagnosis"],
  treatment: ["治疗", "Treatment"],
  case: ["病例", "Case"],
  system: ["系统", "System"],
} as const;
