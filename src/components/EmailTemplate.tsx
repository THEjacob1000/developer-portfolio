import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ name, email, message }) => (
  <div className="font-sans text-gray-800">
    <h1 className="text-blue-600">
      Jacob, Someone has tried to contact you
    </h1>
    <h2>Dear Jacob,</h2>
    <p>You have received a new message via your portfolio website:</p>
    <div className="bg-gray-100 p-4 rounded-lg">
      <p>
        <strong>Message:</strong>
      </p>
      <p className="whitespace-pre-wrap">{message}</p>
    </div>
    <p>
      <strong>From:</strong> {name}
    </p>
    <p>
      <strong>Email:</strong>
      <a
        href={`mailto:${email}`}
        className="text-blue-600 hover:text-blue-800"
      >
        {email}
      </a>
    </p>
    <hr />
    <p>
      It&apos;s recommended to verify the sender's identity before
      responding.
    </p>
    <footer>
      <p>Best regards,</p>
      <p>Jacob's Automated Assistant</p>
    </footer>
  </div>
);
