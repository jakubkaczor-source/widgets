import { useEffect, useState } from 'react'
import { fetchFundraiser } from '../lib/fundraiser'
import type { Fundraiser } from '../types'

const POLL_INTERVAL = 5_000

export function useFundraiser(id: string) {
  const [data, setData] = useState<Fundraiser | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    let previousUpdatedAt: string | undefined
    const controller = new AbortController()

    const load = async () => {
      try {
        const next = await fetchFundraiser(id, controller.signal)
        if (!mounted) return
        if (next.updatedAt !== undefined && next.updatedAt === previousUpdatedAt) return
        previousUpdatedAt = next.updatedAt
        setData(next)
        setError(null)
      } catch (caught) {
        if (mounted && !(caught instanceof DOMException && caught.name === 'AbortError')) {
          setError(caught instanceof Error ? caught.message : 'Nie udało się pobrać danych.')
        }
      }
    }

    void load()
    const timer = window.setInterval(() => void load(), POLL_INTERVAL)
    return () => { mounted = false; controller.abort(); window.clearInterval(timer) }
  }, [id])

  return { data, error }
}
