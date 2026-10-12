import { tcmResearchSources } from "../../integrations/tcm/catalog";

export function TcmResearchSources() {
  return (
    <section className="panel" aria-labelledby="tcm-source-heading">
      <h2 id="tcm-source-heading">中医药开源研究来源</h2>
      <p>
        已登记六个研究入口。医学数据尚未导入，来源登记不代表疗效认可或医学审查。
      </p>
      {tcmResearchSources.map((source) => (
        <details key={source.id}>
          <summary>
            {source.name} ·{" "}
            {source.decision === "EVALUATE" ? "待评估" : "仅供参考"}
          </summary>
          <p>{source.purpose}</p>
          <p>
            代码许可：{source.codeLicense ?? "未发现明确许可"}
            。数据导入：未获批准。
          </p>
          <p>{source.rationale}</p>
          <a href={source.repository} target="_blank" rel="noopener noreferrer">
            查看 {source.name} 官方仓库
          </a>
          <p>
            核查日期：{source.checkedAt} · 固定版本：
            <code>{source.revision.slice(0, 7)}</code>
          </p>
        </details>
      ))}
    </section>
  );
}
