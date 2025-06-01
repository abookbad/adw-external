import React, { useState, useEffect, useMemo } from 'react';
import {
  motion,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion';

// Helper function (keep local or move to utils)
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Star component logic (now internal to Starfield)
const Star = ({ mouseX, mouseY, index, windowSize }: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  index: number;
  windowSize: { width: number; height: number };
}) => {
  const [initialStyle, setInitialStyle] = useState({ 
      left: '50%', top: '50%', width: 1, height: 1, opacity: 0, scale: 1 
  });
  const [transitionProps, setTransitionProps] = useState({ 
      delay: 0, duration: 1 
  });
  const [twinkleParams, setTwinkleParams] = useState<{ duration: number, delay: number, scaleRange: [number, number], opacityRange: [number, number] } | null>(null);

  useEffect(() => {
    const depth = (index % 3) + 1; 
    const baseOpacity = random(0.2 / depth, 0.7 / depth);
    const baseScale = random(0.7, 1.3) / depth;

    setInitialStyle({
      left: `${random(0.5, 99.5)}%`,
      top: `${random(0.5, 99.5)}%`,
      width: random(0.5, 2.5) / depth,
      height: random(0.5, 2.5) / depth,
      opacity: baseOpacity,
      scale: baseScale
    });
    setTransitionProps({
      delay: random(0, 2.5),
      duration: random(1.5, 4)
    });

    // Set twinkle params for ALL stars now
    setTwinkleParams({
      duration: random(1.5, 4),
      delay: random(0, 5),
      scaleRange: [baseScale * 0.8, baseScale * 1.2],
      opacityRange: [baseOpacity * 0.5, baseOpacity * 1.1]
    });

  }, [index]); 

  const springConfig = useMemo(() => ({ damping: random(25, 50), stiffness: random(60, 100), mass: random(1, 2) }), []);
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const depth = useMemo(() => (index % 3) + 1, [index]);
  const parallaxFactor = useMemo(() => depth * 4.5, [depth]);
  const transformRangeX = useMemo(() => [0, windowSize.width || 1000], [windowSize.width]);
  const transformRangeY = useMemo(() => [0, windowSize.height || 1000], [windowSize.height]);
  const translateX = useTransform(springX, transformRangeX, [-(index + 1) * parallaxFactor, (index + 1) * parallaxFactor]);
  const translateY = useTransform(springY, transformRangeY, [-(index + 1) * parallaxFactor, (index + 1) * parallaxFactor]);

  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{
        width: initialStyle.width,
        height: initialStyle.height,
        left: initialStyle.left,
        top: initialStyle.top,
        translateX,
        translateY,
        opacity: initialStyle.opacity, 
      }}
      initial={{ opacity: 0, scale: initialStyle.scale }}
      animate={twinkleParams ? {
        opacity: [initialStyle.opacity, ...twinkleParams.opacityRange, initialStyle.opacity],
        scale: [initialStyle.scale, ...twinkleParams.scaleRange, initialStyle.scale],
      } : {
        opacity: initialStyle.opacity,
        scale: initialStyle.scale,
      }}
      transition={twinkleParams ? {
        duration: twinkleParams.duration,
        delay: transitionProps.delay + twinkleParams.delay, 
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      } : {
        delay: transitionProps.delay,
        duration: transitionProps.duration,
        ease: "circOut",
      }}
    />
  );
};

// Starfield component props
interface StarfieldProps {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    windowSize: { width: number; height: number };
    starCount?: number; // Optional: allow customization
}

export const Starfield = ({ mouseX, mouseY, windowSize, starCount = 50 }: StarfieldProps) => {
    return (
        <div className="absolute inset-0 z-[-3] pointer-events-none">
            {[...Array(starCount)].map((_, i) => (
                <Star key={`star-${i}`} mouseX={mouseX} mouseY={mouseY} index={i} windowSize={windowSize} />
            ))}
        </div>
    );
}; 