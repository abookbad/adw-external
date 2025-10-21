"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout'; // Adjusted import path
import { ServiceRow } from './ServiceRow';
import { PageHeroTitle } from '../../components/PageHeroTitle'; // Adjusted import path

const services = [
  {
    name: "AI Voice Agents (Inbound/Outbound)",
    description: "AI-powered voice agents for 24/7 customer service, sales outreach, lead qualification, and appointment setting.",
    imageUrl: "/services-images/AI.png",
    slug: "ai-voice-agents"
  },
  {
    name: "SEO + GEO Services",
    description: "SEO + GEO: Win classic rankings and AI Overviews. We optimize entities, content, technicals, and local so you get found everywhere people search.",
    imageUrl: "/services-images/SEO.png",
    slug: "seo-geo-services"
  },
  {
    name: "AI Marketing - Proprietary Ad Optimizer",
    description: "Maximize ad spend & conversions with our exclusive AI Ad Optimizer, dynamically adjusting campaigns in real-time for peak performance.",
    imageUrl: "/services-images/Marketing.png",
    slug: "ai-marketing"
  },
  {
    name: "Web Design",
    description: "Stunning, responsive, user-centric websites focused on brand identity, intuitive navigation, speed, and SEO for optimal conversions.",
    imageUrl: "/services-images/Web Design.png",
    slug: "web-design"
  },
  {
    name: "Business Analytics",
    description: "Unlock actionable insights from your data. Custom dashboards and reporting for smarter, data-backed strategic decisions and growth.",
    imageUrl: "/services-images/Business Analytics.png",
    slug: "business-analytics"
  },
  {
    name: "Business Automation",
    description: "Automate marketing, sales, and operations. Improve productivity, reduce errors, and free up your valuable time and resources.",
    imageUrl: "/services-images/Automations.png",
    slug: "business-automation"
  }
];

export default function ServicesPageClientContent() {
  return (
    <ThemedInnerPageLayout>
      <PageHeroTitle titleLine1="Our" titleLine2="Services" />

      {/* Service items section */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-24 md:pt-32">
        <div className="w-full space-y-16 md:space-y-24">
          {services.map((service, index) => (
            <React.Fragment key={service.name}> 
              <ServiceRow 
                name={service.name} 
                description={service.description} 
                imageUrl={service.imageUrl}
                isReversed={index === 1 || index === 3 || index === 5}
                slug={service.slug}
              />
              {index < services.length - 1 && (
                <hr className="border-slate-700/50 my-16 md:my-24" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </ThemedInnerPageLayout>
  );
} 