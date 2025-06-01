"use client";

import React, { useState, useEffect, ReactNode } from 'react';
// import { motion, MotionValue, useMotionValue, useSpring } from "framer-motion"; // motion & MotionValue unused
import { TopNavigationBar } from './TopNavigationBar';
// import { BackgroundEffects } from './BackgroundEffects'; // Assuming this would be unused if useEffect is out

interface InnerPageLayoutProps {
  children: ReactNode;
}

export const InnerPageLayout: React.FC<InnerPageLayoutProps> = ({ children }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  // const mouseXInitial = useMotionValue(0); // Unused due to useEffect removal
  // const mouseYInitial = useMotionValue(0); // Unused due to useEffect removal
  // const springConfig = { damping: 100, stiffness: 1000, mass: 0.5 }; // Unused
  // const mouseX = useSpring(mouseXInitial, springConfig); // Unused
  // const mouseY = useSpring(mouseYInitial, springConfig); // Unused

  /* Commenting out useEffect to resolve dependency warnings and related unused vars
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
  // }, [mouseXInitial, mouseYInitial]); // Original, caused warnings
  }, []); // Empty dependency array if we were to keep it, but commenting out whole hook
  */

  return (
    <div className="relative flex flex-col min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* <BackgroundEffects mouseX={mouseX} mouseY={mouseY} windowSize={windowSize} /> */}
      <TopNavigationBar />
      <main className="flex-grow flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 pt-16">
        {children}
      </main>
      {/* Consider adding a footer if appropriate for inner pages */}
    </div>
  );
}; 