'use client';

import { useEffect } from "react";

export function AdBanner({ slot }: { slot: string }) {
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
    <div className="my-6 flex justify-center px-4">
      <ins
        className="adsbygoogle block min-h-[50px] w-full max-w-[728px]"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
