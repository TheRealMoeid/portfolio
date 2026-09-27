import * as Icons from "lucide-react";
import { capabilities, embeddedNote } from "@/data/capabilities";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-content px-6 py-24">
      <Reveal>
        <SectionHeading
          index="03"
          title="What I Can Build"
          description="Turning the skills above into things a team or client can actually ask for."
        />
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, i) => {
          const Icon = (
            Icons as unknown as Record<string, Icons.LucideIcon>
          )[capability.icon];

          return (
            <Reveal key={capability.title} delay={i * 60}>
              <Card>
                {Icon && (
                  <Icon
                    size={22}
                    className="text-accent"
                    aria-hidden="true"
                  />
                )}
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {capability.title}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {capability.description}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={300}>
        <p className="mt-10 text-sm text-muted">{embeddedNote}</p>
      </Reveal>
    </section>
  );
}
