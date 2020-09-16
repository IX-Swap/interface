import { TableColumn } from 'v2/types/util'
import { IndividualIdentity } from 'v2/types/identity'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import { renderIncome, renderLastName } from 'v2/helpers/tables'

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
