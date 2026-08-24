import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { WidgetPage } from './WidgetPage'

describe('WidgetPage polling', () => {
  beforeEach(() => { vi.useFakeTimers(); vi.stubGlobal('fetch', vi.fn()) })
  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals() })

  it('updates data without reloading the page', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ id: 'demo123', title: 'Pierwszy tytuł', amountCollected: 1, currency: 'PLN', updatedAt: '1' })))
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ id: 'demo123', title: 'Nowy tytuł', amountCollected: 2, currency: 'PLN', updatedAt: '2' })))
    render(<WidgetPage id="demo123" />)
    await act(async () => { await Promise.resolve(); await Promise.resolve() })
    expect(screen.getByRole('heading', { name: 'Pierwszy tytuł' })).toBeInTheDocument()
    await act(async () => { await vi.advanceTimersByTimeAsync(5_000) })
    expect(screen.getByRole('heading', { name: 'Nowy tytuł' })).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('shows a discrete initial error state', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('offline'))
    render(<WidgetPage id="demo123" />)
    await act(async () => { await Promise.resolve(); await Promise.resolve() })
    expect(screen.getByText('Dane zbiórki są chwilowo niedostępne.')).toBeInTheDocument()
  })
})
