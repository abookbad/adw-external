"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../../components/AuthProvider';

export default function ReceiptClient() {
  const params = useParams();
  const id = (params?.id as string) || '';
  const { user } = useAuth();
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!user || !id) return;
      try {
        const token = await user.getIdToken();
        const res = await fetch(`/api/billing/receipts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        const d = await res.json();
        if (!res.ok) throw new Error(d?.error || 'Failed to load');
        setData(d);
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
      }
    })();
  }, [user, id]);

  if (error) return <div className="text-red-400">{error}</div>;
  if (!data) return <div className="text-slate-300">Loading...</div>;

  const items = Array.isArray(data.lineItems) ? data.lineItems : [];
  const feeCents = Number(data.feeCents || 0);
  const pct = Number(data.feePercent || 0);
  const money = (cents: number) => `$${(Number(cents || 0) / 100).toFixed(2)}`;
  const paymentId = (data.chargeId || data.paymentIntentId || '').toString();
  const chargedAt = new Date(Number(data.chargedAt || data.createdAt || 0)).toLocaleString();

  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Payment Receipt</h2>
        <div className="text-slate-400 text-xs">Transaction ID: <span className="text-slate-200">{paymentId}</span></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-sm">
        <div className="text-slate-300">Date: <span className="text-slate-200">{chargedAt}</span></div>
        <div className="text-slate-300">Amount: <span className="text-slate-200">{money(data.totalCents)} {String(data.currency || 'USD').toUpperCase()}</span></div>
        <div className="text-slate-300">Card: <span className="text-slate-200">{data.cardBrand ? `${String(data.cardBrand).toUpperCase()} •••• ${data.cardLast4 || ''}` : (data.cardLast4 ? `•••• ${data.cardLast4}` : '—')}</span></div>
        {data.memo ? <div className="text-slate-300">Memo: <span className="text-slate-200">{data.memo}</span></div> : null}
      </div>

      <div className="overflow-x-auto border border-slate-800 rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60">
            <tr>
              <th className="text-left text-slate-300 px-3 py-2">Description</th>
              <th className="text-right text-slate-300 px-3 py-2">Qty</th>
              <th className="text-right text-slate-300 px-3 py-2">Unit</th>
              <th className="text-right text-slate-300 px-3 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((li: any, idx: number) => (
              <tr key={idx} className="border-t border-slate-800">
                <td className="px-3 py-2 text-slate-200">{li.description}</td>
                <td className="px-3 py-2 text-right text-slate-300">{li.quantity}</td>
                <td className="px-3 py-2 text-right text-slate-300">{money(li.unitPriceCents)}</td>
                <td className="px-3 py-2 text-right text-slate-200">{money(li.quantity * li.unitPriceCents)}</td>
              </tr>
            ))}
            {feeCents > 0 && (
              <tr className="border-t border-slate-800">
                <td className="px-3 py-2 text-slate-200">Processing Fee ({pct}%)</td>
                <td className="px-3 py-2 text-right text-slate-300">1</td>
                <td className="px-3 py-2 text-right text-slate-300">{money(feeCents)}</td>
                <td className="px-3 py-2 text-right text-slate-200">{money(feeCents)}</td>
              </tr>
            )}
            <tr className="border-t border-slate-800">
              <td className="px-3 py-2 text-right text-slate-400" colSpan={3}>Total</td>
              <td className="px-3 py-2 text-right text-slate-200 font-semibold">{money(data.totalCents)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-slate-400 space-y-1">
        <div>This charge will appear on your statement as <span className="text-slate-200 font-semibold">AGENCY DEVWORKS</span>.</div>
        <div>Questions? Contact us at <a className="text-blue-400 hover:text-blue-300" href="mailto:official@agencydevworks.ai">official@agencydevworks.ai</a> or +1 888-869-1662.</div>
        <div>Business address: 20830 Stevens Creek Blvd #1103, Cupertino, 95014</div>
        <div>Refund policy: <a className="text-blue-400 hover:text-blue-300" href="/terms/billing" target="_blank" rel="noreferrer">View details</a></div>
      </div>
      <div className="mt-3 text-[11px] text-slate-500 text-center border-t border-slate-800 pt-3">Secured by Stripe • © {new Date().getFullYear()} Agency DevWorks</div>
    </div>
  );
}


