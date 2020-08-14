import moment from 'moment'
import { TableColumn } from '../../../../types/util'
import { IndividualIdentity } from '../../../../types/identity'

export const columns: Array<TableColumn<IndividualIdentity>> = [
  {
    key: 'createdAt',
    label: 'Date of Application',
    render: (a: string) => moment(a).format('MM/DD/YY')
  },
  {
    key: 'firstName',
    label: 'Name',
    render: (a: string, row: IndividualIdentity) => `${a} ${row.lastName}`
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
    render: (a: string) => `SGD ${a}`
  }
]

export default columns
