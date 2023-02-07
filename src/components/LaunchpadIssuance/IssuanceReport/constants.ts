import { IssuanceReportTab } from './Table/types'

export const EMPTY_VALUE = { label: 'All', value: 'all' }
export const tabs = [
  { name: 'Registrations', type: IssuanceReportTab.REGISTRATIONS },
  { name: 'Investments', type: IssuanceReportTab.INVESTMENTS },
]
