import type { MedicalObject } from "../../types/medical";
export function EvidenceCard({ object }: { object: MedicalObject }) {
  return (
    <section className="evidence-card" aria-label="来源与证据">
      <h2>来源与证据</h2>
      <dl>
        <dt>状态</dt>
        <dd className="gold">
          {object.status === "demo"
            ? "demo · 演示内容"
            : object.status === "needs-review"
              ? "needs-review · 待医学审核"
              : "reviewed · 已审查"}
        </dd>
        <dt>组织</dt>
        <dd>{object.sourceOrganization ?? "未提供"}</dd>
        <dt>版本</dt>
        <dd>{object.version}</dd>
        <dt>证据级别</dt>
        <dd>{object.evidenceLevel}</dd>
        <dt>审查日期</dt>
        <dd>{object.reviewedAt ?? "尚未审查"}</dd>
        <dt>审查人</dt>
        <dd>{object.reviewerId ?? "尚未指定"}</dd>
      </dl>
      {object.source.length ? (
        <ul>
          {object.source.map((source) => (
            <li key={source}>
              <a href={source} target="_blank" rel="noreferrer">
                原始来源
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>暂无医学来源；不可作为临床依据。</p>
      )}
    </section>
  );
}
