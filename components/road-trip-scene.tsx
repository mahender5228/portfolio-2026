"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Outlines, Stars } from "@react-three/drei";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

import { Model as JimnyModel } from "./JimnyModel";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ZoneConfig = {
  name: string;
  center: [number, number, number];
  size: [number, number];
  color: string;
  accent: string;
  glow: string;
  lightColor: string;
  lightIntensity: number;
  feature: "plains" | "snow" | "jungle" | "delta" | "cliffs" | "coast" | "desert";
  rotation?: number;
};

const ZONES: ZoneConfig[] = [
  {
    name: "Hisar",
    center: [-26, 0.02, 18],
    size: [24, 18],
    color: "#d7a84d",
    accent: "#f6d77c",
    glow: "#ffb347",
    lightColor: "#ffbf69",
    lightIntensity: 1.8,
    feature: "plains",
    rotation: -0.18,
  },
  {
    name: "Himalayas",
    center: [-14, 3.25, 2],
    size: [22, 18],
    color: "#e7f1ff",
    accent: "#97d8ff",
    glow: "#7dd3fc",
    lightColor: "#a5f3fc",
    lightIntensity: 1.25,
    feature: "snow",
    rotation: 0.12,
  },
  {
    name: "Meghalaya",
    center: [0, 1.05, -14],
    size: [24, 18],
    color: "#2d6a4f",
    accent: "#74c69d",
    glow: "#bbf7d0",
    lightColor: "#86efac",
    lightIntensity: 1.15,
    feature: "jungle",
    rotation: 0.08,
  },
  {
    name: "Eastern Delta",
    center: [15, 0.4, -7],
    size: [24, 18],
    color: "#4ea8de",
    accent: "#90e0ef",
    glow: "#c4f1f9",
    lightColor: "#c084fc",
    lightIntensity: 1,
    feature: "delta",
    rotation: -0.16,
  },
  {
    name: "Kanyakumari",
    center: [18, 0.05, 13],
    size: [24, 18],
    color: "#26547c",
    accent: "#ffd166",
    glow: "#f9c74f",
    lightColor: "#fde68a",
    lightIntensity: 1.7,
    feature: "cliffs",
    rotation: 0.22,
  },
  {
    name: "Western Ghats",
    center: [1, 0.9, 28],
    size: [28, 18],
    color: "#3a86a8",
    accent: "#2ec4b6",
    glow: "#67e8f9",
    lightColor: "#7dd3fc",
    lightIntensity: 1.35,
    feature: "coast",
    rotation: -0.2,
  },
  {
    name: "Thar Desert",
    center: [-21, 0.04, 29],
    size: [28, 20],
    color: "#c0894b",
    accent: "#f2cc8f",
    glow: "#c084fc",
    lightColor: "#d8b4fe",
    lightIntensity: 0.95,
    feature: "desert",
    rotation: 0.1,
  },
];

function createJourneyCurve() {
  const curvePath = new THREE.CurvePath<THREE.Vector3>();

  curvePath.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(-30, 0.7, 20),
      new THREE.Vector3(-26, 1.2, 18),
      new THREE.Vector3(-22, 1.8, 14),
      new THREE.Vector3(-18, 2.8, 10),
    ),
  );

  curvePath.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(-18, 2.8, 10),
      new THREE.Vector3(-15, 4.8, 4),
      new THREE.Vector3(-12, 4.6, -1),
      new THREE.Vector3(-8, 3.1, -6),
    ),
  );

  curvePath.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(-8, 3.1, -6),
      new THREE.Vector3(-3, 1.5, -11),
      new THREE.Vector3(3, 1.1, -16),
      new THREE.Vector3(8, 0.8, -14),
    ),
  );

  curvePath.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(8, 0.8, -14),
      new THREE.Vector3(13, 0.5, -13),
      new THREE.Vector3(16, 0.55, -7),
      new THREE.Vector3(17, 0.35, -1),
    ),
  );

  curvePath.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(17, 0.35, -1),
      new THREE.Vector3(19, 0.3, 4),
      new THREE.Vector3(20, 0.5, 10),
      new THREE.Vector3(18, 0.7, 16),
    ),
  );

  curvePath.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(18, 0.7, 16),
      new THREE.Vector3(13, 0.9, 23),
      new THREE.Vector3(7, 1.4, 29),
      new THREE.Vector3(0, 1.8, 30),
    ),
  );

  curvePath.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 1.8, 30),
      new THREE.Vector3(-8, 1.7, 31),
      new THREE.Vector3(-16, 1.05, 31),
      new THREE.Vector3(-26, 0.6, 30),
    ),
  );

  return curvePath;
}

