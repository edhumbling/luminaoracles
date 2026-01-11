"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud, Stars, Sparkles, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

function LightColumns() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const count = 8;

    // Create positions for columns in a circle
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;
        // Slow rotation of the entire sanctuary
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    });

    useEffect(() => {
        if (!meshRef.current) return;

        const radius = 15;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            dummy.position.set(x, 0, z);
            dummy.scale.set(1, 40, 1); // Tall columns
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [dummy, count]);

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, -10, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 1, 32]} />
            <meshPhysicalMaterial
                color="#e0e0ff"
                transparent
                opacity={0.3}
                metalness={0.1}
                roughness={0.1}
                transmission={0.5}
                thickness={2}
                emissive="#a0a0ff"
                emissiveIntensity={0.1}
            />
        </instancedMesh>
    );
}

function FloatingParticles() {
    return (
        <Sparkles
            count={100}
            scale={25}
            size={4}
            speed={0.4}
            opacity={0.6}
            color="#ffd700"
        />
    );
}

function ReflectiveFloor() {
    return (
        <mesh rotation-x={-Math.PI / 2} position={[0, -10, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={80}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#050510"
                metalness={0.5}
            />
        </mesh>
    );
}

function Scene() {
    return (
        <>
            <fog attach="fog" args={['#050510', 5, 40]} />
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 10, 0]} intensity={1} color="#ffaa00" distance={20} />

            <LightColumns />
            <ReflectiveFloor />
            <FloatingParticles />

            <Cloud
                opacity={0.5}
                speed={0.2}
                bounds={[20, 2, 2]}
                segments={10}
                position={[0, 10, -10]}
                color="#c0c0ff"
            />
            <Cloud
                opacity={0.3}
                speed={0.2}
                bounds={[20, 2, 2]}
                segments={10}
                position={[0, -5, -10]}
                color="#b0b0e0"
            />


            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </>
    );
}

export default function SanctuaryBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-[#050510]">
            <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
                <Scene />
                {/* Helper controls can be removed for production or restricted */}
                {/* <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} /> */}
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>
    );
}
