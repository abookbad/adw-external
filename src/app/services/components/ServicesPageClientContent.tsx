"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout'; // Adjusted import path
import { ServiceRow } from './ServiceRow';
import { PageHeroTitle } from '../../components/PageHeroTitle'; // Adjusted import path

const services = [
  {
    name: "Web Design",
    description: "Design and build conversion-focused sites that load fast, rank well, and look beautiful. Includes technical SEO, on-page optimization, local presence, and GEO readiness baked into the build.",
    imageUrl: "/services-images/Web Design.png",
    slug: "web-design"
  },
  {
    name: "Voice AI",
    description: "AI voice agents for support, sales, lead qualification, and appointment setting. Human-like conversations, context memory, and 24/7 availability.",
    imageUrl: "/services-images/AI.png",
    slug: "ai-voice-agents"
  },
  {
    name: "Business Automation",
    description: "Automate marketing, sales, and operations. Streamline workflows, reduce manual tasks, and integrate your stack for reliable growth.",
    imageUrl: "/services-images/Automations.png",
    slug: "business-automation"
  },
  {
    name: "AI Marketing",
    description: "Scale acquisition with our AI Ad Optimizer and creative tooling. Dynamic budget allocation, multi-channel experimentation, and performance automation.",
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