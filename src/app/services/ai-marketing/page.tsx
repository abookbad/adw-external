"use client";

import React, { useState } from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../../components/PageHeroTitle';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Icons
const TraditionalIcon = ({ className = "w-8 h-8 text-slate-500" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const AIIcon = ({ className = "w-8 h-8 text-purple-500" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.875 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-.813 2.846a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

interface StepData {
  name: string;
  type: 'manual' | 'auto';
}

interface CampaignStageData {
  title: string;
  steps: StepData[];
  description: string;
  totalSteps: number;
  efficiencyGain?: number;
}

interface CampaignData {
  label: string;
  before: CampaignStageData;
  after: CampaignStageData;
}

const campaignData: Record<string, CampaignData> = {
  social: {
    label: "Social Media Campaigns",
    before: {
      title: "Traditional Social Marketing",
      steps: [
        { name: "Manual Post Scheduling", type: "manual" },
        { name: "Generic Content Creation", type: "manual" },
        { name: "Basic Demographic Targeting", type: "manual" },
        { name: "Manual Engagement Tracking", type: "manual" },
        { name: "Basic Analytics Review", type: "manual" },
      ],
      description: "Marketers spend hours on repetitive tasks with limited targeting precision and basic performance insights.",
      totalSteps: 5
    },
    after: {
      title: "AI-Powered Social Marketing",
      steps: [
        { name: "AI: Optimal Timing & Scheduling", type: "auto" },
        { name: "AI: Personalized Content Generation", type: "auto" },
        { name: "AI: Predictive Audience Targeting", type: "auto" },
        { name: "Marketer: Strategy & Creative Direction", type: "manual" },
      ],
      description: "AI handles optimization and personalization while marketers focus on high-level strategy and creative innovation.",
      efficiencyGain: 70,
      totalSteps: 4
    }
  },
  email: {
    label: "Email Marketing",
    before: {
      title: "Traditional Email Campaigns",
      steps: [
        { name: "Manual List Segmentation", type: "manual" },
        { name: "Template Design & Copy", type: "manual" },
        { name: "Send Time Guesswork", type: "manual" },
        { name: "Basic A/B Testing", type: "manual" },
      ],
      description: "Time-intensive manual segmentation and guesswork around optimal timing leads to subpar performance.",
      totalSteps: 4
    },
    after: {
      title: "AI-Driven Email Marketing",
      steps: [
        { name: "AI: Dynamic Segmentation", type: "auto" },
        { name: "AI: Personalized Content & Timing", type: "auto" },
        { name: "AI: Continuous A/B Optimization", type: "auto" },
        { name: "Marketer: Campaign Strategy", type: "manual" },
      ],
      description: "AI continuously optimizes every aspect of email campaigns while marketers focus on strategic planning.",
      efficiencyGain: 85,
      totalSteps: 4
    }
  },
  ads: {
    label: "Paid Advertising",
    before: {
      title: "Manual Ad Management",
      steps: [
        { name: "Manual Keyword Research", type: "manual" },
        { name: "Static Ad Creation", type: "manual" },
        { name: "Manual Bid Adjustments", type: "manual" },
        { name: "Performance Monitoring", type: "manual" },
        { name: "Campaign Optimization", type: "manual" },
      ],
      description: "Constant manual monitoring and adjustments required, with limited ability to optimize in real-time.",
      totalSteps: 5
    },
    after: {
      title: "AI-Automated Ad Management",
      steps: [
        { name: "AI: Smart Keyword Discovery", type: "auto" },
        { name: "AI: Dynamic Ad Creation", type: "auto" },
        { name: "AI: Real-time Bid Optimization", type: "auto" },
        { name: "Marketer: Strategic Oversight", type: "manual" },
      ],
      description: "AI continuously optimizes bids, keywords, and creatives in real-time for maximum ROI.",
      efficiencyGain: 90,
      totalSteps: 4
    }
  }
};

type CampaignKey = keyof typeof campaignData;

const MarketingTransformationDemo = () => {
  const [activeCampaign, setActiveCampaign] = useState<CampaignKey>('social');
  const [isAIPowered, setIsAIPowered] = useState(false);

  const currentStageData = isAIPowered ? campaignData[activeCampaign].after : campaignData[activeCampaign].before;

  const stepVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.15, type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Marketing Evolution Demo</h3>
      <p className="text-xs sm:text-sm text-purple-300 mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider">See how AI transforms your marketing from manual to magical.</p>
      
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 items-start">
        <div className="w-full lg:w-1/3 space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-1 sm:mb-1.5 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">1. Choose Campaign Type:</p>
          {(Object.keys(campaignData) as CampaignKey[]).map((key) => (
            <button key={key} onClick={() => { setActiveCampaign(key); setIsAIPowered(false); }}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg transition-all duration-200 text-xs sm:text-sm shadow-md hover:shadow-lg font-[family-name:var(--font-geist-mono)] tracking-wider
                          ${activeCampaign === key ? 'bg-purple-600 text-white ring-2 ring-purple-400' : 'bg-slate-700 hover:bg-slate-600/80 text-slate-200'}`}>
              {campaignData[key].label}
            </button>
          ))}
        </div>
        
        <div className="w-full lg:w-2/3 bg-slate-900/50 p-3 sm:p-5 md:p-6 rounded-xl border border-slate-700 min-h-[250px] sm:min-h-[300px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCampaign}-${isAIPowered}`} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.4 }}
              className="flex flex-col flex-grow"
            >
              <h4 className={`text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider ${isAIPowered ? 'text-purple-400' : 'text-orange-400'}`}>{currentStageData.title}</h4>
              
              <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 flex-grow">
                {currentStageData.steps.map((step: StepData, i: number) => (
                  <motion.div 
                    key={step.name + i} 
                    className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-md text-xs sm:text-sm font-[family-name:var(--font-geist-mono)] tracking-wider ${step.type === 'auto' ? 'bg-purple-700/30' : 'bg-slate-700/40'}`}
                    variants={stepVariants} initial="hidden" animate="visible" transition={{ delay: i * 0.15, type: 'spring', stiffness: 100 }}
                  >
                    {step.type === 'auto' ? <AIIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" /> : <TraditionalIcon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 flex-shrink-0" />}
                    <span className={step.type === 'auto' ? 'text-purple-300' : 'text-slate-300'}>{step.name}</span>
                        </motion.div>
                ))}
                    </div>
              
              <p className="text-xs text-slate-400 mb-2 sm:mb-3 min-h-[2.5em] sm:min-h-[3.5em] leading-relaxed font-[family-name:var(--font-geist-mono)]">{currentStageData.description}</p>
              
              {isAIPowered && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-center p-2 bg-purple-600/20 border border-purple-500/50 rounded-md">
                  <p className="text-purple-300 font-semibold text-xs sm:text-sm font-[family-name:var(--font-geist-mono)] tracking-wider">
                    Efficiency Gain: <span className="text-sm sm:text-lg">~{campaignData[activeCampaign].after.efficiencyGain}%</span>
                  </p>
                  <p className="text-xs text-purple-400 font-[family-name:var(--font-geist-mono)]">Less manual work, better results!</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6">
        <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-1 sm:mb-1.5 text-center lg:text-left font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">2. See the AI Magic:</p>
        <button onClick={() => setIsAIPowered(!isAIPowered)} 
          className={`w-full font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-[family-name:var(--font-geist-mono)] tracking-wider uppercase
                      ${isAIPowered ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>
          {isAIPowered ? 'View Traditional Approach' : 'Unleash AI Power!'}
        </button>
      </div>
    </motion.div>
  );
};

// Interactive Marketing ROI Calculator
const MarketingROICalculator = () => {
  const [monthlyAdSpend, setMonthlyAdSpend] = useState(5000);
  const [currentConversionRate, setCurrentConversionRate] = useState(2);
  const [averageOrderValue, setAverageOrderValue] = useState(100);
  const [aiImprovementPercent, setAiImprovementPercent] = useState(40);

  const monthlyVisitors = monthlyAdSpend * 10; // Rough estimate: $1 = 10 visitors
  const currentConversions = (monthlyVisitors * currentConversionRate) / 100;
  const currentRevenue = currentConversions * averageOrderValue;
  
  const improvedConversionRate = currentConversionRate * (1 + aiImprovementPercent / 100);
  const improvedConversions = (monthlyVisitors * improvedConversionRate) / 100;
  const improvedRevenue = improvedConversions * averageOrderValue;
  
  const monthlyGain = improvedRevenue - currentRevenue;
  const yearlyGain = monthlyGain * 12;

  return (
    <motion.div 
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
        AI Marketing ROI Calculator
      </h3>
      <p className="text-xs sm:text-sm text-purple-300 mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider">
        Discover your potential revenue boost with AI-powered marketing
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Input Section */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-semibold text-purple-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Monthly Ad Spend: ${monthlyAdSpend.toLocaleString()}
            </label>
            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={monthlyAdSpend}
              onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Current Conversion Rate: {currentConversionRate}%
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.1"
              value={currentConversionRate}
              onChange={(e) => setCurrentConversionRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Average Order Value: ${averageOrderValue}
            </label>
            <input
              type="range"
              min="25"
              max="500"
              step="5"
              value={averageOrderValue}
              onChange={(e) => setAverageOrderValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              AI Performance Boost: {aiImprovementPercent}%
            </label>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={aiImprovementPercent}
              onChange={(e) => setAiImprovementPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-slate-900/50 p-4 sm:p-6 rounded-xl border border-purple-700/30">
          <h4 className="text-lg sm:text-xl font-bold text-purple-400 mb-4 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Your AI Marketing Potential
          </h4>
          
          <div className="space-y-4">
            <motion.div 
              className="text-center p-3 bg-purple-600/20 border border-purple-500/50 rounded-md"
              key={improvedConversionRate}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-purple-300 font-semibold text-sm font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                New Conversion Rate
              </p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                {improvedConversionRate.toFixed(1)}%
              </p>
              <p className="text-purple-200 text-xs">
                Up from {currentConversionRate}%
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-3 bg-green-600/20 border border-green-500/50 rounded-md"
              key={monthlyGain}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <p className="text-green-300 font-semibold text-sm font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                Monthly Revenue Gain
              </p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                ${monthlyGain.toLocaleString()}
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-3 bg-yellow-600/20 border border-yellow-500/50 rounded-md"
              key={yearlyGain}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <p className="text-yellow-300 font-semibold text-sm font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                Yearly Revenue Boost
              </p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                ${yearlyGain.toLocaleString()}
              </p>
              <p className="text-yellow-200 text-xs font-[family-name:var(--font-geist-mono)]">
                {(improvedConversions - currentConversions).toFixed(0)} additional conversions/month
              </p>
            </motion.div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400 font-[family-name:var(--font-geist-mono)]">
              *Based on typical AI marketing improvements
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MarketingBenefits = () => (
  <div className="bg-gradient-to-b from-slate-800/60 to-slate-900/70 rounded-2xl p-4 sm:p-8 md:p-12 my-8 sm:my-16 md:my-20 shadow-xl border border-purple-700/30">
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Why AI Marketing Works</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {[ 
         { 
           title: "Smarter Targeting", 
           text: "AI finds your ideal customers with precision that beats human guesswork.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
               <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
             </svg>
           )
         },
         { 
           title: "Always-On Optimization", 
           text: "AI improves your campaigns 24/7 while you sleep.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
             </svg>
           )
         },
         { 
           title: "Real ROI", 
           text: "Stop guessing. AI shows exactly what&apos;s working and what&apos;s not.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
             </svg>
           )
         }
      ].map((benefit, index) => (
        <motion.div 
          key={benefit.title} 
          className="bg-slate-700/40 p-4 sm:p-6 rounded-lg border border-slate-600/50 hover:border-purple-500/60 transition-colors duration-300 text-center" 
          initial={{opacity:0, y:15}} 
          whileInView={{opacity:1, y:0}} 
          transition={{duration:0.5, delay:0.1 + index * 0.1}} 
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-3 sm:mb-4">
            {benefit.icon}
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-purple-400 mb-1.5 sm:mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">{benefit.title}</h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">{benefit.text}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default function AIMarketingPage() {
  return (
    <ThemedInnerPageLayout themeColor="purple">
      <PageHeroTitle titleLine1="AI" titleLine2="Marketing" />
      
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 pt-12 sm:pt-20 md:pt-28 pb-8 sm:pb-16">
        <motion.div className="text-center mb-20 sm:mb-28 md:mb-36" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Stop Guessing,<br className="sm:hidden" /> Start Converting.
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-[family-name:var(--font-geist-mono)]">
            Transform your marketing from spray-and-pray to laser-focused precision. Our AI analyzes millions of data points to target the right people with the right message at the perfect moment.
          </p>
        </motion.div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <MarketingTransformationDemo />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-12 sm:mb-16 md:mb-20">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Your Marketing Budget is Bleeding Money
          </h3>
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">
              Every day you run campaigns with manual targeting and guesswork, you&apos;re throwing money at the wrong people. Your competitors are using AI to find customers you&apos;re missing and convert prospects you&apos;re losing.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-purple-300 leading-relaxed font-[family-name:var(--font-geist-mono)] font-semibold">
              Calculate exactly how much revenue you&apos;re leaving on the table — and how much AI could unlock for your business.
            </p>
          </div>
        </motion.div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <MarketingROICalculator />
            </div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <MarketingBenefits />
          </div>

        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Ready to Supercharge Your Marketing?</h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact?subject=AI%20Marketing%20Strategy" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-300 shadow-md hover:shadow-lg font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Unlock AI Marketing Power
            </Link>
            <Link href="/services" className="border border-purple-500 hover:bg-purple-500/10 text-purple-400 hover:text-purple-300 font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-300 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Explore All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </ThemedInnerPageLayout>
  );
} 