"use client";

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const TopNavigationBar = () => {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 p-10 mt-4 max-w-7xl w-auto 
                  bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-2xl shadow-cyan-400/40 border border-slate-700/50 
                  font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-between">
        <Logo />
        <ul className="flex items-center space-x-8 ml-48">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="text-gray-300 hover:text-green-400 transition-colors font-[family-name:var(--font-geist-mono)] text-lg tracking-wider uppercase">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}; 