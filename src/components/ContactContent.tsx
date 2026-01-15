"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import ContactForm from "@/components/ContactForm";

export default function ContactContent() {
  const { t } = useLanguage();

  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">{t("contact.title")}</h1>
      <ContactForm />
    </article>
  );
}
