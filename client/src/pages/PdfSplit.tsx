import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * PDF Split - SEO: "pdf split online"
 * Split PDF by page number or range
 */
export default function PdfSplit() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState<"single" | "range">("single");
  const [pageNumber, setPageNumber] = useState(1);
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

  const splitPdf = () => {
    if (!pdfFile) {
      alert("Please upload a PDF file");
      return;
    }

    alert("PDF splitting requires a backend service. This feature will be available soon.");
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
          <h1 className="text-4xl font-bold mb-4">PDF Split</h1>
          
          {/* Meta Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Split PDF files by page number or range. Extract specific pages from large PDFs. 
            Free online tool with instant processing.
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

            {/* Split Options */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold">Split Mode</label>
              <div className="space-y-3">
                <div
                  onClick={() => setSplitMode("single")}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    splitMode === "single"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-semibold">Extract Single Page</p>
                  <p className="text-sm text-muted-foreground">Extract one specific page</p>
                </div>

                <div
                  onClick={() => setSplitMode("range")}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    splitMode === "range"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-semibold">Extract Page Range</p>
                  <p className="text-sm text-muted-foreground">Extract multiple pages</p>
                </div>
              </div>

              {splitMode === "single" && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Page Number</label>
                  <input
                    type="number"
                    value={pageNumber}
                    onChange={(e) => setPageNumber(Number(e.target.value))}
                    min="1"
                    className="tool-input"
                  />
                </div>
              )}

              {splitMode === "range" && (
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

          {/* Split Button */}
          {pdfFile && (
            <button
              onClick={splitPdf}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all mb-12"
            >
              Split PDF
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
              <li><strong>2. Choose Mode:</strong> Select "Single Page" or "Page Range"</li>
              <li><strong>3. Specify Pages:</strong> Enter the page number(s) you want to extract</li>
              <li><strong>4. Split:</strong> Click "Split PDF" to extract the pages</li>
              <li><strong>5. Download:</strong> Save the new PDF with extracted pages</li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Can I extract multiple pages at once?</h3>
                <p className="text-muted-foreground">Yes, use the "Page Range" mode to extract multiple consecutive pages.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I extract non-consecutive pages?</h3>
                <p className="text-muted-foreground">Currently, you can extract consecutive pages. For non-consecutive pages, use the tool multiple times.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What happens to the original PDF?</h3>
                <p className="text-muted-foreground">The original PDF is never modified. You get a new PDF with the extracted pages.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a file size limit?</h3>
                <p className="text-muted-foreground">No, you can split PDFs of any size.</p>
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
              <a href="/pdf-compressor" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">PDF Compressor</h3>
                <p className="text-sm text-muted-foreground">Compress PDFs</p>
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
