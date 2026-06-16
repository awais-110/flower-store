import { useMemo } from "react";
import { detectPlatform } from "@/lib/urlDetector";

export function usePlatformDetect(url: string) {
  return useMemo(() => detectPlatform(url), [url]);
}
