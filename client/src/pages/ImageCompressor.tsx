import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Image Compressor - SEO: "image compressor online"
 * Compresses JPG, PNG, WebP with size comparison
 */
export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string>("");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(0.8);
  const [loading, setLoading] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalImage(file);
    setOriginalSize(file.size);
    setCompressedImage("");
    setCompressedSize(0);

    // Preview original
    const reader = new FileReader();
    reader.onload = () => {
      // Trigger compression
      compressImage(file);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = (file: File) => {
    setLoading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedUrl = URL.createObjectURL(blob);
                setCompressedImage(compressedUrl);
                setCompressedSize(blob.size);
              }
              setLoading(false);
            },
            file.type,
            quality
          );
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const downloadCompressed = () => {
    if (!compressedImage || !originalImage) return;
    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = `compressed-${originalImage.name}`;
    link.click();
  };

  const compressionRatio = originalSize > 0 ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          {/* SEO H1 */}
          <h1 className="text-4xl font-bold mb-4">Image Compressor</h1>
          
          {/* Meta Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Compress JPG, PNG, and WebP images instantly. Reduce file size while maintaining quality. 
            Client-side processing keeps your images private.
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
                  <p className="text-sm text-muted-foreground">JPG, PNG, WebP (max 50MB)</p>
                </label>
              </div>

              {originalImage && (
                <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm font-semibold">Original: {originalImage.name}</p>
                  <p className="text-sm text-muted-foreground">Size: {formatFileSize(originalSize)}</p>
                </div>
              )}
            </div>

            {/* Quality Control */}
            <div>
              <label className="block text-sm font-semibold mb-4">Compression Quality</label>
              <div className="space-y-4">
                <div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={quality}
                    onChange={(e) => {
                      setQuality(Number(e.target.value));
                      if (originalImage) compressImage(originalImage);
                    }}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-2">Quality: {Math.round(quality * 100)}%</p>
                </div>

                {compressedImage && (
                  <div className="space-y-3">
                    <div className="tool-card p-4">
                      <p className="text-sm text-muted-foreground">Original Size</p>
                      <p className="text-2xl font-bold text-primary">{formatFileSize(originalSize)}</p>
                    </div>
                    <div className="tool-card p-4">
                      <p className="text-sm text-muted-foreground">Compressed Size</p>
                      <p className="text-2xl font-bold text-primary">{formatFileSize(compressedSize)}</p>
                    </div>
                    <div className="tool-card p-4 bg-accent/10">
                      <p className="text-sm text-muted-foreground">Reduction</p>
                      <p className="text-2xl font-bold text-accent">{compressionRatio}%</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Download Button */}
          {compressedImage && (
            <button
              onClick={downloadCompressed}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all mb-12"
            >
              Download Compressed Image
            </button>
          )}

          {loading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Compressing image...</p>
            </div>
          )}

          {/* Ad Placeholder */}
          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          {/* How to Use Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li><strong>1. Upload Image:</strong> Click the upload area or drag and drop an image</li>
              <li><strong>2. Adjust Quality:</strong> Use the slider to control compression quality</li>
              <li><strong>3. View Results:</strong> See original and compressed file sizes</li>
              <li><strong>4. Download:</strong> Click "Download Compressed Image" to save</li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Will compression reduce image quality?</h3>
                <p className="text-muted-foreground">Yes, but you can control the quality level. Higher quality means larger file size.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What formats are supported?</h3>
                <p className="text-muted-foreground">JPG, PNG, WebP, and other common image formats are supported.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is my image secure?</h3>
                <p className="text-muted-foreground">Yes, compression happens in your browser. Your images never leave your device.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What's the maximum file size?</h3>
                <p className="text-muted-foreground">You can compress images up to 50MB in size.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I compress multiple images?</h3>
                <p className="text-muted-foreground">Currently, you can compress one image at a time. Refresh to compress another.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/image-resizer" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Image Resizer</h3>
                <p className="text-sm text-muted-foreground">Resize images</p>
              </a>
              <a href="/image-converter" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Image Converter</h3>
                <p className="text-sm text-muted-foreground">Convert formats</p>
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
