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
  Html,
  Line,
  PerspectiveCamera,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Box3, CatmullRomCurve3, Group, MathUtils, Vector3 } from "three";
import gsap from "gsap";
import { cn } from "../../lib/utils";
import {
  FALLBACK_CAMERA,
  INITIAL_STEP_INDEX,
  resolveCameraStep,
  resolveNodePoints,
  timelineData,
} from "../../data/educationTimeline";

export const EDUCATION_MODEL_URL = "/assets/sceen.glb";

/** Sisi terpanjang diorama setelah dinormalisasi — jadi acuan semua koordinat timeline. */
const NORMALIZED_SIZE = 10;
const FLY_DURATION = 1.15;
const FLY_EASE = "power2.inOut";
const CREAM = "#f5f0e8";
const LABEL_FADE = 8;
const LOOK_YAW = 0.18;
const LOOK_PITCH = 0.1;
const LOOK_DAMP = 3.6;

/** Preview kartu: kotak kayu + jam, kamera agak ditarik supaya judul tetap kebaca. */
const PREVIEW_POSE = {
  cameraPos: [-0.55, 0.72, 2.55],
  targetPos: [-0.08, 0.62, 1.12],
};

/**
 * drei memetakan Html transform dengan rasio (distanceFactor / 400) unit dunia
 * per piksel. 0.85 ≈ 1 px = 0.0021 unit, cukup besar untuk dibaca di viewport.
 */
const HTML_SCALE = 0.85;
const LABEL_REF_DISTANCE = 3.05;

/** Titik jalur sedikit di depan kamera, ke arah look-at, supaya rute kebaca di viewport. */
const ROUTE_MIX = 0.36;
const ROUTE_LIFT = 0.1;
const ROUTE_ARCH = 0.18;
const ROUTE_SAMPLES = 96;
const ROUTE_TENSION = 0.28;
const ROUTE_DASH = 0.075;
const ROUTE_GAP = 0.048;

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

function routePoint(step, index, lastIndex) {
  const { cameraPos, targetPos } = resolveCameraStep(step);
  const arch = Math.sin((index / Math.max(lastIndex, 1)) * Math.PI) * ROUTE_ARCH;
  return new Vector3(
    MathUtils.lerp(cameraPos[0], targetPos[0], ROUTE_MIX),
    MathUtils.lerp(cameraPos[1], targetPos[1], ROUTE_MIX) + ROUTE_LIFT + arch,
    MathUtils.lerp(cameraPos[2], targetPos[2], ROUTE_MIX),
  );
}

function writeLinePoints(line, points) {
  if (!line?.geometry) return;
  if (!points || points.length < 2) {
    line.visible = false;
    return;
  }

  const positions = [];
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    positions.push(point.x, point.y, point.z);
  }

  line.visible = true;
  line.geometry.setPositions(positions);
  line.computeLineDistances();
}

function CameraRoute({ steps, progressRef }) {
  const solidRef = useRef(null);
  const dashRef = useRef(null);

  const sampled = useMemo(() => {
    if (steps.length < 2) return [];
    const lastIndex = steps.length - 1;
    const curve = new CatmullRomCurve3(
      steps.map((step, index) => routePoint(step, index, lastIndex)),
      false,
      "catmullrom",
      ROUTE_TENSION,
    );
    return curve.getSpacedPoints(ROUTE_SAMPLES);
  }, [steps]);

  const seed = sampled.length >= 2 ? [sampled[0], sampled[1]] : [
    [0, 0, 0],
    [0, 0.01, 0],
  ];

  useFrame(() => {
    if (sampled.length < 2) return;

    const last = sampled.length - 1;
    const split = Math.round(MathUtils.clamp(progressRef.current, 0, 1) * last);

    writeLinePoints(solidRef.current, split >= 1 ? sampled.slice(0, split + 1) : null);
    writeLinePoints(dashRef.current, split < last ? sampled.slice(split) : null);
  });

  if (sampled.length < 2) return null;

  return (
    <group>
      <Line
        ref={solidRef}
        points={seed}
        color={CREAM}
        lineWidth={1.45}
        transparent
        opacity={0.95}
        depthTest={false}
        depthWrite={false}
        frustumCulled={false}
        renderOrder={18}
      />
      <Line
        ref={dashRef}
        points={sampled}
        color={CREAM}
        lineWidth={1.3}
        dashed
        dashSize={ROUTE_DASH}
        gapSize={ROUTE_GAP}
        transparent
        opacity={0.72}
        depthTest={false}
        depthWrite={false}
        frustumCulled={false}
        renderOrder={17}
      />
    </group>
  );
}

