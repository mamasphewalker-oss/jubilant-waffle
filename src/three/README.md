# 3D extension seams

viewer: actual R3F renderer, bounded discrete camera commands and world-axis clipping. anatomy: procedural objects plus future hierarchy/layer/scale types. clipping: anatomical-plane contracts remain pending orientation review; technical X/Y/Z material clipping works without cut caps. loaders: licensed asset manifest only.

interaction is currently R3F raycasting + Zustand selection; animation/particles/materials/performance stay lean and can become separate modules once real requirements exist. No simulated drug trajectories or anatomy geometry.

Isolation preserves/restores prior visibility. DOM camera buttons and a scoped keyboard group complement OrbitControls for touch and keyboard access. See docs/interactive-3d-github-toolkit.md for researched upstream tools and adoption criteria.
