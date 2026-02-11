import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Word & Character Counter - SEO: "word counter online"
 * Counts words, characters, sentences, and estimates reading time
 */
export default function WordCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute

    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs: paragraphs || 0,
      readingTime: readingTime || 0,
    });
  }, [text]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          {/* SEO H1 */}
          <h1 className="text-4xl font-bold mb-4">Word & Character Counter</h1>
          
          {/* Meta Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Count words, characters, sentences, and paragraphs instantly. Get estimated reading time for your content. 
            Free online tool perfect for writers, students, and content creators.
          </p>

          {/* Ad Placeholder */}
          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          {/* Tool Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Input */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold mb-2">Paste or Type Your Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here to analyze..."
                className="tool-input h-96 resize-none"
              />
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="tool-card p-4">
                <p className="text-muted-foreground text-sm">Words</p>
                <p className="text-3xl font-bold text-primary">{stats.words}</p>
              </div>
              <div className="tool-card p-4">
                <p className="text-muted-foreground text-sm">Characters</p>
                <p className="text-3xl font-bold text-primary">{stats.characters}</p>
              </div>
              <div className="tool-card p-4">
                <p className="text-muted-foreground text-sm">Characters (no spaces)</p>
                <p className="text-3xl font-bold text-primary">{stats.charactersNoSpaces}</p>
              </div>
              <div className="tool-card p-4">
                <p className="text-muted-foreground text-sm">Sentences</p>
                <p className="text-3xl font-bold text-primary">{stats.sentences}</p>
              </div>
              <div className="tool-card p-4">
                <p className="text-muted-foreground text-sm">Paragraphs</p>
                <p className="text-3xl font-bold text-primary">{stats.paragraphs}</p>
              </div>
              <div className="tool-card p-4 bg-accent/10">
                <p className="text-muted-foreground text-sm">Reading Time</p>
                <p className="text-3xl font-bold text-accent">{stats.readingTime} min</p>
              </div>
            </div>
          </div>

          {/* Ad Placeholder */}
          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          {/* How to Use Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li><strong>1. Paste Text:</strong> Copy and paste your text into the input field</li>
              <li><strong>2. Instant Analysis:</strong> Statistics update automatically as you type</li>
              <li><strong>3. View Results:</strong> See word count, character count, and reading time on the right</li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">How is reading time calculated?</h3>
                <p className="text-muted-foreground">Reading time is calculated based on an average reading speed of 200 words per minute.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What's the difference between characters and characters without spaces?</h3>
                <p className="text-muted-foreground">Characters include spaces, while characters without spaces counts only letters, numbers, and punctuation.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I use this for very long documents?</h3>
                <p className="text-muted-foreground">Yes, the tool handles documents of any length without performance issues.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is my text saved anywhere?</h3>
                <p className="text-muted-foreground">No, all analysis happens in your browser. Your text is never stored or transmitted.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I export the statistics?</h3>
                <p className="text-muted-foreground">Currently, you can copy the statistics manually. We're working on export features.</p>
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
