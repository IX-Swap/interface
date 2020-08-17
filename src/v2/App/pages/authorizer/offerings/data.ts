import moment from 'moment'
import { TableColumn } from '../../../../types/util'
import { formatMoney } from '../../../../helpers/numbers'
import { Dso } from '../../../../types/dso'

export const columns: Array<TableColumn<Dso>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: (a: string) => moment(a).format('MM/DD/YY')
  },
  {
    key: 'tokenName',
    label: 'Digital Security'
  },
  {
    key: 'capitalStructure',
    label: 'Capital Structure'
  },
  {
    align: 'right',
    headAlign: 'right',
    key: 'pricePerUnit',
    label: 'Unit Price',
    render: (a: number, row: Dso) =>
      formatMoney(a, row.currency[0]?.numberFormat?.currency ?? '')
  },
  {
    align: 'right',
    headAlign: 'right',
    key: 'minimumInvestment',
    label: 'Minimum Investment',
    render: (amount: number, row: Dso) => formatMoney(amount, row.tokenSymbol)
  }
]

export default columns
