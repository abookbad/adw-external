"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../components/AuthProvider';

type LineItem = { id: string; description: string; quantity: number; unitPrice: string };

export default function ChargeClient() {
  const { user } = useAuth();
  const params = useSearchParams();
  const router = useRouter();
  const uid = params.get('uid') || '';
  const email = params.get('email') || '';
  const companyId = params.get('companyId') || '';
  const paymentMethodId = params.get('pm') || '';
  const companyName = params.get('companyName') || '';

  const [items, setItems] = useState<LineItem[]>([
    { id: `${Date.now()}`, description: '', quantity: 1, unitPrice: '' },
  ]);
  const [memo, setMemo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const totalCents = useMemo(() => items.reduce((sum, li) => {
    const unit = Math.round((parseFloat(li.unitPrice || '0') || 0) * 100);
    return sum + (li.quantity || 0) * unit;
  }, 0), [items]);

  function updateItem(id: string, partial: Partial<LineItem>) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...partial } : it)));
  }
  function addItem() {
    setItems((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, description: '', quantity: 1, unitPrice: '' }]);
  }
  function removeItem(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    try {
      setSubmitting(true);
      const token = await user.getIdToken();
      const lineItems = items
        .filter((x) => (x.description || '').trim().length > 0 && (parseFloat(x.unitPrice || '0') || 0) > 0)
        .map((x) => ({ description: x.description.trim(), quantity: Math.max(1, x.quantity || 1), unitPriceCents: Math.round((parseFloat(x.unitPrice) || 0) * 100) }));
      const res = await fetch('/api/admin/charge-with-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userEmail: email, companyId, paymentMethodId: paymentMethodId || undefined, currency: 'usd', lineItems, memo }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to charge');
      alert('Charged successfully');
      router.push('/portal/admin');
    } catch (err: any) {
      alert(err?.message || 'Charge failed');
    } finally {
      setSubmitting(false);
    }
  }

  const totalDisplay = `$${(totalCents / 100).toFixed(2)}`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Charge {email}</h1>
      <p className="text-slate-400 text-sm">Company: <span className="text-slate-200">{companyName || companyId}</span></p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.id} className="grid grid-cols-1 sm:grid-cols-6 gap-2">
              <input
                className="sm:col-span-3 bg-slate-800 text-white text-sm border border-slate-700 rounded-md px-3 py-2"
                placeholder="Description"
                value={it.description}
                onChange={(e) => updateItem(it.id, { description: e.target.value })}
              />
              <input
                className="sm:col-span-1 bg-slate-800 text-white text-sm border border-slate-700 rounded-md px-3 py-2"
                placeholder="Qty"
                type="number"
                min={1}
                value={it.quantity}
                onChange={(e) => updateItem(it.id, { quantity: Number(e.target.value) })}
              />
              <input
                className="sm:col-span-1 bg-slate-800 text-white text-sm border border-slate-700 rounded-md px-3 py-2"
                placeholder="Unit Price (USD)"
                type="number"
                step="0.01"
                min={0}
                value={it.unitPrice}
                onChange={(e) => updateItem(it.id, { unitPrice: e.target.value })}
              />
              <button type="button" className="sm:col-span-1 text-xs px-2 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700" onClick={() => removeItem(it.id)}>Remove</button>
            </div>
          ))}
          <button type="button" className="text-xs px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700" onClick={addItem}>Add Item</button>
        </div>
        <div>
          <textarea
            className="w-full bg-slate-800 text-white text-sm border border-slate-700 rounded-md px-3 py-2"
            placeholder="Memo (optional)"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-slate-200 font-semibold">Total: {totalDisplay}</div>
          <div className="space-x-2">
            <button type="button" className="text-xs px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700" onClick={() => router.push('/portal/admin')}>Cancel</button>
            <button type="submit" disabled={submitting} className="text-xs px-3 py-2 rounded-md bg-green-700/30 border border-green-500/40 text-white hover:bg-green-700/50">Charge</button>
          </div>
        </div>
      </form>
    </div>
  );
}


