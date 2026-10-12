import { useState } from "react";
import { useLocation } from "react-router-dom";
import { EvidenceCard } from "../../components/evidence/EvidenceCard";
import { TcmResearchSources } from "../../components/evidence/TcmResearchSources";
import { placeholder } from "../../medical/anatomy/demo";
import {
  caseStages,
  nextStage,
  type CaseStage,
} from "../../clinical-cases/engine";
const modules: Record<
  string,
  { title: string; description: string; steps: string[] }
> = {
  "/pathology-pharmacology": {
    title: "病理与药理",
    description:
      "以状态变化解释病理，以靶点与机制连接药理。第一阶段仅展示架构。",
    steps: ["Normal", "Early Disease", "Progression", "Complication"],
  },
  "/diagnosis": {
    title: "中西医诊断教学",
    description: "现代医学评估优先，中医观察作为后续补充教学。",
    steps: [
      "Chief complaint",
      "History",
      "Vitals",
      "Physical examination",
      "Differential diagnosis",
      "Laboratory tests",
      "Imaging",
      "Final diagnosis",
    ],
  },
  "/treatment": {
    title: "治疗：西药与方剂",
    description:
      "指南、西药与中西医结合证据分别呈现。教学数据库不生成患者处方。",
    steps: ["Guideline", "Western Medicine", "Integrative Medicine"],
  },
  "/cases": {
    title: "病例推理框架",
    description:
      "仅支持 synthetic 或 de-identified educational cases。本页不含患者信息或医学病例事实。",
    steps: [...caseStages],
  },
};
export default function TeachingSkeleton() {
  const { pathname } = useLocation();
  const module = modules[pathname];
  return (
    <>
      <div className="page-heading">
        <h1>{module.title}</h1>
        <p>{module.description}</p>
      </div>
      <p className="notice gold">
        架构预览 · demo。资料待补充，医学内容尚未审查。
      </p>
      <section className="panel">
        <h2>教学流程</h2>
        <ol className="stage-list">
          {module.steps.map((step, i) => (
            <li key={step}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
        {pathname === "/pathology-pharmacology" && (
          <p>
            未来药理流程：Administration → Absorption → Circulation → Target →
            Mechanism → Effect → Adverse Effects。
          </p>
        )}
        {pathname === "/diagnosis" && (
          <>
            <p className="red">危险征象必须优先呈现；本页暂无已审查病例。</p>
            <p>
              补充观察标签：教学观察 · 证候倾向 · 可讨论关联 · 资料待补充 ·
              证据有限
            </p>
          </>
        )}
        {pathname === "/treatment" && (
          <p>
            Traditional theory 与 Modern biomedical evidence
            分栏标注；未来方剂关系图区分君、臣、佐、使，不将传统理论写成已证实的生物医学结论。
          </p>
        )}
        {pathname === "/cases" && <CasePreview />}
      </section>
      {pathname === "/treatment" && <TcmResearchSources />}
      <EvidenceCard
        object={{ ...placeholder, nameZh: module.title, nameEn: module.title }}
      />
    </>
  );
}
function CasePreview() {
  const [stage, setStage] = useState<CaseStage>("Patient");
  return (
    <div className="case-preview">
      <p aria-live="polite">
        引擎演示阶段：<strong>{stage}</strong>
      </p>
      <p>这里只推进教学步骤，不执行诊断或治疗。</p>
      <button
        className="button primary"
        disabled={stage === "Follow-up"}
        onClick={() => setStage(nextStage(stage))}
      >
        下一教学步骤
      </button>
      <button className="button" onClick={() => setStage("Patient")}>
        重置步骤
      </button>
    </div>
  );
}
