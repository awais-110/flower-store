import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";

type Props = { params: Promise<{ slug: string }> };

const posts: Record<string, { title: string; content: string; description: string }> = {
  "how-video-caching-works": {
    title: "How video caching works",
    content: "Caching keeps extraction responses quick while respecting upstream source constraints. This scaffold uses a simple memory cache and is ready to swap for KV.",
    description: "A short guide to edge cache strategy for extraction results.",
  },
  "seo-for-download-platforms": {
    title: "SEO for download platforms",
    content: "A download platform should publish useful editorial pages, consistent metadata, and structured data to win intent-heavy search traffic.",
    description: "How to structure metadata and content for high-intent search.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return { title: "Blog post not found" };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <Card>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Blog</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">{post.title}</h1>
        <p className="mt-6 text-base leading-8 text-text-muted">{post.content}</p>
      </Card>
    </section>
  );
}
