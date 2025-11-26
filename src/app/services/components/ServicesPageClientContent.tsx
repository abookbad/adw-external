"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout'; // Adjusted import path
import { ServiceRow } from './ServiceRow';
import { PageHeroTitle } from '../../components/PageHeroTitle'; // Adjusted import path

const services = [
  {
    name: "Web Design",
    description: "Design and build conversion-focused sites.",
    imageUrl: "/services-images/Web Design.png",
    slug: "web-design"
  },
  {
    name: "Voice AI",
    description: "Human-like agents for support, sales, and booking.",
    imageUrl: "/services-images/AI.png",
    slug: "ai-voice-agents"
  },
  {
    name: "Business Automation",
    description: "Automate workflows across marketing, sales, and ops.",
    imageUrl: "/services-images/Automations.png",
    slug: "business-automation"
  },
  {
    name: "AI Marketing",
    description: "Optimize ads and creatives with AI for scalable growth.",
    imageUrl: "/services-images/Marketing.png",
    slug: "ai-marketing"
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