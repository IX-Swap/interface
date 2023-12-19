import { formatDateToMMDDYY } from 'helpers/dates'
import { formatMoney } from 'helpers/numbers'
import React from 'react'
import { CashDeposit } from 'types/cashDeposit'
import { CashWithdrawal } from 'types/cashWithdrawal'
import { TableColumn } from 'types/util'
import { HeadCellWithSort } from 'ui/UIKit/TablesKit/components/HeadCellWithSort/HeadCellWithSort'
import { TransactionStatus } from './TransactionStatus'
import { isEmpty } from 'lodash'
import { renderAddressColumn } from 'helpers/rendering'

export const renderDate = (date: string) => formatDateToMMDDYY(date)
export const renderStatus = (
  status: 'COMPLETED' | 'Rejected' | 'PENDING',
  _row: CashWithdrawal | CashDeposit
) => <TransactionStatus status={status} />

export const columns: Array<TableColumn<CashWithdrawal | CashDeposit>> = [
  {
    key: '_id',
    label: 'Transaction ID',
    render: txHash => (!isEmpty(txHash) ? renderAddressColumn(txHash) : '-')
  },
  {
    key: 'createdAt',
    label: <HeadCellWithSort label={'Date'} field={'createdAt'} />,
    render: renderDate
  },
  {
    key: 'type',
    label: 'Type',
    render: (val: string, _row: CashWithdrawal | CashDeposit) => {
      return val === 'Credit' ? 'Deposit' : 'Withdraw'
    }
  },
  {
    key: 'amount',
    label: <HeadCellWithSort label={'Amount'} field={'amount'} />,
    secret: true,
    headAlign: 'right',
    align: 'right',
    render: (val: number, row: CashWithdrawal | CashDeposit) =>
      formatMoney(val, row?.currency ?? row?.asset?.symbol)
  },
  {
    key: 'status',
    label: <HeadCellWithSort label={'Status'} field={'status'} />,
    render: renderStatus
  }
]

export const compactColumns = [
  {
    key: '_id',
    label: 'Transaction ID',
    render: (val: string, _row: CashWithdrawal | CashDeposit) =>
      `${val.substring(0, 15)}...`
  },
  ...columns.slice(1)
]
