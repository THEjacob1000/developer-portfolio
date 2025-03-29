"use client";
import Bounded from "@/components/Bounded";
import Shapes from "./Shapes";
import type { Content, KeyTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */

const Hero = ({ slice }: HeroProps): JSX.Element => {
	const component = useRef(null);
	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline();
			tl.fromTo(
				".name-animation",
				{
					x: -100,
					opacity: 0,
					rotate: -10,
				},
				{
					x: 0,
					opacity: 1,
					rotate: 0,
					ease: "elastic.out(1, 0.3)",
					duration: 1,
					transformOrigin: "left top",
					delay: 0.5,
					stagger: {
						each: 0.05,
						from: "random",
					},
				},
			);

			tl.fromTo(
				".job-title",
				{
					y: 20,
					opacity: 0,
					scale: 1.2,
				},
				{
					opacity: 1,
					y: 0,
					duration: 1,
					scale: 1,
					ease: "elastic.out(1, 0.3)",
				},
			);
		}, component);
		return () => ctx.revert();
	}, []);

	const renderLetters = (name: KeyTextField, key: string) => {
		if (!name) return;
		return name.split("").map((letter, index) => {
			return (
				<span
					key={key + letter}
					className={`name-animation name-animation-${key} inline-block opacity-0`}
				>
					{letter}
				</span>
			);
		});
	};
	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			ref={component}
		>
			<div className="grid min-h-[70vh] grid-cols-1 items-center md:grid-cols-2">
				<Shapes />
				<div className="col-start-1 md:row-start-1">
					<h1
						className="mb-8  whitespace-nowrap font-extrabold leading-none tracking-tighter"
						aria-label={`${slice.primary.first_name} ${slice.primary.last_name}`}
					>
						<span className="block text-[clamp(3rem,20vmin,20rem)] text-slate-300">
							{renderLetters(slice.primary.first_name, "first")}
						</span>
						<span className="-mt-[.2em] block text-[clamp(1.5rem,10vmin,10rem)] text-slate-500">
							{renderLetters(slice.primary.last_name, "last")}
						</span>
					</h1>
					<span className="job-title bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 first-letter:block md:text-4xl">
						{slice.primary.tag_line}
					</span>
				</div>
			</div>
		</Bounded>
	);
};

export default Hero;
