# Medical 3D Clinical Learning Platform

现代医学基础下的中西医结合 3D 临床教学平台。Phase 1 establishes an educational application foundation, not a diagnostic or prescribing system.

## Screenshot

Screenshot placeholder: docs/screenshots/anatomy-desktop.png and anatomy-mobile.png (capture after approved visual QA; runtime screenshots are not anatomical evidence).

## Stack

React 19, TypeScript, Vite, Three.js, React Three Fiber, Drei, Zustand, Lucide, Recharts, React Router and Zod. Vitest + Playwright. See [third-party decisions](docs/open-source-stack.md) and [research](docs/open-source-research.md). No vendor code, medical datasets or anatomical model downloads.

## Develop

Node >=22.12 (Node 24 recommended); pnpm 11.25.0. Install pnpm via the official pnpm installation documentation or your trusted package manager.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm test
pnpm build
pnpm run licenses
pnpm exec playwright install chromium
pnpm test:e2e
```

Dev server prints its local URL. For a production build use pnpm preview; static hosting must rewrite unknown paths to index.html for browser-history routes. No backend or external credentials needed.

## Modules and directory

首页提供“正常功能 → 疾病机制与药物作用 → 临床诊断 → 规范治疗 → 病例推理”五阶段课程路径，按医学生、住院医师、临床教师和中西医结合学习者切换任务。包含教师讨论、自查问题及当前页面内的自查记录。参见 [课程缺口检查](docs/curriculum-gap-review.md)；课程框架尚不代表已审核医学课程。

- src/app: shell, accessibility, lazy route composition and design tokens
- src/pages: seven routes; anatomy/physiology working prototypes, remaining teaching skeletons
- src/three: viewer, anatomy hierarchy, clipping/model contracts and future extension notes
- src/store: isolated viewer selection, visibility, opacity and camera state
- src/simulations: cardiovascular prototype, other systems deliberately deferred
- src/types, src/medical, src/evidence: runtime-validated provenance and data contracts
- src/clinical-cases: staged synthetic/de-identified case interface
- src/curriculum: five-stage course objectives, audience tasks and teaching-route links
- src/imaging, src/integrations: future imaging boundary and TCM source registry with offline graph contracts
- tests/unit, tests/e2e, tests/visual; .github/workflows; docs; scripts

## Medical safety

本平台仅用于医学教育、科研与临床思维训练。实际诊断、治疗、处方和用药决策，必须由具备资质的医务人员依据现行指南及患者具体情况作出。

Modern medicine anchors teaching. Traditional theory is a supplementary layer, separately labeled from biomedical evidence. Geometry is explicitly demo and not anatomy. No patient data, automatic diagnosis, prescriptions or dose recommendations. Formulas are dimensional teaching assumptions, not clinical predictions.

## Roadmap

[Roadmap](docs/roadmap.md), [architecture](docs/architecture.md), [model policy](docs/anatomy-model-policy.md), [medical data model](docs/medical-data-model.md), [evidence policy](docs/evidence-policy.md), [imaging plan](docs/medical-imaging-roadmap.md).

## TCM research sources

六个中医药开源候选已加入来源登记，在治疗教学页可查看。当前仅包含元数据、离线接入接口与证据分类校验，没有导入第三方医学数据或运行上游应用。参见 [来源核查](docs/tcm-open-source-research.md) 和 [接入计划](docs/tcm-integration-roadmap.md)。

## License

License: To be determined. No project license is granted by dependency licenses. Third-party licenses and attribution remain applicable independently.
