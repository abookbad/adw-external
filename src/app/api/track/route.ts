import { NextRequest, NextResponse } from 'next/server'

const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/PqpLnJVC3VrmBmWnu5d2/webhook-trigger/d9fb24f2-d298-4669-b02b-2b4d90e10ea9'

function normalizeIp(ip: string | null | undefined): string | undefined {
  if (!ip) return undefined
  let normalized = ip.trim()
  if (!normalized) return undefined
  // Remove IPv4-mapped IPv6 prefix
  if (normalized.startsWith('::ffff:')) normalized = normalized.slice(7)
  // Remove brackets around IPv6 if present
  normalized = normalized.replace(/^\[|\]$/g, '')
  return normalized
}

function getClientIp(req: NextRequest): string | undefined {
  // Prefer Cloudflare/Vercel headers when available
  const cfIp = normalizeIp(req.headers.get('cf-connecting-ip'))
  if (cfIp) return cfIp

  const vercelFwd = normalizeIp(req.headers.get('x-vercel-forwarded-for'))
  if (vercelFwd) return vercelFwd.split(',')[0]?.trim()

  const xff = req.headers.get('x-forwarded-for') || ''
  const forwarded = normalizeIp(xff.split(',')[0]?.trim())
  if (forwarded) return forwarded

  const realIp = normalizeIp(req.headers.get('x-real-ip'))
  if (realIp) return realIp

  try {
    // @ts-expect-error Accessing non-standard property when available in some runtimes
    const directIp = normalizeIp((req as any).ip as string | undefined)
    if (directIp) return directIp
  } catch {}

  return undefined
}

async function geolocate(ip?: string) {
  if (!ip) return undefined
  try {
    const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, { next: { revalidate: 60 * 60 } })
    if (!res.ok) return undefined
    const data = await res.json()
    return {
      ip,
      city: data.city,
      region: data.region,
      country: data.country_name || data.country,
      postal: data.postal,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      org: data.org,
    }
  } catch {
    return undefined
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ ok: false, error: 'Invalid body' }, { status: 400 })
    }

    const clientIp = getClientIp(req)
    const geo = await geolocate(clientIp)

    const userAgent = req.headers.get('user-agent') || undefined
    const referer = req.headers.get('referer') || undefined

    const payload = {
      event: 'instagram_bio_click',
      source: body.source,
      pageUrl: body.pageUrl,
      referrer: body.referrer || referer,
      userAgent: body.userAgent || userAgent,
      screen: body.screen,
      occurredAt: body.occurredAt || new Date().toISOString(),
      clientIp,
      geo,
    }

    // Forward to GHL webhook
    const forwardRes = await fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Avoid blocking the response too long
      next: { revalidate: 0 },
    })

    if (!forwardRes.ok) {
      const text = await forwardRes.text().catch(() => '')
      return NextResponse.json({ ok: false, forwarded: false, status: forwardRes.status, body: text }, { status: 200 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500 })
  }
}


