import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * JSON Formatter - SEO: "json formatter online"
 * Formats and validates JSON with error detection
 */
export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const formatJson = (text: string, indentSize: number) => {
    try {
      setError("");
      const parsed = JSON.parse(text);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  };

  const minifyJson = (text: string) => {
    try {
      setError("");
      const parsed = JSON.parse(text);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          {/* SEO H1 */}
          <h1 className="text-4xl font-bold mb-4">JSON Formatter & Validator</h1>
          
          {/* Meta Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Format, validate, and minify JSON instantly. Detect errors and fix malformed JSON data. 
            Free online tool for developers and programmers.
          </p>

          {/* Ad Placeholder */}
          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          {/* Tool Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">Paste JSON</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"key": "value"}'
                className="tool-input h-64 resize-none font-mono text-sm"
              />
            </div>

            {/* Output */}
            <div>
              <label className="block text-sm font-semibold mb-2">Formatted JSON</label>
              <textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className="tool-input h-64 resize-none bg-secondary/50 font-mono text-sm"
              />
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-8">
              <p className="text-destructive font-semibold">Error:</p>
              <p className="text-destructive/80 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => formatJson(input, indent)}
              className="px-4 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              Format
            </button>
            <button
              onClick={() => minifyJson(input)}
              className="px-4 py-3 rounded-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border transition-all"
            >
              Minify
            </button>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Indent:</label>
              <select
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="tool-input py-2 px-2 text-sm"
              >
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
              </select>
            </div>
            {output && (
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 rounded-lg font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-all"
              >
                Copy
              </button>
            )}
          </div>

          {/* Ad Placeholder */}
          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          {/* How to Use Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li><strong>1. Paste JSON:</strong> Paste your JSON code in the input field</li>
              <li><strong>2. Format:</strong> Click "Format" to pretty print with proper indentation</li>
              <li><strong>3. Check Errors:</strong> Any JSON errors will be displayed in red</li>
              <li><strong>4. Copy Result:</strong> Click "Copy" to copy the formatted JSON</li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What's the difference between formatting and minifying?</h3>
                <p className="text-muted-foreground">Formatting adds indentation for readability, while minifying removes all unnecessary whitespace to reduce file size.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can this tool validate JSON?</h3>
                <p className="text-muted-foreground">Yes, it validates JSON and displays error messages if the JSON is malformed.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What indentation options are available?</h3>
                <p className="text-muted-foreground">You can choose 2, 4, or 8 spaces for indentation.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is my JSON data secure?</h3>
                <p className="text-muted-foreground">Yes, all processing happens in your browser. Your data is never sent to our servers.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I handle large JSON files?</h3>
                <p className="text-muted-foreground">Yes, the tool can handle large JSON files efficiently.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/text-case-converter" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Text Case Converter</h3>
                <p className="text-sm text-muted-foreground">Convert text to different cases</p>
              </a>
              <a href="/word-counter" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Word Counter</h3>
                <p className="text-sm text-muted-foreground">Count words and characters</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
