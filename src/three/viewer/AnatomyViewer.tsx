import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CanvasTexture } from "three";
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
  const { camera, invalidate } = useThree();
  const selected = useViewer((s) => s.selected);
  const hovered = useViewer((s) => s.hovered);
  const visibility = useViewer((s) => s.visibility);
  const opacity = useViewer((s) => s.opacity);
  const labels = useViewer((s) => s.labels);
  const command = useViewer((s) => s.cameraCommand);
  const select = useViewer((s) => s.select);
  const hover = useViewer((s) => s.hover);
  useEffect(() => {
    if (!controls.current) return;
    const target = sceneObjects.find(
      (o) => o.id === useViewer.getState().selected,
    )!;
    if (command.type === "reset") {
      camera.position.set(5, 3.8, 7);
      controls.current.target.set(0, 0.7, 0);
    } else {
      const [x, y, z] = target.position;
      camera.position.set(x + 2.5, y + 2, z + 4);
      controls.current.target.set(x, y, z);
    }
    controls.current.update();
    invalidate();
  }, [command, camera, invalidate]);
  return (
    <>
      <color attach="background" args={["#061825"]} />
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 6, 5]} intensity={3} />
      <gridHelper args={[24, 24, "#285260", "#173343"]} />
      {sceneObjects.map(
        (o) =>
          visibility[o.id] && (
            <group key={o.id} position={[...o.position]}>
              <mesh
                name={o.id}
                onClick={(e) => {
                  e.stopPropagation();
                  select(o.id);
                }}
                onPointerOver={(e) => {
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
              {labels && <SceneLabel name={o.name} />}
            </group>
          ),
      )}
      <OrbitControls
        ref={controls}
        makeDefault
        minDistance={1.5}
        maxDistance={30}
        enablePan
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
    ctx.fillStyle = "#0b2538";
    ctx.fillRect(0, 0, 256, 80);
    ctx.strokeStyle = "#315466";
    ctx.lineWidth = 3;
    ctx.strokeRect(1, 1, 254, 78);
    ctx.fillStyle = "#edf4fa";
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
        gl={{ preserveDrawingBuffer: import.meta.env.DEV }}
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
