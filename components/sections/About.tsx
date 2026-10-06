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
          <AbstractGraphic />
        </Reveal>
      </div>
    </section>
  );
}

function AbstractGraphic() {
  return (
    <svg
      viewBox="0 0 320 240"
      className="mx-auto h-auto w-full max-w-xs"
      aria-hidden="true"
    >
      <rect
        x="30"
        y="30"
        width="120"
        height="120"
        rx="12"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <circle
        cx="200"
        cy="140"
        r="70"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M120 90l140 40"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <rect
        x="150"
        y="50"
        width="60"
        height="60"
        rx="8"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        opacity="0.3"
        transform="rotate(18 180 80)"
      />
    </svg>
  );
}
