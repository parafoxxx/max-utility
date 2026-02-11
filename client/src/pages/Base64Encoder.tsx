import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Base64 Encoder/Decoder - SEO: "base64 encoder decoder"
 * Encode and decode base64 strings
 */
export default function Base64Encoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    setError("");
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (err) {
      setError("Error encoding text");
    }
  };

  const decode = () => {
    setError("");
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (err) {
      setError("Invalid base64 string");
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setError("Please enter text");
      return;
    }
    if (mode === "encode") {
      encode();
    } else {
      decode();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Base64 Encoder/Decoder</h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Encode text to base64 or decode base64 strings. Perfect for encoding data, 
            emails, and API requests.
          </p>

          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-3">Mode</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setMode("encode"); setOutput(""); }}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      mode === "encode"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Encode
                  </button>
                  <button
                    onClick={() => { setMode("decode"); setOutput(""); }}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      mode === "decode"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Decode
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={mode === "encode" ? "Enter text..." : "Enter base64 string..."}
                  className="tool-input min-h-32"
                />
              </div>

              <button
                onClick={handleConvert}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
              >
                {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
              </button>

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}
            </div>

            {output && (
              <div className="space-y-4">
                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    {mode === "encode" ? "Encoded Result" : "Decoded Result"}
                  </p>
                  <textarea
                    value={output}
                    readOnly
                    className="tool-input min-h-32 bg-secondary/30"
                  />
                </div>

                <button
                  onClick={() => copyToClipboard(output)}
                  className="w-full bg-accent text-accent-foreground px-6 py-2 rounded-lg font-medium hover:bg-accent/90 transition-all"
                >
                  Copy Result
                </button>

                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground mb-2">Statistics</p>
                  <div className="space-y-1 text-sm">
                    <p>Input length: {input.length} characters</p>
                    <p>Output length: {output.length} characters</p>
                    <p>Compression: {mode === "encode" ? "+" : "-"}{Math.abs(output.length - input.length)} characters</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What is Base64?</h2>
            <p className="text-muted-foreground mb-4">
              Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. 
              It's commonly used for encoding data in URLs, emails, and APIs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">When to Use</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Encoding email attachments</li>
                  <li>• API data transmission</li>
                  <li>• Data URLs in HTML/CSS</li>
                  <li>• Secure data storage</li>
                </ul>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">Example</h3>
                <p className="text-sm font-mono">
                  Text: "Hello"<br/>
                  Base64: "SGVsbG8="
                </p>
              </div>
            </div>
          </section>

          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Is Base64 encryption?</h3>
                <p className="text-muted-foreground">No, Base64 is encoding, not encryption. It's easily reversible and not secure.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I encode binary files?</h3>
                <p className="text-muted-foreground">This tool works with text. For binary files, use specialized tools.</p>
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
              <a href="/json-formatter" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">JSON Formatter</h3>
                <p className="text-sm text-muted-foreground">Format JSON data</p>
              </a>
              <a href="/url-shortener" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">URL Shortener</h3>
                <p className="text-sm text-muted-foreground">Shorten URLs</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
