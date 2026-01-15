"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Experience from "@/components/Experience";
import LinkWithIcon from "@/components/LinkWithIcon";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/Button";
import Skills from "@/components/Skills";
import { ArrowRightIcon, FileDown } from "lucide-react";
import Link from "next/link";

const UDAY_BIRTH_YEAR = 2004;
const LIMIT = 2;

export default function HomeContent() {
  const { t } = useLanguage();

  return (
    <article className="mt-8 flex flex-col gap-20 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <div className="relative">
        </div>
        <div className="flex flex-col">
          <h1 className="title text-5xl mb-2">{t("home.greeting")}</h1>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            {new Date().getFullYear() - UDAY_BIRTH_YEAR}
            {t("home.age")}
          </p>
          <p className="mt-2 text-lg font-light text-muted-foreground">
            {t("home.description")}
          </p>
          <section className="mt-8 flex items-center gap-6">
            <Link href="/uday-bhavsar-cv.pdf" target="_blank">
              <Button variant="outline" className="transition-all hover:scale-105">
                <span className="font-semibold">{t("home.resume")}</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <Socials />
          </section>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="title text-2xl sm:text-3xl">{t("home.skills")}</h2>
        <Skills />
      </section>
      <Experience />

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="title text-2xl sm:text-3xl">{t("home.featuredProjects")}</h2>
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text={t("home.viewMore")}
          />
        </div>
        <Projects limit={LIMIT} />
      </section>
    </article>
  );
}
