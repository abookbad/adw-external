import { getAdminAuth } from '@/lib/firebase/admin';

function parseAllowedAdminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAILS || '';
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
}

export type AdminIdentity = { uid: string; email: string };

export async function requireAdmin(request: Request): Promise<AdminIdentity> {
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    throw Object.assign(new Error('Missing Authorization header'), { status: 401 });
  }

  const idToken = authHeader.slice('bearer '.length);
  const decoded = await getAdminAuth().verifyIdToken(idToken);
  const email = (decoded.email || '').toLowerCase();
  if (!email) {
    throw Object.assign(new Error('Email not present on token'), { status: 403 });
  }

  const allowed = parseAllowedAdminEmails();
  if (!allowed.has(email)) {
    throw Object.assign(new Error('Forbidden'), { status: 403 });
  }

  return { uid: decoded.uid, email };
}


