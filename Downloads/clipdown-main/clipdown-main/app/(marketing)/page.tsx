import { HeroSection } from "@/components/home/HeroSection";
import { PlatformGrid } from "@/components/home/PlatformGrid";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "VideoSnap",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  description: "Download publicly available videos from major social platforms instantly.",
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HeroSection />
      <PlatformGrid />
    </main>
  );
}
