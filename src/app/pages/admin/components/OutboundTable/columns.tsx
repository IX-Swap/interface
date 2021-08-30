import { formatDateToMMDDYY, formatTime } from 'helpers/dates'
import { TableColumn } from 'types/util'
import { VAAuditOutboundItem } from 'types/virtualAccount'
import { Actions } from './Actions'
import React from 'react'

const renderVAFileUploadButton = (_: any, item: any) => {
  return <Actions item={item} forVAFile />
}

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
    key: 'vaFileName',
    label: '',
    render: renderVAFileUploadButton,
    align: 'right'
  }
]
