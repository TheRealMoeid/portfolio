import { Github } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectIllustration } from "@/components/sections/ProjectIllustrations";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-content px-6 py-32">
      <Reveal>
        <SectionHeading
          index="01"
          title="Selected Projects"
          description="A selection of projects I've built end-to-end, with a focus on Telegram automation, backend systems, and AI-powered solutions."
        />
      </Reveal>

      <div className="grid gap-8 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 80}>
            <Card className="group flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
              <div className="relative h-48 sm:h-56 border-b border-border bg-gradient-to-br from-surface to-background/80 transition-all duration-300 group-hover:from-accent/5">
                <ProjectIllustration
                  illustration={project.illustration}
                  title={project.title}
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <StatusBadge status={project.status} />
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all duration-200 hover:gap-3 hover:text-accent/80"
                >
                  <Github size={16} aria-hidden="true" />
                  View on GitHub
                </a>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
