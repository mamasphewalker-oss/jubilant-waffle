import { beforeEach, describe, expect, it } from "vitest";
import { Vector3 } from "three";
import { stepCamera } from "../../src/three/viewer/camera";
import { useViewer } from "../../src/store/viewer";

beforeEach(() =>
  useViewer.setState({
    selected: "sphere",
    visibility: { sphere: true, torus: false, cylinder: true },
    isolationSnapshot: null,
    clipping: { enabled: false, axis: "x", position: 0 },
  }),
);
describe("isolation and clipping", () => {
  it("restores the original visibility after changing the isolated selection", () => {
    useViewer.getState().isolate();
    expect(useViewer.getState().visibility).toEqual({
      sphere: true,
      torus: false,
      cylinder: false,
    });
    useViewer.getState().select("torus");
    useViewer.getState().isolate();
    expect(useViewer.getState().visibility).toEqual({
      sphere: false,
      torus: true,
      cylinder: false,
    });
    useViewer.getState().restoreIsolation();
    expect(useViewer.getState().visibility).toEqual({
      sphere: true,
      torus: false,
      cylinder: true,
    });
    expect(useViewer.getState().isolationSnapshot).toBeNull();
  });
  it("rejects nonfinite clip positions and clamps finite positions", () => {
    for (const position of [NaN, Infinity, -Infinity])
      expect(() => useViewer.getState().setClipping({ position })).toThrow(
        RangeError,
      );
    useViewer
      .getState()
      .setClipping({ enabled: true, axis: "y", position: 99 });
    expect(useViewer.getState().clipping).toEqual({
      enabled: true,
      axis: "y",
      position: 4,
    });
  });
});
describe("discrete camera controls", () => {
  const position = new Vector3(5, 3.8, 7),
    target = new Vector3(0, 0.7, 0);
  it("rotates around a stable target without changing distance or mutating inputs", () => {
    const next = stepCamera(position, target, "rotate-left");
    expect(next.position.distanceTo(next.target)).toBeCloseTo(
      position.distanceTo(target),
    );
    expect(next.target.equals(target)).toBe(true);
    expect(next.position.equals(position)).toBe(false);
    expect(position.toArray()).toEqual([5, 3.8, 7]);
  });
  it("pans position and target together and preserves view direction", () => {
    const next = stepCamera(position, target, "pan-right");
    expect(
      next.position
        .clone()
        .sub(next.target)
        .distanceTo(position.clone().sub(target)),
    ).toBeCloseTo(0);
    expect(next.target.equals(target)).toBe(false);
  });
  it("enforces zoom limits and keeps polar rotations away from singularities", () => {
    let next = { position: position.clone(), target: target.clone() };
    for (let i = 0; i < 100; i++)
      next = stepCamera(next.position, next.target, "zoom-in");
    expect(next.position.distanceTo(next.target)).toBeCloseTo(1.5);
    for (let i = 0; i < 100; i++)
      next = stepCamera(next.position, next.target, "zoom-out");
    expect(next.position.distanceTo(next.target)).toBeCloseTo(30);
    for (let i = 0; i < 100; i++)
      next = stepCamera(next.position, next.target, "rotate-up");
    expect(next.position.toArray().every(Number.isFinite)).toBe(true);
  });
});