function FeatureCluster({
  feature,
  accent,
}: {
  feature: ZoneConfig["feature"];
  accent: string;
}) {
  const inkColor = "#111827";

  switch (feature) {
    case "plains":
      return (
        <>
          {[-5, -2, 1, 4].map((x, index) => (
            <mesh key={index} position={[x, 0.55, -1 + (index % 2) * 2]} castShadow>
              <coneGeometry args={[0.2, 2.6, 6]} />
              <meshToonMaterial color={accent} />
              <Outlines color={inkColor} thickness={0.03} />
            </mesh>
          ))}
        </>
      );
    case "snow":
      return (
        <>
          <mesh position={[-4, 2.6, 1]} castShadow>
            <coneGeometry args={[2.8, 6.2, 5]} />
            <meshToonMaterial color="#dbeafe" />
            <Outlines color={inkColor} thickness={0.03} />
          </mesh>
          <mesh position={[2.5, 2.2, -1.5]} castShadow>
            <coneGeometry args={[2.4, 5.4, 5]} />
            <meshToonMaterial color={accent} />
            <Outlines color={inkColor} thickness={0.03} />
          </mesh>
          <mesh position={[5, 1.7, 2.3]} castShadow>
            <coneGeometry args={[1.8, 4.6, 5]} />
            <meshToonMaterial color="#eff6ff" />
            <Outlines color={inkColor} thickness={0.03} />
          </mesh>
        </>
      );
    case "jungle":
      return (
        <>
          {[
            [-4, 1.3, -1],
            [-1, 1.5, 2],
            [2, 1.35, -2.5],
            [5, 1.2, 1.5],
          ].map((position, index) => (
            <group key={index} position={position as [number, number, number]}>
              <mesh castShadow position={[0, -0.7, 0]}>
                <cylinderGeometry args={[0.12, 0.2, 1.4, 8]} />
                <meshToonMaterial color="#5b3a29" />
                <Outlines color={inkColor} thickness={0.025} />
              </mesh>
              <mesh castShadow position={[0, 0.45, 0]}>
                <sphereGeometry args={[0.9, 10, 10]} />
                <meshToonMaterial color={accent} />
                <Outlines color={inkColor} thickness={0.03} />
              </mesh>
            </group>
          ))}
        </>
      );
    case "delta":
      return (
        <>
          <mesh position={[-3, 0.08, 1]} rotation={[-Math.PI / 2, 0.2, 0]}>
            <planeGeometry args={[7, 2.5]} />
            <meshToonMaterial color="#bde0fe" transparent opacity={0.9} />
            <Outlines color={inkColor} thickness={0.025} />
          </mesh>
          <mesh position={[4, 0.09, -1.5]} rotation={[-Math.PI / 2, -0.5, 0]}>
            <planeGeometry args={[6, 2]} />
            <meshToonMaterial color="#caf0f8" transparent opacity={0.85} />
            <Outlines color={inkColor} thickness={0.025} />
          </mesh>
          <mesh position={[1.5, 0.7, 2.2]} castShadow>
            <coneGeometry args={[0.35, 2.2, 6]} />
            <meshToonMaterial color={accent} />
            <Outlines color={inkColor} thickness={0.03} />
          </mesh>
        </>
      );
    case "cliffs":
      return (
        <>
          <mesh position={[-3.5, 1.2, 0]} castShadow>
            <boxGeometry args={[3.5, 2.4, 4]} />
            <meshToonMaterial color="#7f5539" />
            <Outlines color={inkColor} thickness={0.03} />
          </mesh>
          <mesh position={[2.8, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[4.5, 28]} />
            <meshToonMaterial color={accent} />
            <Outlines color={inkColor} thickness={0.025} />
          </mesh>
        </>
      );
    case "coast":
      return (
        <>
          <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0.45, 0]}>
            <planeGeometry args={[12, 4]} />
            <meshToonMaterial color="#90e0ef" transparent opacity={0.9} />
            <Outlines color={inkColor} thickness={0.025} />
          </mesh>
          {[-4, 0, 4].map((x, index) => (
            <mesh key={index} position={[x, 1.1, -2 + index]} castShadow>
              <coneGeometry args={[1.2, 3.2, 5]} />
              <meshToonMaterial color={accent} />
              <Outlines color={inkColor} thickness={0.03} />
            </mesh>
          ))}
        </>
      );
    case "desert":
      return (
        <>
          <mesh position={[-3, 0.8, 1.5]} castShadow>
            <sphereGeometry args={[2.2, 14, 10]} />
            <meshToonMaterial color={accent} />
            <Outlines color={inkColor} thickness={0.03} />
          </mesh>
          <mesh position={[3, 0.55, -1.5]} castShadow>
            <sphereGeometry args={[1.7, 14, 10]} />
            <meshToonMaterial color="#d6b06c" />
            <Outlines color={inkColor} thickness={0.03} />
          </mesh>
        </>
      );
  }
}

