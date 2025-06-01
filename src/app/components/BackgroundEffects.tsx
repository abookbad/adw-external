"use client";

import React from 'react';
// import { MotionValue } from "framer-motion"; // MotionValue also becomes unused if props are removed
import { Vignette } from './Vignette';
// import { DynamicLight } from './DynamicLight'; // Unused
// import { Starfield } from './Starfield'; // Unused

interface BackgroundEffectsProps {
  // mouseX: MotionValue<number>; // Unused
  // mouseY: MotionValue<number>; // Unused
  // windowSize: { width: number; height: number }; // Unused
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = (/*{ mouseX, mouseY, windowSize }*/) => { // Props removed
  return (
    <>
      <Vignette />
      {/* <DynamicLight mouseX={mouseX} mouseY={mouseY} windowSize={windowSize} /> */}
      {/* <Starfield mouseX={mouseX} mouseY={mouseY} windowSize={windowSize} starCount={150} /> */}
    </>
  );
}; 