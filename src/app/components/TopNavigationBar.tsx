"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Get in Touch", href: "/contact" },
];

const serviceItems = [
  { name: "AI Voice Agents", href: "/services/ai-voice-agents", color: "text-blue-400" },
  { name: "SEO Services", href: "/services/seo-services", color: "text-green-400" },
  { name: "AI Marketing", href: "/services/ai-marketing", color: "text-purple-400" },
  { name: "Web Design", href: "/services/web-design", color: "text-orange-400" },
  { name: "Business Analytics", href: "/services/business-analytics", color: "text-cyan-400" },
  { name: "Business Automation", href: "/services/business-automation", color: "text-emerald-400" },
];

export const TopNavigationBar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(null);

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 p-3 sm:p-5 md:p-8 mt-1 sm:mt-3 max-w-7xl w-auto 
                  bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-2xl shadow-cyan-400/40 border border-slate-700/50 
                  font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-between">
        <Logo />
        <ul className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 ml-2 sm:ml-6 md:ml-12 overflow-x-auto whitespace-nowrap">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="text-gray-300 hover:text-green-400 transition-colors font-[family-name:var(--font-geist-mono)] text-xs sm:text-sm md:text-base tracking-normal sm:tracking-wider uppercase">
                {item.name}
              </Link>
            </li>
          ))}
          
          {/* Services Dropdown */}
          <li 
            className="relative"
            onMouseEnter={(e) => {
              setIsServicesOpen(true);
              const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
              setMenuPos({ left: r.left + r.width / 2, top: r.bottom + 8 });
            }}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <div className="text-gray-300 hover:text-green-400 transition-colors font-[family-name:var(--font-geist-mono)] text-xs sm:text-sm md:text-base tracking-normal sm:tracking-wider uppercase cursor-pointer flex items-center gap-1">
              <Link href="/services">Services</Link>
              <motion.svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="currentColor"
                animate={{ rotate: isServicesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
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
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="fixed -translate-x-1/2 w-64 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700/50 py-4 px-2 z-[999] max-h-[70vh] overflow-auto"
                  style={menuPos ? { left: menuPos.left, top: menuPos.top } : undefined}
                >
                  <div className="space-y-1">
                    {serviceItems.map((service, index) => (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <Link
                          href={service.href}
                          className={`block px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-slate-700/50 ${service.color} hover:scale-105 hover:translate-x-1`}
                        >
                          {service.name}
                        </Link>
                      </motion.div>
                    ))}
                    <hr className="border-slate-600/50 my-2" />
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: serviceItems.length * 0.05 }}
                    >
                      <Link
                        href="/services"
                        className="block px-4 py-3 text-sm font-bold text-white hover:text-green-400 transition-all duration-200 rounded-lg hover:bg-slate-700/50 hover:scale-105 hover:translate-x-1"
                      >
                        View All Services →
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li className="relative flex flex-col items-center sm:flex-row">
            <Link href="/login" className="bg-blue-700 hover:bg-blue-600 text-white font-[family-name:var(--font-geist-mono)] tracking-normal sm:tracking-wider uppercase py-1 px-3 sm:px-5 rounded-md text-sm transition-colors shadow-lg shadow-blue-500/40 hover:shadow-blue-400/60 ring-1 ring-blue-400/40">
              Login
            </Link>
            <Link href="/register" className="block w-full text-center whitespace-nowrap text-[9px] sm:text-[11px] text-slate-300 hover:text-green-400 transition-colors font-[family-name:var(--font-geist-mono)] tracking-normal sm:tracking-wider uppercase mt-1 sm:mt-0 sm:absolute sm:top-full sm:left-0 sm:right-0">
              Or Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}; 