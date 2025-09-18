"use client";

import React, { createContext, useContext, useState } from 'react';

export type CompanySelection = { id: string | null; name?: string | null };

type CompanyContextT = {
  selectedCompany: CompanySelection;
  setSelectedCompany: (c: CompanySelection) => void;
};

const CompanyContext = createContext<CompanyContextT | undefined>(undefined);

export function useCompany() {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error('useCompany must be used within CompanyProvider');
  return ctx;
}

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCompany, setSelectedCompany] = useState<CompanySelection>({ id: null, name: null });
  return (
    <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}


