import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '@/lib/firebase/admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const { customerId, companyId } = await req.json();

    if (!companyId) {
      return NextResponse.json({ error: 'companyId is required' }, { status: 400 });
    }

    let stripeCustomerId = customerId || null;
    let companyName: string | null = null;
    const docRef = adminDb.collection('companies').doc(companyId);
    const snap = await docRef.get();
    const existing = snap.exists ? (snap.get('stripeCustomerId') as string | undefined) : undefined;
    companyName = snap.exists ? (snap.get('name') as string | null) : null;
    if (existing) stripeCustomerId = existing;

    let customer = stripeCustomerId ? await stripe.customers.retrieve(stripeCustomerId) : null;
    if (!customer || (customer as any).deleted) {
      customer = await stripe.customers.create({
        name: companyName || undefined,
        metadata: { companyId },
      });
      await adminDb.collection('companies').doc(companyId).set({ stripeCustomerId: (customer as any).id }, { merge: true });
    } else if (companyName && !(customer as Stripe.Customer).name) {
      // Ensure existing customer shows up by name in Dashboard
      await stripe.customers.update((customer as any).id, { name: companyName });
    }

    const setupIntent = await stripe.setupIntents.create({
      customer: (customer as any).id,
      payment_method_types: ['card'],
    });

    return NextResponse.json({ clientSecret: setupIntent.client_secret, customerId: (customer as any).id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Stripe error' }, { status: 400 });
  }
}


