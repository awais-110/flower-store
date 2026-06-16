'use client';

import Link from "next/link";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-20 sm:px-6 lg:px-8">
      <Card className="w-full text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Error</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Something went wrong</h1>
        <p className="mt-4 text-sm text-text-muted">The route failed to render. Try again or return home.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-white" onClick={reset}>
            Try again
          </button>
          <Link href="/" className="rounded-full border border-border px-5 py-3 text-sm font-medium text-text">
            Home
          </Link>
        </div>
      </Card>
    </section>
  );
}
