import { describe, it, expect, beforeEach } from "vitest";
import { defaults, simulate } from "../../src/simulations/cardiovascular/model";
import { anatomicalStructureSchema } from "../../src/types/medical";
import { placeholder } from "../../src/medical/anatomy/demo";
import { useViewer } from "../../src/store/viewer";
import {
  nextStage,
  prioritizedObservations,
} from "../../src/clinical-cases/engine";
describe("teaching model", () => {
  it("converts mL/beat to L/min and applies the explicit pressure assumption", () => {
    expect(simulate(defaults).cardiacOutput).toBeCloseTo(4.9);
    expect(simulate({ ...defaults, heartRate: 140 }).cardiacOutput).toBeCloseTo(
      9.8,
    );
    expect(
      simulate({ ...defaults, systemicVascularResistance: 10 })
        .pressureGradient,
    ).toBeCloseTo(49);
  });
  it.each([NaN, Infinity, -10, 0, 181])("rejects invalid HR %s", (heartRate) =>
    expect(() => simulate({ ...defaults, heartRate })).toThrow(RangeError),
  );
});
describe("evidence policy", () => {
  it("accepts explicitly unsourced demo geometry", () =>
    expect(anatomicalStructureSchema.safeParse(placeholder).success).toBe(
      true,
    ));
  it("rejects promoting unsourced demo to reviewed", () =>
    expect(
      anatomicalStructureSchema.safeParse({
        ...placeholder,
        status: "reviewed",
      }).success,
    ).toBe(false));
  it("rejects source strings that are not URLs", () =>
    expect(
      anatomicalStructureSchema.safeParse({
        ...placeholder,
        source: ["made-up-source"],
      }).success,
    ).toBe(false));
});
describe("viewer state", () => {
  beforeEach(() => {
    useViewer.setState({
      selected: "sphere",
      visibility: { sphere: true, torus: true, cylinder: true },
      opacity: { sphere: 1, torus: 1, cylinder: 1 },
    });
  });
  it("isolates opacity to the selected layer and clamps values", () => {
    useViewer.getState().select("torus");
    useViewer.getState().setOpacity(0.4);
    expect(useViewer.getState().opacity).toEqual({
      sphere: 1,
      torus: 0.4,
      cylinder: 1,
    });
    useViewer.getState().setOpacity(-2);
    expect(useViewer.getState().opacity.torus).toBe(0.1);
  });
  it("toggles visibility without changing selection", () => {
    useViewer.getState().toggle("sphere");
    expect(useViewer.getState().visibility.sphere).toBe(false);
    expect(useViewer.getState().selected).toBe("sphere");
  });
});
describe("case framework", () => {
  it("keeps follow-up terminal", () => {
    expect(nextStage("Patient")).toBe("History");
    expect(nextStage("Follow-up")).toBe("Follow-up");
  });
  it("prioritizes red flags over supplementary observations", () =>
    expect(
      prioritizedObservations(
        {
          caseId: "synthetic",
          origin: "synthetic",
          stage: "Patient",
          revealedEvidenceIds: [],
          redFlags: ["demo-red-flag"],
        },
        ["demo-supplement"],
      )[0].kind,
    ).toBe("red-flag"));
});
