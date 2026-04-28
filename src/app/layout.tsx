import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://geek-labs-eight.vercel.app"),
  title: {
    template: "%s | Geek Labs Studio",
    default: "Geek Labs Studio — Code it. Build it. Break it.",
  },
  description:
    "Geek Labs Studio is the developer portfolio and engineering journal of Jerónimo — showcasing game development, embedded systems, hardware hacking, and experimental projects.",
  keywords: [
    "Geek Labs Studio",
    "developer portfolio",
    "game development",
    "embedded systems",
    "Raspberry Pi Pico",
    "hardware hacking",
    "devlog",
    "engineering journal",
    "C++",
    "Next.js",
  ],
  authors: [{ name: "Jerónimo", url: "https://github.com/Nexusdeveloper902" }],
  creator: "Jerónimo",
  publisher: "Geek Labs Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://geek-labs-eight.vercel.app",
    siteName: "Geek Labs Studio",
    title: "Geek Labs Studio — Code it. Build it. Break it.",
    description:
      "Developer portfolio and engineering journal — game development, embedded systems, and experimental projects by Jerónimo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geek Labs Studio — Code it. Build it. Break it.",
    description:
      "Developer portfolio and engineering journal — game development, embedded systems, and experimental projects by Jerónimo.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Geek Labs Studio",
  alternateName: "Geek Labs",
  url: "https://geek-labs-eight.vercel.app",
  description:
    "Developer portfolio and engineering journal by Jerónimo — game development, embedded systems, and experimental projects.",
  author: {
    "@type": "Person",
    name: "Jerónimo",
    url: "https://github.com/Nexusdeveloper902",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased overflow-x-hidden`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="container mx-auto max-w-5xl px-6 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
