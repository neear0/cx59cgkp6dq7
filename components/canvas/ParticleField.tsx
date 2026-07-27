"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 12000;

/**
 * One continuous particle system behind the whole page.
 * Scroll morphs it through four formations:
 * galaxy spiral → trefoil knot → double helix → ring.
 * Cursor interaction is camera parallax only — no per-particle push.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uPR;

  attribute vec3 aKnot;
  attribute vec3 aHelix;
  attribute vec3 aRing;
  attribute float aSeed;

  varying float vSeed;
  varying float vFade;

  void main() {
    float p = uProgress * 3.0;
    vec3 pos = position;
    pos = mix(pos, aKnot,  smoothstep(0.0, 1.0, p));
    pos = mix(pos, aHelix, smoothstep(1.0, 2.0, p));
    pos = mix(pos, aRing,  smoothstep(2.0, 3.0, p));

    // ambient drift so the structure feels alive
    pos.x += sin(uTime * 0.9 + aSeed * 43.0) * 0.13;
    pos.y += cos(uTime * 0.7 + aSeed * 71.0) * 0.13;
    pos.z += sin(uTime * 0.55 + aSeed * 91.0) * 0.13;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = mix(0.9, 2.3, fract(aSeed * 7.31));
    gl_PointSize = size * uPR * 12.0 / max(0.001, -mv.z);

    vSeed = aSeed;
    vFade = smoothstep(15.0, 4.5, -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vSeed;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.12, d);

    // brand palette — mostly quiet grey, ~30 % of points carry the gradient
    vec3 grey   = vec3(0.88);
    vec3 pink   = vec3(1.000, 0.498, 0.655);
    vec3 purple = vec3(0.694, 0.369, 1.000);
    vec3 blue   = vec3(0.141, 0.357, 1.000);

    float t = fract(vSeed * 3.7);
    vec3 accent = t < 0.5
      ? mix(pink, purple, t * 2.0)
      : mix(purple, blue, (t - 0.5) * 2.0);

    float isAccent = step(0.7, fract(vSeed * 11.3));
    vec3 col = mix(grey, accent, isAccent * 0.95);

    gl_FragColor = vec4(col, alpha * vFade * 0.9);
  }
`;

function buildAttributes() {
  const galaxy = new Float32Array(COUNT * 3);
  const knot = new Float32Array(COUNT * 3);
  const helix = new Float32Array(COUNT * 3);
  const ring = new Float32Array(COUNT * 3);
  const seed = new Float32Array(COUNT);

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;

    // formation 1 — three-armed galaxy spiral facing the camera
    const garm = i % 3;
    const gt = Math.pow(Math.random(), 0.65);
    const gang =
      gt * Math.PI * 3.4 + garm * ((Math.PI * 2) / 3) + (Math.random() - 0.5) * 0.4;
    const grad = 0.25 + gt * 2.7;
    galaxy[i3] = Math.cos(gang) * grad;
    galaxy[i3 + 1] = Math.sin(gang) * grad * 0.85;
    galaxy[i3 + 2] = (Math.random() - 0.5) * (0.55 - gt * 0.35);

    // formation 2 — trefoil torus knot
    const kt = Math.random() * Math.PI * 2;
    const ks = 0.72;
    knot[i3] =
      (Math.sin(kt) + 2 * Math.sin(2 * kt)) * ks + (Math.random() - 0.5) * 0.2;
    knot[i3 + 1] =
      (Math.cos(kt) - 2 * Math.cos(2 * kt)) * ks * 0.8 + (Math.random() - 0.5) * 0.2;
    knot[i3 + 2] = -Math.sin(3 * kt) * ks + (Math.random() - 0.5) * 0.2;

    // formation 3 — double helix
    const t = Math.random() * Math.PI * 6;
    const arm = i % 2 === 0 ? 0 : Math.PI;
    helix[i3] = (t / (Math.PI * 6) - 0.5) * 8 + (Math.random() - 0.5) * 0.1;
    helix[i3 + 1] = Math.sin(t + arm) * 1.1 + (Math.random() - 0.5) * 0.12;
    helix[i3 + 2] = Math.cos(t + arm) * 1.1 + (Math.random() - 0.5) * 0.12;

    // formation 4 — converging ring
    const a = Math.random() * Math.PI * 2;
    const tube = 0.28 * Math.sqrt(Math.random());
    const b = Math.random() * Math.PI * 2;
    ring[i3] = (2.1 + tube * Math.cos(b)) * Math.cos(a);
    ring[i3 + 1] = (2.1 + tube * Math.cos(b)) * Math.sin(a) * 0.9;
    ring[i3 + 2] = tube * Math.sin(b);

    seed[i] = Math.random();
  }

  return { galaxy, knot, helix, ring, seed };
}

/**
 * Side-to-side flow: centered in the hero, then drifting to the opposite
 * side of each section's content — right (services) → left (approach) →
 * right (process) → back to center (contact). Returns -1..1.
 */
function sideCurve(p: number) {
  const keys = [0, 1, -1, 1, 0];
  const seg = Math.min(3, Math.floor(p * 4));
  const t = p * 4 - seg;
  const s = t * t * (3 - 2 * t);
  return keys[seg] + (keys[seg + 1] - keys[seg]) * s;
}

function Particles() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const progress = useRef(0);

  const attrs = useMemo(buildAttributes, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uPR: { value: 1 },
    }),
    []
  );

  useFrame((state, delta) => {
    const mat = material.current;
    if (!mat) return;

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const target = max > 0 ? window.scrollY / max : 0;
    progress.current += (target - progress.current) * Math.min(1, delta * 3);

    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uProgress.value = progress.current;
    mat.uniforms.uPR.value = state.gl.getPixelRatio();

    // cinematic camera: slow autonomous drift, no cursor influence
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.08) * 0.35;
    state.camera.position.y = Math.cos(t * 0.06) * 0.25;
    state.camera.position.z = 6 - progress.current * 0.8;
    state.camera.lookAt(0, 0, 0);

    if (group.current) {
      group.current.rotation.y = t * 0.09 + progress.current * 1.4;
      group.current.rotation.x = progress.current * 0.5;
      group.current.rotation.z = t * 0.045;

      // lateral drift, scaled to the visible width so it works on mobile too
      const halfH =
        Math.tan(((state.camera as THREE.PerspectiveCamera).fov / 2) * (Math.PI / 180)) *
        state.camera.position.z;
      const halfW = halfH * (state.size.width / state.size.height);
      group.current.position.x = sideCurve(progress.current) * halfW * 0.55;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[attrs.galaxy, 3]} />
          <bufferAttribute attach="attributes-aKnot" args={[attrs.knot, 3]} />
          <bufferAttribute attach="attributes-aHelix" args={[attrs.helix, 3]} />
          <bufferAttribute attach="attributes-aRing" args={[attrs.ring, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[attrs.seed, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function ParticleField() {
  // mount the canvas client-side only — R3F's wrapper markup differs
  // between server and client and trips hydration otherwise
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      {mounted && (
        <Canvas
          dpr={[1, 1.8]}
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        >
          <Particles />
        </Canvas>
      )}
    </div>
  );
}
