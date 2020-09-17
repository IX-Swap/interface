import moment from 'moment'

export const columns = [
  {
    label: 'Digital Security',
    key: 'asset.symbol'
  },
  {
    label: 'Status',
    key: 'status'
  },
  {
    label: 'Amount',
    key: 'amount',
    render: (value: any) => value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  },
  {
    label: 'Date',
    key: 'date',
    render: (value: any) => moment(value).format('MM/DD/YYYY')
  },
  {
    label: 'Information',
    key: 'hash'
  }
]
