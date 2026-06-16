import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "VideoSnap privacy policy.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <Card>
        <h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted">This scaffold documents a privacy-first storage model with hashed IPs and minimal retention.</p>
      </Card>
    </section>
  );
}
