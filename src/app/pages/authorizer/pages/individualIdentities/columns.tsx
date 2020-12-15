import { TableColumn } from 'types/util'
import { IndividualIdentity } from 'types/identity'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderIncome, renderLastName } from 'helpers/tables'

export const columns: Array<TableColumn<IndividualIdentity>> = [
  {
    key: 'createdAt',
    label: 'Date of Application',
    render: formatDateToMMDDYY
  },
  {
    key: 'firstName',
    label: 'Name',
    render: renderLastName
  },
  {
    key: 'address.country',
    label: 'Country'
  },
  {
    key: 'occupation',
    label: 'Occupation'
  },
  {
    key: 'annualIncome',
    label: 'Annual Income',
    render: renderIncome
  }
]
