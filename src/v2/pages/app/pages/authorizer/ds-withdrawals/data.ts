import moment from 'moment'
import { TableColumn } from '../../../../../types/util'
import { Asset } from '../../../../../types/asset'
import { DSWithdrawal } from '../../../../../types/ds-withdrawal'
import { formatMoney } from '../../../../../helpers/numbers'

export const columns: Array<TableColumn<DSWithdrawal>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: (a: string) => moment(a).format('MM/DD/YY')
  },
  {
    key: 'individual.firstName',
    label: 'Name',
    render: (val: string, row: DSWithdrawal) => `${val} ${row.individual.lastName}`
  },
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'asset',
    label: 'Digital Security',
    render: (a: Asset) => a.name
  },
  {
    key: 'recipientWallet',
    label: 'Wallet'
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right',
    render: (amount: number, row: DSWithdrawal) => formatMoney(amount, row.asset.numberFormat.currency, true)
  },
  {
    key: 'memo',
    label: 'Memo'
  }
]

export default columns
