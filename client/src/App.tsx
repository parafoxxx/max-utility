import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const Home = lazy(() => import("./pages/Home"));
const TextCaseConverter = lazy(() => import("./pages/TextCaseConverter"));
const WordCounter = lazy(() => import("./pages/WordCounter"));
const JsonFormatter = lazy(() => import("./pages/JsonFormatter"));
const ResumeMatcher = lazy(() => import("./pages/ResumeMatcher"));
const ImageCompressor = lazy(() => import("./pages/ImageCompressor"));
const ImageResizer = lazy(() => import("./pages/ImageResizer"));
const ImageConverter = lazy(() => import("./pages/ImageConverter"));
const ImageToPdf = lazy(() => import("./pages/ImageToPdf"));
const PdfMerge = lazy(() => import("./pages/PdfMerge"));
const PdfSplit = lazy(() => import("./pages/PdfSplit"));
const PdfCompressor = lazy(() => import("./pages/PdfCompressor"));
const PdfToImage = lazy(() => import("./pages/PdfToImage"));
const VideoMetadata = lazy(() => import("./pages/VideoMetadata"));
const VideoToAudio = lazy(() => import("./pages/VideoToAudio"));
const GifMaker = lazy(() => import("./pages/GifMaker"));
const YoutubeMetadata = lazy(() => import("./pages/YoutubeMetadata"));
const InstagramProfileInfo = lazy(() => import("./pages/InstagramProfileInfo"));
const QrCodeGenerator = lazy(() => import("./pages/QrCodeGenerator"));
const UrlShortener = lazy(() => import("./pages/UrlShortener"));
const PasswordGenerator = lazy(() => import("./pages/PasswordGenerator"));
const ColorPicker = lazy(() => import("./pages/ColorPicker"));
const UnitConverter = lazy(() => import("./pages/UnitConverter"));
const Base64Encoder = lazy(() => import("./pages/Base64Encoder"));
const BarcodeGenerator = lazy(() => import("./pages/BarcodeGenerator"));
const MarkdownToHtml = lazy(() => import("./pages/MarkdownToHtml"));
const ChecksumCalculator = lazy(() => import("./pages/ChecksumCalculator"));
const LoanCalculator = lazy(() => import("./pages/LoanCalculator"));
const ProfitMarginCalculator = lazy(() => import("./pages/ProfitMarginCalculator"));

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      {/* Text Tools */}
      <Route path={"/text-case-converter"} component={TextCaseConverter} />
      <Route path={"/word-counter"} component={WordCounter} />
      <Route path={"/json-formatter"} component={JsonFormatter} />
      <Route path={"/resume-matcher"} component={ResumeMatcher} />
      {/* Image Tools */}
      <Route path={"/image-compressor"} component={ImageCompressor} />
      <Route path={"/image-resizer"} component={ImageResizer} />
      <Route path={"/image-converter"} component={ImageConverter} />
      <Route path={"/image-to-pdf"} component={ImageToPdf} />
      {/* PDF Tools */}
      <Route path={"/pdf-merge"} component={PdfMerge} />
      <Route path={"/pdf-split"} component={PdfSplit} />
      <Route path={"/pdf-compressor"} component={PdfCompressor} />
      <Route path={"/pdf-to-image"} component={PdfToImage} />
      {/* Media Tools */}
      <Route path={"/video-metadata"} component={VideoMetadata} />
      <Route path={"/video-to-audio"} component={VideoToAudio} />
      <Route path={"/gif-maker"} component={GifMaker} />
      {/* YouTube & Instagram Tools */}
      <Route path={"/youtube-metadata"} component={YoutubeMetadata} />
      <Route path={"/instagram-profile-info"} component={InstagramProfileInfo} />
      {/* Utility Tools */}
      <Route path={"/qr-code-generator"} component={QrCodeGenerator} />
      <Route path={"/url-shortener"} component={UrlShortener} />
      <Route path={"/password-generator"} component={PasswordGenerator} />
      <Route path={"/color-picker"} component={ColorPicker} />
      <Route path={"/unit-converter"} component={UnitConverter} />
      <Route path={"/loan-calculator"} component={LoanCalculator} />
      <Route path={"/profit-margin-calculator"} component={ProfitMarginCalculator} />
      {/* Data Tools */}
      <Route path={"/base64-encoder"} component={Base64Encoder} />
      <Route path={"/barcode-generator"} component={BarcodeGenerator} />
      <Route path={"/markdown-to-html"} component={MarkdownToHtml} />
      <Route path={"/checksum-calculator"} component={ChecksumCalculator} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="tool-card p-6">Loading tool...</div>
              </div>
            }
          >
            <Router />
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
