import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import { requireAdmin } from '@/lib/server/adminGuard';
import nodemailer from 'nodemailer';

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
  return `$${(Number(cents || 0) / 100).toFixed(2)}`;
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(req as unknown as Request);
    const { id } = await ctx.params;
    const db = getAdminDb();
    const doc = await db.collection('receipts').doc(id).get();
    if (!doc.exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const data = doc.data() as any;

    const companySnap = await db.collection('companies').doc(data.companyId as string).get();
    const companyName = (companySnap.exists && (companySnap.get('name') as string)) || data.companyId;

    // Attempt to look up recipient name
    let recipientName = '';
    try {
      const q = await db.collection('users').where('email', '==', data.userEmail).limit(1).get();
      if (!q.empty) {
        const u = q.docs[0];
        const fn = (u.get('firstName') as string) || '';
        const ln = (u.get('lastName') as string) || '';
        recipientName = `${fn} ${ln}`.trim();
      }
    } catch {}
    if (!recipientName) recipientName = (String(data.userEmail || '').split('@')[0] || 'there');

    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const htmlItems = (Array.isArray(data.lineItems) ? data.lineItems : [])
      .map(
        (li: any) => `
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #334155;color:#e2e8f0;">${li.description || 'Item'}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #334155;color:#cbd5e1;" align="right">${li.quantity}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #334155;color:#cbd5e1;" align="right">${moneyFromCents(li.unitPriceCents)}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #334155;color:#e2e8f0;" align="right">${moneyFromCents((li.quantity || 0) * (li.unitPriceCents || 0))}</td>
          </tr>`
      )
      .join('');

    const feeCents = Number(data.feeCents || 0);
    const pct = Number(data.feePercent || 0);
    const totalStr = `${moneyFromCents(data.totalCents)} ${String(data.currency || 'USD').toUpperCase()}`;
    const brand = data.cardBrand ? String(data.cardBrand).toUpperCase() : '';
    const last4 = data.cardLast4 ? String(data.cardLast4) : '';
    const expMonth = data.expMonth || null;
    const expYear = data.expYear || null;
    const chargeId = data.chargeId || data.paymentIntentId || '';
    const paymentDateStr = new Date(Number(data.chargedAt || data.createdAt || Date.now())).toLocaleString();

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
                  <p style="margin:0 0 12px;color:#cbd5e1;">Amount: <strong>${totalStr}</strong></p>
                  ${brand && last4 ? `<p style="margin:0 0 12px;color:#94a3b8;">Card: ${brand} •••• ${last4}${expMonth && expYear ? ` (exp ${expMonth}/${expYear})` : ''}</p>` : ''}
                  ${data.memo ? `<p style=\"margin:0 0 12px;color:#cbd5e1;\">Memo: ${String(data.memo).slice(0, 200)}</p>` : ''}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0 16px;border-collapse:collapse;">
                    <tr>
                      <td style="color:#94a3b8;font-size:12px;">Transaction ID: <span style="color:#e2e8f0;">${chargeId}</span></td>
                      <td align="right" style="color:#94a3b8;font-size:12px;">Date: <span style="color:#e2e8f0;">${paymentDateStr}</span></td>
                    </tr>
                  </table>
                  <div style="margin:16px 0 8px;color:#e2e8f0;font-weight:600;">Line Items</div>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #334155;border-radius:8px;overflow:hidden;">
                    <tr style="background:#0b1220;">
                      <th align="left" style="padding:8px 12px;color:#cbd5e1;font-weight:600;">Description</th>
                      <th align="right" style="padding:8px 12px;color:#cbd5e1;font-weight:600;">Qty</th>
                      <th align="right" style="padding:8px 12px;color:#cbd5e1;font-weight:600;">Unit</th>
                      <th align="right" style="padding:8px 12px;color:#cbd5e1;font-weight:600;">Total</th>
                    </tr>
                    ${htmlItems}
                    ${feeCents > 0 ? `
                    <tr>
                      <td style=\"padding:8px 12px;border-top:1px solid #334155;color:#e2e8f0;\">Processing Fee (${pct}%)</td>
                      <td align=\"right\" style=\"padding:8px 12px;border-top:1px solid #334155;color:#cbd5e1;\">1</td>
                      <td align=\"right\" style=\"padding:8px 12px;border-top:1px solid #334155;color:#cbd5e1;\">${moneyFromCents(feeCents)}</td>
                      <td align=\"right\" style=\"padding:8px 12px;border-top:1px solid #334155;color:#e2e8f0;\">${moneyFromCents(feeCents)}</td>
                    </tr>` : ''}
                    <tr>
                      <td colspan="3" align="right" style="padding:12px;color:#94a3b8;">Total</td>
                      <td align="right" style="padding:12px;color:#e2e8f0;font-weight:700;">${totalStr}</td>
                    </tr>
                  </table>
                  <div style="margin-top:16px;color:#94a3b8;font-size:12px;">This charge will appear on your statement as <strong style="color:#e2e8f0;">AGENCY DEVWORKS</strong>.</div>
                  <div style="margin-top:8px;color:#94a3b8;font-size:12px;">Questions? Contact us at <a href="mailto:official@agencydevworks.ai" style="color:#93c5fd;">official@agencydevworks.ai</a> or +1 888-869-1662.</div>
                  <div style="margin-top:4px;color:#94a3b8;font-size:12px;">Business address: 20830 Stevens Creek Blvd #1103, Cupertino, 95014</div>
                  <div style="margin-top:8px;color:#94a3b8;font-size:12px;">Refund policy: <a href="${origin}/terms/billing" style="color:#93c5fd;">View details</a></div>
                </td>
              </tr>
              <tr>
                <td style="padding:16px;text-align:center;color:#64748b;font-size:11px;border-top:1px solid #334155;">Secured by Stripe • © ${new Date().getFullYear()} Agency DevWorks</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
  </html>`;

    const transporter = buildTransporter();
    const fromEnv = process.env.OUTLOOK_FROM || '';
    const userAddr = process.env.OUTLOOK_USER as string;
    const m = fromEnv.match(/^\s*"?([^"<]+)"?\s*<\s*([^>]+)\s*>\s*$/);
    const fromField: any = m ? { name: m[1], address: m[2] } : (fromEnv.includes('@') ? fromEnv : userAddr);

    await transporter.sendMail({ from: fromField, to: data.userEmail, subject: `Receipt - ${companyName} - ${totalStr}`, html });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    const status = e?.status || 500;
    return NextResponse.json({ error: e?.message || 'Failed to resend receipt' }, { status });
  }
}


