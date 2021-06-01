import React from 'react'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { Box, Grid, InputAdornment } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { TypedField } from 'components/form/TypedField'
import { BankSelect } from 'components/form/BankSelect'
import { NumericInput } from 'components/form/NumericInput'
import { numericValueExtractor } from 'helpers/forms'
import { moneyNumberFormat } from 'config/numberFormat'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { MaxButton } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/MaxButton/MaxButton'
import { VirtualAccountSelect } from 'app/pages/accounts/components/VirtualAccountSelect'
import { VirtualAccountDetails } from 'app/pages/accounts/components/VirtualAccountDetails'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'

export const Setup: React.FC = () => {
  const { watch, control } = useFormContext<WithdrawCashFormValues>()
  const bankId = watch('bankAccountId')
  const virtualAccountId = watch('virtualAccount')
  const {
    data: virtualAccountData,
    isLoading: virtualAccountLoading
  } = useVirtualAccount(virtualAccountId)
  const { data: bankData, isLoading: bankLoading } = useBanksData()
  const bank = bankData.map[bankId]

  const setMaxValue = () => {
    control.setValue('amount', virtualAccountData?.balance.available)
  }

  if (virtualAccountLoading || bankLoading) {
    return null
  }

  return (
    <Grid container direction='column' spacing={2} justify='flex-start'>
      <Grid item xs={12} sm={6} md={5}>
        <TypedField
          customRenderer
          control={control}
          component={VirtualAccountSelect}
          name='virtualAccount'
          label=''
          customLabel='Choose Your Account'
        />
      </Grid>

      {virtualAccountId !== undefined ? (
        <Grid item xs={12}>
          <VirtualAccountDetails virtualAccountId={virtualAccountId} />
        </Grid>
      ) : null}

      <Grid item xs={12} sm={6} md={5}>
        <FormSectionHeader
          title='Withdraw Cash From Your Virtual Account'
          variant='subsection'
        />
        <TypedField
          control={control}
          variant='outlined'
          component={BankSelect}
          name='bankAccountId'
          label='To Bank Account'
          helperText='Please select your bank account in which you want to transfer your fund'
        />
      </Grid>
      {bankId !== undefined && virtualAccountId !== undefined ? (
        <>
          <Grid item xs={12} sm={6} md={5}>
            <TypedField
              control={control}
              variant='outlined'
              component={NumericInput}
              name='amount'
              label='Amount'
              valueExtractor={numericValueExtractor}
              numberFormat={moneyNumberFormat}
              startAdornment={
                <InputAdornment position='start'>
                  <Box mt='2px'>{bank.currency.numberFormat.currency}</Box>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position='end'>
                  <MaxButton onClick={setMaxValue} />
                </InputAdornment>
              }
            />
          </Grid>
        </>
      ) : null}
    </Grid>
  )
}
