import Link from "next/link";
import { Home, Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="container-page max-w-md">
        <span className="font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          404 Error
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The requested page or firmware link does not exist. It may have been moved during
          our recent architecture upgrade.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "default" }), "h-10 px-4 text-xs font-medium")}
          >
            <Home className="mr-1.5 size-3.5" />
            Home page
          </Link>
          <Link
            href="/roms/"
            className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4 text-xs font-medium")}
          >
            <Search className="mr-1.5 size-3.5" />
            Custom ROMs
          </Link>
          <Link
            href="/guide/"
            className={cn(buttonVariants({ variant: "ghost" }), "h-10 px-4 text-xs font-medium text-muted-foreground hover:text-foreground")}
          >
            Flashing Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
