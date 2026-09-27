import Image from "next/image";
import { Github, Send, Mail } from "lucide-react";
import { site, socialLinks } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { IconLink } from "@/components/ui/IconLink";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex max-w-content flex-col-reverse items-center gap-12 px-6 pb-20 pt-32 md:flex-row md:items-center md:pt-40"
    >
      <Reveal className="flex-1">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="mt-2 h-16 w-px shrink-0 bg-accent md:h-20"
          />
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {site.name}
            </h1>
            <p className="mt-2 text-lg font-medium text-accent">
              {site.title}
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-md text-muted">{site.tagline}</p>

        <p className="mt-4 font-mono text-xs text-muted">{site.location}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="#projects" variant="primary">
            View Projects
          </Button>
          <Button href="#contact" variant="outline">
            Get in Touch
          </Button>
        </div>

        <div className="mt-10 flex gap-6">
          <IconLink href={socialLinks.github} icon="Github" label="GitHub" />
          <IconLink
            href={socialLinks.telegram}
            icon="Send"
            label="Telegram"
          />
          <IconLink href={socialLinks.email} icon="Mail" label="Email" />
        </div>
      </Reveal>

      <Reveal className="relative shrink-0" delay={120}>
        <div className="relative h-48 w-48 sm:h-64 sm:w-64">
          <div className="absolute inset-0 rounded-2xl border border-accent" />
          {/* Corner-bracket accents for the "technical/viewfinder" feel */}
          <span className="absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-accent" />
          <span className="absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-accent" />
          <span className="absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-accent" />
          <span className="absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-accent" />

          <div className="absolute inset-3 overflow-hidden rounded-xl bg-surface">
            <Image
              src="/images/moeid.png"
              alt={`Portrait of ${site.name}`}
              fill
              sizes="256px"
              className="object-cover [filter:grayscale(1)_contrast(1.1)]"
              priority
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
