"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  { q: "Is VideoSnap free?", a: "Yes. It is free to use with no signup, subscription, or watermark." },
  { q: "Do I need to create an account?", a: "No. Paste a public video link and download without creating an account." },
  { q: "Which platforms are supported?", a: "YouTube, TikTok, Instagram, Facebook, Twitter/X, Pinterest, Vimeo, and Dailymotion." },
  { q: "What quality can I download?", a: "Available quality depends on the source video, with HD options shown when the platform provides them." },
  { q: "Is it safe to use?", a: "VideoSnap validates links and only works with public URLs. Downloads are handled without changing your extraction flow." },
  { q: "Why is my link not working?", a: "Make sure the video is public and the URL is copied from a supported platform." },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#f7faff] pb-16 pt-2 sm:pb-20">
      <div className="site-container grid max-w-5xl gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div>
          <p className="section-kicker">FAQ</p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-[#171b22] sm:text-4xl">Common questions.</h2>
          <p className="mt-2 text-sm leading-6 text-[#64676e]">Short answers before you download.</p>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className={`rounded-[16px] border bg-white shadow-[0_10px_30px_rgba(30,41,59,0.04)] transition duration-200 ${open === index ? "border-[#0785ff]" : "border-[#e7ebf1] hover:border-[#cdd8e6]"}`}
            >
              <button
                type="button"
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="min-w-0 text-sm font-bold text-[#171b22]">{faq.q}</span>
                <Plus className={`h-4 w-4 flex-shrink-0 text-[#9aa3af] transition-transform duration-200 ${open === index ? "rotate-45 text-[#0785ff]" : ""}`} />
              </button>
              {open === index ? (
                <div className="px-4 pb-4">
                  <p className="text-sm leading-6 text-[#64676e]">{faq.a}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
