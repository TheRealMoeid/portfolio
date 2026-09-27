export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  status: "In progress" | "Completed" | "Actively in development" | "Local demo";
  github: string;
  demo?: string;
  /** Identifier mapped to a line-art illustration component in Projects.tsx */
  illustration: "shopmate" | "vpnvend" | "mediabot" | "firesystem";
}

export interface SkillCategory {
  category: string;
  note?: string;
  skills: string[];
}

export interface Capability {
  title: string;
  description: string;
  /** lucide-react icon name */
  icon: string;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: string;
  variant: "primary" | "secondary" | "disabled";
}

export interface NavItem {
  label: string;
  href: string;
}
