import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-14 w-full rounded-full border border-border bg-white/5 px-5 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary/70 focus:bg-white/[0.07]",
        className,
      )}
      {...props}
    />
  );
}
