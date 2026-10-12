# Agent instructions

This is medical education software. Modern medicine is the foundational sequence: anatomy → physiology → pathophysiology → disease → diagnosis → tests → evidence-based treatment → pharmacology → clinical reasoning → standardized supplementary integrative teaching.

- Read docs/architecture.md, evidence-policy.md and open-source-stack.md before core architecture changes.
- Reuse maintained official/open-source dependencies first. Check LICENSE before adoption or copying. Record repository, exact version, license, use, alternatives and reason. Never copy whole third-party repos into src.
- Do not fabricate medical evidence. Unreviewed data must be demo or needs-review with visible labels. Trace sources, organization, year/version, evidence level and reviewed date.
- Do not generate real-patient diagnosis, prescriptions, unvalidated doses, herbal prescriptions or acupuncture treatment. No patient-identifying data.
- Keep traditional theory and modern biomedical evidence distinct. Red flags and modern assessment come first.
- Models require source, asset license, attribution, version/checksum and medical reviewer. Procedural shapes are technical placeholders, never anatomy.
- Maintain visible footer disclaimer, keyboard access, responsive fallback and reduced motion.
- Run typecheck, unit tests, build, licenses and available E2E checks; fix failures. Document environment limits honestly. Do not auto-merge PRs or choose a project license without user decision.
- Work on feature branches, never directly on main. No node_modules, builds, unlicensed models or large binaries in commits.
