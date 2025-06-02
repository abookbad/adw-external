"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../../components/PageHeroTitle';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BusinessAutomationPage() {
  return (
    <ThemedInnerPageLayout>
      <PageHeroTitle titleLine1="Business" titleLine2="Automation" />
      <div className="w-full max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-16">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Streamline Your Operations</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Automate repetitive tasks and optimize workflows to increase efficiency and reduce costs.
          </p>
        </motion.div>
        <motion.div className="grid md:grid-cols-2 gap-8 mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">Workflow Automation</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Process optimization</li>
              <li>• Task automation</li>
              <li>• Integration solutions</li>
              <li>• Custom workflows</li>
            </ul>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">System Integration</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• API development</li>
              <li>• Database synchronization</li>
              <li>• Third-party integrations</li>
              <li>• Legacy system modernization</li>
            </ul>
          </div>
        </motion.div>
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">Automate Your Business</Link>
            <Link href="/services" className="border border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">View All Services</Link>
          </div>
        </motion.div>
      </div>
    </ThemedInnerPageLayout>
  );
} 