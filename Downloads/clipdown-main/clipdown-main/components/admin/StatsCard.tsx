import { Card } from "@/components/ui/card";

export function StatsCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <Card>
      <p className="text-sm text-text-muted">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <span className="text-3xl font-semibold text-white">{value}</span>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">{delta}</span>
      </div>
    </Card>
  );
}
