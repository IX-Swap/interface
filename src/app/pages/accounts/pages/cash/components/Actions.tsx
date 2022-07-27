import { Box, Button } from '@mui/material'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { ConvertedAssetBalance } from 'types/balance'
import { useStyles } from 'app/pages/accounts/pages/cash/components/Actions.styles'
export interface ActionsProps {
  item: ConvertedAssetBalance
}

export const Actions = ({ item }: ActionsProps) => {
  const styles = useStyles()
  const account = item.accountNumber
  const { push } = useHistory()
  const params = new URLSearchParams()
  params.append('account', account)

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
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
        onClick={() =>
          push({ pathname: AccountsRoute.withdraw, search: params.toString() })
        }
      >
        Withdraw
      </Button>
    </Box>
  )
}
