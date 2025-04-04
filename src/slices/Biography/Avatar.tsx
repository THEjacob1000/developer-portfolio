"use client";

import { cn } from "@/lib/utils";
import type { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type AvatarProps = {
	image: ImageField;
	className?: string;
};

const Avatar = ({ image, className }: AvatarProps) => {
	const component = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				".avatar",
				{
					opacity: 0,
					scale: 1.4,
				},
				{
					scale: 1,
					opacity: 1,
					duration: 1.3,
					ease: "power3.inOut",
				},
			);
			window.onmousemove = (e) => {
				if (!component.current) return;
				const componentRect = (
					component.current as HTMLElement
				).getBoundingClientRect();
				const componentCenterX = componentRect.left + componentRect.width / 2;
				const componentPercent = {
					x: (e.clientX - componentCenterX) / componentRect.width / 2,
				};
				const distFromCenterX = 1 - Math.abs(componentPercent.x);

				gsap
					.timeline({
						default: {
							duration: 0.5,
							overwrite: "auto",
							ease: "power3.Out",
						},
					})
					.to(
						".avatar",
						{
							rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
							duration: 0.5,
						},
						0,
					)
					.to(
						".highlight",
						{
							opacity: distFromCenterX - 0.7,
							x: -10 + 20 * componentPercent.x,
							duration: 0.5,
						},
						0,
					);
			};
		}, component);
		return () => ctx.revert();
	}, []);

	return (
		<div ref={component} className={cn("relative h-full w-full", className)}>
			<div className="avatar opacity-0f aspect-square overflow-hidden rounded-3xl border-2 border-slate-700">
				<PrismicNextImage
					field={image}
					className="avatar-image h-full w-full object-fill"
					imgixParams={{ q: 90 }}
				/>
				<div className="highlight absolute inset-0 hidden w-full scale-110 bg-linear-to-tr from-transparent via-white to-transparent opacity-0 md:block" />
			</div>
		</div>
	);
};

export default Avatar;
