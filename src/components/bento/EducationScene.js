"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Billboard,
  Html,
  Line,
  PerspectiveCamera,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Box3, Group, MathUtils, Vector3 } from "three";
import gsap from "gsap";
import { cn } from "../../lib/utils";
import {
  FALLBACK_CAMERA,
  resolveCameraStep,
  resolveNodePoints,
  timelineData,
} from "../../data/educationTimeline";

export const EDUCATION_MODEL_URL = "/assets/sceen.glb";

/** Sisi terpanjang diorama setelah dinormalisasi — jadi acuan semua koordinat timeline. */
const NORMALIZED_SIZE = 10;
const FLY_DURATION = 1.65;
const FLY_EASE = "power3.inOut";
const CREAM = "#f5f0e8";
const LABEL_FADE = 8;

/**
 * drei memetakan Html transform dengan rasio (distanceFactor / 400) unit dunia
 * per piksel. 0.85 ≈ 1 px = 0.0021 unit, cukup besar untuk dibaca di viewport.
 */
const HTML_SCALE = 0.85;

const PIN_SIZE = 0.055;
const PIN_SQUARE = [
  [-PIN_SIZE, -PIN_SIZE, 0],
  [PIN_SIZE, -PIN_SIZE, 0],
  [PIN_SIZE, PIN_SIZE, 0],
  [-PIN_SIZE, PIN_SIZE, 0],
  [-PIN_SIZE, -PIN_SIZE, 0],
];

export function preloadEducationModel() {
  useGLTF.preload(EDUCATION_MODEL_URL);
}

function subscribeToVisibility(onChange) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function PaintingModel() {
  const { scene } = useGLTF(EDUCATION_MODEL_URL);

  const model = useMemo(() => {
    const inner = scene.clone(true);
    const pivot = new Group();
    pivot.add(inner);

    const full = new Box3().setFromObject(pivot);
    const fullSize = full.getSize(new Vector3());

    // Piringan tanah & dinding langit diabaikan dari pusat fokus supaya objek
    // lukisan (jam / meja) tetap di origin.
    const focus = new Box3().makeEmpty();
    const meshBox = new Box3();
    const meshSize = new Vector3();

    inner.traverse((child) => {
      if (!child.isMesh) return;
      meshBox.setFromObject(child);
      meshBox.getSize(meshSize);
      if (meshSize.x > fullSize.x * 0.6 && meshSize.z > fullSize.z * 0.6) return;
      focus.union(meshBox);
    });

    const subject = focus.isEmpty() ? full : focus;
    const subjectCenter = subject.getCenter(new Vector3());
    const scale =
      NORMALIZED_SIZE / Math.max(fullSize.x, fullSize.y, fullSize.z, 0.0001);

    inner.position.set(-subjectCenter.x, -subject.min.y, -subjectCenter.z);
    pivot.scale.setScalar(scale);

    return pivot;
  }, [scene]);

  useEffect(
    () => () => {
      model.clear();
    },
    [model],
  );

  return <primitive object={model} />;
}

function SceneLights() {
  // Material model unlit (tekstur bake), tapi sedikit ambient/directional
  // membantu part non-unlit dan menjaga scene tidak terasa gelap.
  return (
    <>
      <ambientLight intensity={1.15} />
      <hemisphereLight args={["#f5f0e8", "#1a1210", 0.55]} />
      <directionalLight position={[3.5, 5.5, 2.8]} intensity={0.85} />
      <directionalLight position={[-2.8, 2.2, -1.8]} intensity={0.35} />
      <directionalLight position={[0.5, 3.5, 4]} intensity={0.4} />
    </>
  );
}

/**
 * Saat kartu mengembang, ukuran parent berubah tiap frame. Komponen ini
 * menyamakan camera.aspect dengan ukuran DOM supaya lukisan tidak gepeng.
 * Drawing buffer tetap diurus R3F (termasuk DPR).
 */
