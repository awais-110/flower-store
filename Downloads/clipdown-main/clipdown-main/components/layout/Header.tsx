"use client";

import { useState } from "react";
import { CloudDownload, Menu, X } from "lucide-react";
import Link from "next/link";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#e5edf6] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex min-h-11 min-w-0 flex-shrink-0 items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0b84ff] text-white shadow-[0_12px_28px_rgba(11,132,255,0.24)]">
            <CloudDownload className="h-5 w-5" />
          </div>
          <span className="truncate text-xl font-black tracking-normal text-[#171b22]">
            Video<span className="text-[#0b84ff]">Snap</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Link href="/#download" className="inline-flex min-h-11 items-center rounded-xl px-4 text-sm font-black text-[#394150] transition hover:bg-[#f1f6fc] hover:text-[#0b84ff]">
            Paste Link
          </Link>
          <Link href="/#features" className="inline-flex min-h-11 items-center rounded-xl px-4 text-sm font-black text-[#394150] transition hover:bg-[#f1f6fc] hover:text-[#0b84ff]">
            Platforms
          </Link>
          <Link href="/#download" className="inline-flex min-h-11 items-center rounded-xl bg-[#111827] px-5 text-sm font-black text-white shadow-[0_12px_28px_rgba(17,24,39,0.18)] transition hover:bg-[#0b84ff]">
            Download
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#f2f6fb] text-[#171b22] transition hover:bg-[#e8f1fb] md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="mx-3 mb-3 rounded-2xl border border-[#dfe7f2] bg-white p-3 shadow-[0_18px_50px_rgba(32,54,86,0.10)] md:hidden">
          <div className="grid gap-1">
            <Link href="/#download" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-bold text-[#414650] hover:bg-[#f0f6ff] hover:text-[#0b84ff]">Paste Link</Link>
            <Link href="/#features" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-bold text-[#414650] hover:bg-[#f0f6ff] hover:text-[#0b84ff]">Platforms</Link>
            <Link href="/#download" onClick={() => setOpen(false)} className="mt-2 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#111827] px-3 text-sm font-black text-white">Download</Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
