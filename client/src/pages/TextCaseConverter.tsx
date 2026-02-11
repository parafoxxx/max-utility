import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Text Case Converter - SEO: "text case converter online"
 * Converts text to uppercase, lowercase, sentence case, title case
 */
export default function TextCaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseType, setCaseType] = useState<"upper" | "lower" | "sentence" | "title">("upper");

  const convertCase = (text: string, type: "upper" | "lower" | "sentence" | "title") => {
    switch (type) {
      case "upper":
        return text.toUpperCase();
      case "lower":
        return text.toLowerCase();
      case "sentence":
        return text.toLowerCase().replace(/(^\w|\.\s+\w)/g, (char) => char.toUpperCase());
      case "title":
        return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
      default:
        return text;
    }
  };

  const handleConvert = (type: "upper" | "lower" | "sentence" | "title") => {
    setCaseType(type);
    setOutput(convertCase(input, type));
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
          <h1 className="text-4xl font-bold mb-4">Text Case Converter</h1>
          
          {/* Meta Description Content */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Convert your text to uppercase, lowercase, sentence case, or title case instantly. 
            Free online tool with no login required. Perfect for developers, writers, and content creators.
          </p>

          {/* Ad Placeholder */}
          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          {/* Tool Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">Enter Text</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your text here..."
                className="tool-input h-64 resize-none"
              />
            </div>

            {/* Output */}
            <div>
              <label className="block text-sm font-semibold mb-2">Converted Text</label>
              <textarea
                value={output}
                readOnly
                placeholder="Converted text will appear here..."
                className="tool-input h-64 resize-none bg-secondary/50"
              />
            </div>
          </div>

          {/* Conversion Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => handleConvert("upper")}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                caseType === "upper"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              UPPERCASE
            </button>
            <button
              onClick={() => handleConvert("lower")}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                caseType === "lower"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              lowercase
            </button>
            <button
              onClick={() => handleConvert("sentence")}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                caseType === "sentence"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Sentence case
            </button>
            <button
              onClick={() => handleConvert("title")}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                caseType === "title"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Title Case
            </button>
          </div>

          {/* Copy Button */}
          {output && (
            <button
              onClick={copyToClipboard}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all mb-12"
            >
              Copy to Clipboard
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
              <li><strong>1. Paste Text:</strong> Enter or paste your text in the input field</li>
              <li><strong>2. Choose Case:</strong> Click one of the conversion buttons</li>
              <li><strong>3. Copy Result:</strong> Click "Copy to Clipboard" to save your converted text</li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Is my text secure?</h3>
                <p className="text-muted-foreground">Yes, all text processing happens in your browser. Your data never leaves your device.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I convert very long texts?</h3>
                <p className="text-muted-foreground">Yes, there's no limit on text length. The tool works with texts of any size.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What's the difference between Title Case and Sentence case?</h3>
                <p className="text-muted-foreground">Title Case capitalizes the first letter of each word, while Sentence case only capitalizes the first letter of sentences.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I use this tool offline?</h3>
                <p className="text-muted-foreground">Once loaded, the tool works offline. You don't need an internet connection to convert text.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you store my data?</h3>
                <p className="text-muted-foreground">No, we don't store any of your data. Everything is processed locally in your browser.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/word-counter" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Word & Character Counter</h3>
                <p className="text-sm text-muted-foreground">Count words, characters, and reading time</p>
              </a>
              <a href="/json-formatter" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">JSON Formatter</h3>
                <p className="text-sm text-muted-foreground">Format and validate JSON data</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
