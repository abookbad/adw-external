"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthProvider';

type CompanyRow = { id: string; name: string; role: string; stripeCustomerId: string | null };
type UserRow = { uid: string; email: string; firstName: string; lastName: string; companies: CompanyRow[] };

type StripePM = { id: string; brand?: string; last4?: string; exp_month?: number; exp_year?: number; isDefault?: boolean; customerId?: string | null };

export default function AdminClient() {
  const { user } = useAuth();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cardsByCustomerId, setCardsByCustomerId] = useState<Record<string, StripePM[]>>({});
  const [amountByUid, setAmountByUid] = useState<Record<string, string>>({});
  const [chargingUid, setChargingUid] = useState<string | null>(null);

  const adminEmails = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS || '';
    return new Set(
      raw
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
    );
  }, []);

  useEffect(() => {
    if (!user) return;
    const email = (user.email || '').toLowerCase();
    setAllowed(adminEmails.has(email));
  }, [user, adminEmails]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      try {
        setLoading(true);
        const token = await user.getIdToken();
        const res = await fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error('Failed to load users');
        const data = await res.json();
        setUsers(data.users || []);
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  async function loadCardsForCompany(companyId: string) {
    try {
      const qs = new URLSearchParams({ companyId });
      const res = await fetch(`/api/stripe/payment-methods?${qs.toString()}`);
      const data = await res.json();
      const pms: StripePM[] = data.paymentMethods || [];
      if (pms.length && pms[0]?.customerId) {
        setCardsByCustomerId((prev) => ({ ...prev, [String(pms[0].customerId)]: pms }));
      }
    } catch {}
  }

  function goToCharge(u: UserRow, company: CompanyRow, paymentMethodId?: string | null) {
    const qs = new URLSearchParams({ uid: u.uid, email: u.email, companyId: company.id, companyName: company.name, pm: paymentMethodId || '' });
    router.push(`/portal/admin/charge?${qs.toString()}`);
  }

  if (!allowed) {
    return <div className="text-slate-300">Access denied</div>;
  }
  if (loading) return <div className="text-slate-300">Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Admin: Users and Billing</h1>
      <div className="space-y-4">
        {users.map((u) => (
          <div key={u.uid} className="border border-slate-700 rounded-lg p-4 bg-slate-900/40">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="text-white font-medium">{u.firstName} {u.lastName}</div>
                <div className="text-slate-300 text-sm">{u.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  placeholder="Amount (USD)"
                  className="bg-slate-800 text-white text-sm border border-slate-700 rounded-md px-2 py-1 w-40"
                  value={amountByUid[u.uid] || ''}
                  onChange={(e) => setAmountByUid((prev) => ({ ...prev, [u.uid]: e.target.value }))}
                />
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {u.companies.map((c) => {
                const knownCustomerId = c.stripeCustomerId || '';
                const cardList = knownCustomerId ? cardsByCustomerId[knownCustomerId] : undefined;
                return (
                  <div key={c.id} className="rounded-md border border-slate-800 p-3 bg-slate-900/60">
                    <div className="flex items-center justify-between">
                      <div className="text-slate-200 text-sm">Company: <span className="text-white font-medium">{c.name}</span> <span className="text-slate-400">({c.role})</span></div>
                      <button
                        className="text-xs px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700"
                        onClick={() => loadCardsForCompany(c.id)}
                      >Load Cards</button>
                    </div>
                    <div className="mt-2">
                      {!cardList && <div className="text-slate-400 text-sm">No cards loaded. Click Load Cards.</div>}
                      {cardList && cardList.length === 0 && <div className="text-slate-400 text-sm">No saved cards.</div>}
                      {cardList && cardList.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {cardList.map((pm) => (
                            <button
                              key={pm.id}
                              className="text-xs px-2 py-1 rounded-md bg-blue-700/30 border border-blue-500/40 text-white hover:bg-blue-700/50"
                              onClick={() => goToCharge(u, c, pm.id)}
                            >{pm.brand} •••• {pm.last4} {pm.isDefault ? '(default)' : ''}</button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <button
                        className="text-xs px-2 py-1 rounded-md bg-green-700/30 border border-green-500/40 text-white hover:bg-green-700/50"
                        onClick={() => goToCharge(u, c, null)}
                      >Charge using default card</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


