# Open-source stack

Checked 2026-10-12 (Asia/Bangkok). Official GitHub REST metadata, release endpoints and npm registry were queried before adoption. Exact installed versions are pinned in package.json/pnpm-lock.yaml; snapshot records latest published package separately from GitHub latest release. A maintained repository is not a medical validation. No source trees or models were copied.

| Project / official repository | Decision / use | License | Version checked | Integration | Why / alternative |
|---|---|---|---|---|---|
| [react](https://github.com/react/react) | ADOPT: Declarative component UI | MIT | npm 19.3.0; release v19.3.0 | npm dependency | Typed, modular and compatible; Vue |
| [typescript](https://github.com/microsoft/TypeScript) | ADOPT: Strict contracts and compile checks | Apache-2.0 | npm 7.0.2; release v7.0.2 | npm dependency | Typed, modular and compatible; JavaScript with JSDoc |
| [vite](https://github.com/vitejs/vite) | ADOPT: Dev server and split production bundle | MIT | npm 8.3.4; release v8.3.4 | npm dependency | Typed, modular and compatible; Webpack |
| [three](https://github.com/mrdoob/three.js) | ADOPT: WebGL renderer, geometry, raycasting | MIT | npm 0.186.1; release r186 | npm dependency | Typed, modular and compatible; Babylon.js |
| [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) | ADOPT: React scene lifecycle and pointer events | MIT | npm 9.8.1; release v9.8.1 | npm dependency | Typed, modular and compatible; Three.js imperative adapter |
| [@react-three/drei](https://github.com/pmndrs/drei) | ADOPT: OrbitControls and projected labels | MIT | npm 10.7.9; release v10.7.9 | npm dependency | Typed, modular and compatible; Three.js controls directly |
| [zustand](https://github.com/pmndrs/zustand) | ADOPT: Cross-panel viewer state | MIT | npm 5.0.15; release v5.0.15 | npm dependency | Typed, modular and compatible; React context |
| [shadcn](https://github.com/shadcn-ui/ui) | EVALUATE: A code-distribution CLI rather than a normal component dependency. Native semantic controls suffice in Phase 1; future copied components require retained MIT notices. | MIT | npm 4.21.4; release shadcn@4.21.4 | deferred dependency/adapter | Radix primitives |
| [lucide-react](https://github.com/lucide-icons/lucide) | ADOPT: Consistent medical/tool icons | ISC + MIT (Feather-derived icons; bundled LICENSE reviewed) / npm ISC | npm 1.55.0; release 1.55.0 | npm dependency | Typed, modular and compatible; Radix Icons |
| [motion](https://github.com/motiondivision/motion) | EVALUATE: No animation requirement justifies extra runtime today; reduced-motion-first UI. | MIT | npm 14.1.0; release none returned | deferred dependency/adapter | CSS |
| [recharts](https://github.com/recharts/recharts) | ADOPT: Responsive formula relationship chart | MIT | npm 3.10.1; release v3.10.1 | npm dependency | Typed, modular and compatible; Observable Plot |
| [@playwright/test](https://github.com/microsoft/playwright) | ADOPT: Actual browser, WebGL, mobile smoke tests | Apache-2.0 | npm 1.64.0; release v1.64.0 | npm dependency | Typed, modular and compatible; WebdriverIO |
| [vitest](https://github.com/vitest-dev/vitest) | ADOPT: Fast formula/schema/state checks | MIT | npm 5.0.3; release v5.0.3 | npm dependency | Typed, modular and compatible; Jest |
| [@gltf-transform/core](https://github.com/donmccurdy/glTF-Transform) | EVALUATE: Use offline pipeline when licensed GLB assets arrive. | MIT | npm 4.5.1; release none returned | deferred dependency/adapter | gltfpack |
| [draco3d](https://github.com/google/draco) | EVALUATE: Benchmark decoder cost against meshopt before selecting; no large model now. | Apache-2.0 | npm 1.5.7; release 1.5.7 | deferred dependency/adapter | meshoptimizer |
| [meshoptimizer](https://github.com/zeux/meshoptimizer) | EVALUATE: Future geometry and LOD pipeline, avoid decoder overhead before measured need. | MIT | npm 1.3.0; release v1.3 | deferred dependency/adapter | Draco |
| [@cornerstonejs/core](https://github.com/cornerstonejs/cornerstone3D) | EVALUATE: Future imaging adapter; do not load in Phase 1. | MIT | npm 5.11.7; release v5.11.7 | deferred dependency/adapter | vtk.js |
| [OHIF/Viewers](https://github.com/OHIF/Viewers) | REFERENCE ONLY: Complete viewer application; study extension/mode architecture, prefer separate deployment over copying. | MIT | npm n/a; release v3.13.12 | no import | Cornerstone adapter |
| [@kitware/vtk.js](https://github.com/Kitware/vtk-js) | EVALUATE: Typed scientific/volume visualization candidate; a second renderer requires measured benefit. | BSD-3-Clause | npm 37.4.1; release v37.4.1 | deferred dependency/adapter | Cornerstone3D |
| [ami.js](https://github.com/FNNDSC/ami) | REJECT: Last repository push 2022; old Three dependencies; GitHub MIT and npm Apache-2.0 metadata conflict needs tag-level audit. | MIT / npm Apache-2.0 | npm 0.0.22; release 0.0.13 | no import | Cornerstone3D |
| [BioGearsEngine/core](https://github.com/BioGearsEngine/core) | REFERENCE ONLY: C++ Apache-2.0 whole-body engine; no lightweight TS/npm drop-in. Study compartment and scenario design without importing patient simulation. | Apache-2.0 | npm n/a; release 8.2.0 | no import | Pulse |
| [LluisV/Z-Anatomy](https://github.com/LluisV/Z-Anatomy) | REJECT: Unity project and NOASSERTION license metadata. Model provenance and per-asset share-alike terms not approved; do not import. | NOASSERTION | npm n/a; release Beta | no import | Licensed models after review |
| [openlabyrinth/openlabyrinth](https://github.com/openlabyrinth/openlabyrinth) | REJECT: Repository lookup returned 404; corrected upstream olab/Open-Labyrinth researched separately. | Unverified | npm n/a; release none returned | no import | olab/Open-Labyrinth |
| [react-router-dom](https://github.com/remix-run/react-router) | ADOPT: Accessible links, history and route lazy imports | MIT | npm 7.18.4; release react-router@8.4.0 | npm dependency | Typed, modular and compatible; TanStack Router |
| [zod](https://github.com/colinhacks/zod) | ADOPT: Runtime validation and inferred medical/evidence types | MIT | npm 4.6.6; release v4.6.6 | npm dependency | Typed, modular and compatible; Valibot |

Additional adoption: [three-stdlib](https://github.com/pmndrs/three-stdlib) 2.36.1, MIT (bundled LICENSE read), dependency used only for OrbitControls type; alternative Three.js addons. React DOM shares React MIT. @types packages carry MIT and remain dev dependencies. Lucide ISC and inherited Feather MIT notices must both be retained.

Development-only formatting: [Prettier](https://github.com/prettier/prettier) 3.9.10, MIT, invoked through the official npm registry with pnpm dlx; no runtime dependency or source copied. Alternative: Biome. The exact version should be used for subsequent formatting.

Compatibility: React 19.3 + Fiber 9.8.1 peer range >=19 <19.4 + Drei 10.7.9 ^19/^9; Three 0.186 satisfies renderer peers. Node 24 satisfies Vite/Vitest/Playwright. R3F v10 alpha intentionally avoided. [Official R3F compatibility](https://r3f.docs.pmnd.rs/getting-started/introduction).

Run `pnpm run licenses` for transitive manifest audit (explicit `run` avoids pnpm's built-in `licenses` command). webgl-constants@1.1.1 lacks a license field; its bundled MIT LICENSE (Tim van Scherpenzeel 2019) was manually reviewed and is verified by the audit. No GPL/AGPL/unknown dependency is intentionally accepted. Manifest scan is a baseline, not a legal opinion; retain bundled licenses when distributing builds. See third-party-license-inventory.json.

