# Verification

Local validation on Windows / Node 24.19.0 / pnpm 11.25.0, 2026-10-12 (Asia/Bangkok):

- TypeScript strict check passed.
- Vitest: 30 tests passed, including course coverage, review provenance/calendar dates, TCM import gates, isolation restoration and camera distance limits.
- Vite production build passed; anatomy and chart pages split. Largest 3D chunk approximately 934 kB raw / 249 kB gzip before final label change. No large models.
- Chromium and Pixel 7 emulation: all 12 E2E tests passed. Actual WebGL2 pixel readback; rendered canvas changes after clipping and keyboard camera commands; rotation/zoom/pan, focus/reset, selection, visibility restoration, opacity, all seven routes, disclaimer, no horizontal overflow, simulation and case progression, six-source registry, audience switch/self-check/reset/course links. No application errors in viewer tests.
- Desktop 1440×1000, tablet 820×1180, mobile 390×844 captured and visually reviewed. All scroll widths equal viewport widths. Basic semantic controls, labels, skip link, focus outlines, font-size control and reduced motion inspected. No claim of full WCAG certification.
- 152 installed manifest license records audited; no unreviewed unknown/GPL/AGPL detected. webgl-constants MIT bundled LICENSE reviewed despite missing manifest field. See inventory.

Browser QA first attempted IAB; sandbox-local server timed out. Playwright fallback provided automated tests and screenshots. IAB subsequently opened successfully after a host-accessible server was started. Concept and final screenshots were both inspected through view_image. Five comparison points: navy/teal/gold tokens, readable header/title hierarchy, three-column workspace, inspector/control styling, mobile viewport-first order and footer. Required visible copy preserved. Intentional simplifications: no invented search/accounts, no transform editing or wireframe aesthetics. Actual Three.js geometry replaces concept illustration.

Resolved failure: Drei Html nested-root unmount warning under React StrictMode. StrictMode retained, labels replaced with native sprites. Initial home test needed whitespace-aware heading assertion. No application error was ignored.

Build warnings: upstream React Router/Lucide use-client directives are reported by Rolldown in this browser-only Vite build; they are React Server Component boundaries and do not apply to this SPA. Build succeeds and browser checks pass. Test runner also notes NO_COLOR/FORCE_COLOR environment overlap; no application warning.

CI: GitHub Actions installs frozen lockfile, typechecks, runs unit/build/license checks and both Chromium smoke projects. Live run result must be checked after push; local success is not described as CI success.

Remaining limits: source/date structural validation is not medical truth verification; no approved anatomy assets or medical dataset, no working DICOM module, other pages are explicit skeletons.
