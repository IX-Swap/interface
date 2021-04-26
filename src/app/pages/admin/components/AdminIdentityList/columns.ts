import { formatDateToMMDDYY } from 'helpers/dates'
import { AdminIdentity } from 'types/adminIdentity'
import { TableColumn } from 'types/util'

export const renderDate = (date: string) => formatDateToMMDDYY(date)

export const columns: Array<TableColumn<AdminIdentity>> = [
  {
    key: 'createdAt',
    label: 'Date of Application',
    render: renderDate
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'email',
    label: 'Email Address'
  },
  {
    key: 'country',
    label: 'Country'
  },
  {
    key: 'createdBy.name',
    label: 'Created by'
  }
]
