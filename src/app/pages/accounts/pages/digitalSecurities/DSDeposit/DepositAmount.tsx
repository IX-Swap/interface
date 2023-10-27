import React from 'react'
import { useFormContext } from 'react-hook-form'
import cn from 'classnames'
import { Box, FormControl, Typography, useTheme, Button } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { SUPPORTED_WALLETS } from 'config/blockchain/supportedWallets'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { formatAmountValue } from 'helpers/numbers'
import { TypedField } from 'components/form/TypedField'
import { NumericInput } from 'components/form/NumericInput'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'

export const DEPOSIT_METHODS = [...Object.values(SUPPORTED_WALLETS)]

interface DepositAmountProps {
  tokenBalance: string
  isBalanceSufficient: boolean
}

export const DepositAmount = ({
  tokenBalance,
  isBalanceSufficient
}: DepositAmountProps) => {
  const { control, watch, setValue } = useFormContext()
  const token = watch('token')
  const tokenLogo = token?.logo
  const tokenSymbol = token?.symbol

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
      border: `1px solid ${theme.palette.menu.border}`,
      borderRadius: '8px',
      padding: '15px',
      gap: 10,
      '& $input div': {
        border: '0 !important',
        boxShadow: 'none !important',
        color: 'inherit !important',
        borderColor: 'transparent !important',
        outline: 'none !important'
      },
      '& $input input': {
        border: 'none !important',
        boxShadow: 'none !important',
        color: 'inherit !important',
        outline: '0 !important',
        fontSize: '40px !important',
        borderColor: 'transparent !important',
        fontWeight: '600 !important'
      }
    },
    input: {},
    hasError: {
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main
    },
    errorMessage: {
      color: theme.palette.error.main,
      fontSize: '12px',
      marginTop: '15px'
    },
    token: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }))

  const classes = useStyles()

  return (
    <FormControl>
      <Box className={classes.header}>
        <Typography>Deposit Amount</Typography>
        <Box className={classes.balance}>
          <Typography color={'tooltip.color'}>Available Balance: </Typography>
          <strong>
            {tokenSymbol} {formatAmountValue(tokenBalance)}
          </strong>
        </Box>
      </Box>

      <Box
        className={cn([
          classes.container,
          !isBalanceSufficient ? classes.hasError : ''
        ])}
      >
        <Box className={classes.input}>
          <TypedField
            control={control}
            component={NumericInput}
            name='amount'
            numberFormat={moneyNumberFormat}
            valueExtractor={numericValueExtractor}
            variant='standard'
          />
        </Box>
        <Box className={classes.token}>
          <Button
            variant='text'
            onClick={() => setValue('amount', tokenBalance)}
          >
            MAX
          </Button>
          <DSOLogo
            size={24}
            uri={'/dataroom/raw/'}
            dsoId={tokenLogo}
            variant='circular'
          />
          <Typography>{tokenSymbol}</Typography>
        </Box>
      </Box>

      {!isBalanceSufficient && (
        <Typography className={classes.errorMessage}>
          Insufficient available token balance
        </Typography>
      )}
    </FormControl>
  )
}
