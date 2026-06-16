import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-20 sm:px-6 lg:px-8">
      <Card className="w-full text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-sm text-text-muted">The page you tried to open does not exist or has moved.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-medium text-white">
          Return home
        </Link>
      </Card>
    </section>
  );
}
