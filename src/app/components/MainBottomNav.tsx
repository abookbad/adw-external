"use client";

import React from 'react';
import Link from 'next/link';

const navItems = [
  { name: "Home", href: "/" }, // Or 'Overview'
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  // Add other relevant items like 'Blog', 'Careers', etc. if needed
];

export const PrimaryTopNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950 text-white py-4 border-b border-slate-700/50">
      <div className="container mx-auto flex justify-center items-center px-2 xs:px-4 max-w-full">
        <ul className="flex items-center space-x-3 xs:space-x-5 sm:space-x-7 md:space-x-10">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className="font-[family-name:var(--font-geist-mono)] text-sm xs:text-sm sm:text-base md:text-lg text-slate-300 hover:text-cyan-400 transition-colors tracking-wider uppercase p-2 sm:p-3"
              >
                {item.name}
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