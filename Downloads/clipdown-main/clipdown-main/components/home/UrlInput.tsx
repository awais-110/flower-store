"use client";

import { useState } from "react";
import { AlertCircle, Clipboard, Download, Link as LinkIcon, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { detectPlatform, isValidUrl } from "@/lib/urlDetector";

const platformLabels: Record<string, string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
  facebook: "Facebook",
  twitter: "X",
  pinterest: "Pinterest",
  vimeo: "Vimeo",
  dailymotion: "Dailymotion",
};

export function UrlInput() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const platform = detectPlatform(url.trim());
  const detectedLabel = platform !== "unknown" ? platformLabels[platform] : "";

  const handleSubmit = async () => {
    setError("");
    const trimmed = url.trim();

    if (!trimmed) {
      setError("Paste a public video link to continue.");
      return;
    }

    if (!isValidUrl(trimmed)) {
      setError("That link is not supported yet. Try a public YouTube, TikTok, Instagram, Facebook, X, Vimeo, Pinterest, or Dailymotion URL.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      const data = (await response.json()) as { id?: string; error?: string };

      if (!response.ok) {
        setError(data.error || "We could not prepare this link. Please try another public URL.");
        return;
      }

      sessionStorage.setItem(`video_${data.id}`, JSON.stringify(data));
      router.push(`/download/${data.id}`);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className={`rounded-[28px] border bg-white p-3 shadow-[0_30px_80px_rgba(32,54,86,0.16)] transition duration-200 ${error ? "border-[#ef4444]" : "border-[#cfddeb] hover:border-[#9fc7f3]"}`}>
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_210px]">
          <div className="flex h-[76px] min-w-0 items-center gap-3 rounded-[22px] bg-[#f6f9fd] px-4 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-[#0b84ff]/30 sm:px-5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-[#6b7280] shadow-[0_8px_20px_rgba(30,41,59,0.07)]">
              <LinkIcon className="h-5 w-5" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
                setError("");
              }}
              onPaste={(event) => {
                const text = event.clipboardData.getData("text");
                setTimeout(() => {
                  setUrl(text);
                  setError("");
                }, 0);
              }}
              onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
              placeholder="Paste your video link here"
              className="min-w-0 flex-1 bg-transparent text-base font-bold text-[#171b22] outline-none placeholder:font-bold placeholder:text-[#8a93a2] sm:text-lg"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            {url && !loading ? (
              <button
                type="button"
                onClick={() => {
                  setUrl("");
                  setError("");
                }}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-[#8a93a2] transition hover:bg-white hover:text-[#20232a]"
                aria-label="Clear URL"
              >
                <X className="h-4 w-4" />
              </button>
            ) : error ? (
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-[#ef4444]" />
            ) : (
              <Clipboard className="h-5 w-5 flex-shrink-0 text-[#8a93a2]" />
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex h-[76px] items-center justify-center gap-2 rounded-[22px] bg-[#0b84ff] px-6 text-base font-black text-white shadow-[0_18px_40px_rgba(11,132,255,0.34)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#006ee0] active:translate-y-0 disabled:opacity-60 sm:text-lg"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
            {loading ? "Preparing" : "Get links"}
          </button>
        </div>
      </div>

      <div className="mt-3 min-h-5 px-2 text-center text-sm font-semibold">
        {error ? (
          <p className="text-[#ef4444]">{error}</p>
        ) : detectedLabel ? (
          <p className="text-[#0b84ff]">{detectedLabel} link detected.</p>
        ) : (
          <p className="text-[#6b7280]">Paste any supported public video URL.</p>
        )}
      </div>
    </div>
  );
}
