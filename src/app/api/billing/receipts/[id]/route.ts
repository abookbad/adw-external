import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import { requireUser, assertMembership } from '@/lib/server/userGuard';

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { uid } = await requireUser(req as unknown as Request);
    const { id } = await ctx.params;
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const db = getAdminDb();
    const doc = await db.collection('receipts').doc(id).get();
    if (!doc.exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const data = doc.data() as any;
    await assertMembership(uid, data.companyId);
    return NextResponse.json({ id: doc.id, ...data });
  } catch (e: any) {
    const status = e?.status || 500;
    return NextResponse.json({ error: e?.message || 'Failed to load receipt' }, { status });
  }
}


