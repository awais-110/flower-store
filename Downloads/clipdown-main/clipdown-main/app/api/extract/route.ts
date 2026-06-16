import { NextRequest, NextResponse } from "next/server";
import { extractVideo } from "@/lib/extractor";
import { isValidUrl } from "@/lib/urlDetector";

const cache = new Map<string, { data: unknown; expires: number }>();
const CACHE_TTL = 1000 * 60 * 30;

const rateLimitStore = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60_000;

function getRateLimitKey(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.reset) {
    rateLimitStore.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getRateLimitKey(req);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute and try again." },
        { status: 429 },
      );
    }

    const body = (await req.json().catch(() => null)) as { url?: string } | null;
    const url = body?.url?.trim();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (!isValidUrl(url)) {
      return NextResponse.json(
        {
          error:
            "Unsupported URL. Please paste a link from YouTube, TikTok, Instagram, Facebook, Twitter, Pinterest, Vimeo, or Dailymotion.",
        },
        { status: 400 },
      );
    }

    const cached = cache.get(url);
    if (cached && Date.now() < cached.expires) {
      return NextResponse.json(cached.data);
    }

    const videoInfo = await extractVideo(url);
    cache.set(url, { data: videoInfo, expires: Date.now() + CACHE_TTL });

    return NextResponse.json(videoInfo);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Extraction failed";
    console.error("[extract]", message);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
