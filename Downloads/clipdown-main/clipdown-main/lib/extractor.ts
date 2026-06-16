export interface VideoFormat {
  quality: string;
  format: "mp4" | "mp3";
  url: string;
  size?: string;
}

export interface VideoInfo {
  id: string;
  platform: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  formats: VideoFormat[];
}

function formatDuration(seconds: number): string {
  if (!seconds) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export async function extractVideo(url: string): Promise<VideoInfo> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) throw new Error('RAPIDAPI_KEY is not configured');

  const response = await fetch(
    'https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'social-download-all-in-one.p.rapidapi.com',
      },
      body: JSON.stringify({ url }),
    }
  );

  if (!response.ok) {
    throw new Error(`RapidAPI error: ${response.status}`);
  }

  const data = await response.json();

  // DEBUG: log raw response so we can see exact shape
  console.log('[extractor] raw response:', JSON.stringify(data, null, 2));

  const formats: VideoFormat[] = [];

  // Handle different response shapes this API returns
  const medias = data.medias || data.links || data.data?.medias || data.data?.links || [];

  for (const item of medias) {
    const videoUrl = item.url || item.downloadUrl || item.src || item.link;
    if (!videoUrl) continue;

    const quality = item.quality || item.label || item.resolution || 'Best';
    const ext = item.extension || item.format || item.type || 'mp4';
    const isAudio = ext === 'mp3' || (typeof quality === 'string' && quality.toLowerCase().includes('audio'));

    formats.push({
      quality: isAudio ? 'audio' : quality,
      format: isAudio ? 'mp3' : 'mp4',
      url: videoUrl,
      size: item.size || item.fileSize || undefined,
    });
  }

  // Last resort — if API returns a direct video URL at top level
  if (formats.length === 0 && data.url) {
    formats.push({
      quality: 'Best',
      format: 'mp4',
      url: data.url,
    });
  }

  if (formats.length === 0) {
    // Log the full response to see what we got
    console.error('[extractor] no formats found in:', JSON.stringify(data));
    throw new Error('No downloadable formats found for this URL');
  }

  const id = Buffer.from(url).toString('base64url').slice(0, 16);

  return {
    id,
    platform: data.source || data.platform || 'facebook',
    title: data.title || data.description || 'Facebook Video',
    thumbnail: data.thumbnail || data.picture || data.image || '',
    duration: data.duration ? formatDuration(Number(data.duration)) : '0:00',
    author: data.author || data.uploader || data.channel || '@unknown',
    formats,
  };
}
