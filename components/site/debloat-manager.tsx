"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Search,
  ShieldAlert,
  Video,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Callout } from "@/components/site/callout";
import { CopyButton } from "@/components/site/copy-button";
import { criticalApps, debloatCategories } from "@/lib/data";

export function DebloatManager() {
  const [query, setQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    google: true,
    xiaomi: true,
    amazon: false,
    netflix: false,
    opera: false,
    facebook: false,
  });

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    debloatCategories.forEach((cat) => {
      all[cat.id] = true;
    });
    setOpenCategories(all);
  };

  const collapseAll = () => {
    setOpenCategories({});
  };

  // Filter apps in each category by query
  const filteredCategories = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return debloatCategories;

    return debloatCategories
      .map((cat) => ({
        ...cat,
        apps: cat.apps.filter(
          (app) =>
            app.name.toLowerCase().includes(needle) ||
            app.package.toLowerCase().includes(needle) ||
            app.description.toLowerCase().includes(needle),
        ),
      }))
      .filter((cat) => cat.apps.length > 0);
  }, [query]);

  // Total safe apps count
  const totalSafeApps = useMemo(
    () => filteredCategories.reduce((acc, cat) => acc + cat.apps.length, 0),
    [filteredCategories],
  );

  // Copy all ADB commands for current view
  const copyAllVisibleCommands = async () => {
    const allPackages = filteredCategories.flatMap((cat) =>
      cat.apps.map((app) => `adb shell pm uninstall --user 0 ${app.package}`),
    );

    if (!allPackages.length) return;

    try {
      await navigator.clipboard.writeText(allPackages.join("\n"));
      toast.success(`Copied ${allPackages.length} uninstall commands to clipboard`);
    } catch {
      toast.error("Failed to copy commands automatically");
    }
  };

  // Copy commands for a single category
  const copyCategoryCommands = async (catApps: typeof criticalApps, label: string) => {
    const cmds = catApps.map(
      (app) => `adb shell pm uninstall --user 0 ${app.package}`,
    );
    try {
      await navigator.clipboard.writeText(cmds.join("\n"));
      toast.success(`Copied ${cmds.length} ${label} commands`);
    } catch {
      toast.error("Failed to copy commands");
    }
  };

  return (
    <div className="space-y-8 w-full max-w-full min-w-0">
      {/* Disclaimer Callout */}
      <Callout variant="warning" title="Debloating Precautions">
        <p>
          Debloating removes preinstalled packages via ADB for the current user (<code className="font-mono text-xs">--user 0</code>).
          It does not permanently delete the APK from the read-only system image, meaning factory resetting restores them.
          Only remove packages you recognize. Never uninstall items from the Critical section below.
        </p>
      </Callout>

      {/* Video Tutorial Link & Overview */}
      <div className="surface p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold">Need visual instructions?</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Watch how to enable USB debugging, pair ADB on your computer, and run commands.
          </p>
        </div>
        <Link
          href="/tutorials/#debloat-tutorial"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-muted shrink-0"
        >
          <Video className="size-3.5" />
          Watch Debloat Tutorial
        </Link>
      </div>

      {/* Search & Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages, app names, or descriptions..."
            className="h-10 pl-9.5 pr-8 text-sm bg-card"
            aria-label="Search bloatware packages"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={copyAllVisibleCommands}
            disabled={totalSafeApps === 0}
            className="text-xs h-9"
          >
            <Copy className="size-3.5 mr-1" />
            Copy All Commands ({totalSafeApps})
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={expandAll}
            className="text-xs h-9 text-muted-foreground hover:text-foreground"
          >
            Expand All
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={collapseAll}
            className="text-xs h-9 text-muted-foreground hover:text-foreground"
          >
            Collapse All
          </Button>
        </div>
      </div>

      {/* Accordion Categories */}
      <div className="space-y-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => {
            const isOpen = Boolean(openCategories[category.id]);
            return (
              <div key={category.id} className="surface overflow-hidden">
                {/* Category Header */}
                <div className="flex items-center justify-between p-4 sm:px-5">
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="flex flex-1 items-center gap-2 text-left font-semibold text-sm hover:underline"
                    aria-expanded={isOpen}
                  >
                    <span>{category.label}</span>
                    <Badge variant="outline" className="border-border font-mono text-[0.65rem]">
                      {category.apps.length}
                    </Badge>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        copyCategoryCommands(category.apps, category.label)
                      }
                      className="rounded-md border border-border bg-card px-2 py-1 text-[0.7rem] font-medium text-muted-foreground hover:text-foreground"
                    >
                      Copy Category
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className="p-1 text-muted-foreground hover:text-foreground"
                      aria-label={isOpen ? "Collapse" : "Expand"}
                    >
                      {isOpen ? (
                        <ChevronUp className="size-4" />
                      ) : (
                        <ChevronDown className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Category Apps Grid */}
                {isOpen ? (
                  <div className="border-t border-border divide-y divide-border/60 bg-muted/20">
                    {category.apps.map((app) => {
                      const adbCommand = `adb shell pm uninstall --user 0 ${app.package}`;
                      return (
                        <div
                          key={app.package}
                          className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs min-w-0"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">
                                {app.name}
                              </span>
                            </div>
                            <div className="mt-1 font-mono text-[0.72rem] text-muted-foreground select-all break-all">
                              <code>{adbCommand}</code>
                            </div>
                            <p className="mt-1 text-muted-foreground break-words">
                              {app.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <CopyButton
                              value={adbCommand}
                              label="Copy command"
                              size="sm"
                              className="text-[0.7rem]"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-sm font-medium text-foreground">No packages matched your search</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try typing a different keyword or app package.
            </p>
          </div>
        )}
      </div>

      {/* Critical Packages Section (Do Not Remove) */}
      <section className="mt-12 rounded-xl border border-destructive/30 bg-destructive/[0.03] p-5 sm:p-6 min-w-0 max-w-full">
        <div className="flex items-center gap-2.5 text-destructive">
          <ShieldAlert className="size-5 shrink-0" />
          <h3 className="text-base font-semibold">Critical System Apps — DO NOT REMOVE</h3>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          The following packages are vital for the Android framework, phone calling, emergency services,
          and hardware sensors on the Redmi Note 14 4G. Removing them will cause unexpected system crashes
          or prevent the phone from booting.
        </p>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {criticalApps.map((app) => (
            <div
              key={app.package}
              className="rounded-lg border border-destructive/20 bg-background/60 p-3 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">{app.name}</span>
                <span className="rounded bg-destructive/10 px-1.5 py-0.5 font-mono text-[0.6rem] font-semibold text-destructive">
                  Keep
                </span>
              </div>
              <p className="mt-1 font-mono text-[0.68rem] text-muted-foreground truncate">
                {app.package}
              </p>
              <p className="mt-1 text-[0.7rem] text-muted-foreground">
                {app.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
