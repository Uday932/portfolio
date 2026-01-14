"use client";

import skillsData from "@/data/skills.json";
import SkillCard from "@/components/SkillCard";
import { skillsSchema } from "@/lib/schemas";

export default function Skills() {
  try {
    const parsed = skillsSchema.parse(skillsData);

    return (
      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {parsed.skills.map((skill, index) => (
            <SkillCard
              key={index}
              name={skill.name}
              description={skill.description}
              icon={skill.icon}
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
