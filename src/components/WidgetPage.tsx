import { FundraiserWidget } from './FundraiserWidget'
import { useFundraiser } from '../hooks/useFundraiser'

export function WidgetPage({ id }: { id: string }) {
  const params = new URLSearchParams(window.location.search)
  const locale = params.get('locale') || 'pl-PL'
  const { data, error } = useFundraiser(id)

  return (
    <main className="widget-canvas">
      {data ? <FundraiserWidget fundraiser={data} locale={locale} /> : <p className="widget-status">{error ? 'Dane zbiórki są chwilowo niedostępne.' : 'Ładowanie zbiórki…'}</p>}
      {data && error && <p className="widget-refresh-warning" aria-live="polite">Oczekiwanie na aktualizację danych</p>}
    </main>
  )
}
