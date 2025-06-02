"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../components/ThemedInnerPageLayout';
import { ServiceRow } from './components/ServiceRow';
import { PageHeroTitle } from '../components/PageHeroTitle';

const services = [
  {
    name: "AI Voice Agents (Inbound/Outbound) & Text",
    description: "AI-powered voice & text agents for 24/7 customer service, sales outreach, lead qualification, and appointment setting.",
    imageUrl: "/services-images/AI.png",
    slug: "ai-voice-agents"
  },
  {
    name: "SEO Services",
    description: "Boost organic traffic and rankings with data-driven SEO, including keyword research, on-page/technical optimization, and local SEO.",
    imageUrl: "/services-images/SEO.png",
    slug: "seo-services"
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

export default function ServicesPage() {
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
                isReversed={index % 2 === 1}
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