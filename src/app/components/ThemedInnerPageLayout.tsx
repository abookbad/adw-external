"use client";

import React, { /* useState, useEffect, */ ReactNode } from 'react'; // Commented out useState, useEffect
// import { motion, useMotionValue, useSpring } from "framer-motion"; // Temporarily commented out
import { PrimaryTopNav } from './PrimaryTopNav';
import { BottomInfoBar } from './BottomInfoBar';
// import { BackgroundEffects } from './BackgroundEffects'; // Temporarily commented out

interface ThemedInnerPageLayoutProps {
  children: ReactNode;
}

export const ThemedInnerPageLayout: React.FC<ThemedInnerPageLayoutProps> = ({ children }) => {
  // const [windowSize, setWindowSize] = useState({ width: 0, height: 0 }); // Temporarily commented out
  // const mouseXInitial = useMotionValue(0); // Temporarily commented out
  // const mouseYInitial = useMotionValue(0); // Temporarily commented out
  // const springConfig = { damping: 100, stiffness: 1000, mass: 0.5 }; // Temporarily commented out
  // const mouseX = useSpring(mouseXInitial, springConfig); // Temporarily commented out
  // const mouseY = useSpring(mouseYInitial, springConfig); // Temporarily commented out

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
    <div className="relative flex flex-col min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* <BackgroundEffects mouseX={mouseX} mouseY={mouseY} windowSize={windowSize} /> */}{/* Temporarily commented out BackgroundEffects and its props */}
      <PrimaryTopNav />
      <main className={`flex-grow flex flex-col px-4 sm:px-6 lg:px-8 pt-24`}>
        {children}
      </main>
      <BottomInfoBar />
    </div>
  );
}; 