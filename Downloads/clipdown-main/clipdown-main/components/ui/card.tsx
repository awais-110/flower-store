import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass rounded-lg p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition-all duration-200 hover:border-white/15", className)} {...props} />;
}
