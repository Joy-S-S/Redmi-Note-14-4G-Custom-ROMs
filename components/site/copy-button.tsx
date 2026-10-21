"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  label = "Copy",
  className,
  size = "sm",
}: {
  value: string;
  label?: string;
  className?: string;
  size?: "sm" | "icon";
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Could not copy. Select the text manually.");
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size={size}
      onClick={copy}
      className={cn("shrink-0", className)}
      aria-label={label}
    >
      {copied ? <Check /> : <Copy />}
      {size !== "icon" ? <span>{copied ? "Copied" : label}</span> : null}
    </Button>
  );
}
