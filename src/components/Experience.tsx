"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import careerDataEn from "@/data/career.json";
import careerDataFr from "@/data/career_fr.json";
import educationDataEn from "@/data/education.json";
import educationDataFr from "@/data/education_fr.json";
import { careerSchema, educationSchema } from "@/lib/schemas";
import Timeline from "./Timeline";

export default function Experience() {
  const { t, locale } = useLanguage();
  
  const careerData = locale === "fr" ? careerDataFr : careerDataEn;
  const educationData = locale === "fr" ? educationDataFr : educationDataEn;
  
  const career = careerSchema.parse(careerData).career;
  const education = educationSchema.parse(educationData).education;

  return (
    <Tabs defaultValue="work">
      <TabsList className="mb-2 grid w-full grid-cols-2">
        <TabsTrigger value="work">{t("experience.work")}</TabsTrigger>
        <TabsTrigger value="education">{t("experience.education")}</TabsTrigger>
      </TabsList>
      <TabsContent value="work">
        <Timeline experience={career}></Timeline>
      </TabsContent>
      <TabsContent value="education">
        <Timeline experience={education}></Timeline>
      </TabsContent>
    </Tabs>
  );
}


