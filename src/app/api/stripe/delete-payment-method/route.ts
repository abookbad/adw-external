import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const { paymentMethodId } = await req.json();
    if (!paymentMethodId) return NextResponse.json({ error: 'paymentMethodId required' }, { status: 400 });
    const pm = await stripe.paymentMethods.detach(paymentMethodId);
    return NextResponse.json({ ok: true, detached: pm.id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Stripe error' }, { status: 400 });
  }
}


