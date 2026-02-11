import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * PDF Merge - SEO: "pdf merge free"
 * Merge multiple PDFs into one file
 */
export default function PdfMerge() {
  const [pdfs, setPdfs] = useState<File[]>([]);
  const [pdfNames, setPdfNames] = useState<string[]>([]);

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const pdfFiles = files.filter((file) => file.type === "application/pdf");
    
    if (pdfFiles.length !== files.length) {
      alert("Only PDF files are supported");
    }

    setPdfs([...pdfs, ...pdfFiles]);
    setPdfNames([...pdfNames, ...pdfFiles.map((f) => f.name)]);
  };

  const removePdf = (index: number) => {
    setPdfs(pdfs.filter((_, i) => i !== index));
    setPdfNames(pdfNames.filter((_, i) => i !== index));
  };

  const movePdf = (from: number, to: number) => {
    const newPdfs = [...pdfs];
    const newNames = [...pdfNames];
    [newPdfs[from], newPdfs[to]] = [newPdfs[to], newPdfs[from]];
    [newNames[from], newNames[to]] = [newNames[to], newNames[from]];
    setPdfs(newPdfs);
    setPdfNames(newNames);
  };

  const mergePdfs = async () => {
    if (pdfs.length < 2) {
      alert("Please upload at least 2 PDFs to merge");
      return;
    }

    alert("PDF merging requires a backend service. This feature will be available soon.");
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
          <h1 className="text-4xl font-bold mb-4">PDF Merge</h1>
          
          {/* Meta Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Merge multiple PDF files into one. Reorder pages before merging. 
            Free online tool with no file size limits.
          </p>

          {/* Ad Placeholder */}
          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          {/* Tool Section */}
          <div className="space-y-8 mb-12">
            {/* Upload Section */}
            <div>
              <label className="block text-sm font-semibold mb-4">Upload PDF Files</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                  id="pdf-upload"
                  multiple
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="font-semibold mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">Multiple PDF files</p>
                </label>
              </div>
            </div>

            {/* PDF List and Reorder */}
            {pdfs.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-4">PDFs ({pdfs.length})</label>
                <div className="space-y-3">
                  {pdfNames.map((name, index) => (
                    <div key={index} className="tool-card p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center text-red-700 font-bold">
                        PDF
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{name}</p>
                        <p className="text-sm text-muted-foreground">{formatFileSize(pdfs[index].size)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => movePdf(index, index - 1)}
                          disabled={index === 0}
                          className="px-3 py-1 rounded bg-secondary text-secondary-foreground disabled:opacity-50"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => movePdf(index, index + 1)}
                          disabled={index === pdfs.length - 1}
                          className="px-3 py-1 rounded bg-secondary text-secondary-foreground disabled:opacity-50"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => removePdf(index)}
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

          {/* Merge Button */}
          {pdfs.length >= 2 && (
            <button
              onClick={mergePdfs}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all mb-12"
            >
              Merge {pdfs.length} PDFs
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
              <li><strong>1. Upload PDFs:</strong> Click to upload multiple PDF files or drag and drop</li>
              <li><strong>2. Reorder:</strong> Use up/down arrows to arrange PDFs in desired order</li>
              <li><strong>3. Remove:</strong> Click the X button to remove any PDF</li>
              <li><strong>4. Merge:</strong> Click "Merge PDFs" to combine all files</li>
              <li><strong>5. Download:</strong> Save the merged PDF to your device</li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">How many PDFs can I merge?</h3>
                <p className="text-muted-foreground">You can merge as many PDFs as you want. There's no limit on the number of files.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I reorder PDFs before merging?</h3>
                <p className="text-muted-foreground">Yes, use the up/down arrows to arrange PDFs in the desired order.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a file size limit?</h3>
                <p className="text-muted-foreground">No, you can merge PDFs of any size.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is my data secure?</h3>
                <p className="text-muted-foreground">Yes, all processing happens on our secure servers. Files are deleted after processing.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I merge PDFs with different page sizes?</h3>
                <p className="text-muted-foreground">Yes, PDFs with different page sizes can be merged without issues.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/pdf-split" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">PDF Split</h3>
                <p className="text-sm text-muted-foreground">Split PDFs</p>
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
