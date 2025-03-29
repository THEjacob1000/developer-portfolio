import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import {
	Content,
	DateField,
	isFilled,
	KeyTextField,
	LinkField,
} from "@prismicio/client";
import Button from "./Button";

interface ContentBodyProps {
	page: Content.BlogPostDocument | Content.ProjectDocument;
	buttonText?: KeyTextField;
	buttonLink?: LinkField;
}

export default async function ContentBody({
	page,
	buttonText,
	buttonLink,
}: ContentBodyProps) {
	const formatDate = (date: DateField) => {
		if (isFilled.date(date)) {
			const dateOptions: Intl.DateTimeFormatOptions = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			};
			return new Intl.DateTimeFormat("en-US", dateOptions).format(
				new Date(date),
			);
		}
	};

	const formattedDate = formatDate(page.data.date);
	return (
		<Bounded as="article">
			<div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
				<div className="flex justify-between items-center">
					<Heading as="h1">{page.data.title}</Heading>
					{buttonText && buttonLink && (
						<Button
							label={buttonText}
							linkField={buttonLink}
							className="h-12"
						/>
					)}
				</div>
				<div className="mt-3 flex gap-4 text-xl font-bold text-yellow-400">
					{page.tags.map((tag) => (
						<span key={tag}>{tag}</span>
					))}
				</div>
				<p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
					{formattedDate}
				</p>
				<div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
					<SliceZone slices={page.data.slices} components={components} />
				</div>
				{buttonText && buttonLink && (
					<Button label={buttonText} linkField={buttonLink} className="mt-12" />
				)}
			</div>
		</Bounded>
	);
}
