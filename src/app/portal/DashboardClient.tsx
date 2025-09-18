"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { useCompany } from '../components/CompanyContext';
import { loadCompanyMembers } from '@/lib/firebase/firestore';

type StripePM = { id: string; brand?: string; last4?: string; exp_month?: number; exp_year?: number; isDefault?: boolean };

export default function DashboardClient() {
  const { user } = useAuth();
  const { selectedCompany } = useCompany();
  const [members, setMembers] = useState<Array<{ userId: string; role: string; email: string }>>([]);
  const [methods, setMethods] = useState<StripePM[]>([]);

  useEffect(() => {
    (async () => {
      if (selectedCompany.id) {
        try {
          const list = await loadCompanyMembers(selectedCompany.id);
          setMembers(list);
        } catch {}
      }
    })();
  }, [selectedCompany.id]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const qs = new URLSearchParams({ email: user.email || '', companyId: selectedCompany.id || '' });
      const d = await fetch(`/api/stripe/payment-methods?${qs.toString()}`).then((r) => r.json()).catch(() => null);
      if (d?.paymentMethods) setMethods(d.paymentMethods as StripePM[]);
    })();
  }, [user, selectedCompany.id]);

  const defaultPm = methods.find((m) => m.isDefault) || methods[0];

  return (
    <div className="space-y-6">
      {/* Top row: company summary + billing status */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="rounded-lg border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Company Summary</h2>
          <div className="text-slate-300 space-y-2">
            <div><span className="text-slate-400">Active company:</span> {selectedCompany.name || '—'}</div>
            <div><span className="text-slate-400">Members:</span> {members.length}</div>
          </div>
          <div className="mt-4 flex gap-2">
            <a href="/portal/account-settings" className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-md text-sm">Account Settings</a>
            <a href="/portal/billing" className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-md text-sm">Billing</a>
            <a href="/portal/support" className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-md text-sm">Support</a>
          </div>
        </section>
        <section className="rounded-lg border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Payment Status</h2>
          {defaultPm ? (
            <div className="text-slate-300">
              <div>{(defaultPm.brand || '').toUpperCase()} •••• •••• •••• {defaultPm.last4}</div>
              <div className="text-xs text-slate-400">Exp {defaultPm.exp_month}/{defaultPm.exp_year}</div>
            </div>
          ) : (
            <div className="text-slate-400">No card on file.</div>
          )}
          <a href="/portal/billing" className="mt-4 inline-block bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm">Manage Payment Methods</a>
        </section>
      </div>

      {/* Removed Active Projects and Support Requests sections per request */}

      {/* Announcements */}
      <section className="rounded-lg border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Announcements</h2>
        <div className="text-slate-400 text-sm">Welcome to your ADW client portal. Updates and release notes will appear here.</div>
      </section>
    </div>
  );
}


