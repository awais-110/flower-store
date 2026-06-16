import { CloudDownload } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "DMCA", href: "/dmca" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#e7ebf1] bg-white py-10">
      <div className="site-container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0b84ff] text-sm text-white shadow-[0_8px_20px_rgba(11,132,255,0.18)]">
            <CloudDownload className="h-5 w-5 fill-current" />
          </div>
          <span className="font-black text-[#24262b]">Video<span className="text-[#0b84ff]">Snap</span></span>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-[#64676e]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-[#0785ff]">
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-xs text-[#8a8d95]">© 2026 SnapWC. Free forever.</p>
      </div>
    </footer>
  );
}
