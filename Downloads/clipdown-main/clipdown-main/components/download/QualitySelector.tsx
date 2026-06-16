'use client';

import type { VideoFormat } from "@/lib/extractor";
import { Tab, TabsList } from "@/components/ui/tabs";

type Props = {
  formats: VideoFormat[];
  selected: VideoFormat;
  onSelect: (format: VideoFormat) => void;
};

export function QualitySelector({ formats, selected, onSelect }: Props) {
  const mp4Formats = formats.filter((format) => format.format === "mp4");

  return (
    <div>
      <TabsList>
        {mp4Formats.map((format) => (
          <Tab key={`${format.quality}-${format.url}`} active={selected.url === format.url} onClick={() => onSelect(format)}>
            {format.quality}
          </Tab>
        ))}
      </TabsList>
      <p className="mt-3 text-sm text-text-muted">Selected quality: {selected.quality}</p>
    </div>
  );
}
