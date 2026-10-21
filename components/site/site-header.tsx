"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink, Menu } from "lucide-react";
import {
  GithubIcon,
  TanzaniteLogo,
  TelegramIcon,
  YoutubeIcon,
} from "@/components/site/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  GITHUB_URL,
  TELEGRAM_COMMUNITY_URL,
  TELEGRAM_SUPPORT_URL,
  YOUTUBE_URL,
  navGroups,
  simpleNav,
  type NavItem,
} from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

function Brand() {
  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-2.5 rounded-lg"
      aria-label="Tanzanite home"
    >
      <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[0.7rem] shadow-sm transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105">
        <TanzaniteLogo className="size-full" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-semibold tracking-[-0.02em]">
          Tanzanite
        </span>
        <span className="mt-1 font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase">
          Redmi Note 14 4G
        </span>
      </span>
    </Link>
  );
}

function NavItemLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      className={cn(
        "rounded-md px-2.5 py-2 text-[0.82rem] font-medium text-muted-foreground transition-colors hover:text-foreground",
        active && "text-foreground",
      )}
    >
      {item.label}
    </Link>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={buttonVariants({ variant: "ghost", size: "icon" })}
        aria-label="Open navigation menu"
      >
        <Menu />
      </SheetTrigger>
      <SheetContent
        className="w-[90vw] max-w-sm overflow-y-auto bg-background p-0"
        showCloseButton
      >
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle className="text-base">Navigation</SheetTitle>
          <SheetDescription className="text-xs">
            ROMs, modules, and flashing resources for tanzanite.
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col gap-7 p-5" aria-label="Mobile">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="eyebrow mb-2 px-2">{group.label}</p>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex flex-col gap-0.5 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-muted",
                        active && "bg-muted",
                      )}
                    >
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div>
            <p className="eyebrow mb-2 px-2">More</p>
            <div className="flex flex-col gap-0.5">
              {simpleNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
                    isActive(pathname, item.href) && "bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                <YoutubeIcon className="size-4 text-red-500" />
                YouTube channel (@Joy_Sayed)
              </a>
              <a
                href={TELEGRAM_SUPPORT_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                <TelegramIcon className="size-4 text-sky-400" />
                JoySS Support (@JoySS_Support)
              </a>
              <a
                href={TELEGRAM_COMMUNITY_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                <TelegramIcon className="size-4 text-sky-400" />
                RN14 Community (@RN14ID)
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                <GithubIcon className="size-4" />
                GitHub repository
              </a>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center gap-4">
        <Brand />

        <nav
          className="ml-2 hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {navGroups.map((group) => {
            const active = group.items.some((item) =>
              isActive(pathname, item.href),
            );
            return (
              <DropdownMenu key={group.label}>
                <DropdownMenuTrigger
                  className={cn(
                    "inline-flex h-9 items-center gap-1 rounded-md px-2.5 text-[0.82rem] font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                    active && "text-foreground",
                  )}
                >
                  {group.label}
                  <ChevronDown className="size-3.5 opacity-60" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={8}
                  className="w-[19rem] bg-popover p-1.5"
                >
                  {group.items.map((item) => (
                    <DropdownMenuItem
                      key={item.href}
                      render={<Link href={item.href} />}
                      nativeButton={false}
                      className="flex-col items-start gap-1 px-2.5 py-2.5"
                    >
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}

          {simpleNav.map((item) => (
            <NavItemLink key={item.href} item={item} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
            aria-label="Joy Sayed YouTube Channel"
            title="YouTube Channel (@Joy_Sayed)"
          >
            <YoutubeIcon className="size-4 text-red-500 hover:text-red-400 transition-colors" />
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "cursor-pointer",
              )}
              aria-label="Telegram groups"
              title="Telegram Groups"
            >
              <TelegramIcon className="size-4 text-sky-400 hover:text-sky-300 transition-colors" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-64 p-1.5">
              <DropdownMenuItem
                render={
                  <a
                    href={TELEGRAM_SUPPORT_URL}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                nativeButton={false}
                className="flex-col items-start gap-0.5 px-2.5 py-2 cursor-pointer"
              >
                <div className="flex w-full items-center gap-1.5 font-medium text-xs">
                  <TelegramIcon className="size-3.5 text-sky-400" />
                  <span>JoySS Support</span>
                  <ExternalLink className="size-3 ml-auto opacity-50" />
                </div>
                <span className="text-[11px] text-muted-foreground">
                  Creator channel &amp; updates (@JoySS_Support)
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem
                render={
                  <a
                    href={TELEGRAM_COMMUNITY_URL}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                nativeButton={false}
                className="flex-col items-start gap-0.5 px-2.5 py-2 cursor-pointer"
              >
                <div className="flex w-full items-center gap-1.5 font-medium text-xs">
                  <TelegramIcon className="size-3.5 text-sky-400" />
                  <span>RN14 Community</span>
                  <ExternalLink className="size-3 ml-auto opacity-50" />
                </div>
                <span className="text-[11px] text-muted-foreground">
                  Redmi Note 14 4G discussion (@RN14ID)
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
            aria-label="Open GitHub repository"
            title="GitHub Repository"
          >
            <GithubIcon className="size-4" />
          </a>

          <Link
            href="/guide/"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "hidden h-8 px-3 sm:inline-flex",
            )}
          >
            Flash guide
          </Link>

          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
