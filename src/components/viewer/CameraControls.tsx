import { useViewer } from "../../store/viewer";
import type { CameraStep } from "../../three/viewer/camera";

const steps: { label: string; command: CameraStep }[] = [
  { label: "向左旋转", command: "rotate-left" },
  { label: "向右旋转", command: "rotate-right" },
  { label: "向上旋转", command: "rotate-up" },
  { label: "向下旋转", command: "rotate-down" },
  { label: "放大场景", command: "zoom-in" },
  { label: "缩小场景", command: "zoom-out" },
  { label: "向左平移", command: "pan-left" },
  { label: "向右平移", command: "pan-right" },
  { label: "向上平移", command: "pan-up" },
  { label: "向下平移", command: "pan-down" },
];
export function CameraControls() {
  const camera = useViewer((s) => s.camera);
  return (
    <details className="camera-controls">
      <summary>键盘与触屏镜头控制</summary>
      <p id="camera-key-help">
        聚焦控制区后，方向键旋转，Shift + 方向键平移，+ / −
        缩放。按钮也支持触屏。
      </p>
      <div
        className="camera-step-grid"
        role="group"
        aria-label="镜头键盘控制区"
        aria-describedby="camera-key-help"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const rotations: Record<string, CameraStep> = {
            ArrowLeft: "rotate-left",
            ArrowRight: "rotate-right",
            ArrowUp: "rotate-up",
            ArrowDown: "rotate-down",
          };
          const pans: Record<string, CameraStep> = {
            ArrowLeft: "pan-left",
            ArrowRight: "pan-right",
            ArrowUp: "pan-up",
            ArrowDown: "pan-down",
          };
          const command =
            event.key === "+" || event.key === "="
              ? "zoom-in"
              : event.key === "-"
                ? "zoom-out"
                : (event.shiftKey ? pans : rotations)[event.key];
          if (command) {
            event.preventDefault();
            camera(command);
          }
        }}
      >
        {steps.map((step) => (
          <button
            key={step.command}
            className="button"
            onClick={() => camera(step.command)}
          >
            {step.label}
          </button>
        ))}
      </div>
    </details>
  );
}
