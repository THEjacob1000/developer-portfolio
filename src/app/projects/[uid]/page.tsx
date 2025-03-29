import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import ContentBody from "@/components/ContentBody";

type Params = { uid: string };

export default async function Page(props: { params: Promise<Params> }) {
    const params = await props.params;
    const client = createClient();
    const page = await client
		.getByUID("project", params.uid)
		.catch(() => notFound());
    if (page.data.button_text && page.data.button_link) {
		return (
			<ContentBody
				page={page}
				buttonText={page.data.button_text}
				buttonLink={page.data.button_link}
			/>
		);
	}
    return <ContentBody page={page} />;
}

export async function generateMetadata(
    props: {
        params: Promise<Params>;
    }
): Promise<Metadata> {
    const params = await props.params;
    const client = createClient();
    const page = await client
		.getByUID("project", params.uid)
		.catch(() => notFound());

    return {
		title: page.data.meta_title,
		description: page.data.meta_description,
	};
}

export async function generateStaticParams() {
	const client = createClient();
	const pages = await client.getAllByType("project");

	return pages.map((page) => {
		return { uid: page.uid };
	});
}
