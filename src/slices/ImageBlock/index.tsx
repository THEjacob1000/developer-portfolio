import type { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageBlock`.
 */
type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps) => {
	return (
		<PrismicNextImage
			field={slice.primary.image}
			imgixParams={{
				w: 600,
				fit: "crop",
				// "max-h": 300,
				// "max-w": 600,
			}}
		/>
	);
};

export default ImageBlock;
