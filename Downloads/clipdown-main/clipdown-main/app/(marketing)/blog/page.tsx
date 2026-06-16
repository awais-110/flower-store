import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical growth and SEO updates for the VideoSnap platform.",
};

const posts = [
  { slug: "how-video-caching-works", title: "How video caching works", excerpt: "A short guide to edge cache strategy for extraction results." },
  { slug: "seo-for-download-platforms", title: "SEO for download platforms", excerpt: "How to structure metadata and content for high-intent search." },
];

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-white">Blog</h1>
      <div className="mt-8 grid gap-4">
        {posts.map((post) => (
          <Card key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-xl font-medium text-white">
              {post.title}
            </Link>
            <p className="mt-3 text-sm leading-7 text-text-muted">{post.excerpt}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
