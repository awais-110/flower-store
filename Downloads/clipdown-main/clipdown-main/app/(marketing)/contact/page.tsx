import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the VideoSnap team.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Card>
        <h1 className="text-3xl font-semibold text-white">Contact</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted">For partnerships, support, and legal requests, use the admin workflow or this placeholder contact surface.</p>
      </Card>
    </section>
  );
}
