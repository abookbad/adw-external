"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../../components/PageHeroTitle';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WebDesignPage() {
  return (
    <ThemedInnerPageLayout>
      <PageHeroTitle titleLine1="Web" titleLine2="Design" />
      <div className="w-full max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-16">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stunning, Responsive Websites</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Create beautiful, user-centric websites that convert visitors into customers with our modern design approach.
          </p>
        </motion.div>
        <motion.div className="grid md:grid-cols-2 gap-8 mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Design Excellence</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Modern, responsive layouts</li>
              <li>• Brand identity integration</li>
              <li>• User experience optimization</li>
              <li>• Mobile-first approach</li>
            </ul>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Performance Focus</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Lightning-fast loading</li>
              <li>• SEO optimization</li>
              <li>• Conversion optimization</li>
              <li>• Cross-browser compatibility</li>
            </ul>
          </div>
        </motion.div>
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-orange-700 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">Start Your Project</Link>
            <Link href="/services" className="border border-orange-500 hover:bg-orange-500/10 text-orange-400 hover:text-orange-300 font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">View All Services</Link>
          </div>
        </motion.div>
      </div>
    </ThemedInnerPageLayout>
  );
} 