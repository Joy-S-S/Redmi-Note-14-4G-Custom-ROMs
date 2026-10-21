"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Download,
  ExternalLink,
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
import type { StockRom } from "@/lib/data";
import { formatDate } from "@/lib/format";

type SortOption = "newest" | "oldest" | "version";

function StockRomBrowserContent({ roms }: { roms: StockRom[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [region, setRegion] = useState(() => searchParams.get("region") ?? "all");
  const [hyperos, setHyperos] = useState(() => searchParams.get("os") ?? "all");
  const [sort, setSort] = useState<SortOption>(
    () => (searchParams.get("sort") as SortOption) ?? "newest",
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const availableRegions = useMemo(
    () => [...new Set(roms.map((r) => r.region))].sort(),
    [roms],
  );

  const availableHyperos = useMemo(
    () => [...new Set(roms.map((r) => r.hyperosVersion))].sort().reverse(),
    [roms],
  );

  const syncUrl = useCallback(
    (newParams: { q?: string; region?: string; os?: string; sort?: string }) => {
      const params = new URLSearchParams();
      const qVal = newParams.q !== undefined ? newParams.q : query;
      const rVal = newParams.region !== undefined ? newParams.region : region;
      const oVal = newParams.os !== undefined ? newParams.os : hyperos;
      const sVal = newParams.sort !== undefined ? newParams.sort : sort;

      if (qVal.trim()) params.set("q", qVal.trim());
      if (rVal && rVal !== "all") params.set("region", rVal);
      if (oVal && oVal !== "all") params.set("os", oVal);
      if (sVal && sVal !== "newest") params.set("sort", sVal);

      const qs = params.toString();
      const newUrl = qs ? `${pathname}?${qs}` : pathname;
      window.history.replaceState(null, "", newUrl);
    },
    [hyperos, pathname, query, region, sort],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const result = roms.filter((rom) => {
      const matchesQuery =
        needle === "" ||
        rom.name.toLowerCase().includes(needle) ||
        rom.version.toLowerCase().includes(needle) ||
        rom.region.toLowerCase().includes(needle) ||
        rom.regionCode.toLowerCase().includes(needle);

      const matchesRegion = region === "all" || rom.region === region;
      const matchesHyperos = hyperos === "all" || rom.hyperosVersion === hyperos;

      return matchesQuery && matchesRegion && matchesHyperos;
    });

    result.sort((a, b) => {
      if (sort === "newest") return b.timestamp - a.timestamp;
      if (sort === "oldest") return a.timestamp - b.timestamp;
      if (sort === "version") return b.version.localeCompare(a.version);
      return 0;
    });

    return result;
  }, [hyperos, query, region, roms, sort]);

  const resetFilters = () => {
    setQuery("");
    setRegion("all");
    setHyperos("all");
    setSort("newest");
    syncUrl({ q: "", region: "all", os: "all", sort: "newest" });
  };

  const hasActiveFilters =
    query.trim() !== "" ||
    region !== "all" ||
    hyperos !== "all" ||
    sort !== "newest";

  const filterControlsNode = (
    <div className="flex flex-col gap-5">
      {/* Region */}
      <div>
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Region
        </label>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => {
              setRegion("all");
              syncUrl({ region: "all" });
            }}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              region === "all"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            All regions
          </button>
          {availableRegions.map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => {
                const next = region === reg ? "all" : reg;
                setRegion(next);
                syncUrl({ region: next });
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                region === reg
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* HyperOS Version */}
      <div>
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          HyperOS Release
        </label>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => {
              setHyperos("all");
              syncUrl({ os: "all" });
            }}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              hyperos === "all"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            All releases
          </button>
          {availableHyperos.map((hos) => (
            <button
              key={hos}
              type="button"
              onClick={() => {
                const next = hyperos === hos ? "all" : hos;
                setHyperos(next);
                syncUrl({ os: next });
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                hyperos === hos
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              HyperOS {hos}
            </button>
          ))}
        </div>
      </div>

      {/* Sort order */}
      <div>
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Sort by
        </label>
        <div className="mt-2.5 flex flex-col gap-1 text-xs">
          {[
            { value: "newest", label: "Newest release date" },
            { value: "oldest", label: "Oldest release date" },
            { value: "version", label: "Version string (high to low)" },
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

      {/* Main Table / Cards View */}
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
              placeholder="Search stock ROMs by region, version, or build code..."
              className="h-10 pl-9.5 pr-8 text-sm bg-card"
              aria-label="Search stock ROMs"
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

          <div className="lg:hidden">
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-xs font-medium hover:bg-muted"
                aria-label="Filter stock ROMs"
              >
                <SlidersHorizontal className="size-3.5" />
                <span>Filters</span>
                {hasActiveFilters ? (
                  <span className="size-1.5 rounded-full bg-foreground" />
                ) : null}
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-xs p-5 bg-background">
                <SheetHeader className="border-b border-border pb-3 mb-5">
                  <SheetTitle className="text-sm">Filter Fastboot Firmware</SheetTitle>
                  <SheetDescription className="text-xs">
                    Narrow down builds by region or release.
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
              {filtered.length} {filtered.length === 1 ? "Fastboot Build" : "Fastboot Builds"}
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

            {region !== "all" ? (
              <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-[0.7rem]">
                Region: {region}
                <button
                  type="button"
                  onClick={() => {
                    setRegion("all");
                    syncUrl({ region: "all" });
                  }}
                  className="hover:text-foreground"
                  aria-label="Remove region filter"
                >
                  <X className="size-2.5" />
                </button>
              </span>
            ) : null}

            {hyperos !== "all" ? (
              <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-[0.7rem]">
                HyperOS {hyperos}
                <button
                  type="button"
                  onClick={() => {
                    setHyperos("all");
                    syncUrl({ os: "all" });
                  }}
                  className="hover:text-foreground"
                  aria-label="Remove OS filter"
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

          <div className="flex items-center gap-3">
            <a
              href="https://miuirom.org/phones/redmi-note-14-4g"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.72rem] text-muted-foreground transition-colors hover:text-foreground hover:underline"
              title="Official catalog on miuirom.org"
            >
              <ExternalLink className="size-3 text-muted-foreground" />
              <span>Source: miuirom.org</span>
            </a>

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
        </div>

        {/* Desktop Table View */}
        {filtered.length > 0 ? (
          <>
            <div className="surface mt-6 hidden overflow-hidden lg:block">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border bg-muted/40 font-mono uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 font-semibold">Region</th>
                    <th className="py-3.5 px-3 font-semibold">Build &amp; Version</th>
                    <th className="py-3.5 px-3 font-semibold">Base</th>
                    <th className="py-3.5 px-3 font-semibold">Date</th>
                    <th className="py-3.5 px-3 font-semibold">Size</th>
                    <th className="py-3.5 pl-3 pr-4 text-right font-semibold">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((rom) => (
                    <tr
                      key={rom.id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <td className="py-3.5 pl-4 pr-3 font-medium text-foreground whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.65rem] font-bold text-foreground">
                            {rom.regionCode}
                          </span>
                          <span>{rom.region}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <p className="font-semibold text-foreground">{rom.name}</p>
                        <p className="font-mono text-[0.7rem] text-muted-foreground mt-0.5">
                          {rom.version}
                        </p>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-foreground">
                            HyperOS {rom.hyperosVersion}
                          </span>
                          <span className="text-[0.7rem] text-muted-foreground">
                            Android {rom.androidVersion}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-muted-foreground whitespace-nowrap">
                        {formatDate(rom.date)}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-[0.7rem] text-muted-foreground whitespace-nowrap">
                        {rom.size}
                      </td>
                      <td className="py-3.5 pl-3 pr-4 text-right whitespace-nowrap">
                        <a
                          href={rom.downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                        >
                          <Download className="size-3.5" />
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="mt-6 grid gap-3 lg:hidden">
              {filtered.map((rom) => (
                <article
                  key={rom.id}
                  className="surface flex flex-col justify-between p-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.65rem] font-bold text-foreground">
                          {rom.regionCode}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          {rom.region}
                        </span>
                      </div>
                      <Badge variant="outline" className="border-border font-mono text-[0.65rem]">
                        HyperOS {rom.hyperosVersion}
                      </Badge>
                    </div>

                    <div className="mt-2.5">
                      <h3 className="text-sm font-semibold tracking-tight">
                        {rom.name}
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground mt-0.5">
                        {rom.version}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>Android {rom.androidVersion}</span>
                      <span>{formatDate(rom.date)}</span>
                      <span className="font-mono">{rom.size}</span>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-border pt-3">
                    <a
                      href={rom.downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-primary text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                    >
                      <Download className="size-3.5" />
                      Download Fastboot (.tgz)
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-sm font-medium text-foreground">
              No stock firmware matching criteria
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your region or version filter.
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
  );
}

export function StockRomBrowser({ roms }: { roms: StockRom[] }) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-muted-foreground">
          Loading stock firmware...
        </div>
      }
    >
      <StockRomBrowserContent roms={roms} />
    </Suspense>
  );
}
