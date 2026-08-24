import type { Fundraiser } from '../types'

const API_BASE = (import.meta.env.VITE_FUNDRAISER_API_BASE ?? 'https://zrzutka-live-api.oskarpuchalski17.workers.dev/api').replace(/\/$/, '')

function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}

export function parseFundraiser(value: unknown): Fundraiser {
  if (!value || typeof value !== 'object') throw new Error('Nieprawidłowa odpowiedź API.')
  const record = value as Record<string, unknown>
  if (typeof record.id !== 'string' || typeof record.title !== 'string' || typeof record.currency !== 'string' || !isNonNegativeNumber(record.amountCollected)) {
    throw new Error('Odpowiedź API nie zawiera wymaganych danych zbiórki.')
  }
  if (record.amountToCollect !== undefined && !isNonNegativeNumber(record.amountToCollect)) {
    throw new Error('Odpowiedź API zawiera nieprawidłowy cel zbiórki.')
  }
  return {
    id: record.id,
    title: record.title,
    amountCollected: record.amountCollected,
    amountToCollect: record.amountToCollect as number | undefined,
    currency: record.currency,
    paymentCount: typeof record.paymentCount === 'number' ? record.paymentCount : undefined,
    updatedAt: typeof record.updatedAt === 'string' ? record.updatedAt : undefined,
  }
}

export async function fetchFundraiser(id: string, signal?: AbortSignal): Promise<Fundraiser> {
  const response = await fetch(`${API_BASE}/fundraisers/${encodeURIComponent(id)}`, { signal, cache: 'no-store' })
  if (!response.ok) throw new Error(`Nie udało się pobrać danych (${response.status}).`)
  return parseFundraiser(await response.json())
}

export function formatMoney(amount: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount)
}

export function progressPercent(collected: number, goal?: number): number | null {
  if (!goal || goal <= 0) return null
  return Math.min(100, Math.max(0, (collected / goal) * 100))
}
