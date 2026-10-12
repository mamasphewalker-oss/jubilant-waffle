import { z } from "zod";
import snapshot from "./catalog.json";
import { researchSourceSchema } from "./contracts";

// Source registration is not approval to import upstream code or medical data.
export const tcmResearchSources = z.array(researchSourceSchema).parse(snapshot);
