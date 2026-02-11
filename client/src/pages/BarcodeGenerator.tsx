import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Barcode Generator - SEO: "barcode generator free"
 * Generate barcodes from text
 */
export default function BarcodeGenerator() {
  const [inputText, setInputText] = useState("");
  const [barcodeType, setBarcodeType] = useState<"code128" | "code39" | "ean13">("code128");
  const [barcodeUrl, setBarcodeUrl] = useState("");

  const generateBarcode = () => {
    if (!inputText.trim()) {
      alert("Please enter text");
      return;
    }

    const encodedText = encodeURIComponent(inputText);
    const url = `https://barcode.tec-it.com/barcode.ashx?data=${encodedText}&code=${barcodeType}&translate=yes`;
    setBarcodeUrl(url);
  };

  const downloadBarcode = () => {
    if (!barcodeUrl) return;
    const link = document.createElement("a");
    link.href = barcodeUrl;
    link.download = "barcode.png";
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Barcode Generator</h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Generate barcodes from text. Support for Code128, Code39, and EAN13 formats. 
            Perfect for product labels and inventory management.
          </p>

          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Text to Encode</label>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text or numbers"
                  className="tool-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Barcode Type</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="code128"
                      checked={barcodeType === "code128"}
                      onChange={(e) => setBarcodeType(e.target.value as "code128" | "code39" | "ean13")}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Code128 (Alphanumeric)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="code39"
                      checked={barcodeType === "code39"}
                      onChange={(e) => setBarcodeType(e.target.value as "code128" | "code39" | "ean13")}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Code39 (Alphanumeric)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="ean13"
                      checked={barcodeType === "ean13"}
                      onChange={(e) => setBarcodeType(e.target.value as "code128" | "code39" | "ean13")}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">EAN13 (13 digits)</span>
                  </label>
                </div>
              </div>

              <button
                onClick={generateBarcode}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
              >
                Generate Barcode
              </button>
            </div>

            {barcodeUrl && (
              <div className="space-y-4">
                <div className="tool-card p-8 bg-white rounded-lg flex justify-center">
                  <img src={barcodeUrl} alt="Generated barcode" className="max-w-full" />
                </div>
                <button
                  onClick={downloadBarcode}
                  className="w-full bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-all"
                >
                  Download Barcode
                </button>
              </div>
            )}
          </div>

          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Barcode Formats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">Code128</h3>
                <p className="text-sm text-muted-foreground">Alphanumeric, most common, high density</p>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">Code39</h3>
                <p className="text-sm text-muted-foreground">Alphanumeric, lower density, older standard</p>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">EAN13</h3>
                <p className="text-sm text-muted-foreground">13 digits, used for retail products</p>
              </div>
            </div>
          </section>

          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Which format should I use?</h3>
                <p className="text-muted-foreground">Code128 is most common. Use EAN13 for retail products with 13-digit codes.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I use special characters?</h3>
                <p className="text-muted-foreground">Code128 and Code39 support alphanumeric. EAN13 only accepts 13 digits.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is this tool free?</h3>
                <p className="text-muted-foreground">Yes, completely free with no registration required.</p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/qr-code-generator" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">QR Code Generator</h3>
                <p className="text-sm text-muted-foreground">Create QR codes</p>
              </a>
              <a href="/color-picker" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Color Picker</h3>
                <p className="text-sm text-muted-foreground">Pick colors</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
