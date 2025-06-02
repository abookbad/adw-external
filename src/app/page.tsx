"use client";

import React, { useEffect } from 'react';
// import { motion, useMotionValue, useSpring } from "framer-motion"; // motion is unused, commenting out the whole line for now
// import { useMotionValue, useSpring } from "framer-motion"; // Commented out as mouseX/Y are unused
import { BottomInfoBar } from './components/BottomInfoBar';
import { HomePageHero } from './components/HomePageHero';
import { PrimaryTopNav } from './components/PrimaryTopNav';
import { BackgroundEffects } from './components/BackgroundEffects'; // Keeping background effects for now
// We might remove or modify RotatingLayer depending on the new design direction
// import { RotatingLayer } from './components/RotatingLayer'; 

export default function NewHomePage() {
  // const [windowSize, setWindowSize] = useState({ width: 0, height: 0 }); // Unused

  // const mouseXInitial = useMotionValue(0); // Unused
  // const mouseYInitial = useMotionValue(0); // Unused

  // Smooth mouse values using spring
  // const springConfig = { damping: 100, stiffness: 1000, mass: 0.5 }; // Unused
  // const mouseX = useSpring(mouseXInitial, springConfig); // Unused
  // const mouseY = useSpring(mouseYInitial, springConfig); // Unused

  /* Comment out useEffect as its setters are unused
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      mouseXInitial.set(window.innerWidth / 2);
      mouseYInitial.set(window.innerHeight / 2);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseXInitial.set(event.clientX);
      mouseYInitial.set(event.clientY);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseXInitial, mouseYInitial]);
  */

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

