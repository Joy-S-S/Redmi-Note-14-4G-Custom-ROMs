"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Code,
  Download,
  Search,
  Terminal,
  User,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Module } from "@/lib/data";

function ModuleBrowserContent({
  modules,
  categoryLabel,
}: {
  modules: Module[];
  categoryLabel: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [author, setAuthor] = useState(() => searchParams.get("author") ?? "all");

  const availableAuthors = useMemo(
    () => [...new Set(modules.map((m) => m.author))].sort(),
    [modules],
  );

  const syncUrl = useCallback(
    (newParams: { q?: string; author?: string }) => {
      const params = new URLSearchParams();
      const qVal = newParams.q !== undefined ? newParams.q : query;
      const aVal = newParams.author !== undefined ? newParams.author : author;

      if (qVal.trim()) params.set("q", qVal.trim());
      if (aVal && aVal !== "all") params.set("author", aVal);

      const qs = params.toString();
      const newUrl = qs ? `${pathname}?${qs}` : pathname;
      window.history.replaceState(null, "", newUrl);
    },
    [author, pathname, query],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return modules.filter((m) => {
      const matchesQuery =
        needle === "" ||
        m.name.toLowerCase().includes(needle) ||
        m.author.toLowerCase().includes(needle) ||
        m.usage.toLowerCase().includes(needle);

      const matchesAuthor = author === "all" || m.author === author;

      return matchesQuery && matchesAuthor;
    });
  }, [author, modules, query]);

  const resetFilters = () => {
    setQuery("");
    setAuthor("all");
    syncUrl({ q: "", author: "all" });
  };

  const hasActiveFilters = query.trim() !== "" || author !== "all";

  return (
    <div className="w-full max-w-full min-w-0">
      {/* Search & Author Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              syncUrl({ q: e.target.value });
            }}
            placeholder={`Search ${categoryLabel.toLowerCase()} by name, author, or function...`}
            className="h-10 pl-9.5 pr-8 text-sm bg-card"
            aria-label="Search modules"
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

        {availableAuthors.length > 1 ? (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-muted-foreground mr-1">Author:</span>
            <button
              type="button"
              onClick={() => {
                setAuthor("all");
                syncUrl({ author: "all" });
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                author === "all"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {availableAuthors.map((auth) => (
              <button
                key={auth}
                type="button"
                onClick={() => {
                  const next = author === auth ? "all" : auth;
                  setAuthor(next);
                  syncUrl({ author: next });
                }}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  author === auth
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {auth}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Filter status & counts */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-border font-mono text-[0.7rem]">
            {filtered.length} {filtered.length === 1 ? "Module" : "Modules"}
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
                aria-label="Remove search"
              >
                <X className="size-2.5" />
              </button>
            </span>
          ) : null}

          {author !== "all" ? (
            <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-[0.7rem]">
              Author: {author}
              <button
                type="button"
                onClick={() => {
                  setAuthor("all");
                  syncUrl({ author: "all" });
                }}
                className="hover:text-foreground"
                aria-label="Remove author"
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
            Clear filters
          </button>
        ) : null}
      </div>

      {/* Modules Cards Grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 min-w-0 max-w-full">
          {filtered.map((mod) => (
            <article
              key={mod.id}
              className="surface flex flex-col justify-between p-5 transition-colors hover:border-white/20 min-w-0 max-w-full"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-muted">
                      <Terminal className="size-4 text-foreground" />
                    </span>
                    <h3 className="text-sm font-semibold tracking-tight">
                      {mod.name}
                    </h3>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-border font-mono text-[0.65rem] shrink-0"
                  >
                    {mod.type || "Magisk"}
                  </Badge>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <User className="size-3" />
                  <span>by {mod.author}</span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {mod.usage}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-border pt-4">
                <a
                  href={mod.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary text-xs font-medium text-primary-foreground hover:bg-primary/80"
                >
                  <Download className="size-3.5" />
                  Download
                </a>
                {mod.sourceUrl ? (
                  <a
                    href={mod.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                    title="View Source Code"
                  >
                    <Code className="size-3.5" />
                    Source
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-sm font-medium text-foreground">
            No modules match your search
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try adjusting your search query or selecting all authors.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="mt-4"
          >
            Reset search
          </Button>
        </div>
      )}
    </div>
  );
}

export function ModuleBrowser({
  modules,
  categoryLabel,
}: {
  modules: Module[];
  categoryLabel: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-muted-foreground">
          Loading modules...
        </div>
      }
    >
      <ModuleBrowserContent
        modules={modules}
        categoryLabel={categoryLabel}
      />
    </Suspense>
  );
}
