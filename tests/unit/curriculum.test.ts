import { describe, it, expect } from "vitest";
import { curriculum } from "../../src/curriculum/catalog";
import { audienceSchema, courseStageSchema } from "../../src/curriculum/schema";

describe("curriculum coverage", () => {
  it("connects all six learning routes in the five-stage sequence", () => {
    expect(curriculum.map((stage) => stage.id)).toEqual([
      "normal-function",
      "mechanism",
      "diagnosis",
      "treatment",
      "reasoning",
    ]);
    expect(
      new Set(
        curriculum.flatMap((stage) =>
          stage.resources.map((resource) => resource.path),
        ),
      ).size,
    ).toBe(6);
    expect(
      curriculum.filter((stage) => stage.readiness === "skeleton"),
    ).toHaveLength(4);
  });
  it("requires a task for every audience and valid teaching links", () => {
    const incomplete = {
      ...curriculum[0],
      activities: { student: "Only one role" },
    };
    expect(courseStageSchema.safeParse(incomplete).success).toBe(false);
    expect(
      courseStageSchema.safeParse({
        ...curriculum[0],
        resources: [{ label: "Bad route", path: "/missing" }],
      }).success,
    ).toBe(false);
    expect(audienceSchema.safeParse("patient").success).toBe(false);
  });
});
