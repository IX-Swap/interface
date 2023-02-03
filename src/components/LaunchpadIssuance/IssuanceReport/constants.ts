import { IssuanceReportTab } from './Table/types'

export const EMPTY_VALUE = { label: 'All', value: 'all' }
export const tabs = [
  { name: 'Registrations', type: IssuanceReportTab.REGISTRATIONS },
  { name: 'Investments', type: IssuanceReportTab.INVESTMENTS },
]
export const extractFields = [
  'name',
  'companyName',
  'invesmentAmount',
  'tokenAmount',
  'walletAddress',
  'transactionId',
  'nationality',
  'country',
  'accredited',
  'email',
  'occupation',
  'income',
  'dateOfBirth',
  'stage',
  'wishAmount',
]

type ExtractField = typeof extractFields[number]

export const initialValues = extractFields.reduce(
  (acc, current) => ({ ...acc, [current]: true }),
  {} as { [key: ExtractField]: boolean }
)
