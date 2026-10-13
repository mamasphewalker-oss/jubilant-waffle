import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePreferences } from "../../store/preferences";

const futureSystems = [
  ["呼吸", "Respiratory"],
  ["内分泌", "Endocrine"],
  ["消化", "Digestive"],
  ["泌尿", "Urinary"],
  ["男性生殖", "Male reproductive"],
  ["女性生殖", "Female reproductive"],
] as const;

/** A navigation silhouette only: it contains no organs, sex-specific anatomy, or anatomical mapping. */
export function BodyAtlas() {
  const en = usePreferences((s) => s.language) === "en";

  return (
    <section className="body-atlas" aria-labelledby="body-atlas-title">
      <div className="body-atlas-figure">
        <p className="eyebrow">HUMAN SYSTEMS / 01</p>
        <h2 id="body-atlas-title">
          {en ? "Explore the human body" : "人体系统总览"}
        </h2>
        <div
          className="body-silhouette"
          role="img"
          aria-label={
            en
              ? "Abstract full-body silhouette; no organs or anatomical structures shown"
              : "抽象全身轮廓；未展示器官或解剖结构"
          }
        >
          <svg viewBox="0 0 300 500" aria-hidden="true" focusable="false">
            <circle className="body-head" cx="150" cy="53" r="34" />
            <path
              className="body-form"
              d="M116 105 Q150 92 184 105 L202 218 Q196 240 178 235 L179 211 L190 313 Q191 328 176 330 L167 330 L170 461 Q170 480 154 480 Q139 480 138 463 L130 342 L122 463 Q121 480 105 480 Q90 479 92 462 L96 330 L88 330 Q73 328 74 313 L84 211 L81 235 Q63 240 58 218 L45 133 Q42 116 57 111 Q72 105 79 121 L99 190 L101 119 Q102 108 116 105 Z"
            />
            <path
              className="body-detail"
              d="M102 194 Q150 212 198 194 M101 327 Q150 344 179 327"
            />
            <path className="body-axis" d="M150 100 L150 322" />
          </svg>
          <span className="body-label">
            {en ? "SYSTEM INDEX" : "系统入口示意"}
          </span>
        </div>
        <p className="body-caption">
          {en
            ? "Navigation illustration only. No anatomical model or internal structures are shown."
            : "导航轮廓示意，不是人体解剖模型；不包含器官或内部结构。"}
        </p>
      </div>

      <div className="body-atlas-systems">
        <div className="body-atlas-heading">
          <div>
            <p className="eyebrow">{en ? "SYSTEM DIRECTORY" : "系统目录"}</p>
            <h3>{en ? "Choose a learning system" : "选择学习系统"}</h3>
          </div>
          <span className="system-count">01 / 07</span>
        </div>
        <Link className="body-system-current" to="/anatomy">
          <span className="system-index-number">01</span>
          <span className="body-system-copy">
            <strong>{en ? "Cardiovascular" : "循环系统"}</strong>
            <small>
              {en
                ? "Current focus · viewer prototype"
                : "当前重点 · 查看器技术原型"}
            </small>
          </span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <div
          className="body-system-list"
          aria-label={en ? "Systems in development" : "建设中的系统"}
        >
          {futureSystems.map(([zh, english], index) => (
            <div className="body-system-future" key={english}>
              <span className="system-index-number">
                {String(index + 2).padStart(2, "0")}
              </span>
              <span className="body-system-copy">
                <strong>{en ? english : zh}</strong>
                <small>{en ? "In Development" : "建设中"}</small>
              </span>
            </div>
          ))}
        </div>
        <p className="body-model-status">
          {en
            ? "Full-body 3D anatomy is not yet available. It will appear after asset licensing and medical review."
            : "全身 3D 解剖模型尚未接入；待资产许可与医学审核后再开放。"}
        </p>
      </div>
    </section>
  );
}
