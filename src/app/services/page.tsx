"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../components/ThemedInnerPageLayout';
import { ServiceRow } from './components/ServiceRow';

const services = [
  {
    name: "AI Voice Agents (Inbound/Outbound) & Text",
    description: "AI-powered voice & text agents for 24/7 customer service, sales outreach, lead qualification, and appointment setting.",
    imageUrl: "/services-images/voice-agent.jpeg"
  },
  {
    name: "SEO Services",
    description: "Boost organic traffic and rankings with data-driven SEO, including keyword research, on-page/technical optimization, and local SEO.",
    imageUrl: "/services-images/seo.jpeg"
  },
  {
    name: "AI Marketing - Proprietary Ad Optimizer",
    description: "Maximize ad spend & conversions with our exclusive AI Ad Optimizer, dynamically adjusting campaigns in real-time for peak performance.",
    imageUrl: "/services-images/ai-marketing.jpeg"
  },
  {
    name: "Web Design",
    description: "Stunning, responsive, user-centric websites focused on brand identity, intuitive navigation, speed, and SEO for optimal conversions.",
    imageUrl: "/services-images/web-design.jpeg"
  },
  {
    name: "Business Analytics",
    description: "Unlock actionable insights from your data. Custom dashboards and reporting for smarter, data-backed strategic decisions and growth.",
    imageUrl: "/services-images/business-analytics.jpeg"
  },
  {
    name: "Business Automation",
    description: "Automate marketing, sales, and operations. Improve productivity, reduce errors, and free up your valuable time and resources.",
    imageUrl: "/services-images/business-automation.jpeg"
  }
];

export default function ServicesPage() {
  return (
    <ThemedInnerPageLayout>
      {/* Full-height title section, respects layout padding, fills space between header/footer */}
      <div className="w-full flex flex-col items-center justify-center text-center min-h-[calc(100vh-16rem)]">
        <h1 
          className="font-bold font-[family-name:var(--font-geist-sans)] uppercase \
                     bg-gradient-to-b from-cyan-300 to-blue-600 bg-clip-text text-transparent \
                     text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl \
                     leading-none tracking-tighter select-none"
        > 
          <span className="block">Our</span>
          <span className="block">Services</span>
        </h1>
      </div>

      {/* Service items section */}
      {/* This div ensures content below the full-height title is within the standard page width and has its own padding */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-24 md:pt-32"> {/* Increased top padding for separation after full-height title */}
        <div className="w-full space-y-16 md:space-y-24">
          {services.map((service, index) => (
            <React.Fragment key={service.name}> 
              <ServiceRow 
                name={service.name} 
                description={service.description} 
                imageUrl={service.imageUrl}
                isReversed={index % 2 === 1}
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