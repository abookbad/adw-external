import { Metadata } from 'next';
import AboutPageClientContent from './components/AboutPageClientContent'; // Adjusted import path

export const metadata: Metadata = {
  title: "About Agency Dev Works - Our Mission & Team",
  description: "Learn about Agency Dev Works: our mission to transform businesses through technology, our expert team, and our approach to delivering innovative AI and web solutions.",
  keywords: ["about us", "company mission", "expert team", "technology consultancy", "AI development", "Agency Dev Works team", "our story"],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Agency Dev Works - Our Mission & Team",
    description: "Discover the story, mission, and team behind Agency Dev Works, a leader in AI and technology solutions.",
    url: "/about",
    type: "website",
    images: [
      {
        url: "/og-about.png", // Replace with your about page specific OG image
        width: 1200,
        height: 630,
        alt: "About Agency Dev Works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn About Agency Dev Works",
    description: "Meet the team and discover the mission of Agency Dev Works.",
    images: ["/twitter-about.png"], // Replace with your about page specific Twitter image
  },
};

export default function AboutPage() {
  return <AboutPageClientContent />;
} 