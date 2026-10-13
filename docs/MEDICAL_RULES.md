# Medical rules

This file is the short policy index for agents. The detailed source of truth remains [evidence-policy.md](evidence-policy.md), [medical-data-model.md](medical-data-model.md), [anatomy-model-policy.md](anatomy-model-policy.md), and [AGENTS.md](../AGENTS.md).

- Medical source discovery is not claim verification. Record the issuing organization, exact source/version/year, access date, intended population and scope. A qualified reviewer must check that the source supports each claim before `reviewed` status.
- Unknown or unavailable facts stay `needs-review` / `pendingVerification`. Never fill guideline years, thresholds, recommendations, doses, contraindications or mechanisms from model memory.
- Modern biomedical evidence and traditional theory remain separate. TCM cases, formulas and herb associations never become automatic treatment or prescription rules.
- Do not use real-patient identifiable information. A public dataset still needs license, privacy, de-identification and medical review. Exclude pediatric cases from production.
- No automatic diagnosis, individualized treatment, prescribing or patient-specific dosing. Keep the visible education-only disclaimer.
- Distinguish measured, published, estimated and simulated values. Label teaching assumptions and technical geometry as such.

Before a clinical case can become production teaching content, complete: source verification → license/privacy review → de-identification verification → medical review → teaching adaptation → structured case → approval.
