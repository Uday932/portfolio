import { NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/schemas";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log("Received request:", req); // Log temporaire

    const body = await req.json();
    console.log("Request body:", body); // Log temporaire

    const result = ContactFormSchema.safeParse(body);
    if (!result.success) {
      console.error("Validation error:", result.error.format());
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 },
      );
    }

    const { name, email, message } = result.data;

    console.log("Sending email with data:", { name, email, message }); // Log temporaire

    const { data, error } = await resend.emails.send({
      from: `Uday BHAVSAR <uday.bhavsar.sio@gmail.com>`,
      to: "uday.bhavsar.sio@gmail.com",
      replyTo: [email],
      cc: [email],
      subject: `New message from ${name}!`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message || "Failed to send email.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
