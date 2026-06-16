'use client';

import { useState } from "react";

export function useDownload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function download(url: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/extract`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to extract video information.");
      }

      return (await response.json()) as unknown;
    } catch (issue) {
      setError(issue instanceof Error ? issue.message : "Unexpected error");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { download, loading, error };
}
