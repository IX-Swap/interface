import { Box, Button } from '@mui/material'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { ConvertedAssetBalance } from 'types/balance'

export interface ActionsProps {
  item: ConvertedAssetBalance
}

export const Actions = ({ item }: ActionsProps) => {
  const styles = { height: 33, marginRight: 8 }
  const account = item.accountNumber
  const { push } = useHistory()
  const params = new URLSearchParams()
  params.append('account', account)

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
      <Button
        style={styles}
        variant={'text'}
        onClick={() =>
          push({ pathname: AccountsRoute.deposit, search: params.toString() })
        }
      >
        Deposit
      </Button>
      <Button
        style={styles}
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
