import { FinancialReport } from 'types/financitalReport'
import { TableColumn } from 'types/util'

export const columns: Array<TableColumn<FinancialReport>> = [
  {
    key: 'creationDate',
    label: 'Creation Date'
  },
  {
    key: 'reportInterval',
    label: 'Report Interval'
  },
  {
    key: 'type',
    label: 'Type'
  },
  {
    key: 'reportOf',
    label: 'Report of'
  }
]
