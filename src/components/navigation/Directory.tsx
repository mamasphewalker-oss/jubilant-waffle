import { NavLink } from "react-router-dom";
import { useState } from "react";
import { catalog, type CatalogNode, type Language } from "../../app/catalog";
import { usePreferences } from "../../store/preferences";
function Branch({
  nodes,
  language,
}: {
  nodes: CatalogNode[];
  language: Language;
}) {
  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          {node.children ? (
            <details open>
              <summary>{node[language]}</summary>
              {node.path && (
                <NavLink to={node.path}>
                  {language === "zh" ? "打开交互原型" : "Open prototype"}
                </NavLink>
              )}
              <Branch nodes={node.children} language={language} />
            </details>
          ) : node.path ? (
            <NavLink to={node.path}>{node[language]}</NavLink>
          ) : (
            <span className="pending-item">
              {node[language]}
              <small>{language === "zh" ? "待核验" : "Pending review"}</small>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
export function Directory() {
  const language = usePreferences((s) => s.language);
  const [open, setOpen] = useState(
    () => window.matchMedia("(min-width: 961px)").matches,
  );
  return (
    <details
      className="directory"
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>{language === "zh" ? "学习目录" : "Learning directory"}</summary>
      <div className="directory-content">
        <p className="eyebrow">CARDIOVASCULAR / 01</p>
        <Branch nodes={catalog} language={language} />
        <p className="directory-note">
          {language === "zh"
            ? "当前入口为工程原型。待核验条目尚未开放医学内容。"
            : "Available routes are engineering prototypes. Pending entries contain no approved medical content."}
        </p>
      </div>
    </details>
  );
}
