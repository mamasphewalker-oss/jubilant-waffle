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

Dev server prints its local URL. Routes use hash URLs such as /#/anatomy; static hosting needs no history rewrite. For GitHub Pages build with VITE_BASE_PATH=/jubilant-waffle/ and run pnpm preview --base /jubilant-waffle/. pnpm test:production checks that project-base build on a strict static server. No backend or external credentials needed.

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

3D 查看器支持对象隔离及可见性恢复、X/Y/Z 世界坐标剖切、键盘/触屏旋转缩放平移。剖切为无封盖的技术演示，不代表人体断层；启用时暂隐藏场景标签。参见 [3D GitHub 工具清单](docs/interactive-3d-github-toolkit.md)，区分既有依赖、资产流水线工具和后续评估项。

[Roadmap](docs/roadmap.md), [architecture](docs/architecture.md), [model policy](docs/anatomy-model-policy.md), [medical data model](docs/medical-data-model.md), [evidence policy](docs/evidence-policy.md), [imaging plan](docs/medical-imaging-roadmap.md).

## TCM research sources

六个中医药开源候选已加入来源登记，在治疗教学页可查看。当前仅包含元数据、离线接入接口与证据分类校验，没有导入第三方医学数据或运行上游应用。参见 [来源核查](docs/tcm-open-source-research.md) 和 [接入计划](docs/tcm-integration-roadmap.md)。

## External Resources & Medical Data Governance

互联网可访问资源不等于医学证据或再利用许可。外部软件、临床来源和媒体资产分别登记；医学规则必须来自经过核验的结构化来源，并保留来源、版本、适用人群和审查状态。运行时 AI 不得临时修改诊断、治疗、药物剂量或方剂规则。未知许可或医学核验状态保持待核，不能进入生产内容。本项目用于医学教育，不用于患者诊疗或处方决策。完整入口见 [外部资源登记](sources/EXTERNAL_RESOURCES.md)、[资产政策](docs/ASSET_POLICY.md) 和 [医学来源登记](sources/SOURCE_REGISTRY.json)。

## License

License: To be determined. No project license is granted by dependency licenses. Third-party licenses and attribution remain applicable independently.

## Current workstation increment

See [2026-10-13 audit](docs/audit-2026-10-13.md). Light CCS-focused shell, recursive directory, Ctrl/Cmd+K local search, Chinese/English shell and home, session-only viewer camera restoration, and Pages workflow. Legacy module content remains Chinese with explicit language fallback. No approved medical asset or CCS case is included. GitHub Pages requires repository Settings → Pages → GitHub Actions; deployment runs from main only. Feature work does not auto-merge or publish.
