# Architecture

Browser-only Phase 1. React Router owns history and route chunks; Layout owns navigation/disclaimer. Pages own teaching flows. Three/R3F owns the GPU canvas, pointer raycasting and resource lifecycle; Drei supplies mature OrbitControls. Zustand owns cross-panel viewer state; React local state owns simulation parameters. Zod validates content at ingress. Evidence UI never hides unknown provenance.

Three procedural meshes are the complete scene: sphere, torus, cylinder, all status demo. Grid coordinates are technical units. DOM tree and inspector mirror selection for keyboard access; canvas does not need to expose individual meshes to screen readers. Rotation/zoom/pan reuse OrbitControls. Focus/reset are explicit camera commands. Opacity/visibility are per-object. Labels are native Three.js billboard sprites with matching DOM selection names. Drei Html caused a confirmed React 19 StrictMode synchronous-unmount warning; native sprites avoid nested React roots. Renderer uses demand frames and DPR cap 1.5; reduced motion has no animation to disable. Drawing-buffer retention is development-only for smoke pixel checks.

Rendering profile: 3 meshes, modest geometry, one grid, three small generated label textures, no network model assets. No LOD or instancing until real measurements justify them. Route splitting isolates 3D and chart costs. Mobile reorders viewport → layer tree → inspector. WebGL failure retains DOM controls and a clear fallback. Do not treat fallback as successful GPU rendering in tests.

Future anatomy node ids map to model manifests, layers and scale. Loader/clipping interfaces are extension seams, not working features. Adapter lifecycle owns abort, resize and disposal. Any future data import is validated and evidence-reference IDs resolved before review/publishing.

No persistence or URL-backed clinical data. Viewer/simulation state is session-only; route is URL-backed. Browser back/forward uses Router. Future shareable view schema must validate camera/filter inputs and never encode patient data.

Curriculum: `src/curriculum` owns validated five-stage objectives, tasks for four audiences and route links. The home CoursePath component owns audience selection and temporary reflection checkboxes; leaving or refreshing the page resets them. They do not measure completion or competence. No extra persistence, accounts or clinical data are introduced. Course readiness labels distinguish technical prototypes from content skeletons.

Medical boundaries: modern medicine precedes supplementary observations. State-based disease stages and pharmacology steps are teaching concepts, not inferred diagnosis. Case engine only moves between explicit stages and prioritizes supplied red flags. No real case content seeded.

Testing covers dimensions, invalid parameters, evidence promotion, viewer isolation, red-flag ordering and actual browser navigation/rendering. See verification.md.
