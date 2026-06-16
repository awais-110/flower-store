import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]",
        variant === "primary" && "bg-[var(--gradient)] text-white shadow-[0_16px_40px_rgba(99,102,241,0.24)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.3)]",
        variant === "secondary" && "border border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10 hover:text-white",
        variant === "ghost" && "bg-transparent text-white/60 hover:bg-white/5 hover:text-white",
        className,
      )}
      {...props}
    />
  );
}
