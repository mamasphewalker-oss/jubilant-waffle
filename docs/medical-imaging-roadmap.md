# CT / MRI / DICOM roadmap

Phase 1 provides src/imaging/contracts.ts only. Cornerstone3D MIT and OHIF MIT were inspected; neither runtime is installed. Cornerstone is a toolkit, OHIF a complete application with modes/extensions.

1. Acquire licensed synthetic/de-identified CT/MR study; independent privacy check must inspect DICOM tags and burned-in pixel annotations. Record source/license/version/reviewer.
2. Implement src/integrations/cornerstone adapter with lazy imports. Own worker configuration, rendering engine, viewport, authorized DICOMweb source, request abort and disposal. Mount/load/setPlane/resize/dispose follow the contract. No arbitrary remote patient URLs.
3. Verify axial/coronal/sagittal orientation, spacing/units, windowing and overlays with known phantom data. Isolate imaging renderer from anatomy renderer; dispose GPU/worker resources on navigation.
4. Evaluate OHIF as separate educational deployment or supported mode/extension. Never copy entire upstream repo into this source. Cross-app authorization and study handoff use opaque IDs and allowlisted gateway, not patient identifiers.
5. Benchmark mobile memory/codec cost and source loading; use worker/volume streaming, explicit unsupported-browser path and static educational alternatives.

Future server must handle authentication, least privilege, CORS, audit logs and de-identification. Phase 1 has no PACS, upload, DICOM reading, external patient data or diagnostic viewer.
