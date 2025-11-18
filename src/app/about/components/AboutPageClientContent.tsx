"use client";

import React from 'react';
import Image from 'next/image'; // Import next/image
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout'; // Adjusted import path
import { PageHeroTitle } from '../../components/PageHeroTitle'; // Adjusted import path
import { motion } from 'framer-motion';

export default function AboutPageClientContent() {
  return (
    <ThemedInnerPageLayout>
      <PageHeroTitle titleLine1="About" titleLine2="Us" />

      {/* Content Container */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          
          {/* Mission Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
              Transforming Businesses Through Technology
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-[family-name:var(--font-geist-mono)] tracking-wider">
              Agency Dev Works (ADW) helps companies grow with four focused offerings: Web Design, Voice AI, Business
              Automation, and AI Marketing. We design fast, high-performing websites, deploy human-like AI agents,
              automate operations, and scale acquisition with intelligent marketing systems.
            </p>
          </motion.div>

          {/* What We Do Section */}
          <motion.div 
            className="grid md:grid-cols-2 gap-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">What We Do</h3>
              <p className="text-slate-300 mb-6 leading-relaxed font-[family-name:var(--font-geist-mono)] tracking-wider">
                We bridge complex tech with practical outcomes. Our core services are streamlined to what moves the needle:
                conversion-first Web Design with SEO + GEO baked in, production-grade Voice AI, Business Automation across
                your stack, and AI Marketing that optimizes creative and spend in real time.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-slate-300 font-[family-name:var(--font-geist-mono)] tracking-wider">Web Design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-slate-300 font-[family-name:var(--font-geist-mono)] tracking-wider">Voice AI</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-slate-300 font-[family-name:var(--font-geist-mono)] tracking-wider">Business Automation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-slate-300 font-[family-name:var(--font-geist-mono)] tracking-wider">AI Marketing</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Our Approach</h3>
              <p className="text-slate-300 mb-6 leading-relaxed font-[family-name:var(--font-geist-mono)] tracking-wider">
                We believe in a consultative approach that puts your business goals first. Every solution we develop is 
                tailored to your specific needs, ensuring maximum ROI and seamless integration with your existing 
                operations.
              </p>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                <h4 className="text-lg font-semibold text-cyan-400 mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Our Process</h4>
                <div className="space-y-2 text-sm text-slate-300 font-[family-name:var(--font-geist-mono)] tracking-wider">
                  <div>1. <span className="text-white">Discovery</span> - Understanding your challenges</div>
                  <div>2. <span className="text-white">Strategy</span> - Developing custom solutions</div>
                  <div>3. <span className="text-white">Implementation</span> - Deploying with precision</div>
                  <div>4. <span className="text-white">Optimization</span> - Continuous improvement</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Why Choose ADW Section */}
          <motion.div 
            className="bg-slate-900/50 rounded-xl p-8 border border-slate-700/50 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Why Choose Agency Dev Works?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Cutting-Edge Technology</h4>
                <p className="text-slate-300 text-sm font-[family-name:var(--font-geist-mono)] tracking-wider">We stay ahead of the curve with the latest AI and automation technologies.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Proven Results</h4>
                <p className="text-slate-300 text-sm font-[family-name:var(--font-geist-mono)] tracking-wider">Our track record speaks for itself with measurable business improvements.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Expert Team</h4>
                <p className="text-slate-300 text-sm font-[family-name:var(--font-geist-mono)] tracking-wider">Our experienced professionals bring deep expertise across multiple domains.</p>
              </div>
            </div>
          </motion.div>

          {/* Meet the Team Section */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-white mb-12 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Meet the Faces of ADW</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Sajjad Alobaidi */}
              <motion.div 
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="relative mb-6">
                  <Image 
                    src="/faces-of-adw/Sajjad.jpg" 
                    alt="Sajjad Alobaidi" 
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-slate-700 group-hover:border-cyan-400 transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Sajjad Alobaidi</h4>
                <p className="text-cyan-400 font-medium mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider">Vice President</p>
                <a 
                  href="https://www.linkedin.com/in/sajjad-alobaidi-66489930b/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-slate-400 hover:text-cyan-400 transition-colors duration-200 font-[family-name:var(--font-geist-mono)] tracking-wider"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
                  </svg>
                  LinkedIn
                </a>
              </motion.div>

              {/* Mustafa Alzubaidi */}
              <motion.div 
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="relative mb-6">
                  <Image 
                    src="/faces-of-adw/Mustafa.JPG" 
                    alt="Mustafa Alzubaidi" 
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-slate-700 group-hover:border-cyan-400 transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Mustafa Alzubaidi</h4>
                <p className="text-cyan-400 font-medium mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider">CEO & Founder</p>
                <a 
                  href="https://www.linkedin.com/in/mustafa-alzubaidi25/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-slate-400 hover:text-cyan-400 transition-colors duration-200 font-[family-name:var(--font-geist-mono)] tracking-wider"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
                  </svg>
                  LinkedIn
                </a>
              </motion.div>

              {/* Mario Hanna */}
              <motion.div 
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <div className="relative mb-6">
                  <Image 
                    src="/faces-of-adw/mario.jpeg" 
                    alt="Mario Hanna" 
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-slate-700 group-hover:border-cyan-400 transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Mario Hanna</h4>
                <p className="text-cyan-400 font-medium mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider">VP, Digital Marketing Operations</p>
                <a 
                  href="https://www.linkedin.com/in/mario-h-a45710198/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-slate-400 hover:text-cyan-400 transition-colors duration-200 font-[family-name:var(--font-geist-mono)] tracking-wider"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
                  </svg>
                  LinkedIn
                </a>
              </motion.div>

              {/* Ali Hnyin */}
              <motion.div 
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="relative mb-6">
                  <Image 
                    src="/faces-of-adw/Ali.jpg" 
                    alt="Ali Hnyin" 
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-slate-700 group-hover:border-cyan-400 transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Ali Hnyin</h4>
                <p className="text-cyan-400 font-medium mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider">Director of Sales, Product Development</p>
                <a 
                  href="https://www.linkedin.com/in/ali-hnyin-9097a5316/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-slate-400 hover:text-cyan-400 transition-colors duration-200 font-[family-name:var(--font-geist-mono)] tracking-wider"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
                  </svg>
                  LinkedIn
                </a>
              </motion.div>

            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Ready to Transform Your Business?</h3>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto font-[family-name:var(--font-geist-mono)] tracking-wider">
              Let&apos;s discuss how Agency Dev Works can help you leverage technology to achieve your business goals.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase"
            >
              Start Your Project
            </a>
          </motion.div>
        </div>
      </div>
    </ThemedInnerPageLayout>
  );
} 