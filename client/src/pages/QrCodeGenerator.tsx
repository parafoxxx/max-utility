import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * QR Code Generator - SEO: "qr code generator free"
 * Generate QR codes from text, URLs, and contact info
 */
export default function QrCodeGenerator() {
  const [inputText, setInputText] = useState("");
  const [qrSize, setQrSize] = useState(300);
  const [qrUrl, setQrUrl] = useState("");
  const [qrType, setQrType] = useState<"url" | "text" | "vcard" | "wifi">("url");
  const [wifiData, setWifiData] = useState({ ssid: "", password: "", security: "WPA" });

  const generateQR = () => {
    if (!inputText.trim() && qrType !== "wifi") {
      alert("Please enter text or URL");
      return;
    }

    let dataToEncode = inputText;

    if (qrType === "wifi") {
      dataToEncode = `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};;`;
    } else if (qrType === "vcard") {
      dataToEncode = `BEGIN:VCARD\nVERSION:3.0\nFN:${inputText}\nEND:VCARD`;
    }

    const encodedData = encodeURIComponent(dataToEncode);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodedData}`;
    setQrUrl(url);
  };

  const downloadQR = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">QR Code Generator</h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Create QR codes for URLs, text, contact info, and WiFi networks. 
            Download as PNG and use anywhere.
          </p>

          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-3">QR Code Type</label>
                <div className="space-y-2">
                  {(["url", "text", "vcard", "wifi"] as const).map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={type}
                        checked={qrType === type}
                        onChange={(e) => setQrType(e.target.value as typeof qrType)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium capitalize">{type === "vcard" ? "Contact" : type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {qrType === "wifi" ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Network Name (SSID)</label>
                    <input
                      type="text"
                      value={wifiData.ssid}
                      onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                      className="tool-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Password</label>
                    <input
                      type="text"
                      value={wifiData.password}
                      onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                      className="tool-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Security</label>
                    <select
                      value={wifiData.security}
                      onChange={(e) => setWifiData({ ...wifiData, security: e.target.value })}
                      className="tool-input"
                    >
                      <option>WPA</option>
                      <option>WEP</option>
                      <option>nopass</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {qrType === "url" ? "URL" : qrType === "vcard" ? "Name" : "Text"}
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={qrType === "url" ? "https://example.com" : "Enter text..."}
                    className="tool-input min-h-24"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2">Size: {qrSize}px</label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  step="50"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={generateQR}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
              >
                Generate QR Code
              </button>
            </div>

            {qrUrl && (
              <div className="space-y-4">
                <div className="tool-card p-8 flex justify-center bg-white rounded-lg">
                  <img src={qrUrl} alt="QR Code" className="max-w-full" />
                </div>
                <button
                  onClick={downloadQR}
                  className="w-full bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-all"
                >
                  Download QR Code
                </button>
              </div>
            )}
          </div>

          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li><strong>1. Choose Type:</strong> Select URL, text, contact, or WiFi</li>
              <li><strong>2. Enter Data:</strong> Input the content for your QR code</li>
              <li><strong>3. Adjust Size:</strong> Set the QR code size (100-500px)</li>
              <li><strong>4. Generate:</strong> Click "Generate QR Code"</li>
              <li><strong>5. Download:</strong> Save the PNG image</li>
            </ol>
          </section>

          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What can I encode in a QR code?</h3>
                <p className="text-muted-foreground">URLs, text, contact information, WiFi credentials, and more.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a size limit?</h3>
                <p className="text-muted-foreground">No, you can generate QR codes of any size from 100px to 500px.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I customize colors?</h3>
                <p className="text-muted-foreground">Currently, QR codes are black and white for maximum compatibility.</p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/url-shortener" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">URL Shortener</h3>
                <p className="text-sm text-muted-foreground">Shorten long URLs</p>
              </a>
              <a href="/barcode-generator" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Barcode Generator</h3>
                <p className="text-sm text-muted-foreground">Create barcodes</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
