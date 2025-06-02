"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../../components/PageHeroTitle';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SEOServicesPage() {
  return (
    <ThemedInnerPageLayout>
      <PageHeroTitle titleLine1="SEO" titleLine2="Services" />

      <div className="w-full max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-16">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Dominate Search Rankings with Data-Driven SEO
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Boost your organic traffic and search rankings with our comprehensive SEO strategies. 
            From keyword research to technical optimization, we&apos;ll help your business get found online.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-green-400 mb-4">On-Page SEO</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Keyword research & optimization</li>
              <li>• Content optimization</li>
              <li>• Meta tags & descriptions</li>
              <li>• Internal linking strategy</li>
            </ul>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Technical SEO</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Site speed optimization</li>
              <li>• Mobile responsiveness</li>
              <li>• Schema markup</li>
              <li>• Core Web Vitals improvement</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-2xl p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white mb-6 text-center">SEO Results That Matter</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">250%</div>
              <p className="text-gray-300">Average organic traffic increase</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">Top 3</div>
              <p className="text-gray-300">Rankings for target keywords</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">60%</div>
              <p className="text-gray-300">Increase in qualified leads</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Ready to Rank Higher in Search Results?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              Get SEO Audit
            </Link>
            <Link 
              href="/services"
              className="border border-green-500 hover:bg-green-500/10 text-green-400 hover:text-green-300 font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              View All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </ThemedInnerPageLayout>
  );
} 