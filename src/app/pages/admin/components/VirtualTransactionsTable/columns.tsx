import { TableColumn } from 'types/util'
import { renderDateAndTimeField } from 'helpers/rendering'

// TODO Make changes after complete backend api endpoints
export const columns: Array<TableColumn<any>> = [
  {
    key: 'date',
    label: 'Date',
    render: renderDateAndTimeField
  },
  {
    key: 'from',
    label: 'From'
  },
  {
    key: 'to',
    label: 'To'
  },
  {
    key: 'direction',
    label: 'Direction'
  },
  {
    key: 'typesOfTransfer',
    label: 'Types Of Transfer'
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right'
  }
]
