import { TableColumn } from 'v2/types/util'
import { CorporateIdentity } from 'v2/types/identity'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import { renderLastName, renderRepresentativeName } from 'v2/helpers/tables'

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
