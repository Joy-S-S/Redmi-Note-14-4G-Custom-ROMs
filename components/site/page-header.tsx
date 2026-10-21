import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  crumbs,
  meta,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  crumbs?: Crumb[];
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("w-full border-b border-border", className)}>
      <div className="container-page py-12 sm:py-16">
        {crumbs?.length ? (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3 opacity-50" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end min-w-0 max-w-full">
          <div className="max-w-3xl min-w-0">
            {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
            <h1 className="text-balance break-words text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-2xl text-pretty text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                {description}
              </p>
            ) : null}
            {children ? <div className="mt-7">{children}</div> : null}
          </div>
          {meta ? <div className="lg:pb-1">{meta}</div> : null}
        </div>
      </div>
    </section>
  );
}
