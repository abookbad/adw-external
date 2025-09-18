"use client";

import React, { /* useState, useEffect, */ ReactNode } from 'react'; // Commented out useState, useEffect
// import { motion, useMotionValue, useSpring } from "framer-motion"; // Temporarily commented out
import { PrimaryTopNav } from './PrimaryTopNav';
import { CompanyProvider } from './CompanyContext';
import { BottomInfoBar } from './BottomInfoBar';
// import { BackgroundEffects } from './BackgroundEffects'; // Temporarily commented out

interface ThemedInnerPageLayoutProps {
  children: ReactNode;
  themeColor?: 'orange' | 'blue' | 'green' | 'purple' | 'cyan' | 'teal' | 'default'; // Added teal
}

// Define a helper to get theme-specific classes, can be expanded
const getThemeClasses = (themeColor?: string) => {
  switch (themeColor) {
    case 'orange':
      return {
        // Example: apply to a pseudo-element for a top border accent
        mainBg: 'bg-slate-950', // Keep main bg consistent for now
        accentClass: 'before:bg-orange-500',
      };
    case 'blue':
      return {
        mainBg: 'bg-slate-950',
        accentClass: 'before:bg-blue-500',
      };
    case 'green':
      return {
        mainBg: 'bg-slate-950',
        accentClass: 'before:bg-green-500',
      };
    case 'purple':
      return {
        mainBg: 'bg-slate-950',
        accentClass: 'before:bg-purple-500',
      };
    case 'cyan':
      return {
        mainBg: 'bg-slate-950',
        accentClass: 'before:bg-cyan-500',
      };
    case 'teal':
      return {
        mainBg: 'bg-slate-950',
        accentClass: 'before:bg-teal-500',
      };
    // Add more cases for other colors like purple, cyan etc.
    default:
      return {
        mainBg: 'bg-slate-950',
        accentClass: 'before:bg-slate-700', // Default accent
      };
  }
};

export const ThemedInnerPageLayout: React.FC<ThemedInnerPageLayoutProps> = ({ children, themeColor = 'default' }) => {
  // const [windowSize, setWindowSize] = useState({ width: 0, height: 0 }); // Temporarily commented out
  // const mouseXInitial = useMotionValue(0); // Temporarily commented out
  // const mouseYInitial = useMotionValue(0); // Temporarily commented out
  // const springConfig = { damping: 100, stiffness: 1000, mass: 0.5 }; // Temporarily commented out
  // const mouseX = useSpring(mouseXInitial, springConfig); // Temporarily commented out
  // const mouseY = useSpring(mouseYInitial, springConfig); // Temporarily commented out

  const theme = getThemeClasses(themeColor);

  /* Temporarily commented out useEffect block
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

  return (
    <div className={`relative flex flex-col min-h-screen ${theme.mainBg} text-white overflow-x-hidden`}>
      {/* <BackgroundEffects mouseX={mouseX} mouseY={mouseY} windowSize={windowSize} /> */}{/* Temporarily commented out BackgroundEffects and its props */}
      <CompanyProvider>
        <PrimaryTopNav />
        {/* Added a pseudo-element for top accent based on theme. Requires CSS to style ::before */}
        <main className={`flex-grow flex flex-col px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative ${theme.accentClass} themed-main-content`}>
          {children}
        </main>
      </CompanyProvider>
      <BottomInfoBar />
    </div>
  );
};

// It might be good to add some global CSS for .themed-main-content::before if not already handled by Tailwind
/* Example CSS (could go in a global.css):
.themed-main-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px; // Or your desired thickness
  width: 100%; // Ensure it spans the full width
}
*/ 