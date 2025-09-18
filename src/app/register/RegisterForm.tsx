"use client";

import { useEffect, useState } from 'react';
import PhoneInput from '../components/PhoneInput';
import { useRouter } from 'next/navigation';
import { emailRegister } from '@/lib/firebase/auth';
import { createUserAndCompany, loadUserProfile } from '@/lib/firebase/firestore';
import { useAuth } from '../components/AuthProvider';
import Link from 'next/link';

export default function RegisterForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const cred = await emailRegister(email, password);
      const { companyId } = await createUserAndCompany({
        uid: cred.user.uid,
        email,
        firstName,
        lastName,
        phone,
        companyName,
      });
      // Create Stripe customer for the new company now
      try {
        await fetch('/api/stripe/create-company-customer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ companyId, companyName, email }),
        });
      } catch {}
      router.push('/portal');
    } catch (err: any) {
      setError(err?.message ?? 'Failed to register');
    } finally {
      setLoading(false);
    }
  }

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');

  // Prefill if a user is already logged in
  useEffect(() => {
    if (!user) return;
    loadUserProfile(user.uid).then((profile) => {
      if (!profile) return;
      setFirstName((v) => v || profile.firstName || '');
      setLastName((v) => v || profile.lastName || '');
      setPhone((v) => v || profile.phone || '');
      if (!email) {
        // Keep existing email if user typed it already
        // but if empty, fill from profile
        setEmail(profile.email || '');
      }
    });
  }, [user]);

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-3xl font-bold text-white mb-6 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
        Register
      </h1>
      <div className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-6 shadow-xl">
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">First Name</label>
              <input id="firstName" name="firstName" type="text" required placeholder="First name" className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Last Name</label>
              <input id="lastName" name="lastName" type="text" required placeholder="Last name" className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Company Name</label>
            <input id="companyName" name="companyName" type="text" required placeholder="Company name" className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Phone Number</label>
            <PhoneInput value={phone} onChange={setPhone} className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Re-enter your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-4 rounded-md cursor-pointer shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition-colors transition-transform duration-200 transform-gpu hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Create account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          {error && <p className="mb-2 text-red-400">{error}</p>}
          <p>
            Already have an account?{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 hover:underline font-medium">Log in</Link>
          </p>
          <p className="mt-2">
            <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 hover:underline font-medium">Forgot your password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}


