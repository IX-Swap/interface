import React from 'react'
import { Box, Button, FormControl, Typography, useTheme } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { formatAmountValue } from 'helpers/numbers'
import { ReactComponent as SGDIcon } from 'assets/icons/flags/sgd.svg'
import { ReactComponent as USDIcon } from 'assets/icons/flags/usd.svg'
import { ReactComponent as CurrencyIcon } from 'assets/icons/currency.svg'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AccountsRoute } from 'app/pages/accounts/router/config'

interface WithdrawalFeeProps {
  inSufficientBalance: boolean
  currency?: string
  balance?: number
  fee?: number
}

export const WithdrawalFee = ({
  currency,
  balance,
  fee,
  inSufficientBalance
}: WithdrawalFeeProps) => {
  const theme = useTheme()

  const useStyles = makeStyles(() => ({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      marginBottom: '10px'
    },
    balance: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.menu.border}`,
      borderRadius: '8px',
      padding: '0 15px',
      gap: 10
    },
    amount: {
      color: 'inherit !important',
      fontSize: '24px !important',
      fontWeight: 600,
      height: '61px',
      padding: '0 15px',
      display: 'flex',
      alignItems: 'center'
    },
    errorMessage: {
      color: theme.palette.error.main,
      fontSize: '12px',
      marginTop: '15px'
    },
    currency: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    },
    topUp: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: `1px solid ${theme.palette.menu.border}`,
      borderRadius: '8px',
      padding: '30px 15px',
      gap: 15
    }
  }))

  const classes = useStyles()

  return (
    <FormControl>
      <Box className={classes.header}>
        <Typography>Withdrawal Fee</Typography>
        {inSufficientBalance ? (
          <Typography className={classes.errorMessage}>
            Insufficient available balance
          </Typography>
        ) : (
          <Box className={classes.balance}>
            <Typography color={'tooltip.color'}>Available Balance: </Typography>
            <strong>
              {currency} {formatAmountValue(Number(balance))}
            </strong>
          </Box>
        )}
      </Box>

      {inSufficientBalance ? (
        <Box className={classes.topUp}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <CurrencyIcon height={24} />
            <Typography fontSize={16} fontWeight={600}>
              You do not have enough money
            </Typography>
          </Box>

          <Typography color='tooltip.color'>
            Insufficient available balance, please top-up your account.
          </Typography>

          <Button
            variant='contained'
            color='primary'
            sx={{ paddingX: 1, paddingY: 1.5 }}
            disableElevation
            component={AppRouterLinkComponent}
            to={AccountsRoute.cash}
            fullWidth
          >
            Top-up my account
          </Button>
        </Box>
      ) : (
        <Box className={classes.container}>
          <Box className={classes.amount}>{formatAmountValue(fee ?? 0)}</Box>
          <Box className={classes.currency}>
            {currency === 'USD' ? (
              <USDIcon width={24} height={24} />
            ) : (
              <SGDIcon width={24} height={24} />
            )}
            <Typography>{currency}</Typography>
          </Box>
        </Box>
      )}
    </FormControl>
  )
}
