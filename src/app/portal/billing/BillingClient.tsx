"use client";

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useAuth } from '../../components/AuthProvider';
import { useCompany } from '../../components/CompanyContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

function AddCardForm({ clientSecret, customerId, onUpdated }: { clientSecret: string; customerId: string | null; onUpdated: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [postal, setPostal] = useState('');
  const [accepted, setAccepted] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setMessage(null);
    const card = elements.getElement(CardNumberElement);
    if (!card) return;
    // Confirm setup using CardElement and clientSecret (attaches PM to customer)
    if (!accepted) {
      setMessage('Please accept the Billing Terms & Payment Authorization.');
      setLoading(false);
      return;
    }
    const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card,
        billing_details: { address: { postal_code: postal || undefined } },
      },
      // Do not redirect; handle inline
      // Stripe.JS v3 ignores redirect param here; our clientSecret is from a non-redirect SI
    });
    if (error) setMessage(error.message || 'Failed to attach card');
    else setMessage('Card saved successfully');
    setLoading(false);
    if (!error && setupIntent?.payment_method) {
      // make default immediately
      const pmId = typeof setupIntent.payment_method === 'string' ? setupIntent.payment_method : setupIntent.payment_method.id;
      if (customerId) {
        try {
          await fetch('/api/stripe/set-default-payment-method', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customerId, paymentMethodId: pmId }),
          });
        } catch {}
      }
      onUpdated();
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="border border-slate-700 rounded-md p-3 bg-slate-800 md:col-span-2">
          <CardNumberElement
            options={{
              style: {
                base: {
                  color: '#ffffff',
                  fontSize: '16px',
                  '::placeholder': { color: '#94a3b8' },
                },
                invalid: { color: '#fda4af' },
              },
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-slate-700 rounded-md p-3 bg-slate-800">
            <CardExpiryElement
              options={{
                style: {
                  base: { color: '#ffffff', '::placeholder': { color: '#94a3b8' } },
                  invalid: { color: '#fda4af' },
                },
              }}
            />
          </div>
          <div className="border border-slate-700 rounded-md p-3 bg-slate-800">
            <CardCvcElement
              options={{
                style: {
                  base: { color: '#ffffff', '::placeholder': { color: '#94a3b8' } },
                  invalid: { color: '#fda4af' },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Billing ZIP/Postal Code</label>
        <input
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
          placeholder="ZIP / Postal Code"
          className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="button"
        onClick={() => setAccepted(!accepted)}
        className={`flex items-start gap-2 text-left text-sm rounded-md px-2 py-1 ${accepted ? 'bg-slate-800/70' : 'bg-slate-800/40'} border border-slate-700 hover:border-cyan-500 transition-colors`}
      >
        <span className={`mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-sm border ${accepted ? 'bg-cyan-600 border-cyan-500' : 'border-slate-500'}`}>
          {accepted ? '✓' : ''}
        </span>
        <span className="text-slate-300">I agree to the <a href="/terms/billing" target="_blank" className="text-cyan-400 hover:text-cyan-300 underline">Billing Terms</a></span>
      </button>
      <button disabled={loading || !stripe || !accepted} className="bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-2 px-4 rounded-md">Save payment method</button>
      {message && <p className="text-sm text-slate-300">{message}</p>}
    </form>
  );
}

export default function BillingClient() {
  const { user } = useAuth();
  const { selectedCompany } = useCompany();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [methods, setMethods] = useState<Array<{ id: string; brand?: string; last4?: string; exp_month?: number; exp_year?: number; isDefault?: boolean }>>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user) return;
    // Load current PM
    const qs = new URLSearchParams({ email: user.email || '', companyId: selectedCompany.id || '' });
    fetch(`/api/stripe/payment-methods?${qs.toString()}`)
      .then((r) => r.json())
      .then((d) => setMethods(d.paymentMethods || []));
  }, [user]);

  async function beginAddOrUpdateCard() {
    if (!user) return;
    setShowForm(true);
    const res = await fetch('/api/stripe/create-setup-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId, companyId: selectedCompany.id }),
    });
    const data = await res.json();
    setClientSecret(data.clientSecret);
    setCustomerId(data.customerId);
  }

  return (
      <div className="rounded-lg border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Billing</h2>
      <div className="mb-4">
        <button onClick={beginAddOrUpdateCard} className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Add a card</button>
      </div>
      {methods.length > 0 && (
        <div className="space-y-3 mb-6">
          {methods.map((pm) => (
            <div key={pm.id} className="flex items-center justify-between bg-slate-800/60 border border-slate-700 rounded-md p-4">
              <div className="text-slate-200 text-sm">
                <div>
                  {pm.brand?.toUpperCase()} •••• •••• •••• {pm.last4}
                  {pm.isDefault ? <span className="ml-2 text-xs text-green-400">Default</span> : null}
                </div>
                <div className="text-xs text-slate-400">Exp {pm.exp_month}/{pm.exp_year}</div>
              </div>
              <div className="space-x-2">
                {!pm.isDefault && (
                  <button onClick={async () => {
                    // Set default
                    const res = await fetch('/api/stripe/set-default-payment-method', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ customerId, paymentMethodId: pm.id }),
                    });
                    if (!user) return;
                    const qs = new URLSearchParams({ email: user.email || '', companyId: selectedCompany.id || '' });
                    const d = await fetch(`/api/stripe/payment-methods?${qs.toString()}`).then(r=>r.json());
                    setMethods(d.paymentMethods || []);
                  }} className="text-cyan-400 hover:text-cyan-300">Set Default</button>
                )}
                <button onClick={async () => {
                  await fetch('/api/stripe/delete-payment-method', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentMethodId: pm.id }),
                  });
                  if (!user) return;
                  const qs = new URLSearchParams({ email: user.email || '', companyId: selectedCompany.id || '' });
                  const d = await fetch(`/api/stripe/payment-methods?${qs.toString()}`).then(r=>r.json());
                  setMethods(d.paymentMethods || []);
                }} className="text-rose-400 hover:text-rose-300">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <AddCardForm clientSecret={clientSecret} customerId={customerId} onUpdated={async () => {
            // refresh displayed PM after update
            if (!user) return;
            const qs = new URLSearchParams({ email: user.email || '', companyId: selectedCompany.id || '' });
            const d = await fetch(`/api/stripe/payment-methods?${qs.toString()}`).then(r=>r.json());
            setMethods(d.paymentMethods || []);
            setShowForm(false);
          }} />
        </Elements>
      )}
    </div>
  );
}


