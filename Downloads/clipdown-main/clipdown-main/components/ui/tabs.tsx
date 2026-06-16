import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TabProps = HTMLAttributes<HTMLButtonElement> & { active?: boolean };

export function Tabs({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-3", className)}>{children}</div>;
}

export function Tab({ active, className, ...props }: TabProps) {
  return (
    <button
      className={cn(
        "rounded-2xl border px-4 py-2 text-sm font-medium transition-all duration-200",
        active ? "border-white/20 bg-[var(--gradient-subtle)] text-white shadow-[0_12px_30px_rgba(99,102,241,0.2)]" : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white",
        className,
      )}
      {...props}
    />
  );
}

export function TabsList({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}
