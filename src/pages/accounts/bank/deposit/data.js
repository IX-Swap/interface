import moment from 'moment'

export const columns = [
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: (val: string) => moment(val).format('MM/DD/YY')
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right',
    render: (val: string, row: any) =>
      `${row.asset.symbol} ${val
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
  },
  {
    key: 'status',
    label: 'Status'
  }
]