function AdaptiveViewport() {
  const { camera, gl } = useThree();

  useFrame(() => {
    const parent = gl.domElement.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = parent.clientHeight;
    if (height < 2) return;

    const aspect = width / height;
    if (Math.abs(camera.aspect - aspect) > 0.0008) {
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

function setLineOpacity(object, value) {
  if (!object) return;

  const apply = (material) => {
    if (!material) return;
    material.transparent = true;
    material.opacity = value;
    material.needsUpdate = true;
  };

  apply(object.material);
  object.traverse?.((child) => apply(child.material));
}

function TimelineNode({ step, index, active, reduceMotion }) {
  const htmlRef = useRef(null);
  const lineRef = useRef(null);
  const pinFillRef = useRef(null);
  const pinLineRef = useRef(null);
  const opacity = useRef(active && reduceMotion ? 1 : 0);

  const { anchorPos, labelPos, cameraPos, labelSide } = useMemo(
    () => resolveNodePoints(step, index),
    [index, step],
  );

  const { start, end, yaw } = useMemo(() => {
    const from = new Vector3(...anchorPos);
    const to = new Vector3(...labelPos);
    const dir = to.clone().sub(from);
    const distance = dir.length();
    if (distance > 0.0001) dir.multiplyScalar(1 / distance);

    return {
      start: from.addScaledVector(dir, PIN_SIZE * 1.2).toArray(),
      end: labelPos,
      yaw: Math.atan2(cameraPos[0] - labelPos[0], cameraPos[2] - labelPos[2]),
    };
  }, [anchorPos, cameraPos, labelPos]);

  useFrame((_, delta) => {
    const target = active ? 1 : 0;
    const next = reduceMotion
      ? target
      : MathUtils.damp(opacity.current, target, LABEL_FADE, delta);
    opacity.current = next;

    setLineOpacity(lineRef.current, next);
    setLineOpacity(pinLineRef.current, next);

    const pinFill = pinFillRef.current;
    if (pinFill) pinFill.opacity = next * 0.72;

    if (htmlRef.current) {
      htmlRef.current.style.opacity = String(next);
      htmlRef.current.style.visibility = next < 0.02 ? "hidden" : "visible";
    }
  });

  const isLeft = labelSide === "left";

  return (
    <group>
      <Billboard position={anchorPos}>
        <group scale={active ? 1.15 : 1}>
          <mesh renderOrder={20}>
            <planeGeometry args={[PIN_SIZE * 2, PIN_SIZE * 2]} />
            <meshBasicMaterial
              ref={pinFillRef}
              color="#050505"
              transparent
              opacity={0}
              depthTest={false}
              toneMapped={false}
            />
          </mesh>
          <Line
            ref={pinLineRef}
            points={PIN_SQUARE}
            color={CREAM}
            lineWidth={1.5}
            transparent
            opacity={0}
            depthTest={false}
            renderOrder={21}
          />
        </group>
      </Billboard>

      <Line
        ref={lineRef}
        points={[start, end]}
        color={CREAM}
        lineWidth={1.35}
        dashed
        dashSize={0.055}
        gapSize={0.038}
        transparent
        opacity={0}
        depthTest={false}
        renderOrder={18}
      />

      <Html
        transform
        center={false}
        distanceFactor={HTML_SCALE}
        position={end}
        rotation={[0, yaw, 0]}
        pointerEvents="none"
        zIndexRange={[50, 0]}
        occlude={false}
      >
        <div
          ref={htmlRef}
          className="w-max select-none whitespace-nowrap"
          style={{
            opacity: 0,
            visibility: "hidden",
            textAlign: isLeft ? "right" : "left",
            transform: isLeft ? "translate(-100%, -42%)" : "translate(10px, -42%)",
            textShadow: "0 1px 18px rgba(0,0,0,0.92)",
          }}
        >
          <span className="block font-outfit text-[13px] font-medium uppercase leading-none tracking-[0.22em] text-brand-cream/90">
            {step.year}
          </span>

          <h3 className="mb-0 mt-[8px] font-instrument text-[38px] font-normal leading-[0.95] tracking-[-0.01em] text-brand-cream">
            {step.title}
          </h3>

          <p className="mb-0 mt-[6px] font-outfit text-[15px] leading-tight text-brand-cream/75">
            {step.subtitle}
          </p>
        </div>
      </Html>
    </group>
  );
}

function TimelineCamera({ activeIndex, steps, reduceMotion, onDepart, onArrive }) {
  const cameraRef = useRef(null);
  const first = resolveCameraStep(steps[0] ?? FALLBACK_CAMERA);
  const anchor = useRef(new Vector3(...first.cameraPos));
  const target = useRef(new Vector3(...first.targetPos));
  const settled = useRef(false);
  const onArriveRef = useRef(onArrive);
  const onDepartRef = useRef(onDepart);

  useEffect(() => {
    onArriveRef.current = onArrive;
    onDepartRef.current = onDepart;
  });

  useEffect(() => {
    const stop = resolveCameraStep(steps[activeIndex] ?? steps[0]);
    const [camX, camY, camZ] = stop.cameraPos;
    const [targetX, targetY, targetZ] = stop.targetPos;

    if (!settled.current || reduceMotion) {
      settled.current = true;
      anchor.current.set(camX, camY, camZ);
      target.current.set(targetX, targetY, targetZ);
      onArriveRef.current?.(activeIndex);
      return undefined;
    }

    onDepartRef.current?.(activeIndex);

    const tweens = [
      gsap.to(anchor.current, {
        x: camX,
        y: camY,
        z: camZ,
        duration: FLY_DURATION,
        ease: FLY_EASE,
        overwrite: true,
        onComplete: () => onArriveRef.current?.(activeIndex),
      }),
      gsap.to(target.current, {
        x: targetX,
        y: targetY,
        z: targetZ,
        duration: FLY_DURATION,
        ease: FLY_EASE,
        overwrite: true,
      }),
    ];

    return () => tweens.forEach((tween) => tween.kill());
  }, [activeIndex, reduceMotion, steps]);

  useFrame((state) => {
    const camera = cameraRef.current;
    if (!camera) return;

    const elapsed = state.clock.elapsedTime;
    const swayX = reduceMotion ? 0 : Math.sin(elapsed * 0.3) * 0.035;
    const swayY = reduceMotion ? 0 : Math.cos(elapsed * 0.22) * 0.02;

    camera.position.set(
      anchor.current.x + swayX,
      anchor.current.y + swayY,
      anchor.current.z,
    );
    camera.lookAt(target.current);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={38}
      near={0.05}
      far={80}
      position={first.cameraPos}
    />
  );
}

function PreviewCamera({ reduceMotion, steps }) {
  const cameraRef = useRef(null);
  const first = resolveCameraStep(steps[0] ?? FALLBACK_CAMERA);
  const base = useRef(new Vector3(...first.cameraPos));
  const target = useRef(new Vector3(...first.targetPos));

  useFrame((state) => {
    const camera = cameraRef.current;
    if (!camera) return;

    const swing = reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.14) * 0.2;
    const offsetX = base.current.x - target.current.x;
    const offsetZ = base.current.z - target.current.z;
    const cos = Math.cos(swing);
    const sin = Math.sin(swing);

    camera.position.set(
      target.current.x + offsetX * cos - offsetZ * sin,
      base.current.y,
      target.current.z + offsetX * sin + offsetZ * cos,
    );
    camera.lookAt(target.current);
  });

  return (
    <PerspectiveCamera ref={cameraRef} makeDefault fov={36} near={0.1} far={80} />
  );
}

function LoadingReadout() {
  const { active, progress } = useProgress();
  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="block h-px w-16 bg-brand-red" />
        <span className="font-outfit text-[10px] font-medium uppercase tracking-[0.28em] text-neutral-500">
          loading scene {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}

export default function EducationScene({
  activeIndex = 0,
  steps = timelineData,
  mode = "focus",
  reduceMotion = false,
  paused = false,
  showProgress = false,
  onArrive,
  className,
}) {
  const isPreview = mode === "preview";
  const [shownIndex, setShownIndex] = useState(activeIndex);
  const documentHidden = useSyncExternalStore(
    subscribeToVisibility,
    () => document.hidden,
    () => false,
  );

  const handleDepart = () => setShownIndex(-1);
  const handleArrive = (index) => {
    setShownIndex(index);
    onArrive?.(index);
  };

  return (
    <div className={cn("absolute inset-0", className)}>
      <Canvas
        flat
        frameloop={paused || documentHidden ? "never" : "always"}
        dpr={isPreview ? [1, 1.4] : [1, 2]}
        resize={{ debounce: 0, scroll: false }}
        gl={{
          alpha: true,
          antialias: !isPreview,
          powerPreference: "high-performance",
          toneMappingExposure: 1.15,
        }}
        style={{ width: "100%", height: "100%", display: "block" }}
        className="!h-full !w-full"
      >
        <AdaptiveViewport />
        <SceneLights />

        <Suspense fallback={null}>
          <PaintingModel />

          {!isPreview && shownIndex >= 0 && steps[shownIndex] ? (
            <TimelineNode
              key={`${steps[shownIndex].year}-${steps[shownIndex].title}`}
              step={steps[shownIndex]}
              index={shownIndex}
              active
              reduceMotion={reduceMotion}
            />
          ) : null}
        </Suspense>

        {isPreview ? (
          <PreviewCamera reduceMotion={reduceMotion} steps={steps} />
        ) : (
          <TimelineCamera
            activeIndex={activeIndex}
            steps={steps}
            reduceMotion={reduceMotion}
            onDepart={handleDepart}
            onArrive={handleArrive}
          />
        )}
      </Canvas>

      {showProgress ? <LoadingReadout /> : null}
    </div>
  );
}
