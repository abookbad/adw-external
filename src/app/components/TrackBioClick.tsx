'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const allowedSources = new Set(['ahdg', 'mhdg', 'sadg', 'madg'])

export default function TrackBioClick() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const source = searchParams.get('source') || ''
    if (!source || !allowedSources.has(source)) return

    const payload = {
      source,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      screen: typeof window !== 'undefined'
        ? { width: window.screen.width, height: window.screen.height, pixelRatio: window.devicePixelRatio || 1 }
        : undefined,
      occurredAt: new Date().toISOString(),
    }

    const data = JSON.stringify(payload)
    const endpoint = '/api/track'

    try {
      if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
        const blob = new Blob([data], { type: 'application/json' })
        const sent = (navigator as any).sendBeacon(endpoint, blob)
        if (sent) return
      }
    } catch {}

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
      keepalive: true,
    }).catch(() => {})
  }, [searchParams])

  return null
}


