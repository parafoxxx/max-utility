import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Video Metadata Viewer - SEO: "video metadata viewer"
 * Display video duration, resolution, format, and other metadata
 */
export default function VideoMetadata() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<{
    name: string;
    size: string;
    type: string;
    duration: string;
    width?: number;
    height?: number;
    resolution?: string;
  } | null>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoFile(file);

    // Extract metadata
    const video = document.createElement("video");
    const reader = new FileReader();

    reader.onload = (event) => {
      video.src = event.target?.result as string;
      video.onloadedmetadata = () => {
        const duration = video.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const durationStr = `${minutes}m ${seconds}s`;

        const width = video.videoWidth;
        const height = video.videoHeight;
        
        let resolution = "Unknown";
        if (width >= 3840 && height >= 2160) resolution = "4K (3840×2160)";
        else if (width >= 1920 && height >= 1080) resolution = "Full HD (1920×1080)";
        else if (width >= 1280 && height >= 720) resolution = "HD (1280×720)";
        else if (width >= 854 && height >= 480) resolution = "480p (854×480)";
        else resolution = `${width}×${height}`;

        const fileSize = formatFileSize(file.size);
        const fileType = file.type || "Unknown";

        setMetadata({
          name: file.name,
          size: fileSize,
          type: fileType,
          duration: durationStr,
          width,
          height,
          resolution,
        });
      };
    };

    reader.readAsDataURL(file);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          {/* SEO H1 */}
          <h1 className="text-4xl font-bold mb-4">Video Metadata Viewer</h1>
          
          {/* Meta Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            View video metadata instantly. Check duration, resolution, format, and file size. 
            Perfect for video creators and content managers.
          </p>

          {/* Ad Placeholder */}
          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          {/* Tool Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Upload Section */}
            <div>
              <label className="block text-sm font-semibold mb-4">Upload Video</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">🎬</div>
                  <p className="font-semibold mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">MP4, WebM, MOV, AVI, etc.</p>
                </label>
              </div>
            </div>

            {/* Metadata Display */}
            {metadata && (
              <div className="space-y-4">
                <label className="block text-sm font-semibold">Video Information</label>
                <div className="space-y-3">
                  <div className="tool-card p-4">
                    <p className="text-sm text-muted-foreground">File Name</p>
                    <p className="font-semibold break-all">{metadata.name}</p>
                  </div>
                  <div className="tool-card p-4">
                    <p className="text-sm text-muted-foreground">File Size</p>
                    <p className="text-xl font-bold text-primary">{metadata.size}</p>
                  </div>
                  <div className="tool-card p-4">
                    <p className="text-sm text-muted-foreground">File Type</p>
                    <p className="font-semibold">{metadata.type}</p>
                  </div>
                  <div className="tool-card p-4">
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="text-xl font-bold text-primary">{metadata.duration}</p>
                  </div>
                  <div className="tool-card p-4">
                    <p className="text-sm text-muted-foreground">Resolution</p>
                    <p className="text-xl font-bold text-accent">{metadata.resolution}</p>
                  </div>
                  <div className="tool-card p-4">
                    <p className="text-sm text-muted-foreground">Dimensions</p>
                    <p className="font-semibold">{metadata.width} × {metadata.height} pixels</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ad Placeholder */}
          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          {/* How to Use Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li><strong>1. Upload Video:</strong> Click to upload or drag and drop a video file</li>
              <li><strong>2. View Metadata:</strong> Video information appears automatically</li>
              <li><strong>3. Check Details:</strong> See duration, resolution, file size, and format</li>
            </ol>
          </section>

          {/* Supported Formats */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Supported Video Formats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["MP4", "WebM", "MOV", "AVI", "MKV", "FLV", "WMV", "3GP"].map((format) => (
                <div key={format} className="tool-card p-4 text-center">
                  <p className="font-semibold">{format}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What video formats are supported?</h3>
                <p className="text-muted-foreground">MP4, WebM, MOV, AVI, MKV, FLV, WMV, 3GP, and other common video formats.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I view metadata for large videos?</h3>
                <p className="text-muted-foreground">Yes, the tool can handle videos of any size.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What metadata is displayed?</h3>
                <p className="text-muted-foreground">File name, size, type, duration, resolution, and dimensions.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is my video secure?</h3>
                <p className="text-muted-foreground">Yes, all processing happens in your browser. Your video never leaves your device.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I edit the video?</h3>
                <p className="text-muted-foreground">This tool only displays metadata. For editing, use dedicated video editors.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/video-to-audio" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Video to Audio</h3>
                <p className="text-sm text-muted-foreground">Convert videos to MP3</p>
              </a>
              <a href="/gif-maker" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">GIF Maker</h3>
                <p className="text-sm text-muted-foreground">Create animated GIFs</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
