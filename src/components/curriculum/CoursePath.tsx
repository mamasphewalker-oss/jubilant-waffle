import { useState } from "react";
import { Link } from "react-router-dom";
import { audienceLabels, curriculum } from "../../curriculum/catalog";
import { audienceSchema, type Audience } from "../../curriculum/schema";

export function CoursePath() {
  const [audience, setAudience] = useState<Audience>("student");
  const [reflected, setReflected] = useState<string[]>([]);
  return (
    <section
      className="course-path panel"
      aria-labelledby="course-path-heading"
    >
      <h2 id="course-path-heading">系统课程路径</h2>
      <p>
        现代医学为主框架，按五阶段建立课程。以下是学习目标与讨论设计；临床内容、病例和规范治疗资料仍待补充与审核。
      </p>
      <label className="course-audience">
        学习者身份
        <select
          value={audience}
          onChange={(event) =>
            setAudience(audienceSchema.parse(event.target.value))
          }
        >
          {audienceSchema.options.map((role) => (
            <option key={role} value={role}>
              {audienceLabels[role]}
            </option>
          ))}
        </select>
      </label>
      <p aria-live="polite">
        已记录自查：{reflected.length} / {curriculum.length}
        。仅当前页面有效，不代表课程完成或临床能力认证。
      </p>
      <ol className="course-stages">
        {curriculum.map((stage, index) => (
          <li key={stage.id}>
            <h3>
              {index + 1}. {stage.title}
            </h3>
            <p className="course-status">
              {stage.readiness === "demo"
                ? "教学模型原型 · 非真实人体模型"
                : "课程框架 · 医学内容待补充"}
            </p>
            <ul>
              {stage.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
            <p>
              <strong>{audienceLabels[audience]}任务：</strong>
              {stage.activities[audience]}
            </p>
            <details>
              <summary>教师讨论与自查问题</summary>
              <p>{stage.discussion}</p>
              <p>{stage.selfCheck}</p>
            </details>
            <nav
              className="course-resources"
              aria-label={`${stage.title}学习入口`}
            >
              {stage.resources.map((resource) => (
                <Link key={resource.path} className="button" to={resource.path}>
                  {resource.label}
                </Link>
              ))}
            </nav>
            <label className="course-check">
              <input
                type="checkbox"
                checked={reflected.includes(stage.id)}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setReflected((previous) =>
                    checked
                      ? [...previous.filter((id) => id !== stage.id), stage.id]
                      : previous.filter((id) => id !== stage.id),
                  );
                }}
              />
              我已阅读第 {index + 1} 阶段自查问题
            </label>
          </li>
        ))}
      </ol>
      <button
        className="button"
        disabled={reflected.length === 0}
        onClick={() => setReflected([])}
      >
        重置自查记录
      </button>
    </section>
  );
}
