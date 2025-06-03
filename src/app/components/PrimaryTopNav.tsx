"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Get in Touch", href: "/contact", mobileText: "Contact" },
];

const serviceItems = [
  { name: "AI Voice Agents", href: "/services/ai-voice-agents" },
  { name: "SEO Services", href: "/services/seo-services" },
  { name: "AI Marketing", href: "/services/ai-marketing" },
  { name: "Web Design", href: "/services/web-design" },
  { name: "Business Analytics", href: "/services/business-analytics" },
  { name: "Business Automation", href: "/services/business-automation" },
];

export const PrimaryTopNav = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950 text-white py-4 border-b border-slate-700/50 hover:bg-slate-900/95 hover:border-cyan-400/30 transition-all duration-300">
      <div className="container mx-auto flex justify-center items-center px-2 xs:px-4 max-w-full">
        <ul className="flex items-center space-x-3 xs:space-x-5 sm:space-x-7 md:space-x-10">
          {/* Home */}
          <li>
            <Link 
              href="/" 
              className="font-[family-name:var(--font-geist-mono)] text-sm xs:text-sm sm:text-base md:text-lg text-slate-300 hover:text-cyan-400 transition-colors tracking-wider uppercase p-2 sm:p-3"
            >
              Home
            </Link>
          </li>

          {/* Services Dropdown */}
          <li 
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <div className="font-[family-name:var(--font-geist-mono)] text-sm xs:text-sm sm:text-base md:text-lg text-slate-300 hover:text-cyan-400 transition-colors tracking-wider uppercase p-2 sm:p-3 cursor-pointer flex items-center gap-1">
              <Link href="/services">Services</Link>
              <motion.svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="currentColor"
                animate={{ rotate: isServicesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="hidden sm:block"
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </div>
            
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full mt-2 left-0 w-64 bg-slate-900/95 backdrop-blur-md rounded-md shadow-2xl border border-slate-700/50 py-2 px-1"
                >
                  <div className="space-y-0">
                    {serviceItems.map((service, index) => (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15, delay: index * 0.02 }}
                      >
                        <Link
                          href={service.href}
                          className="block px-3 py-2 text-sm font-[family-name:var(--font-geist-mono)] tracking-wider text-white hover:text-cyan-400 transition-all duration-200 rounded-sm hover:bg-slate-800/50 group"
                        >
                          <span className="group-hover:ml-6 transition-all duration-200">
                            <span className="opacity-0 group-hover:opacity-100 absolute -ml-6 transition-all duration-200 text-cyan-400">{'➤'}</span>
                            {service.name}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                    <hr className="border-slate-600/50 my-1" />
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15, delay: serviceItems.length * 0.02 }}
                    >
                      <Link
                        href="/services"
                        className="block px-3 py-2 text-sm font-[family-name:var(--font-geist-mono)] tracking-wider font-bold text-white hover:text-cyan-400 transition-all duration-200 rounded-sm hover:bg-slate-800/50 group"
                      >
                        <span className="group-hover:ml-6 transition-all duration-200">
                          <span className="opacity-0 group-hover:opacity-100 absolute -ml-6 transition-all duration-200 text-cyan-400">{'➤'}</span>
                          View All Services →
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Other nav items */}
          {navItems.slice(1).map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className="font-[family-name:var(--font-geist-mono)] text-sm xs:text-sm sm:text-base md:text-lg text-slate-300 hover:text-cyan-400 transition-colors tracking-wider uppercase p-2 sm:p-3"
              >
                {item.mobileText ? (
                  <>
                    <span className="sm:hidden">{item.mobileText}</span>
                    <span className="hidden sm:inline">{item.name}</span>
                  </>
                ) : (
                  item.name
                )}
              </Link>
            </li>
          ))}
        </ul>
        {/* Optional: A 'Register' or CTA button on the right, like the Sui site */}
        {/* <Link href="/contact" className="ml-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md text-sm">
          Get Started
        </Link> */}
      </div>
    </nav>
  );
}; 