"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Download, FileAudio, FileVideo, Loader2, RotateCcw } from "lucide-react";
import type { VideoInfo, VideoFormat } from "@/lib/extractor";

export default function DownloadPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [video, setVideo] = useState<VideoInfo | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = sessionStorage.getItem(`video_${id}`);
        if (stored) {
          const data: VideoInfo = JSON.parse(stored);
          setVideo(data);
          const best = data.formats.find((format) => format.format === "mp4") ?? data.formats[0];
          setSelectedFormat(best);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      }
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [id]);

  if (!mounted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f8fc] px-4 pt-24">
        <div className="inline-flex items-center gap-3 rounded-2xl border border-[#dfe7f2] bg-white px-5 py-4 text-sm font-bold text-[#4b5563] shadow-[0_18px_50px_rgba(32,54,86,0.08)]">
          <Loader2 className="h-5 w-5 animate-spin text-[#0b84ff]" />
          Preparing your download
        </div>
      </main>
    );
  }

  if (notFound || !video || !selectedFormat) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f8fc] px-4 pt-24">
        <div className="w-full max-w-md rounded-[22px] border border-[#dfe7f2] bg-white p-6 text-center shadow-[0_18px_50px_rgba(32,54,86,0.08)]">
          <h1 className="text-2xl font-black text-[#171b22]">This download session expired</h1>
          <p className="mt-3 text-sm leading-6 text-[#64676e]">Paste the link again so VideoSnap can prepare fresh download options.</p>
          <Link href="/#download" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0b84ff] px-5 text-sm font-black text-white">
            Start over
          </Link>
        </div>
      </main>
    );
  }

  const matchingFormats = video.formats.filter((item) => item.format === selectedFormat.format);
  const formatTypes = Array.from(new Set(video.formats.map((item) => item.format)));

  const handleDownload = () => {
    const filename = `${video.title.slice(0, 50).replace(/[^a-z0-9]/gi, "_")}_${selectedFormat.quality}.${selectedFormat.format}`;
    const proxyUrl = `/api/download?url=${encodeURIComponent(selectedFormat.url)}&filename=${encodeURIComponent(filename)}`;
    const anchor = document.createElement("a");
    anchor.href = proxyUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(145deg,#f2f7fd_0%,#ffffff_52%,#f5fbf7_100%)] px-4 pb-16 pt-28 sm:pt-34">
      <div className="mx-auto w-full max-w-6xl">
        <Link href="/" className="mb-5 inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#dfe7f2] bg-white px-3 text-sm font-bold text-[#4b5563] shadow-[0_12px_30px_rgba(32,54,86,0.07)] transition hover:text-[#0b84ff]">
          <ArrowLeft className="h-4 w-4" />
          New link
        </Link>

        <div className="overflow-hidden rounded-[24px] border border-[#d9e4f0] bg-white shadow-[0_24px_72px_rgba(32,54,86,0.11)]">
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_430px]">
            <div className="bg-[#111827] p-3 sm:p-5">
              <div className="relative aspect-video overflow-hidden rounded-[18px] bg-[#0b1020]">
                {video.thumbnail ? (
                  <>
                    <Image src={video.thumbnail} alt={video.title} fill unoptimized className="object-cover opacity-25 blur-sm" />
                    <Image src={video.thumbnail} alt={video.title} fill unoptimized className="object-contain" />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm font-bold text-white/45">Preview unavailable</div>
                )}

                <div className="absolute left-3 top-3 rounded-full bg-white/12 px-3 py-1 text-xs font-bold capitalize text-white backdrop-blur">
                  {video.platform}
                </div>
                {video.duration && video.duration !== "0:00" ? (
                  <div className="absolute bottom-3 right-3 rounded-lg bg-black/70 px-2 py-1 font-mono text-xs text-white">
                    {video.duration}
                  </div>
                ) : null}
              </div>
            </div>

            <section className="p-5 sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0b84ff]">Ready to save</p>
              <h1 className="mt-3 line-clamp-3 text-2xl font-black leading-tight text-[#171b22] sm:text-3xl">{video.title}</h1>
              <p className="mt-3 text-sm font-medium text-[#64676e]">
                {video.author || "Unknown author"} {video.duration ? `· ${video.duration}` : ""}
              </p>

              <div className="mt-7">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#7b8492]">Format</p>
                <div className="grid grid-cols-2 gap-2">
                  {formatTypes.map((format) => {
                    const isActive = selectedFormat.format === format;
                    return (
                      <button
                        key={format}
                        type="button"
                        onClick={() => {
                          const nextFormat = video.formats.find((item) => item.format === format);
                          if (nextFormat) setSelectedFormat(nextFormat);
                        }}
                        className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-black transition ${
                          isActive ? "border-[#0b84ff] bg-[#eef6ff] text-[#0b84ff]" : "border-[#e1e8f2] bg-white text-[#4b5563] hover:border-[#b9c8dc]"
                        }`}
                      >
                        {format === "mp4" ? <FileVideo className="h-4 w-4" /> : <FileAudio className="h-4 w-4" />}
                        {format.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#7b8492]">Quality</p>
                <div className="flex flex-wrap gap-2">
                  {matchingFormats.map((item) => {
                    const isActive = selectedFormat.quality === item.quality && selectedFormat.format === item.format;
                    return (
                      <button
                        key={`${item.quality}-${item.format}`}
                        type="button"
                        onClick={() => setSelectedFormat(item)}
                        className={`min-h-10 rounded-xl border px-4 text-sm font-black transition ${
                          isActive ? "border-[#111827] bg-[#111827] text-white" : "border-[#e1e8f2] bg-white text-[#4b5563] hover:border-[#b9c8dc]"
                        }`}
                      >
                        {item.quality}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-[#e1e8f2] bg-[#f7faff] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-black text-[#171b22]">
                      {selectedFormat.format.toUpperCase()} · {selectedFormat.quality}
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#64676e]">{selectedFormat.size || "File size shown when available"}</p>
                  </div>
                  <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-black text-[#15803d]">Free</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#0b84ff] px-5 text-base font-black text-white shadow-[0_14px_34px_rgba(11,132,255,0.26)] transition duration-200 hover:bg-[#006ee0] active:translate-y-px"
              >
                <Download className="h-5 w-5" />
                Download selected file
              </button>

              <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-bold text-[#64676e] sm:grid-cols-4">
                {["Public links", "Fast", "No signup", "Clean files"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#16a34a]" />
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/#download" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#dfe7f2] bg-white px-5 text-sm font-black text-[#4b5563] shadow-[0_12px_30px_rgba(32,54,86,0.06)] transition hover:text-[#0b84ff]">
            <RotateCcw className="h-4 w-4" />
            Download another link
          </Link>
        </div>
      </div>
    </main>
  );
}
