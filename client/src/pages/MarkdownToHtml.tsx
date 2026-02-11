import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Markdown to HTML - SEO: "markdown to html converter"
 * Convert Markdown to HTML
 */
export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState("# Hello World\\n\\nThis is a **bold** text.");
  const [html, setHtml] = useState("");

  const convertMarkdown = () => {
    if (!markdown.trim()) {
      setHtml("");
      return;
    }

    let result = markdown;

    // Headers
    result = result.replace(/^### (.*?)$/gm, "<h3>$1</h3>");
    result = result.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
    result = result.replace(/^# (.*?)$/gm, "<h1>$1</h1>");

    // Bold
    result = result.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    result = result.replace(/__(.+?)__/g, "<strong>$1</strong>");

    // Italic
    result = result.replace(/\*(.*?)\*/g, "<em>$1</em>");
    result = result.replace(/_(.+?)_/g, "<em>$1</em>");

    // Code
    result = result.replace(/`(.*?)`/g, "<code>$1</code>");

    // Links
    result = result.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Line breaks
    result = result.replace(/\n\n/g, "</p><p>");
    result = "<p>" + result + "</p>";

    // Lists
    result = result.replace(/^\* (.*?)$/gm, "<li>$1</li>");
    result = result.replace(/(<li>.*?<\/li>)/m, "<ul>$1</ul>");

    setHtml(result);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Markdown to HTML Converter</h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Convert Markdown syntax to HTML. Perfect for bloggers, developers, 
            and content creators.
          </p>

          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <label className="block text-sm font-semibold mb-2">Markdown Input</label>
              <textarea
                value={markdown}
                onChange={(e) => {
                  setMarkdown(e.target.value);
                  if (html) convertMarkdown();
                }}
                placeholder="Enter Markdown..."
                className="tool-input min-h-96"
              />
              <button
                onClick={convertMarkdown}
                className="w-full mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
              >
                Convert to HTML
              </button>
            </div>

            {html && (
              <div>
                <label className="block text-sm font-semibold mb-2">HTML Output</label>
                <textarea
                  value={html}
                  readOnly
                  className="tool-input min-h-96 bg-secondary/30 font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(html)}
                  className="w-full mt-4 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-all"
                >
                  Copy HTML
                </button>
              </div>
            )}
          </div>

          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Markdown Syntax Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-3">Text Formatting</h3>
                <div className="space-y-2 text-sm font-mono">
                  <p><strong>Bold:</strong> **text** or __text__</p>
                  <p><strong>Italic:</strong> *text* or _text_</p>
                  <p><strong>Code:</strong> `code`</p>
                </div>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-3">Headings</h3>
                <div className="space-y-2 text-sm font-mono">
                  <p># Heading 1</p>
                  <p>## Heading 2</p>
                  <p>### Heading 3</p>
                </div>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-3">Links & Lists</h3>
                <div className="space-y-2 text-sm font-mono">
                  <p><strong>Link:</strong> [text](url)</p>
                  <p><strong>List:</strong> * item</p>
                </div>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-3">Examples</h3>
                <div className="space-y-2 text-sm font-mono">
                  <p>**Bold text**</p>
                  <p>*Italic text*</p>
                  <p>[Link](https://example.com)</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Is Markdown hard to learn?</h3>
                <p className="text-muted-foreground">No, Markdown is simple and easy to learn. Most people pick it up in minutes.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I use HTML in Markdown?</h3>
                <p className="text-muted-foreground">Yes, you can mix Markdown and HTML in the same document.</p>
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
              <a href="/base64-encoder" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Base64 Encoder</h3>
                <p className="text-sm text-muted-foreground">Encode/decode base64</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
