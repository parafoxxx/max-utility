import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Image Format Converter - SEO: "image format converter online"
 * Convert between JPG, PNG, WebP formats
 */
export default function ImageConverter() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "png" | "webp">("png");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalImage(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const convertImage = () => {
    if (!preview) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const mimeType = `image/${outputFormat === "jpeg" ? "jpeg" : outputFormat}`;
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            const ext = outputFormat === "jpeg" ? "jpg" : outputFormat;
            link.download = `converted-${originalImage?.name?.split(".")[0] || "image"}.${ext}`;
            link.click();
          }
        }, mimeType);
      }
    };
    img.src = preview;
  };

  const getFormatInfo = (format: string) => {
    const info: Record<string, { name: string; description: string }> = {
      jpeg: {
        name: "JPEG",
        description: "Best for photos and complex images. Smaller file size with lossy compression.",
      },
      png: {
        name: "PNG",
        description: "Best for graphics and images with transparency. Larger file size with lossless compression.",
      },
      webp: {
        name: "WebP",
        description: "Modern format with better compression. Smaller files than JPEG/PNG with excellent quality.",
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
          <h1 className="text-4xl font-bold mb-4">Image Format Converter</h1>
          
          {/* Meta Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Convert images between JPG, PNG, and WebP formats instantly. 
            Choose the best format for your needs.
          </p>

          {/* Ad Placeholder */}
          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          {/* Tool Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Upload Section */}
            <div>
              <label className="block text-sm font-semibold mb-4">Upload Image</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">📁</div>
                  <p className="font-semibold mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">JPG, PNG, WebP, or any image</p>
                </label>
              </div>

              {originalImage && (
                <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm font-semibold">File: {originalImage.name}</p>
                  <p className="text-sm text-muted-foreground">Type: {originalImage.type}</p>
                </div>
              )}
            </div>

            {/* Format Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold">Convert To Format</label>
              <div className="space-y-3">
                {(["jpeg", "png", "webp"] as const).map((format) => (
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

          {/* Preview */}
          {preview && (
            <div className="mb-12">
              <label className="block text-sm font-semibold mb-4">Preview</label>
              <div className="bg-secondary/30 rounded-lg p-8 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                />
              </div>
            </div>
          )}

          {/* Convert Button */}
          {preview && (
            <button
              onClick={convertImage}
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
              <li><strong>1. Upload Image:</strong> Click to upload or drag and drop an image</li>
              <li><strong>2. Choose Format:</strong> Select the output format (JPG, PNG, or WebP)</li>
              <li><strong>3. Preview:</strong> See your image in the preview area</li>
              <li><strong>4. Convert:</strong> Click the convert button to download</li>
            </ol>
          </section>

          {/* Format Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Format Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-4 font-semibold">Format</th>
                    <th className="text-left py-2 px-4 font-semibold">File Size</th>
                    <th className="text-left py-2 px-4 font-semibold">Transparency</th>
                    <th className="text-left py-2 px-4 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 px-4 font-semibold">JPEG</td>
                    <td className="py-2 px-4">Small</td>
                    <td className="py-2 px-4">No</td>
                    <td className="py-2 px-4">Photos, web</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-4 font-semibold">PNG</td>
                    <td className="py-2 px-4">Large</td>
                    <td className="py-2 px-4">Yes</td>
                    <td className="py-2 px-4">Graphics, logos</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold">WebP</td>
                    <td className="py-2 px-4">Very Small</td>
                    <td className="py-2 px-4">Yes</td>
                    <td className="py-2 px-4">Modern web</td>
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
                <h3 className="font-semibold mb-2">Will conversion affect image quality?</h3>
                <p className="text-muted-foreground">JPG uses lossy compression and may reduce quality. PNG and WebP preserve quality better.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What about transparency?</h3>
                <p className="text-muted-foreground">PNG and WebP support transparency. JPEG does not, so transparent areas become white.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Which format should I use?</h3>
                <p className="text-muted-foreground">Use JPEG for photos, PNG for graphics with transparency, and WebP for modern web applications.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is my image secure?</h3>
                <p className="text-muted-foreground">Yes, conversion happens in your browser. Your image never leaves your device.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I convert multiple images?</h3>
                <p className="text-muted-foreground">Currently, you can convert one image at a time. Refresh to convert another.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/image-compressor" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Image Compressor</h3>
                <p className="text-sm text-muted-foreground">Compress images</p>
              </a>
              <a href="/image-resizer" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Image Resizer</h3>
                <p className="text-sm text-muted-foreground">Resize images</p>
              </a>
              <a href="/image-to-pdf" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Image to PDF</h3>
                <p className="text-sm text-muted-foreground">Create PDFs</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
