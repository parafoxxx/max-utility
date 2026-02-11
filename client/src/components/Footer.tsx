export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About</h3>
            <p className="text-muted-foreground text-sm">
              Free online utility tools for developers, students, and professionals.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/#text-tools" className="hover:text-primary transition-colors">Text Tools</a></li>
              <li><a href="/#image-tools" className="hover:text-primary transition-colors">Image Tools</a></li>
              <li><a href="/#pdf-tools" className="hover:text-primary transition-colors">PDF Tools</a></li>
              <li><a href="/#business-tools" className="hover:text-primary transition-colors">Business Tools</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Top Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/loan-calculator" className="hover:text-primary transition-colors">Loan Calculator</a></li>
              <li><a href="/profit-margin-calculator" className="hover:text-primary transition-colors">Profit Margin Calculator</a></li>
              <li><a href="/pdf-merge" className="hover:text-primary transition-colors">PDF Merge</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-muted-foreground text-sm">
            (c) 2026 Utility Tools. All rights reserved. Free online tools that are fast, secure, and no-login.
          </p>
        </div>
      </div>
    </footer>
  );
}
