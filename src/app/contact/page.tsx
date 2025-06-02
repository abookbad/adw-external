"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../components/PageHeroTitle';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <ThemedInnerPageLayout>
      <PageHeroTitle titleLine1="Contact" titleLine2="Us" />

      <div className="w-full max-w-7xl mx-auto px-4 pt-24 md:pt-32 flex flex-col items-center justify-center text-center">
        <motion.h1 
          className="text-5xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-white inline-block"
          style={{
            filter: "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.2))"
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            rotateX: [10, 15, 10],
            rotateY: [-2, 2, -2],
            translateZ: [10, 15, 10],
            textShadow: [
              `1px 1px 0px #1e40af, 2px 2px 0px #1e3a8a, 3px 3px 0px #1e2563, 4px 4px 10px rgba(0, 0, 0, 0.3), 0px 0px 15px rgba(59, 130, 246, 0.3)`,
              `1px 1px 0px #2563eb, 2px 2px 0px #1d4ed8, 3px 3px 0px #1e40af, 4px 4px 12px rgba(0, 0, 0, 0.3), 0px 0px 20px rgba(59, 130, 246, 0.4)`,
              `1px 1px 0px #1e40af, 2px 2px 0px #1e3a8a, 3px 3px 0px #1e2563, 4px 4px 10px rgba(0, 0, 0, 0.3), 0px 0px 15px rgba(59, 130, 246, 0.3)`
            ]
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.6 },
            y: { duration: 0.8, delay: 0.6 },
            rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            translateZ: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            textShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          Contact Us
        </motion.h1>
        <p className="text-xl text-gray-300 max-w-2xl font-[family-name:var(--font-geist-sans)]">
          This is the Contact Us page. Contact form, address, and other contact details will go here.
        </p>
        {/* Add more content specific to Contact page here */}
      </div>
    </ThemedInnerPageLayout>
  );
} 