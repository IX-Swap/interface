import { Box, Grid, Paper, Typography } from '@mui/material'
import { CurrencySelect } from 'app/pages/accounts/components/CurrencySelect/CurrencySelect'
import { OTPInputField } from 'app/pages/accounts/components/OTPDialog/OTPInputField'
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
import { formatMoney } from 'helpers/numbers'
import { isEmptyString } from 'helpers/strings'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useAppTheme } from 'hooks/useAppTheme'
import { ManageBankAccountsButton } from './ManageBankAccountsButton'

export const Setup: React.FC = () => {
  const { container, selectRow, separator, minimumWithdrawalText } = useStyles()
  const { watch, control, formState, reset } =
    useFormContext<WithdrawCashFormValues>()
  const bankAccountId = watch('bankAccountId')
  const { getFilterValue } = useQueryFilter()
  const virtualAccountId = getFilterValue('account')
  const {
    data: virtualAccountData,
    list,
    isLoading: virtualAccountLoading
  } = useVirtualAccount(virtualAccountId)

  const { data: bankData, isLoading: bankLoading } = useBanksData()
  const bank = bankData.map[bankAccountId ?? '']
  const { data: assets } = useAssetsData('Currency')
  const selectedAsset = assets.list.find(
    a => a.symbol === virtualAccountData.currency
  )
  const minWithdraw = selectedAsset?.amounts?.minimumWithdrawal
  const { data: paymentMethodData } = usePaymentMethod(
    bank?.address.country ?? '',
    bank?.swiftCode ?? ''
  )

  const { theme } = useAppTheme()

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
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
        <Box sx={{ px: { xs: 3, md: 5 }, paddingTop: 5 }}>
          <CurrencySelect accounts={list} />
        </Box>
        <div className={separator} />
        <Grid container direction='column'>
          <Grid item>
            <Box
              sx={{
                mt: { xs: 0, md: 5 },
                mb: { xs: 3, md: 5 },
                px: { xs: 3, md: 5 }
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
                {!isEmptyString(virtualAccountId) ? (
                  <>
                    <Grid item mt={5}>
                      <TypedField
                        control={control}
                        variant='outlined'
                        component={NumericInput}
                        name='amount'
                        label='Amount'
                        placeholder={
                          minWithdraw !== undefined
                            ? `Minimum ${formatMoney(minWithdraw, '')}`
                            : ''
                        }
                        disabled={isEmptyString(bankAccountId)}
                        valueExtractor={numericValueExtractor}
                        numberFormat={moneyNumberFormat}
                      />
                    </Grid>
                  </>
                ) : null}

                {minWithdraw !== undefined ? (
                  <Typography
                    color={theme.palette.text.secondary}
                    className={minimumWithdrawalText}
                  >
                    Minimum {formatMoney(minWithdraw, '')}
                  </Typography>
                ) : (
                  ''
                )}
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
