import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FundraiserWidget } from './FundraiserWidget'

const base = { id: 'demo123', title: 'Wspieramy schronisko', amountCollected: 0, amountToCollect: 20000, currency: 'PLN' }

describe('FundraiserWidget', () => {
  it('renders collection data and zero amount', () => {
    render(<FundraiserWidget fundraiser={base} locale="pl-PL" />)
    expect(screen.getByRole('heading', { name: base.title })).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('0,00'), { selector: 'strong' })).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
  })

  it('hides target and progress bar with no collection goal', () => {
    const { container } = render(<FundraiserWidget fundraiser={{ ...base, amountToCollect: undefined }} locale="pl-PL" />)
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(screen.queryByText(/cel:/i)).not.toBeInTheDocument()
    expect(container.querySelector('.fundraiser-widget--no-goal')).toBeInTheDocument()
  })

  it('caps accessible progress at 100% when the goal is exceeded', () => {
    render(<FundraiserWidget fundraiser={{ ...base, amountCollected: 25000 }} locale="pl-PL" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })
})
