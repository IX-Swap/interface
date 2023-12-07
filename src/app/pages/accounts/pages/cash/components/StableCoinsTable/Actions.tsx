import { Button, Grid } from '@mui/material'
import { useStyles } from 'app/pages/accounts/pages/cash/components/Actions.styles'
import { isNullish } from 'helpers/numbers'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { ConvertedAssetBalance } from 'types/balance'
import { DSRoute } from '../../../security-tokens/router/config'
export interface ActionsProps {
  item: ConvertedAssetBalance
}

export const Actions = ({ item }: ActionsProps) => {
  const styles = useStyles()
  const { push } = useHistory()

  return (
    <Grid display={'flex'} alignItems={'center'} gap={3.5}>
      <Button
        className={styles.button}
        variant={'text'}
        onClick={() =>
          push({ pathname: DSRoute.deposit, search: '?type=Stablecoin' })
        }
      >
        Deposit
      </Button>
      <Button
        className={styles.button}
        variant={'text'}
        disabled={isNullish(item.balance.available)}
        onClick={() =>
          push({ pathname: DSRoute.withdraw, search: '?type=Stablecoin' })
        }
      >
        Withdraw
      </Button>
    </Grid>
  )
}
