'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
};

const navItems = [
  { href: "/#features", label: "Features" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/75 p-4 backdrop-blur-sm md:hidden">
      <div className="glass mx-auto mt-16 max-w-sm rounded-[28px] p-6 shadow-2xl shadow-black/40">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-[0.2em] text-white/60 uppercase">Menu</span>
          <button type="button" onClick={onClose} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
            Close
          </button>
        </div>
        <div className="grid gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Button className="mt-6 w-full rounded-2xl py-3" variant="primary">
          Download Free
        </Button>
      </div>
    </div>
  );
}
