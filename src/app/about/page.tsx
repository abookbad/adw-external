"use client";

import React from 'react';
import { ThemedInnerPageLayout } from '../components/ThemedInnerPageLayout';
import { PageHeroTitle } from '../components/PageHeroTitle';

export default function AboutPage() {
  return (
    <ThemedInnerPageLayout>
      <PageHeroTitle titleLine1="About" titleLine2="Us" />

      {/* About Us content section */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-24 md:pt-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">About Us</h1>
        <p className="text-xl text-gray-300 max-w-2xl font-[family-name:var(--font-geist-sans)]">
          This is the About Us page. Company history, team information, and mission will go here.
        </p>
        {/* Add more content specific to About page here */}
      </div>
    </ThemedInnerPageLayout>
  );
} 