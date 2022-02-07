import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { CashDeposit } from 'types/cashDeposit'
import { columns } from 'app/pages/accounts/pages/banks/pages/DepositCash/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { cashDepositsQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { Typography } from '@mui/material'
import { VSpacer } from 'components/VSpacer'

export interface RecentDepositsProps {
  virtualAccountNumber?: string
}

export const RecentDeposits: React.FC<RecentDepositsProps> = ({
  virtualAccountNumber
}) => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { data, isLoading } = useVirtualAccount(virtualAccountNumber)

  if (isLoading) {
    return null
  }

  return (
    <>
      <Typography variant='h5'>Recent Deposits</Typography>
      <VSpacer size='small' />
      <TableView<CashDeposit>
        uri={accountsURL.virtualAccounts.getAllTransactions(userId, data?._id)}
        name={cashDepositsQueryKeys.getByVirtualAccount(
          virtualAccountNumber ?? ''
        )}
        columns={columns}
        filter={{ sourceType: 'Deposit' }}
      />
    </>
  )
}
