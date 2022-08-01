import { formatDateToMMDDYY } from 'helpers/dates'
import { formatMoney } from 'helpers/numbers'
import React from 'react'
import { CashDeposit } from 'types/cashDeposit'
import { CashWithdrawal } from 'types/cashWithdrawal'
import { TableColumn } from 'types/util'
import { TransactionStatus } from './TransactionStatus'

export const renderDate = (date: string) => formatDateToMMDDYY(date)
export const renderStatus = (
  status: 'COMPLETED' | 'REJECTED' | 'PENDING',
  _row: CashWithdrawal | CashDeposit
) => <TransactionStatus status={status} />

export const columns: Array<TableColumn<CashWithdrawal | CashDeposit>> = [
  {
    key: '_id',
    label: 'Transaction ID'
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: renderDate
  },
  {
    key: 'type',
    label: 'Type',
    render: (val: string, _row: CashWithdrawal | CashDeposit) => {
      return val === 'Credit' ? 'Deposit' : 'Withraw'
    }
  },
  {
    key: 'amount',
    label: 'Amount',
    secret: true,
    render: (val: number, row: CashWithdrawal | CashDeposit) =>
      formatMoney(val, row?.currency ?? row?.asset?.symbol)
  },
  {
    key: 'status',
    label: 'Status',
    render: renderStatus
  }
]

export const compactColumns = [
  {
    key: '_id',
    label: 'Transaction ID',
    render: (val: string, _row: CashWithdrawal | CashDeposit) =>
      `${val.substring(0, 5)}...`
  },
  ...columns.slice(1)
]
