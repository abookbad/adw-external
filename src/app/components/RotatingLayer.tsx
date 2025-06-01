"use client";

import React from 'react';
import { motion, MotionValue } from "framer-motion";

interface RotatingLayerProps {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}

export const RotatingLayer: React.FC<RotatingLayerProps> = ({ rotateX, rotateY }) => {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
    />
  );
}; 