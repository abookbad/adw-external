"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/firebase/auth';

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
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    try {
      await logout();
      router.replace('/');
      if (typeof window !== 'undefined') {
        // Fallback in case router navigation is interrupted
        setTimeout(() => {
          if (window.location.pathname !== '/') window.location.href = '/';
        }, 50);
      }
    } catch {
      // noop
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950 text-white py-3 sm:py-4 border-b border-slate-700/50 hover:bg-slate-900/95 hover:border-cyan-400/30 transition-all duration-300">
      <div className="container mx-auto flex justify-center items-center px-2 xs:px-3 sm:px-4 max-w-full w-full overflow-x-auto">
        <ul className="flex items-center space-x-2 xs:space-x-3 sm:space-x-5 md:space-x-7 mx-auto whitespace-nowrap">
          {/* Logo */}
          <li className="flex items-center">
            <Link href="/" aria-label="ADW Home" className="inline-flex items-center p-1 sm:p-2 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-fuchsia-600/30 via-purple-600/25 to-cyan-400/30 blur-md opacity-70 group-hover:opacity-90 group-hover:blur-lg transition" />
                <Image 
                  src="/adw_final.png" 
                  alt="ADW" 
                  fill={true}
                  sizes="(min-width: 768px) 56px, (min-width: 640px) 48px, 40px"
                  className="relative z-[1] object-contain drop-shadow-[0_0_10px_rgba(147,51,234,0.55)] group-hover:drop-shadow-[0_0_18px_rgba(34,211,238,0.8)] transition-transform duration-200 group-hover:scale-105" 
                  priority 
                />
              </div>
            </Link>
          </li>
          

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
            <div className="font-[family-name:var(--font-geist-mono)] text-xs xs:text-sm sm:text-base md:text-lg text-slate-300 hover:text-cyan-400 transition-colors tracking-normal sm:tracking-wider uppercase p-1.5 sm:p-3 cursor-pointer flex items-center gap-1">
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
                  className="fixed -translate-x-1/2 w-64 bg-slate-900/95 backdrop-blur-md rounded-md shadow-2xl border border-slate-700/50 py-2 px-1 z-[999] max-h-[70vh] overflow-auto"
                  style={menuPos ? { left: menuPos.left, top: menuPos.top } : undefined}
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
                className="font-[family-name:var(--font-geist-mono)] text-xs xs:text-sm sm:text-base md:text-lg text-slate-300 hover:text-cyan-400 transition-colors tracking-normal sm:tracking-wider uppercase p-1.5 sm:p-3"
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
          {user ? (
            <li className="relative flex items-center">
              <Link href="/portal" className="bg-blue-700 hover:bg-blue-600 text-white font-[family-name:var(--font-geist-mono)] tracking-wider uppercase py-1.5 px-6 rounded-md text-sm sm:text-base transition-colors shadow-lg shadow-blue-500/40 hover:shadow-blue-400/60 ring-1 ring-blue-400/40">My Account</Link>
              <button 
                onClick={handleLogout}
                className="absolute top-full mt-1 left-0 right-0 block w-full text-center whitespace-nowrap text-[12px] xs:text-xs text-slate-300 hover:text-cyan-400 transition-colors font-[family-name:var(--font-geist-mono)] tracking-wider uppercase"
              >
                Sign out
              </button>
            </li>
          ) : (
            <li className="relative flex flex-col items-center sm:flex-row">
              <Link 
                href="/login" 
                className="bg-blue-700 hover:bg-blue-600 text-white font-[family-name:var(--font-geist-mono)] tracking-normal sm:tracking-wider uppercase py-1 px-3 sm:px-5 md:px-7 rounded-md text-sm xs:text-sm sm:text-base md:text-lg transition-colors shadow-lg shadow-blue-500/40 hover:shadow-blue-400/60 ring-1 ring-blue-400/40"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="block w-full text-center whitespace-nowrap text-[10px] xs:text-xs text-slate-300 hover:text-cyan-400 transition-colors font-[family-name:var(--font-geist-mono)] tracking-normal sm:tracking-wider uppercase mt-1 sm:mt-0 sm:absolute sm:top-full sm:left-0 sm:right-0"
              >
                Or Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}; 