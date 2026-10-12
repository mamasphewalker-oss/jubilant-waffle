export interface EducationalStudy {
  id: string;
  modality: "CT" | "MR";
  origin: "synthetic" | "de-identified";
  sourceUrl: string;
  license: string;
  reviewedAt: string;
  // References resolve via an authorized gateway. Never use patient names as identifiers.
  dicomWebStudyUid?: string;
}
export interface ImagingAdapter {
  mount(element: HTMLElement): Promise<void>;
  load(study: EducationalStudy, signal: AbortSignal): Promise<void>;
  setPlane(plane: "coronal" | "sagittal" | "axial"): void;
  resize(): void;
  dispose(): Promise<void>;
}
export interface ImagingAdapterFactory {
  create(): Promise<ImagingAdapter>;
}
