# Anatomy asset policy

No real anatomy model is included. Procedural sphere/torus/cylinder are explicitly non-anatomical technical placeholders. Do not generate an anatomical-looking object and assert it is reliable.

Required before import: official source URL, model author, asset-specific license, commercial/noncommercial permissions, attribution and share-alike obligations, version/commit, checksum, anatomical labels/hierarchy and medical reviewer/date. Code license does not establish model license. Unknown license means reject import. GPL/AGPL code and CC share-alike assets require separate obligations analysis; no implicit permission.

Future assets use GLB/glTF manifests in src/three/loaders. Keep original source/NOTICE documentation, optimize offline with glTF Transform, evaluate Draco vs Meshopt on mobile, preserve semantic IDs and checked orientation/units. Review decimation artifacts on structures, not only file size. Large binaries stay outside Git in an approved asset store.
