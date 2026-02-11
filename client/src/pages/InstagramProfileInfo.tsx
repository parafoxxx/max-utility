import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Instagram Profile Info - SEO: "instagram profile viewer"
 * View public Instagram profile information
 */
export default function InstagramProfileInfo() {
  const [username, setUsername] = useState("");
  const [info, setInfo] = useState<{
    username: string;
    profileUrl: string;
    tips: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const handleGetInfo = () => {
    setError("");
    setInfo(null);

    if (!username.trim()) {
      setError("Please enter an Instagram username");
      return;
    }

    const cleanUsername = username.replace(/^@/, "").toLowerCase();
    
    if (!/^[a-z0-9._]{1,30}$/.test(cleanUsername)) {
      setError("Invalid Instagram username format");
      return;
    }

    setInfo({
      username: cleanUsername,
      profileUrl: `https://instagram.com/${cleanUsername}`,
      tips: [
        "Visit the profile URL to see public posts and follower count",
        "Use this tool to verify Instagram usernames before following",
        "Check profile bios and links to understand account content",
        "Monitor competitor accounts for content strategy insights",
      ],
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Instagram Profile Viewer</h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Get direct links to Instagram profiles. Verify usernames and access public profile information. 
            Perfect for social media research and verification.
          </p>

          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <label className="block text-sm font-semibold mb-4">Instagram Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@username or username"
                className="tool-input mb-4"
              />
              <button
                onClick={handleGetInfo}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
              >
                Get Profile Link
              </button>

              {error && (
                <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}
            </div>

            {info && (
              <div className="space-y-4">
                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="font-semibold">@{info.username}</p>
                </div>

                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground mb-2">Profile URL</p>
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={info.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {info.profileUrl}
                    </a>
                    <button
                      onClick={() => copyToClipboard(info.profileUrl)}
                      className="px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80 whitespace-nowrap"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="tool-card p-4">
                  <a
                    href={info.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all"
                  >
                    Visit Profile
                  </a>
                </div>
              </div>
            )}
          </div>

          {info && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Profile Research Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {info.tips.map((tip, index) => (
                  <div key={index} className="tool-card p-4">
                    <p className="text-sm">{tip}</p>
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
              <li><strong>1. Enter Username:</strong> Type an Instagram username (with or without @)</li>
              <li><strong>2. Get Link:</strong> Click "Get Profile Link" to generate the URL</li>
              <li><strong>3. Visit:</strong> Click the profile link to view public information</li>
              <li><strong>4. Research:</strong> Check posts, followers, and bio information</li>
            </ol>
          </section>

          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Can I see private accounts?</h3>
                <p className="text-muted-foreground">No, this tool only works with public profiles. Private accounts require following to view.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is this tool legal?</h3>
                <p className="text-muted-foreground">Yes, it only accesses publicly available information on Instagram.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I download photos?</h3>
                <p className="text-muted-foreground">This tool only provides profile links. Respect copyright and Instagram ToS.</p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/youtube-metadata" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">YouTube Info Extractor</h3>
                <p className="text-sm text-muted-foreground">Get video metadata</p>
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
