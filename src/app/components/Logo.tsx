"use client";

import React from 'react';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" className="text-4xl font-bold text-white hover:text-cyan-400 transition-colors font-[family-name:var(--font-geist-sans)]">
      Agency DevWorks
    </Link>
  );
}; 