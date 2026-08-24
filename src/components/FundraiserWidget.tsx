import { formatMoney, progressPercent } from '../lib/fundraiser'
import type { Fundraiser } from '../types'

interface Props { fundraiser: Fundraiser; locale: string }

export function FundraiserWidget({ fundraiser, locale }: Props) {
  const progress = progressPercent(fundraiser.amountCollected, fundraiser.amountToCollect)
  const collected = formatMoney(fundraiser.amountCollected, fundraiser.currency, locale)
  const goal = fundraiser.amountToCollect === undefined ? null : formatMoney(fundraiser.amountToCollect, fundraiser.currency, locale)

  return (
    <section className={`fundraiser-widget ${goal === null ? 'fundraiser-widget--no-goal' : ''}`} aria-label="Status zbiórki">
      <p className="widget-kicker">ZBIÓRKA NA ŻYWO</p>
      <h1>{fundraiser.title}</h1>
      <div className="amount-row">
        <strong className="amount-value" aria-label={`Zebrano ${collected}`}>{collected}</strong>
        {goal && <span className="goal-value">cel: {goal}</span>}
      </div>
      {progress !== null && (
        <div className="progress-track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </section>
  )
}
