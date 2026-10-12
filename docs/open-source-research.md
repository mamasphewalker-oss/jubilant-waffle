# Open-source research

Decisions apply to Phase 1 only. Stars are not acceptance criteria. Snapshot includes last push, archived flag, open issue count, releases, npm engines/peers and license identifiers. Counts indicate review workload, not defect rates. Individual issue triage and clinical validity audits remain future gates; no candidate is assumed medically validated.

## ADOPT

See open-source-stack.md for React, TypeScript, Vite, Three.js, R3F, Drei, Zustand, Lucide, Recharts, Vitest, Playwright, React Router, Zod and three-stdlib. All use registry dependencies; no vendoring.

## EVALUATE

shadcn/ui (MIT), Motion (MIT), glTF Transform (MIT), Draco (Apache-2.0), Meshoptimizer (MIT), Cornerstone3D (MIT), vtk.js (BSD-3-Clause). Deferred until a concrete capability/benchmark needs them. OHIF full-app architecture is reference only.

## Additional candidates beyond the proposed stack

| Candidate / official source | Job | Decision | License and technical reasoning |
|---|---|---|---|
| [SustainHawaii anatomy-viewer](https://github.com/SustainHawaii/anatomy-viewer) | Web anatomy, glTF, hierarchy | EVALUATE | README and processing pipeline inspected; per-asset Z-Anatomy and code licenses require separate verification. No content imported. Small project; establish maintenance/tests before adopting. |
| [Z-Anatomy](https://github.com/LluisV/Z-Anatomy) | Anatomical asset/hierarchy | REJECT for import | Unity project; GitHub NOASSERTION. Asset licenses and anatomical validation unresolved. Not a browser npm package. |
| [vtk.js](https://github.com/Kitware/vtk-js) | WebGL medical/volume visualization | EVALUATE | BSD-3-Clause, active typed scientific toolkit. Keep separate renderer adapter if needed. |
| [Cornerstone3D](https://github.com/cornerstonejs/cornerstone3D) | DICOM, CT/MR visualization | EVALUATE | MIT, actively maintained. Future DICOMweb integration needs auth, lifecycle, privacy and worker testing. |
| [OHIF](https://github.com/OHIF/Viewers) | Complete DICOM workflow | REFERENCE ONLY | MIT. Use modes/extensions or isolated application; copying entire viewer prohibited. |
| [AMI](https://github.com/FNNDSC/ami) | Medical visualization | REJECT | Metadata license conflict, 2022 last push, obsolete Three.js coupling. |
| [BioGears](https://github.com/BioGearsEngine/core) | Physiology simulation | REFERENCE ONLY | Apache-2.0 C++ engine, release 8.2.0, push 2026-01. Compartment/scenario concepts useful; no TS drop-in, clinical validation and server costs separate. |
| [OpenLabyrinth](https://github.com/olab/Open-Labyrinth) | Virtual patient / case engine | REFERENCE ONLY | Upstream describes GPL3 and directs future work to OLab4. Review graph/reveal concepts only; no copied PHP or copyleft linkage. |
| [PharmaSim](https://github.com/KoshkiKode/pharmasim) | Pharmacology visualization | EVALUATE | Educational simulator candidate identified; code/data licenses and pharmacology sources not yet independently verified. No dosing or drug dataset imported. |
| [OpenSimLab](https://github.com/clay-good/opensimlab) | Interactive medical education | REFERENCE ONLY | Scenario interaction reference; repository presents MIT but exact release/source validity must be audited before any reuse. Game/scenario scope exceeds Phase 1. |
| [Virtual standardized patient](https://github.com/igembitsky/virtual-standardized-patient) | Interview teaching | REJECT for Phase 1 | LLM/patient dialogue scope excluded; case-content license is separate from app code. |

No ready-made platform met all requirements for a permissive, modular, medically reviewed TS anatomy+physiology+cases stack. Mature render/control/schema/chart libraries are reused; only application glue, teaching assumptions, metadata contracts and staged navigation are implemented here. This does not claim the candidate list is exhaustive.