function TerrainZone({ zone }: { zone: ZoneConfig }) {
  return (
    <group position={zone.center} rotation-y={zone.rotation ?? 0}>
      <pointLight
        color={zone.lightColor}
        intensity={zone.lightIntensity}
        distance={32}
        decay={2}
        position={[0, 6, 0]}
      />

      <mesh receiveShadow rotation-x={-Math.PI / 2}>
        <planeGeometry args={zone.size} />
        <meshToonMaterial color={zone.color} />
        <Outlines color="#0f172a" thickness={0.025} />
      </mesh>

      <mesh position={[0, -0.02, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[Math.max(zone.size[0] * 0.2, 3), zone.size[0] * 0.65, 32]} />
        <meshBasicMaterial color={zone.glow} transparent opacity={0.12} />
      </mesh>

      <FeatureCluster feature={zone.feature} accent={zone.accent} />
    </group>
  );
}

function FloatingParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(
    () =>
      Array.from({ length: 64 }, (_, index) => ({
        x: THREE.MathUtils.randFloatSpread(90),
        y: THREE.MathUtils.randFloat(1.5, 16),
        z: THREE.MathUtils.randFloatSpread(95),
        scale: THREE.MathUtils.randFloat(0.04, 0.16),
        speed: THREE.MathUtils.randFloat(0.12, 0.45),
        drift: THREE.MathUtils.randFloat(0.08, 0.28),
        phase: index * 0.37,
      })),
    [],
  );

  useFrame((state) => {
    if (!meshRef.current) {
      return;
    }

    const time = state.clock.elapsedTime;

    particles.forEach((particle, index) => {
      dummy.position.set(
        particle.x + Math.sin(time * particle.drift + particle.phase) * 0.8,
        particle.y + Math.sin(time * particle.speed + particle.phase) * 0.6,
        particle.z + Math.cos(time * particle.drift + particle.phase) * 0.8,
      );
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(index, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particles.length]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#fef3c7" transparent opacity={0.75} />
    </instancedMesh>
  );
}

function BackgroundAtmosphere() {
  return (
    <group>
      <mesh position={[0, 42, -62]}>
        <sphereGeometry args={[18, 24, 24]} />
        <meshBasicMaterial color="#ffd166" transparent opacity={0.24} />
      </mesh>

      <mesh position={[26, 12, 12]}>
        <sphereGeometry args={[8, 24, 24]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.12} />
      </mesh>

      <mesh position={[-20, 20, 46]}>
        <sphereGeometry args={[12, 24, 24]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.09} />
      </mesh>

      <Stars
        radius={160}
        depth={80}
        count={900}
        factor={4}
        saturation={0}
        fade
        speed={0.25}
      />
    </group>
  );
}

function Track() {
  return (
    <group>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.08, 8]}>
        <planeGeometry args={[220, 220, 1, 1]} />
        <meshToonMaterial color="#0f172a" />
      </mesh>
    </group>
  );
}

function JimnyVehicle({
  curve,
  progress,
}: {
  curve: THREE.CurvePath<THREE.Vector3>;
  progress: MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const sirenLight = useRef<THREE.PointLight>(null);
  const cameraTarget = useRef(new THREE.Vector3());
  const tangentTarget = useRef(new THREE.Vector3());
  const lookAheadTarget = useRef(new THREE.Vector3());
  const rotationTarget = useRef(new THREE.Quaternion());
  const cameraOffset = useMemo(() => new THREE.Vector3(0, 4.8, -9), []);
  const { camera, clock } = useThree();

  useFrame((_, delta) => {
    const currentProgress = THREE.MathUtils.clamp(progress.current, 0, 0.999);
    const position = curve.getPointAt(currentProgress);
    const tangent = curve.getTangentAt(currentProgress).normalize();
    const sirenActive = currentProgress >= 0.02;

    tangentTarget.current.copy(tangent);
    lookAheadTarget.current.copy(position).addScaledVector(tangent, 4);

    if (group.current) {
      group.current.position.copy(position);
      rotationTarget.current.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        tangentTarget.current,
      );
      group.current.quaternion.slerp(
        rotationTarget.current,
        1 - Math.exp(-9 * delta),
      );
    }

    cameraTarget.current.copy(position).add(cameraOffset);
    camera.position.lerp(cameraTarget.current, 1 - Math.exp(-4 * delta));
    camera.lookAt(lookAheadTarget.current);

    if (sirenLight.current) {
      if (sirenActive) {
        const flash = Math.sin(clock.elapsedTime * 10);
        sirenLight.current.intensity = 80;
        sirenLight.current.color.set(flash >= 0 ? "#ff0000" : "#0000ff");
      } else {
        sirenLight.current.intensity = 0;
      }
    }
  });

  return (
    <group ref={group}>
      <group
        position={[0, 0.18, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.85}
      >
        <JimnyModel />
      </group>
      <pointLight
        ref={sirenLight}
        position={[0, 1, -5]}
        intensity={0}
        distance={20}
        decay={2}
      />
    </group>
  );
}

export function RoadTripScene() {
  const curve = useMemo(() => createJourneyCurve(), []);
  const progress = useRef(0);
  const targetProgress = useRef(0);

  useGSAP(() => {
    const animation = gsap.to(targetProgress, {
      current: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.4,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  useFrame((_, delta) => {
    progress.current = THREE.MathUtils.damp(
      progress.current,
      targetProgress.current,
      5.5,
      delta,
    );
  });

  return (
    <group>
      <BackgroundAtmosphere />
      <fog attach="fog" args={["#0b1120", 22, 125]} />
      <FloatingParticles />

      <Track />
      {ZONES.map((zone) => (
        <TerrainZone key={zone.name} zone={zone} />
      ))}

      <mesh receiveShadow position={[-30, 0.22, 20]}>
        <circleGeometry args={[2.8, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        <Outlines color="#f8fafc" thickness={0.03} />
      </mesh>

      <JimnyVehicle curve={curve} progress={progress} />
    </group>
  );
}
