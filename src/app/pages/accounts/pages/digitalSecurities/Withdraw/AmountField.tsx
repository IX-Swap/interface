import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { InputAdornment, Button, Divider, Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useTokenInfo } from 'app/pages/accounts/hooks/useTokenInfo'
import { Available } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/Available'
import { useGetCustody } from 'app/pages/accounts/hooks/useGetCustody'
import { AssetBalance } from 'types/balance'
import { NumericInput } from 'components/form/NumericInput'
import { numericValueExtractor } from 'helpers/forms'
import { moneyNumberFormat } from 'config/numberFormat'
import { NumberFormatValues } from 'react-number-format'

export const AmountField = () => {
  const { control, watch } = useFormContext()
  const tokenSymbol = watch('token')

  const { data: tokenInfo } = useTokenInfo(tokenSymbol)
  const { data: tokens } = useGetCustody()

  const tokenBalance = tokens?.find(
    (token: AssetBalance) => token.symbol === tokenSymbol
  )

  const available = tokenBalance?.available > 0 ? tokenBalance?.available : 0

  const setMaxAmount = () => {
    control.setValue('amount', available, { shouldDirty: true })
  }

  const isAllowed = (value: NumberFormatValues) => {
    return (value?.floatValue ?? 0) <= available
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Available
          tokenCurrencySymbol={tokenInfo?.asset.symbol}
          available={available}
        />
      </Grid>
      <Grid item xs={12}>
        <TypedField
          control={control}
          component={NumericInput}
          valueExtractor={numericValueExtractor}
          label='Amount'
          name='amount'
          numberFormat={{ ...moneyNumberFormat, isAllowed }}
          variant='outlined'
          defaultValue=''
          endAdornment={
            <InputAdornment position='end' style={{ height: '100%' }}>
              {tokenInfo !== undefined ? (
                <>
                  <Button variant='text' onClick={setMaxAmount} color='primary'>
                    MAX
                  </Button>
                  <Divider orientation='vertical' />
                  <Button
                    variant='text'
                    disableRipple
                    style={{ background: 'transparent', cursor: 'default' }}
                  >
                    {tokenInfo.asset.symbol}
                  </Button>
                </>
              ) : (
                <></>
              )}
            </InputAdornment>
          }
        />
      </Grid>
    </Grid>
  )
}
