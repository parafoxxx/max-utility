import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * YouTube Metadata Viewer - SEO: "youtube video info extractor"
 * Extract metadata from YouTube videos
 */
export default function YoutubeMetadata() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [metadata, setMetadata] = useState<{
    title: string;
    videoId: string;
    thumbnailUrl: string;
    embedUrl: string;
  } | null>(null);
  const [error, setError] = useState("");

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleExtract = () => {
    setError("");
    setMetadata(null);

    if (!youtubeUrl.trim()) {
      setError("Please enter a YouTube URL or video ID");
      return;
    }

    const id = extractVideoId(youtubeUrl);
    if (!id) {
      setError("Invalid YouTube URL or video ID");
      return;
    }

    setVideoId(id);
    setMetadata({
      title: "YouTube Video",
      videoId: id,
      thumbnailUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
      embedUrl: `https://www.youtube.com/embed/${id}`,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">YouTube Video Info Extractor</h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Extract video ID, thumbnail, and metadata from YouTube URLs. 
            Get direct links to thumbnails and embed codes instantly.
          </p>

          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <label className="block text-sm font-semibold mb-4">YouTube URL or Video ID</label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or video ID"
                className="tool-input mb-4"
              />
              <button
                onClick={handleExtract}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
              >
                Extract Metadata
              </button>

              {error && (
                <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}
            </div>

            {metadata && (
              <div className="space-y-4">
                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground">Video ID</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono font-semibold break-all">{metadata.videoId}</p>
                    <button
                      onClick={() => copyToClipboard(metadata.videoId)}
                      className="px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground mb-2">Thumbnail URL</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-xs break-all">{metadata.thumbnailUrl}</p>
                    <button
                      onClick={() => copyToClipboard(metadata.thumbnailUrl)}
                      className="px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground mb-2">Embed Code</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-xs break-all">{`<iframe src="${metadata.embedUrl}"></iframe>`}</p>
                    <button
                      onClick={() => copyToClipboard(`<iframe src="${metadata.embedUrl}"></iframe>`)}
                      className="px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {metadata && (
            <div className="mb-12">
              <label className="block text-sm font-semibold mb-4">Thumbnail Preview</label>
              <div className="bg-secondary/30 rounded-lg p-8 flex justify-center">
                <img
                  src={metadata.thumbnailUrl}
                  alt="Video thumbnail"
                  className="max-w-full max-h-96 rounded"
                />
              </div>
            </div>
          )}

          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li><strong>1. Paste URL:</strong> Enter a YouTube URL or video ID</li>
              <li><strong>2. Extract:</strong> Click "Extract Metadata" button</li>
              <li><strong>3. Copy:</strong> Copy video ID, thumbnail URL, or embed code</li>
              <li><strong>4. Use:</strong> Use in your website, blog, or project</li>
            </ol>
          </section>

          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What formats are supported?</h3>
                <p className="text-muted-foreground">YouTube URLs, shortened youtu.be links, and 11-character video IDs.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I use the thumbnail image?</h3>
                <p className="text-muted-foreground">Yes, YouTube provides public thumbnails for all videos.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is this tool free?</h3>
                <p className="text-muted-foreground">Yes, completely free with no registration required.</p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/qr-code-generator" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">QR Code Generator</h3>
                <p className="text-sm text-muted-foreground">Create QR codes</p>
              </a>
              <a href="/url-shortener" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">URL Shortener</h3>
                <p className="text-sm text-muted-foreground">Shorten long URLs</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
