import Experience from "@/components/Experience";
import LinkWithIcon from "@/components/LinkWithIcon";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/Button";
import Skills from "@/components/Skills";
import { ArrowDownRight, ArrowRightIcon, FileDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import path from "path";

const UDAY_BIRTH_YEAR = 2004; // update my birth year
const LIMIT = 2; // max show 2

export default async function Home() {
  return (
    <article className="mt-8 flex flex-col gap-20 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <div className="relative">
          {/* <Image
            className="rounded-2xl border-2 border-border/50 shadow-lg"
            src="/udayy.jpg"
            alt="Photo of Uday"
            width={175}
            height={175}
            priority
          /> */}
        </div>
        <div className="flex flex-col">
          <h1 className="title text-5xl mb-2">hi uday here 👋</h1>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            {/* Update my age */}
            {new Date().getFullYear() - UDAY_BIRTH_YEAR}
            -year-old software developer from Paris
          </p>
          <p className="mt-2 text-lg font-light text-muted-foreground">
            I like to develop full-stack apps and being a part-time musician{" "}
          </p>
          <section className="mt-8 flex items-center gap-6">
            <Link href="/uday-bhavsar-cv.pdf" target="_blank">
              <Button variant="outline" className="transition-all hover:scale-105">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <Socials />
          </section>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="title text-2xl sm:text-3xl">skills</h2>
        <Skills />
      </section>
      <Experience />

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="title text-2xl sm:text-3xl">featured projects</h2>
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>
        <Projects limit={LIMIT} />
      </section>
    </article>
  );
}
