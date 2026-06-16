import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "DMCA",
  description: "VideoSnap DMCA notice page.",
};

export default function DmcaPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <Card>
        <h1 className="text-3xl font-semibold text-white">DMCA</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted">Use this page to document takedown requests and policy details.</p>
      </Card>
    </section>
  );
}
