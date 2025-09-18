"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { ThemedInnerPageLayout } from '../../components/ThemedInnerPageLayout';
import { createUserAndCompany, loadUserProfile, getInvite, addMembershipToCompany, upsertUserProfile, markInviteUsed } from '@/lib/firebase/firestore';
import { emailRegister, emailSignIn } from '@/lib/firebase/auth';
import { useAuth } from '../../components/AuthProvider';

function CompleteRegistrationClient() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const preEmail = params.get('email') || '';
  const preCompany = params.get('company') || '';
  const preFirst = params.get('firstName') || '';
  const preLast = params.get('lastName') || '';
  const inviteToken = params.get('invite') || '';

  const [firstName, setFirstName] = useState(preFirst);
  const [lastName, setLastName] = useState(preLast);
  const [companyName, setCompanyName] = useState(preCompany);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    loadUserProfile(user.uid).then((profile) => {
      if (!profile) return;
      setFirstName((v) => v || profile.firstName || '');
      setLastName((v) => v || profile.lastName || '');
      setPhone((v) => v || profile.phone || '');
    });
  }, [user]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password && password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const email = preEmail || user?.email || '';

      // Ensure we have an authenticated user; if not, create/sign-in with email+password
      let uid = user?.uid || '';
      if (!uid) {
        if (!email) {
          setError('Missing email from invite.');
          setLoading(false);
          return;
        }
        if (!password) {
          setError('Please set a password to create your account.');
          setLoading(false);
          return;
        }
        try {
          const cred = await emailRegister(email, password);
          uid = cred.user.uid;
        } catch (err: any) {
          // If the account exists, try sign in
          try {
            const cred = await emailSignIn(email, password);
            uid = cred.user.uid;
          } catch (err2: any) {
            throw err2;
          }
        }
      }

      // If invite present and valid, add user to that company instead of creating a new one
      let targetCompanyId: string | null = null;
      if (inviteToken) {
        const inv = await getInvite(inviteToken);
        if (inv && !inv.used && inv.expiresAt > Date.now() && inv.companyId) {
          targetCompanyId = inv.companyId as string;
        }
      }

      if (targetCompanyId) {
        await upsertUserProfile({ uid, email, firstName, lastName, phone });
        await addMembershipToCompany({ userId: uid, companyId: targetCompanyId, role: 'member' });
        await markInviteUsed(inviteToken);
      } else {
        const { companyId } = await createUserAndCompany({
          uid,
          email,
          firstName,
          lastName,
          phone,
          companyName,
        });
        // Create a Stripe customer for the new company now
        await fetch('/api/stripe/create-company-customer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ companyId, companyName, email }),
        });
      }
      router.push('/portal');
    } catch (err: any) {
      setError(err?.message ?? 'Failed to complete registration');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedInnerPageLayout>
      <div className="w-full flex items-start justify-center pt-24 sm:pt-28">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-6 text-center font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Complete Registration</h1>
          <div className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-6 shadow-xl">
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">First Name</label>
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Last Name</label>
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Email</label>
                <input value={preEmail} readOnly className="w-full px-4 py-2 rounded-md bg-slate-700 text-slate-300 border border-slate-600" />
                <p className="mt-1 text-xs text-slate-400">Pre-filled from your invite and cannot be changed.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Company Name</label>
                <input value={companyName} readOnly={Boolean(preCompany)} onChange={(e) => setCompanyName(e.target.value)} required className={`w-full px-4 py-2 rounded-md ${preCompany ? 'bg-slate-700 text-slate-300 border-slate-600' : 'bg-slate-800 text-white border-slate-700'} border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`} />
                {preCompany && <p className="mt-1 text-xs text-slate-400">Pre-filled from your invite and cannot be changed.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Phone Number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Create a password" className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Confirm Password</label>
                <input value={confirm} onChange={(e)=>setConfirm(e.target.value)} type="password" placeholder="Re-enter your password" className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-4 rounded-md cursor-pointer shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition-colors">Finish</button>
            </form>
            {error && <p className="mt-4 text-center text-red-400">{error}</p>}
          </div>
        </div>
      </div>
    </ThemedInnerPageLayout>
  );
}

export default function CompleteRegistrationPage() {
  return (
    <Suspense fallback={<div className="w-full flex items-center justify-center pt-24 sm:pt-28 text-slate-300">Loading…</div>}>
      <CompleteRegistrationClient />
    </Suspense>
  );
}


