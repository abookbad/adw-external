import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAdminDb } from '@/lib/firebase/admin';
import { requireAdmin } from '@/lib/server/adminGuard';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

type LineItem = { description: string; quantity: number; unitPriceCents: number };

function buildTransporter() {
  return nodemailer.createTransport({
    host: process.env.OUTLOOK_SMTP_HOST || 'smtp.office365.com',
    port: Number(process.env.OUTLOOK_SMTP_PORT || 587),
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.OUTLOOK_USER as string,
      pass: process.env.OUTLOOK_PASS as string,
    },
  });
}

function moneyFromCents(cents: number) {
  return (cents / 100).toFixed(2);
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req as unknown as Request);
    const { userEmail, companyId, paymentMethodId, currency, lineItems, capture, memo, feePercent } = await req.json();

    if (!userEmail || !companyId) {
      return NextResponse.json({ error: 'userEmail and companyId are required' }, { status: 400 });
    }
    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json({ error: 'At least one line item is required' }, { status: 400 });
    }

    const normalized: LineItem[] = lineItems.map((li: any) => ({
      description: String(li.description || '').slice(0, 200),
      quantity: Math.max(1, Number(li.quantity || 1)),
      unitPriceCents: Math.max(0, Math.round(Number(li.unitPriceCents || 0))),
    }));

    const subtotalCents = normalized.reduce((sum, li) => sum + li.quantity * li.unitPriceCents, 0);
    const pct = Math.max(0, Math.min(100, Number(feePercent || 0)));
    const feeCents = Math.round(subtotalCents * pct / 100);
    const totalCents = subtotalCents + feeCents;
    if (totalCents <= 0) {
      return NextResponse.json({ error: 'Total must be greater than zero' }, { status: 400 });
    }

    const curr = (currency || 'usd').toLowerCase();
    if (curr.length !== 3) {
      return NextResponse.json({ error: 'currency must be a 3-letter code' }, { status: 400 });
    }

    // Find customer
    const companySnap = await getAdminDb().collection('companies').doc(companyId).get();
    const customerIdFromCompany = companySnap.exists ? (companySnap.get('stripeCustomerId') as string | undefined) : undefined;
    let customerId: string | null = customerIdFromCompany || null;
    if (!customerId) {
      const list = await stripe.customers.list({ email: userEmail, limit: 1 });
      customerId = list.data[0]?.id || null;
    }
    if (!customerId) {
      return NextResponse.json({ error: 'No Stripe customer found for given user/company' }, { status: 400 });
    }

    // Create PaymentIntent off-session
    const createParams: Stripe.PaymentIntentCreateParams = {
      amount: Math.round(totalCents),
      currency: curr,
      customer: customerId,
      confirm: true,
      capture_method: capture === false ? 'manual' : 'automatic',
      off_session: true,
      payment_method: paymentMethodId || undefined,
      description: memo ? String(memo).slice(0, 200) : undefined,
      metadata: {
        companyId,
        userEmail,
        memo: memo ? String(memo).slice(0, 200) : '',
      },
    };

    const pi = await stripe.paymentIntents.create(createParams);

    // Try to retrieve charge details for card summary
    let brand: string | undefined;
    let last4: string | undefined;
    let expMonth: number | undefined;
    let expYear: number | undefined;

    const latestChargeId = (pi as any).latest_charge as string | undefined;
    if (latestChargeId) {
      try {
        const ch = await stripe.charges.retrieve(latestChargeId);
        const pmDetails = (ch.payment_method_details as any)?.card;
        brand = pmDetails?.brand;
        last4 = pmDetails?.last4;
        expMonth = pmDetails?.exp_month;
        expYear = pmDetails?.exp_year;
      } catch {}
    }

    // Build receipt email
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const companyName = (companySnap.exists && (companySnap.get('name') as string)) || companyId;
    // Look up recipient name by email (fallback to email local part)
    let recipientName = '';
    try {
      const q = await getAdminDb().collection('users').where('email', '==', userEmail).limit(1).get();
      if (!q.empty) {
        const u = q.docs[0];
        const firstName = (u.get('firstName') as string) || '';
        const lastName = (u.get('lastName') as string) || '';
        recipientName = `${firstName} ${lastName}`.trim();
      }
    } catch {}
    if (!recipientName) {
      recipientName = (userEmail.split('@')[0] || 'there');
    }

    const itemsRows = normalized
      .map(
        (li) => `
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #334155;color:#e2e8f0;">${li.description || 'Item'}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #334155;color:#cbd5e1;" align="right">${li.quantity}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #334155;color:#cbd5e1;" align="right">$${moneyFromCents(li.unitPriceCents)}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #334155;color:#e2e8f0;" align="right">$${moneyFromCents(li.quantity * li.unitPriceCents)}</td>
          </tr>`
      )
      .join('');

    const html = `<!doctype html>
<html>
  <head>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="margin:0;padding:0;background:#0b1220;">
    <center style="width:100%;background:#0b1220;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;background:#0b1220;color:#e2e8f0;font-family:Segoe UI,Arial,sans-serif;">
        <tr>
          <td align="center" style="padding:24px;">
            <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="background:#0f172a;border:1px solid #334155;border-radius:12px;overflow:hidden;">
              <tr>
                <td style="padding:24px;text-align:center;background:#0b1220;border-bottom:1px solid #334155;">
                  <img src="${origin}/adw_final.png" alt="ADW" width="64" height="64" style="display:block;margin:0 auto 8px;" />
                  <div style="font-weight:700;font-size:18px;letter-spacing:.12em;text-transform:uppercase;color:#e2e8f0;">Agency DevWorks</div>
                </td>
              </tr>
              <tr>
                <td style="padding:28px;">
                  <h1 style="margin:0 0 12px;font-size:20px;color:#fff;letter-spacing:.08em;text-transform:uppercase;">Payment Receipt</h1>
                  <p style="margin:0 0 12px;color:#cbd5e1;">Hello ${recipientName},</p>
                  <p style="margin:0 0 12px;color:#cbd5e1;">Thank you for your payment to <strong>Agency DevWorks</strong> for <strong>${companyName}</strong>.</p>
                  <p style="margin:0 0 12px;color:#cbd5e1;">Amount: <strong>$${moneyFromCents(totalCents)} ${curr.toUpperCase()}</strong></p>
                  ${brand && last4 ? `<p style="margin:0 0 12px;color:#94a3b8;">Card: ${brand.toUpperCase()} •••• ${last4}${expMonth && expYear ? ` (exp ${expMonth}/${expYear})` : ''}</p>` : ''}
                  ${memo ? `<p style=\"margin:0 0 12px;color:#cbd5e1;\">Memo: ${String(memo).slice(0, 200)}</p>` : ''}
                  <div style="margin:16px 0 8px;color:#e2e8f0;font-weight:600;">Line Items</div>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #334155;border-radius:8px;overflow:hidden;">
                    <tr style="background:#0b1220;">
                      <th align="left" style="padding:8px 12px;color:#cbd5e1;font-weight:600;">Description</th>
                      <th align="right" style="padding:8px 12px;color:#cbd5e1;font-weight:600;">Qty</th>
                      <th align="right" style="padding:8px 12px;color:#cbd5e1;font-weight:600;">Unit</th>
                      <th align="right" style="padding:8px 12px;color:#cbd5e1;font-weight:600;">Total</th>
                    </tr>
                    ${itemsRows}
                    ${feeCents > 0 ? `
                    <tr>
                      <td style=\"padding:8px 12px;border-top:1px solid #334155;color:#e2e8f0;\">Credit Card Fee (${pct}%)</td>
                      <td align=\"right\" style=\"padding:8px 12px;border-top:1px solid #334155;color:#cbd5e1;\">1</td>
                      <td align=\"right\" style=\"padding:8px 12px;border-top:1px solid #334155;color:#cbd5e1;\">$${moneyFromCents(feeCents)}</td>
                      <td align=\"right\" style=\"padding:8px 12px;border-top:1px solid #334155;color:#e2e8f0;\">$${moneyFromCents(feeCents)}</td>
                    </tr>` : ''}
                    <tr>
                      <td colspan="3" align="right" style="padding:12px;color:#94a3b8;">Total</td>
                      <td align="right" style="padding:12px;color:#e2e8f0;font-weight:700;">$${moneyFromCents(totalCents)}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
  </html>`;

    // Send receipt
    const transporter = buildTransporter();
    const fromEnv = process.env.OUTLOOK_FROM || '';
    const userAddr = process.env.OUTLOOK_USER as string;
    const m = fromEnv.match(/^\s*"?([^"<]+)"?\s*<\s*([^>]+)\s*>\s*$/);
    const fromField: any = m ? { name: m[1], address: m[2] } : (fromEnv.includes('@') ? fromEnv : userAddr);

    await transporter.sendMail({
      from: fromField,
      to: userEmail,
      subject: `Receipt - ${companyName} - $${moneyFromCents(totalCents)} ${curr.toUpperCase()}`,
      html,
    });

    return NextResponse.json({ id: pi.id, status: pi.status });
  } catch (e: any) {
    const status = e?.status || 500;
    return NextResponse.json({ error: e?.message || 'Charge failed' }, { status });
  }
}


