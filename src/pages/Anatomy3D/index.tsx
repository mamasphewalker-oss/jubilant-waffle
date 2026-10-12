import { lazy, Suspense } from "react";
import { Focus, RotateCcw, Layers, MousePointer2 } from "lucide-react";
import { sceneObjects, type ObjectId } from "../../three/anatomy/scene";
import { useViewer } from "../../store/viewer";
import { CameraControls } from "../../components/viewer/CameraControls";
const AnatomyViewer = lazy(() => import("../../three/viewer/AnatomyViewer"));
export default function Anatomy3D() {
  const selected = useViewer((s) => s.selected);
  const visibility = useViewer((s) => s.visibility);
  const opacity = useViewer((s) => s.opacity);
  const hovered = useViewer((s) => s.hovered);
  const labels = useViewer((s) => s.labels);
  const select = useViewer((s) => s.select);
  const toggle = useViewer((s) => s.toggle);
  const camera = useViewer((s) => s.camera);
  const setOpacity = useViewer((s) => s.setOpacity);
  const setLabels = useViewer((s) => s.setLabels);
  const isolate = useViewer((s) => s.isolate);
  const restoreIsolation = useViewer((s) => s.restoreIsolation);
  const isolationSnapshot = useViewer((s) => s.isolationSnapshot);
  const clipping = useViewer((s) => s.clipping);
  const setClipping = useViewer((s) => s.setClipping);
  const object = sceneObjects.find((o) => o.id === selected)!;
  return (
    <>
      <div className="page-heading">
        <h1>3D 交互实验室</h1>
        <p>技术占位几何体 · 非人体解剖模型</p>
      </div>
      <div className="anatomy-workspace">
        <aside className="panel structure-tree">
          <h2>
            <Layers size={18} />
            技术占位层
          </h2>
          <ul aria-label="基础结构树">
            <li>
              <details open>
                <summary>占位对象 / demo</summary>
                <ul>
                  {sceneObjects.map((o) => (
                    <li key={o.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={visibility[o.id]}
                          onChange={() => toggle(o.id)}
                          aria-label={`显示${o.name}`}
                        />
                      </label>
                      <button
                        className={
                          selected === o.id ? "tree-item selected" : "tree-item"
                        }
                        onClick={() => select(o.id)}
                        aria-pressed={selected === o.id}
                      >
                        {o.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
          <p className="muted">
            真实解剖层级将在模型许可证与医学审查完成后接入。
          </p>
        </aside>
        <section className="viewport" aria-label="3D 场景">
          <div className="viewport-toolbar">
            <span>透视视图</span>
            <button
              className="icon-button"
              onClick={() => camera("reset")}
              aria-label="重置镜头"
            >
              <RotateCcw size={18} />
            </button>
          </div>
          <Suspense fallback={<p role="status">正在加载 3D 模块…</p>}>
            <AnatomyViewer />
          </Suspense>
          <div className="viewport-hint">
            <MousePointer2 size={14} />
            拖动旋转 · 滚轮缩放 · 右键平移
          </div>
        </section>
        <aside className="panel inspector">
          <h2>结构属性</h2>
          <label>
            选择对象
            <select
              value={selected}
              onChange={(e) => select(e.target.value as ObjectId)}
            >
              {sceneObjects.map((o) => (
                <option value={o.id} key={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </label>
          <label className="check-row">
            <input
              type="checkbox"
              checked={visibility[selected]}
              onChange={() => toggle(selected)}
            />
            显示选中对象
          </label>
          <label>
            不透明度{" "}
            <output aria-label="不透明度数值">
              {opacity[selected].toFixed(1)}
            </output>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={opacity[selected]}
              onChange={(e) => setOpacity(Number(e.target.value))}
              aria-label="不透明度"
            />
          </label>
          <label className="check-row">
            <input
              type="checkbox"
              checked={labels}
              onChange={(e) => setLabels(e.target.checked)}
            />
            显示标签
          </label>
          <div className="object-meta">
            <p>
              对象 ID <strong>{object.id}</strong>
            </p>
            <p>
              位置 (X, Y, Z)
              <br />
              <code>{object.position.join(" / ")}</code>
            </p>
            <p>
              数据状态 <strong className="gold">demo</strong>
            </p>
          </div>
          <button
            className="button primary"
            disabled={!visibility[selected]}
            onClick={() => camera("focus")}
          >
            <Focus size={18} />
            聚焦到对象
          </button>
          <button className="button" onClick={() => camera("reset")}>
            <RotateCcw size={18} />
            重置视图
          </button>
          <button className="button" onClick={isolate}>
            仅显示选中对象
          </button>
          <button
            className="button"
            disabled={!isolationSnapshot}
            onClick={restoreIsolation}
          >
            恢复隔离前可见性
          </button>
          <details className="clipping-controls">
            <summary>技术剖切演示</summary>
            <p>
              世界坐标平面剖切占位几何体，无切面封盖，不代表人体断层。启用时暂隐藏场景标签。
            </p>
            <label className="check-row">
              <input
                type="checkbox"
                checked={clipping.enabled}
                onChange={(event) =>
                  setClipping({ enabled: event.target.checked })
                }
              />
              启用剖切
            </label>
            <label>
              剖切轴
              <select
                value={clipping.axis}
                onChange={(event) =>
                  setClipping({ axis: event.target.value as "x" | "y" | "z" })
                }
              >
                <option value="x">X</option>
                <option value="y">Y</option>
                <option value="z">Z</option>
              </select>
            </label>
            <label>
              剖切位置{" "}
              <output aria-label="剖切位置数值">
                {clipping.position.toFixed(1)}
              </output>
              <input
                aria-label="剖切位置"
                type="range"
                min="-4"
                max="4"
                step="0.1"
                value={clipping.position}
                disabled={!clipping.enabled}
                onChange={(event) =>
                  setClipping({ position: Number(event.target.value) })
                }
              />
            </label>
          </details>
          <CameraControls />
          <p className="muted" role="status">
            当前选择：{object.name}
            {hovered
              ? ` · 悬停：${sceneObjects.find((o) => o.id === hovered)?.name}`
              : ""}
          </p>
        </aside>
      </div>
    </>
  );
}
