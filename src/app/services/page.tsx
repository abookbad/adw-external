import { Metadata } from 'next';
import ServicesPageClientContent from './components/ServicesPageClientContent';

export const metadata: Metadata = {
  title: "Our Services — Web Design, Voice AI, Automation, AI Marketing",
  description: "Explore Agency Dev Works services: Web Design, Voice AI, Business Automation, and AI Marketing.",
  keywords: ["services", "voice ai", "ai marketing", "web design", "business automation"],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Expert Tech Services | Agency Dev Works",
    description: "Discover our range of services designed to boost your business: AI, SEO, Web Design, and more.",
    url: "/services",
    type: "website",
    images: [
      {
        url: "/og-services.png",
        width: 1200,
        height: 630,
        alt: "Agency Dev Works Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Tech Services - Agency Dev Works",
    description: "AI, SEO, Web Design, and more. See how Agency Dev Works can help your business succeed.",
    images: ["/twitter-services.png"],
  },
};

export default function ServicesPage() {
  return <ServicesPageClientContent />;
} 