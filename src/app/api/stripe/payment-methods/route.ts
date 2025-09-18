import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAdminDb } from '@/lib/firebase/admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email') || undefined;
    const companyId = searchParams.get('companyId') || undefined;

    let customerId: string | undefined;
    if (companyId) {
      const adminDb = getAdminDb();
      const snap = await adminDb.collection('companies').doc(companyId).get();
      const existing = snap.exists ? (snap.get('stripeCustomerId') as string | undefined) : undefined;
      if (existing) customerId = existing;
    }

    let customer: Stripe.Customer | Stripe.DeletedCustomer | null = null;
    if (customerId) {
      customer = await stripe.customers.retrieve(customerId);
    } else if (email) {
      const list = await stripe.customers.list({ email, limit: 1 });
      customer = list.data[0] || null;
    }

    if (!customer || (customer as any).deleted) {
      return NextResponse.json({ paymentMethod: null });
    }

    const cust = customer as Stripe.Customer;
    const defaultPmId = (cust.invoice_settings?.default_payment_method as string) || undefined;
    const list = await stripe.paymentMethods.list({ customer: cust.id, type: 'card' });
    const items = list.data.map((pm) => ({
      id: pm.id,
      brand: pm.card?.brand,
      last4: pm.card?.last4,
      exp_month: pm.card?.exp_month,
      exp_year: pm.card?.exp_year,
      customerId: pm.customer,
      isDefault: defaultPmId ? pm.id === defaultPmId : list.data.length === 1,
    }));

    return NextResponse.json({
      paymentMethods: items,
      defaultPaymentMethodId: defaultPmId || null,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Stripe error' }, { status: 400 });
  }
}


