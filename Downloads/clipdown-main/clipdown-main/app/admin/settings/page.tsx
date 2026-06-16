import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <Card>
      <h1 className="text-2xl font-semibold text-white">Settings</h1>
      <p className="mt-3 text-sm text-text-muted">Store feature flags, ad configuration, and moderation options here.</p>
    </Card>
  );
}
