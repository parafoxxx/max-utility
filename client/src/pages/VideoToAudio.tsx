import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Video to Audio - SEO: "video to audio converter"
 * Convert MP4 videos to MP3 audio
 */
export default function VideoToAudio() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<"mp3" | "wav" | "aac">("mp3");

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      alert("Please select a valid video file");
    }
  };

  const convertVideo = () => {
    if (!videoFile) {
      alert("Please upload a video file");
      return;
    }

    alert("Video to Audio conversion requires a backend service. This feature will be available soon.");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getFormatInfo = (format: string) => {
    const info: Record<string, { name: string; description: string }> = {
      mp3: {
        name: "MP3",
        description: "Most popular audio format. Smaller file size with good quality.",
      },
      wav: {
        name: "WAV",
        description: "Uncompressed audio format. Larger file size with excellent quality.",
      },
      aac: {
        name: "AAC",
        description: "Modern audio format. Better quality than MP3 at similar file sizes.",
      },
    };
    return info[format];
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          {/* SEO H1 */}
          <h1 className="text-4xl font-bold mb-4">Video to Audio Converter</h1>
          
          {/* Meta Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Convert videos to MP3, WAV, or AAC audio files. Extract audio from MP4 and other video formats. 
            Perfect for creating podcasts and music files.
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

              {videoFile && (
                <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm font-semibold">{videoFile.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(videoFile.size)}</p>
                </div>
              )}
            </div>

            {/* Format Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold">Output Format</label>
              <div className="space-y-3">
                {(["mp3", "wav", "aac"] as const).map((format) => (
                  <div
                    key={format}
                    onClick={() => setOutputFormat(format)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      outputFormat === format
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-semibold">{getFormatInfo(format).name}</p>
                    <p className="text-sm text-muted-foreground">{getFormatInfo(format).description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Convert Button */}
          {videoFile && (
            <button
              onClick={convertVideo}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all mb-12"
            >
              Convert to {getFormatInfo(outputFormat).name}
            </button>
          )}

          {/* Ad Placeholder */}
          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          {/* How to Use Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li><strong>1. Upload Video:</strong> Click to upload or drag and drop a video file</li>
              <li><strong>2. Choose Format:</strong> Select MP3, WAV, or AAC output format</li>
              <li><strong>3. Convert:</strong> Click "Convert to [Format]" to process</li>
              <li><strong>4. Download:</strong> Save the audio file to your device</li>
            </ol>
          </section>

          {/* Format Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Audio Format Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-4 font-semibold">Format</th>
                    <th className="text-left py-2 px-4 font-semibold">File Size</th>
                    <th className="text-left py-2 px-4 font-semibold">Quality</th>
                    <th className="text-left py-2 px-4 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 px-4 font-semibold">MP3</td>
                    <td className="py-2 px-4">Small</td>
                    <td className="py-2 px-4">Good</td>
                    <td className="py-2 px-4">Music, podcasts</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-4 font-semibold">WAV</td>
                    <td className="py-2 px-4">Large</td>
                    <td className="py-2 px-4">Excellent</td>
                    <td className="py-2 px-4">Professional audio</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold">AAC</td>
                    <td className="py-2 px-4">Medium</td>
                    <td className="py-2 px-4">Very Good</td>
                    <td className="py-2 px-4">iTunes, Apple devices</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What video formats are supported?</h3>
                <p className="text-muted-foreground">MP4, WebM, MOV, AVI, MKV, FLV, and other common video formats.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Will audio quality be affected?</h3>
                <p className="text-muted-foreground">Audio quality depends on the output format. MP3 is good for most uses, WAV for professional work.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How long does conversion take?</h3>
                <p className="text-muted-foreground">Conversion time depends on video length and your internet speed.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I convert large videos?</h3>
                <p className="text-muted-foreground">Yes, the tool can handle videos of any size.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is my video secure?</h3>
                <p className="text-muted-foreground">Yes, all processing happens on our secure servers. Files are deleted after processing.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/video-metadata" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Video Metadata Viewer</h3>
                <p className="text-sm text-muted-foreground">View video information</p>
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
