import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import type { Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import Avatar from "./Avatar";

/**
 * Props for `Biography`.
 */
type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps) => {
	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr_1fr]">
				<Heading as="h1" size="xl" className="col-start-1">
					{slice.primary.heading}
				</Heading>
				<div className="prose prose-xl prose-slate prose-invert col-start-1">
					<PrismicRichText field={slice.primary.description} />
				</div>
				<Button
					label={slice.primary.button_text}
					linkField={slice.primary.button_link}
				/>

				<Avatar
					image={slice.primary.avatar}
					className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
				/>
			</div>
		</Bounded>
	);
};

export default Biography;
