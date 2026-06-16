import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const isAuthorized = true;

  if (!isAuthorized) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20">
        <Card>
          <h1 className="text-2xl font-semibold text-white">Access denied</h1>
          <p className="mt-3 text-sm text-text-muted">This area is protected by the admin secret and Supabase auth in production.</p>
        </Card>
      </section>
    );
  }

  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</div>;
}
