import { z } from "zod";

export const audienceSchema = z.enum([
  "student",
  "resident",
  "teacher",
  "integrative",
]);
export type Audience = z.infer<typeof audienceSchema>;
export const courseStageSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  readiness: z.enum(["demo", "skeleton"]),
  objectives: z.array(z.string().min(1)).min(1),
  activities: z.record(audienceSchema, z.string().min(1)),
  discussion: z.string().min(1),
  selfCheck: z.string().min(1),
  resources: z
    .array(
      z.object({
        label: z.string().min(1),
        path: z.enum([
          "/anatomy",
          "/physiology",
          "/pathology-pharmacology",
          "/diagnosis",
          "/treatment",
          "/cases",
        ]),
      }),
    )
    .min(1),
});
export type CourseStage = z.infer<typeof courseStageSchema>;
