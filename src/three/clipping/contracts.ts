export type ClippingPlane = {
  kind: "coronal" | "sagittal" | "axial" | "custom";
  normal: [number, number, number];
  constant: number;
  enabled: boolean;
};
