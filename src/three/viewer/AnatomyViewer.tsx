import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CanvasTexture, Plane, Vector3, DoubleSide, FrontSide } from "three";
import { stepCamera } from "./camera";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { sceneObjects } from "../anatomy/scene";
import { useViewer } from "../../store/viewer";

class ViewerBoundary extends Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <p role="alert" className="viewer-fallback">
        此设备无法启动 WebGL。仍可通过结构列表操作选择、可见性与透明度。
      </p>
    ) : (
      this.props.children
    );
  }
}
function Scene() {
  const controls = useRef<OrbitControlsImpl>(null);
  const restored = useRef(false);
  const processedCommand = useRef(useViewer.getState().cameraCommand.sequence);
  const { camera, invalidate, gl } = useThree();
  const selected = useViewer((s) => s.selected);
  const hovered = useViewer((s) => s.hovered);
  const visibility = useViewer((s) => s.visibility);
  const opacity = useViewer((s) => s.opacity);
  const labels = useViewer((s) => s.labels);
  const command = useViewer((s) => s.cameraCommand);
  const select = useViewer((s) => s.select);
  const hover = useViewer((s) => s.hover);
  const clipping = useViewer((s) => s.clipping);
  const saveView = () => {
    if (!controls.current || !restored.current) return;
    useViewer
      .getState()
      .saveCamera({
        position: camera.position.toArray(),
        target: controls.current.target.toArray(),
      });
    gl.domElement.dataset.cameraPosition = camera.position
      .toArray()
      .map((value) => value.toFixed(4))
      .join(",");
    gl.domElement.dataset.cameraTarget = controls.current.target
      .toArray()
      .map((value) => value.toFixed(4))
      .join(",");
  };
  useEffect(() => {
    if (!controls.current) return;
    const snapshot = useViewer.getState().cameraSnapshot;
    camera.position.fromArray(snapshot?.position ?? [5, 3.8, 7]);
    controls.current.target.fromArray(snapshot?.target ?? [0, 0.7, 0]);
    restored.current = true;
    controls.current.update();
    saveView();
    invalidate();
    return () => {
      useViewer.getState().hover(null);
    };
  }, [camera, invalidate]);
  const planes = useMemo(
    () =>
      clipping.enabled
        ? [
            new Plane(
              new Vector3(
                clipping.axis === "x" ? 1 : 0,
                clipping.axis === "y" ? 1 : 0,
                clipping.axis === "z" ? 1 : 0,
              ),
              -clipping.position,
            ),
          ]
        : [],
    [clipping],
  );
  useEffect(() => {
    if (!controls.current) return;
    if (processedCommand.current === command.sequence) return;
    processedCommand.current = command.sequence;
    const target = sceneObjects.find(
      (o) => o.id === useViewer.getState().selected,
    )!;
    if (command.type === "reset") {
      camera.position.set(5, 3.8, 7);
      controls.current.target.set(0, 0.7, 0);
    } else if (command.type === "focus") {
      const [x, y, z] = target.position;
      camera.position.set(x + 2.5, y + 2, z + 4);
      controls.current.target.set(x, y, z);
    } else {
      const next = stepCamera(
        camera.position,
        controls.current.target,
        command.type,
      );
      camera.position.copy(next.position);
      controls.current.target.copy(next.target);
    }
    controls.current.update();
    invalidate();
    gl.domElement.dataset.cameraPosition = camera.position
      .toArray()
      .map((value) => value.toFixed(4))
      .join(",");
  }, [command, camera, invalidate, gl]);
  return (
    <>
      <color attach="background" args={["#edf1f5"]} />
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 6, 5]} intensity={3} />
      <gridHelper args={[24, 24, "#b6c3cf", "#d9e0e7"]} />
      {sceneObjects.map(
        (o) =>
          visibility[o.id] && (
            <group key={o.id} position={[...o.position]}>
              <mesh
                name={o.id}
                onClick={(e) => {
                  if (
                    planes.some((plane) => plane.distanceToPoint(e.point) < 0)
                  )
                    return;
                  e.stopPropagation();
                  select(o.id);
                }}
                onPointerOver={(e) => {
                  if (
                    planes.some((plane) => plane.distanceToPoint(e.point) < 0)
                  )
                    return;
                  e.stopPropagation();
                  hover(o.id);
                }}
                onPointerOut={() => hover(null)}
                rotation={
                  o.shape === "torus" ? [-Math.PI / 2, 0, 0] : [0, 0, 0]
                }
              >
                {o.shape === "sphere" ? (
                  <sphereGeometry args={[0.85, 32, 24]} />
                ) : o.shape === "torus" ? (
                  <torusGeometry args={[0.65, 0.25, 20, 48]} />
                ) : (
                  <cylinderGeometry args={[0.65, 0.65, 2, 32]} />
                )}
                <meshStandardMaterial
                  clippingPlanes={planes}
                  side={clipping.enabled ? DoubleSide : FrontSide}
                  color={o.color}
                  metalness={0.25}
                  roughness={0.32}
                  transparent={opacity[o.id] < 1}
                  opacity={opacity[o.id]}
                  depthWrite={opacity[o.id] === 1}
                  emissive={o.color}
                  emissiveIntensity={
                    hovered === o.id ? 0.4 : selected === o.id ? 0.15 : 0
                  }
                />
              </mesh>
              {labels && !clipping.enabled && <SceneLabel name={o.name} />}
            </group>
          ),
      )}
      <OrbitControls
        ref={controls}
        makeDefault
        minDistance={1.5}
        maxDistance={30}
        enablePan
        enableDamping={false}
        onChange={saveView}
      />
    </>
  );
}
function SceneLabel({ name }: { name: string }) {
  // Avoid Drei Html's nested-root teardown warning under React 19 StrictMode.
  // Native billboard labels have a matching keyboard/screen-reader DOM tree.
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 80;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 256, 80);
    ctx.strokeStyle = "#b6c3cf";
    ctx.lineWidth = 3;
    ctx.strokeRect(1, 1, 254, 78);
    ctx.fillStyle = "#243444";
    ctx.font = '32px "Microsoft YaHei", sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, 128, 40);
    return new CanvasTexture(canvas);
  }, [name]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <sprite position={[0, 1.4, 0]} scale={[1.3, 0.4, 1]}>
      <spriteMaterial map={texture} depthTest={false} />
    </sprite>
  );
}
export default function AnatomyViewer() {
  return (
    <ViewerBoundary>
      <Canvas
        gl={{
          preserveDrawingBuffer: import.meta.env.DEV,
          localClippingEnabled: true,
        }}
        camera={{ position: [5, 3.8, 7], fov: 45 }}
        frameloop="demand"
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          gl.domElement.dataset.ready = "true";
        }}
        fallback={
          <p className="viewer-fallback" role="status">
            WebGL 不可用。请使用支持 WebGL 的浏览器，或通过列表查看占位对象。
          </p>
        }
        aria-label="交互式技术占位几何体视口"
      >
        <Scene />
      </Canvas>
    </ViewerBoundary>
  );
}
