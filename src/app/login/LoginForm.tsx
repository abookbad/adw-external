"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { emailSignIn, googleSignIn } from '@/lib/firebase/auth';
import { userProfileExists } from '@/lib/firebase/firestore';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await emailSignIn(email, password);
      router.push('/portal');
    } catch (err: any) {
      setError(err?.message ?? 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    try {
      setLoading(true);
      setError(null);
      const cred = await googleSignIn();
      const uid = cred.user.uid;
      const exists = await userProfileExists(uid);
      if (exists) {
        router.push('/portal');
      } else {
        // First-time Google sign-in: send to completion form with prefilled values
        const email = cred.user.email ?? '';
        const displayName = cred.user.displayName ?? '';
        const [firstName, lastName] = displayName.split(' ');
        const params = new URLSearchParams({ email, firstName: firstName || '', lastName: lastName || '' });
        router.push(`/register/complete?${params.toString()}`);
      }
    } catch (err: any) {
      setError(err?.message ?? 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-3xl font-bold text-white mb-6 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">
        Login
      </h1>
      <div className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-6 shadow-xl">
        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
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
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-4 rounded-md cursor-pointer shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition-colors transition-transform duration-200 transform-gpu hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Sign in
          </button>

          <button
            type="button"
            onClick={onGoogle}
            disabled={loading}
            className="w-full bg-white hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed text-slate-800 font-semibold py-2.5 px-4 rounded-md cursor-pointer border border-slate-300 shadow-sm transition-colors"
          >
            <span className="inline-flex items-center justify-center gap-3">
              <img src="/Google_logo.svg" alt="Google" className="h-5 w-5" />
              <span>Continue with Google</span>
            </span>
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          {error && <p className="mb-2 text-red-400">{error}</p>}
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 hover:underline font-medium">Register</Link>
          </p>
          <p className="mt-2">
            <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 hover:underline font-medium">Forgot your password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}


