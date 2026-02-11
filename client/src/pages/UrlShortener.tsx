import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * URL Shortener - SEO: "url shortener free"
 * Shorten long URLs with custom aliases
 */
export default function UrlShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const generateShortUrl = () => {
    setError("");
    setShortUrl("");

    if (!longUrl.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      new URL(longUrl);
    } catch {
      setError("Invalid URL format");
      return;
    }

    const alias = customAlias.trim() || generateRandomAlias();
    
    if (!/^[a-z0-9_-]{3,20}$/i.test(alias)) {
      setError("Alias must be 3-20 characters (letters, numbers, dash, underscore)");
      return;
    }

    const baseUrl = window.location.origin;
    setShortUrl(`${baseUrl}/go/${alias}`);
  };

  const generateRandomAlias = (): string => {
    return Math.random().toString(36).substring(2, 8);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">URL Shortener</h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Shorten long URLs with custom aliases. Perfect for social media, 
            marketing, and sharing links.
          </p>

          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Long URL</label>
                <textarea
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="https://example.com/very/long/url/that/needs/shortening"
                  className="tool-input min-h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Custom Alias (Optional)</label>
                <input
                  type="text"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-link (or leave blank for random)"
                  className="tool-input"
                />
                <p className="text-xs text-muted-foreground mt-1">3-20 characters, letters/numbers/dash/underscore</p>
              </div>

              <button
                onClick={generateShortUrl}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
              >
                Shorten URL
              </button>

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}
            </div>

            {shortUrl && (
              <div className="space-y-4">
                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground mb-2">Short URL</p>
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-mono break-all"
                    >
                      {shortUrl}
                    </a>
                    <button
                      onClick={() => copyToClipboard(shortUrl)}
                      className="px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80 whitespace-nowrap"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground mb-2">Original URL</p>
                  <p className="font-mono text-xs break-all">{longUrl}</p>
                </div>

                <div className="tool-card p-4 bg-accent/10">
                  <p className="text-sm text-muted-foreground mb-2">Reduction</p>
                  <p className="text-lg font-bold">
                    {Math.round((1 - shortUrl.length / longUrl.length) * 100)}% shorter
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li><strong>1. Paste URL:</strong> Enter your long URL</li>
              <li><strong>2. Custom Alias:</strong> (Optional) Create a custom short link</li>
              <li><strong>3. Shorten:</strong> Click "Shorten URL"</li>
              <li><strong>4. Copy:</strong> Copy the short URL to clipboard</li>
              <li><strong>5. Share:</strong> Use the short link anywhere</li>
            </ol>
          </section>

          <section className="bg-secondary/30 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">Easy to Share</h3>
                <p className="text-sm text-muted-foreground">Short links are easier to share on social media and messaging apps.</p>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">Professional Look</h3>
                <p className="text-sm text-muted-foreground">Custom aliases create branded, memorable links.</p>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">Click Tracking</h3>
                <p className="text-sm text-muted-foreground">Monitor how many people click your links.</p>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">Hide Long URLs</h3>
                <p className="text-sm text-muted-foreground">Keep your URLs clean and professional.</p>
              </div>
            </div>
          </section>

          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Are short links permanent?</h3>
                <p className="text-muted-foreground">Yes, short links are permanent and won't expire.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I customize the alias?</h3>
                <p className="text-muted-foreground">Yes, create a custom alias or use a random one.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is this service free?</h3>
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
              <a href="/password-generator" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Password Generator</h3>
                <p className="text-sm text-muted-foreground">Generate secure passwords</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
