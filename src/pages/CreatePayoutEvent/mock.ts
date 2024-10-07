import { FormValues } from './utils'

export const payoutTypes = [
  {
    id: 1,
    label: 'Dividends',
    value: 'dividends',
    description: 'Dividends - A token reward paid to the shareholders for their investment in a company’s equity',
  },
  {
    id: 2,
    label: 'Interest',
    value: 'interest',
    description:
      'Interest - Is the monetary charge for the privilege of borrowing money, typically expressed as an annual percentage rate (APR).',
  },
  {
    id: 3,
    label: 'Royalties',
    value: 'royalties',
    description:
      'Royalties - A legally binding payment made to an individual or company for the ongoing use of their assets, including copyrighted works, franchises, and natural resources.',
  },
  {
    id: 4,
    label: 'Other',
    value: 'other',
    description:
      'Other - Any type of pay-out that doesn’t fall under any of the options can be tagged as “Other”, provided that additional details will be provided about the payout event.',
  },
]

export const initialValues: FormValues = {
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
  secToken: null,
  token: null,
  files: [],
  blockNumber: 0,
  includeOriginSupply: false,
}
