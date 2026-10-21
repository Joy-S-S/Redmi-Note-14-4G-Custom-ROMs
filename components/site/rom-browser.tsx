"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RomCard } from "@/components/site/rom-card";
import { RomDetailsSheet } from "@/components/site/rom-details";
import type { CustomRom, PortedRom } from "@/lib/data";

type Rom = CustomRom | PortedRom;

type SortOption = "newest" | "oldest" | "name-asc" | "name-desc";

function RomBrowserContent({
  roms,
  isPorted = false,
}: {
  roms: Rom[];
  isPorted?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [android, setAndroid] = useState(() => searchParams.get("android") ?? "all");
  const [gapps, setGapps] = useState(() => searchParams.get("gapps") ?? "all");
  const [status, setStatus] = useState(() => searchParams.get("status") ?? "all");
  const [sort, setSort] = useState<SortOption>(
    () => (searchParams.get("sort") as SortOption) ?? "newest",
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Selected ROM initialized from URL param
  const [selectedRom, setSelectedRom] = useState<Rom | null>(() => {
    const romParam = searchParams.get("rom");
    if (!romParam) return null;
    return (
      roms.find((r) => r.slug === romParam || String(r.id) === romParam) ?? null
    );
  });

  // Available filter values
  const androidVersions = useMemo(
    () =>
      [...new Set(roms.map((rom) => rom.androidVersion))].sort(
        (a, b) => Number(b) - Number(a),
      ),
    [roms],
  );

  const statuses = useMemo(
    () =>
      [
        ...new Set(
          roms
            .map((rom) => ("status" in rom ? rom.status : undefined))
            .filter((s): s is string => Boolean(s)),
        ),
      ],
    [roms],
  );

  // Sync URL query params with state
  const syncUrl = useCallback(
    (newParams: {
      q?: string;
      android?: string;
      gapps?: string;
      status?: string;
      sort?: string;
      rom?: string | null;
    }) => {
      const params = new URLSearchParams();

      const qVal = newParams.q !== undefined ? newParams.q : query;
      const aVal = newParams.android !== undefined ? newParams.android : android;
      const gVal = newParams.gapps !== undefined ? newParams.gapps : gapps;
      const sVal = newParams.status !== undefined ? newParams.status : status;
      const sortVal = newParams.sort !== undefined ? newParams.sort : sort;
      const romSlug =
        newParams.rom !== undefined
          ? newParams.rom
          : selectedRom
            ? selectedRom.slug
            : null;

      if (qVal.trim()) params.set("q", qVal.trim());
      if (aVal && aVal !== "all") params.set("android", aVal);
      if (gVal && gVal !== "all") params.set("gapps", gVal);
      if (isPorted && sVal && sVal !== "all") params.set("status", sVal);
      if (sortVal && sortVal !== "newest") params.set("sort", sortVal);
      if (romSlug) params.set("rom", romSlug);

      const qs = params.toString();
      const newUrl = qs ? `${pathname}?${qs}` : pathname;
      window.history.replaceState(null, "", newUrl);
    },
    [android, gapps, isPorted, pathname, query, selectedRom, sort, status],
  );

  // Handle ROM select
  const handleOpenRom = (rom: Rom) => {
    setSelectedRom(rom);
    syncUrl({ rom: rom.slug });
  };

  const handleCloseRom = (open: boolean) => {
    if (!open) {
      setSelectedRom(null);
      syncUrl({ rom: null });
    }
  };

  // Filter & sort logic
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const result = roms.filter((rom) => {
      const matchesQuery =
        needle === "" ||
        rom.name.toLowerCase().includes(needle) ||
        rom.developer.toLowerCase().includes(needle) ||
        ("originalDevice" in rom && rom.originalDevice
          ? rom.originalDevice.toLowerCase().includes(needle)
          : false);

      const matchesAndroid = android === "all" || rom.androidVersion === android;
      const matchesGapps =
        gapps === "all" ||
        (gapps === "yes" && (rom.gapps || Boolean(rom.downloadGappsUrl))) ||
        (gapps === "no" && (!rom.gapps || Boolean(rom.downloadVanillaUrl)));
      const matchesStatus =
        !isPorted ||
        status === "all" ||
        !("status" in rom) ||
        rom.status === status;

      return matchesQuery && matchesAndroid && matchesGapps && matchesStatus;
    });

    result.sort((a, b) => {
      if (sort === "newest") return b.timestamp - a.timestamp;
      if (sort === "oldest") return a.timestamp - b.timestamp;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

    return result;
  }, [android, gapps, isPorted, query, roms, sort, status]);

  // Reset filters
  const resetFilters = () => {
    setQuery("");
    setAndroid("all");
    setGapps("all");
    setStatus("all");
    setSort("newest");
    syncUrl({
      q: "",
      android: "all",
      gapps: "all",
      status: "all",
      sort: "newest",
    });
  };

  const hasActiveFilters =
    query.trim() !== "" ||
    android !== "all" ||
    gapps !== "all" ||
    (isPorted && status !== "all") ||
    sort !== "newest";

  // Filter controls JSX
  const filterControlsNode = (
    <div className="flex flex-col gap-5">
      {/* Android Version */}
      <div>
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Android Version
        </label>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => {
              setAndroid("all");
              syncUrl({ android: "all" });
            }}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              android === "all"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {androidVersions.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => {
                const next = android === v ? "all" : v;
                setAndroid(next);
                syncUrl({ android: next });
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                android === v
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              Android {v}
            </button>
          ))}
        </div>
      </div>

      {/* GApps Status */}
      <div>
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Google Apps
        </label>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => {
              setGapps("all");
              syncUrl({ gapps: "all" });
            }}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              gapps === "all"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            Any
          </button>
          <button
            type="button"
            onClick={() => {
              const next = gapps === "yes" ? "all" : "yes";
              setGapps(next);
              syncUrl({ gapps: next });
            }}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              gapps === "yes"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            Included
          </button>
          <button
            type="button"
            onClick={() => {
              const next = gapps === "no" ? "all" : "no";
              setGapps(next);
              syncUrl({ gapps: next });
            }}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              gapps === "no"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            Vanilla (No GApps)
          </button>
        </div>
      </div>

      {/* Status (Ported only) */}
      {isPorted && statuses.length > 0 ? (
        <div>
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
            Build Status
          </label>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => {
                setStatus("all");
                syncUrl({ status: "all" });
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                status === "all"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {statuses.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  const next = status === st ? "all" : st;
                  setStatus(next);
                  syncUrl({ status: next });
                }}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                  status === st
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Sort order */}
      <div>
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Sort by
        </label>
        <div className="mt-2.5 flex flex-col gap-1 text-xs">
          {[
            { value: "newest", label: "Newest release date" },
            { value: "oldest", label: "Oldest release date" },
            { value: "name-asc", label: "Name (A to Z)" },
            { value: "name-desc", label: "Name (Z to A)" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setSort(opt.value as SortOption);
                syncUrl({ sort: opt.value });
              }}
              className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left font-medium transition-colors ${
                sort === opt.value
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <span>{opt.label}</span>
              {sort === opt.value ? (
                <span className="size-1.5 rounded-full bg-foreground" />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters ? (
        <button
          type="button"
          onClick={resetFilters}
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="size-3" />
          Reset all filters
        </button>
      ) : null}
    </div>
  );

  return (
    <>
      <div className="grid w-full max-w-full min-w-0 gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="surface hidden p-5 lg:block sticky top-24">
          <div className="flex items-center justify-between border-b border-border pb-3.5 mb-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Filters
            </span>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[0.7rem] text-muted-foreground hover:text-foreground underline underline-offset-2"
              >
                Clear
              </button>
            ) : null}
          </div>
          {filterControlsNode}
        </aside>

        {/* Main Content Area */}
        <div className="min-w-0 max-w-full">
          {/* Search Bar & Mobile Trigger */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  syncUrl({ q: e.target.value });
                }}
                placeholder="Search ROMs by name, developer, or base..."
                className="h-10 pl-9.5 pr-8 text-sm bg-card"
                aria-label="Search ROMs"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    syncUrl({ q: "" });
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              ) : null}
            </div>

            {/* Mobile Filter Sheet Trigger */}
            <div className="lg:hidden">
              <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                <SheetTrigger
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-xs font-medium hover:bg-muted"
                  aria-label="Filter ROMs"
                >
                  <SlidersHorizontal className="size-3.5" />
                  <span>Filters</span>
                  {hasActiveFilters ? (
                    <span className="size-1.5 rounded-full bg-foreground" />
                  ) : null}
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] max-w-xs p-5 bg-background">
                  <SheetHeader className="border-b border-border pb-3 mb-5">
                    <SheetTitle className="text-sm">Filter Catalog</SheetTitle>
                    <SheetDescription className="text-xs">
                      Narrow down builds for your needs.
                    </SheetDescription>
                  </SheetHeader>
                  {filterControlsNode}
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Filter Chips & Result Count */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-border font-mono text-[0.7rem]">
                {filtered.length} {filtered.length === 1 ? "ROM" : "ROMs"}
              </Badge>

              {query.trim() ? (
                <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-[0.7rem]">
                  Search: &ldquo;{query}&rdquo;
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      syncUrl({ q: "" });
                    }}
                    className="hover:text-foreground"
                    aria-label="Remove search filter"
                  >
                    <X className="size-2.5" />
                  </button>
                </span>
              ) : null}

              {android !== "all" ? (
                <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-[0.7rem]">
                  Android {android}
                  <button
                    type="button"
                    onClick={() => {
                      setAndroid("all");
                      syncUrl({ android: "all" });
                    }}
                    className="hover:text-foreground"
                    aria-label="Remove Android filter"
                  >
                    <X className="size-2.5" />
                  </button>
                </span>
              ) : null}

              {gapps !== "all" ? (
                <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-[0.7rem]">
                  {gapps === "yes" ? "GApps included" : "No GApps"}
                  <button
                    type="button"
                    onClick={() => {
                      setGapps("all");
                      syncUrl({ gapps: "all" });
                    }}
                    className="hover:text-foreground"
                    aria-label="Remove GApps filter"
                  >
                    <X className="size-2.5" />
                  </button>
                </span>
              ) : null}

              {isPorted && status !== "all" ? (
                <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-[0.7rem] capitalize">
                  Status: {status}
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("all");
                      syncUrl({ status: "all" });
                    }}
                    className="hover:text-foreground"
                    aria-label="Remove status filter"
                  >
                    <X className="size-2.5" />
                  </button>
                </span>
              ) : null}

              {sort !== "newest" ? (
                <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-[0.7rem]">
                  Sort: {sort}
                  <button
                    type="button"
                    onClick={() => {
                      setSort("newest");
                      syncUrl({ sort: "newest" });
                    }}
                    className="hover:text-foreground"
                    aria-label="Reset sort"
                  >
                    <X className="size-2.5" />
                  </button>
                </span>
              ) : null}
            </div>

            {hasActiveFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className="font-medium text-foreground hover:underline"
              >
                Clear all filters
              </button>
            ) : null}
          </div>

          {/* Cards Grid or Empty State */}
          {filtered.length > 0 ? (
            <div className="mt-6 grid gap-3">
              {filtered.map((rom) => (
                <RomCard
                  key={rom.id}
                  rom={rom}
                  onOpen={handleOpenRom}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
              <p className="text-sm font-medium text-foreground">
                No ROMs found matching criteria
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try loosening your search terms or resetting the active filters.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="mt-4"
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Selected ROM Detail Sheet */}
      {selectedRom ? (
        <RomDetailsSheet
          rom={selectedRom}
          onOpenChange={handleCloseRom}
        />
      ) : null}
    </>
  );
}

export function RomBrowser({
  roms,
  isPorted = false,
}: {
  roms: Rom[];
  isPorted?: boolean;
}) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-muted-foreground">
          Loading catalog...
        </div>
      }
    >
      <RomBrowserContent roms={roms} isPorted={isPorted} />
    </Suspense>
  );
}
