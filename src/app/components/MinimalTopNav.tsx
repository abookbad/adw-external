"use client";

import React from 'react';

export const BottomInfoBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm text-white p-3 border-t border-slate-700/50">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 max-w-full text-center">
        <span className="font-semibold text-xs tracking-wider font-[family-name:var(--font-geist-sans)] mb-1">
          Agency DevWorks
        </span>
        <span className="text-xxs xs:text-xs text-slate-400 font-[family-name:var(--font-geist-mono)] tracking-wider">
          Innovate . Create . Elevate
        </span>
      </div>
    </div>
  );
}; 