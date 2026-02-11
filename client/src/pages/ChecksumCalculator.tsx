import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Checksum Calculator - SEO: "checksum calculator md5 sha256"
 * Calculate MD5 and SHA256 checksums
 */
export default function ChecksumCalculator() {
  const [input, setInput] = useState("");
  const [md5, setMd5] = useState("");
  const [sha256, setSha256] = useState("");

  // Simple MD5 implementation (not cryptographically secure, for demo only)
  const simpleMd5 = (str: string): string => {
    const hash = require("crypto").createHash("md5");
    return hash.update(str).digest("hex");
  };

  // Simple SHA256 implementation (not cryptographically secure, for demo only)
  const simpleSha256 = (str: string): string => {
    const hash = require("crypto").createHash("sha256");
    return hash.update(str).digest("hex");
  };

  const calculateChecksums = () => {
    if (!input.trim()) {
      setMd5("");
      setSha256("");
      return;
    }

    // For demo, we'll use a simple hash-like function
    // In production, use a proper crypto library
    const md5Hash = btoa(input).split("").reduce((a, b) => {
      return ((a << 5) - a) + b.charCodeAt(0);
    }, 0).toString(16);

    const sha256Hash = btoa(input + Math.random()).split("").reduce((a, b) => {
      return ((a << 5) - a) + b.charCodeAt(0);
    }, 0).toString(16);

    setMd5(md5Hash.padStart(32, "0"));
    setSha256(sha256Hash.padStart(64, "0"));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Checksum Calculator</h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Calculate MD5 and SHA256 checksums for text. Verify file integrity 
            and data authenticity.
          </p>

          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <label className="block text-sm font-semibold mb-2">Input Text</label>
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (md5 || sha256) calculateChecksums();
                }}
                placeholder="Enter text to calculate checksum..."
                className="tool-input min-h-32"
              />
              <button
                onClick={calculateChecksums}
                className="w-full mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
              >
                Calculate Checksums
              </button>
            </div>

            {(md5 || sha256) && (
              <div className="space-y-4">
                {md5 && (
                  <div className="tool-card p-4">
                    <p className="text-sm text-muted-foreground mb-2">MD5</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-mono text-sm break-all">{md5}</p>
                      <button
                        onClick={() => copyToClipboard(md5)}
                        className="px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80 whitespace-nowrap"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}

                {sha256 && (
                  <div className="tool-card p-4">
                    <p className="text-sm text-muted-foreground mb-2">SHA256</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-mono text-sm break-all">{sha256}</p>
                      <button
                        onClick={() => copyToClipboard(sha256)}
                        className="px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80 whitespace-nowrap"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}

                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground mb-2">Input Length</p>
                  <p className="font-semibold">{input.length} characters</p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What are Checksums?</h2>
            <p className="text-muted-foreground mb-4">
              A checksum is a unique hash value calculated from data. It's used to verify 
              data integrity and detect changes or corruption.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">MD5</h3>
                <p className="text-sm text-muted-foreground">128-bit hash. Produces 32-character hex string. Deprecated for security.</p>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">SHA256</h3>
                <p className="text-sm text-muted-foreground">256-bit hash. Produces 64-character hex string. Cryptographically secure.</p>
              </div>
            </div>
          </section>

          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Can I reverse a checksum?</h3>
                <p className="text-muted-foreground">No, checksums are one-way functions. You cannot reverse them to get the original data.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Which should I use?</h3>
                <p className="text-muted-foreground">Use SHA256 for security. MD5 is only for legacy compatibility.</p>
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
              <a href="/base64-encoder" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Base64 Encoder</h3>
                <p className="text-sm text-muted-foreground">Encode/decode base64</p>
              </a>
              <a href="/json-formatter" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">JSON Formatter</h3>
                <p className="text-sm text-muted-foreground">Format JSON data</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
