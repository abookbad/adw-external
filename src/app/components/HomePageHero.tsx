"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const HomePageHero = () => {
  return (
    <div className="h-full max-h-screen flex flex-col items-center justify-center text-center px-4 pt-[calc(theme(spacing.4)+24px)] pb-[calc(theme(spacing.3)+20px)] text-white relative md:min-h-screen">
      {/* Shooting Stars Background - Desktop Only */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
        {/* Shooting Star 1 - Diagonal top-left to bottom-right */}
        <motion.div
          className="absolute w-1 h-1 bg-white rounded-full opacity-0 md:w-1 md:h-1 w-0.5 h-0.5"
          style={{
            boxShadow: "0 0 6px 2px rgba(255, 255, 255, 0.8), 0 0 12px 4px rgba(59, 130, 246, 0.6)"
          }}
          animate={{
            x: [-100, "calc(100vw + 100px)"],
            y: ["-10vh", "110vh"],
            opacity: [0, 0.6, 0.8, 0.6, 0],
            scale: [0, 0.8, 1, 0.8, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 6,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.2, 0.5, 0.8, 1]
          }}
        />
        
        {/* Shooting Star 2 - Steep diagonal bottom-left to top-right */}
        <motion.div
          className="absolute w-1 h-1 bg-blue-200 rounded-full opacity-0 md:w-1 md:h-1 w-0.5 h-0.5"
          style={{
            boxShadow: "0 0 6px 2px rgba(191, 219, 254, 0.8), 0 0 12px 4px rgba(59, 130, 246, 0.6)"
          }}
          animate={{
            x: [-80, "calc(70vw + 80px)"],
            y: ["110vh", "-10vh"],
            opacity: [0, 0.5, 0.7, 0.5, 0],
            scale: [0, 0.7, 1, 0.7, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatDelay: 9,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 3,
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        />

        {/* Shooting Star 3 - Vertical top to bottom */}
        <motion.div
          className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full opacity-0"
          style={{
            boxShadow: "0 0 4px 2px rgba(165, 243, 252, 0.8), 0 0 8px 3px rgba(6, 182, 212, 0.5)"
          }}
          animate={{
            x: ["25vw", "35vw"],
            y: ["-10vh", "110vh"],
            opacity: [0, 0.4, 0.6, 0.4, 0],
            scale: [0, 0.6, 1, 0.6, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatDelay: 8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 7,
            times: [0, 0.2, 0.5, 0.8, 1]
          }}
        />

        {/* Shooting Star 4 - Diagonal top-right to bottom-left */}
        <motion.div
          className="absolute w-1 h-1 bg-indigo-200 rounded-full opacity-0 md:w-1 md:h-1 w-0.5 h-0.5"
          style={{
            boxShadow: "0 0 6px 2px rgba(199, 210, 254, 0.8), 0 0 12px 4px rgba(99, 102, 241, 0.6)"
          }}
          animate={{
            x: ["calc(100vw + 120px)", -120],
            y: ["-10vh", "80vh"],
            opacity: [0, 0.5, 0.7, 0.5, 0],
            scale: [0, 0.7, 1, 0.7, 0]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatDelay: 12,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 2,
            times: [0, 0.2, 0.5, 0.8, 1]
          }}
        />

        {/* Shooting Star 5 - Shallow angle left to right */}
        <motion.div
          className="absolute w-0.5 h-0.5 bg-purple-200 rounded-full opacity-0"
          style={{
            boxShadow: "0 0 4px 2px rgba(221, 214, 254, 0.8), 0 0 8px 3px rgba(139, 92, 246, 0.5)"
          }}
          animate={{
            x: [-200, "calc(100vw + 200px)"],
            y: ["70vh", "30vh"],
            opacity: [0, 0.4, 0.6, 0.4, 0],
            scale: [0, 0.6, 1, 0.6, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatDelay: 14,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 5,
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        />

        {/* Shooting Star 6 - Near vertical with slight drift */}
        <motion.div
          className="absolute w-1 h-1 bg-emerald-200 rounded-full opacity-0 md:w-1 md:h-1 w-0.5 h-0.5"
          style={{
            boxShadow: "0 0 6px 2px rgba(167, 243, 233, 0.8), 0 0 12px 4px rgba(16, 185, 129, 0.6)"
          }}
          animate={{
            x: ["60vw", "80vw"],
            y: ["110vh", "-10vh"],
            opacity: [0, 0.5, 0.7, 0.5, 0],
            scale: [0, 0.7, 1, 0.7, 0]
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            repeatDelay: 11,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 10,
            times: [0, 0.2, 0.5, 0.8, 1]
          }}
        />

        {/* Shooting Star 7 - Wide diagonal bottom-right to top-left */}
        <motion.div
          className="absolute w-0.5 h-0.5 bg-rose-200 rounded-full opacity-0"
          style={{
            boxShadow: "0 0 4px 2px rgba(252, 231, 243, 0.8), 0 0 8px 3px rgba(244, 63, 94, 0.5)"
          }}
          animate={{
            x: ["calc(100vw + 150px)", -150],
            y: ["110vh", "20vh"],
            opacity: [0, 0.4, 0.6, 0.4, 0],
            scale: [0, 0.6, 1, 0.6, 0]
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            repeatDelay: 15,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 4,
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        />
      </div>

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
        animate={{ 
          opacity: 1, 
          y: [0, -3, 0],
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 10px 25px rgba(29, 78, 216, 0.3), 0 0 0 rgba(59, 130, 246, 0)",
            "0 15px 35px rgba(29, 78, 216, 0.4), 0 0 20px rgba(59, 130, 246, 0.2)",
            "0 10px 25px rgba(29, 78, 216, 0.3), 0 0 0 rgba(59, 130, 246, 0)"
          ]
        }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.6 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{
          scale: 1.05,
          y: -5,
          boxShadow: "0 20px 40px rgba(29, 78, 216, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        <Link 
          href="/services"
          className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-6 xs:py-3 xs:px-8 sm:py-3 sm:px-8 md:py-4 md:px-10 rounded-lg text-sm xs:text-base sm:text-lg md:text-xl font-[family-name:var(--font-geist-sans)] transition-colors duration-300 inline-block"
        >
          Learn What We Do
        </Link>
      </motion.div>
    </div>
  );
}; 