"use client";

import React, { /* useState, useEffect */ } from 'react'; // Commented out useState, useEffect
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

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950">
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

