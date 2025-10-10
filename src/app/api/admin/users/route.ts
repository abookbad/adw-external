import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import { requireAdmin } from '@/lib/server/adminGuard';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req as unknown as Request);

    const db = getAdminDb();

    // Load all users (basic fields)
    const usersSnap = await db.collection('users').get();
    const users = usersSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));

    // Load memberships to map users to companies
    const membershipsSnap = await db.collection('memberships').get();
    const memberships = membershipsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));

    // Load companies to get names and stripeCustomerId
    const companiesSnap = await db.collection('companies').get();
    const companies = new Map<string, any>();
    companiesSnap.docs.forEach((d) => companies.set(d.id, { id: d.id, ...(d.data() as any) }));

    const userRows = users.map((u) => {
      const userMemberships = memberships.filter((m) => m.userId === u.uid);
      const cos = userMemberships.map((m) => {
        const c = companies.get(m.companyId);
        return c
          ? { id: c.id, name: c.name || c.id, stripeCustomerId: c.stripeCustomerId || null, role: m.role }
          : { id: m.companyId, name: m.companyId, stripeCustomerId: null, role: m.role };
      });
      return {
        uid: u.uid,
        email: u.email || '',
        firstName: u.firstName || '',
        lastName: u.lastName || '',
        companies: cos,
      };
    });

    return NextResponse.json({ users: userRows });
  } catch (e: any) {
    const status = e?.status || 500;
    return NextResponse.json({ error: e?.message || 'Failed to list users' }, { status });
  }
}


