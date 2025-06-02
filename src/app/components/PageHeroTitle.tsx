"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroTitleProps {
  titleLine1: string;
  titleLine2: string;
}

export const PageHeroTitle: React.FC<PageHeroTitleProps> = ({ titleLine1, titleLine2 }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center min-h-[calc(100vh-16rem)] relative">
      <motion.h1 
        className="font-bold font-[family-name:var(--font-geist-sans)] uppercase text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-tighter select-none"
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
            rotateY: [-3, 0, 3, 0, -3],
            translateZ: [20, 25, 30, 25, 20],
            y: [0, -3, -6, -3, 0],
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
          {titleLine1}
        </motion.span>
        <br />
        <motion.span 
          className="text-white inline-block"
          style={{
            filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))"
          }}
          animate={{
            rotateX: [15, 10, 5, 10, 15],
            rotateY: [3, 0, -3, 0, 3],
            translateZ: [20, 22, 25, 22, 20],
            y: [0, 3, 6, 3, 0],
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
          {titleLine2}
        </motion.span>
      </motion.h1>

      {/* Jumping Down Arrow - Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }}
      >
        <motion.div
          className="text-blue-400 mb-2 text-sm font-medium tracking-wider opacity-70"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          SCROLL
        </motion.div>
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-blue-400"
          animate={{ 
            y: [0, 8, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        >
          <path
            d="M7 13L12 18L17 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 6L12 11L17 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}; 