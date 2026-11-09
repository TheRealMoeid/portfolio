import Image from "next/image";
import { site, socialLinks } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { IconLink } from "@/components/ui/IconLink";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex max-w-content flex-col items-center gap-16 px-6 pb-24 pt-32 md:flex-row md:items-center md:pt-40 lg:gap-20"
    >
      <Reveal className="flex-1">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold tracking-widest text-accent uppercase">
              Welcome
            </p>
            <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {site.name}
            </h1>
            <p className="mt-4 text-xl font-medium text-accent">
              {site.title}
            </p>
          </div>

          <p className="max-w-lg text-lg leading-relaxed text-muted">
            {site.tagline}
          </p>

          <p className="font-mono text-xs uppercase tracking-widest text-muted/60">
            {site.location}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="#projects" variant="primary">
              View Projects
            </Button>
            <Button href="#contact" variant="outline">
              Get in Touch
            </Button>
          </div>

          <div className="flex gap-8 pt-6">
            <IconLink href={socialLinks.github} icon="Github" label="GitHub" />
            <IconLink
              href={socialLinks.telegram}
              icon="Send"
              label="Telegram"
            />
            <IconLink href={socialLinks.email} icon="Mail" label="Email" />
          </div>
        </div>
      </Reveal>

      <Reveal
        className="flex shrink-0 flex-col items-center gap-6 md:relative md:flex-1"
        delay={120}
      >
        <div className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-border bg-surface/50 px-4 py-2 font-mono text-xs font-medium text-foreground">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
          </span>
          Available for work
        </div>

        <div className="relative h-56 w-56 sm:h-72 sm:w-72 md:h-96 md:w-96">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 to-transparent blur-3xl" />
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
            <Image
              src="/images/moeid.png"
              alt={`Portrait of ${site.name}`}
              fill
              sizes="512px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
