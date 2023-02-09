export const ITEM_ROWS = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
]

export enum OFFER_STATUSES {
  whitelist = 'Register to Invest',
  preSale = 'Pre-Sale',
  sale = 'Public Sale',
  closed = 'Closed',
  claim = 'Token Claim',
}
export const KEY_OFFER_STATUSES = Object.keys(OFFER_STATUSES);