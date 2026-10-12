# 中医开源候选源核验

核验日期：2026-10-12（Asia/Bangkok）。这六个源已纳入候选源登记；本次只添加原创登记、契约和研究记录，没有安装上游软件、运行上游脚本、下载数据集或复制源树。EVALUATE 是后续评估资格，REFERENCE ONLY 是链接和设计参考，均不表示已接通数据。

依据：官方 GitHub REST 的仓库、默认分支 commit、递归 tree、最新 release 列表，以及固定 SHA 的 README、许可和包清单。所有仓库当前均可读取且 archived=false。最后提交时间和 release 是维护信号，不是活跃维护承诺或医学验证。GitHub license=null 仅表示其自动识别无结果；应再读文件。对未找到许可的结论限定于所核验 tree 与说明文件。

| 仓库                                                                                                    | 决策           | 固定 SHA                                   | 默认分支最后提交（UTC） | 最新 GitHub release | 代码许可 / 数据许可                                                            |
| ------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------ | ----------------------- | ------------------- | ------------------------------------------------------------------------------ |
| [tigerneil/tcm-cli](https://github.com/tigerneil/tcm-cli)                                               | EVALUATE       | `f1a8725b2a2797dbdea094f413b63fd68d5c8396` | 2026-02-27T07:58:04Z    | v0.1.3              | MIT / 外部数据库分别核验；内置数据来源不完整                                   |
| [yasenstar/Chinese_Medicine](https://github.com/yasenstar/Chinese_Medicine)                             | REFERENCE ONLY | `a5290d2482f2504b0f4218c5ed36b559033f5012` | 2026-05-03T06:56:55Z    | cn-med-kg-v2        | GPL-3.0 / 不把仓库许可推定为所引用出版物与 NMPA 资料的再分发许可               |
| [fengxi177/Knowlegde_Graph_TCM](https://github.com/fengxi177/Knowlegde_Graph_TCM)                       | REFERENCE ONLY | `2ccba36d1cd79706ddd01fc887af2854ead120da` | 2022-06-22T01:38:05Z    | 无                  | 未发现明确代码或数据许可                                                       |
| [YuLab-SMU/TCMDATA](https://github.com/YuLab-SMU/TCMDATA)                                               | EVALUATE       | `11bdea1f5a87e175ff7edd89f47e780fa64a992b` | 2026-08-31T02:16:12Z    | 无                  | DESCRIPTION 声明 Artistic-2.0 / 各数据集独立；GutMGene 标为 CC BY-NC 4.0       |
| [AI-HPC-Research-Team/TCM_knowledge_graph](https://github.com/AI-HPC-Research-Team/TCM_knowledge_graph) | REFERENCE ONLY | `8a313feb85343a4cd5a71649a1aecb1d9d49d404` | 2023-12-01T02:08:50Z    | 无                  | 未发现明确代码许可 / 六种上游数据库分别核验                                    |
| [Wayyuanyuan/MTCMB](https://github.com/Wayyuanyuan/MTCMB)                                               | EVALUATE       | `faffd813c67fe012cef74277a23270d5dd6db9b8` | 2026-06-27T09:18:09Z    | 无                  | Apache-2.0 / Zenodo 存档 CC-BY-4.0；原始题库、教材、竞赛及病例权限仍需逐源审查 |

## tcm-cli：候选离线研究适配器

Python CLI/agent，不是浏览器 npm 库。[pyproject](https://github.com/tigerneil/tcm-cli/blob/f1a8725b2a2797dbdea094f413b63fd68d5c8396/pyproject.toml) 声明 0.1.4、Alpha、Python >=3.9；README 说 >=3.10，与清单有差异。最新 [release v0.1.3](https://github.com/tigerneil/tcm-cli/releases/tag/v0.1.3) 发布于 2026-02-27，不能把 HEAD 版本当已发布包。[LICENSE](https://github.com/tigerneil/tcm-cli/blob/f1a8725b2a2797dbdea094f413b63fd68d5c8396/LICENSE) 为 MIT。

[downloader](https://github.com/tigerneil/tcm-cli/blob/f1a8725b2a2797dbdea094f413b63fd68d5c8396/src/tcm/data/downloader.py) 的 TCMSP、TCMID、BATMAN-TCM、SymMap 均为手动获取模式；内置 herbs/formulas 来自内存字典。不能将 README 的数据库列表误记为全部已实现 API。[data_api](https://github.com/tigerneil/tcm-cli/blob/f1a8725b2a2797dbdea094f413b63fd68d5c8396/src/tcm/tools/data_api.py) 中 TCMSP search 返回信息链接，UniProt 等有 HTTP 实现。[herbs](https://github.com/tigerneil/tcm-cli/blob/f1a8725b2a2797dbdea094f413b63fd68d5c8396/src/tcm/tools/herbs.py) 内置知识含剂量与禁忌，缺少逐条原始证据引文。

后续可评估服务端或人工离线导出适配器，先核验工具真实性、记录证据和各数据库条款；不在浏览器保存 API key，不接入自主辨证、治疗计划或剂量输出。替代方案：按原始数据库单独写最小只读适配器。

## Chinese_Medicine：本体设计参考

[README](https://github.com/yasenstar/Chinese_Medicine/blob/a5290d2482f2504b0f4218c5ed36b559033f5012/README.md) 描述 Protege/RDF/OWL 本体，理论、方剂、药材、治法及 NMPA 资料；[cm_base](https://github.com/yasenstar/Chinese_Medicine/blob/a5290d2482f2504b0f4218c5ed36b559033f5012/cm_base/README.md) 说明《中医入门》来源。[cn-med-kg](https://github.com/yasenstar/Chinese_Medicine/blob/a5290d2482f2504b0f4218c5ed36b559033f5012/cn-med-kg/README.md) 有 Neo4j CSV 关系导入模型。[LICENSE](https://github.com/yasenstar/Chinese_Medicine/blob/a5290d2482f2504b0f4218c5ed36b559033f5012/LICENSE) 是 GPL-3.0；[release](https://github.com/yasenstar/Chinese_Medicine/releases/tag/cn-med-kg-v2) 发布于 2026-04-26。

项目尚未选择总体许可且当前不采纳 GPL 依赖，因此只保留链接、研究概念建模，不复制 OWL/CSV/脚本或下载图数据库 dump。NMPA 原始资料、书籍内容的权限和当代适用性另审。传统理论分类与现代生物机制分别建模。替代方案：原创关系契约和经明确授权、医学审查的教学数据。

## Knowlegde_Graph_TCM：旧 demo 参考

[README](https://github.com/fengxi177/Knowlegde_Graph_TCM/blob/2ccba36d1cd79706ddd01fc887af2854ead120da/README.md) 是中药与方剂两个 demo 子模块，明确提示数据质量与融合质量待改善。默认分支最后提交为 2022 年；[tree](https://api.github.com/repos/fengxi177/Knowlegde_Graph_TCM/git/trees/2ccba36d1cd79706ddd01fc887af2854ead120da?recursive=1) 未见明确许可，[release 列表](https://api.github.com/repos/fengxi177/Knowlegde_Graph_TCM/releases) 无发布。

可参考其关系类型的设计问题，不能复制代码、数据或图像。访问公开仓库不等于获准再分发。替代方案：原创方剂—药材关系模型，并保留传统理论域、原始来源和待审状态。

## TCMDATA：研究分析候选

[DESCRIPTION](https://github.com/YuLab-SMU/TCMDATA/blob/11bdea1f5a87e175ff7edd89f47e780fa64a992b/DESCRIPTION) 为 R 包 1.0.0，R >=4.5.0，Artistic-2.0。GitHub 自动许可结果为空并不意味着没有包许可声明。[README](https://github.com/YuLab-SMU/TCMDATA/blob/11bdea1f5a87e175ff7edd89f47e780fa64a992b/README.md) 提供靶点、PPI、富集及可视化能力，但安装示例指向 Hinna0818/TCMDATA，需确认分发源和固定版本；引用 DOI 仍 pending。不是 TypeScript/npm 即插即用依赖。

[R/data.R](https://github.com/YuLab-SMU/TCMDATA/blob/11bdea1f5a87e175ff7edd89f47e780fa64a992b/R/data.R) 列出 DoRothEA、GutMGene、GeneCards、GEO、Open Targets、STRING 等来源，GutMGene 显式声明 CC BY-NC 4.0；包许可不能覆盖所有聚合数据。必须对具体数据对象、商业使用与再分发条款逐项核验。

未来适合独立离线 R 分析后导出有来源的节点、关系和方法参数；此轮不安装、不导入 .rda。PPI、富集、网络中心性与 docking 只形成研究线索，不能提升为临床疗效。替代：直接使用经许可的原始数据库和自有分析流程。

## TCM_knowledge_graph：聚合流程参考

[README](https://github.com/AI-HPC-Research-Team/TCM_knowledge_graph/blob/8a313feb85343a4cd5a71649a1aecb1d9d49d404/README.md) 声称 20 类实体、46 类关系与 3,447,023 条记录；这些是作者报告，未运行或复核数据。六种来源是 CPMCP、TCMBANK、SymMap、TCMID、PharMeBINet、PrimeKG。公开内容侧重处理脚本并要求自行准备上游数据。方剂关系处理中使用 ChatGLM/规则抽取及剂量归一化。[tree](https://api.github.com/repos/AI-HPC-Research-Team/TCM_knowledge_graph/git/trees/8a313feb85343a4cd5a71649a1aecb1d9d49d404?recursive=1) 未发现明确许可；[releases](https://api.github.com/repos/AI-HPC-Research-Team/TCM_knowledge_graph/releases) 无发布，最后提交 2023 年。

仅参考多来源实体对齐、关系分层与抽取 provenance 需求；不复制脚本或合并数据。模型抽取不是医学验证，匹配不等于实体等价。替代：原创小型图契约和逐边证据审查。

## MTCMB：离线教学评测候选

[代码许可](https://github.com/Wayyuanyuan/MTCMB/blob/faffd813c67fe012cef74277a23270d5dd6db9b8/LICENSE.txt) 为 Apache-2.0。[README](https://github.com/Wayyuanyuan/MTCMB/blob/faffd813c67fe012cef74277a23270d5dd6db9b8/ReadMe.md) 与[数据记录](https://github.com/Wayyuanyuan/MTCMB/blob/faffd813c67fe012cef74277a23270d5dd6db9b8/dataset_info/%E6%95%B0%E6%8D%AE%E8%AE%B0%E5%BD%95.md) 声明 12 个子集、7,100 条样本，涵盖知识、文本、诊断、处方和安全。[Zenodo v2 存档](https://zenodo.org/records/20465629) 发布于 2026-05-31；[官方 API](https://zenodo.org/api/records/20465629) 实际确认 license.id=cc-by-4.0。GitHub HEAD 和 Zenodo 文件名及版本不同，不能混记；未来导入需固定具体存档文件和 checksum。

上游题库、教材、天池竞赛资料与临床病例的授权范围仍需逐源核验；仓库许可证、存档声明和来源注明不能独立证明所有原始材料权利已清理。专家审阅与合成步骤为作者报告。[安全子集说明](https://github.com/Wayyuanyuan/MTCMB/blob/faffd813c67fe012cef74277a23270d5dd6db9b8/dataset_info/TCM-SE-A.md) 依赖 2020 年药典及模型生成/评分，需当前安全审查。

后续仅评估隔离的离线教育 benchmark，答案与模型输入分开，检查污染和隐私，记录许可、来源、评测协议与医学审核。不将处方参考答案接入用户病例决策。替代：明确授权的原创合成安全教学题。

## 后续接入的共同门槛

记录 sourceId、repo SHA/存档版本、原始记录 ID、来源 URL、独立数据许可与许可证据、抽取方式、证据域、证据状态、医学审核者/日期。代码许可、数据许可、可导入资格和证据审核是独立字段。此轮所有上游 importEnabled=false，证据为 needs-review；技术占位图须使用 demo，不制造具体医学关系。

保留传统理论、现代生物医学研究与教学假设的区别。病症名称对齐不自动等价；成分—靶点关联不自动推出人体疗效；安全 benchmark 成绩不自动证明临床安全。未来任何接入先经过许可、隐私、真实性与医学审核，再由明确适配器转换；未知项拒绝导入，不退化为宽松默认值。
