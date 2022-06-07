export const mockSecTokens = [
  { value: 1, label: 'TSLA' },
  { value: 2, label: 'AAVE' },
  { value: 3, label: 'TTNM' },
]

export const payoutTypes = [
  { id: 1, label: 'Dividends', description: 'Dividends - One payment date' },
  { id: 2, label: 'Rewards', description: 'Rewards - One payment date' },
  { id: 3, label: 'Interest', description: 'Interest - One payment date' },
  { id: 4, label: 'Royalties', description: 'Royalties - One payment date' },
  { id: 5, label: 'Airdrop', description: 'Airdrop - One payment date' },
  { id: 6, label: 'Other' },
]

export const initialValues = {
  id: '',
  title: '',
  description: '',
  type: '',
  otherType: '',
  secTokenAmount: '',
  tokenAmount: '',
  recordDate: '',
  startDate: '',
  endDate: '',
  secTokenId: null,
  tokenId: null,
}