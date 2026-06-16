const platforms = [
  { name: "YouTube", mark: "YT", color: "#ef4444", bg: "#fee2e2" },
  { name: "TikTok", mark: "TK", color: "#111827", bg: "#eef2f7" },
  { name: "Instagram", mark: "IG", color: "#db2777", bg: "#fce7f3" },
  { name: "Facebook", mark: "FB", color: "#2563eb", bg: "#dbeafe" },
  { name: "X", mark: "X", color: "#111827", bg: "#f3f4f6" },
  { name: "Pinterest", mark: "P", color: "#dc2626", bg: "#fee2e2" },
  { name: "Vimeo", mark: "V", color: "#0284c7", bg: "#e0f2fe" },
  { name: "Dailymotion", mark: "D", color: "#2563eb", bg: "#dbeafe" },
];

export function PlatformGrid() {
  return (
    <section id="features" className="bg-white pb-20 pt-2">
      <div className="w-full px-4">
        <div className="mx-auto mb-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0b84ff]">Supported platforms</p>
        </div>
        <div className="mx-auto grid max-w-[820px] grid-cols-2 gap-3 sm:grid-cols-4">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex h-[116px] flex-col items-center justify-center rounded-[22px] border border-[#e0e8f2] bg-white p-4 text-center shadow-[0_14px_36px_rgba(30,41,59,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-[#bfd2e8] hover:shadow-[0_22px_52px_rgba(30,41,59,0.10)]"
            >
              <div
                className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl text-sm font-black"
                style={{ color: platform.color, background: platform.bg }}
              >
                {platform.mark}
              </div>
              <p className="mt-3 text-sm font-black text-[#171b22]">{platform.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
