"use client";

import React, { useState } from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../../components/PageHeroTitle';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Icons
const RankingUpIcon = ({ className = "w-6 h-6 text-green-500" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

const RankingDownIcon = ({ className = "w-6 h-6 text-red-500" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.511l-5.511-3.182" />
  </svg>
);

const TrafficIcon = ({ className = "w-6 h-6 text-blue-400" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

// SEO Factors that affect ranking
const seoFactors = {
  pageSpeed: { 
    label: "Page Speed", 
    description: "How fast your website loads",
    impact: { low: 0.8, high: 1.4 },
    tips: ["Optimize images", "Use a CDN", "Minimize code"]
  },
  mobileOptimization: { 
    label: "Mobile-Friendly", 
    description: "How well your site works on mobile",
    impact: { low: 0.7, high: 1.6 },
    tips: ["Responsive design", "Fast mobile loading", "Touch-friendly interface"]
  },
  contentQuality: { 
    label: "Content Quality", 
    description: "How valuable your content is to users",
    impact: { low: 0.6, high: 1.8 },
    tips: ["Original insights", "Answer user questions", "Regular updates"]
  },
  keywordOptimization: { 
    label: "Keyword Usage", 
    description: "How well you target relevant keywords",
    impact: { low: 0.9, high: 1.3 },
    tips: ["Natural keyword placement", "Long-tail keywords", "User intent focus"]
  },
  backlinks: { 
    label: "Quality Backlinks", 
    description: "Links from other reputable websites",
    impact: { low: 0.5, high: 2.0 },
    tips: ["Guest posting", "Industry partnerships", "Create link-worthy content"]
  },
  userExperience: { 
    label: "User Experience", 
    description: "How easy and pleasant your site is to use",
    impact: { low: 0.8, high: 1.5 },
    tips: ["Clear navigation", "Fast interactions", "Intuitive design"]
  }
};

type FactorKey = keyof typeof seoFactors;

const SEORankingSimulator = () => {
  const [factorScores, setFactorScores] = useState<Record<FactorKey, number>>({
    pageSpeed: 40,
    mobileOptimization: 35,
    contentQuality: 30,
    keywordOptimization: 45,
    backlinks: 25,
    userExperience: 40
  });

  const [selectedFactor, setSelectedFactor] = useState<FactorKey>('contentQuality');

  // Calculate overall SEO score and ranking
  const calculateRanking = () => {
    let totalImpact = 0;
    let weightSum = 0;

    Object.entries(factorScores).forEach(([key, score]) => {
      const factor = seoFactors[key as FactorKey];
      const normalizedScore = score / 100; // Convert to 0-1
      const impact = factor.impact.low + (normalizedScore * (factor.impact.high - factor.impact.low));
      totalImpact += impact;
      weightSum += 1;
    });

    const averageImpact = totalImpact / weightSum;
    const ranking = Math.max(1, Math.round(21 - (averageImpact * 15))); // Scale to 1-20
    const seoScore = Math.round(averageImpact * 60); // Scale to 0-100
    
    return { ranking, seoScore };
  };

  const { ranking, seoScore } = calculateRanking();

  // Calculate traffic estimates based on ranking
  const getTrafficEstimate = (rank: number) => {
    const baseTraffic = 10000; // Base monthly searches for keyword
    const ctrRates = [0.316, 0.158, 0.102, 0.073, 0.053, 0.040, 0.031, 0.024, 0.019, 0.015]; // CTR by position
    const ctr = ctrRates[Math.min(rank - 1, 9)] || 0.01;
    return Math.round(baseTraffic * ctr);
  };

  const monthlyTraffic = getTrafficEstimate(ranking);
  const revenueEstimate = monthlyTraffic * 2.50; // $2.50 average value per visitor

  return (
    <motion.div 
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">SEO Ranking Simulator</h3>
      <p className="text-xs sm:text-sm text-blue-300 mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider">Adjust SEO factors to see how they impact your search ranking and traffic.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Controls */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <p className="text-sm font-semibold text-slate-300 mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">SEO Factors:</p>
            <div className="space-y-3">
              {(Object.keys(seoFactors) as FactorKey[]).map((key) => (
                <div key={key} className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${selectedFactor === key ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 bg-slate-700/40 hover:border-slate-500'}`}
                     onClick={() => setSelectedFactor(key)}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-white font-[family-name:var(--font-geist-mono)]">{seoFactors[key].label}</span>
                    <span className="text-xs text-blue-300 font-bold">{factorScores[key]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={factorScores[key]}
                    onChange={(e) => setFactorScores(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <p className="text-xs text-slate-400 mt-1 font-[family-name:var(--font-geist-mono)]">{seoFactors[key].description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Factor Tips */}
          <div className="p-4 bg-slate-900/50 rounded-lg border border-blue-700/30">
            <h4 className="text-sm font-semibold text-blue-400 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              How to Improve: {seoFactors[selectedFactor].label}
            </h4>
            <ul className="space-y-1">
              {seoFactors[selectedFactor].tips.map((tip, index) => (
                <li key={index} className="text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* Current Ranking */}
          <div className="bg-slate-900/50 p-4 sm:p-6 rounded-xl border border-slate-700">
            <h4 className="text-lg sm:text-xl font-bold text-blue-400 mb-4 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Your Search Results
            </h4>
            
            {/* SERP Simulation */}
            <div className="bg-white rounded-lg p-4 mb-4 text-black">
              <div className="text-xs text-gray-600 mb-2">About 2,450,000 results (0.48 seconds)</div>
              
              {/* Search Results */}
              <div className="space-y-3">
                {Array.from({ length: Math.min(ranking + 2, 10) }, (_, i) => {
                  const position = i + 1;
                  const isYourSite = position === ranking;
                  
    return (
      <motion.div 
                      key={i}
                      className={`p-2 rounded ${isYourSite ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
      >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold ${isYourSite ? 'text-blue-600' : 'text-gray-500'}`}>#{position}</span>
                        <h5 className={`text-sm font-semibold ${isYourSite ? 'text-blue-800' : 'text-gray-800'}`}>
                          {isYourSite ? 'Your Website' : `Competitor ${position}`}
                        </h5>
                        {isYourSite && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">YOU</span>}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {isYourSite ? 'Your optimized page with great content and SEO...' : `Competitor ${position} description...`}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div 
                className="text-center p-3 bg-slate-700/40 rounded-md"
                key={ranking}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {ranking <= 3 ? <RankingUpIcon className="w-4 h-4" /> : <RankingDownIcon className="w-4 h-4" />}
                  <p className="text-slate-300 font-semibold text-xs font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                    Search Ranking
                  </p>
                </div>
                <p className={`text-white text-lg sm:text-xl font-bold ${ranking <= 3 ? 'text-green-400' : ranking <= 10 ? 'text-yellow-400' : 'text-red-400'}`}>
                  #{ranking}
                </p>
                <p className="text-slate-400 text-xs">
                  Page {Math.ceil(ranking / 10)}
                </p>
              </motion.div>

              <motion.div 
                className="text-center p-3 bg-slate-700/40 rounded-md"
                key={seoScore}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrafficIcon className="w-4 h-4" />
                  <p className="text-slate-300 font-semibold text-xs font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
                    SEO Score
                  </p>
                </div>
                <p className={`text-white text-lg sm:text-xl font-bold ${seoScore >= 70 ? 'text-green-400' : seoScore >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {seoScore}/100
                </p>
                <p className="text-slate-400 text-xs">
                  {seoScore >= 70 ? 'Excellent' : seoScore >= 40 ? 'Good' : 'Needs Work'}
                </p>
              </motion.div>
            </div>

            {/* Traffic & Revenue Estimates */}
            <div className="mt-4 p-3 bg-blue-600/20 border border-blue-500/50 rounded-md">
              <p className="text-blue-300 font-semibold text-xs font-[family-name:var(--font-geist-mono)] tracking-wider uppercase text-center mb-2">
                Monthly Traffic Impact
              </p>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div>
                  <p className="text-white text-sm font-bold">{monthlyTraffic.toLocaleString()}</p>
                  <p className="text-blue-200 text-xs">Monthly Visitors</p>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">${revenueEstimate.toLocaleString()}</p>
                  <p className="text-blue-200 text-xs">Potential Revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-slate-400 font-[family-name:var(--font-geist-mono)]">
          *Estimates based on industry averages and search behavior data
        </p>
      </div>
      </motion.div>
    );
};

// Keyword Difficulty Analyzer
const keywordData = [
  { keyword: "coffee shop near me", difficulty: 25, searches: 18000, opportunity: "High" },
  { keyword: "best coffee beans", difficulty: 65, searches: 12000, opportunity: "Medium" },
  { keyword: "coffee", difficulty: 95, searches: 450000, opportunity: "Low" },
  { keyword: "organic coffee beans", difficulty: 45, searches: 8500, opportunity: "High" },
  { keyword: "coffee brewing guide", difficulty: 35, searches: 6200, opportunity: "High" },
  { keyword: "espresso machine reviews", difficulty: 55, searches: 9800, opportunity: "Medium" },
];

const KeywordOpportunityExplorer = () => {
  const [selectedKeyword, setSelectedKeyword] = useState(keywordData[0]);

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return "text-green-400";
    if (difficulty <= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getOpportunityColor = (opportunity: string) => {
    if (opportunity === "High") return "text-green-400";
    if (opportunity === "Medium") return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <motion.div 
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
        Keyword Opportunity Explorer
      </h3>
      <p className="text-xs sm:text-sm text-blue-300 mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider">
        Discover which keywords offer the best ranking opportunities for your business
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Keyword List */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-300 mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Keywords to Explore:</p>
          {keywordData.map((keyword, index) => (
            <button 
              key={index}
              onClick={() => setSelectedKeyword(keyword)}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 font-[family-name:var(--font-geist-mono)] tracking-wider
                          ${selectedKeyword.keyword === keyword.keyword ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 bg-slate-700/40 hover:border-slate-500'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-white">&quot;{keyword.keyword}&quot;</span>
                <span className={`text-xs font-bold ${getOpportunityColor(keyword.opportunity)}`}>{keyword.opportunity}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-slate-400">
                  Difficulty: <span className={getDifficultyColor(keyword.difficulty)}>{keyword.difficulty}%</span>
                </div>
                <div className="text-slate-400">
                  Searches: <span className="text-blue-300">{keyword.searches.toLocaleString()}/mo</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Keyword Analysis */}
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
          <h4 className="text-lg font-bold text-blue-400 mb-4 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Keyword Analysis
          </h4>
          
          <motion.div 
            key={selectedKeyword.keyword}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="text-center p-3 bg-slate-700/40 rounded-md">
              <p className="text-white text-lg font-bold mb-1">&quot;{selectedKeyword.keyword}&quot;</p>
              <p className="text-slate-400 text-xs">Target Keyword</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-700/40 rounded">
                <p className={`font-bold text-sm ${getDifficultyColor(selectedKeyword.difficulty)}`}>
                  {selectedKeyword.difficulty}%
                </p>
                <p className="text-slate-400 text-xs">Difficulty</p>
              </div>
              <div className="p-3 bg-slate-700/40 rounded">
                <p className="text-blue-300 font-bold text-sm">
                  {selectedKeyword.searches.toLocaleString()}
                </p>
                <p className="text-slate-400 text-xs">Monthly Searches</p>
              </div>
              <div className="p-3 bg-slate-700/40 rounded">
                <p className={`font-bold text-sm ${getOpportunityColor(selectedKeyword.opportunity)}`}>
                  {selectedKeyword.opportunity}
                </p>
                <p className="text-slate-400 text-xs">Opportunity</p>
              </div>
            </div>

            <div className="p-3 bg-blue-600/20 border border-blue-500/50 rounded-md">
              <p className="text-blue-300 font-semibold text-xs font-[family-name:var(--font-geist-mono)] tracking-wider uppercase mb-2">
                Strategy Recommendation:
              </p>
              <p className="text-white text-sm">
                {selectedKeyword.difficulty <= 30 ? 
                  "Low competition! Focus content creation here for quick wins." :
                  selectedKeyword.difficulty <= 60 ?
                  "Moderate difficulty. Build authority with quality content and backlinks." :
                  "High competition. Consider long-tail variations and niche targeting."
                }
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-slate-400 font-[family-name:var(--font-geist-mono)]">
                Estimated traffic at #1 ranking: {Math.round(selectedKeyword.searches * 0.316).toLocaleString()} visitors/month
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const SEOBenefits = () => (
  <div className="bg-gradient-to-b from-slate-800/60 to-slate-900/70 rounded-2xl p-4 sm:p-8 md:p-12 my-8 sm:my-16 md:my-20 shadow-xl border border-blue-700/30">
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Why SEO Drives Long-Term Success</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {[ 
         { 
           title: "Compound Growth", 
           text: "SEO builds momentum. Each optimized page strengthens your entire site.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
             </svg>
           )
         },
         { 
           title: "Cost-Effective", 
           text: "Organic traffic costs 10x less than paid ads and lasts forever.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
           )
         },
         { 
           title: "Trust & Authority", 
           text: "High rankings signal credibility. Customers trust organic results more.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
             </svg>
           )
         },
         { 
           title: "Predictable Growth", 
           text: "Stop guessing what works. SEO gives you a clear path to more customers.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
             </svg>
           )
         },
         { 
           title: "Long-Term Value", 
           text: "Unlike ads, SEO compounds over time. Today&apos;s work pays dividends for years.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.467-.22-2.121-.659-1.172-.879-1.172-2.303 0-3.182C10.536 7.78 11.268 7.56 12 7.56c.732 0 1.464.22 2.121.659l.879.659" />
             </svg>
           )
         },
         { 
           title: "24/7 Lead Generation", 
           text: "Your website works while you sleep, bringing in qualified leads around the clock.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
           )
         }
      ].map((benefit, index) => (
        <motion.div 
          key={benefit.title} 
          className="bg-slate-700/40 p-4 sm:p-6 rounded-lg border border-slate-600/50 hover:border-blue-500/60 transition-colors duration-300 text-center" 
          initial={{opacity:0, y:15}} 
          whileInView={{opacity:1, y:0}} 
          transition={{duration:0.5, delay:0.1 + index * 0.1}} 
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-3 sm:mb-4">
            {benefit.icon}
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-blue-400 mb-1.5 sm:mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">{benefit.title}</h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">{benefit.text}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default function SEOServicesPage() {
  return (
    <ThemedInnerPageLayout themeColor="blue">
      <PageHeroTitle titleLine1="SEO + GEO" titleLine2="Services" />
      
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 pt-12 sm:pt-20 md:pt-28 pb-8 sm:pb-16">
        <motion.div className="text-center mb-20 sm:mb-28 md:mb-36" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Win SEO today. Own GEO tomorrow.
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-[family-name:var(--font-geist-mono)]">
            AI is changing search. Google’s AI Overviews (GEO) surface brand entities and authoritative answers. We engineer your site for classic SEO rankings and optimize your entity footprint so you show up inside AI Overviews, local, and everywhere people search.
          </p>
        </motion.div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <SEORankingSimulator />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-12 sm:mb-16 md:mb-20">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            What is GEO and why it matters
          </h3>
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">
              GEO (Google AI Overviews) is Google’s AI-generated summary that sits above traditional results. It favors strong entities, structured data, citation-worthy content, and real-world signals.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-green-300 leading-relaxed font-[family-name:var(--font-geist-mono)] font-semibold">
              If AI is the future, GEO is the front door. Get your brand listed in the answer.
            </p>
          </div>
        </motion.div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <KeywordOpportunityExplorer />
        </div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <SEOBenefits />
        </div>

        {/* GEO vs SEO section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-10 border border-blue-700/30 mb-24 sm:mb-32 md:mb-40">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">GEO vs SEO — We dominate both</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-slate-900/40 border border-slate-700 rounded-xl p-4 sm:p-6">
              <h4 className="text-lg sm:text-xl font-bold text-blue-400 mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">SEO (Classic Rankings)</h4>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
                <li>Technical audits, Core Web Vitals, crawl & index optimization</li>
                <li>Keyword research, on-page optimization, internal linking</li>
                <li>Content strategy and authority building with quality backlinks</li>
                <li>Local SEO for maps, reviews, and proximity signals</li>
              </ul>
            </div>
            <div className="bg-slate-900/40 border border-slate-700 rounded-xl p-4 sm:p-6">
              <h4 className="text-lg sm:text-xl font-bold text-green-400 mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">GEO (AI Overviews)</h4>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
                <li>Entity optimization: schema, knowledge graph, brand mentions</li>
                <li>Answer-engine content tuned for citations and summaries</li>
                <li>E-E-A-T signals: authorship, sources, proofs, and freshness</li>
                <li>Data structuring for AI retrieval and snippet eligibility</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto font-[family-name:var(--font-geist-mono)]">
              You shouldn’t have to choose. We engineer your site to rank in traditional results and to be referenced inside AI Overviews. More visibility. More clicks. More customers.
            </p>
          </div>
        </motion.div>

        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Ready to Dominate Search Results?</h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact?subject=SEO%20%2B%20GEO%20Strategy%20Consultation" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-300 shadow-md hover:shadow-lg font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Get SEO + GEO Plan
            </Link>
            <Link href="/services" className="border border-blue-500 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-300 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Explore All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </ThemedInnerPageLayout>
  );
} 