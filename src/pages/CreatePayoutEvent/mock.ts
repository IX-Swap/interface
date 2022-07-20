export const payoutTypes = [
  {
    id: 1,
    label: 'Dividends',
    description: 'Dividends - a token reward paid to the shareholders for their investment in a company’s equity',
  },
  {
    id: 2,
    label: 'Interest',
    description:
      'Interest - is the monetary charge for the privilege of borrowing money, typically expressed as an annual percentage rate (APR).',
  },
  {
    id: 3,
    label: 'Royalties',
    description:
      'Royalties - a legally binding payment made to an individual or company for the ongoing use of their assets, including copyrighted works, franchises, and natural resources.',
  },
  {
    id: 4,
    label: 'Airdrop',
    description:
      'Airdrop - this payout type is used to distribute a specific number of FREE tokens to eligible token holders as part of a marketing promotion.',
  },
  {
    id: 5,
    label: 'Other',
    description:
      'Other - any type of pay-out that doesn’t fall under any of the options can be tagged as “Other”, provided that additional details will be provided about the payout event.',
  },
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
  secToken: null as any,
  token: null as any,
  files: [],
}
