import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { CashDeposit } from 'types/cashDeposit'
import { columns } from 'app/pages/accounts/pages/banks/pages/DepositCash/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { cashDepositsQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { Typography } from '@material-ui/core'
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

  if (isLoading || data === undefined || virtualAccountNumber === undefined) {
    return null
  }

  return (
    <>
      <Typography variant='h5'>Recent Deposits</Typography>
      <VSpacer size='small' />
      <TableView<CashDeposit>
        uri={accountsURL.cashDeposits.getAllVirtualAccountTransactions(
          userId,
          data._id
        )}
        name={cashDepositsQueryKeys.getByUserId(userId)}
        columns={columns}
        filter={{ sourceType: 'Deposit' }}
      />
    </>
  )
}
