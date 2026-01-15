"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Projects from "@/components/Projects";

export default function ProjectsContent() {
  const { t } = useLanguage();

  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">{t("projects.title")}</h1>
      <Projects />
    </article>
  );
}
