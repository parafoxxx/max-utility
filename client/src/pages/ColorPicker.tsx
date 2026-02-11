import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Color Picker - SEO: "color picker tool"
 * Pick colors and get hex, RGB, HSL codes
 */
export default function ColorPicker() {
  const [color, setColor] = useState("#3B82F6");
  const [colors, setColors] = useState<string[]>([]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(color);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const addTopalette = () => {
    if (!colors.includes(color)) {
      setColors([...colors, color]);
    }
  };

  const removeFromPalette = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateComplementary = () => {
    if (!hsl) return;
    const complementary = (hsl.h + 180) % 360;
    const hslStr = `hsl(${complementary}, ${hsl.s}%, ${hsl.l}%)`;
    // Convert back to hex
    const c = (1 - Math.abs(2 * hsl.l / 100 - 1)) * hsl.s / 100;
    const x = c * (1 - Math.abs((complementary / 60) % 2 - 1));
    const m = hsl.l / 100 - c / 2;
    let r = 0, g = 0, b = 0;
    if (complementary >= 0 && complementary < 60) {
      r = c; g = x; b = 0;
    } else if (complementary >= 60 && complementary < 120) {
      r = x; g = c; b = 0;
    } else if (complementary >= 120 && complementary < 180) {
      r = 0; g = c; b = x;
    } else if (complementary >= 180 && complementary < 240) {
      r = 0; g = x; b = c;
    } else if (complementary >= 240 && complementary < 300) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }
    const hex = "#" + [r, g, b].map(val => {
      const hex = Math.round((val + m) * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("").toUpperCase();
    setColor(hex);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Color Picker</h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Pick colors and get hex, RGB, and HSL codes. Build color palettes 
            and find complementary colors instantly.
          </p>

          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-4">Pick a Color</label>
                <div className="flex gap-4">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-24 h-24 rounded-lg cursor-pointer"
                  />
                  <div
                    className="flex-1 rounded-lg border-2 border-border"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={addTopalette}
                  className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all"
                >
                  Add to Palette
                </button>
                <button
                  onClick={generateComplementary}
                  className="w-full bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-all"
                >
                  Get Complementary
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="tool-card p-4">
                <p className="text-sm text-muted-foreground mb-2">Hex Code</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono font-bold text-lg">{color}</p>
                  <button
                    onClick={() => copyToClipboard(color)}
                    className="px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {rgb && (
                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground mb-2">RGB Code</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono font-bold">rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
                    <button
                      onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                      className="px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}

              {hsl && (
                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground mb-2">HSL Code</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono font-bold">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</p>
                    <button
                      onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                      className="px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {colors.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Color Palette ({colors.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {colors.map((c, index) => (
                  <div key={index} className="space-y-2">
                    <div
                      className="w-full h-24 rounded-lg border-2 border-border cursor-pointer hover:border-primary transition-colors"
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                    <div className="text-center">
                      <p className="font-mono text-xs font-bold">{c}</p>
                      <button
                        onClick={() => removeFromPalette(index)}
                        className="text-xs text-destructive hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li><strong>1. Pick Color:</strong> Click the color input to choose a color</li>
              <li><strong>2. View Codes:</strong> See hex, RGB, and HSL codes</li>
              <li><strong>3. Copy:</strong> Click "Copy" to copy any color code</li>
              <li><strong>4. Build Palette:</strong> Click "Add to Palette" to save colors</li>
              <li><strong>5. Find Complementary:</strong> Get the opposite color on the color wheel</li>
            </ol>
          </section>

          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Color Formats</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Hex Code</h3>
                <p className="text-sm text-muted-foreground">Used in web design and CSS. Example: #3B82F6</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">RGB Code</h3>
                <p className="text-sm text-muted-foreground">Red, Green, Blue values (0-255). Example: rgb(59, 130, 246)</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">HSL Code</h3>
                <p className="text-sm text-muted-foreground">Hue, Saturation, Lightness. Example: hsl(217, 100%, 60%)</p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/image-converter" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Image Converter</h3>
                <p className="text-sm text-muted-foreground">Convert image formats</p>
              </a>
              <a href="/qr-code-generator" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">QR Code Generator</h3>
                <p className="text-sm text-muted-foreground">Create QR codes</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
