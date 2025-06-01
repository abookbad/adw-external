import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface DynamicLightProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  windowSize: { width: number; height: number };
}

export const DynamicLight = ({ mouseX, mouseY, windowSize }: DynamicLightProps) => {
  const transformRangeX = [0, windowSize.width || 1000];
  const transformRangeY = [0, windowSize.height || 1000];

  const lightX = useTransform(mouseX, transformRangeX, ['0%', '100%']);
  const lightY = useTransform(mouseY, transformRangeY, ['0%', '100%']);

  return (
    <motion.div
      className="absolute inset-0 z-[-1] pointer-events-none opacity-70"
      style={{
        background: useTransform(
          [lightX, lightY],
          ([latestX, latestY]) =>
            `radial-gradient(circle at ${latestX} ${latestY}, rgba(167, 139, 250, 0.1) 0%, transparent 50%), radial-gradient(circle at calc(100% - ${latestX}) calc(50% - ${latestY}), rgba(56, 189, 248, 0.08) 0%, transparent 45%)`,
        ),
      }}
    />
  );
}; 