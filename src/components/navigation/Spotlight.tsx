import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { kindLabels, searchCatalog } from "../../app/catalog";
import { usePreferences } from "../../store/preferences";
export function Spotlight() {
  const language = usePreferences((s) => s.language);
  const en = language === "en";
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const results = searchCatalog(query, pathname);
  const open = () => {
    if (dialog.current?.open) return;
    opener.current = document.activeElement as HTMLElement;
    setQuery("");
    setActive(0);
    dialog.current?.showModal();
    input.current?.focus();
  };
  const close = () => dialog.current?.close();
  const choose = (path?: string) => {
    if (path) {
      close();
      navigate(path);
    }
  };
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  useEffect(() => {
    dialog.current
      ?.querySelector(`[data-result="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);
  return (
    <>
      <button
        className="search-trigger"
        onClick={open}
        aria-label={en ? "Search atlas" : "搜索图谱"}
      >
        <Search size={17} />
        <span>{en ? "Search" : "搜索"}</span>
        <kbd>Ctrl K</kbd>
      </button>
      <dialog
        className="spotlight"
        ref={dialog}
        aria-labelledby="search-title"
        onClose={() => opener.current?.focus()}
      >
        <div className="spotlight-heading">
          <h2 id="search-title">
            {en ? "Search learning atlas" : "搜索学习图谱"}
          </h2>
          <button
            className="icon-button"
            onClick={close}
            aria-label={en ? "Close search" : "关闭搜索"}
          >
            <X size={18} />
          </button>
        </div>
        <input
          ref={input}
          type="search"
          role="combobox"
          aria-expanded="true"
          aria-controls="search-results"
          aria-autocomplete="list"
          aria-activedescendant={
            results.length ? `result-${results[active]?.id}` : undefined
          }
          aria-label={en ? "Search terms" : "搜索关键词"}
          placeholder={en ? "Anatomy, CCS, chest pain…" : "解剖、CCS、胸痛…"}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) =>
                Math.max(
                  0,
                  Math.min(
                    results.length - 1,
                    i + (e.key === "ArrowDown" ? 1 : -1),
                  ),
                ),
              );
            }
            if (e.key === "Enter") {
              e.preventDefault();
              choose(results[active]?.path);
            }
          }}
        />
        <p className="search-help">
          {en
            ? "Local catalog only · Unreviewed content remains unavailable"
            : "仅检索本地目录 · 未核验医学内容不开放"}
        </p>
        <ul
          id="search-results"
          role="listbox"
          aria-label={en ? "Search results" : "搜索结果"}
        >
          {results.map((node, i) => (
            <li
              key={node.id}
              id={`result-${node.id}`}
              role="option"
              aria-selected={active === i}
              aria-disabled={!node.path}
              data-result={i}
              onMouseMove={() => setActive(i)}
              onClick={() => choose(node.path)}
            >
              <span className="result-kind">
                {kindLabels[node.kind][en ? 1 : 0]}
              </span>
              <span>
                <strong>{node[language]}</strong>
                <small>{node[en ? "zh" : "en"]}</small>
              </span>
              <small>
                {node.path
                  ? en
                    ? "Prototype ↗"
                    : "原型 ↗"
                  : en
                    ? "Pending review"
                    : "待核验"}
              </small>
            </li>
          ))}
        </ul>
        <p role="status" className="search-help">
          {results.length
            ? `${results.length} ${en ? "results · ↑ ↓ select · Enter open · Esc close" : "项结果 · ↑ ↓ 选择 · Enter 打开 · Esc 关闭"}`
            : en
              ? "No matching entries. Try CCS or anatomy."
              : "没有匹配条目，可尝试 CCS 或解剖。"}
        </p>
      </dialog>
    </>
  );
}
