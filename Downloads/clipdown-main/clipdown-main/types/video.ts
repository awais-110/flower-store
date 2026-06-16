export type VideoFormat = {
  quality: string;
  format: "mp4" | "mp3";
  size?: string;
  url: string;
};

export type VideoInfo = {
  id: string;
  platform: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  formats: VideoFormat[];
};
