import React from 'react'
import { useFormContext } from 'react-hook-form'
import cn from 'classnames'
import { Box, FormControl, Typography, useTheme, Button } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { formatAmountValue } from 'helpers/numbers'
import { TypedField } from 'components/form/TypedField'
import { NumericInput } from 'components/form/NumericInput'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import { ReactComponent as USDTIcon } from 'assets/icons/stablecoins/usdt.svg'
import { ReactComponent as USDCIcon } from 'assets/icons/stablecoins/usdc.svg'

interface AmountFieldProps {
  label?: string
  tokenLogo: string
  tokenBalance: string | number
  tokenSymbol: string
}

export const AmountField = ({
  label = 'Amount',
  tokenLogo,
  tokenBalance,
  tokenSymbol
}: AmountFieldProps) => {
  const { control, setValue, watch } = useFormContext()
  const amount = watch('amount')
  const fee = watch('withdrawalFee')

  const inSufficientBalance = tokenBalance < amount
  const amountTooSmall = amount <= fee

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
      padding: '0 15px',
      gap: 10,
      '& $input div': {
        color: 'inherit !important'
      },
      '& $input input': {
        color: 'inherit !important',
        fontSize: '40px !important',
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
  const Icon = tokenSymbol === 'USDC' ? USDCIcon : USDTIcon

  return (
    <FormControl>
      <Box className={classes.header}>
        <Typography>{label}</Typography>
        <Box className={classes.balance}>
          <Typography color={'tooltip.color'}>Available Balance: </Typography>
          <strong>
            {tokenSymbol} {formatAmountValue(Number(tokenBalance))}
          </strong>
        </Box>
      </Box>

      <Box
        className={cn([
          classes.container,
          inSufficientBalance || amountTooSmall ? classes.hasError : ''
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
            sx={{
              '& .MuiInput-root': {
                '&:before, :after, :hover:not(.Mui-disabled):before': {
                  border: 0
                }
              }
            }}
            InputProps={{
              startAdornment: <></>,
              endAdornment: <></>,
              inputProps: {}
            }}
            isErrorMessageEnabled={false}
          />
        </Box>
        <Box className={classes.token}>
          <Button
            variant='text'
            onClick={() => setValue('amount', tokenBalance)}
          >
            MAX
          </Button>

          {tokenSymbol === 'USDC' || tokenSymbol === 'USDT' ? (
            <Icon style={{ height: 24 }} />
          ) : (
            <DSOLogo
              size={24}
              uri={'/dataroom/raw/'}
              dsoId={tokenLogo}
              variant='circular'
            />
          )}
          <Typography>{tokenSymbol}</Typography>
        </Box>
      </Box>

      {inSufficientBalance && (
        <Typography className={classes.errorMessage}>
          Insufficient available token balance
        </Typography>
      )}

      {amountTooSmall && (
        <Typography className={classes.errorMessage}>
          Withdrawal amount too small and doesnt cover withdrawal fee
        </Typography>
      )}
    </FormControl>
  )
}
