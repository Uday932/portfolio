"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/Button";

export default function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        setLocale(locale === "en" ? "fr" : "en");
      }}
    >
      <span className="text-sm font-semibold">
        {locale === "en" ? "FR" : "EN"}
      </span>
      <span className="sr-only">{t("language.toggle")}</span>
    </Button>
  );
}
