"use client";

import { useState } from 'react';
import Link from 'next/link';
import { resetPassword } from '@/lib/firebase/auth';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await resetPassword(email);
      setSent(true);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-3xl font-bold text-white mb-6 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
        Forgot Password
      </h1>
      <div className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-6 shadow-xl">
        <form className="space-y-5" onSubmit={onSubmit}>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-4 rounded-md cursor-pointer shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition-colors transition-transform duration-200 transform-gpu hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Send reset link
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          {error && <p className="mb-2 text-red-400">{error}</p>}
          {sent && <p className="mb-2 text-green-400">Reset email sent. Check your inbox.</p>}
          <p>
            Remembered your password?{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 hover:underline font-medium">Log in</Link>
          </p>
          <p className="mt-2">
            <Link href="/register" className="text-blue-400 hover:text-blue-300 hover:underline font-medium">Create a new account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}


