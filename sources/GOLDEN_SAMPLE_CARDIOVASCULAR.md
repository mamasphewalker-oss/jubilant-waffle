# Cardiovascular Golden Sample resource queue

This is an acquisition/planning queue, not a claim that a sample exists or has been clinically approved. “CCS” is provisionally treated as chronic coronary syndrome; confirm the intended expansion/scope before building content. No patient data, pediatric cases or assets are included.

| # | Resource | status | priority | preferredSource | alternativeSource | licenseStatus | medicalVerificationStatus | localAssetStatus |
|---:|---|---|---|---|---|---|---|---|
| 1 | Normal heart anatomy GLB | queued | P1 | HRA/HuBMAP record with explicit asset rights | Z-Anatomy only if exact component cleared | pending_license_review | pendingVerification | absent |
| 2 | Coronary artery structures | queued | P1 | Asset-level licensed atlas/model | Original reviewed model with manifest | pending_license_review | pendingVerification | absent |
| 3 | Valves, chambers and great vessels | queued | P1 | HRA/HuBMAP or separately licensed atlas | Original model with medical review | pending_license_review | pendingVerification | absent |
| 4 | Coronary perfusion territories | queued | P1 | Peer-reviewed original source plus reviewed original diagram/model | Current authoritative Chinese cardiology guidance | pending_license_review | pendingVerification | absent |
| 5 | Cardiac cycle / flow animation | queued | P2 | Original simulation with sourced parameters | Licensed teaching animation | pending_license_review | pendingVerification | absent |
| 6 | Atherosclerosis macropathology | queued | P2 | Official university teaching collection | TCIA collection with verified terms | pending_license_review | pendingVerification | absent |
| 7 | Plaque micro/histopathology | queued | P2 | University/open pathology image with per-image license | TCIA pathology collection | pending_license_review | pendingVerification | absent |
| 8 | CCS clinical case | queued | P1 | Synthetic case from current verified Chinese guideline | Explicitly licensed, de-identified non-pediatric source | pending_license_review | pendingVerification | absent |
| 9 | Chest-pain differential case | queued | P1 | Synthetic, medically reviewed case | Official teaching resource with reuse terms | pending_license_review | pendingVerification | absent |
| 10 | 12-lead ECG | queued | P1 | Explicitly licensed 12-lead dataset record | Original synthetic waveform after clinician review | pending_license_review | pendingVerification | absent |
| 11 | Coronary CTA / angiography example | queued | P2 | TCIA/IDC collection with verified per-case terms | Institution-hosted open educational case | pending_license_review | pendingVerification | absent |
| 12 | Echocardiography / other necessary imaging | queued | P2 | Explicitly licensed institutional teaching case | TCIA/IDC where modality and rights fit | pending_license_review | pendingVerification | absent |
| 13 | Laboratory test structure | queued | P1 | Current Chinese guideline / national standard | Formal current textbook | pending_license_review | pendingVerification | absent |
| 14 | Chinese CCS guideline | queued | P1 | Current Chinese Medical Association/specialty publication | NHC or formal journal primary publication | pending_license_review | pendingVerification | absent |
| 15 | Chinese lipid guideline | queued | P1 | Current authoritative Chinese issuing organization | Formal journal publication | pending_license_review | pendingVerification | absent |
| 16 | Hypertension and related guidelines | queued | P2 | Current authoritative Chinese issuing organization | Formal journal publication | pending_license_review | pendingVerification | absent |
| 17 | Drug label / dose source | queued | P1 | Current regulator-approved label and official Chinese guidance | Official professional drug label | pending_license_review | pendingVerification | absent |
| 18 | Cardiovascular risk score | queued | P2 | Original derivation/validation study and current Chinese guidance | Validated local version with licensed questionnaire | pending_license_review | pendingVerification | absent |
| 19 | TCM-related textbook/guideline/standard | queued | P3 | Current official textbook/standard with traceable edition | Explicitly issued guideline/consensus | pending_license_review | pendingVerification | absent |
| 20 | Chinese-English terminology mappings | queued | P2 | Authoritative open terminology source | Licensed SNOMED CT/MedCT mapping after rights review | pending_license_review | pendingVerification | absent |

## Import and review gates

Each acquired file gets its own `assetId`, original record ID, source, author, license/URL, attribution, modifications, offline/redistribution permission, medical-review state, import date and SHA-256 in [ASSET_REGISTRY.json](ASSET_REGISTRY.json). Each medical claim or guideline gets a separate `sourceId` in [SOURCE_REGISTRY.json](SOURCE_REGISTRY.json), exact edition/year/population/scope and reviewer/date. The queue entry itself never acts as evidence. Keep real patient identifiers out and exclude pediatric cases from production. Drug doses, diagnostic thresholds and risk scores remain unusable until source and qualified review are complete.
