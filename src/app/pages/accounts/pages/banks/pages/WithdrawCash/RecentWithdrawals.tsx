import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { CashWithdrawal } from 'types/cashWithdrawal'
import columns from 'app/pages/accounts/pages/banks/pages/WithdrawCash/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { cashWithdrawalsQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { useFormContext } from 'react-hook-form'
import { Typography } from '@mui/material'
import { VSpacer } from 'components/VSpacer'

export const RecentWithdrawals: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { watch } = useFormContext()
  const virtualAccountNumber = watch('virtualAccount')
  const { data, isLoading } = useVirtualAccount(virtualAccountNumber)

  if (isLoading || data === undefined || virtualAccountNumber === undefined) {
    return null
  }

  return (
    <>
      <Typography variant='h5'>Recent Withdrawals</Typography>
      <VSpacer size='small' />
      <TableView<CashWithdrawal>
        uri={accountsURL.virtualAccounts.getAllTransactions(userId, data._id)}
        name={cashWithdrawalsQueryKeys.getByVirtualAccount(
          virtualAccountNumber
        )}
        columns={columns}
        filter={{ sourceType: 'Withdrawal' }}
      />
    </>
  )
}
