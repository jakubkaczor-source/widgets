import { useMemo, useState } from 'react'
import type { Portal } from '../types'

const locales = [
  { value: 'pl-PL', label: 'Polski' },
  { value: 'en-US', label: 'English' },
]

export function GeneratorPage() {
  const [id, setId] = useState('demo123')
  const [portal, setPortal] = useState<Portal>('zrzutka')
  const [locale, setLocale] = useState('pl-PL')
  const [copied, setCopied] = useState(false)
  const url = useMemo(() => {
    const origin = window.location.origin
    return `${origin}/widget/${encodeURIComponent(id.trim() || 'demo123')}?portal=${portal}&locale=${encodeURIComponent(locale)}`
  }, [id, locale, portal])

  const copy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main className="generator-page">
      <section className="generator-card">
        <p className="eyebrow">WIDGETY STREAMINGOWE</p>
        <h1>Pokaż postęp zbiórki na żywo</h1>
        <p className="intro">Wygeneruj publiczny link i wklej go do OBS, Streamlabs lub vMix jako Browser Source.</p>
        <div className="form-grid">
          <label>ID zbiórki<input value={id} onChange={(event) => setId(event.target.value)} placeholder="np. demo123" /></label>
          <label>Portal<select value={portal} onChange={(event) => setPortal(event.target.value as Portal)}><option value="zrzutka">Zrzutka</option><option value="4fund">4fund</option></select></label>
          <label>Język<select value={locale} onChange={(event) => setLocale(event.target.value)}>{locales.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
        </div>
        <label className="url-label">Adres widgetu<div className="url-row"><input readOnly value={url} aria-label="Adres widgetu" /><button onClick={() => void copy()}>{copied ? 'Skopiowano' : 'Kopiuj adres'}</button></div></label>
        <ol className="obs-steps"><li>W OBS dodaj źródło <strong>Browser</strong>.</li><li>Wklej adres widgetu w pole URL.</li><li>Ustaw rozdzielczość 1920 × 1080 i pozostaw tło przezroczyste.</li></ol>
      </section>
      <section className="preview-section" aria-label="Podgląd widgetu">
        <div className="preview-bar"><span>Podgląd</span><a href={url} target="_blank" rel="noreferrer">Otwórz widget</a></div>
        <iframe key={url} className="widget-preview" title="Podgląd widgetu" src={url} />
      </section>
    </main>
  )
}
