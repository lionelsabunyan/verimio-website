/**
 * GA4 event tracking helper — minimal, tip-güvenli wrapper.
 *
 * Kullanım:
 *   import { track } from '@/lib/analytics/events'
 *   track('checkup_form_submit', { source: 'analiz_page' })
 *
 * NEXT_PUBLIC_GA_ID env var tanımlı değilse sessizce hiçbir şey yapmaz.
 */

type GAEventName =
  | 'checkup_form_start'
  | 'checkup_form_step'
  | 'checkup_form_submit'
  | 'checkup_form_error'
  | 'cta_click'
  | 'blog_read_50'
  | 'blog_read_100'
  | 'faq_expand'
  | 'external_link_click'

interface GAEventParams {
  [key: string]: string | number | boolean | undefined
}

type GtagFunction = (
  command: 'event',
  eventName: string,
  params: GAEventParams
) => void

function getGtag(): GtagFunction | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { gtag?: GtagFunction }
  return w.gtag ?? null
}

export function track(name: GAEventName, params: GAEventParams = {}) {
  const gtag = getGtag()
  if (!gtag) return
  gtag('event', name, {
    ...params,
    send_to: process.env.NEXT_PUBLIC_GA_ID,
  })
}

/**
 * Çıkış linki takibi (harici linkler için)
 */
export function trackExternalClick(url: string, label?: string) {
  track('external_link_click', { url, label })
}

/**
 * Check-up form adımları
 */
export function trackCheckupStep(step: number, total: number) {
  track('checkup_form_step', { step, total })
}

export function trackCheckupSubmit(sector?: string) {
  track('checkup_form_submit', { sector: sector ?? 'unknown' })
}

export function trackCheckupError(reason: string) {
  track('checkup_form_error', { reason })
}

/**
 * CTA tıklamaları
 */
export function trackCtaClick(label: string, location: string) {
  track('cta_click', { label, location })
}
