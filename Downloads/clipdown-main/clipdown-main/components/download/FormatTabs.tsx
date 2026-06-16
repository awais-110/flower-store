'use client';

import { useState } from "react";
import { Tab, TabsList } from "@/components/ui/tabs";

export function FormatTabs() {
  const [format, setFormat] = useState<"mp4" | "mp3">("mp4");

  return (
    <div>
      <TabsList>
        <Tab active={format === "mp4"} onClick={() => setFormat("mp4")}>MP4</Tab>
        <Tab active={format === "mp3"} onClick={() => setFormat("mp3")}>MP3</Tab>
      </TabsList>
      <p className="mt-3 text-sm text-text-muted">Selected format: {format.toUpperCase()}</p>
    </div>
  );
}
