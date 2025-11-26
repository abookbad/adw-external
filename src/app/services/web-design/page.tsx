"use client";

import React, { useState, useEffect } from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../../components/PageHeroTitle';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Icons
const EyeIcon = ({ className = "w-6 h-6 text-orange-400" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ClickIcon = ({ className = "w-6 h-6 text-red-400" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
  </svg>
);

// Website Heatmap Simulator Data
const websiteLayouts = {
  bad: {
    label: "Outdated Design",
    description: "Cluttered layout, poor navigation, weak call-to-actions",
    conversionRate: 1.2,
    heatmapZones: [
      { id: 'header', x: 10, y: 10, width: 80, height: 15, intensity: 30, type: 'view' },
      { id: 'nav', x: 10, y: 25, width: 80, height: 8, intensity: 15, type: 'view' },
      { id: 'content', x: 10, y: 35, width: 60, height: 40, intensity: 45, type: 'view' },
      { id: 'sidebar', x: 70, y: 35, width: 20, height: 40, intensity: 8, type: 'view' },
      { id: 'cta', x: 75, y: 75, width: 15, height: 8, intensity: 12, type: 'click' },
      { id: 'footer', x: 10, y: 85, width: 80, height: 10, intensity: 5, type: 'view' },
    ],
    userBehavior: {
      avgTimeOnSite: "23 seconds",
      bounceRate: "78%",
      ctaClicks: "1.2%",
      scrollDepth: "32%"
    }
  },
  good: {
    label: "Modern Design",
    description: "Clean layout, intuitive navigation, compelling call-to-actions",
    conversionRate: 5.8,
    heatmapZones: [
      { id: 'header', x: 10, y: 10, width: 80, height: 15, intensity: 85, type: 'view' },
      { id: 'nav', x: 10, y: 25, width: 80, height: 8, intensity: 70, type: 'view' },
      { id: 'hero', x: 10, y: 35, width: 80, height: 25, intensity: 95, type: 'view' },
      { id: 'content', x: 10, y: 60, width: 80, height: 30, intensity: 80, type: 'view' },
      { id: 'cta', x: 35, y: 45, width: 30, height: 10, intensity: 88, type: 'click' },
      { id: 'footer', x: 10, y: 90, width: 80, height: 8, intensity: 25, type: 'view' },
    ],
    userBehavior: {
      avgTimeOnSite: "3m 42s",
      bounceRate: "34%",
      ctaClicks: "5.8%",
      scrollDepth: "78%"
    }
  }
};

type LayoutKey = keyof typeof websiteLayouts;

const WebsiteHeatmapSimulator = () => {
  const [activeLayout, setActiveLayout] = useState<LayoutKey>('bad');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [animatedZones, setAnimatedZones] = useState<string[]>([]);

  const currentLayout = websiteLayouts[activeLayout];

  useEffect(() => {
    if (showHeatmap) {
      setAnimatedZones([]);
      const timer = setInterval(() => {
        setAnimatedZones(prev => {
          const nextIndex = prev.length;
          if (nextIndex < currentLayout.heatmapZones.length) {
            return [...prev, currentLayout.heatmapZones[nextIndex].id];
          }
          clearInterval(timer);
          return prev;
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [showHeatmap, activeLayout, currentLayout.heatmapZones]);

  const getHeatmapColor = (intensity: number, type: string) => {
    if (type === 'click') {
      if (intensity > 70) return 'bg-red-500/70';
      if (intensity > 40) return 'bg-red-400/60';
      if (intensity > 20) return 'bg-red-300/50';
      return 'bg-red-200/40';
    } else {
      if (intensity > 70) return 'bg-orange-500/70';
      if (intensity > 40) return 'bg-orange-400/60';
      if (intensity > 20) return 'bg-orange-300/50';
      return 'bg-orange-200/40';
    }
  };

  return (
    <motion.div 
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">User Behavior Heatmap Simulator</h3>
      <p className="text-xs sm:text-sm text-orange-300 mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider">See exactly where users look, click, and abandon your website.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Controls */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <p className="text-sm font-semibold text-slate-300 mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Choose Website Version:</p>
            <div className="space-y-2">
              {(Object.keys(websiteLayouts) as LayoutKey[]).map((key) => (
                <button key={key} onClick={() => { setActiveLayout(key); setShowHeatmap(false); setAnimatedZones([]); }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg font-[family-name:var(--font-geist-mono)] tracking-wider
                              ${activeLayout === key ? 'bg-orange-600 text-white ring-2 ring-orange-400' : 'bg-slate-700 hover:bg-slate-600/80 text-slate-200'}`}>
                  <div className="font-semibold">{websiteLayouts[key].label}</div>
                  <div className="text-xs opacity-80 mt-1">{websiteLayouts[key].description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <h4 className="text-sm font-semibold text-orange-400 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">User Behavior Metrics:</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-700/40 p-2 rounded">
                <div className="text-slate-400">Time on Site</div>
                <div className="text-white font-semibold">{currentLayout.userBehavior.avgTimeOnSite}</div>
              </div>
              <div className="bg-slate-700/40 p-2 rounded">
                <div className="text-slate-400">Bounce Rate</div>
                <div className="text-white font-semibold">{currentLayout.userBehavior.bounceRate}</div>
              </div>
              <div className="bg-slate-700/40 p-2 rounded">
                <div className="text-slate-400">CTA Clicks</div>
                <div className="text-white font-semibold">{currentLayout.userBehavior.ctaClicks}</div>
              </div>
              <div className="bg-slate-700/40 p-2 rounded">
                <div className="text-slate-400">Scroll Depth</div>
                <div className="text-white font-semibold">{currentLayout.userBehavior.scrollDepth}</div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => { setShowHeatmap(!showHeatmap); setAnimatedZones([]); }}
            className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-[family-name:var(--font-geist-mono)] tracking-wider uppercase
                        ${showHeatmap ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-orange-600 hover:bg-orange-700 text-white'}`}>
            {showHeatmap ? 'Hide Heatmap' : 'Show User Behavior!'}
          </button>
        </div>

        {/* Website Mockup with Heatmap */}
        <div className="bg-white rounded-lg shadow-xl p-4 relative overflow-hidden min-h-[400px] border-4 border-slate-300">
          <div className="absolute inset-0 bg-slate-50">
            {/* Website Layout Mockup */}
            <div className="relative w-full h-full">
              {/* Header */}
              <div className="absolute bg-slate-200 rounded" style={{left: '10%', top: '10%', width: '80%', height: '15%'}}></div>
              {/* Navigation */}
              <div className="absolute bg-slate-300 rounded" style={{left: '10%', top: '25%', width: '80%', height: '8%'}}></div>
              {/* Main Content Area */}
              {activeLayout === 'good' && (
                <div className="absolute bg-blue-100 rounded border-2 border-blue-300" style={{left: '10%', top: '35%', width: '80%', height: '25%'}}></div>
              )}
              <div className="absolute bg-slate-100 rounded" style={{left: '10%', top: activeLayout === 'good' ? '60%' : '35%', width: activeLayout === 'good' ? '80%' : '60%', height: activeLayout === 'good' ? '30%' : '40%'}}></div>
              {/* Sidebar (bad design only) */}
              {activeLayout === 'bad' && (
                <div className="absolute bg-slate-200 rounded" style={{left: '70%', top: '35%', width: '20%', height: '40%'}}></div>
              )}
              {/* CTA Button */}
              <div className={`absolute rounded ${activeLayout === 'good' ? 'bg-orange-400' : 'bg-gray-400'}`} 
                   style={{
                     left: activeLayout === 'good' ? '35%' : '75%', 
                     top: activeLayout === 'good' ? '45%' : '75%', 
                     width: activeLayout === 'good' ? '30%' : '15%', 
                     height: activeLayout === 'good' ? '10%' : '8%'
                   }}></div>
              {/* Footer */}
              <div className="absolute bg-slate-300 rounded" style={{left: '10%', top: activeLayout === 'good' ? '90%' : '85%', width: '80%', height: activeLayout === 'good' ? '8%' : '10%'}}></div>
            </div>

            {/* Heatmap Overlay */}
            {showHeatmap && (
              <div className="absolute inset-0 pointer-events-none">
                {currentLayout.heatmapZones.map((zone, index) => (
                  <motion.div
                    key={zone.id}
                    className={`absolute rounded-lg ${getHeatmapColor(zone.intensity, zone.type)} border border-opacity-30 ${zone.type === 'click' ? 'border-red-500' : 'border-orange-500'}`}
                    style={{
                      left: `${zone.x}%`,
                      top: `${zone.y}%`,
                      width: `${zone.width}%`,
                      height: `${zone.height}%`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: animatedZones.includes(zone.id) ? 1 : 0,
                      scale: animatedZones.includes(zone.id) ? 1 : 0.8
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
                      {zone.type === 'click' ? (
                        <ClickIcon className="w-4 h-4 text-red-500" />
                      ) : (
                        <EyeIcon className="w-4 h-4 text-orange-500" />
                      )}
                      <span className="text-xs font-bold text-slate-700">{zone.intensity}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showHeatmap && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-orange-700/30"
        >
          <div className="flex items-center gap-4 justify-center text-xs">
            <div className="flex items-center gap-2">
              <EyeIcon className="w-4 h-4 text-orange-400" />
              <span className="text-slate-300 font-[family-name:var(--font-geist-mono)]">User Views</span>
            </div>
            <div className="flex items-center gap-2">
              <ClickIcon className="w-4 h-4 text-red-400" />
              <span className="text-slate-300 font-[family-name:var(--font-geist-mono)]">User Clicks</span>
            </div>
            <div className="text-slate-400 font-[family-name:var(--font-geist-mono)]">
              Higher % = More Activity
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Design Psychology Explorer
type ColorVariant = {
  name: string;
  impact: string;
  emotion: string;
  color: string;
  textColor: string;
};

type LayoutVariant = {
  name: string;
  impact: string;
  emotion: string;
  pattern: string;
};

type SpacingVariant = {
  name: string;
  impact: string;
  emotion: string;
};

const psychologyPrinciples = {
  color: {
    title: "Color Psychology",
    description: "Colors trigger emotional responses that drive behavior",
    variants: [
      { 
        name: "Red CTA", 
        impact: "Creates urgency, increases clicks by 21%", 
        emotion: "Urgency, Action",
        color: "bg-red-500",
        textColor: "text-white"
      },
      { 
        name: "Green CTA", 
        impact: "Suggests safety, increases trust by 15%", 
        emotion: "Trust, Growth",
        color: "bg-green-500",
        textColor: "text-white"
      },
      { 
        name: "Blue CTA", 
        impact: "Conveys reliability, reduces bounce by 12%", 
        emotion: "Trust, Calm",
        color: "bg-blue-500",
        textColor: "text-white"
      },
      { 
        name: "Orange CTA", 
        impact: "Balances urgency & friendliness, +18% conversions", 
        emotion: "Enthusiasm, Confidence",
        color: "bg-orange-500",
        textColor: "text-white"
      }
    ] as ColorVariant[]
  },
  layout: {
    title: "Layout & Visual Hierarchy",
    description: "How you arrange elements controls user attention",
    variants: [
      { 
        name: "Z-Pattern Layout", 
        impact: "Natural reading flow, +25% engagement", 
        emotion: "Familiar, Easy",
        pattern: "Z-shaped visual flow"
      },
      { 
        name: "F-Pattern Layout", 
        impact: "Web-optimized scanning, +30% content consumption", 
        emotion: "Efficient, Scannable",
        pattern: "F-shaped eye movement"
      },
      { 
        name: "Center-Focused", 
        impact: "Direct attention, +40% CTA clicks", 
        emotion: "Focused, Clear",
        pattern: "Centered focal point"
      },
      { 
        name: "Asymmetrical", 
        impact: "Creates visual interest, +22% memorability", 
        emotion: "Modern, Dynamic",
        pattern: "Balanced asymmetry"
      }
    ] as LayoutVariant[]
  },
  spacing: {
    title: "White Space Psychology",
    description: "Space affects perception of value and comprehension",
    variants: [
      { 
        name: "Generous Spacing", 
        impact: "Perceived as premium, +20% perceived value", 
        emotion: "Luxury, Clarity"
      },
      { 
        name: "Tight Spacing", 
        impact: "Feels busy, -15% comprehension", 
        emotion: "Crowded, Cheap"
      },
      { 
        name: "Strategic Spacing", 
        impact: "Guides attention, +35% task completion", 
        emotion: "Organized, Professional"
      },
      { 
        name: "Minimal Spacing", 
        impact: "Information-dense, +10% data retention", 
        emotion: "Efficient, Compact"
      }
    ] as SpacingVariant[]
  }
};

type PrincipleKey = keyof typeof psychologyPrinciples;

const DesignPsychologyExplorer = () => {
  const [activePrinciple, setActivePrinciple] = useState<PrincipleKey>('color');
  const [activeVariant, setActiveVariant] = useState(0);

  const currentPrinciple = psychologyPrinciples[activePrinciple];
  const currentVariant = currentPrinciple.variants[activeVariant];

  return (
    <motion.div 
      className="bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-orange-700/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
        Design Psychology Explorer
      </h3>
      <p className="text-xs sm:text-sm text-orange-300 mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider">
        Discover how design choices trigger psychological responses
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Psychology Categories */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-300 mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Psychology Principles:</p>
          {(Object.keys(psychologyPrinciples) as PrincipleKey[]).map((key) => (
            <button
              key={key} 
              onClick={() => { setActivePrinciple(key); setActiveVariant(0); }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg font-[family-name:var(--font-geist-mono)] tracking-wider
                          ${activePrinciple === key ? 'bg-orange-600 text-white ring-2 ring-orange-400' : 'bg-slate-700 hover:bg-slate-600/80 text-slate-200'}`}
            >
              <div className="font-semibold">{psychologyPrinciples[key].title}</div>
              <div className="text-xs opacity-80 mt-1">{psychologyPrinciples[key].description}</div>
            </button>
          ))}
        </div>

        {/* Design Variants */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-300 mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Design Options:</p>
          {currentPrinciple.variants.map((variant, index) => (
            <button 
              key={index}
              onClick={() => setActiveVariant(index)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg font-[family-name:var(--font-geist-mono)] tracking-wider
                          ${activeVariant === index ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-slate-700 hover:bg-slate-600/80 text-slate-200'}`}
            >
              <div className="font-semibold">{variant.name}</div>
              <div className="text-xs opacity-80 mt-1">{variant.impact}</div>
            </button>
          ))}
        </div>

        {/* Psychology Impact */}
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
          <h4 className="text-lg font-bold text-orange-400 mb-4 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Psychological Impact
          </h4>
          
          <motion.div 
            key={`${activePrinciple}-${activeVariant}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Visual Demo */}
            {activePrinciple === 'color' && (
              <div className="text-center">
                <div className={`${(currentVariant as ColorVariant).color} ${(currentVariant as ColorVariant).textColor} px-6 py-3 rounded-lg font-bold inline-block shadow-lg`}>
                  Click Here Now!
                </div>
              </div>
            )}

            {activePrinciple === 'layout' && (
              <div className="bg-white p-4 rounded-lg">
                <div className="text-slate-700 text-sm font-semibold mb-2">Layout Pattern:</div>
                <div className="text-orange-600 text-xs">{(currentVariant as LayoutVariant).pattern}</div>
              </div>
            )}

            {activePrinciple === 'spacing' && (
              <div className="bg-white rounded-lg overflow-hidden">
                <div className={`p-${activeVariant === 0 ? '6' : activeVariant === 1 ? '1' : '4'} text-slate-700`}>
                  <div className="text-sm font-semibold">Sample Content</div>
                  <div className="text-xs mt-1">This demonstrates spacing impact</div>
                </div>
              </div>
            )}

            {/* Impact Stats */}
            <div className="space-y-3">
              <div className="bg-slate-700/40 p-3 rounded">
                <div className="text-slate-400 text-xs font-[family-name:var(--font-geist-mono)] uppercase">Emotional Response:</div>
                <div className="text-white font-semibold text-sm">{currentVariant.emotion}</div>
              </div>
              
              <div className="bg-green-600/20 border border-green-500/50 p-3 rounded">
                <div className="text-green-300 text-xs font-[family-name:var(--font-geist-mono)] uppercase">Business Impact:</div>
                <div className="text-white font-semibold text-sm">{currentVariant.impact}</div>
              </div>
            </div>

            <div className="text-center pt-2">
              <div className="text-xs text-slate-400 font-[family-name:var(--font-geist-mono)]">
                *Based on UX psychology research
              </div>
            </div>
            </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const WebDesignBenefits = () => (
  <div className="bg-gradient-to-b from-slate-800/60 to-slate-900/70 rounded-2xl p-4 sm:p-8 md:p-12 my-8 sm:my-16 md:my-20 shadow-xl border border-orange-700/30">
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Why Psychology-Driven Design Works</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {[ 
         { 
           title: "Subconscious Influence", 
           text: "Design shapes first impressions—and trust—within milliseconds.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-orange-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
             </svg>
           )
         },
         { 
           title: "Predictable Behavior", 
           text: "Design for how people scan and click to lift conversions.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-orange-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
             </svg>
           )
         },
         { 
           title: "Emotional Connection", 
           text: "Good design triggers emotion and backs it up with clarity.",
           icon: (
             <svg className="w-8 h-8 sm:w-12 sm:h-12 text-orange-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
             </svg>
           )
         }
      ].map((benefit, index) => (
        <motion.div 
          key={benefit.title} 
          className="bg-slate-700/40 p-4 sm:p-6 rounded-lg border border-slate-600/50 hover:border-orange-500/60 transition-colors duration-300 text-center" 
          initial={{opacity:0, y:15}} 
          whileInView={{opacity:1, y:0}} 
          transition={{duration:0.5, delay:0.1 + index * 0.1}} 
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-3 sm:mb-4">
            {benefit.icon}
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-orange-400 mb-1.5 sm:mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">{benefit.title}</h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">{benefit.text}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default function WebDesignPage() {
  return (
    <ThemedInnerPageLayout themeColor="orange">
      <PageHeroTitle titleLine1="Web" titleLine2="Design" />
      
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 pt-12 sm:pt-20 md:pt-28 pb-8 sm:pb-16">
        <motion.div className="text-center mb-20 sm:mb-28 md:mb-36" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            Your Website Controls<br className="sm:hidden" /> User Behavior.
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-[family-name:var(--font-geist-mono)]">
            Design choices drive action—let’s make them convert.
          </p>
        </motion.div>

        {/* SEO + GEO built-in section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mb-20 sm:mb-28 md:mb-36">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            SEO + GEO Built Into Every Site
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4 sm:p-6">
              <h4 className="text-orange-400 font-semibold text-base mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Technical SEO</h4>
              <ul className="text-slate-300 text-sm space-y-2 list-disc list-inside">
                <li>Fast, stable, indexable</li>
                <li>Clean structure</li>
                <li>Structured data</li>
              </ul>
            </div>
            <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4 sm:p-6">
              <h4 className="text-orange-400 font-semibold text-base mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">On‑Page + Local</h4>
              <ul className="text-slate-300 text-sm space-y-2 list-disc list-inside">
                <li>Strong content patterns</li>
                <li>Clear metadata</li>
                <li>Local signals</li>
              </ul>
            </div>
            <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4 sm:p-6">
              <h4 className="text-orange-400 font-semibold text-base mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">GEO (AI Overviews)</h4>
              <ul className="text-slate-300 text-sm space-y-2 list-disc list-inside">
                <li>Entity awareness</li>
                <li>Citation‑ready content</li>
                <li>AI‑friendly markup</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm sm:text-base text-slate-300 mt-6 max-w-3xl mx-auto font-[family-name:var(--font-geist-mono)]">
            Your site ships fast, structured, and ready to be discovered.
          </p>
        </motion.div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <WebsiteHeatmapSimulator />
        </div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-12 sm:mb-16 md:mb-20">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
            The Science Behind User Behavior
          </h3>
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-[family-name:var(--font-geist-mono)]">
              Design isn&apos;t just about looking good. It&apos;s about understanding how the human brain processes visual information and using that knowledge to guide user actions.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-orange-300 leading-relaxed font-[family-name:var(--font-geist-mono)] font-semibold">
              Explore how specific design choices trigger psychological responses that drive conversions.
            </p>
          </div>
        </motion.div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <DesignPsychologyExplorer />
        </div>

        <div className="mb-24 sm:mb-32 md:mb-40">
          <WebDesignBenefits />
        </div>

        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Ready for Psychology-Driven Design?</h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact?subject=Psychology-Based%20Website%20Design" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-300 shadow-md hover:shadow-lg font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Start Your Redesign
            </Link>
            <Link href="/services" className="border border-orange-500 hover:bg-orange-500/10 text-orange-400 hover:text-orange-300 font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-300 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Explore All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </ThemedInnerPageLayout>
  );
} 