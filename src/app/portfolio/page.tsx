import { Metadata } from 'next';
import PortfolioPageClientContent from './components/PortfolioPageClientContent'; // Adjusted import path

export const metadata: Metadata = {
  title: "Our Work - Portfolio | Agency Dev Works",
  description: "Browse the portfolio of Agency Dev Works. See our successful projects in AI development, web design, SEO optimization, and business automation. Get inspired for your next project.",
  keywords: ["portfolio", "our work", "case studies", "AI projects", "web design examples", "SEO results", "Agency Dev Works portfolio"],
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio | Agency Dev Works",
    description: "Explore successful projects and case studies by Agency Dev Works.",
    url: "/portfolio",
    type: "website",
    images: [
      {
        url: "/og-portfolio.png", // Replace with your portfolio page specific OG image
        width: 1200,
        height: 630,
        alt: "Agency Dev Works Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work - Portfolio | Agency Dev Works",
    description: "See the impactful solutions delivered by Agency Dev Works.",
    images: ["/twitter-portfolio.png"], // Replace with your portfolio page specific Twitter image
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClientContent />;
} 