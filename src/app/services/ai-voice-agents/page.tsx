"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../../components/PageHeroTitle';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AIVoiceAgentsPage() {
  return (
    <ThemedInnerPageLayout>
      <PageHeroTitle titleLine1="AI Voice" titleLine2="Agents" />

      {/* Service Detail Content */}
      <div className="w-full max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-16">
        
        {/* Service Overview */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            24/7 AI-Powered Customer Engagement
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transform your customer service and sales with intelligent AI voice and text agents that work around the clock, 
            providing instant responses, qualifying leads, and scheduling appointments automatically.
          </p>
        </motion.div>

        {/* Key Features */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Inbound Support</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• 24/7 customer service automation</li>
              <li>• Instant query resolution</li>
              <li>• Smart call routing</li>
              <li>• Multi-language support</li>
            </ul>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Outbound Sales</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Automated lead qualification</li>
              <li>• Appointment setting</li>
              <li>• Follow-up campaigns</li>
              <li>• Sales pipeline management</li>
            </ul>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-2xl p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white mb-6 text-center">Why Choose AI Voice Agents?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">90%</div>
              <p className="text-gray-300">Reduction in response time</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
              <p className="text-gray-300">Always available service</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-400 mb-2">300%</div>
              <p className="text-gray-300">Increase in lead qualification</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Ready to Transform Your Customer Engagement?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              Get Started Today
            </Link>
            <Link 
              href="/services"
              className="border border-blue-500 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              View All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </ThemedInnerPageLayout>
  );
} 