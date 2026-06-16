import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Edge-first extraction",
    description: "Keep response times low with cached lookups and Edge runtime routes.",
  },
  {
    title: "Premium monetization layout",
    description: "Allowed AdSense placements are built into the page model, not bolted on.",
  },
  {
    title: "SEO and editorial ready",
    description: "Metadata, blog pages, robots, and sitemap hooks are scaffolded from day one.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="min-h-56">
            <p className="text-xs uppercase tracking-[0.25em] text-indigo-300">Feature</p>
            <h3 className="mt-4 text-2xl font-medium text-white">{feature.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/45">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