function TimelineNode({ step, index, active, reduceMotion }) {
  const htmlRef = useRef(null);
  const opacity = useRef(active && reduceMotion ? 1 : 0);

  const { labelPos, cameraPos, labelSide, labelTone } = useMemo(
    () => resolveNodePoints(step, index),
    [index, step],
  );

  const { yaw, distanceFactor } = useMemo(() => {
    const cameraDistance = new Vector3(...cameraPos).distanceTo(
      new Vector3(...labelPos),
    );

    return {
      yaw: Math.atan2(cameraPos[0] - labelPos[0], cameraPos[2] - labelPos[2]),
      distanceFactor: MathUtils.clamp(
        HTML_SCALE * (cameraDistance / LABEL_REF_DISTANCE),
        0.22,
        1.05,
      ),
    };
  }, [cameraPos, labelPos]);

  useFrame((_, delta) => {
    const target = active ? 1 : 0;
    const next = reduceMotion
      ? target
      : MathUtils.damp(opacity.current, target, LABEL_FADE, delta);
    opacity.current = next;

    if (htmlRef.current) {
      htmlRef.current.style.opacity = String(next);
      htmlRef.current.style.visibility = next < 0.02 ? "hidden" : "visible";
    }
  });

  const isLeft = labelSide === "left";
  const isBright = labelTone === "bright";

  return (
    <group>
      <Html
        transform
        center={false}
        distanceFactor={distanceFactor}
        position={labelPos}
        rotation={[0, yaw, 0]}
        pointerEvents="none"
        zIndexRange={[50, 0]}
        occlude={false}
      >
        <div
          ref={htmlRef}
          className="hidden w-max max-w-[240px] select-none items-stretch gap-[10px] lg:flex sm:max-w-[280px]"
          style={{
            opacity: 0,
            visibility: "hidden",
            flexDirection: isLeft ? "row-reverse" : "row",
            transform: isLeft ? "translate(-100%, -42%)" : "translate(10px, -42%)",
            textShadow: isBright
              ? "-1px 0 0 rgba(12,8,6,0.9), 1px 0 0 rgba(12,8,6,0.9), 0 -1px 0 rgba(12,8,6,0.9), 0 1px 0 rgba(12,8,6,0.9), 0 2px 12px rgba(0,0,0,0.8)"
              : "0 0 1px rgba(0,0,0,0.85), 0 1px 14px rgba(0,0,0,0.78)",
          }}
        >
          <span
            aria-hidden
            className={
              isBright
                ? "mt-[3px] w-px shrink-0 self-stretch bg-brand-cream"
                : "mt-[3px] w-px shrink-0 self-stretch bg-brand-cream/80"
            }
          />

          <div style={{ textAlign: isLeft ? "right" : "left" }}>
            <span className="block font-outfit text-[13px] font-medium uppercase leading-none tracking-[0.22em] text-brand-cream">
              {step.year}
            </span>

            <span
              aria-hidden
              className={
                isBright
                  ? "mt-[9px] mb-[8px] block h-px w-8 bg-brand-cream"
                  : "mt-[9px] mb-[8px] block h-px w-8 bg-brand-cream/70"
              }
              style={{ marginLeft: isLeft ? "auto" : 0 }}
            />

            <h3 className="mb-0 mt-0 font-instrument text-[32px] font-normal leading-[0.95] tracking-[-0.01em] text-brand-cream sm:text-[38px]">
              {step.title}
            </h3>

            <p
              className={
                isBright
                  ? "mb-0 mt-[6px] font-outfit text-[15px] leading-tight text-brand-cream"
                  : "mb-0 mt-[6px] font-outfit text-[15px] leading-tight text-brand-cream/80"
              }
            >
              {step.subtitle}
            </p>
          </div>
        </div>
      </Html>
    </group>
  );
}

