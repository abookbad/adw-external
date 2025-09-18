"use client";

import { useAuth } from '../../components/AuthProvider';
import { useEffect, useMemo, useState } from 'react';
import { loadUserCompanySummaries, loadCompanyMembers, loadUserProfile } from '@/lib/firebase/firestore';
import PhoneInput from '../../components/PhoneInput';

export default function AccountSettingsClient() {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const email = user?.email || '';

  const [companies, setCompanies] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [members, setMembers] = useState<Array<{ userId: string; role: string; email: string }>>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'member' | 'admin'>('member');
  const [inviteStatus, setInviteStatus] = useState<string>('');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadUserProfile(user.uid).then((profile) => {
      if (!profile) return;
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setPhone(profile.phone || '');
    });
    loadUserCompanySummaries(user.uid).then((list) => {
      setCompanies(list);
      setSelectedCompanyId((prev) => prev || (list[0]?.id ?? ''));
    });
  }, [user]);

  useEffect(() => {
    if (!selectedCompanyId) return;
    loadCompanyMembers(selectedCompanyId).then(setMembers);
  }, [selectedCompanyId]);

  const timezones = useMemo(() => [
    'UTC-08:00 Pacific',
    'UTC-07:00 Mountain',
    'UTC-06:00 Central',
    'UTC-05:00 Eastern',
    'UTC+00:00 UTC',
  ], []);

  return (
    <div className="space-y-6">
      {/* Account Settings */}
      <div className="rounded-lg border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Account Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">First Name</label>
            <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Last Name</label>
            <input value={lastName} onChange={(e)=>setLastName(e.target.value)} className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Email</label>
            <input value={email} readOnly className="w-full px-4 py-2 rounded-md bg-slate-700 text-slate-300 border border-slate-600" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Phone Number</label>
            <PhoneInput value={phone} onChange={setPhone} className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
      </div>

      {/* Company Settings */}
      <div className="rounded-lg border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Company Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Company</label>
            <select value={selectedCompanyId} onChange={(e)=>setSelectedCompanyId(e.target.value)} className="w-full px-3 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {companies.map((c)=> (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-2 font-[family-name:var(--font-geist-mono)] tracking-wider">Timezone</label>
            <select className="w-full px-3 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {timezones.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Users table */}
        <div className="rounded-md border border-slate-700 overflow-hidden">
          <div className="grid grid-cols-12 bg-slate-800/60 px-4 py-2 text-slate-300 text-sm font-[family-name:var(--font-geist-mono)] tracking-wider">
            <div className="col-span-6">User</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-4 text-right">Actions</div>
          </div>
          <div className="divide-y divide-slate-700">
            {members.map((m)=> (
              <div key={m.userId} className="grid grid-cols-12 items-center px-4 py-3 text-sm text-slate-200">
                <div className="col-span-6">{m.email || m.userId}</div>
                <div className="col-span-2">
                  <span className="inline-block bg-slate-700 px-2 py-1 rounded text-xs">{m.role}</span>
                </div>
                <div className="col-span-4 text-right space-x-2">
                  <button className="text-blue-400 hover:text-blue-300">Modify</button>
                  <button className="text-rose-400 hover:text-rose-300">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invite user */}
        <div className="mt-6 grid grid-cols-12 gap-3 items-center">
          <input
            placeholder="email"
            value={inviteEmail}
            onChange={(e)=>setInviteEmail(e.target.value)}
            className="col-span-6 px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <select
            value={inviteRole}
            onChange={(e)=>setInviteRole(e.target.value as 'member' | 'admin')}
            className="col-span-3 px-3 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="member">member</option>
            <option value="admin">admin</option>
          </select>
          <button
            disabled={inviteLoading || !inviteEmail || !selectedCompanyId}
            onClick={async ()=>{
              try {
                setInviteLoading(true);
                setInviteStatus('');
                const companyName = companies.find(c=>c.id===selectedCompanyId)?.name || '';
                const res = await fetch('/api/invitations/send', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ toEmail: inviteEmail, companyId: selectedCompanyId, companyName, inviterName: `${firstName} ${lastName}`.trim() })
                });
                const d = await res.json();
                if (res.ok) {
                  setInviteStatus('Invitation sent.');
                  setInviteEmail('');
                } else {
                  setInviteStatus(d.error || 'Failed to send invite.');
                }
              } catch (e:any) {
                setInviteStatus('Failed to send invite.');
              } finally {
                setInviteLoading(false);
              }
            }}
            className="col-span-3 bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-2 px-4 rounded-md">{inviteLoading ? 'Sending...' : 'Send invite'}</button>
          {inviteStatus && <div className="col-span-12 text-sm text-slate-300">{inviteStatus}</div>}
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-lg border border-rose-700/50 bg-slate-900/60 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-4 font-[family-name:var(--font-geist-mono)] tracking-wider uppercase">Danger Zone</h2>
        <p className="text-slate-300 mb-3">This will permanently delete your account and related memberships. If you are an owner of a company, that company will also be deleted.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <input value={deleteConfirm} onChange={(e)=>setDeleteConfirm(e.target.value)} placeholder="Type DELETE to confirm" className="px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-rose-500 focus:border-rose-500" />
          <div className="md:col-span-2 text-sm text-slate-400">This action cannot be undone.</div>
        </div>
        <button
          disabled={deleteLoading || deleteConfirm !== 'DELETE'}
          onClick={async ()=>{
            if (!user) return;
            try {
              setDeleteLoading(true);
              const res = await fetch('/api/account/delete', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ uid: user.uid })});
              if (res.ok) {
                window.location.href = '/';
              } else {
                alert('Failed to delete account.');
              }
            } catch {
              alert('Failed to delete account.');
            } finally {
              setDeleteLoading(false);
            }
          }}
          className="mt-4 bg-rose-700 hover:bg-rose-600 disabled:opacity-60 text-white font-semibold py-2 px-4 rounded-md"
        >
          {deleteLoading ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
}


