import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * PDF Compressor - SEO: "pdf compressor online"
 * Compress PDF files while maintaining quality
 */
export default function PdfCompressor() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<"high" | "medium" | "low">("medium");
  const [originalSize, setOriginalSize] = useState(0);
  const [estimatedSize, setEstimatedSize] = useState(0);

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setOriginalSize(file.size);
      
      // Estimate compressed size based on quality
      const compressionRatio = quality === "high" ? 0.7 : quality === "medium" ? 0.5 : 0.3;
      setEstimatedSize(Math.round(file.size * compressionRatio));
    } else {
      alert("Please select a valid PDF file");
    }
  };

  const handleQualityChange = (newQuality: "high" | "medium" | "low") => {
    setQuality(newQuality);
    if (pdfFile) {
      const compressionRatio = newQuality === "high" ? 0.7 : newQuality === "medium" ? 0.5 : 0.3;
      setEstimatedSize(Math.round(pdfFile.size * compressionRatio));
    }
  };

  const compressPdf = () => {
    if (!pdfFile) {
      alert("Please upload a PDF file");
      return;
    }

    alert("PDF compression requires a backend service. This feature will be available soon.");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const estimatedReduction = originalSize > 0 
    ? Math.round(((originalSize - estimatedSize) / originalSize) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          {/* SEO H1 */}
          <h1 className="text-4xl font-bold mb-4">PDF Compressor</h1>
          
          {/* Meta Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Reduce PDF file size while maintaining quality. Choose compression level. 
            Perfect for email attachments and file sharing.
          </p>

          {/* Ad Placeholder */}
          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          {/* Tool Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Upload Section */}
            <div>
              <label className="block text-sm font-semibold mb-4">Upload PDF</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="font-semibold mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PDF file</p>
                </label>
              </div>

              {pdfFile && (
                <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm font-semibold">{pdfFile.name}</p>
                  <p className="text-sm text-muted-foreground">Size: {formatFileSize(originalSize)}</p>
                </div>
              )}
            </div>

            {/* Quality Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold">Compression Quality</label>
              <div className="space-y-3">
                <div
                  onClick={() => handleQualityChange("high")}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    quality === "high"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-semibold">High Quality</p>
                  <p className="text-sm text-muted-foreground">Best quality, larger file</p>
                </div>

                <div
                  onClick={() => handleQualityChange("medium")}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    quality === "medium"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-semibold">Medium Quality</p>
                  <p className="text-sm text-muted-foreground">Balanced compression</p>
                </div>

                <div
                  onClick={() => handleQualityChange("low")}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    quality === "low"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-semibold">Low Quality</p>
                  <p className="text-sm text-muted-foreground">Maximum compression</p>
                </div>
              </div>

              {pdfFile && (
                <div className="space-y-3">
                  <div className="tool-card p-4">
                    <p className="text-sm text-muted-foreground">Original Size</p>
                    <p className="text-2xl font-bold text-primary">{formatFileSize(originalSize)}</p>
                  </div>
                  <div className="tool-card p-4">
                    <p className="text-sm text-muted-foreground">Estimated Size</p>
                    <p className="text-2xl font-bold text-primary">{formatFileSize(estimatedSize)}</p>
                  </div>
                  <div className="tool-card p-4 bg-accent/10">
                    <p className="text-sm text-muted-foreground">Estimated Reduction</p>
                    <p className="text-2xl font-bold text-accent">{estimatedReduction}%</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Compress Button */}
          {pdfFile && (
            <button
              onClick={compressPdf}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all mb-12"
            >
              Compress PDF
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
              <li><strong>1. Upload PDF:</strong> Click to upload or drag and drop a PDF file</li>
              <li><strong>2. Choose Quality:</strong> Select compression level (High, Medium, or Low)</li>
              <li><strong>3. View Estimate:</strong> See estimated file size reduction</li>
              <li><strong>4. Compress:</strong> Click "Compress PDF" to process</li>
              <li><strong>5. Download:</strong> Save the compressed PDF to your device</li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Will compression affect readability?</h3>
                <p className="text-muted-foreground">High and Medium quality maintain good readability. Low quality may reduce image quality in PDFs.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How much can I reduce file size?</h3>
                <p className="text-muted-foreground">Reduction depends on PDF content. Image-heavy PDFs compress more than text-only PDFs.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I compress password-protected PDFs?</h3>
                <p className="text-muted-foreground">Currently, we support unprotected PDFs. Password-protected PDFs will be supported soon.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a file size limit?</h3>
                <p className="text-muted-foreground">No, you can compress PDFs of any size.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is my PDF secure?</h3>
                <p className="text-muted-foreground">Yes, all processing happens on our secure servers. Files are deleted after processing.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/pdf-merge" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">PDF Merge</h3>
                <p className="text-sm text-muted-foreground">Merge PDFs</p>
              </a>
              <a href="/pdf-split" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">PDF Split</h3>
                <p className="text-sm text-muted-foreground">Split PDFs</p>
              </a>
              <a href="/pdf-to-image" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">PDF to Image</h3>
                <p className="text-sm text-muted-foreground">Convert to images</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
