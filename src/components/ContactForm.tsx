"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { sendEmail } from "@/lib/actions";
import { ContactFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";

type Inputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);

      const result = await sendEmail(formData);

      if (result.error) {
        toast.error(t("contact.error"));
        return;
      }

      toast.success(t("contact.success"));
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("contact.unexpectedError"));
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {/* Name */}
        <div className="h-16">
          <Input
            id="name"
            type="text"
            placeholder={t("contact.name")}
            autoComplete="given-name"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="input-error">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="h-16">
          <Input
            id="email"
            type="email"
            placeholder={t("contact.email")}
            autoComplete="email"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="input-error">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="h-32 sm:col-span-2">
          <Textarea
            rows={4}
            placeholder={t("contact.message")}
            autoComplete="Message"
            className="resize-none"
            {...register("message")}
          />
          {errors.message?.message && (
            <p className="input-error">{errors.message.message}</p>
          )}
        </div>
      </div>
      <div className="mt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <span>{t("contact.sending")}</span>
              <ReloadIcon className="ml-2 animate-spin" />
            </div>
          ) : (
            <div className="flex items-center">
              <span>{t("contact.send")}</span>
              <PaperPlaneIcon className="ml-2" />
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}

