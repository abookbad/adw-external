"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Re-enabled motion

interface ServiceRowProps {
  name: string;
  description: string;
  imageUrl: string;
  isReversed?: boolean;
  slug: string; // Added slug for navigation
}

export const ServiceRow: React.FC<ServiceRowProps> = ({ name, description, imageUrl, isReversed = false, slug }) => {
  const simpleFadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div 
      className={`flex flex-col md:flex-row items-center w-full gap-12 md:gap-20 ${isReversed ? 'md:flex-row-reverse' : ''}`}
      variants={simpleFadeInVariants} // Using simple fade-in for the whole row
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Slightly adjusted amount
    >
      <div // Changed from motion.div, no individual animation for image block
        className="w-full md:w-96 lg:w-[400px] aspect-square relative rounded-full overflow-hidden shadow-xl flex items-center justify-center p-8 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer group"
      >
        <Image 
          src={imageUrl} 
          alt={name} 
          fill={true} 
          className="object-contain transition-transform duration-300 group-hover:scale-105 p-12"
        />
      </div>

      <div // Changed from motion.div, no individual animation for text block
        className={`w-full md:w-1/2 flex flex-col ${isReversed ? 'items-start md:items-end text-left md:text-right' : 'items-start text-left'}`}
      >
        <h3 // Changed from motion.h3
          className="text-3xl lg:text-4xl font-bold mb-4 font-[family-name:var(--font-geist-sans)] text-white"
        >
          {name}
        </h3>
        <p // Changed from motion.p
          className="text-slate-300 font-[family-name:var(--font-geist-sans)] text-base lg:text-lg leading-relaxed mb-6"
        >
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href={`/services/${slug}`}
            className="bg-blue-700 hover:bg-blue-600 text-white font-[family-name:var(--font-geist-sans)] font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm lg:text-base text-center hover:scale-105"
          >
            Learn More
          </Link>
          <Link 
            href="/contact" 
            className="border border-blue-500 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 font-[family-name:var(--font-geist-sans)] font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm lg:text-base text-center"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </motion.div>
  );
}; 