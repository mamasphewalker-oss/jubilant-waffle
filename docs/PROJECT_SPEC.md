# Project specification

This repository is a browser-based medical education platform. Modern medicine anchors the learning sequence; clearly labeled traditional Chinese medicine material is supplementary. Phase 1 is an educational application foundation, not a diagnostic or prescribing system.

The current application uses React, TypeScript, Vite, Three.js, React Three Fiber and Drei. The viewer currently renders non-anatomical technical placeholders. Imaging, clinical datasets and anatomical assets remain future integrations, subject to the source and asset gates below.

Keep implementation and canonical policy in the existing documents: [architecture](architecture.md), [evidence policy](evidence-policy.md), [medical data model](medical-data-model.md), [anatomy asset policy](anatomy-model-policy.md), and [open-source decisions](open-source-research.md). The cross-project resource entry point is [sources/EXTERNAL_RESOURCES.md](../sources/EXTERNAL_RESOURCES.md). This specification indexes those sources instead of maintaining parallel implementation details.

## Product boundaries

- Teach anatomy, physiology, pathophysiology, disease, modern assessment, evidence-based treatment, pharmacology and clinical reasoning in that order.
- Keep traditional theory, modern biomedical evidence and educational assumptions in separate domains.
- Use synthetic teaching examples. Production content requires source provenance, applicable license/privacy review, and qualified medical review.
- Preserve visible educational disclaimers, keyboard access, reduced-motion behavior and non-WebGL fallbacks.
- Do not add DICOM systems, datasets or licensed models as a side effect of resource research.

## Verification

Run the repository scripts in `package.json`, including registry validation, typecheck, unit tests, production build, dependency license audit and browser checks where the environment supports them. See [verification](verification.md).
