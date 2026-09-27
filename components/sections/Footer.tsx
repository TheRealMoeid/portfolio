import { site, socialLinks } from "@/data/site";
import { IconLink } from "@/components/ui/IconLink";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="border-t border-border">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <span>{site.name}</span>
        <span className="font-mono text-xs">
          &copy; {year} {site.name}
        </span>
        <div className="flex items-center gap-5">
          <IconLink href={socialLinks.email} icon="Mail" label="Email" />
          <IconLink href={socialLinks.github} icon="Github" label="GitHub" />
          <IconLink href="#" icon="Linkedin" label="LinkedIn" disabled />
        </div>
      </div>
    </footer>
  );
}
