"use client";

import type { ThreeGeometry } from "@/types/three";
import { ContactShadows, Environment, Float } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { Suspense, useEffect, useRef, useState } from "react";
import {
	CapsuleGeometry,
	DodecahedronGeometry,
	IcosahedronGeometry,
	type Material,
	type Mesh,
	MeshNormalMaterial,
	MeshStandardMaterial,
	OctahedronGeometry,
	TorusGeometry,
} from "three";

export default function Shapes() {
	return (
		<div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
			<Canvas
				className="z-0"
				shadows
				gl={{ antialias: false }}
				dpr={[1, 1.5]}
				camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
			>
				<Suspense fallback={null}>
					<Geometries />
					<ContactShadows
						position={[0, -3.5, 0]}
						opacity={0.65}
						scale={40}
						blur={1}
						far={9}
					/>
					<Environment preset="studio" />
				</Suspense>
			</Canvas>
		</div>
	);
}

function Geometries() {
	const geometries = [
		{
			position: [0, 0, 0],
			r: 0.3,
			geometry: new IcosahedronGeometry(3),
		},
		{
			position: [1, -0.75, 4],
			r: 0.4,
			geometry: new CapsuleGeometry(0.5, 1.6, 2, 16),
		},
		{
			position: [-1.4, 2, -4],
			r: 0.6,
			geometry: new DodecahedronGeometry(1.5),
		},
		{
			position: [-0.8, -0.75, 5],
			r: 0.5,
			geometry: new TorusGeometry(0.6, 0.25, 16, 32),
		},
		{
			position: [1.6, 1.6, -4],
			r: 0.7,
			geometry: new OctahedronGeometry(1.5),
		},
	];

	const materials = [
		new MeshNormalMaterial(),
		new MeshStandardMaterial({ color: 0x6ab04c, roughness: 0 }),
		new MeshStandardMaterial({
			color: 0xe056fd,
			roughness: 0.1,
		}),
		new MeshStandardMaterial({ color: 0xf0932b, roughness: 0 }),
		new MeshStandardMaterial({
			color: 0x95afc0,
			roughness: 0.2,
		}),
		new MeshStandardMaterial({
			color: 0xf9ca24,
			roughness: 0.4,
		}),
		new MeshStandardMaterial({
			color: 0xffbe76,
			roughness: 0.4,
			metalness: 0.5,
		}),
		new MeshStandardMaterial({
			color: 0xff7979,
			roughness: 0.4,
			metalness: 0.5,
		}),
	];

	const soundEffects = [
		new Audio("/sounds/knock1.ogg"),
		new Audio("/sounds/knock2.ogg"),
		new Audio("/sounds/knock3.ogg"),
	];

	return geometries.map(({ position, r, geometry }) => (
		<Geometry
			key={JSON.stringify(position)}
			position={position.map((p) => p * 2) as [number, number, number]}
			soundEffects={soundEffects}
			geometry={geometry}
			materials={materials}
			r={r}
		/>
	));
}

interface GeometryProps {
	r: number;
	position: [number, number, number];
	geometry: ThreeGeometry;
	materials: Material[];
	soundEffects: HTMLAudioElement[];
}

function Geometry({
	r,
	position,
	geometry,
	materials,
	soundEffects,
}: GeometryProps) {
	const meshRef = useRef<Mesh>(null);
	const [visible, setVisible] = useState(false);
	const startingMaterial = getRandomMaterial();
	function getRandomMaterial() {
		return gsap.utils.random(materials);
	}
	function handleClick(e: ThreeEvent<MouseEvent>) {
		const mesh = e.object as Mesh;

		gsap.utils.random(soundEffects).play();

		gsap.to(mesh.rotation, {
			x: `+=${gsap.utils.random(0, 2)}`,
			y: `+=${gsap.utils.random(0, 2)}`,
			z: `+=${gsap.utils.random(0, 2)}`,
			duration: 1.3,
			ease: "elastic.out(1, 0.3)",
			yoyo: true,
		});
		mesh.material = getRandomMaterial();
	}

	const handlePointerOver = () => {
		document.body.style.cursor = "pointer";
	};
	const handlePointerOut = () => {
		document.body.style.cursor = "default";
	};

	useEffect(() => {
		const ctx = gsap.context(() => {
			setVisible(true);
			if (meshRef.current) {
				gsap.from(meshRef.current.scale, {
					x: 0,
					y: 0,
					z: 0,
					duration: 1,
					ease: "elastic.out(1, 0.3)",
					delay: 0.3,
				});
			}
		});
		return () => ctx.revert();
	}, []);

	return (
		<group position={position} ref={meshRef}>
			<Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: OnKeyDown is not supported in React Three Fiber */}
				<mesh
					geometry={geometry}
					onClick={handleClick}
					onPointerOver={handlePointerOver}
					onPointerOut={handlePointerOut}
					visible={visible}
					material={startingMaterial}
				/>
			</Float>
		</group>
	);
}
