import { formatDateToMMDDYY, formatTime } from 'helpers/dates'
import { TableColumn } from 'types/util'
import { VAAuditOutboundItem } from 'types/virtualAccount'

export const columns: Array<TableColumn<VAAuditOutboundItem>> = [
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
  },
  {
    key: 'fileType',
    label: ''
  }
]
