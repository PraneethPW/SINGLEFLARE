import { Float, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function Globe() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.18;
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial color="#0b6ccf" emissive="#00284d" roughness={0.48} metalness={0.18} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.86, 64, 64]} />
        <meshBasicMaterial color="#00d1ff" transparent opacity={0.12} wireframe />
      </mesh>
      {[0, 1, 2].map((ring) => (
        <mesh key={ring} rotation={[Math.PI / 2.25, ring * 0.8, ring * 0.3]}>
          <torusGeometry args={[2.15 + ring * 0.2, 0.008, 16, 128]} />
          <meshBasicMaterial color={ring === 1 ? "#ff3d2e" : "#00d1ff"} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function Satellite({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.8}>
      <mesh position={[x, y, z]}>
        <boxGeometry args={[0.18, 0.08, 0.08]} />
        <meshStandardMaterial color="#ffffff" emissive="#ff8a00" emissiveIntensity={0.25} />
      </mesh>
    </Float>
  );
}

export function EarthScene() {
  return (
    <Canvas camera={{ position: [0, 0.4, 5.4], fov: 42 }} dpr={[1, 1.8]}>
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 3, 4]} intensity={3.2} color="#ff8a00" />
      <pointLight position={[-4, -2, 3]} intensity={2.2} color="#00d1ff" />
      <Stars radius={70} depth={40} count={1400} factor={3} fade speed={0.4} />
      <Globe />
      <Satellite x={2.7} y={1.2} z={0.2} />
      <Satellite x={-2.4} y={-0.9} z={0.6} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.25} />
    </Canvas>
  );
}
