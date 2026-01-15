"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { t } = useLanguage();

  const navLinks = [
    {
      name: t("nav.home"),
      href: "/",
    },
    {
      name: t("nav.projects"),
      href: "/projects",
    },
    {
      name: t("nav.contact"),
      href: "/contact",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 py-6 backdrop-blur-md border-b border-border/40">
      <nav className="flex items-center justify-between">
        <ul className="flex gap-6 sm:gap-10">
          {navLinks.map((nav, id) => (
            <li key={id} className="link font-medium">
              <Link href={nav.href}>{nav.name}</Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-0 sm:gap-4">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

