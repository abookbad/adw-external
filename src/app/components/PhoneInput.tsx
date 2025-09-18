"use client";

import React from 'react';

type PhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
};

function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  // If user pasted/typed +1 or 1XXXXXXXXXX, drop the leading country code
  if (digits.length > 10 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);
  const len = digits.length;
  if (len === 0) return '';
  if (len < 4) return `(${digits}`;
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function PhoneInput({ value, onChange, className = '', placeholder = '(555) 123-4567' }: PhoneInputProps) {
  return (
    <input
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      value={formatPhone(value)}
      onChange={(e) => onChange(formatPhone(e.target.value))}
      placeholder={placeholder}
      className={className}
    />
  );
}


