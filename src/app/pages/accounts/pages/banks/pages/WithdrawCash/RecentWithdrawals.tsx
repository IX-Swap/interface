import { Typography } from '@mui/material'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import columns from 'app/pages/accounts/pages/banks/pages/WithdrawCash/columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { VSpacer } from 'components/VSpacer'
import { accountsURL } from 'config/apiURL'
import { cashWithdrawalsQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import React from 'react'
import { CashWithdrawal } from 'types/cashWithdrawal'

export const RecentWithdrawals: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { data, isLoading } = useVirtualAccount()
  if (isLoading || data === undefined) {
    return null
  }

  return (
    <>
      <Typography variant='h5'>Recent Withdrawals</Typography>
      <VSpacer size='small' />
      <TableView<CashWithdrawal>
        uri={accountsURL.virtualAccounts.getAllTransactions(userId, data._id)}
        name={cashWithdrawalsQueryKeys.getByVirtualAccount(data.accountNumber)}
        columns={columns}
        filter={{ sourceType: 'Withdrawal' }}
      />
    </>
  )
}
