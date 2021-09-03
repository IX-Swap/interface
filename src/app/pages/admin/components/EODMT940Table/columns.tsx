import { formatDateToMMDDYY, formatTime } from 'helpers/dates'
import { TableColumn } from 'types/util'
import { VirtualAccountAuditItem } from 'types/virtualAccount'

export const columns: Array<TableColumn<VirtualAccountAuditItem>> = [
  {
    key: 'createdAt',
    label: '',
    render: formatDateToMMDDYY
  },
  {
    key: 'createdAt',
    label: '',
    render: formatTime
  },
  {
    key: 'fileName',
    label: ''
  }
]
