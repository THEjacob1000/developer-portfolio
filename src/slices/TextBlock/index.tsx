import type { Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";

import type { JSX } from "react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps) => {
	return (
		<div className="max-w-prose">
			<PrismicRichText field={slice.primary.text} />
		</div>
	);
};

export default TextBlock;
