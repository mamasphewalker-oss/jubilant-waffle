export interface LicensedModelManifest {
  id: string;
  url: string;
  sourceUrl: string;
  license: string;
  attribution: string;
  version: string;
  checksum: string;
  reviewedAt: string;
  medicalReviewer: string;
  lodUrls?: string[];
}
