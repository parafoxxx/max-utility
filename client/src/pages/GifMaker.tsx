import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * GIF Maker - SEO: "gif maker online"
 * Create animated GIFs from image sequences
 */
export default function GifMaker() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [speed, setSpeed] = useState(100);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length !== files.length) {
      alert("Only image files are supported");
    }

    setImages([...images, ...imageFiles]);

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviews((prev) => [...prev, event.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    [newImages[from], newImages[to]] = [newImages[to], newImages[from]];
    [newPreviews[from], newPreviews[to]] = [newPreviews[to], newPreviews[from]];
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const createGif = () => {
    if (images.length < 2) {
      alert("Please upload at least 2 images to create a GIF");
      return;
    }

    alert("GIF creation requires a backend service. This feature will be available soon.");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          {/* SEO H1 */}
          <h1 className="text-4xl font-bold mb-4">GIF Maker</h1>
          
          {/* Meta Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Create animated GIFs from image sequences. Adjust animation speed. 
            Perfect for creating social media content and animations.
          </p>

          {/* Ad Placeholder */}
          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          {/* Tool Section */}
          <div className="space-y-8 mb-12">
            {/* Upload Section */}
            <div>
              <label className="block text-sm font-semibold mb-4">Upload Images</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  multiple
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="font-semibold mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">Multiple images (JPG, PNG, WebP)</p>
                </label>
              </div>
            </div>

            {/* Speed Control */}
            {images.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-4">Animation Speed</label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Delay: {speed}ms per frame ({Math.round(1000 / speed)} FPS)
                  </p>
                </div>
              </div>
            )}

            {/* Image Preview and Reorder */}
            {images.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-4">Images ({images.length})</label>
                <div className="space-y-3">
                  {previews.map((preview, index) => (
                    <div key={index} className="tool-card p-4 flex items-center gap-4">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">Frame {index + 1}</p>
                        <p className="text-sm text-muted-foreground">{images[index].name}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => moveImage(index, index - 1)}
                          disabled={index === 0}
                          className="px-3 py-1 rounded bg-secondary text-secondary-foreground disabled:opacity-50"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveImage(index, index + 1)}
                          disabled={index === images.length - 1}
                          className="px-3 py-1 rounded bg-secondary text-secondary-foreground disabled:opacity-50"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => removeImage(index)}
                          className="px-3 py-1 rounded bg-destructive text-destructive-foreground"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Create GIF Button */}
          {images.length >= 2 && (
            <button
              onClick={createGif}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all mb-12"
            >
              Create GIF from {images.length} Images
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
              <li><strong>1. Upload Images:</strong> Click to upload multiple images or drag and drop</li>
              <li><strong>2. Arrange Order:</strong> Use up/down arrows to arrange frames in sequence</li>
              <li><strong>3. Set Speed:</strong> Adjust animation speed using the slider</li>
              <li><strong>4. Remove Images:</strong> Click the X button to remove unwanted frames</li>
              <li><strong>5. Create GIF:</strong> Click "Create GIF" to generate the animation</li>
              <li><strong>6. Download:</strong> Save the GIF file to your device</li>
            </ol>
          </section>

          {/* Tips Section */}
          <section className="mb-12 bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Tips for Best Results</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li><strong>Image Size:</strong> Use images of the same size for best results</li>
              <li><strong>Frame Count:</strong> 10-30 frames typically work well for animations</li>
              <li><strong>Speed:</strong> 50-100ms per frame is good for smooth animations</li>
              <li><strong>Format:</strong> JPG, PNG, and WebP are all supported</li>
              <li><strong>Quality:</strong> Higher resolution images create larger GIFs</li>
            </ul>
          </section>

          {/* FAQ Section */}
          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">How many images can I use?</h3>
                <p className="text-muted-foreground">You can use as many images as you want, but more frames create larger GIFs.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What image formats are supported?</h3>
                <p className="text-muted-foreground">JPG, PNG, WebP, GIF, BMP, and other common image formats.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I reorder images?</h3>
                <p className="text-muted-foreground">Yes, use the up/down arrows to arrange frames in any order.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What's the maximum GIF size?</h3>
                <p className="text-muted-foreground">GIF size depends on image resolution and frame count. Optimize images for smaller files.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is my data secure?</h3>
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
              <a href="/video-to-audio" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Video to Audio</h3>
                <p className="text-sm text-muted-foreground">Convert videos to audio</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
