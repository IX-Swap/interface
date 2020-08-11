import React from 'react'
import TableView from '../../../../../../../../components/table-with-pagination'
import { CashDeposit } from '../../../../../../../../types/cashdeposit'
import storageHelper from '../../../../../../../../helpers/storageHelper'
import columns from './data'

const DepositList = () => {
  return (
    <TableView<CashDeposit>
      uri={`/accounts/cash/deposits/list/${storageHelper.getUserId()}`}
      name={`cash-deposits-${storageHelper.getUserId()}`}
      columns={columns}
      filter={{ status: '' }}
    />
  )
}

export default DepositList
