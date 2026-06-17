"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

const FROSTING = ["#f7c5d3", "#fbdfe6", "#ffd6e0"];
const DRIP = "#8c374a";
const SPRINKLE_COLORS = ["#b14a5f", "#e7a0a0", "#f6e27a", "#7fc7a5", "#8aa7e0"];

type TierProps = {
  y: number;
  radius: number;
  height: number;
  color: string;
};

/** A single frosted cake tier with a chocolate "drip" disc on top. */
function Tier({ y, radius, height, color }: TierProps) {
  return (
    <group position={[0, y, 0]}>
      {/* sponge / frosting body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 64]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      {/* chocolate drip rim sitting on top of the tier */}
      <mesh position={[0, height / 2 - 0.02, 0]} castShadow>
        <cylinderGeometry args={[radius + 0.04, radius + 0.04, 0.12, 64]} />
        <meshStandardMaterial color={DRIP} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Candle({ angle, radius, color }: { angle: number; radius: number; color: string }) {
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  return (
    <group position={[x, 1.28, z]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.42, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* flame */}
      <mesh position={[0, 0.33, 0]}>
        <coneGeometry args={[0.05, 0.16, 16]} />
        <meshStandardMaterial
          color="#ffcf6b"
          emissive="#ff9d2f"
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/** Deterministic pseudo-random so sprinkles don't jump between renders. */
function rand(seed: number) {
  const x = Math.sin(seed * 99.13) * 43758.5453;
  return x - Math.floor(x);
}

function Sprinkles() {
  const items = [];
  const rings = [
    { y: -0.07, r: 1.32, count: 10 },
    { y: 0.62, r: 0.9, count: 8 },
  ];
  let seed = 1;
  for (const ring of rings) {
    for (let i = 0; i < ring.count; i++) {
      const a = (i / ring.count) * Math.PI * 2 + rand(seed++) * 0.4;
      const x = Math.cos(a) * ring.r;
      const z = Math.sin(a) * ring.r;
      items.push(
        <mesh
          key={`${ring.y}-${i}`}
          position={[x, ring.y, z]}
          rotation={[rand(seed++) * Math.PI, rand(seed++) * Math.PI, rand(seed++) * Math.PI]}
          castShadow
        >
          <capsuleGeometry args={[0.022, 0.1, 4, 8]} />
          <meshStandardMaterial
            color={SPRINKLE_COLORS[i % SPRINKLE_COLORS.length]}
            roughness={0.4}
          />
        </mesh>,
      );
    }
  }
  return <>{items}</>;
}

export function CakeModel() {
  const group = useRef<Group>(null);

  // Gentle continuous turntable rotation.
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={group} position={[0, -0.4, 0]} scale={1.1}>
      {/* cake stand / plate */}
      <mesh position={[0, -1.12, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.05, 2.15, 0.14, 64]} />
        <meshStandardMaterial color="#fff8f0" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, -1.32, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="#f0e3d6" roughness={0.4} />
      </mesh>

      {/* three stacked tiers */}
      <Tier y={-0.55} radius={1.55} height={0.85} color={FROSTING[0]} />
      <Tier y={0.2} radius={1.05} height={0.65} color={FROSTING[1]} />
      <Tier y={0.78} radius={0.62} height={0.5} color={FROSTING[2]} />

      <Sprinkles />

      {/* candles around the top tier */}
      {[0, 1, 2, 3, 4].map((i) => (
        <Candle
          key={i}
          angle={(i / 5) * Math.PI * 2}
          radius={0.38}
          color={["#e7a0a0", "#f6e27a", "#8aa7e0", "#7fc7a5", "#fff"][i]}
        />
      ))}

      {/* cherry on top */}
      <mesh position={[0, 1.18, 0]} castShadow>
        <sphereGeometry args={[0.17, 32, 32]} />
        <meshStandardMaterial color="#c62f43" roughness={0.25} />
      </mesh>
      <mesh position={[0.06, 1.36, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.015, 0.015, 0.28, 8]} />
        <meshStandardMaterial color="#5d3a1a" roughness={0.6} />
      </mesh>
    </group>
  );
}
