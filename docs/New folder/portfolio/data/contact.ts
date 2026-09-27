import { ContactLink } from "@/types";
import { socialLinks } from "@/data/site";

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: socialLinks.email,
    icon: "Mail",
    variant: "primary",
  },
  {
    label: "Telegram",
    href: socialLinks.telegram,
    icon: "Send",
    variant: "primary",
  },
  {
    label: "WhatsApp",
    href: socialLinks.whatsapp,
    icon: "MessageCircle",
    variant: "secondary",
  },
  {
    label: "GitHub",
    href: socialLinks.github,
    icon: "Github",
    variant: "secondary",
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: "Linkedin",
    variant: "disabled",
  },
];
