import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getAdminDb } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
  try {
    const { toEmail, companyId, companyName, inviterName } = await req.json();
    if (!toEmail || !companyId) return NextResponse.json({ error: 'Missing params' }, { status: 400 });

    const adminDb = getAdminDb();
    const tokenDoc = adminDb.collection('invites').doc();
    const token = tokenDoc.id;
    const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
    await tokenDoc.set({ toEmail, companyId, companyName: companyName || null, createdAt: Date.now(), expiresAt, used: false });

    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const inviteUrl = `${origin}/register/complete?email=${encodeURIComponent(toEmail)}&company=${encodeURIComponent(companyName || '')}&invite=${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.OUTLOOK_SMTP_HOST || 'smtp.office365.com',
      port: Number(process.env.OUTLOOK_SMTP_PORT || 587),
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.OUTLOOK_USER as string,
        pass: process.env.OUTLOOK_PASS as string,
      },
    });

    const html = `
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b1220;padding:24px;color:#e2e8f0;font-family:Segoe UI,Arial,sans-serif;">
        <tr>
          <td align="center">
            <table width="640" cellpadding="0" cellspacing="0" style="background:#0f172a;border:1px solid #334155;border-radius:12px;overflow:hidden;">
              <tr>
                <td style="padding:24px;text-align:center;background:#0b1220;border-bottom:1px solid #334155;">
                  <img src="${origin}/adw_final.png" alt="ADW" width="64" height="64" style="display:block;margin:0 auto 8px;" />
                  <div style="font-weight:700;font-size:18px;letter-spacing:.12em;text-transform:uppercase;color:#e2e8f0;">Agency DevWorks</div>
                </td>
              </tr>
              <tr>
                <td style="padding:28px;">
                  <h1 style="margin:0 0 12px;font-size:20px;color:#fff;letter-spacing:.08em;text-transform:uppercase;">You’re Invited</h1>
                  <p style="margin:0 0 12px;color:#cbd5e1;">${inviterName || 'A teammate'} invited you to join <strong>${companyName || 'our portal'}</strong> on ADW.</p>
                  <p style="margin:0 0 20px;color:#cbd5e1;">Click the button below to finish setting up your account. Your email and company will be pre‑filled.</p>
                  <p style="text-align:center;margin:28px 0;">
                    <a href="${inviteUrl}" style="background:#2563eb;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;display:inline-block;font-weight:600">Accept Invitation</a>
                  </p>
                  <p style="margin:0;color:#94a3b8;font-size:12px;">This link expires in 7 days.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;

    // Build a compliant From header. Accepts "Name <addr@domain>" or falls back to OUTLOOK_USER
    const fromEnv = process.env.OUTLOOK_FROM || '';
    const userAddr = process.env.OUTLOOK_USER as string;
    const m = fromEnv.match(/^\s*"?([^"<]+)"?\s*<\s*([^>]+)\s*>\s*$/);
    const fromField: any = m ? { name: m[1], address: m[2] } : (fromEnv.includes('@') ? fromEnv : userAddr);

    await transporter.sendMail({
      from: fromField,
      to: toEmail,
      subject: `Join ${companyName || 'ADW Portal'}`,
      html,
    });

    return NextResponse.json({ ok: true, inviteUrl });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to send invite' }, { status: 400 });
  }
}


