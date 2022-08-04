import { AccountsRoute } from 'app/pages/accounts/router/config'
import { NewAction } from 'app/pages/authorizer/components/NewAction'
import { ReactComponent as DepositIcon } from 'assets/icons/deposit.svg'
import { ReactComponent as WithdrawIcon } from 'assets/icons/withdraw.svg'
import { isNullish } from 'helpers/numbers'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { ActionsProps } from './Actions'

export const MobileActions = ({ item }: ActionsProps) => {
  const account = item.accountNumber
  const { push } = useHistory()
  const params = new URLSearchParams()
  params.append('account', account)

  return (
    <>
      <NewAction
        label='Deposit'
        icon={<DepositIcon />}
        onClick={() =>
          push({ pathname: AccountsRoute.deposit, search: params.toString() })
        }
      />
      <NewAction
        label='Withdraw'
        disabled={isNullish(item.balance.available)}
        icon={<WithdrawIcon />}
        onClick={() =>
          push({
            pathname: AccountsRoute.withdraw,
            search: params.toString()
          })
        }
      />
    </>
  )
}
