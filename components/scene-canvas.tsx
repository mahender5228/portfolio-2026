"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html, Loader } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import { RoadTripScene } from "./road-trip-scene";

function SirenAudio() {
  const [enabled, setEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      gainRef.current?.gain.linearRampToValueAtTime(
        0,
        (audioContextRef.current?.currentTime ?? 0) + 0.08,
      );
      return;
    }

    const startSiren = async () => {
      if (!audioContextRef.current) {
        const context = new window.AudioContext();
        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.type = "triangle";
        oscillator.frequency.value = 760;
        gain.gain.value = 0.008;

        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();

        audioContextRef.current = context;
        oscillatorRef.current = oscillator;
        gainRef.current = gain;
      }

      const context = audioContextRef.current;
      const oscillator = oscillatorRef.current;

      if (!context || !oscillator) {
        return;
      }

      await context.resume();

      if (intervalRef.current !== null) {
        return;
      }

      let high = false;
      intervalRef.current = window.setInterval(() => {
        const now = context.currentTime;
        oscillator.frequency.cancelScheduledValues(now);
        oscillator.frequency.linearRampToValueAtTime(high ? 760 : 980, now + 0.16);
        high = !high;
      }, 360);
    };

    void startSiren();

    const resumeOnInteract = () => {
      void startSiren();
    };

    window.addEventListener("pointerdown", resumeOnInteract, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", resumeOnInteract);

      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (!enabled) {
        return;
      }

      oscillatorRef.current?.stop();
      oscillatorRef.current = null;
      gainRef.current = null;
      void audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, [enabled]);

  return (
    <button
      className="fixed bottom-5 right-5 z-30 rounded-full border border-white/20 bg-black/45 px-4 py-2 text-sm font-medium text-white/85 shadow-lg backdrop-blur-md transition hover:bg-black/55"
      type="button"
      onClick={() => setEnabled((value) => !value)}
    >
      {enabled ? "Siren On" : "Siren Off"}
    </button>
  );
}

export function SceneCanvas() {
  return (
    <>
      <SirenAudio />
      <div className="fixed inset-0">
        <Canvas
          camera={{ position: [0, 6, 14], fov: 42 }}
          dpr={[1, 1.2]}
          gl={{ antialias: true, alpha: true }}
          shadows={false}
        >
          <color attach="background" args={["#020617"]} />
          <fog attach="fog" args={["#020617", 30, 90]} />

          <ambientLight intensity={1.1} />
          <directionalLight intensity={2.5} position={[10, 14, 8]} />
          <hemisphereLight
            intensity={0.8}
            color="#ffffff"
            groundColor="#1e293b"
          />

          <Suspense fallback={<Html center>Loading scene...</Html>}>
            <RoadTripScene />
            <Environment preset="sunset" />
          </Suspense>

          <EffectComposer>
            <Bloom
              mipmapBlur
              intensity={0.75}
              luminanceThreshold={0.28}
              luminanceSmoothing={0.42}
            />
          </EffectComposer>
        </Canvas>
      </div>

      <Loader />
    </>
  );
}
