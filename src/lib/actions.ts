"use server";

import { ContactFormSchema } from "@/lib/schemas";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const parsedData = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsedData.success) {
    return { error: parsedData.error.format() };
  }

  const { name, email, message } = parsedData.data;

  try {
    const { data, error } = await resend.emails.send({
      from: `Uday BHAVSAR <hello@resend.dev>`,
      to: "uday.bhavsar.sio@gmail.com",
      replyTo: [email],
      cc: [email],
      subject: `New message from ${name}!`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
    });

    if (error) throw new Error(error.message);

    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { error: "Failed to send email." };
  }
}
