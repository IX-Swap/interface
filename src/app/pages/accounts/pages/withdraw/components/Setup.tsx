import { Box, Grid, Paper } from '@mui/material'
import { CurrencySelect } from 'app/pages/accounts/components/CurrencySelect/CurrencySelect'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { usePaymentMethod } from 'app/pages/accounts/pages/banks/hooks/usePaymentMethods'
import { ContinueButton } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/ContinueButton'
import { useStyles } from 'app/pages/accounts/pages/withdraw/components/Setup.styles'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { BankSelect } from 'components/form/BankSelect'
import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import { isEmptyString } from 'helpers/strings'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { ManageBankAccountsButton } from './ManageBankAccountsButton'
import { OTPInputField } from 'app/pages/accounts/components/OTPDialog/OTPInputField'

export const Setup: React.FC = () => {
  const { container, selectRow, separator } = useStyles()
  const { watch, control, formState, reset, getValues, setValue } =
    useFormContext<WithdrawCashFormValues>()
  const bankAccountId = watch('bankAccountId')
  const virtualAccountId = watch('virtualAccount')

  const {
    data: virtualAccountData,
    list,
    isLoading: virtualAccountLoading
  } = useVirtualAccount(virtualAccountId)

  const { data: bankData, isLoading: bankLoading } = useBanksData()

  const bank = bankData.map[bankAccountId ?? '']

  const { data: paymentMethodData } = usePaymentMethod(
    bank?.address.country ?? '',
    bank?.swiftCode ?? ''
  )

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
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
    <Box className={container}>
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ px: { xs: 3, sm: 5 }, paddingTop: 5 }}>
          <CurrencySelect
            accounts={list}
            onButtonClick={value => setValue('virtualAccount', value)}
          />
        </Box>
        <div className={separator} />
        <Grid container direction='column'>
          <Grid item>
            <Box
              sx={{
                mt: { xs: 0, sm: 5 },
                mb: { xs: 3, sm: 5 },
                px: { xs: 3, sm: 5 }
              }}
            >
              <Box mt={{ xs: 0, sm: 2 }} className={selectRow}>
                <TypedField
                  control={control}
                  variant='outlined'
                  component={BankSelect}
                  currency={virtualAccountData?.currency}
                  name='bankAccountId'
                  displayEmpty
                  label='To bank account'
                  placeholder='Select item'
                />

                <ManageBankAccountsButton
                  variant='outlined'
                  sx={{ height: '50px', marginTop: '26px' }}
                />
              </Box>
              <Grid item>
                {virtualAccountId !== undefined ? (
                  <>
                    <Grid item mt={5}>
                      <TypedField
                        control={control}
                        variant='outlined'
                        component={NumericInput}
                        name='amount'
                        label='Amount'
                        disabled={isEmptyString(bankAccountId)}
                        valueExtractor={numericValueExtractor}
                        numberFormat={moneyNumberFormat}
                      />
                    </Grid>
                  </>
                ) : null}
              </Grid>
              <Box mt={5}>
                <OTPInputField disabled={isEmptyString(bankAccountId)} />
              </Box>
              <Grid item mt={5}>
                <ContinueButton type='submit' />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
