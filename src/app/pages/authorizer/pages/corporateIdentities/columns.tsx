import { TableColumn } from 'types/util'
import { CorporateIdentity } from 'types/identity'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderRepresentativeName } from 'helpers/tables'

export const columns: Array<TableColumn<CorporateIdentity>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'companyLegalName',
    label: 'Company Name'
  },
  {
    key: 'companyAddress.country',
    label: 'Country'
  },
  {
    key: 'representatives[0].firstname',
    label: 'Representative',
    render: renderRepresentativeName
  }
]
