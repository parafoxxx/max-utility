import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";

/**
 * Resume Keyword Matcher - SEO: "resume keyword matcher"
 * Matches resume keywords with job descriptions
 */
export default function ResumeMatcher() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [results, setResults] = useState<{
    matchPercentage: number;
    matchedKeywords: string[];
    missingKeywords: string[];
  } | null>(null);

  const extractKeywords = (text: string): string[] => {
    // Extract words longer than 3 characters, excluding common words
    const commonWords = new Set([
      "the", "and", "for", "with", "from", "that", "this", "have", "has", "been",
      "are", "was", "were", "will", "would", "could", "should", "may", "might",
      "can", "must", "shall", "our", "your", "their", "what", "which", "when",
      "where", "why", "how", "all", "each", "every", "both", "either", "or",
      "not", "no", "nor", "only", "same", "such", "so", "than", "then", "now",
      "just", "also", "well", "very", "too", "more", "most", "less", "least",
      "as", "if", "in", "on", "at", "by", "to", "of", "up", "out", "about",
      "into", "through", "during", "before", "after", "above", "below", "between",
      "under", "again", "further", "then", "once", "here", "there", "when", "where",
      "why", "how", "all", "any", "some", "few", "more", "most", "other", "another",
    ]);

    const words = text
      .toLowerCase()
      .replace(/[^\w\s+#]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3 && !commonWords.has(word));

    return Array.from(new Set(words));
  };

  const calculateMatch = () => {
    if (!resume.trim() || !jobDesc.trim()) {
      alert("Please fill in both resume and job description");
      return;
    }

    const resumeKeywordsArray = extractKeywords(resume);
    const jobKeywords = extractKeywords(jobDesc);

    const matchedKeywords = jobKeywords.filter((keyword) =>
      resumeKeywordsArray.includes(keyword)
    );
    const missingKeywords = jobKeywords.filter(
      (keyword) => !resumeKeywordsArray.includes(keyword)
    );

    const matchPercentage = Math.round(
      (matchedKeywords.length / jobKeywords.length) * 100
    );

    setResults({
      matchPercentage,
      matchedKeywords,
      missingKeywords,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12">
          {/* SEO H1 */}
          <h1 className="text-4xl font-bold mb-4">Resume Keyword Matcher</h1>
          
          {/* Meta Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Analyze your resume against job descriptions. Find matching keywords and identify missing skills. 
            Improve your resume to pass ATS systems and increase interview chances.
          </p>

          {/* Ad Placeholder */}
          <div className="mb-8">
            <AdPlaceholder size="banner" />
          </div>

          {/* Tool Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Resume Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">Your Resume</label>
              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your resume text here..."
                className="tool-input h-64 resize-none"
              />
            </div>

            {/* Job Description Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">Job Description</label>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
                className="tool-input h-64 resize-none"
              />
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={calculateMatch}
            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all mb-12"
          >
            Analyze Match
          </button>

          {/* Results */}
          {results && (
            <div className="mb-12 space-y-8">
              {/* Match Percentage */}
              <div className="tool-card p-8 text-center">
                <p className="text-muted-foreground mb-2">Match Percentage</p>
                <p className={`text-5xl font-bold ${
                  results.matchPercentage >= 80
                    ? "text-green-600"
                    : results.matchPercentage >= 50
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}>
                  {results.matchPercentage}%
                </p>
              </div>

              {/* Matched Keywords */}
              <div className="tool-card p-6">
                <h3 className="text-lg font-semibold mb-4">Matched Keywords ({results.matchedKeywords.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {results.matchedKeywords.length > 0 ? (
                    results.matchedKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No matching keywords found</p>
                  )}
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="tool-card p-6">
                <h3 className="text-lg font-semibold mb-4">Missing Keywords ({results.missingKeywords.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {results.missingKeywords.length > 0 ? (
                    results.missingKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <p className="text-muted-foreground">All keywords are matched!</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Ad Placeholder */}
          <div className="mb-12">
            <AdPlaceholder size="medium" />
          </div>

          {/* How to Use Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li><strong>1. Paste Resume:</strong> Copy and paste your resume text in the first field</li>
              <li><strong>2. Paste Job Description:</strong> Paste the job description in the second field</li>
              <li><strong>3. Analyze:</strong> Click "Analyze Match" to see results</li>
              <li><strong>4. Review Results:</strong> See matched keywords and missing skills</li>
              <li><strong>5. Update Resume:</strong> Add missing keywords to improve your match percentage</li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What is ATS and why does it matter?</h3>
                <p className="text-muted-foreground">ATS (Applicant Tracking System) is software used by recruiters to filter resumes. Matching keywords helps your resume pass ATS screening.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How accurate is the matching?</h3>
                <p className="text-muted-foreground">The tool extracts key skills and terms from both documents. For best results, use complete resume and job description text.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Should I add all missing keywords to my resume?</h3>
                <p className="text-muted-foreground">Only add keywords that are truthful about your skills. Don't lie on your resume, but highlight relevant experience.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is my data private?</h3>
                <p className="text-muted-foreground">Yes, all analysis happens in your browser. Your resume and job descriptions are never stored or transmitted.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I use this for multiple jobs?</h3>
                <p className="text-muted-foreground">Yes, you can analyze your resume against multiple job descriptions to customize it for each application.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/word-counter" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Word Counter</h3>
                <p className="text-sm text-muted-foreground">Count words and characters</p>
              </a>
              <a href="/text-case-converter" className="tool-card p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold">Text Case Converter</h3>
                <p className="text-sm text-muted-foreground">Convert text to different cases</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
