"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { loadUserProfile } from '@/lib/firebase/firestore';
import PhoneInput from '../../components/PhoneInput';
import { useCompany } from '../../components/CompanyContext';

export default function SupportClient() {
  const { user } = useAuth();
  const { selectedCompany } = useCompany();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    (async () => {
      if (user) {
        setForm((f) => ({ ...f, email: user.email || f.email }));
        const profile = await loadUserProfile(user.uid);
        if (profile) {
          setForm((f) => ({
            ...f,
            firstName: f.firstName || profile.firstName || '',
            lastName: f.lastName || profile.lastName || '',
            phone: f.phone || (profile.phone as string) || '',
          }));
        }
      }
      if (selectedCompany?.name) {
        setForm((f) => ({ ...f, company: f.company || (selectedCompany.name as string) }));
      }
    })();
  }, [user, selectedCompany]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      fullName: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      company: form.company,
      phone: form.phone,
      message: form.message,
      projectDetails: form.message,
      source: 'Support Form - Portal',
    };
    try {
      const res = await fetch('https://services.leadconnectorhq.com/hooks/PqpLnJVC3VrmBmWnu5d2/webhook-trigger/0a316d28-e8a1-4fed-9cfd-560c89257ff1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) setSent(true);
      else alert('Failed to send, please try again.');
    } catch {
      alert('Failed to send, please try again.');
    }
  }

  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl max-w-2xl mx-auto mt-12">
      <h1 className="text-2xl font-bold text-white mb-6 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase text-center">Got a Question?</h1>
      {!sent ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.firstName} onChange={(e)=>setForm({...form, firstName: e.target.value})} placeholder="First Name" required className="px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <input value={form.lastName} onChange={(e)=>setForm({...form, lastName: e.target.value})} placeholder="Last Name" required className="px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} type="email" placeholder="Email" required className="px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <PhoneInput value={form.phone} onChange={(v)=>setForm({...form, phone: v})} className="px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <input value={form.company} onChange={(e)=>setForm({...form, company: e.target.value})} placeholder="Company" className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <textarea value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} placeholder="How can we help?" required rows={5} className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <button className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Send</button>
        </form>
      ) : (
        <p className="text-slate-300">Thanks! We received your message and will reply shortly.</p>
      )}
    </div>
  );
}


