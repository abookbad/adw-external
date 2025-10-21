import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Comfortaa, Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AuthProvider from './components/AuthProvider';
import AdwMusicBar from './components/AdwMusicBar';
import { Analytics } from "@vercel/analytics/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"]
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.agencydevworks.ai'),
  title: {
    default: "Agency Dev Works - AI & Technology Solutions",
    template: "%s | Agency Dev Works",
  },
  description: "Leading technology consultancy specializing in AI voice agents, web development, SEO services, and business automation. Transform your business with cutting-edge solutions from Agency Dev Works.",
  keywords: ["AI solutions", "technology consultancy", "AI voice agents", "web development", "SEO services", "business automation", "digital transformation", "Agency Dev Works"],
  icons: {
    icon: [
      { url: "/adw_final.png", type: "image/png" },
      { url: "/adw_final.png", sizes: "32x32", type: "image/png" },
      { url: "/adw_final.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/adw_final.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/adw_final.png"],
  },
  openGraph: {
    title: "Agency Dev Works - AI & Technology Solutions",
    description: "Transform your business with cutting-edge AI and technology solutions from Agency Dev Works.",
    url: "https://www.agencydevworks.ai",
    siteName: "Agency Dev Works",
    images: [
      {
        url: "/adw_final.png",
        width: 1200,
        height: 630,
        alt: "Agency Dev Works",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agency Dev Works - AI & Technology Solutions",
    description: "Leading AI and tech solutions for business growth. Agency Dev Works.",
    images: ["/adw_final.png"],
  },
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
  alternates: {
    canonical: "https://www.agencydevworks.ai",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} ${lato.variable} antialiased`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9G1KMKJJ27"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-9G1KMKJJ27');
          `}
        </Script>
        <AuthProvider>
          <div className="pb-40 sm:pb-44 md:pb-48 lg:pb-52 xl:pb-56">
            {children}
          </div>
        </AuthProvider>
        <AdwMusicBar />
        <Analytics />
      </body>
    </html>
  );
}
