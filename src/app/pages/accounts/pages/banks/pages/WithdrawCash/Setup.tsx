import React, { useEffect, useState } from 'react'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import {
  Box,
  Grid,
  InputAdornment,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
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
import { ContinueButton } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/ContinueButton'
import { OTPDialog } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/OTPDialog'
import { usePaymentMethod } from 'app/pages/accounts/pages/banks/hooks/usePaymentMethods'
import { VSpacer } from 'components/VSpacer'

export const Setup: React.FC = () => {
  const { watch, control, formState, reset, getValues } =
    useFormContext<WithdrawCashFormValues>()
  const bankId = watch('bankAccountId')
  const virtualAccountId = watch('virtualAccount')
  const { data: virtualAccountData, isLoading: virtualAccountLoading } =
    useVirtualAccount(virtualAccountId)

  const { data: bankData, isLoading: bankLoading } = useBanksData()

  const bank = bankData.map[bankId ?? '']
  const theme = useTheme()

  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))

  const [open, setOpen] = useState(false)

  const { data: paymentMethodData } = usePaymentMethod(
    bank?.address.country ?? '',
    bank?.swiftCode ?? ''
  )

  const setMaxValue = () => {
    control.setValue('amount', virtualAccountData?.balance.outstanding)
  }

  const handleContinue = () => {
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setOpen(false)
      reset({
        virtualAccount: getValues('virtualAccount'),
        bankAccountId: null,
        amount: null,
        otp: null
      })
    }
    // eslint-disable-next-line
  }, [formState.isSubmitSuccessful])

  useEffect(() => {
    control.setValue('paymentMethodName', paymentMethodData?.name, {
      shouldDirty: true,
      shouldValidate: true
    })
    // eslint-disable-next-line
  }, [paymentMethodData?.name])

  useEffect(() => {
    control.setValue('bankAccountId', null, {
      shouldDirty: true,
      shouldValidate: true
    })
    // eslint-disable-next-line
  }, [virtualAccountId])

  if (virtualAccountLoading || bankLoading) {
    return null
  }

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
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
        <Grid item>
          <VirtualAccountDetails virtualAccountId={virtualAccountId} />
        </Grid>
      ) : null}

      <Grid item>
        <FormSectionHeader
          title='Withdraw Cash From Your Account'
          variant='subsection'
        />
        <TypedField
          style={{ width: isTablet ? '100%' : '40%' }}
          control={control}
          variant='outlined'
          customRenderer
          component={BankSelect}
          currency={virtualAccountData?.currency}
          name='bankAccountId'
          label='To Bank Account'
          helperText='Please select your bank account in which you want to transfer your fund'
        />
      </Grid>
      {bankId !== null &&
      bankId !== undefined &&
      virtualAccountId !== undefined ? (
        <>
          <Grid item>
            <FormSectionHeader title='Withdrawal Method' variant='subsection' />
            <Typography variant='body1'>{paymentMethodData?.name}</Typography>
            <VSpacer size='small' />
          </Grid>
          <Grid item>
            <TypedField
              style={{ width: isTablet ? '100%' : '40%' }}
              control={control}
              variant='outlined'
              component={NumericInput}
              name='amount'
              label='Amount'
              valueExtractor={numericValueExtractor}
              numberFormat={moneyNumberFormat}
              startAdornment={
                <InputAdornment position='start'>
                  <Box mt='2px'>{bank?.currency.numberFormat.currency}</Box>
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
      <Grid item>
        <ContinueButton onClick={handleContinue} />
      </Grid>
      <OTPDialog open={open} close={close} />
    </Grid>
  )
}
