"use client";

import React from 'react';

interface PageHeroTitleProps {
  titleLine1: string;
  titleLine2: string;
}

export const PageHeroTitle: React.FC<PageHeroTitleProps> = ({ titleLine1, titleLine2 }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center min-h-[calc(100vh-16rem)]">
      <h1 
        className="font-bold font-[family-name:var(--font-geist-sans)] uppercase \
                   bg-gradient-to-b from-white via-white via-[40%] to-blue-600 bg-clip-text text-transparent \
                   text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl \
                   leading-none tracking-tighter select-none"
      > 
        <span className="block">{titleLine1}</span>
        <span className="block">{titleLine2}</span>
      </h1>
    </div>
  );
}; 