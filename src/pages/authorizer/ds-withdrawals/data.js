// @flow
import moment from 'moment'

export const columns = [
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'individual.firstName',
    label: 'User',
    render: (val: string, row: any) => `${val} ${row.individual.lastName}`
  },
  {
    key: 'createdAt',
    label: 'Date of Application',
    // $$FlowFixMe
    render: (a: string) => moment(a).format('MM/DD/YYYY hh:mm:ss a')
  },
  {
    key: 'asset',
    label: 'Digital Security',
    // $$FlowFixMe
    render: (a: any) => a.symbol
  },
  {
    key: 'recipientWallet',
    label: "Recipient's IXPS Address"
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right',
    // $$FlowFixMe
    render: (amount: number) =>
      amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  },
  {
    key: 'memo',
    label: 'Memo'
  },
  {
    key: '',
    label: 'Actions'
  }
]
