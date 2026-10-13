import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigation } from "react-router-dom";
import { Activity, Info, Menu, Type } from "lucide-react";
import { routes } from "../router";
import { Directory } from "../../components/navigation/Directory";
import { Spotlight } from "../../components/navigation/Spotlight";
import { usePreferences } from "../../store/preferences";
export const disclaimer =
  "本平台仅用于医学教育、科研与临床思维训练。实际诊断、治疗、处方和用药决策，必须由具备资质的医务人员依据现行指南及患者具体情况作出。";
export function Layout() {
  const [menu, setMenu] = useState(false);
  const [large, setLarge] = useState(false);
  const language = usePreferences((s) => s.language);
  const toggleLanguage = usePreferences((s) => s.toggleLanguage);
  const en = language === "en";
  const location = useLocation();
  const navigation = useNavigation();
  useEffect(() => {
    document.documentElement.style.fontSize = large ? "18px" : "16px";
  }, [large]);
  useEffect(() => {
    document.querySelector<HTMLElement>("#main")?.focus();
    setMenu(false);
  }, [location.pathname]);
  useEffect(() => {
    document.documentElement.lang = en ? "en" : "zh-CN";
  }, [en]);
  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        {en ? "Skip to content" : "跳至内容"}
      </a>
      <header className="app-header">
        <NavLink to="/" className="brand" aria-label="Medical 3D 首页">
          <Activity aria-hidden="true" />
          Clinical <span>Atlas</span>
        </NavLink>
        <nav
          aria-label={en ? "Main navigation" : "主导航"}
          className={menu ? "navigation open" : "navigation"}
        >
          {routes.map(([path, label], i) => (
            <NavLink key={path} to={path} end onClick={() => setMenu(false)}>
              {en
                ? [
                    "Home",
                    "3D anatomy",
                    "Physiology",
                    "Pathology",
                    "Diagnosis",
                    "Treatment",
                    "Cases",
                  ][i]
                : label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <Spotlight />
          <button
            className="icon-button language-toggle"
            onClick={toggleLanguage}
            aria-label={en ? "切换为中文" : "Switch to English"}
          >
            {en ? "中" : "EN"}
          </button>
          <button
            className="icon-button"
            aria-label={en ? "Larger text" : "放大字体"}
            aria-pressed={large}
            onClick={() => setLarge((v) => !v)}
          >
            <Type size={19} />
          </button>
          <button
            className="icon-button menu-toggle"
            aria-label={en ? "Open navigation" : "展开导航"}
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            <Menu />
          </button>
        </div>
      </header>
      <div className="workspace-shell">
        <Directory />
        <main id="main" tabIndex={-1}>
          {navigation.state === "loading" && (
            <p role="status">
              {en ? "Loading learning module…" : "正在加载学习模块…"}
            </p>
          )}
          {en && location.pathname !== "/" && (
            <p className="notice">
              English version not yet available for this module. Original
              Chinese content is retained; review status is unchanged.
            </p>
          )}
          <Outlet />
        </main>
      </div>
      <footer>
        <Info size={22} aria-hidden="true" />
        <p>
          {en
            ? "For medical education and learning only. Not for real-patient diagnosis, treatment or prescribing decisions."
            : disclaimer}
        </p>
      </footer>
    </div>
  );
}
