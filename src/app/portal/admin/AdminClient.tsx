"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [receiptsByCompany, setReceiptsByCompany] = useState<Record<string, Array<{ id: string; createdAt: number; chargedAt?: number | null; totalCents: number; currency: string; numLineItems: number; cardLast4?: string | null; cardBrand?: string | null }>>>({});
  const loadedCardsForCompany = useRef<Set<string>>(new Set());
  const loadedReceiptsForCompany = useRef<Set<string>>(new Set());

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

  async function loadReceiptsForCompany(companyId: string) {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const qs = new URLSearchParams({ companyId });
      const res = await fetch(`/api/admin/receipts?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setReceiptsByCompany((prev) => ({ ...prev, [companyId]: data.receipts || [] }));
    } catch {}
  }
  // Auto-load cards and transactions for all companies present in the user list
  useEffect(() => {
    if (!user || users.length === 0) return;
    const ids = new Set<string>();
    users.forEach((u) => u.companies.forEach((c) => c.id && ids.add(c.id)));
    ids.forEach((id) => {
      if (!loadedCardsForCompany.current.has(id)) {
        loadedCardsForCompany.current.add(id);
        loadCardsForCompany(id);
      }
      if (!loadedReceiptsForCompany.current.has(id)) {
        loadedReceiptsForCompany.current.add(id);
        loadReceiptsForCompany(id);
      }
    });
  }, [users, user]);

  async function resendReceipt(id: string) {
    if (!user) return;
    const token = await user.getIdToken();
    const res = await fetch(`/api/admin/receipts/${id}/resend`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) alert('Receipt resent'); else alert('Failed to resend');
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
                    <div className="mt-4">
                      <div className="text-slate-300 text-sm mb-1">Transactions</div>
                      <div className="overflow-x-auto border border-slate-800 rounded-md">
                        <table className="min-w-full text-xs">
                          <thead className="bg-slate-900/60">
                            <tr>
                              <th className="text-left text-slate-300 px-2 py-1">Date</th>
                              <th className="text-right text-slate-300 px-2 py-1">Line Items</th>
                              <th className="text-right text-slate-300 px-2 py-1">Total</th>
                              <th className="text-left text-slate-300 px-2 py-1">Card</th>
                              <th className="px-2 py-1"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {(receiptsByCompany[c.id] || []).map((r) => {
                              const date = new Date((r.chargedAt || r.createdAt) || 0).toLocaleString();
                              const total = `$${(r.totalCents / 100).toFixed(2)} ${r.currency?.toUpperCase() || 'USD'}`;
                              const card = r.cardBrand ? `${String(r.cardBrand).toUpperCase()} •••• ${r.cardLast4 || ''}` : (r.cardLast4 ? `•••• ${r.cardLast4}` : '—');
                              return (
                                <tr key={r.id} className="border-t border-slate-800">
                                  <td className="px-2 py-1 text-slate-200">{date}</td>
                                  <td className="px-2 py-1 text-right text-slate-300">{r.numLineItems}</td>
                                  <td className="px-2 py-1 text-right text-slate-200">{total}</td>
                                  <td className="px-2 py-1 text-slate-300">{card}</td>
                                  <td className="px-2 py-1 text-right space-x-2">
                                    <a href={`/portal/billing/receipt/${r.id}`} className="text-blue-400 hover:text-blue-300 underline">View</a>
                                    <button onClick={() => resendReceipt(r.id)} className="text-cyan-400 hover:text-cyan-300">Resend</button>
                                  </td>
                                </tr>
                              );
                            })}
                            {!(receiptsByCompany[c.id]?.length) && (
                              <tr>
                                <td colSpan={5} className="px-3 py-3 text-center text-slate-400">No transactions loaded</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
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


