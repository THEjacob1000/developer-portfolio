import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { createClient, repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
const urbanist = Urbanist({ subsets: ["latin"] });

export const generateMetadata = async (): Promise<Metadata> => {
	const client = createClient();
	const settings = await client.getSingle("settings");

	return {
		title: settings.data.meta_title,
		description: settings.data.meta_description,
	};
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="bg-slate-900 text-slate-100">
			<body className={cn(urbanist.className, "relative min-h-screen")}>
				<Header />
				<main>{children}</main>
				<Toaster />
				<Footer />
				<div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
				<div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light" />
			</body>
			<PrismicPreview repositoryName={repositoryName} />
		</html>
	);
}
