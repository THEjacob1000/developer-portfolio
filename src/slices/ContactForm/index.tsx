"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { useState } from "react";

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
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{slice.primary.heading}</Heading>
        <form>
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
          <textarea placeholder="message" />
        </form>
      </div>
    </Bounded>
  );
};

export default ContactForm;
