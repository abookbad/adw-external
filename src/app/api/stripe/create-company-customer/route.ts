import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '@/lib/firebase/admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const { companyId, companyName, email } = await req.json();
    if (!companyId) return NextResponse.json({ error: 'companyId required' }, { status: 400 });

    const ref = adminDb.collection('companies').doc(companyId);
    const snap = await ref.get();
    const existingId = snap.exists ? (snap.get('stripeCustomerId') as string | undefined) : undefined;

    if (existingId) {
      // Ensure name is set for cleanliness
      if (companyName) {
        await stripe.customers.update(existingId, { name: companyName });
      }
      return NextResponse.json({ customerId: existingId, reused: true });
    }

    const customer = await stripe.customers.create({
      name: companyName || undefined,
      email: email || undefined,
      metadata: { companyId },
    });

    await ref.set({ stripeCustomerId: customer.id }, { merge: true });

    return NextResponse.json({ customerId: customer.id, reused: false });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Stripe error' }, { status: 400 });
  }
}


