"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { useCompany } from './CompanyContext';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { loadUserCompanySummaries } from '@/lib/firebase/firestore';

const items = [
  { name: 'Dashboard', href: '/portal' },
  { name: 'Account Settings', href: '/portal/account-settings' },
  { name: 'Billing', href: '/portal/billing' },
  { name: 'Support', href: '/portal/support' },
];

export default function PortalSecondaryNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Array<{ id: string; name: string }>>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const { setSelectedCompany } = useCompany();
  const uniqueCompanies = useMemo(() => {
    const seen = new Set<string>();
    return companies.filter((c) => {
      if (seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });
  }, [companies]);

  useEffect(() => {
    if (!user) return;
    loadUserCompanySummaries(user.uid).then((list) => {
      // de-duplicate by id
      const deDuped: Array<{ id: string; name: string }> = [];
      const seen = new Set<string>();
      for (const c of list) {
        if (!seen.has(c.id)) {
          seen.add(c.id);
          deDuped.push(c);
        }
      }
      setCompanies(deDuped);
      const firstId = deDuped[0]?.id ?? null;
      setSelected((prev) => prev ?? firstId);
      setSelectedCompany({ id: firstId, name: deDuped[0]?.name ?? null });
    });
  }, [user]);
  return (
    <div className="sticky top-28 z-40 -mx-4 sm:-mx-6 lg:-mx-8 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-6 overflow-x-auto py-3">
          {/* Company selector (left of tabs) */}
          {companies.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs font-[family-name:var(--font-geist-mono)] uppercase tracking-wider">Company</span>
              <select
                value={selected ?? ''}
                onChange={(e) => {
                  setSelected(e.target.value);
                  const c = companies.find((x) => x.id === e.target.value);
                  setSelectedCompany({ id: c?.id || null, name: c?.name || null });
                }}
                className="bg-slate-800 text-white text-xs border border-slate-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {uniqueCompanies.map((c, i) => (
                  <option key={`${c.id}-${i}`} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          )}

          <ul className="flex justify-center space-x-6">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-[family-name:var(--font-geist-mono)] uppercase tracking-wider text-xs sm:text-sm px-2 py-1 rounded-md transition-colors ${
                    active
                      ? 'text-white bg-blue-700/30 ring-1 ring-blue-500/40'
                      : 'text-slate-300 hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          </ul>
        </div>
      </div>
    </div>
  );
}


