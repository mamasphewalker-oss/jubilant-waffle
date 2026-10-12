import { create } from "zustand";
import type { ObjectId } from "../three/anatomy/scene";
type ViewerState = {
  selected: ObjectId;
  hovered: ObjectId | null;
  visibility: Record<ObjectId, boolean>;
  opacity: Record<ObjectId, number>;
  labels: boolean;
  cameraCommand: { type: "reset" | "focus"; sequence: number };
  select: (id: ObjectId) => void;
  hover: (id: ObjectId | null) => void;
  toggle: (id: ObjectId) => void;
  setOpacity: (value: number) => void;
  setLabels: (value: boolean) => void;
  camera: (type: "reset" | "focus") => void;
};
export const useViewer = create<ViewerState>((set) => ({
  selected: "sphere",
  hovered: null,
  visibility: { sphere: true, torus: true, cylinder: true },
  opacity: { sphere: 1, torus: 1, cylinder: 1 },
  labels: true,
  cameraCommand: { type: "reset", sequence: 0 },
  select: (selected) => set({ selected }),
  hover: (hovered) => set({ hovered }),
  toggle: (id) =>
    set((s) => ({ visibility: { ...s.visibility, [id]: !s.visibility[id] } })),
  setOpacity: (value) =>
    set((s) => ({
      opacity: {
        ...s.opacity,
        [s.selected]: Math.min(1, Math.max(0.1, value)),
      },
    })),
  setLabels: (labels) => set({ labels }),
  camera: (type) =>
    set((s) => ({
      cameraCommand: { type, sequence: s.cameraCommand.sequence + 1 },
    })),
}));
