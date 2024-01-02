"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { useState } from "react";
import { FormEvent } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useRouter } from "next/navigation";

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps =
  SliceComponentProps<Content.ContactFormSlice>;

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = ({ slice }: ContactFormProps): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          message,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(res);
      // if (res.ok) {
      //   router.push("/");
      // }
    } catch (error) {
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
        <form
          onSubmit={onSubmit}
          className="prose prose-lg prose-invert w-full max-w-none mt-4 md:mt-8"
        >
          <div className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="prose prose-lg mt-4 w-full h-12 max-w-none rounded-md px-5"
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="prose prose-lg mt-4 w-full h-12 max-w-none rounded-md px-5"
            />
          </div>
          <textarea
            placeholder="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="prose prose-lg mt-4 w-full h-40 max-w-none md:mt-10 rounded-md px-5 py-3"
          />
          <button
            className="group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4 py-2 font-bold text-slate-800 transition-transform ease-out hover:scale-105 mt-8"
            type="submit"
          >
            <span className="absolute inset-0 z-0 h-full translate-y-10 bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
            <span className="relative flex items-center justify-center gap-2">
              {slice.primary.button_text}{" "}
              <MdArrowOutward className="inline-block" />
            </span>
          </button>
        </form>
      </div>
    </Bounded>
  );
};

export default ContactForm;
