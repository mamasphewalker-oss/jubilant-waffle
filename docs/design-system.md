# Design and visual contract

Concept generated with built-in ImageGen for desktop anatomy workspace and mobile stacking. The concept is a layout reference, never a clinical asset. No raster artwork is embedded in the app.

Tokens: navy #071A2B, surface #0A2132, border #274657, text #EDF4FA, muted #AAC1D2, teal #18B7A0, integrative gold #D9A441, red #E85D5D. System sans/Chinese fallback; readable UI text; 8px panel radius, 5px control radius, 16/24/32 spacing family. No decorative particles or anatomical claims.

Desktop: seven-link top nav; heading; narrow structure rail; central WebGL viewport; inspector; always-visible disclaimer. Mobile: menu disclosure, viewport first, tree then inspector. Local layout interprets geometric grid and actual perspective through Three.js, not a screenshot.

User requirements override invented concept search/account buttons and editable transform fields: these are omitted since no account/search/edit-transform features were requested. Real position is read-only. Font scale toggle supports requested accessibility. Focus/reset, opacity and labels are functional. Native three geometry remains smooth rather than decorative wireframe; semantics unchanged.

Visualization routes: true 3D → R3F/Three, chart relationship → Recharts SVG with table fallback. Technical data: 3 meshes / 16 chart samples. Teal indicates focal interaction, gold caution/supplement, red alerts. No hover-only facts. Stateful controls are DOM-accessible; route is URL-backed, scene parameters deliberately transient.

Skills: frontend-app-builder, imagegen, data-visualization, playwright and vercel:react-best-practices read and applied locally. threejs-data-visualization and testing-data-visualizations: Skill unavailable in this session. web-3d-asset-pipeline is available but not applicable until GLB asset shipping; no fake use claim. No delegated agent work.
