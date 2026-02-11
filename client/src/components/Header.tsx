import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Text", href: "/#text-tools" },
    { label: "Image", href: "/#image-tools" },
    { label: "PDF", href: "/#pdf-tools" },
    { label: "Business", href: "/#business-tools" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              U
            </div>
            <span className="font-bold text-lg hidden sm:inline">Utility Tools</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            {links.map((item) => (
              <a key={item.href} href={item.href} className="text-foreground hover:text-primary transition-colors">
                {item.label}
              </a>
            ))}
            <Link
              href="/loan-calculator"
              className="bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Start Planning
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md border border-border"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {isOpen ? (
          <nav className="md:hidden mt-4 space-y-2 pb-2">
            <Link href="/" className="block px-3 py-2 rounded-md hover:bg-secondary" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md hover:bg-secondary"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/profit-margin-calculator"
              className="block px-3 py-2 rounded-md bg-primary text-primary-foreground"
              onClick={() => setIsOpen(false)}
            >
              Profit Calculator
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
