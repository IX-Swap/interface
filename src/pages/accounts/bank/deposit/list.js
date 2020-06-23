import React from 'react'
import { useHistory } from 'react-router-dom'
import TableWithPagination from 'components/TableWithPagination'
import storage from 'services/storageHelper'
import { columns } from './data'

const DepositList = () => {
  const history = useHistory()
  return (
    <TableWithPagination
      id='accountDepositList'
      endpoint={`/accounts/cash/deposits/list/${storage.getUserId()}`}
      columns={columns}
      onRowClick={(mDeposit) => {
        history.push({
          pathname: '/accounts/banks/deposit-view',
          state: { deposit: mDeposit }
        })
      }}
    />
  )
}

export default DepositList
