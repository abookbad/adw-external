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
        style={{ 
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.span 
          className="text-white inline-block"
          style={{
            filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))"
          }}
          animate={{
            rotateX: [15, 20, 25, 20, 15],
            rotateY: [-5, 0, 5, 0, -5],
            translateZ: [30, 35, 40, 35, 30],
            y: [0, -4, -8, -4, 0],
            textShadow: [
              `2px 2px 0px #1e40af, 4px 4px 0px #1e3a8a, 6px 6px 0px #1e2563, 8px 8px 15px rgba(0, 0, 0, 0.3), 0px 0px 25px rgba(59, 130, 246, 0.4), 0px 0px 50px rgba(59, 130, 246, 0.2)`,
              `2px 2px 0px #2563eb, 4px 4px 0px #1d4ed8, 6px 6px 0px #1e40af, 8px 8px 18px rgba(0, 0, 0, 0.3), 0px 0px 30px rgba(59, 130, 246, 0.5), 0px 0px 60px rgba(59, 130, 246, 0.3)`,
              `2px 2px 0px #2563eb, 4px 4px 0px #1d4ed8, 6px 6px 0px #1e40af, 8px 8px 20px rgba(0, 0, 0, 0.3), 0px 0px 35px rgba(59, 130, 246, 0.6), 0px 0px 70px rgba(59, 130, 246, 0.4)`,
              `2px 2px 0px #2563eb, 4px 4px 0px #1d4ed8, 6px 6px 0px #1e40af, 8px 8px 18px rgba(0, 0, 0, 0.3), 0px 0px 30px rgba(59, 130, 246, 0.5), 0px 0px 60px rgba(59, 130, 246, 0.3)`,
              `2px 2px 0px #1e40af, 4px 4px 0px #1e3a8a, 6px 6px 0px #1e2563, 8px 8px 15px rgba(0, 0, 0, 0.3), 0px 0px 25px rgba(59, 130, 246, 0.4), 0px 0px 50px rgba(59, 130, 246, 0.2)`
            ],
            filter: [
              "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2)) brightness(1.0)",
              "drop-shadow(0px 4px 9px rgba(59, 130, 246, 0.1)) brightness(1.02)",
              "drop-shadow(0px 4px 10px rgba(59, 130, 246, 0.15)) brightness(1.04)",
              "drop-shadow(0px 4px 9px rgba(59, 130, 246, 0.1)) brightness(1.02)",
              "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2)) brightness(1.0)"
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: [0.4, 0.0, 0.6, 1],
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        >
          AGENCY
        </motion.span> 
        <br /> 
        <motion.span 
          className="text-white inline-block"
          style={{
            filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))"
          }}
          animate={{
            rotateX: [15, 10, 5, 10, 15],
            rotateY: [5, 0, -5, 0, 5],
            translateZ: [30, 32, 35, 32, 30],
            y: [0, 4, 8, 4, 0],
            textShadow: [
              `2px 2px 0px #1e40af, 4px 4px 0px #1e3a8a, 6px 6px 0px #1e2563, 8px 8px 15px rgba(0, 0, 0, 0.3), 0px 0px 25px rgba(59, 130, 246, 0.4), 0px 0px 50px rgba(59, 130, 246, 0.2)`,
              `2px 2px 0px #2563eb, 4px 4px 0px #1d4ed8, 6px 6px 0px #1e40af, 8px 8px 18px rgba(0, 0, 0, 0.3), 0px 0px 30px rgba(59, 130, 246, 0.5), 0px 0px 60px rgba(59, 130, 246, 0.3)`,
              `2px 2px 0px #2563eb, 4px 4px 0px #1d4ed8, 6px 6px 0px #1e40af, 8px 8px 20px rgba(0, 0, 0, 0.3), 0px 0px 35px rgba(59, 130, 246, 0.6), 0px 0px 70px rgba(59, 130, 246, 0.4)`,
              `2px 2px 0px #2563eb, 4px 4px 0px #1d4ed8, 6px 6px 0px #1e40af, 8px 8px 18px rgba(0, 0, 0, 0.3), 0px 0px 30px rgba(59, 130, 246, 0.5), 0px 0px 60px rgba(59, 130, 246, 0.3)`,
              `2px 2px 0px #1e40af, 4px 4px 0px #1e3a8a, 6px 6px 0px #1e2563, 8px 8px 15px rgba(0, 0, 0, 0.3), 0px 0px 25px rgba(59, 130, 246, 0.4), 0px 0px 50px rgba(59, 130, 246, 0.2)`
            ],
            filter: [
              "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2)) brightness(1.0)",
              "drop-shadow(0px 4px 9px rgba(59, 130, 246, 0.1)) brightness(1.02)",
              "drop-shadow(0px 4px 10px rgba(59, 130, 246, 0.15)) brightness(1.04)",
              "drop-shadow(0px 4px 9px rgba(59, 130, 246, 0.1)) brightness(1.02)",
              "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2)) brightness(1.0)"
            ]
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: [0.4, 0.0, 0.6, 1],
            times: [0, 0.25, 0.5, 0.75, 1],
            delay: 2
          }}
        >
          DEV WORKS
        </motion.span>
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
          className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-6 xs:py-3 xs:px-8 sm:py-3 sm:px-8 md:py-4 md:px-10 rounded-lg text-sm xs:text-base sm:text-lg md:text-xl font-[family-name:var(--font-geist-sans)] transition-colors shadow-lg hover:shadow-blue-700/50"
        >
          Explore Our Services
        </Link>
      </motion.div>
    </div>
  );
}; 