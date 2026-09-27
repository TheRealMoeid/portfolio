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
    <section id="projects" className="mx-auto max-w-content px-6 py-24">
      <Reveal>
        <SectionHeading
          index="01"
          title="Selected Projects"
          description="A few things I've built end to end, mostly Telegram bots and backend systems with AI woven in."
        />
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 80}>
            <Card className="flex h-full flex-col p-0">
              <div className="flex h-32 items-center justify-center border-b border-border bg-background/40 p-6">
                <ProjectIllustration illustration={project.illustration} />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <StatusBadge status={project.status} />
                </div>

                <p className="mt-3 flex-1 text-sm text-muted">
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
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity duration-200 hover:opacity-80"
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
