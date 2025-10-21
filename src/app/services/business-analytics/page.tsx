"use client";

import React, { useState, useEffect } from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../../components/PageHeroTitle';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Icons
const RawDataIcon = ({ className = "w-8 h-8 text-slate-500" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);

const InsightIcon = ({ className = "w-8 h-8 text-cyan-500" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a7.5 7.5 0 01-4.5 0m4.5 0v.75A2.25 2.25 0 0013.5 21h-3A2.25 2.25 0 018.25 18.75v-.75m4.5 0V12A2.25 2.25 0 0010.5 9.75H12zm0 0L9 6.75M12 12l3-5.25" />
    </svg>
);

interface DataPoint {
  name: string;
  type: string;
  insight: string;
}

interface Insight {
  name: string;
  type: string;
  actionable: string;
}

interface BusinessStageData {
  title: string;
  description: string;
  dataPoints?: DataPoint[];
  insights?: Insight[];
  totalDataPoints?: number;
  totalInsights?: number;
  valueGain?: number;
}

interface BusinessScenario {
  label: string;
  before: BusinessStageData;
  after: BusinessStageData;
}

const businessScenariosData: Record<string, BusinessScenario> = {
  retail: {
    label: "E-commerce Store",
    before: {
      title: "Scattered Data Points",
      dataPoints: [
        { name: "Sales: $50K/month", type: "raw", insight: "Basic revenue number" },
        { name: "150 Orders", type: "raw", insight: "Order count only" },
        { name: "3.2% Conversion Rate", type: "raw", insight: "Single metric" },
        { name: "2,000 Website Visitors", type: "raw", insight: "Traffic volume" },
        { name: "High Cart Abandonment", type: "raw", insight: "Known issue" },
      ],
      description: "You have basic metrics but no clear picture of what's driving performance or how to improve.",
      totalDataPoints: 5
    },
    after: {
      title: "Smart Business Intelligence",
      insights: [
        { name: "Peak Sales: Mobile Users, 7-9PM", type: "insight", actionable: "Optimize mobile checkout, target evening ads" },
        { name: "Cart Abandonment: High Shipping Costs", type: "insight", actionable: "Offer free shipping over $75" },
        { name: "Top Products: 40% of Revenue", type: "insight", actionable: "Increase inventory, create bundles" },
        { name: "Predict: 30% Holiday Surge", type: "insight", actionable: "Prep inventory, scale customer support" },
      ],
      description: "Transform data into precise actions that directly impact your bottom line.",
      valueGain: 45,
      totalInsights: 4
    }
  },
  saas: {
    label: "SaaS Business",
    before: {
      title: "Basic Metrics Dashboard",
      dataPoints: [
        { name: "100 New Signups", type: "raw", insight: "Just the number" },
        { name: "5% Churn Rate", type: "raw", insight: "Industry average" },
        { name: "$15K MRR", type: "raw", insight: "Monthly revenue" },
        { name: "Customer Support Tickets", type: "raw", insight: "Volume tracking" },
        { name: "Feature Usage Data", type: "raw", insight: "Basic analytics" },
      ],
      description: "Standard SaaS metrics without understanding customer behavior patterns or growth opportunities.",
      totalDataPoints: 5
    },
    after: {
      title: "Predictive Customer Intelligence",
      insights: [
        { name: "Churn Risk: Users Not Using Feature X", type: "insight", actionable: "Proactive onboarding campaigns" },
        { name: "Upsell Opportunity: 200 Power Users", type: "insight", actionable: "Targeted premium plan offers" },
        { name: "Predict: 25% MRR Growth Next Quarter", type: "insight", actionable: "Scale sales team, increase marketing" },
        { name: "Support Pattern: Feature Confusion", type: "insight", actionable: "Improve UX, create tutorials" },
      ],
      description: "Predict customer behavior, prevent churn, and identify growth opportunities before they're obvious.",
      valueGain: 65,
      totalInsights: 4
    }
  },
  restaurant: {
    label: "Restaurant Chain",
    before: {
      title: "Traditional Reporting",
      dataPoints: [
        { name: "Daily Sales: $8K", type: "raw", insight: "Total revenue" },
        { name: "120 Customers Served", type: "raw", insight: "Basic count" },
        { name: "Food Cost: 30%", type: "raw", insight: "Industry standard" },
        { name: "Staff Hours: 80/day", type: "raw", insight: "Labor tracking" },
        { name: "Peak Hours: Lunch & Dinner", type: "raw", insight: "Obvious patterns" },
      ],
      description: "Standard restaurant metrics that tell you what happened but not why or what to do next.",
      totalDataPoints: 5
    },
    after: {
      title: "Operational Intelligence",
      insights: [
        { name: "Weather Impact: Rain = 25% Delivery Spike", type: "insight", actionable: "Dynamic staffing & inventory" },
        { name: "Menu Analysis: 3 Items = 60% Profit", type: "insight", actionable: "Promote high-margin dishes" },
        { name: "Staff Optimization: Reduce 15% Labor Costs", type: "insight", actionable: "Smart scheduling system" },
        { name: "Predict: Tuesday Catering Demand", type: "insight", actionable: "Prep ingredients, staff accordingly" },
      ],
      description: "Optimize operations, predict demand, and maximize profitability through data-driven decisions.",
      valueGain: 55,
      totalInsights: 4
    }
  }
};

type BusinessScenarioKey = keyof typeof businessScenariosData;

const DataInsightsDiscoveryDemo = () => {
  const [activeScenario, setActiveScenario] = useState<BusinessScenarioKey>('retail');
  const [showInsights, setShowInsights] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const currentStageData = showInsights ? businessScenariosData[activeScenario].after : businessScenariosData[activeScenario].before;

  const stepVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
    }
  };

  useEffect(() => {
    if (showInsights) {
      setCurrentStep(0);
      const timer = setInterval(() => {
        setCurrentStep(prev => {
          const insightsLength = businessScenariosData[activeScenario].after.insights?.length || 0;
          if (prev < (insightsLength - 1)) {
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 800);
      return () => clearInterval(timer);
    }
  }, [showInsights, activeScenario]);

  return (
    <motion.div 
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Data Insights Discovery Demo</h3>
      <p className="text-xs sm:text-sm text-cyan-300 mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider">Watch your raw data transform into actionable business intelligence.</p>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 items-start">
        <div className="w-full lg:w-1/3 space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-1 sm:mb-1.5 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">1. Choose Your Business:</p>
          {(Object.keys(businessScenariosData) as BusinessScenarioKey[]).map((key) => (
            <button key={key} onClick={() => { setActiveScenario(key); setShowInsights(false); }}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg transition-all duration-200 text-xs sm:text-sm shadow-md hover:shadow-lg font-[family-name:var(--font-geist-mono)] tracking-wider
                          ${activeScenario === key ? 'bg-cyan-600 text-white ring-2 ring-cyan-400' : 'bg-slate-700 hover:bg-slate-600/80 text-slate-200'}`}>
              {businessScenariosData[key].label}
            </button>
          ))}
        </div>
        
        <div className="w-full lg:w-2/3 bg-slate-900/50 p-3 sm:p-5 md:p-6 rounded-xl border border-slate-700 min-h-[250px] sm:min-h-[350px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeScenario}-${showInsights}`} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.4 }}
              className="flex flex-col flex-grow"
            >
              <h4 className={`text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider ${showInsights ? 'text-cyan-400' : 'text-orange-400'}`}>{currentStageData.title}</h4>
              
              <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 flex-grow">
                {showInsights ? (
                  // Insights view
                  businessScenariosData[activeScenario].after.insights?.map((insight: Insight, i: number) => (
                    <motion.div 
                      key={insight.name + i} 
                      className={`p-3 sm:p-4 rounded-md border transition-all duration-300 ${
                        i <= currentStep ? 
                        'bg-cyan-700/30 border-cyan-500/50 opacity-100' : 
                        'bg-slate-700/20 border-slate-600/30 opacity-40'
                      }`}
                    variants={stepVariants} initial="hidden" animate={i <= currentStep ? "visible" : "hidden"} transition={{ delay: i * 0.2, type: 'spring', stiffness: 120 }}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <InsightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-grow">
                          <span className="text-cyan-300 text-xs sm:text-sm font-semibold font-[family-name:var(--font-geist-mono)] tracking-wider block">{insight.name}</span>
                          <span className="text-slate-300 text-xs font-[family-name:var(--font-geist-mono)] block mt-1">→ {insight.actionable}</span>
                        </div>
                      </div>
                    </motion.div>
                  )) || []
                ) : (
                  // Raw data view
                  currentStageData.dataPoints?.map((dataPoint: DataPoint, i: number) => (
                  <motion.div
                      key={dataPoint.name + i} 
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-md text-xs sm:text-sm font-[family-name:var(--font-geist-mono)] tracking-wider bg-slate-700/40"
                      variants={stepVariants} initial="hidden" animate="visible" transition={{ delay: i * 0.2, type: 'spring', stiffness: 120 }}
                    >
                      <RawDataIcon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 flex-shrink-0" />
                      <div className="flex-grow">
                        <span className="text-slate-300">{dataPoint.name}</span>
                        <span className="text-slate-500 text-xs block">({dataPoint.insight})</span>
              </div>
                    </motion.div>
                  )) || []
                )}
              </div>
              
              <p className="text-xs text-slate-400 mb-2 sm:mb-3 min-h-[2.5em] sm:min-h-[3.5em] leading-relaxed font-[family-name:var(--font-geist-mono)]">{currentStageData.description}</p>
              
              {showInsights && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-center p-2 bg-cyan-600/20 border border-cyan-500/50 rounded-md">
                  <p className="text-cyan-300 font-semibold text-xs sm:text-sm font-[family-name:var(--font-geist-mono)] tracking-wider">
                    Business Value Increase: <span className="text-sm sm:text-lg">~{businessScenariosData[activeScenario].after.valueGain}%</span>
                  </p>
                  <p className="text-xs text-cyan-400 font-[family-name:var(--font-geist-mono)]">From better decisions, faster!</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6">
        <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-1 sm:mb-1.5 text-center lg:text-left font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">2. Transform Your Data:</p>
        <button onClick={() => setShowInsights(!showInsights)} 
          className={`w-full font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-[family-name:var(--font-geist-mono)] tracking-wider uppercase
                      ${showInsights ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white'}`}>
          {showInsights ? 'View Raw Data Again' : 'Generate Smart Insights!'}
        </button>
      </div>
    </motion.div>
  );
};

// Interactive Business Performance Predictor
const BusinessPerformancePredictor = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000);
  const [dataQuality, setDataQuality] = useState(60);
  const [decisionSpeed, setDecisionSpeed] = useState(40);
  const [analyticsMaturity, setAnalyticsMaturity] = useState(30);

  const currentDecisionValue = monthlyRevenue * 0.12; // 12% of revenue at risk with poor decisions
  const improvedDecisionAccuracy = (dataQuality + analyticsMaturity) / 2;
  const improvedDecisionSpeed = decisionSpeed * (1 + analyticsMaturity / 100);
  
  const monthlyGain = (improvedDecisionAccuracy / 100) * currentDecisionValue;
  const speedBenefit = (improvedDecisionSpeed / 100) * monthlyRevenue * 0.05; // 5% revenue impact from faster decisions
  const totalMonthlyGain = monthlyGain + speedBenefit;
  const yearlyGain = totalMonthlyGain * 12;

  return (
    <motion.div 
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-cyan-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
        Business Performance Predictor
      </h3>
      <p className="text-xs sm:text-sm text-cyan-300 mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider">
        See how better analytics improves your business outcomes
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Input Section */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Monthly Revenue: ${monthlyRevenue.toLocaleString()}
            </label>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Data Quality Score: {dataQuality}%
            </label>
            <input
              type="range"
              min="20"
              max="95"
              step="5"
              value={dataQuality}
              onChange={(e) => setDataQuality(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Decision Speed: {decisionSpeed}% faster
            </label>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={decisionSpeed}
              onChange={(e) => setDecisionSpeed(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Analytics Sophistication: {analyticsMaturity}%
            </label>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={analyticsMaturity}
              onChange={(e) => setAnalyticsMaturity(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-slate-900/50 p-4 sm:p-6 rounded-xl border border-cyan-700/30">
          <h4 className="text-lg sm:text-xl font-bold text-cyan-400 mb-4 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Your Analytics Impact
          </h4>
          
          <div className="space-y-4">
            <motion.div 
              className="text-center p-3 bg-cyan-600/20 border border-cyan-500/50 rounded-md"
              key={improvedDecisionAccuracy}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-cyan-300 font-semibold text-sm font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                Decision Accuracy
              </p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                {improvedDecisionAccuracy.toFixed(0)}%
              </p>
              <p className="text-cyan-200 text-xs">
                Better data = smarter choices
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-3 bg-green-600/20 border border-green-500/50 rounded-md"
              key={totalMonthlyGain}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <p className="text-green-300 font-semibold text-sm font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                Monthly Value Gain
              </p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                ${totalMonthlyGain.toLocaleString()}
              </p>
              <p className="text-green-200 text-xs">
                From better & faster decisions
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
                Annual Impact
              </p>
              <p className="text-white text-xl sm:text-2xl font-bold">
                ${yearlyGain.toLocaleString()}
              </p>
              <p className="text-yellow-200 text-xs font-[family-name:var(--font-geist-mono)]">
                Compounding business value
              </p>
            </motion.div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400 font-[family-name:var(--font-geist-mono)]">
              *Based on decision impact research
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AnalyticsBenefits = () => (
  <div className="bg-gradient-to-b from-slate-800/60 to-slate-900/70 rounded-2xl p-4 sm:p-8 md:p-12 my-8 sm:my-16 md:my-20 shadow-xl border border-cyan-700/30">
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Why Analytics Changes Everything</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {[ 
         { 
           title: "See Hidden Patterns", 
           text: "Discover trends and opportunities invisible to the naked eye.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
             </svg>
           )
         },
         { 
           title: "Predict The Future", 
           text: "Know what&apos;s coming before it happens and prepare accordingly.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
             </svg>
           )
         },
         { 
           title: "Make Confident Decisions", 
           text: "Stop guessing. Every choice backed by solid data and evidence.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
             </svg>
           )
         }
      ].map((benefit, index) => (
        <motion.div 
          key={benefit.title} 
          className="bg-slate-700/40 p-4 sm:p-6 rounded-lg border border-slate-600/50 hover:border-cyan-500/60 transition-colors duration-300 text-center" 
          initial={{opacity:0, y:15}} 
          whileInView={{opacity:1, y:0}} 
          transition={{duration:0.5, delay:0.1 + index * 0.1}} 
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-3 sm:mb-4">
            {benefit.icon}
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-cyan-400 mb-1.5 sm:mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">{benefit.title}</h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">{benefit.text}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default function BusinessAnalyticsPage() {
  return (
    <ThemedInnerPageLayout themeColor="cyan">
      <PageHeroTitle titleLine1="Business" titleLine2="Analytics" />
      
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 pt-12 sm:pt-20 md:pt-28 pb-8 sm:pb-16">
        <motion.div className="text-center mb-20 sm:mb-28 md:mb-36" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Stop Flying Blind,<br className="sm:hidden" /> Start Seeing Clear.
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-[family-name:var(--font-geist-mono)]">
            Transform scattered data points into crystal-clear insights that drive real business results. See patterns, predict outcomes, and make decisions with absolute confidence.
          </p>
        </motion.div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <DataInsightsDiscoveryDemo />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-12 sm:mb-16 md:mb-20">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Your Data is Worth More Than You Think
          </h3>
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">
              Every business generates data, but most companies can&apos;t turn it into actionable insights. You&apos;re sitting on a goldmine of information that could transform your operations, boost profits, and predict future trends.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-cyan-300 leading-relaxed font-[family-name:var(--font-geist-mono)] font-semibold">
              Calculate the real business impact of turning your data into a competitive advantage.
            </p>
          </div>
              </motion.div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <BusinessPerformancePredictor />
            </div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <AnalyticsBenefits />
            </div>

        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Ready to Unlock Your Data&apos;s Potential?</h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact?subject=Business%20Analytics%20Strategy" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-300 shadow-md hover:shadow-lg font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Discover Your Data Value
              </Link>
            <Link href="/services" className="border border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-300 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Explore All Services
              </Link>
          </div>
        </motion.div>
      </div>
    </ThemedInnerPageLayout>
  );
} 