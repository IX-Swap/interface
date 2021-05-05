import { TableColumn } from 'types/util'
import { formatDateToMMDDYY } from 'helpers/dates'
import { DetailsOfIssuance } from 'types/detailsOfIssuance'

export const columns: Array<TableColumn<DetailsOfIssuance>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'fullName',
    label: 'Full Name'
  },
  {
    key: 'companyName',
    label: 'Company Name'
  },
  {
    key: 'email',
    label: 'Email'
  }
]
