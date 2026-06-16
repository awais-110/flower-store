'use client';

import { useState } from "react";

export function AdStickyFooter({ slot }: { slot: string }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 md:hidden">
      <div className="flex w-full max-w-sm min-w-0 items-center justify-between gap-2 rounded-lg border border-white/10 bg-[#090b12]/92 px-3 py-3 backdrop-blur-xl">
        <div className="text-xs text-white/45">Sponsored</div>
        <button className="flex-shrink-0 text-xs text-white/45" onClick={() => setDismissed(true)}>
          Close
        </button>
        <ins className="adsbygoogle block h-[50px] min-w-0 flex-1" data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID} data-ad-slot={slot} />
      </div>
    </div>
  );
}
