"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../components/ThemedInnerPageLayout'; // Changed import

export default function AboutPage() {
  return (
    <ThemedInnerPageLayout> {/* Changed layout component */}
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">About Us</h1>
        <p className="text-xl text-gray-300 max-w-2xl font-[family-name:var(--font-geist-sans)]">
          This is the About Us page. Company history, team information, and mission will go here.
        </p>
        {/* Add more content specific to About page here */}
      </div>
    </ThemedInnerPageLayout>
  );
} 