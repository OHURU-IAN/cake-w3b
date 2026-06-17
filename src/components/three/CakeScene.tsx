"use client";

import { Canvas } from "@react-three/fiber";
import { Float, PresentationControls, ContactShadows } from "@react-three/drei";
import { CakeModel } from "./CakeModel";

export default function CakeScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.6, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      {/* warm bakery lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-5, 3, -3]} intensity={0.7} color="#ffd9c2" />
      <pointLight position={[0, 2.2, 1.5]} intensity={6} color="#ffb38a" distance={6} />

      {/* drag to rotate, springs back to centre */}
      <PresentationControls
        global
        cursor
        speed={1.4}
        damping={0.3}
        polar={[-0.25, 0.45]}
        azimuth={[-0.9, 0.9]}
        snap
      >
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
          <CakeModel />
        </Float>
      </PresentationControls>

      <ContactShadows
        position={[0, -1.95, 0]}
        opacity={0.4}
        scale={9}
        blur={2.6}
        far={4}
        color="#7a4a55"
      />
    </Canvas>
  );
}
