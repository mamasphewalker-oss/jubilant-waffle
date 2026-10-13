# Data schema index

The application runtime contracts live in `src/types/medical.ts` and `src/evidence/sources/schema.ts`; they are validated with Zod. [medical-data-model.md](medical-data-model.md) documents their meaning and review requirements. Medical rules must resolve evidence IDs to `sources/SOURCE_REGISTRY.json` records before publication.

External software and data-discovery metadata live in `sources/RESOURCE_REGISTRY.yaml`. Assets actually imported into this repository live separately in `sources/ASSET_REGISTRY.json`; an empty `assets` list means no third-party asset is currently registered. Medical evidence/source records live in `sources/SOURCE_REGISTRY.json` and are never inferred from the resource catalog.

JSON Schemas are in `sources/schemas/`. `pnpm validate:registries` parses and checks the registries and their cross-file invariants. `RESOURCE_REGISTRY.yaml` is deliberately authored as JSON-compatible YAML so the project can validate the YAML subset with Node's built-in JSON parser without adding a runtime or development dependency.
