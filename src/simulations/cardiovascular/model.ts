export interface CardiovascularParameters {
  heartRate: number;
  strokeVolume: number;
  systemicVascularResistance: number;
}
export const defaults: CardiovascularParameters = {
  heartRate: 70,
  strokeVolume: 70,
  systemicVascularResistance: 18,
};
/** Educational identity: CO (L/min) = HR (beats/min) × SV (mL/beat) / 1000.
 * Simplified pressure gradient = CO × SVR (mmHg·min/L), ignores CVP and feedback.
 * This is a dimensional teaching model, not a patient calculator. See docs/simulation-assumptions.md.
 */
export function simulate(p: CardiovascularParameters) {
  if (
    ![p.heartRate, p.strokeVolume, p.systemicVascularResistance].every(
      Number.isFinite,
    ) ||
    p.heartRate < 30 ||
    p.heartRate > 180 ||
    p.strokeVolume < 20 ||
    p.strokeVolume > 140 ||
    p.systemicVascularResistance < 5 ||
    p.systemicVascularResistance > 35
  )
    throw new RangeError("Parameters outside the teaching sandbox");
  const cardiacOutput = (p.heartRate * p.strokeVolume) / 1000;
  return {
    cardiacOutput,
    pressureGradient: cardiacOutput * p.systemicVascularResistance,
  };
}
