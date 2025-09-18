import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();
    if (!uid) return NextResponse.json({ error: 'uid required' }, { status: 400 });

    // Find memberships
    const membershipsSnap = await adminDb.collection('memberships').where('userId', '==', uid).get();
    const memberships = membershipsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));

    // Determine companies where the user is owner
    const ownerCompanyIds = memberships.filter((m) => m.role === 'owner').map((m) => m.companyId);

    // Delete user profile doc
    await adminDb.collection('users').doc(uid).delete().catch(() => {});

    // Delete memberships
    const batch = adminDb.batch();
    membershipsSnap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();

    // If owner, delete company docs (companies + related memberships)
    for (const companyId of ownerCompanyIds) {
      try {
        await adminDb.collection('companies').doc(companyId).delete();
        // Delete memberships of this company
        const ms = await adminDb.collection('memberships').where('companyId', '==', companyId).get();
        const b = adminDb.batch();
        ms.docs.forEach((d) => b.delete(d.ref));
        await b.commit();
      } catch {}
    }

    // Finally delete auth user
    await adminAuth.deleteUser(uid);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Deletion failed' }, { status: 400 });
  }
}


