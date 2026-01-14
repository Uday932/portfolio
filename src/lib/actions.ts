"use server";

import { ContactFormSchema } from "@/lib/schemas";
import nodemailer from "nodemailer";

// Configure Nodemailer with Brevo SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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
    const info = await transporter.sendMail({
      from: '"Uday BHAVSAR" <uday.bhavsar.sio@gmail.com>',
      to: "uday.bhavsar.sio@gmail.com",
      cc: email,
      replyTo: email,
      subject: `New message from ${name}!`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
    });

    console.log("Email sent:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { error: "Failed to send email." };
  }
}
