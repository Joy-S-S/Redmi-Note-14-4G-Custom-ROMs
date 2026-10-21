export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://Joy-S-S.github.io/Redmi-Note-14-4G-Custom-ROMs";

export const SITE_NAME = "Tanzanite";
export const SITE_TITLE = "Tanzanite ROMs for Redmi Note 14 4G";
export const SITE_DESCRIPTION =
  "A carefully maintained library of custom ROMs, stock firmware, ported builds, and Magisk modules for the Redmi Note 14 4G (tanzanite).";

export const GITHUB_URL =
  "https://github.com/Joy-S-S/Redmi-Note-14-4G-Custom-ROMs";
export const YOUTUBE_URL = "https://www.youtube.com/@Joy_Sayed";
export const TELEGRAM_SUPPORT_URL = "https://t.me/JoySS_Support";
export const TELEGRAM_COMMUNITY_URL = "https://t.me/RN14ID";
export const TELEGRAM_URL = TELEGRAM_SUPPORT_URL;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "ROMs",
    items: [
      {
        label: "Custom ROMs",
        href: "/roms/",
        description: "Community builds with extra features",
      },
      {
        label: "Stock ROMs",
        href: "/stock-roms/",
        description: "Official HyperOS firmware releases",
      },
      {
        label: "Ported ROMs",
        href: "/ported-roms/",
        description: "Builds adapted from other devices",
      },
    ],
  },
  {
    label: "Modules",
    items: [
      {
        label: "Custom modules",
        href: "/custom-modules/",
        description: "Add-ons built for tanzanite",
      },
      {
        label: "Stock modules",
        href: "/stock-modules/",
        description: "Modules for stock HyperOS",
      },
    ],
  },
  {
    label: "Guides",
    items: [
      {
        label: "Flashing guide",
        href: "/guide/",
        description: "Unlock, flash, and recover safely",
      },
      {
        label: "Debloat guide",
        href: "/debloat/",
        description: "Remove unwanted system apps",
      },
    ],
  },
];

export const simpleNav: NavItem[] = [
  { label: "Tutorials", href: "/tutorials/" },
  { label: "Reviews", href: "/reviews/" },
];

export const allNavItems = [
  ...navGroups.flatMap((group) => group.items),
  ...simpleNav,
];

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function siteAsset(path: string) {
  const normalized = path.replace(/^\/+/, "");
  return `${BASE_PATH}/assets/${normalized}`;
}
