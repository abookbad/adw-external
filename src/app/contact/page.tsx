import { Metadata } from 'next';
import ContactPageClientContent from './components/ContactPageClientContent'; // Adjusted import path

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with Agency Dev Works",
  description: "Contact Agency Dev Works to discuss your project. We are ready to help you with AI solutions, web development, SEO, and business automation. Reach out today!",
  keywords: ["contact us", "get in touch", "project inquiry", "AI consultation", "web development quote", "Agency Dev Works contact"],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Agency Dev Works",
    description: "Ready to start your project? Get in touch with Agency Dev Works for expert AI and technology solutions.",
    url: "/contact",
    type: "website",
    images: [
      {
        url: "/og-contact.png", // Replace with your contact page specific OG image
        width: 1200,
        height: 630,
        alt: "Contact Agency Dev Works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get in Touch with Agency Dev Works",
    description: "Discuss your project with the experts at Agency Dev Works.",
    images: ["/twitter-contact.png"], // Replace with your contact page specific Twitter image
  },
};

export default function GetInTouchPage() {
  return <ContactPageClientContent />;
} 