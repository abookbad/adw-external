import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin';

export type UserIdentity = { uid: string; email: string };

export async function requireUser(request: Request): Promise<UserIdentity> {
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    throw Object.assign(new Error('Missing Authorization header'), { status: 401 });
  }
  const idToken = authHeader.slice('bearer '.length);
  const decoded = await getAdminAuth().verifyIdToken(idToken);
  const email = (decoded.email || '').toLowerCase();
  if (!email) throw Object.assign(new Error('Email not present on token'), { status: 403 });
  return { uid: decoded.uid, email };
}

export async function assertMembership(uid: string, companyId: string) {
  const db = getAdminDb();
  const snap = await db.collection('memberships').where('userId', '==', uid).where('companyId', '==', companyId).limit(1).get();
  if (snap.empty) {
    throw Object.assign(new Error('Forbidden'), { status: 403 });
  }
}


