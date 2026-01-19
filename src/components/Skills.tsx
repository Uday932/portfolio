"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import skillsDataEn from "@/data/skills.json";
import skillsDataFr from "@/data/skills_fr.json";
import SkillCard from "@/components/SkillCard";
import { skillsSchema, type SkillCategory } from "@/lib/schemas";
import { Code, Layout, Server, Database, Wrench, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Layout,
  Server,
  Database,
  Wrench,
};

export default function Skills() {
  const { locale } = useLanguage();
  const skillsData = locale === "fr" ? skillsDataFr : skillsDataEn;
  const [activeCategory, setActiveCategory] = useState<string>("languages");

  try {
    const parsed = skillsSchema.parse(skillsData);
    const categories = parsed.categories;
    const currentCategory = categories.find((cat) => cat.id === activeCategory) || categories[0];

    return (
      <section className="space-y-6">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || Code;
            const isActive = category.id === activeCategory;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                  "border backdrop-blur-sm",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                    : "bg-card/50 text-muted-foreground border-border/50 hover:bg-card hover:text-foreground hover:border-border hover:shadow-md"
                )}
              >
                <IconComponent 
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isActive ? "scale-110" : "group-hover:scale-110"
                  )} 
                />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid with Animation */}
        <div 
          key={activeCategory}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
        >
          {currentCategory.skills.map((skill, index) => (
            <SkillCard
              key={`${activeCategory}-${index}`}
              name={skill.name}
              description={skill.description}
              icon={skill.icon}
              className="animate-in fade-in-0 zoom-in-95 duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            />
          ))}
        </div>
      </section>
    );
  } catch (err) {
    console.error("Erreur parsing compétences :", err);
    return <p>Erreur de chargement des compétences.</p>;
  }
}
