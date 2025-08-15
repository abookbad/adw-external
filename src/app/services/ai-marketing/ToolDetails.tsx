"use client";
import { motion } from 'framer-motion';
import React from 'react';

const sectionData = [
  {
    title: "Business Model",
    content: "Our team builds and deploys AI-powered tools to optimize marketing operations. This internal application pulls performance data from Meta Ads, Google Ads, and Meta Pixel to generate AI-based insights that help guide ad strategy, improve ROAS, and reduce CPA. We only use this tool on campaigns and assets we manage directly."
  },
  {
    title: "Tool Access/Use",
    content: "This tool is used by internal marketing analysts and campaign managers at Agency DevWorks. It includes a reporting dashboard and the ability to export summarized PDF performance reports. AI-powered insights are embedded directly into the tool to help guide decision-making. Clients do not access the tool directly but receive updates and summaries."
  },
  {
    title: "Tool Design",
    content: "The tool syncs hourly with Meta and Google ad APIs to retrieve campaign performance and Pixel event data. These metrics are stored in our internal database. OpenAI is used to analyze this data and generate intelligent summaries, optimization tips, and alerts. Users can view metrics by date range, ask performance-related questions, and generate reports."
  }
];

const apiServices = [
  "Pull Meta Ads performance (via Meta Ads API)",
  "Access Meta Pixel conversion events",
  "Retrieve Google Ads data using the Google Ads API",
  "AI insights generated using the OpenAI API"
];

const CheckIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
  </svg>
);


export const ToolDetails = () => {
  return (
    <motion.div
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
        Internal AI Tooling Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-6">
          {sectionData.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-purple-400 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                {section.title}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-900/50 p-4 sm:p-6 rounded-xl border border-slate-700">
          <h4 className="text-lg font-bold text-purple-400 mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            API Services Called
          </h4>
          <ul className="space-y-3">
            {apiServices.map((service, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <CheckIcon className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-300 font-[family-name:var(--font-geist-mono)]">
                  {service}
                </span>
              </motion.li>
            ))}
          </ul>
           <div className="mt-8">
            <h4 className="text-lg font-bold text-purple-400 mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Tool Mockups
            </h4>
            <div className="text-sm text-slate-400 font-[family-name:var(--font-geist-mono)]">
              [Mockups to be added here]
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
