import { Metadata } from 'next';
import HomePageClientContent from './components/HomePageClientContent';
import TrackBioClick from './components/TrackBioClick';

export const metadata: Metadata = {
  title: "Innovative AI & Technology Solutions | Agency Dev Works",
  description: "Agency Dev Works offers cutting-edge AI-powered solutions, custom web development, and strategic digital transformation to elevate your business. Discover how we can help you grow.",
  keywords: ["home", "main page", "AI solutions", "custom web development", "digital transformation", "technology consultancy", "Agency Dev Works home"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Innovative AI & Technology Solutions | Agency Dev Works",
    description: "Elevate your business with Agency Dev Works - AI, web development, and digital strategy.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og-home.png", // Replace with your home page specific OG image
        width: 1200,
        height: 630,
        alt: "Agency Dev Works Home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Innovative AI & Technology Solutions | Agency Dev Works",
    description: "Agency Dev Works: AI-driven solutions for modern businesses.",
    images: ["/twitter-home.png"], // Replace with your home page specific Twitter image
  },
};

export default function NewHomePage() {
  return <>
    <TrackBioClick />
    <HomePageClientContent />
  </>;
}

