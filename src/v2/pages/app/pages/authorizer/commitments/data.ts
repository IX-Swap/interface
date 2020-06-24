import moment from 'moment'
import { TableColumn } from '../../../../../types/util'
import { formatMoney } from '../../../../../helpers/numbers'
import { Commitment } from '../../../../../types/commitment'

export const columns: Array<TableColumn<Commitment>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: (a: string) => moment(a).format('MM/DD/YY')
  },
  {
    key: 'individual.firstname',
    label: 'Name',
    render: (a: string, row: Commitment) => `${a} ${row.individual.lastName}`
  },
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'dso.tokenName',
    label: 'Digital Security'
  },
  {
    key: 'dso.issuerName',
    label: 'Issuer'
  },
  {
    key: 'totalAmount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right',
    render: (a: number, row: Commitment) => formatMoney(a, row.currency.numberFormat.currency)
  }
]

export default columns
