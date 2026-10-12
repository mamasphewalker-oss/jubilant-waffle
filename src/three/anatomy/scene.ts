export const sceneObjects = [
  {
    id: "sphere",
    name: "球体",
    shape: "sphere",
    position: [-2.2, 0.85, 0],
    color: "#18B7A0",
  },
  {
    id: "torus",
    name: "环体",
    shape: "torus",
    position: [0, 0.5, 0],
    color: "#D9A441",
  },
  {
    id: "cylinder",
    name: "柱体",
    shape: "cylinder",
    position: [2.2, 1, 0],
    color: "#7C9FC7",
  },
] as const;
export type ObjectId = (typeof sceneObjects)[number]["id"];
export type AnatomyLayer =
  | "skin"
  | "fascia"
  | "muscle"
  | "bone"
  | "nerves"
  | "arteries"
  | "veins"
  | "lymphatic"
  | "organs";
export type AnatomyScale =
  "body" | "system" | "organ" | "tissue" | "cell" | "receptor";
export interface AnatomyNode {
  id: string;
  nameZh: string;
  children: AnatomyNode[];
  layer?: AnatomyLayer;
  scale: AnatomyScale;
  modelId?: string;
}
