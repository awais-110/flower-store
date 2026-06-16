import { Card } from "@/components/ui/card";

export function DownloadChart() {
  return (
    <Card>
      <p className="text-sm text-text-muted">Downloads over time</p>
      <div className="mt-6 grid h-48 grid-cols-7 items-end gap-3">
        {[35, 62, 48, 90, 74, 96, 81].map((height, index) => (
          <div key={index} className="rounded-t-2xl bg-gradient-to-t from-primary via-accent to-blue-400" style={{ height: `${height}%` }} />
        ))}
      </div>
    </Card>
  );
}
