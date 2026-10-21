import Link from "next/link";
import {
  GithubIcon,
  TanzaniteLogo,
  TelegramIcon,
  YoutubeIcon,
} from "@/components/site/icons";
import {
  GITHUB_URL,
  TELEGRAM_COMMUNITY_URL,
  TELEGRAM_SUPPORT_URL,
  YOUTUBE_URL,
} from "@/lib/site";
import { device } from "@/lib/content";

const libraryLinks = [
  { label: "Custom ROMs", href: "/roms/" },
  { label: "Stock ROMs", href: "/stock-roms/" },
  { label: "Ported ROMs", href: "/ported-roms/" },
  { label: "Custom modules", href: "/custom-modules/" },
  { label: "Stock modules", href: "/stock-modules/" },
];

const resourceLinks = [
  { label: "Flashing guide", href: "/guide/" },
  { label: "Debloat guide", href: "/debloat/" },
  { label: "Video tutorials", href: "/tutorials/" },
  { label: "ROM reviews", href: "/reviews/" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 sm:mt-24 w-full border-t border-border">
      <div className="container-page py-10 sm:py-14">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight group"
            >
              <TanzaniteLogo className="size-5 shrink-0 rounded-[0.35rem] shadow-xs transition-transform group-hover:scale-105" />
              Tanzanite
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              An independent library of ROMs, firmware, and modules for the{" "}
              {device.name}. Tested by the community, documented for everyone.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Joy Sayed YouTube Channel"
                title="YouTube Channel (@Joy_Sayed)"
                className="grid size-8 place-items-center rounded-lg border border-border text-red-500 transition-colors hover:bg-muted hover:text-red-400"
              >
                <YoutubeIcon className="size-4" />
              </a>
              <a
                href={TELEGRAM_SUPPORT_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="JoySS Support Telegram Group"
                title="JoySS Support (@JoySS_Support)"
                className="grid size-8 place-items-center rounded-lg border border-border text-sky-400 transition-colors hover:bg-muted hover:text-sky-300"
              >
                <TelegramIcon className="size-4" />
              </a>
              <a
                href={TELEGRAM_COMMUNITY_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="RN14 Community Telegram Group"
                title="RN14 Community (@RN14ID)"
                className="grid size-8 place-items-center rounded-lg border border-border text-sky-400 transition-colors hover:bg-muted hover:text-sky-300"
              >
                <TelegramIcon className="size-4" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub repository"
                title="GitHub Repository"
                className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <GithubIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Links: side-by-side on mobile, dissolving into 3-column grid on md+ */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:contents">
            <div>
              <p className="eyebrow">Library</p>
              <ul className="mt-4 space-y-2.5">
                {libraryLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Resources</p>
              <ul className="mt-4 space-y-2.5">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Tanzanite. Community maintained.</p>
          <p>
            Not affiliated with Xiaomi. Flash responsibly and keep a backup.
          </p>
        </div>
      </div>
    </footer>
  );
}
