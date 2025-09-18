import { db } from './client';
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

export type Company = {
  name: string;
  createdAt: any;
  createdBy: string; // uid
};

export type UserProfile = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: any;
};

export type Membership = {
  userId: string;
  companyId: string;
  role: 'owner' | 'admin' | 'member';
  createdAt: any;
};

export async function createUserAndCompany(params: {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  companyName: string;
}) {
  const { uid, email, firstName, lastName, phone, companyName } = params;

  // Create user profile
  await setDoc(doc(db, 'users', uid), {
    uid,
    email,
    firstName,
    lastName,
    phone: phone || null,
    createdAt: serverTimestamp(),
  } as UserProfile);

  // Create company
  const companyRef = await addDoc(collection(db, 'companies'), {
    name: companyName,
    createdAt: serverTimestamp(),
    createdBy: uid,
  } as Company);

  // Create membership (owner)
  await addDoc(collection(db, 'memberships'), {
    userId: uid,
    companyId: companyRef.id,
    role: 'owner',
    createdAt: serverTimestamp(),
  } as Membership);

  return { companyId: companyRef.id };
}

export async function loadUserCompanies(uid: string) {
  const q = query(collection(db, 'memberships'), where('userId', '==', uid));
  const snapshot = await getDocs(q);
  const companyIds = snapshot.docs.map((d) => d.get('companyId')) as string[];
  return companyIds;
}

export async function userProfileExists(uid: string) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists();
}

export async function loadUserCompanySummaries(uid: string): Promise<Array<{ id: string; name: string }>> {
  const ids = await loadUserCompanies(uid);
  if (ids.length === 0) return [];
  const results: Array<{ id: string; name: string }> = [];
  await Promise.all(
    ids.map(async (id) => {
      try {
        const c = await getDoc(doc(db, 'companies', id));
        const name = (c.exists() && (c.get('name') as string)) || id;
        results.push({ id, name });
      } catch {
        results.push({ id, name: id });
      }
    })
  );
  // Preserve original order of ids
  return ids.map((id) => results.find((r) => r.id === id)!).filter(Boolean);
}

export async function loadCompanyMembers(companyId: string): Promise<Array<{ userId: string; role: string; email: string }>> {
  const q = query(collection(db, 'memberships'), where('companyId', '==', companyId));
  const snapshot = await getDocs(q);
  const members: Array<{ userId: string; role: string; email: string }> = [];
  await Promise.all(
    snapshot.docs.map(async (m) => {
      const userId = m.get('userId') as string;
      const role = m.get('role') as string;
      try {
        const u = await getDoc(doc(db, 'users', userId));
        const email = (u.exists() && (u.get('email') as string)) || '';
        members.push({ userId, role, email });
      } catch {
        members.push({ userId, role, email: '' });
      }
    })
  );
  return members;
}

export async function loadUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data() as any;
  return {
    uid,
    email: data.email ?? '',
    firstName: data.firstName ?? '',
    lastName: data.lastName ?? '',
    phone: data.phone ?? '',
    createdAt: data.createdAt ?? null,
  } as UserProfile;
}

// Upsert a user profile without creating a company
export async function upsertUserProfile(params: { uid: string; email: string; firstName: string; lastName: string; phone?: string }) {
  const { uid, email, firstName, lastName, phone } = params;
  await setDoc(doc(db, 'users', uid), {
    uid,
    email,
    firstName,
    lastName,
    phone: phone || null,
    createdAt: serverTimestamp(),
  } as UserProfile, { merge: true } as any);
}

// Add a membership to an existing company
export async function addMembershipToCompany(params: { userId: string; companyId: string; role?: 'owner' | 'admin' | 'member' }) {
  const { userId, companyId, role } = params;
  await addDoc(collection(db, 'memberships'), {
    userId,
    companyId,
    role: role || 'member',
    createdAt: serverTimestamp(),
  } as Membership);
}

// Invite helpers (client-side read/write)
export async function getInvite(token: string) {
  const ref = doc(db, 'invites', token);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as any) };
}

export async function markInviteUsed(token: string) {
  const ref = doc(db, 'invites', token);
  try {
    await updateDoc(ref, { used: true });
  } catch {}
}


