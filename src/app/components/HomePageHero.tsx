"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const HomePageHero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-[calc(theme(spacing.4)+24px)] pb-[calc(theme(spacing.3)+20px)] text-white">
      {/* Adjusted padding to account for fixed navs using Tailwind's theme function for spacing values */}
      <motion.h1 
        className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 font-[family-name:var(--font-geist-sans)] uppercase tracking-tighter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        AGENCY <br /> DEVWORKS
      </motion.h1>
      <motion.p 
        className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 max-w-2xl mb-10 font-[family-name:var(--font-geist-sans)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Building the Future of Digital Experiences.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Link 
          href="/services"
          className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 px-6 xs:py-3 xs:px-8 sm:py-3 sm:px-8 md:py-4 md:px-10 rounded-lg text-sm xs:text-base sm:text-lg md:text-xl font-[family-name:var(--font-geist-sans)] transition-colors shadow-lg hover:shadow-cyan-500/50"
        >
          Explore Our Services
        </Link>
      </motion.div>
    </div>
  );
}; 