"use client";

import React, { useEffect } from 'react';
import { BottomInfoBar } from './BottomInfoBar';
import { HomePageHero } from './HomePageHero';
import { PrimaryTopNav } from './PrimaryTopNav';
import { BackgroundEffects } from './BackgroundEffects';
// We might remove or modify RotatingLayer depending on the new design direction
// import { RotatingLayer } from './RotatingLayer'; 

export default function HomePageClientContent() {
  // Prevent scrolling on mobile for home page
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Store original styles
      const originalBodyStyle = {
        overflow: document.body.style.overflow,
        height: document.body.style.height,
        maxHeight: document.body.style.maxHeight,
      };
      
      const originalHtmlStyle = {
        overflow: document.documentElement.style.overflow,
        height: document.documentElement.style.height,
        maxHeight: document.documentElement.style.maxHeight,
      };

      // Apply mobile-specific styles
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.maxHeight = '100vh';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100vh';
      document.documentElement.style.maxHeight = '100vh';

      // Cleanup function
      return () => {
        document.body.style.overflow = originalBodyStyle.overflow;
        document.body.style.height = originalBodyStyle.height;
        document.body.style.maxHeight = originalBodyStyle.maxHeight;
        document.documentElement.style.overflow = originalHtmlStyle.overflow;
        document.documentElement.style.height = originalHtmlStyle.height;
        document.documentElement.style.maxHeight = originalHtmlStyle.maxHeight;
      };
    }
  }, []);

  return (
    <main className="relative flex h-screen max-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 md:min-h-screen">
      <BackgroundEffects /> {/* Removed mouseX, mouseY, windowSize props */}
      {/* <RotatingLayer mouseX={mouseX} mouseY={mouseY} /> */}

      <PrimaryTopNav />
      
      {/* Main content area - Hero section will be primary content for now */}
      {/* Additional sections will go here, below the hero */}
      <HomePageHero />
      
      <BottomInfoBar />
    </main>
  );
} 