"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

interface JournalArticle {
  id: string;
  handle: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
}

const ARTICLES: JournalArticle[] = [
  {
    id: "art-1",
    handle: "the-language-of-heritage-roses",
    category: "Botanical Lore",
    title: "The Silent Language of Heritage Roses",
    excerpt: "From antique Cabbage roses to thorny English gallicas, uncovering the layered Victorian messages hidden within ruffled blooms.",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-2",
    handle: "how-to-keep-blooms-luminous",
    category: "Atelier Care",
    title: "How to Keep Cut Stems Luminous for Ten Days",
    excerpt: "The chemistry of stem trimming at a 45-degree angle, enzymatic flower food, and avoiding thermal shocks in the modern interior.",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-3",
    handle: "the-september-garden-and-autumn-equinox",
    category: "Seasonal Dispatch",
    title: "The September Garden: Wild Ranunculus & Smoked Glass",
    excerpt: "As morning light softens into honeyed hues, our head florist explores moody jewel tones and sculptural olive branches.",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80",
  },
];

export const JournalGrid: React.FC = () => {
  return (
    <section id="journal" className="py-24 sm:py-32 bg-cream-dark/30 border-t border-sage/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-4 border-b border-sage/15 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-petal-veil font-semibold block mb-1">
              The Botanical Chronicle
            </span>
            <h3 className="text-3xl sm:text-4xl text-charcoal font-normal">
              <span className="font-editorial">Atelier Journal &amp; </span>
              <span
                className="font-geraldine text-4xl sm:text-5xl text-petal-veil font-normal lowercase inline-block px-1 align-middle"
                style={{ fontFamily: "var(--font-geraldine), 'Geraldine', cursive, serif" }}
              >
                care guides
              </span>
            </h3>
          </div>

          <LocalizedClientLink
            href="/journal/the-language-of-heritage-roses"
            className="text-xs uppercase tracking-widest font-semibold text-deep-sage hover:text-sage transition-colors flex items-center gap-1.5"
          >
            <span>Read All Dispatches</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </LocalizedClientLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <LocalizedClientLink
              key={article.id}
              href={`/journal/${article.handle}`}
              className="group flex flex-col space-y-4"
            >
              <div className="relative aspect-[16/10] w-full rounded-xs overflow-hidden bg-cream-dark border border-sage/15 shadow-sm">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-cream/90 backdrop-blur-xs text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full text-deep-sage">
                  {article.category}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-sage">
                  <span>{article.readTime}</span>
                  <span>·</span>
                  <span>Curated by Master Florists</span>
                </div>

                <h4 className="font-editorial text-xl sm:text-2xl text-charcoal group-hover:text-sage transition-colors font-medium leading-tight">
                  {article.title}
                </h4>

                <p className="text-xs text-charcoal-muted line-clamp-2 font-sans leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-deep-sage group-hover:text-sage transition-colors">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  );
};
