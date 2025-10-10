import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAdminDb } from '@/lib/firebase/admin';
import { requireAdmin } from '@/lib/server/adminGuard';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req as unknown as Request);
    const { amountCents, currency, userEmail, companyId, paymentMethodId, capture } = await req.json();

    if (!amountCents || typeof amountCents !== 'number' || amountCents <= 0) {
      return NextResponse.json({ error: 'amountCents must be a positive number' }, { status: 400 });
    }

    const curr = (currency || 'usd').toLowerCase();
    if (curr.length !== 3) {
      return NextResponse.json({ error: 'currency must be a 3-letter code' }, { status: 400 });
    }

    // Determine Stripe customer id by companyId or email
    let customerId: string | null = null;
    if (companyId) {
      const snap = await getAdminDb().collection('companies').doc(companyId).get();
      customerId = snap.exists ? (snap.get('stripeCustomerId') as string | null) : null;
    }

    if (!customerId && userEmail) {
      const list = await stripe.customers.list({ email: userEmail, limit: 1 });
      customerId = list.data[0]?.id || null;
    }

    if (!customerId) {
      return NextResponse.json({ error: 'No Stripe customer found for given identifiers' }, { status: 400 });
    }

    // If paymentMethodId is provided, use it and set on payment intent; otherwise rely on default
    const createParams: Stripe.PaymentIntentCreateParams = {
      amount: Math.round(amountCents),
      currency: curr,
      customer: customerId,
      confirm: true,
      capture_method: capture === false ? 'manual' : 'automatic',
      off_session: true,
      payment_method: paymentMethodId || undefined,
    };

    const pi = await stripe.paymentIntents.create(createParams);

    const paymentIntent = pi as unknown as Stripe.PaymentIntent;
    return NextResponse.json({ id: paymentIntent.id, status: paymentIntent.status, client_secret: paymentIntent.client_secret });
  } catch (e: any) {
    const status = e?.status || 500;
    return NextResponse.json({ error: e?.message || 'Charge failed' }, { status });
  }
}


