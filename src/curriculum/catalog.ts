import { z } from "zod";
import { courseStageSchema, type Audience } from "./schema";

export const audienceLabels: Record<Audience, string> = {
  student: "医学生",
  resident: "住院医师",
  teacher: "临床教师",
  integrative: "中西医结合学习者",
};

// Original curriculum design; objectives are not sourced clinical conclusions.
export const curriculum = z.array(courseStageSchema).parse([
  {
    id: "normal-function",
    title: "人体正常功能",
    readiness: "demo",
    objectives: [
      "连接结构、功能与可观察变量",
      "说明教学模型的单位、假设和适用边界",
    ],
    activities: {
      student: "在心血管教学模型中改变参数，解释图表变化。",
      resident: "区分教学参数与真实患者测量，指出模型遗漏的因素。",
      teacher: "组织结构—功能讨论，并请学习者明确模型假设。",
      integrative: "先用现代解剖与生理框架描述正常功能，再识别补充理论的边界。",
    },
    discussion: "技术占位几何体与经审核的人体模型，需要哪些不同的来源与审查？",
    selfCheck: "我能指出模型中的变量、单位与至少一项限制吗？",
    resources: [
      { label: "解剖交互实验室", path: "/anatomy" },
      { label: "生理教学模型", path: "/physiology" },
    ],
  },
  {
    id: "mechanism",
    title: "疾病机制与药物作用",
    readiness: "skeleton",
    objectives: [
      "建立正常状态—病理变化—疾病—药物靶点的学习框架",
      "区分研究关联、机制假说与临床效果",
    ],
    activities: {
      student: "按结构、状态变化、靶点和证据整理机制图的待填字段。",
      resident: "为机制解释列出验证所需的实验与临床证据类型。",
      teacher: "用证据分类讨论检验学习者是否把关联误当因果。",
      integrative: "分别记录传统理论关系与现代成分—靶点研究关系。",
    },
    discussion: "数据库关联或计算预测为什么仍需要独立证据与审查？",
    selfCheck: "我能明确标出哪些是预测、哪些需要人体研究验证吗？",
    resources: [{ label: "病理与药理框架", path: "/pathology-pharmacology" }],
  },
  {
    id: "diagnosis",
    title: "临床诊断",
    readiness: "skeleton",
    objectives: [
      "按现代医学评估顺序组织信息与待验证问题",
      "把危险征象、鉴别思路与检查局限纳入讨论",
    ],
    activities: {
      student: "说明问诊、查体与检查在教学流程中的位置。",
      resident: "列出教学情境中缺失的信息及下一步需核实的问题。",
      teacher: "引导学习者解释每项信息如何改变推理，而不是猜答案。",
      integrative: "先完成现代医学评估框架，再单独讨论补充观察的证据状态。",
    },
    discussion: "信息不完整时，如何记录不确定性并避免过早下结论？",
    selfCheck: "我能区分观察、推断和仍待核实的问题吗？",
    resources: [{ label: "诊断教学框架", path: "/diagnosis" }],
  },
  {
    id: "treatment",
    title: "规范治疗",
    readiness: "skeleton",
    objectives: [
      "整理指南来源、适用人群、版本与推荐条件",
      "把安全性、相互作用和随访作为教学内容",
    ],
    activities: {
      student: "检查治疗教学卡应包含的证据、安全性和版本字段。",
      resident: "说明指南适用范围与需要个别判断的信息缺口。",
      teacher: "组织指南批判性阅读，并标明推荐强度的原始分级体系。",
      integrative:
        "分开呈现现代治疗证据、传统教材来源与药物—中药相互作用信息。",
    },
    discussion: "缺失安全性或相互作用资料时，教学页面应该如何表达？",
    selfCheck: "我能确认来源版本，并把未知安全信息标为未核实吗？",
    resources: [{ label: "治疗与研究来源", path: "/treatment" }],
  },
  {
    id: "reasoning",
    title: "患者病例推理",
    readiness: "skeleton",
    objectives: [
      "用合成教学情境连接前四阶段并解释推理过程",
      "记录支持证据、反对证据、信息缺口与反思",
    ],
    activities: {
      student: "练习分阶段提出问题，并记录自己的推理依据。",
      resident: "说明教学推理中的不确定性、危险征象优先级与信息缺口。",
      teacher: "按信息整合、证据追踪、安全意识和反思组织反馈。",
      integrative: "完成现代医学推理后，再讨论补充理论及其证据局限。",
    },
    discussion: "面对与原先判断矛盾的新信息，如何修正推理并记录原因？",
    selfCheck: "我能说明判断变化的依据，并保留未解决的问题吗？",
    resources: [{ label: "病例阶段演示", path: "/cases" }],
  },
]);
