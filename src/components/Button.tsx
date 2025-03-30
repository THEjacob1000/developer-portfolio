import { cn } from "@/lib/utils";
import type { KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { MdArrowOutward } from "react-icons/md";

type ButtonProps = {
	linkField: LinkField;
	label: KeyTextField;
	showIcon?: boolean;
	className?: string;
};

const Button = ({
	linkField,
	label,
	showIcon = true,
	className,
}: ButtonProps) => {
	return (
		<PrismicNextLink
			field={linkField}
			className={cn(
				"group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4  py-2 font-bold text-slate-800 transition-transform ease-out  hover:scale-105",
				className,
			)}
		>
			<span className="absolute inset-0 z-0 h-full translate-y-9 bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0" />
			<span className="relative flex items-center justify-center gap-2">
				{label} {showIcon && <MdArrowOutward className="inline-block" />}
			</span>
		</PrismicNextLink>
	);
};

export default Button;
