import {
  CircleAlert,
  CircleCheck,
  Info,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

const styles = {
  note: {
    icon: Info,
    className: "border-border bg-muted/40 text-muted-foreground",
    iconClassName: "text-foreground",
  },
  warning: {
    icon: TriangleAlert,
    className: "border-warning/25 bg-warning/[0.06] text-warning/90",
    iconClassName: "text-warning",
  },
  danger: {
    icon: CircleAlert,
    className: "border-destructive/25 bg-destructive/[0.06] text-destructive/90",
    iconClassName: "text-destructive",
  },
  success: {
    icon: CircleCheck,
    className: "border-success/25 bg-success/[0.06] text-success/90",
    iconClassName: "text-success",
  },
} as const;

export function Callout({
  variant = "note",
  title,
  children,
  className,
}: {
  variant?: keyof typeof styles;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const style = styles[variant];
  const Icon = style.icon;

  return (
    <div
      className={cn(
        "flex w-full max-w-full min-w-0 gap-3 rounded-xl border p-4 text-sm leading-relaxed",
        style.className,
        className,
      )}
    >
      <Icon className={cn("mt-0.5 size-4 shrink-0", style.iconClassName)} />
      <div className="min-w-0 flex-1 break-words">
        {title ? (
          <p className="mb-1 font-medium text-foreground">{title}</p>
        ) : null}
        <div className="break-words [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_p+p]:mt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
