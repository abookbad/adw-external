"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ name, description, imageUrl }) => {
  return (
    <div 
      className="bg-slate-900 rounded-xl shadow-lg border border-slate-700/50 hover:shadow-cyan-500/30 transition-shadow duration-300 flex flex-col overflow-hidden text-left"
    >
      <div className="w-full h-48 relative">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill={true} 
          className="object-cover" 
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-geist-sans)] text-cyan-400">
          {name}
        </h3>
        <p className="text-slate-300 font-[family-name:var(--font-geist-sans)] text-sm leading-relaxed mb-4 flex-grow">
          {description}
        </p>
        <Link 
          href="/contact"
          className="mt-auto self-start bg-cyan-600 hover:bg-cyan-500 text-white font-[family-name:var(--font-geist-sans)] text-xs font-semibold py-2 px-4 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}; 