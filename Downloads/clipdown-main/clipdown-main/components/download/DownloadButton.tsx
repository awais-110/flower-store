'use client';

interface DownloadButtonProps {
  url: string;
  quality: string;
  format: "mp4" | "mp3";
  title: string;
}

export function DownloadButton({ url, quality, format, title }: DownloadButtonProps) {
  const handleDownload = () => {
    const filename = `${title.slice(0, 50).replace(/[^a-z0-9]/gi, "_")}_${quality}.${format}`;
    const proxyUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;

    const anchor = document.createElement("a");
    anchor.href = proxyUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 hover:bg-indigo-700"
    >
      Download now
    </button>
  );
}
