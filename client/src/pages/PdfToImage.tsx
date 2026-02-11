import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * PDF to Image - SEO: "pdf to image converter"
 * Convert PDF pages to JPG or PNG images
 */
export default function PdfToImage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<"jpg" | "png">("jpg");
  const [pageRange, setPageRange] = useState("all");
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(10);

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please select a valid PDF file");
    }
  };

  const convertPdf = () => {
    if (!pdfFile) {
      alert("Please upload a PDF file");
      return;
    }

    alert("PDF to Image conversion requires a backend service. This feature will be available soon.");
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
          <h1 className="text-4xl font-bold mb-4">PDF to Image Converter</h1>
          
          {/* Meta Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Convert PDF pages to JPG or PNG images. Extract specific pages or all pages. 
            Perfect for sharing and editing PDF content.
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
                  <p className="text-sm text-muted-foreground">{formatFileSize(pdfFile.size)}</p>
                </div>
              )}
            </div>

            {/* Conversion Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-3">Output Format</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="jpg"
                      checked={outputFormat === "jpg"}
                      onChange={(e) => setOutputFormat(e.target.value as "jpg" | "png")}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">JPG (Smaller file size)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="png"
                      checked={outputFormat === "png"}
                      onChange={(e) => setOutputFormat(e.target.value as "jpg" | "png")}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">PNG (Better quality)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Page Range</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="all"
                      checked={pageRange === "all"}
                      onChange={(e) => setPageRange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">All pages</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="range"
                      checked={pageRange === "range"}
                      onChange={(e) => setPageRange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Specific pages</span>
                  </label>
                </div>
              </div>

              {pageRange === "range" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Start Page</label>
                    <input
                      type="number"
                      value={startPage}
                      onChange={(e) => setStartPage(Number(e.target.value))}
                      min="1"
                      className="tool-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">End Page</label>
                    <input
                      type="number"
                      value={endPage}
                      onChange={(e) => setEndPage(Number(e.target.value))}
                      min="1"
                      className="tool-input"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Convert Button */}
          {pdfFile && (
            <button
              onClick={convertPdf}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all mb-12"
            >
              Convert to {outputFormat.toUpperCase()}
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
              <li><strong>2. Choose Format:</strong> Select JPG or PNG output format</li>
              <li><strong>3. Select Pages:</strong> Choose all pages or specific page range</li>
              <li><strong>4. Convert:</strong> Click "Convert to JPG/PNG" to process</li>
              <li><strong>5. Download:</strong> Save the images to your device</li>
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
                    <th className="text-left py-2 px-4 font-semibold">Quality</th>
                    <th className="text-left py-2 px-4 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 px-4 font-semibold">JPG</td>
                    <td className="py-2 px-4">Small</td>
                    <td className="py-2 px-4">Good</td>
                    <td className="py-2 px-4">Web sharing</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold">PNG</td>
                    <td className="py-2 px-4">Larger</td>
                    <td className="py-2 px-4">Excellent</td>
                    <td className="py-2 px-4">High quality</td>
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
                <h3 className="font-semibold mb-2">Can I convert all pages at once?</h3>
                <p className="text-muted-foreground">Yes, select "All pages" to convert every page in the PDF.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Which format should I choose?</h3>
                <p className="text-muted-foreground">Use JPG for smaller file sizes and web sharing. Use PNG for better quality.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What about image quality?</h3>
                <p className="text-muted-foreground">Both formats maintain good quality. PNG preserves more detail than JPG.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I convert scanned PDFs?</h3>
                <p className="text-muted-foreground">Yes, scanned PDFs can be converted to images.</p>
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
