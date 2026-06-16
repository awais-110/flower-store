import { NextResponse } from "next/server";

const posts = [
  { slug: "how-video-caching-works", title: "How video caching works", published: true },
  { slug: "seo-for-download-platforms", title: "SEO for download platforms", published: true },
];

export async function GET() {
  return NextResponse.json({ posts });
}

export async function POST() {
  return NextResponse.json({ ok: true, message: "Blog CRUD scaffold endpoint" });
}
