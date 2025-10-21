"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { useCompany } from './CompanyContext';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { loadUserCompanySummaries } from '@/lib/firebase/firestore';

const baseItems = [
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
  const isAdmin = (() => {
    const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS || '';
    const allowed = new Set(raw.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean));
    const email = (user?.email || '').toLowerCase();
    return email && allowed.has(email);
  })();

  const items = isAdmin ? [...baseItems, { name: 'Admin', href: '/portal/admin' }] : baseItems;
  const row2Names = new Set(['Dashboard', 'Account Settings']);
  const row3Names = new Set(['Billing', 'Support', 'Admin']);
  const row2Items = items.filter(i => row2Names.has(i.name));
  const row3Items = items.filter(i => row3Names.has(i.name));

  return (
    <div className="sticky top-20 sm:top-24 z-40 -mx-4 sm:-mx-6 lg:-mx-8 -mt-20 sm:-mt-24 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Mobile layout: 3 rows */}
        <div className="block sm:hidden py-3">
          {/* Row 1: Company selector */}
          {companies.length > 0 && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-slate-400 text-xs font-[family-name:var(--font-geist-mono)] uppercase tracking-wider">Company</span>
              <select
                value={selected ?? ''}
                onChange={(e) => {
                  setSelected(e.target.value);
                  const c = companies.find((x) => x.id === e.target.value);
                  setSelectedCompany({ id: c?.id || null, name: c?.name || null });
                }}
                className="bg-slate-800 text-white text-xs border border-slate-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[65%]"
              >
                {uniqueCompanies.map((c, i) => (
                  <option key={`${c.id}-${i}`} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Row 2: Dashboard | Account Settings */}
          <div className="flex items-center justify-center gap-3 text-[11px]">
            {row2Items.map((item, idx) => {
              const active = pathname === item.href;
              return (
                <div key={item.href} className="flex items-center">
                  <Link
                    href={item.href}
                    className={`px-1 py-0.5 rounded-sm font-[family-name:var(--font-geist-mono)] uppercase tracking-wider ${active ? 'text-white underline underline-offset-4 decoration-blue-400' : 'text-slate-300'}`}
                  >
                    {item.name}
                  </Link>
                  {idx < row2Items.length - 1 && <span className="px-2 text-slate-500">|</span>}
                </div>
              );
            })}
          </div>

          {/* Row 3: Billing | Support | Admin */}
          <div className="mt-1 flex items-center justify-center gap-3 text-[11px]">
            {row3Items.map((item, idx) => {
              const active = pathname === item.href;
              return (
                <div key={item.href} className="flex items-center">
                  <Link
                    href={item.href}
                    className={`px-1 py-0.5 rounded-sm font-[family-name:var(--font-geist-mono)] uppercase tracking-wider ${active ? 'text-white underline underline-offset-4 decoration-blue-400' : 'text-slate-300'}`}
                  >
                    {item.name}
                  </Link>
                  {idx < row3Items.length - 1 && <span className="px-2 text-slate-500">|</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop/tablet layout: original */}
        <div className="hidden sm:flex items-center justify-center gap-6 overflow-x-auto py-3">
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
                    className={`font-[family-name:var(--font-geist-mono)] uppercase tracking-wider text-sm px-2 py-1 rounded-md transition-colors ${
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


