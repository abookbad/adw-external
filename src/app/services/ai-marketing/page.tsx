"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../../components/PageHeroTitle';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AIMarketingPage() {
  return (
    <ThemedInnerPageLayout>
      <PageHeroTitle titleLine1="AI" titleLine2="Marketing" />

      <div className="w-full max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Proprietary AI Ad Optimizer
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Maximize your ad spend ROI with our exclusive AI Ad Optimizer that dynamically adjusts 
            campaigns in real-time for peak performance and conversions.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Real-Time Optimization</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Dynamic bid adjustments</li>
              <li>• Audience targeting refinement</li>
              <li>• Ad creative testing</li>
              <li>• Budget redistribution</li>
            </ul>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Performance Analytics</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Advanced conversion tracking</li>
              <li>• Predictive modeling</li>
              <li>• ROI optimization</li>
              <li>• Multi-platform insights</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white mb-6 text-center">AI Marketing Results</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">400%</div>
              <p className="text-gray-300">Increase in ROAS</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">65%</div>
              <p className="text-gray-300">Reduction in cost per acquisition</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-violet-400 mb-2">24/7</div>
              <p className="text-gray-300">Automated optimization</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Ready to Supercharge Your Ad Performance?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              Start Optimizing
            </Link>
            <Link 
              href="/services"
              className="border border-purple-500 hover:bg-purple-500/10 text-purple-400 hover:text-purple-300 font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              View All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </ThemedInnerPageLayout>
  );
} 