"use client";

import React from 'react';
// import { MotionValue } from "framer-motion"; // MotionValue also becomes unused if props are removed
import { Vignette } from './Vignette';
// import { DynamicLight } from './DynamicLight'; // Unused
// import { Starfield } from './Starfield'; // Unused

// interface BackgroundEffectsProps {} // Changed to React.FC<{}> or removed type for props

export const BackgroundEffects = () => { // Removed React.FC type
  return (
    <>
      <Vignette />
      {/* <DynamicLight mouseX={mouseX} mouseY={mouseY} windowSize={windowSize} /> */}
      {/* <Starfield mouseX={mouseX} mouseY={mouseY} windowSize={windowSize} starCount={150} /> */}
    </>
  );
}; 