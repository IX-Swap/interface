import React from 'react'
import TableView from '../../../../../../../components/table-with-pagination'
import { CashWithdrawal } from '../../../../../../../types/cash-withdrawal'
import storageHelper from '../../../../../../../helpers/storageHelper'
import columns from './data'

const DepositList = () => {
  return (
    <TableView<CashWithdrawal>
      uri={`/accounts/cash/withdrawals/list/${storageHelper.getUserId()}`}
      name={`cash-withdrawals-${storageHelper.getUserId()}`}
      columns={columns}
      filter={{ status: '' }}
    />
  )
}

export default DepositList
