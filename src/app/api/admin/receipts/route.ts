import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import { requireAdmin } from '@/lib/server/adminGuard';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req as unknown as Request);
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId') || '';
    if (!companyId) return NextResponse.json({ error: 'companyId required' }, { status: 400 });

    const db = getAdminDb();
    const snap = await db.collection('receipts').where('companyId', '==', companyId).limit(200).get();
    const rows = snap.docs.map((d) => {
      const x = d.data() as any;
      return {
        id: d.id,
        createdAt: x.createdAt,
        chargedAt: x.chargedAt || null,
        totalCents: x.totalCents,
        currency: x.currency,
        numLineItems: Array.isArray(x.lineItems) ? x.lineItems.length : 0,
        cardLast4: x.cardLast4 || null,
        cardBrand: x.cardBrand || null,
      };
    });
    rows.sort((a, b) => (Number((b.chargedAt || b.createdAt) || 0) - Number((a.chargedAt || a.createdAt) || 0)));
    return NextResponse.json({ receipts: rows.slice(0, 100) });
  } catch (e: any) {
    const status = e?.status || 500;
    return NextResponse.json({ error: e?.message || 'Failed to list receipts' }, { status });
  }
}


