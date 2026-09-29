"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-cream">
      <span className="text-[11px] uppercase tracking-[0.3em] text-sage font-semibold">
        Atelier Fleur
      </span>
      <h1 className="font-editorial text-6xl sm:text-8xl text-deep-sage font-normal mt-4">
        500
      </h1>
      <p className="font-editorial text-2xl sm:text-3xl text-charcoal mt-2">
        The atelier hit a snag.
      </p>
      <p className="text-xs sm:text-sm text-charcoal-muted mt-3 max-w-md font-sans">
        Something went wrong while arranging your request. Please try again, or
        head back to the atelier to browse fresh bouquets.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 bg-deep-sage hover:bg-deep-sage-dark text-cream text-xs uppercase tracking-widest font-semibold px-8 py-3.5 rounded-xs transition-colors"
      >
        <span>Try Again</span>
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
  );
}