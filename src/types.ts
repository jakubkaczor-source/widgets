export type Portal = 'zrzutka' | '4fund'

export interface Fundraiser {
  id: string
  title: string
  amountCollected: number
  amountToCollect?: number
  currency: string
  paymentCount?: number
  updatedAt?: string
}