function TimelineCamera({
  activeIndex,
  steps,
  reduceMotion,
  onDepart,
  onArrive,
  pathProgress,
}) {
  const cameraRef = useRef(null);
  const opening = resolveCameraStep(
    steps[activeIndex] ?? steps[INITIAL_STEP_INDEX] ?? FALLBACK_CAMERA,
  );
  const openingRef = useRef(opening);
  const anchor = useRef(new Vector3(...opening.cameraPos));
  const target = useRef(new Vector3(...opening.targetPos));
  const settled = useRef(false);
  const onArriveRef = useRef(onArrive);
  const onDepartRef = useRef(onDepart);
  const pointerAim = useRef({ x: 0, y: 0 });
  const offset = useRef(new Vector3());
  const rightAxis = useRef(new Vector3());
  const worldUp = useRef(new Vector3(0, 1, 0));

  useEffect(() => {
    onArriveRef.current = onArrive;
    onDepartRef.current = onDepart;
  });

  useEffect(() => {
    const stop = resolveCameraStep(steps[activeIndex] ?? steps[INITIAL_STEP_INDEX]);
    const [camX, camY, camZ] = stop.cameraPos;
    const [targetX, targetY, targetZ] = stop.targetPos;

    const last = Math.max(steps.length - 1, 1);
    const nextProgress = activeIndex / last;

    if (!settled.current || reduceMotion) {
      settled.current = true;
      anchor.current.set(camX, camY, camZ);
      target.current.set(targetX, targetY, targetZ);
      if (pathProgress) pathProgress.current = nextProgress;
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

    if (pathProgress) {
      tweens.push(
        gsap.to(pathProgress, {
          current: nextProgress,
          duration: FLY_DURATION,
          ease: FLY_EASE,
          overwrite: true,
        }),
      );
    }

    return () => tweens.forEach((tween) => tween.kill());
  }, [activeIndex, pathProgress, reduceMotion, steps]);

  useFrame((state, delta) => {
    const camera = cameraRef.current;
    if (!camera) return;

    const aimX = reduceMotion ? 0 : state.pointer.x;
    const aimY = reduceMotion ? 0 : Math.max(state.pointer.y, -0.2);
    pointerAim.current.x = MathUtils.damp(pointerAim.current.x, aimX, LOOK_DAMP, delta);
    pointerAim.current.y = MathUtils.damp(pointerAim.current.y, aimY, LOOK_DAMP, delta);

    offset.current.copy(anchor.current).sub(target.current);
    offset.current.applyAxisAngle(worldUp.current, pointerAim.current.x * LOOK_YAW);

    rightAxis.current.crossVectors(worldUp.current, offset.current);
    if (rightAxis.current.lengthSq() > 0.0001) {
      rightAxis.current.normalize();
      offset.current.applyAxisAngle(rightAxis.current, pointerAim.current.y * LOOK_PITCH);
    }

    const elapsed = state.clock.elapsedTime;
    const swayX = reduceMotion ? 0 : Math.sin(elapsed * 0.3) * 0.035;
    const swayY = reduceMotion ? 0 : Math.cos(elapsed * 0.22) * 0.02;

    camera.position.copy(target.current).add(offset.current);
    camera.position.x += swayX;
    camera.position.y = Math.max(camera.position.y + swayY, anchor.current.y - 0.05);
    camera.lookAt(target.current);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={38}
      near={0.05}
      far={120}
      position={openingRef.current.cameraPos}
    />
  );
}

function PreviewCamera({ reduceMotion }) {
  const cameraRef = useRef(null);
  const base = useRef(new Vector3(...PREVIEW_POSE.cameraPos));
  const target = useRef(new Vector3(...PREVIEW_POSE.targetPos));

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
    <PerspectiveCamera ref={cameraRef} makeDefault fov={36} near={0.1} far={120} />
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
  activeIndex = INITIAL_STEP_INDEX,
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
  const pathProgress = useRef(activeIndex / Math.max(steps.length - 1, 1));
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

          {!isPreview ? <CameraRoute steps={steps} progressRef={pathProgress} /> : null}

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
          <PreviewCamera reduceMotion={reduceMotion} />
        ) : (
          <TimelineCamera
            activeIndex={activeIndex}
            steps={steps}
            reduceMotion={reduceMotion}
            onDepart={handleDepart}
            onArrive={handleArrive}
            pathProgress={pathProgress}
          />
        )}
      </Canvas>

      {showProgress ? <LoadingReadout /> : null}
    </div>
  );
}
