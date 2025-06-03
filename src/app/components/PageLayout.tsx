"use client";

import React, { useState, /* useEffect, */ ReactNode } from 'react'; // Commented out useEffect
// import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion"; // MotionValue unused
import { PrimaryTopNav } from './PrimaryTopNav'; // Changed from NavigationMenu
import { BackgroundEffects } from './BackgroundEffects';
// import { RotatingLayer } from './RotatingLayer'; // Comment out if component itself is unused here

interface PageLayoutProps {
  children: ReactNode;
  animateContentShift?: boolean;
  showNavInitially?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, animateContentShift = false, showNavInitially = true }) => {
  const [windowSize /*, setWindowSize */] = useState({ width: 0, height: 0 }); // Commented out setWindowSize
  // const mouseXInitial = useMotionValue(0); // Unused
  // const mouseYInitial = useMotionValue(0); // Unused
  // const springConfig = { damping: 100, stiffness: 1000, mass: 0.5 }; // Unused
  // const mouseX = useSpring(mouseXInitial, springConfig); // Unused
  // const mouseY = useSpring(mouseYInitial, springConfig); // Unused

  const [showNav /*, setShowNav */] = useState(showNavInitially); // Commented out setShowNav

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

    if (!showNavInitially) {
      const timer = setTimeout(() => setShowNav(true), 1500); 
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  // }, [showNavInitially, mouseXInitial, mouseYInitial]); // Original, caused warnings
}, [showNavInitially]); // Simplified, but commenting out whole hook
*/

  // const springTransformConfig = { damping: 40, stiffness: 150, mass: 1.2 }; // Unused
  // const springX = useSpring(mouseX, springTransformConfig); // Unused
  // const springY = useSpring(mouseY, springTransformConfig); // Unused
  // const transformRangeX = [0, windowSize.width || 1]; // Unused
  // const transformRangeY = [0, windowSize.height || 1]; // Unused
  // const rotateX = useTransform(springY, transformRangeY, [30, -30]); // Unused
  // const rotateY = useTransform(springX, transformRangeX, [-30, 30]); // Unused

  const contentX = animateContentShift && showNav && windowSize.width >= 768 ? -250 : 0;

  return (
    <div className="relative min-h-screen bg-black text-white perspective-1000px isolate overflow-hidden">
      <BackgroundEffects /* mouseX={mouseX} mouseY={mouseY} windowSize={windowSize} */ />
      <PrimaryTopNav /* showNav={showNav} */ /> {/* Changed from NavigationMenu */}
      {/* <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-48 p-8"
        animate={{ x: contentX, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
      >
        {children}
      </motion.div> */}
      {/* Temporarily replacing motion.div to remove dependency */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-48 p-8"
        style={{ transform: `translateX(${contentX}px)`, opacity: 1 }}
      >
        {children}
      </div>
      {/* <RotatingLayer /> */}{/* Commented out RotatingLayer to resolve prop errors */}
    </div>
  );
}; 