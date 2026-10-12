import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigation } from "react-router-dom";
import { Activity, Info, Menu, Type } from "lucide-react";
import { routes } from "../router";
export const disclaimer =
  "本平台仅用于医学教育、科研与临床思维训练。实际诊断、治疗、处方和用药决策，必须由具备资质的医务人员依据现行指南及患者具体情况作出。";
export function Layout() {
  const [menu, setMenu] = useState(false);
  const [large, setLarge] = useState(false);
  const location = useLocation();
  const navigation = useNavigation();
  useEffect(() => {
    document.documentElement.style.fontSize = large ? "18px" : "16px";
  }, [large]);
  useEffect(() => {
    document.querySelector<HTMLElement>("#main")?.focus();
  }, [location.pathname]);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        跳至内容
      </a>
      <header className="app-header">
        <NavLink to="/" className="brand" aria-label="Medical 3D 首页">
          <Activity aria-hidden="true" />
          Medical <span>3D</span>
        </NavLink>
        <nav
          aria-label="主导航"
          className={menu ? "navigation open" : "navigation"}
        >
          {routes.map(([path, label]) => (
            <NavLink key={path} to={path} end onClick={() => setMenu(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            aria-label="放大字体"
            aria-pressed={large}
            onClick={() => setLarge((v) => !v)}
          >
            <Type size={19} />
          </button>
          <button
            className="icon-button menu-toggle"
            aria-label="展开导航"
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            <Menu />
          </button>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {navigation.state === "loading" && <p role="status">正在加载模块…</p>}
        <Outlet />
      </main>
      <footer>
        <Info size={22} aria-hidden="true" />
        <p>{disclaimer}</p>
      </footer>
    </div>
  );
}
