import { Button, Grid } from '@mui/material'
import { useStyles } from 'app/pages/accounts/pages/cash/components/Actions.styles'
import { CashStatus } from 'app/pages/accounts/pages/cash/components/CashStatus'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { isNullish } from 'helpers/numbers'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { ConvertedAssetBalance } from 'types/balance'
export interface ActionsProps {
  item: ConvertedAssetBalance
}

export const Actions = ({ item }: ActionsProps) => {
  const styles = useStyles()
  const account = item.accountNumber
  const { push } = useHistory()
  const params = new URLSearchParams()
  params.append('account', account)
  if (item.status !== 'Approved') {
    return (
      <Grid display={'flex'} alignItems={'center'}>
        <CashStatus item={item} />
      </Grid>
    )
  }
  return (
    <Grid display={'flex'} alignItems={'center'} gap={3.5}>
      <Button
        className={styles.button}
        variant={'text'}
        onClick={() =>
          push({ pathname: AccountsRoute.deposit, search: params.toString() })
        }
      >
        Deposit
      </Button>
      <Button
        className={styles.button}
        variant={'text'}
        disabled={isNullish(item.balance.available)}
        onClick={() =>
          push({ pathname: AccountsRoute.withdraw, search: params.toString() })
        }
      >
        Withdraw
      </Button>
    </Grid>
  )
}
