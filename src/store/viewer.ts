import { create } from "zustand";
import type { ObjectId } from "../three/anatomy/scene";
import type { CameraCommand } from "../three/viewer/camera";
type ViewerState = {
  cameraSnapshot: {
    position: [number, number, number];
    target: [number, number, number];
  } | null;
  saveCamera: (snapshot: NonNullable<ViewerState["cameraSnapshot"]>) => void;
  selected: ObjectId;
  hovered: ObjectId | null;
  visibility: Record<ObjectId, boolean>;
  opacity: Record<ObjectId, number>;
  labels: boolean;
  cameraCommand: { type: CameraCommand; sequence: number };
  isolationSnapshot: Record<ObjectId, boolean> | null;
  clipping: { enabled: boolean; axis: "x" | "y" | "z"; position: number };
  isolate: () => void;
  restoreIsolation: () => void;
  setClipping: (update: Partial<ViewerState["clipping"]>) => void;
  select: (id: ObjectId) => void;
  hover: (id: ObjectId | null) => void;
  toggle: (id: ObjectId) => void;
  setOpacity: (value: number) => void;
  setLabels: (value: boolean) => void;
  camera: (type: CameraCommand) => void;
};
export const useViewer = create<ViewerState>((set) => ({
  cameraSnapshot: null,
  saveCamera: (cameraSnapshot) => set({ cameraSnapshot }),
  selected: "sphere",
  hovered: null,
  visibility: { sphere: true, torus: true, cylinder: true },
  opacity: { sphere: 1, torus: 1, cylinder: 1 },
  labels: true,
  isolationSnapshot: null,
  clipping: { enabled: false, axis: "x", position: 0 },
  isolate: () =>
    set((s) => ({
      isolationSnapshot: s.isolationSnapshot ?? { ...s.visibility },
      visibility: {
        sphere: s.selected === "sphere",
        torus: s.selected === "torus",
        cylinder: s.selected === "cylinder",
      },
      hovered: null,
    })),
  restoreIsolation: () =>
    set((s) =>
      s.isolationSnapshot
        ? {
            visibility: { ...s.isolationSnapshot },
            isolationSnapshot: null,
            hovered: null,
          }
        : {},
    ),
  setClipping: (update) => {
    if (update.position !== undefined && !Number.isFinite(update.position))
      throw new RangeError("Clipping position must be finite");
    set((s) => ({
      clipping: {
        ...s.clipping,
        ...update,
        position:
          update.position === undefined
            ? s.clipping.position
            : Math.max(-4, Math.min(4, update.position)),
      },
      hovered: null,
    }));
  },
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
