import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
	try {
		const req = await request.json();
		const { data, error } = await resend.emails.send({
			from: "Jacob's Portfolio <onboarding@resend.dev>",
			to: ["jacob.s.sanderson@gmail.com"],
			subject: "New Contact Form Submission",
			react: EmailTemplate({
				name: req.name,
				email: req.email,
				message: req.message,
			}) as React.ReactElement,
		});

		if (error) {
			return Response.json({ error });
		}
		return Response.json({ data });
	} catch (error) {
		return Response.json({ error });
	}
}
