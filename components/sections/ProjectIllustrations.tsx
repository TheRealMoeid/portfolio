import { Project } from "@/types";

const shared = {
  fill: "none",
  stroke: "var(--color-accent)",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ShopMateIllustration() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <rect x="30" y="24" width="80" height="52" rx="8" {...shared} />
      <path d="M46 76l-8 14M94 76l8 14" {...shared} />
      <circle cx="58" cy="50" r="4" fill="var(--color-accent)" />
      <circle cx="82" cy="50" r="4" fill="var(--color-accent)" />
      <path d="M120 40h30l10 12h10" {...shared} />
      <rect x="120" y="52" width="46" height="30" rx="4" {...shared} />
      <circle cx="132" cy="90" r="5" {...shared} />
      <circle cx="154" cy="90" r="5" {...shared} />
    </svg>
  );
}

function VpnVendIllustration() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <path
        d="M100 22l38 14v26c0 26-16 42-38 50-22-8-38-24-38-50V36z"
        {...shared}
      />
      <rect x="86" y="58" width="28" height="20" rx="3" {...shared} />
      <path d="M92 58v-8a8 8 0 0116 0v8" {...shared} />
    </svg>
  );
}

function MediaBotIllustration() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <rect x="52" y="26" width="96" height="60" rx="6" {...shared} />
      <path d="M90 46l24 14-24 14z" fill="var(--color-accent)" />
      <path d="M100 92v14M84 106h32" {...shared} />
      <path d="M64 96l-6 8M136 96l6 8" {...shared} />
    </svg>
  );
}

function FireSystemIllustration() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <path
        d="M100 20c14 18-6 22-6 36 0 10 8 16 16 16s16-8 16-18c0-16-12-20-12-34-10 4-14 0-14 0z"
        {...shared}
      />
      <rect x="60" y="80" width="80" height="18" rx="3" {...shared} />
      <path d="M74 80v-8M100 80v-8M126 80v-8" {...shared} />
    </svg>
  );
}

const illustrationMap: Record<Project["illustration"], () => JSX.Element> = {
  shopmate: ShopMateIllustration,
  vpnvend: VpnVendIllustration,
  mediabot: MediaBotIllustration,
  firesystem: FireSystemIllustration,
};

export function ProjectIllustration({
  illustration,
}: {
  illustration: Project["illustration"];
}) {
  const Illustration = illustrationMap[illustration];
  return <Illustration />;
}
