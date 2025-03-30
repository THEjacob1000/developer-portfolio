"use client";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { useRouter } from "next/navigation";
import { FormProvider as Form, useForm } from "react-hook-form";
import { MdArrowOutward } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./form";

/**
 * Props for `ContactForm`.
 */
type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

const formSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	message: z.string().min(1),
});

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = ({ slice }: ContactFormProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});
	const router = useRouter();

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				body: JSON.stringify(values),
				headers: {
					"content-type": "application/json",
				},
			});
			toast("Message sent successfully");
			if (res.ok) {
				router.push("/");
			}
		} catch (error) {
			toast.error("Error sending message");
			console.error("Err", error);
		}
	};

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
				<Heading as="h1">{slice.primary.heading}</Heading>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="prose prose-lg prose-invert w-full max-w-none mt-4 md:mt-8"
					>
						<div className="flex flex-col md:flex-row md:space-x-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Name</FormLabel>
										<FormControl>
											<input
												type="text"
												placeholder="name"
												className="prose prose-lg w-full h-12 max-w-none rounded-md px-5 bg-background text-foreground"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="mt-4 md:mt-0 w-full">
										<FormLabel>Email</FormLabel>
										<FormControl>
											<input
												type="email"
												placeholder="email"
												className="prose prose-lg w-full h-12 max-w-none rounded-md px-5 bg-background text-foreground"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem className="w-full mt-4">
									<FormLabel>Message</FormLabel>
									<FormControl>
										<textarea
											placeholder="message"
											className="prose prose-lg w-full h-40 max-w-none rounded-md px-5 py-3 bg-background text-foreground"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<button
							className="group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4 py-2 font-bold text-slate-800 transition-transform ease-out hover:scale-105 mt-8"
							type="submit"
						>
							<span className="absolute inset-0 z-0 h-full translate-y-10 bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0" />
							<span className="relative flex items-center justify-center gap-2">
								{slice.primary.button_text}{" "}
								<MdArrowOutward className="inline-block" />
							</span>
						</button>
					</form>
				</Form>
			</div>
		</Bounded>
	);
};

export default ContactForm;
