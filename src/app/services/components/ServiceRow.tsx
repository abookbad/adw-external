"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { motion } from 'framer-motion'; // Temporarily commented out

interface ServiceRowProps {
  name: string;
  description: string;
  imageUrl: string;
  isReversed?: boolean;
}

export const ServiceRow: React.FC<ServiceRowProps> = ({ name, description, imageUrl, isReversed = false }) => {
  // const containerVariants = { ... }; // Temporarily commented out
  // const imageItemVariants = { ... }; // Temporarily commented out
  // const textBlockVariants = { ... }; // Temporarily commented out
  // const textContentItemVariants = { ... }; // Temporarily commented out

  return (
    // Replaced motion.div with div, removed animation props
    <div 
      className={`flex flex-col md:flex-row items-center w-full gap-12 md:gap-20 ${isReversed ? 'md:flex-row-reverse' : ''}`}
      // variants={containerVariants} // Temporarily commented out
      // initial="hidden" // Temporarily commented out
      // whileInView="visible" // Temporarily commented out
      // viewport={{ once: true, amount: 0.25 }} // Temporarily commented out
    >
      {/* Replaced motion.div with div, removed animation props */}
      <div 
        className="w-full md:w-1/2 aspect-video md:aspect-auto md:h-[300px] lg:h-[350px] relative rounded-lg overflow-hidden shadow-xl"
        // variants={imageItemVariants} // Temporarily commented out
      >
        <Image 
          src={imageUrl} 
          alt={name} 
          fill={true} 
          className="object-cover"
        />
      </div>

      {/* Replaced motion.div with div, removed animation props */}
      <div 
        className={`w-full md:w-1/2 flex flex-col ${isReversed ? 'items-start md:items-end text-left md:text-right' : 'items-start text-left'}`}
        // variants={textBlockVariants} // Temporarily commented out
      >
        {/* Replaced motion.h3 with h3, removed animation props */}
        <h3 
          className="text-3xl lg:text-4xl font-bold mb-4 font-[family-name:var(--font-geist-sans)] text-cyan-400"
          // variants={textContentItemVariants} // Temporarily commented out
        >
          {name}
        </h3>
        {/* Replaced motion.p with p, removed animation props */}
        <p 
          className="text-slate-300 font-[family-name:var(--font-geist-sans)] text-base lg:text-lg leading-relaxed mb-6"
          // variants={textContentItemVariants} // Temporarily commented out
        >
          {description}
        </p>
        {/* Replaced motion.div with div, removed animation props */}
        <div /* variants={textContentItemVariants} */> {/* Temporarily commented out variants */}
          <Link 
            href="/contact" 
            className={`bg-cyan-600 hover:bg-cyan-500 text-white font-[family-name:var(--font-geist-sans)] font-semibold py-2.5 px-6 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg text-sm lg:text-base`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}; 