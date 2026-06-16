import { UrlInput } from "@/components/home/UrlInput";

export function HeroSection() {
  return (
    <section className="flex min-h-[640px] w-full items-center justify-center bg-[radial-gradient(circle_at_top,#eaf4ff_0%,#ffffff_48%,#f8fbff_100%)] px-4 pb-14 pt-28 sm:min-h-[720px] sm:pt-32">
      <div className="flex w-full max-w-[860px] flex-col items-center text-center">
        <div className="mb-5 inline-flex min-h-9 items-center rounded-full border border-[#d8e7ff] bg-white px-4 text-xs font-black uppercase tracking-[0.16em] text-[#0b84ff] shadow-[0_10px_28px_rgba(32,54,86,0.06)]">
          Fast video downloader
        </div>
        <h1 className="mx-auto max-w-[760px] text-[2.55rem] font-black leading-[1.02] text-[#101722] sm:text-6xl lg:text-[4.5rem]">
          Paste link. Download video.
        </h1>
        <p className="mx-auto mt-5 max-w-[620px] text-base font-semibold leading-7 text-[#5f6875] sm:text-lg">
          Supports YouTube, TikTok, Instagram, Facebook, X and more public video links.
        </p>
        <div id="download" className="mx-auto mt-9 w-full max-w-[780px]">
          <UrlInput />
        </div>
      </div>
    </section>
  );
}
