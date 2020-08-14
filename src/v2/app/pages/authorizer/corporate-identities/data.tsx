import moment from 'moment'
import { TableColumn } from '../../../../types/util'
import { CorporateIdentity } from '../../../../types/identity'

export const columns: Array<TableColumn<CorporateIdentity>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: (a: string) => moment(a).format('MM/DD/YY')
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
    render: (a: string, row: CorporateIdentity) =>
      `${a} ${row.representatives[0].lastName}`
  }
]

export default columns
