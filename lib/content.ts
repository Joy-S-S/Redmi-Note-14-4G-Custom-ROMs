export const device = {
  name: "Redmi Note 14 4G",
  codename: "tanzanite",
  display: '6.67" AMOLED, 120 Hz',
  chipset: "MediaTek Helio G99-Ultra",
  battery: "5,500 mAh, 33 W",
  cameras: "108 MP main, 2 MP depth, 16 MP front",
  build: "HyperOS 1, Android 14 launch",
};

export const youtubeChannel = "https://www.youtube.com/@joy_sayed";

export const faqs = [
  {
    question: "Do I need to unlock the bootloader?",
    answer:
      "Yes. Any flashing operation—including official stock HyperOS via Mi Flash, custom ROMs, ported builds, and root modules—requires an unlocked bootloader. It is not possible to flash stock firmware with a locked bootloader; any flash requires the bootloader to be unlocked first.",
  },
  {
    question: "Will flashing erase my data?",
    answer:
      "Assume it will. Back up photos, messages, authenticator codes, and anything else you cannot replace before starting. First-time installations and recovery changes almost always require a data wipe.",
  },
  {
    question: "Which ROM should I choose for daily use?",
    answer:
      "Start with a recent build that matches your Android version and has an active support group. Custom ROMs usually offer more features; stock firmware is the safer choice when you need maximum stability or banking-app compatibility.",
  },
  {
    question: "Do I need GApps?",
    answer:
      "Only if the ROM does not include them and you rely on Google services. The GApps label on each card tells you whether the build ships with Google apps. Read the ROM notes before flashing a separate package.",
  },
  {
    question: "What is vendor boot, and do I need it?",
    answer:
      "Vendor boot is a partition image that some custom ROMs require for the correct firmware and recovery environment. If a download link is listed on the ROM entry, follow the developer's instructions for that specific build.",
  },
  {
    question: "Can I lock the bootloader after flashing?",
    answer:
      "Never lock the bootloader unless you are on 100% official, unmodified stock firmware matching the exact original factory region of your device. Relocking the bootloader on a custom ROM, ported build, modified firmware, or cross-region stock firmware will hard-brick the device ('The system has been destroyed').",
  },
];

export type VideoItem = {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  category: string;
  href?: string;
  hrefLabel?: string;
};

export const tutorials: VideoItem[] = [
  {
    id: "stock-rom-tutorial",
    youtubeId: "HAQq5xsl_KM",
    title: "Stock ROM installation",
    description:
      "Flash official Xiaomi firmware with Mi Flash, including the checks to run before you connect the phone.",
    category: "Firmware",
    href: "/stock-roms/",
    hrefLabel: "Browse stock ROMs",
  },
  {
    id: "custom-rom-tutorial",
    youtubeId: "KMPkcgs6JIY",
    title: "Custom ROM installation",
    description:
      "A complete walkthrough of recovery flashing, formatting data, and booting a custom ROM for the first time.",
    category: "Custom ROMs",
    href: "/guide/",
    hrefLabel: "Read the written guide",
  },
  {
    id: "bootloader-tutorial",
    youtubeId: "28HHYPCI5hA",
    title: "Bootloader unlock",
    description:
      "The full unlock process, from enabling developer options to verifying the unlock state on your device.",
    category: "Preparation",
    href: "/guide/#unlock",
    hrefLabel: "Unlock requirements",
  },
  {
    id: "root-tutorial",
    youtubeId: "Tp9sDEXDIP4",
    title: "Root with KernelSU Next",
    description:
      "Patch a boot image, install KernelSU Next, and verify root without breaking OTA updates on stock firmware.",
    category: "Root",
  },
  {
    id: "debloat-tutorial",
    youtubeId: "_NadTw7SOgM",
    title: "Debloat HyperOS",
    description:
      "Use ADB to remove unnecessary system packages while keeping core services and banking apps intact.",
    category: "Maintenance",
    href: "/debloat/",
    hrefLabel: "Open the debloat guide",
  },
];

export const reviews: VideoItem[] = [
  {
    id: "evolutionx-review",
    youtubeId: "__g8WuUg9R4",
    title: "EvolutionX | v11.4",
    description:
      "A detailed look at performance, customization, battery life, and camera behavior on EvolutionX.",
    category: "ROM review",
    href: "/roms/",
    hrefLabel: "Browse custom ROMs",
  },
  {
    id: "infinityx-review",
    youtubeId: "P3Z9yiU_J-s",
    title: "Project InfinityX | v3.4",
    description:
      "Feature overview and day-to-day testing of Project InfinityX on the Redmi Note 14 4G.",
    category: "ROM review",
    href: "/roms/",
    hrefLabel: "Browse custom ROMs",
  },
];
