'use client';

import { useEffect } from "react";

export function AdNative({ slot }: { slot: string }) {
  useEffect(() => {
    try {
      const adsWindow = window as Window & { adsbygoogle?: Array<Record<string, unknown>> };
      adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
      adsWindow.adsbygoogle.push({});
    } catch {
      // ignore AdSense runtime errors in local development
    }
  }, []);

  return (
    <div className="mx-auto my-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-3xl p-6">
        <div className="mb-3 text-xs uppercase tracking-[0.25em] text-text-muted">Sponsored</div>
        <ins
          className="adsbygoogle block min-h-[120px] w-full"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
          data-ad-slot={slot}
          data-ad-format="fluid"
          data-ad-layout="in-article"
        />
      </div>
    </div>
  );
}
