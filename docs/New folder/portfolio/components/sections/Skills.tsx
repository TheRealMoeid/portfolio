import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-content px-6 py-24">
      <Reveal>
        <SectionHeading
          index="02"
          title="Skills"
          description="Grouped by the areas I actually build in, not a list of buzzwords."
        />
      </Reveal>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => (
          <Reveal key={category.category} delay={i * 60}>
            <div>
              <div className="mb-3 flex items-baseline gap-2">
                <h3 className="font-display text-base font-semibold text-foreground">
                  {category.category}
                </h3>
                {category.note && (
                  <span className="font-mono text-xs text-muted">
                    {category.note}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
