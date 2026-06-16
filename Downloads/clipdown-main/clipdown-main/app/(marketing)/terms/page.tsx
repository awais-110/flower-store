import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "VideoSnap terms of service.",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <Card>
        <h1 className="text-3xl font-semibold text-white">Terms of Service</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted">Public content only. Users are responsible for complying with source platform terms and applicable laws.</p>
      </Card>
    </section>
  );
}
