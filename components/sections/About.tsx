import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-content px-6 py-24">
      <Reveal>
        <SectionHeading index="04" title="About" />
      </Reveal>

      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <div className="space-y-5 text-muted">
            <p>
              I&apos;m a Computer Engineering student interested in building practical 
              software, backend systems, automation tools, and AI-powered 
              applications. Most of my experience comes from personal projects, 
              including Telegram bots and backend development.
            </p>
            <p>
              I&apos;m continuing to develop my skills through hands-on projects, 
              focusing on writing reliable, maintainable software and preparing 
              for professional development work.
            </p>
            <p className="font-mono text-xs text-muted/80">
              {site.location}, {site.age} years old
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-lg bg-background p-1">
            <div className="relative h-full w-full overflow-hidden rounded-md">
              <Image
                src="/images/about-graphic.png"
                alt="Illustration of a minimal developer workspace"
                fill
                sizes="(min-width: 768px) 448px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}