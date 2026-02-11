import { useMemo, useState } from "react";
import {
  Barcode,
  Calculator,
  CheckCircle2,
  Copy,
  DollarSign,
  FileArchive,
  FileJson,
  Film,
  Image,
  ImagePlus,
  Layers,
  Link,
  Lock,
  Palette,
  PieChart,
  Scissors,
  Sparkles,
  Type,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import AdPlaceholder from "@/components/AdPlaceholder";

type ToolItem = {
  title: string;
  description: string;
  href: string;
  icon: typeof Type;
  category: string;
  featured?: boolean;
};

const ALL_TOOLS: ToolItem[] = [
  {
    title: "Text Case Converter",
    description: "Convert text to uppercase, lowercase, and sentence case",
    href: "/text-case-converter",
    icon: Type,
    category: "Text",
  },
  {
    title: "Word & Character Counter",
    description: "Count words, characters, and estimate reading time",
    href: "/word-counter",
    icon: Copy,
    category: "Text",
  },
  {
    title: "JSON Formatter",
    description: "Pretty-print and validate JSON with error detection",
    href: "/json-formatter",
    icon: FileJson,
    category: "Text",
  },
  {
    title: "Resume Keyword Matcher",
    description: "Match resume keywords with job descriptions",
    href: "/resume-matcher",
    icon: Zap,
    category: "Text",
  },
  {
    title: "Image Compressor",
    description: "Compress JPG, PNG, and WebP with size comparison",
    href: "/image-compressor",
    icon: FileArchive,
    category: "Image",
  },
  {
    title: "Image Resizer",
    description: "Resize images with aspect ratio control",
    href: "/image-resizer",
    icon: ImagePlus,
    category: "Image",
  },
  {
    title: "Image Format Converter",
    description: "Convert between JPG, PNG, and WebP formats",
    href: "/image-converter",
    icon: Image,
    category: "Image",
  },
  {
    title: "Image to PDF",
    description: "Convert multiple images into a single PDF",
    href: "/image-to-pdf",
    icon: Layers,
    category: "PDF",
  },
  {
    title: "PDF Merge",
    description: "Combine multiple PDFs into one file",
    href: "/pdf-merge",
    icon: Layers,
    category: "PDF",
  },
  {
    title: "PDF Split",
    description: "Split PDF by page number or range",
    href: "/pdf-split",
    icon: Scissors,
    category: "PDF",
  },
  {
    title: "PDF Compressor",
    description: "Reduce PDF file size while maintaining quality",
    href: "/pdf-compressor",
    icon: FileArchive,
    category: "PDF",
  },
  {
    title: "PDF to Image",
    description: "Convert PDF pages to JPG or PNG images",
    href: "/pdf-to-image",
    icon: Image,
    category: "PDF",
  },
  {
    title: "Video Metadata Viewer",
    description: "View video duration, resolution, and format",
    href: "/video-metadata",
    icon: Film,
    category: "Media",
  },
  {
    title: "Video to Audio",
    description: "Convert MP4 videos to MP3 audio",
    href: "/video-to-audio",
    icon: Film,
    category: "Media",
  },
  {
    title: "GIF Maker",
    description: "Create animated GIFs from image sequences",
    href: "/gif-maker",
    icon: Sparkles,
    category: "Media",
  },
  {
    title: "YouTube Info Extractor",
    description: "Extract video ID, thumbnail, and embed code",
    href: "/youtube-metadata",
    icon: Film,
    category: "Social",
  },
  {
    title: "Instagram Profile Viewer",
    description: "Get direct links to Instagram profiles",
    href: "/instagram-profile-info",
    icon: Copy,
    category: "Social",
  },
  {
    title: "QR Code Generator",
    description: "Create QR codes for URLs, text, and WiFi",
    href: "/qr-code-generator",
    icon: Zap,
    category: "Utility",
  },
  {
    title: "URL Shortener",
    description: "Shorten long URLs with custom aliases",
    href: "/url-shortener",
    icon: Link,
    category: "Utility",
  },
  {
    title: "Password Generator",
    description: "Generate strong random passwords",
    href: "/password-generator",
    icon: Lock,
    category: "Utility",
  },
  {
    title: "Color Picker",
    description: "Pick colors and get hex, RGB, and HSL codes",
    href: "/color-picker",
    icon: Palette,
    category: "Utility",
  },
  {
    title: "Unit Converter",
    description: "Convert length, weight, volume, and temperature",
    href: "/unit-converter",
    icon: Calculator,
    category: "Utility",
  },
  {
    title: "Base64 Encoder",
    description: "Encode and decode Base64 strings",
    href: "/base64-encoder",
    icon: FileJson,
    category: "Developer",
  },
  {
    title: "Barcode Generator",
    description: "Generate Code128, Code39, and EAN13 barcodes",
    href: "/barcode-generator",
    icon: Barcode,
    category: "Developer",
  },
  {
    title: "Markdown to HTML",
    description: "Convert Markdown syntax to HTML",
    href: "/markdown-to-html",
    icon: FileJson,
    category: "Developer",
  },
  {
    title: "Checksum Calculator",
    description: "Calculate MD5 and SHA256 checksums",
    href: "/checksum-calculator",
    icon: Zap,
    category: "Developer",
  },
  {
    title: "Loan Payment Calculator",
    description: "Estimate monthly payments, total interest, and payoff cost",
    href: "/loan-calculator",
    icon: DollarSign,
    category: "Business",
    featured: true,
  },
  {
    title: "Profit Margin Calculator",
    description: "Calculate margin, markup, and profit for any sale",
    href: "/profit-margin-calculator",
    icon: PieChart,
    category: "Business",
    featured: true,
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const featuredTools = ALL_TOOLS.filter((tool) => tool.featured);
  const filteredTools = useMemo(() => {
    if (!query.trim()) return ALL_TOOLS;
    const normalized = query.trim().toLowerCase();
    return ALL_TOOLS.filter((tool) =>
      `${tool.title} ${tool.description} ${tool.category}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  const groupedTools = useMemo(() => {
    return filteredTools.reduce<Record<string, ToolItem[]>>((acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = [];
      }
      acc[tool.category].push(tool);
      return acc;
    }, {});
  }, [filteredTools]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="container py-12 md:py-16">
          <div className="rounded-2xl border border-border/60 bg-linear-to-br from-primary/10 via-background to-accent/20 p-8 md:p-12 shadow-sm">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">ToolMint: Free Utility Tools for Fast Workflows</h1>
              <p className="text-lg text-muted-foreground mb-6">
                One place for text, media, PDF, and business tools. Private by default, responsive on mobile, and optimized for speed.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="tool-card p-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary mb-1" />
                  Browser-side processing
                </div>
                <div className="tool-card p-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary mb-1" />
                  No login required
                </div>
                <div className="tool-card p-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary mb-1" />
                  Built for mobile and desktop
                </div>
              </div>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tools by name, use case, or category..."
                className="tool-input"
              />
            </div>
          </div>
        </section>

        <section className="container pb-10">
          <AdPlaceholder size="banner" label="Sponsored placement" />
        </section>

        <section className="container pb-10">
          <h2 className="text-2xl font-bold mb-5">Featured Business Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </section>

        {Object.entries(groupedTools).map(([category, tools]) => (
          <section key={category} id={`${category.toLowerCase()}-tools`} className="container pb-10">
            <h2 className="text-2xl font-bold mb-5">{category} Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.href} {...tool} />
              ))}
            </div>
          </section>
        ))}

        {filteredTools.length === 0 ? (
          <section className="container pb-12">
            <div className="tool-card p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No tools match your search</h3>
              <p className="text-muted-foreground mb-4">Try shorter terms like PDF, image, password, or business.</p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
              >
                Clear search
              </button>
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
