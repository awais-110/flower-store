import { StatsCard } from "@/components/admin/StatsCard";
import { DownloadChart } from "@/components/admin/DownloadChart";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard label="Downloads" value="128k" delta="+12.4%" />
        <StatsCard label="CTR" value="7.8%" delta="+1.2%" />
        <StatsCard label="Revenue" value="$4.2k" delta="+8.9%" />
      </div>
      <DownloadChart />
    </div>
  );
}
