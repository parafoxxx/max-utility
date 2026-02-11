import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Image Resizer - SEO: "resize image online"
 * Resize images with aspect ratio control
 */
export default function ImageResizer() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalImage(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
        setPreview(event.target?.result as string);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspect && originalHeight > 0) {
      const newHeight = Math.round((newWidth * originalHeight) / originalWidth);
      setHeight(newHeight);
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspect && originalWidth > 0) {
      const newWidth = Math.round((newHeight * originalWidth) / originalHeight);
      setWidth(newWidth);
    }
  };

  const resizeImage = () => {
    if (!preview) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `resized-${originalImage?.name || "image.jpg"}`;
            link.click();
          }
        }, originalImage?.type || "image/jpeg");
      }
    };
    img.src = preview;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          {/* SEO H1 */}
          <h1 className="text-4xl font-bold mb-4">Image Resizer</h1>
          
          {/* Meta Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Resize images to custom dimensions. Maintain aspect ratio or resize freely. 
            Perfect for web optimization and social media.
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
                  <p className="text-sm text-muted-foreground">Any image format</p>
                </label>
              </div>
            </div>

            {/* Resize Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="tool-input"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="tool-input"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="aspect-ratio"
                  checked={maintainAspect}
                  onChange={(e) => setMaintainAspect(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="aspect-ratio" className="text-sm font-medium">
                  Maintain aspect ratio
                </label>
              </div>

              {originalImage && (
                <div className="tool-card p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">Original: {originalWidth} × {originalHeight}px</p>
                  <p className="text-sm text-muted-foreground">New: {width} × {height}px</p>
                </div>
              )}
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

          {/* Download Button */}
          {preview && (
            <button
              onClick={resizeImage}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all mb-12"
            >
              Download Resized Image
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
              <li><strong>2. Set Dimensions:</strong> Enter desired width and height</li>
              <li><strong>3. Aspect Ratio:</strong> Toggle to maintain or change aspect ratio</li>
              <li><strong>4. Download:</strong> Click "Download Resized Image" to save</li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What happens if I don't maintain aspect ratio?</h3>
                <p className="text-muted-foreground">The image will be stretched or compressed to fit the exact dimensions you specify.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I resize to larger dimensions?</h3>
                <p className="text-muted-foreground">Yes, but enlarging images may reduce quality. Original size is recommended.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What image formats are supported?</h3>
                <p className="text-muted-foreground">All common formats: JPG, PNG, WebP, GIF, BMP, etc.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is my image secure?</h3>
                <p className="text-muted-foreground">Yes, all resizing happens in your browser. Your image never leaves your device.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I batch resize multiple images?</h3>
                <p className="text-muted-foreground">Currently, you can resize one image at a time. Refresh to resize another.</p>
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
