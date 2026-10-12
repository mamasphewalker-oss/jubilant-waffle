export const caseStages = [
  "Patient",
  "History",
  "Vitals",
  "Physical examination",
  "Pathophysiology",
  "Tests",
  "Clinical reasoning",
  "Treatment",
  "Pharmacology",
  "Follow-up",
] as const;
export type CaseStage = (typeof caseStages)[number];
export function nextStage(current: CaseStage): CaseStage {
  return caseStages[
    Math.min(caseStages.indexOf(current) + 1, caseStages.length - 1)
  ];
}
export interface EducationalCaseSession {
  caseId: string;
  origin: "synthetic" | "de-identified";
  stage: CaseStage;
  revealedEvidenceIds: string[];
  redFlags: string[];
}
/** Modern red flags precede optional supplementary observations in every stage. */
export function prioritizedObservations(
  session: EducationalCaseSession,
  supplementary: string[],
) {
  return [
    ...session.redFlags.map((text) => ({ kind: "red-flag" as const, text })),
    ...supplementary.map((text) => ({ kind: "supplementary" as const, text })),
  ];
}
