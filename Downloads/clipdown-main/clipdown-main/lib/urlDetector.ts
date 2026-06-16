export type Platform =
  | "youtube"
  | "tiktok"
  | "instagram"
  | "facebook"
  | "twitter"
  | "pinterest"
  | "vimeo"
  | "dailymotion"
  | "unknown";

const detectors: Array<{ platform: Exclude<Platform, "unknown">; test: (hostname: string) => boolean }> = [
  { platform: "youtube", test: (hostname) => hostname.includes("youtube.com") || hostname.includes("youtu.be") },
  { platform: "tiktok", test: (hostname) => hostname.includes("tiktok.com") },
  { platform: "instagram", test: (hostname) => hostname.includes("instagram.com") },
  { platform: "facebook", test: (hostname) => hostname.includes("facebook.com") || hostname.includes("fb.watch") },
  { platform: "twitter", test: (hostname) => hostname.includes("twitter.com") || hostname.includes("x.com") },
  { platform: "pinterest", test: (hostname) => hostname.includes("pinterest.com") },
  { platform: "vimeo", test: (hostname) => hostname.includes("vimeo.com") },
  { platform: "dailymotion", test: (hostname) => hostname.includes("dailymotion.com") },
];

export function detectPlatform(url: string): Platform {
  try {
    const { hostname } = new URL(url);
    for (const detector of detectors) {
      if (detector.test(hostname)) {
        return detector.platform;
      }
    }
    return "unknown";
  } catch {
    return "unknown";
  }
}

export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol) && detectPlatform(url) !== "unknown";
  } catch {
    return false;
  }
}
