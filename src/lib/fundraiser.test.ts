import { describe, expect, it } from 'vitest'
import { formatMoney, parseFundraiser, progressPercent } from './fundraiser'

describe('fundraiser helpers', () => {
  it('formats a zero collected amount in the supplied currency', () => {
    expect(formatMoney(0, 'PLN', 'pl-PL')).toBe('0,00 zł')
  })

  it('clamps progress and returns no progress when a goal is absent', () => {
    expect(progressPercent(250, 100)).toBe(100)
    expect(progressPercent(10)).toBeNull()
    expect(progressPercent(10, 0)).toBeNull()
  })

  it('accepts the documented API response and rejects missing required fields', () => {
    expect(parseFundraiser({ id: 'demo123', title: 'Test', amountCollected: 0, amountToCollect: 20000, currency: 'PLN' })).toMatchObject({ id: 'demo123' })
    expect(() => parseFundraiser({ id: 'demo123', title: 'Test' })).toThrow(/wymaganych/)
  })
})
