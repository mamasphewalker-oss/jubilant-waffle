import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CoursePath } from "../../components/curriculum/CoursePath";
import { BodyAtlas } from "../../components/navigation/BodyAtlas";
import { usePreferences } from "../../store/preferences";
export default function Home() {
  const en = usePreferences((s) => s.language) === "en";
  return (
    <>
      <div className="atlas-intro">
        <p className="eyebrow">INTEGRATED CLINICAL LEARNING ATLAS</p>
        <h1>
          {en ? "Cardiovascular learning workspace" : "循环系统学习工作台"}
        </h1>
        <p>
          {en
            ? "Structure, function and clinical reasoning — with explicit evidence boundaries."
            : "从结构与功能出发，连接临床思维；让每一项内容的证据边界清晰可见。"}
        </p>
      </div>
      <BodyAtlas />
      <section className="focus-study" aria-labelledby="focus-title">
        <div>
          <p className="eyebrow">GOLDEN SAMPLE / 01</p>
          <h2 id="focus-title">
            {en ? "Chronic coronary syndrome" : "慢性冠脉综合征"}
            <span>CCS</span>
          </h2>
          <p>
            {en
              ? "A focused learning pathway under development. Anatomy assets and medical content require source, license and qualified review."
              : "围绕一个疾病打磨完整学习路径。真实解剖资产与医学内容正在等待逐项来源、许可和专业审核。"}
          </p>
          <Link className="button primary" to="/anatomy">
            {en ? "Open anatomy workspace" : "进入解剖工作台"}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <dl className="readiness">
          <div>
            <dt>{en ? "Interactive viewer" : "交互查看器"}</dt>
            <dd>{en ? "Technical prototype" : "技术原型可用"}</dd>
          </div>
          <div>
            <dt>{en ? "Anatomy assets" : "真实解剖资产"}</dt>
            <dd>{en ? "Awaiting verification" : "待核验与导入"}</dd>
          </div>
          <div>
            <dt>{en ? "Clinical content" : "临床医学内容"}</dt>
            <dd>{en ? "Pending medical review" : "待医学审核"}</dd>
          </div>
        </dl>
      </section>
      <section
        className="workspace-entry"
        aria-label={en ? "Learning modes" : "学习模式"}
      >
        <Link to="/anatomy">
          <span className="eyebrow">01 / {en ? "LEARNING" : "学习模式"}</span>
          <h2>
            {en ? "Structure → Function" : "结构 → 功能"}
            <ArrowUpRight size={20} />
          </h2>
          <p>
            {en
              ? "Explore the viewer and the existing physiology sandbox."
              : "使用查看器与现有生理教学模型，探索交互与参数变化。"}
          </p>
        </Link>
        <Link to="/cases">
          <span className="eyebrow">02 / {en ? "CLINICAL" : "临床模式"}</span>
          <h2>
            {en ? "Evidence → Reasoning" : "证据 → 推理"}
            <ArrowUpRight size={20} />
          </h2>
          <p>
            {en
              ? "Preview the reasoning framework. No approved CCS case is available."
              : "预览病例推理框架。当前尚无已审核的 CCS 病例。"}
          </p>
        </Link>
      </section>
      <details className="existing-course">
        <summary>
          {en
            ? "Existing course framework · Chinese content"
            : "展开现有课程框架"}
        </summary>
        {en && <p>English version not yet available.</p>}
        <CoursePath />
      </details>
      <p className="notice">
        {en
          ? "No approved whole-body or heart model is loaded. The viewer contains clearly labeled DEV_PLACEHOLDER geometry, not anatomy."
          : "全身与心脏专业模型尚未导入。查看器中的 DEV_PLACEHOLDER 为明确标记的技术几何体，不代表人体解剖。"}
      </p>
    </>
  );
}
