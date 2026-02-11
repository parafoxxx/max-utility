import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Password Generator - SEO: "password generator secure"
 * Generate strong, random passwords with customizable options
 */
export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState<"weak" | "fair" | "good" | "strong">("strong");

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (!chars) {
      alert("Select at least one character type");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 16) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    if (score <= 2) setStrength("weak");
    else if (score <= 4) setStrength("fair");
    else if (score <= 5) setStrength("good");
    else setStrength("strong");
  };

  const copyToClipboard = () => {
    if (password) navigator.clipboard.writeText(password);
  };

  const getStrengthColor = () => {
    switch (strength) {
      case "weak":
        return "text-destructive";
      case "fair":
        return "text-orange-500";
      case "good":
        return "text-yellow-500";
      case "strong":
        return "text-green-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Password Generator</h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Generate strong, random passwords with customizable options. 
            Ensure your accounts are secure with complex passwords.
          </p>

          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Password Length: {length}</label>
                <input
                  type="range"
                  min="4"
                  max="64"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Uppercase (A-Z)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Lowercase (a-z)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Numbers (0-9)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Symbols (!@#$%^&*)</span>
                </label>
              </div>

              <button
                onClick={generatePassword}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
              >
                Generate Password
              </button>
            </div>

            {password && (
              <div className="space-y-4">
                <div className="tool-card p-6 bg-secondary/30">
                  <p className="text-sm text-muted-foreground mb-2">Generated Password</p>
                  <p className="font-mono text-lg font-bold break-all mb-4">{password}</p>
                  <button
                    onClick={copyToClipboard}
                    className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all"
                  >
                    Copy to Clipboard
                  </button>
                </div>

                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground mb-2">Password Strength</p>
                  <p className={`text-lg font-bold capitalize ${getStrengthColor()}`}>
                    {strength}
                  </p>
                </div>

                <div className="tool-card p-4">
                  <p className="text-sm text-muted-foreground mb-2">Password Details</p>
                  <ul className="space-y-1 text-sm">
                    <li>Length: {password.length} characters</li>
                    <li>Uppercase: {/[A-Z]/.test(password) ? "Yes" : "No"}</li>
                    <li>Lowercase: {/[a-z]/.test(password) ? "Yes" : "No"}</li>
                    <li>Numbers: {/[0-9]/.test(password) ? "Yes" : "No"}</li>
                    <li>Symbols: {/[^a-zA-Z0-9]/.test(password) ? "Yes" : "No"}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Password Security Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">Use Long Passwords</h3>
                <p className="text-sm text-muted-foreground">16+ characters are recommended for maximum security.</p>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">Mix Character Types</h3>
                <p className="text-sm text-muted-foreground">Use uppercase, lowercase, numbers, and symbols.</p>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">Avoid Common Words</h3>
                <p className="text-sm text-muted-foreground">Random passwords are more secure than dictionary words.</p>
              </div>
              <div className="tool-card p-4">
                <h3 className="font-semibold mb-2">Use Unique Passwords</h3>
                <p className="text-sm text-muted-foreground">Create different passwords for each account.</p>
              </div>
            </div>
          </section>

          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Is my password secure?</h3>
                <p className="text-muted-foreground">Yes, passwords are generated locally in your browser and never sent anywhere.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What makes a strong password?</h3>
                <p className="text-muted-foreground">Length (16+ chars), mixed character types, and randomness.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I customize the password?</h3>
                <p className="text-muted-foreground">Yes, adjust length and character types to your needs.</p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/url-shortener" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">URL Shortener</h3>
                <p className="text-sm text-muted-foreground">Shorten long URLs</p>
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
