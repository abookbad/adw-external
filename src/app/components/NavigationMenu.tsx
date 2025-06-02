import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

// Variants for the list item container to stagger children
const listItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: 0.2 + i * 0.05, // Reduced delay and stagger
      staggerChildren: 0.015, // Reduced stagger
      delayChildren: 0.2 + i * 0.05, // Reduced delay
    },
  }),
};

// Variants for each character reveal
const characterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: 'easeOut' }, // Reduced duration
  },
};

export const NavigationMenu = () => {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Get in Touch", href: "/contact" },
  ];

  return (
    <motion.div
      className="absolute left-300 top-1/2 transform -translate-y-1/2 backdrop-blur-lg rounded-lg p-8 shadow-xl w-80 h-auto flex flex-col"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.05, ease: "easeInOut" }} // Reduced duration and delay
    >
      <motion.ul className="space-y-5">
        {navItems.map((item, i) => (
          <motion.li
            key={item.name}
            className="relative font-[family-name:var(--font-geist-mono)] font-normal text-xl text-cyan-200/70 hover:text-cyan-100 transition-colors duration-200 cursor-pointer group py-2"
            custom={i}
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href={item.href} passHref legacyBehavior>
              <a className="relative z-10" aria-label={item.name}>
                {item.name.split('').map((char, charIndex) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    variants={characterVariants}
                    style={{ display: 'inline-block' }}
                    className={char === ' ' ? 'inline' : ''}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </a>
            </Link>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-cyan-300/80 rounded-full blur-[1px] group-hover:w-full transition-all duration-300 ease-out"
              initial={{ width: "0%" }}
            />
            <div className="absolute -inset-x-2 -inset-y-1 rounded bg-cyan-500/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}; 