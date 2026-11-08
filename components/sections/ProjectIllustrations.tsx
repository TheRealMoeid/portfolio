import Image from "next/image";
import { Project } from "@/types";

const illustrationSrc: Record<Project["illustration"], string> = {
  shopmate: "/images/projects/shopmate.jpg",
  vpnvend: "/images/projects/vpnvend.jpg",
  mediabot: "/images/projects/mediabot.jpg",
  firesystem: "/images/projects/firesystem.jpg",
  squarebaby: "/images/projects/squarebaby.jpg",
};

export function ProjectIllustration({
  illustration,
  title,
}: {
  illustration: Project["illustration"];
  title: string;
}) {
  return (
    <Image
      src={illustrationSrc[illustration]}
      alt={`${title} illustration`}
      fill
      sizes="(min-width: 640px) 50vw, 100vw"
      className="object-cover"
    />
  );
}
