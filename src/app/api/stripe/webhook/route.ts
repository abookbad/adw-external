import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '@/lib/firebase/admin';

export const config = {
  api: {
    bodyParser: false,
  },
};

function buffer(readable: ReadableStream<Uint8Array>) {
  return new Response(readable).arrayBuffer();
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

  const buf = await buffer(req.body as unknown as ReadableStream<Uint8Array>);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'setup_intent.succeeded': {
        const si = event.data.object as Stripe.SetupIntent;
        const customerId = si.customer as string;
        const paymentMethodId = si.payment_method as string;
        if (customerId && paymentMethodId) {
          // make default for invoices
          await stripe.customers.update(customerId, {
            invoice_settings: { default_payment_method: paymentMethodId },
          });
        }
        break;
      }
      case 'payment_method.attached': {
        const pm = event.data.object as Stripe.PaymentMethod;
        // Optionally sync brand/last4 to a company doc if you have a mapping customerId->companyId
        // This example assumes you put companyId in customer.metadata
        if (pm.customer) {
          const cust = await stripe.customers.retrieve(pm.customer as string) as Stripe.Customer;
          const companyId = (cust.metadata && cust.metadata.companyId) || undefined;
          if (companyId) {
            await adminDb.collection('companies').doc(companyId).set({
              last4: pm.card?.last4 || null,
              brand: pm.card?.brand || null,
              exp_month: pm.card?.exp_month || null,
              exp_year: pm.card?.exp_year || null,
            }, { merge: true });
          }
        }
        break;
      }
      case 'invoice.payment_succeeded': {
        // Update your records for successful invoice
        break;
      }
      case 'invoice.payment_failed': {
        // Flag account or notify user
        break;
      }
      default:
        break;
    }
  } catch (e) {
    // swallow to avoid retries storm, but log in real app
  }

  return NextResponse.json({ received: true });
}


