"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../components/ThemedInnerPageLayout'; // Changed import

export default function PortfolioPage() {
  return (
    <ThemedInnerPageLayout> {/* Changed layout component */}
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">Portfolio</h1>
        <p className="text-xl text-gray-300 max-w-2xl font-[family-name:var(--font-geist-sans)]">
          This is the Portfolio page. Project showcases and case studies will go here.
        </p>
        {/* Add more content specific to Portfolio page here */}
      </div>
    </ThemedInnerPageLayout>
  );
} 