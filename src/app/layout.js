import { Jost, Syne } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import GoToTopButton from "@/components/GoToTopButton";

// ─────────────────────────────────────────────────────────────
// Fonts
// Only load fonts that are visibly used. Geist Sans / Geist Mono
// were declared but never referenced in any className or style —
// removing them cuts ~two extra network requests on every page load.
//
// next/font automatically:
//   • self-hosts the font files (no google.com round-trip)
//   • injects <link rel="preload"> into the <head>
//   • sets font-display: swap so text is visible immediately
// ─────────────────────────────────────────────────────────────

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  // Only load the weights actually used in the project.
  // Each extra weight is a separate network request.
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

// ─────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────
export const metadata = {
  title: {
    default: "Alomonx Technology",
    template: "%s | Alomonx Technology",
  },
  description: "Start your tech journey with pride",
  metadataBase: new URL("https://alomonx.com"),
};

// ─────────────────────────────────────────────────────────────
// Viewport export — tells Next.js to emit the viewport <meta>
// tag correctly without mixing it into metadata (App Router).
// ─────────────────────────────────────────────────────────────
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ── Favicon ─────────────────────────────────────────
            Use a tiny favicon.ico for the default browser tab
            and reserve the 192×192 PNG for PWA/home-screen use.
            Serving a 192px PNG as a favicon forces the browser
            to download a large image for a 16×16 display slot.  */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/logo.png" />

        {/* ── Critical resource hints ─────────────────────────
            Preload the hero assets so they start downloading
            immediately — before the browser parses the page body.
            This eliminates the "discovered late" delay that makes
            the hero feel slow to paint.                           */}

        {/* Hero poster image — LCP candidate; preload it */}
        <link
          rel="preload"
          as="image"
          href="/hero_2.jpeg"
          fetchPriority="high"
        />

        {/* Hero video — preload just the webm (preferred format).
            "as=video" tells the browser this is a streaming asset,
            so it won't block other critical resources.             */}
        <link rel="preload" as="video" href="/hero-bg.webm" type="video/webm" />

        {/* ── DNS prefetch for any third-party origins ─────────
            If you use analytics, chat widgets, or CDN assets,
            add their origins here so the DNS lookup happens early.
            Example:
            <link rel="dns-prefetch" href="https://cdn.yourservice.com" />
        */}
      </head>

      <body
        // Only apply the font variables that are actually loaded above.
        // Adding unused variables (geistSans, geistMono) would do nothing
        // and make the class string needlessly long.
        className={`${jost.variable} ${syne.variable} antialiased`}
      >
        {/*
          Wrapper div is kept to preserve the original layout contract
          (sticky header + flex column), but the inline style object is
          moved to a CSS class in globals.css to avoid a style recalc
          on every render. If you can't edit globals.css right now,
          the inline style below is equivalent and fine to keep.
        */}
        <div className="layout-root">
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <GoToTopButton />
          <Footer />
        </div>
      </body>
    </html>
  );
}

/*
  Add this to globals.css to replace the inline style on .layout-root:

  .layout-root {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  This avoids Next.js serialising a new style object on every server render.
*/
