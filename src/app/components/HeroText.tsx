import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import colors from 'tailwindcss/colors'; // Import Tailwind colors

export const HeroText = () => {
  // Animate a value between 0 and 1 for smooth pulsing
  const pulseValue = useMotionValue(0);

  React.useEffect(() => {
    const pulseAnimation = animate(pulseValue, [0, 1, 0], { // Animate 0 -> 1 -> 0
      duration: 4, 
      repeat: Infinity,
      ease: "easeInOut",
      // No mirror needed as we define the full cycle 0->1->0
    });

    return () => pulseAnimation.stop(); // Cleanup animation on unmount
  }, [pulseValue]);

  // Transform for Text Color (Gray -> White)
  const textColor = useTransform(
    pulseValue, 
    [0, 1],
    [colors.gray[300], colors.white]
  );
  // Transform for Glow (Gray -> White) - for DevWorks
  const textGlowWhite = useTransform(
    pulseValue,
    [0, 1],
    [
      "drop-shadow(0 0 4px rgba(200, 200, 200, 0.3))", 
      "drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))"  
    ]
  );
  // Transform for Glow (Gray -> Blue) - for Agency
  const textGlowBlue = useTransform(
    pulseValue,
    [0, 1],
    [
      "drop-shadow(0 0 4px rgba(200, 200, 200, 0.3))",     
      `drop-shadow(0 0 12px ${colors.cyan[400]}60)` 
    ]
  );

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: -80, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          opacity: { duration: 0.65, delay: 0.25, ease: [0.075, 0.82, 0.165, 1] },
          y: { duration: 0.65, delay: 0.25, ease: [0.075, 0.82, 0.165, 1] },
          scale: { duration: 0.65, delay: 0.25, ease: [0.075, 0.82, 0.165, 1] },
        }}
        // Removed pulsing color from parent H1
        style={{ 
          // color: textColor, // Removed
        }}
        className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-16 pointer-events-auto leading-tight whitespace-normal md:whitespace-nowrap font-[family-name:var(--font-geist-sans)]"
        // Removed parent text color class if any was added inadvertently
      >
        {/* Span for "Agency" with Blue Glow and static Blue Color */}
        <motion.span 
          className="text-cyan-400" // Added static blue color
          style={{ filter: textGlowBlue }}>
          Agency
        </motion.span>
        {/* Span for " DevWorks" with White Glow and Pulsing White Color */}
        <motion.span 
          style={{ filter: textGlowWhite, color: textColor }}> {/* Added pulsing text color here */} 
          DevWorks
        </motion.span> 
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.35, ease: [0.075, 0.82, 0.165, 1] }}
        className="text-2xl sm:text-3xl md:text-4xl text-gray-300 max-w-xl md:max-w-3xl font-extralight leading-relaxed tracking-wider pointer-events-auto font-[family-name:var(--font-geist-sans)]"
      >
        Making Your Business Life Easier
      </motion.p>
    </>
  );
}; 