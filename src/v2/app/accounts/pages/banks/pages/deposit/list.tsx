import React from 'react'
import TableView from 'v2/components/TableWithPagination'
import { CashDeposit } from 'v2/types/cashdeposit'
import storageHelper from 'v2/helpers/storageHelper'
import columns from 'v2/app/accounts/pages/banks/pages/deposit/data'

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
