import { contactLinks } from "@/data/contact";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { IconLink } from "@/components/ui/IconLink";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const primary = contactLinks.filter((link) => link.variant === "primary");
  const secondary = contactLinks.filter(
    (link) => link.variant === "secondary"
  );
  const disabled = contactLinks.filter((link) => link.variant === "disabled");

  return (
    <section id="contact" className="mx-auto max-w-content px-6 py-24">
      <Reveal>
        <SectionHeading
          title="Contact"
          description="Reach out through whichever channel is easiest for you."
          align="center"
        />
      </Reveal>

      <Reveal delay={100}>
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-4">
            {primary.map((link) => (
              <Button key={link.label} href={link.href} variant="primary">
                {link.label}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {secondary.map((link) => (
              <IconLink
                key={link.label}
                href={link.href}
                icon={link.icon}
                label={link.label}
              />
            ))}
            {disabled.map((link) => (
              <IconLink
                key={link.label}
                href={link.href}
                icon={link.icon}
                label={link.label}
                disabled
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
