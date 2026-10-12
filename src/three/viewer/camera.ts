import { Spherical, Vector3 } from "three";

export type CameraStep =
  | "rotate-left"
  | "rotate-right"
  | "rotate-up"
  | "rotate-down"
  | "zoom-in"
  | "zoom-out"
  | "pan-left"
  | "pan-right"
  | "pan-up"
  | "pan-down";
export type CameraCommand = "reset" | "focus" | CameraStep;

/** Discrete controls for keyboard/touch users; same distance limits as OrbitControls. */
export function stepCamera(
  position: Vector3,
  target: Vector3,
  command: CameraStep,
) {
  const nextPosition = position.clone();
  const nextTarget = target.clone();
  const offset = position.clone().sub(target);
  if (command.startsWith("pan-")) {
    const right = new Vector3()
      .crossVectors(new Vector3(0, 1, 0), offset)
      .normalize();
    const up = new Vector3().crossVectors(offset, right).normalize();
    const direction =
      command === "pan-left"
        ? right.negate()
        : command === "pan-right"
          ? right
          : command === "pan-down"
            ? up.negate()
            : up;
    direction.multiplyScalar(offset.length() * 0.08);
    nextPosition.add(direction);
    nextTarget.add(direction);
  } else {
    const spherical = new Spherical().setFromVector3(offset);
    if (command === "rotate-left") spherical.theta -= 0.15;
    if (command === "rotate-right") spherical.theta += 0.15;
    if (command === "rotate-up") spherical.phi -= 0.15;
    if (command === "rotate-down") spherical.phi += 0.15;
    if (command === "zoom-in") spherical.radius *= 0.85;
    if (command === "zoom-out") spherical.radius /= 0.85;
    spherical.radius = Math.min(30, Math.max(1.5, spherical.radius));
    spherical.phi = Math.min(Math.PI - 0.1, Math.max(0.1, spherical.phi));
    nextPosition
      .copy(nextTarget)
      .add(new Vector3().setFromSpherical(spherical));
  }
  return { position: nextPosition, target: nextTarget };
}
